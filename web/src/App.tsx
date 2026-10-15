import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  acceptResult,
  ApiError,
  createRoom,
  dashboardPath,
  joinRoom,
  leaveRoom,
  listMatches,
  loadRoom,
  parsePath,
  playCard,
  roomPath,
  rulesPath,
  selectTrump,
  startMatch,
  submitBid,
  type Card,
  type MatchSummary,
  type Room,
} from "./api";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectItem } from "./components/ui/select";
import { Table as ScoreTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { watchRoom } from "./live";
import { readPlayer, savePlayer, type Player } from "./player";
import "./App.css";

function playClip(src: string) {
  const sound = new Audio(src);
  sound.volume = 0.55;
  void sound.play().catch(() => undefined);
}

function playCardSound() {
  playClip("/card.mp3");
}

function keepChosenTrump(current: Room | null, loaded: Room): Room {
  const trump = current?.round?.trump;
  const round = loaded.round;
  if (!current?.round || !trump || !round || round.trump) {
    return loaded;
  }
  if ((current.rounds?.length ?? 0) !== (loaded.rounds?.length ?? 0) || current.round.cardsDealt !== round.cardsDealt) {
    return loaded;
  }
  return {
    ...loaded,
    round: {
      ...round,
      trump,
      turn: current.round.turn,
      leadSeat: current.round.leadSeat,
    },
  };
}

function playBidSound() {
  playClip("/bid.mp3");
}

function playTurnBuzz() {
  playClip("/buzz.mp3");
  try {
    navigator.vibrate?.(200);
  } catch {
    // A browser that refuses vibration still plays the buzz.
  }
}

const TURN_BUZZ_MS = 10000;

const LINE_COLORS = ["#0b6e4f", "#9a3412", "#1d4ed8", "#a16207", "#7e22ce", "#be123c", "#0f766e", "#b45309", "#334155", "#4d7c0f"];

const SUITS = ["clubs", "diamonds", "hearts", "spades"];

const SUIT_MARK: Record<string, string> = {
  clubs: "♣",
  diamonds: "♦",
  hearts: "♥",
  spades: "♠",
};

function rankLabel(rank: string): string {
  if (rank === "ace") {
    return "A";
  }
  if (rank === "jack") {
    return "J";
  }
  if (rank === "queen") {
    return "Q";
  }
  if (rank === "king") {
    return "K";
  }
  return rank;
}

function seatSpot(index: number, total: number): { left: string; top: string } {
  const count = total + 1;
  const angle = Math.PI / 2 + ((index + 1) * 2 * Math.PI) / count;
  return {
    left: `${50 + 40 * Math.cos(angle)}%`,
    top: `${50 + 40 * Math.sin(angle)}%`,
  };
}

function clockwiseFrom(seats: Room["seats"], yourSeat: number): Room["seats"] {
  const count = seats.length;
  const others = [];
  for (let step = 1; step < count; step += 1) {
    const number = ((yourSeat - 1 + step) % count) + 1;
    const seat = seats.find((entry) => entry.seat === number);
    if (seat) {
      others.push(seat);
    }
  }
  return others;
}

function phaseText(room: Room, yourTurn: boolean, stillBidding: boolean, choosingTrump: boolean): string | null {
  const round = room.round;
  if (!round || room.over) {
    return null;
  }
  if (stillBidding && yourTurn) {
    return "Your bid";
  }
  if (choosingTrump && yourTurn) {
    return "Choose trump";
  }
  if (yourTurn) {
    return "Your turn";
  }
  const actor = room.seats.find((seat) => seat.seat === round.turn);
  return actor ? `${actor.name}'s turn` : null;
}

function bidBlocked(bid: number, cardsDealt: number, bids: { bid: number }[], seatCount: number): boolean {
  if (bids.length !== seatCount - 1) {
    return false;
  }
  const forbidden = cardsDealt - bids.reduce((sum, entry) => sum + entry.bid, 0);
  return bid === forbidden;
}

function cardAllowed(card: Card, hand: Card[], trick: { suit: string }[]): boolean {
  const led = trick[0]?.suit;
  if (!led) {
    return true;
  }
  if (!hand.some((held) => held.suit === led)) {
    return true;
  }
  return card.suit === led;
}

function SeatScores({ name, bid, won }: { name: string; bid?: number; won: number }) {
  const bidLabel = bid === undefined ? "–" : String(bid);
  return (
    <>
      <span className="seat-name">{name}</span>
      <span className="seat-scores">
        <span className="seat-score seat-bid">
          {bidLabel}
          <span className="card-name">Bid {bidLabel}</span>
        </span>
        <span className="seat-score seat-won">
          {won}
          <span className="card-name">Won {won}</span>
        </span>
      </span>
    </>
  );
}

function Face({
  card,
  className,
  delay,
}: {
  card: Card;
  className?: string;
  delay?: string;
}) {
  const red = card.suit === "hearts" || card.suit === "diamonds";
  return (
    <span className={`card ${red ? "card-red" : "card-black"} ${className ?? ""}`} style={delay ? { animationDelay: delay } : undefined}>
      <span className="card-rank">{rankLabel(card.rank)}</span>
      <span className="card-suit" aria-hidden="true">
        {SUIT_MARK[card.suit]}
      </span>
      <span className="card-name">
        {card.rank} of {card.suit}
      </span>
    </span>
  );
}

function Table({
  room,
  onBid,
  onTrump,
  onPlay,
}: {
  room: Room;
  onBid: (bid: number) => void;
  onTrump: (suit: string) => void;
  onPlay: (card: Card) => void;
}) {
  const round = room.round;
  const yourSeat = room.yourSeat ?? 1;
  const you = room.seats.find((seat) => seat.seat === yourSeat);
  const others = clockwiseFrom(room.seats, yourSeat);
  const tricks = round?.tricks ?? [];
  const [taken, setTaken] = useState<(typeof tricks)[number] | null>(null);
  const [gather, setGather] = useState(false);
  const trickCount = useRef(tricks.length);
  const seenTrick = useRef(round?.trick.length ?? 0);
  const seenBids = useRef(round?.bids.length ?? 0);
  const handKey = (room.cards ?? []).map((card) => `${card.suit}-${card.rank}`).join("|");
  const [dealing, setDealing] = useState(false);
  const seenHand = useRef("");

  useEffect(() => {
    if (tricks.length > trickCount.current) {
      setGather(false);
      setTaken(tricks[tricks.length - 1]);
    }
    trickCount.current = tricks.length;
  }, [tricks]);

  useEffect(() => {
    const length = round?.trick.length ?? 0;
    if (length > seenTrick.current && tricks.length === trickCount.current) {
      playCardSound();
    }
    seenTrick.current = length;
  }, [round?.trick, tricks.length]);

  useEffect(() => {
    const length = round?.bids.length ?? 0;
    const added = length - seenBids.current;
    seenBids.current = length;
    for (let index = 0; index < added; index += 1) {
      playBidSound();
    }
  }, [round?.bids]);

  useEffect(() => {
    if (!taken) {
      return;
    }
    const pause = window.setTimeout(() => setGather(true), 2000);
    return () => window.clearTimeout(pause);
  }, [taken]);

  useEffect(() => {
    if (!taken || !gather) {
      return;
    }
    const count = taken.cards.length;
    const timers = Array.from({ length: count }, (_, index) => window.setTimeout(() => playCardSound(), index * 170));
    const frame = window.requestAnimationFrame(() => {
      const chip = document.querySelector(`[data-seat="${taken.winner}"]`);
      const cards = document.querySelectorAll(".trick .card");
      if (!chip) {
        return;
      }
      const target = chip.getBoundingClientRect();
      cards.forEach((node, index) => {
        const card = node as HTMLElement;
        const rect = card.getBoundingClientRect();
        const dx = target.left + target.width / 2 - (rect.left + rect.width / 2);
        const dy = target.top + target.height / 2 - (rect.top + rect.height / 2);
        card.style.transition = `transform 380ms ease-in ${index * 40}ms, opacity 380ms ease-in ${index * 40}ms`;
        card.style.transform = `translate(${dx}px, ${dy}px) scale(0.25)`;
        card.style.opacity = "0";
      });
    });
    const clear = window.setTimeout(() => {
      setTaken(null);
      setGather(false);
    }, count * 170 + 420);
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(clear);
    };
  }, [taken, gather]);

  useEffect(() => {
    if (handKey && handKey !== seenHand.current) {
      setDealing(true);
      seenHand.current = handKey;
      const timer = window.setTimeout(() => setDealing(false), 420);
      return () => window.clearTimeout(timer);
    }
    seenHand.current = handKey;
  }, [handKey, seenHand]);

  const won = room.seats.map(() => 0);
  for (const trick of tricks) {
    won[trick.winner - 1] += 1;
  }
  const shownTrick = taken?.cards ?? round?.trick ?? [];
  const yourTurn = Boolean(round) && room.yourSeat === round?.turn && !room.over;
  const stillBidding = Boolean(round) && !round?.trump && (round?.bids.length ?? 0) < room.seats.length;
  const choosingTrump = Boolean(round) && !round?.trump && round?.bids.length === room.seats.length;

  useEffect(() => {
    if (!yourTurn) {
      return;
    }
    let pending = 0;
    const buzz = () => {
      playTurnBuzz();
      pending = window.setTimeout(buzz, TURN_BUZZ_MS);
    };
    pending = window.setTimeout(buzz, TURN_BUZZ_MS);
    return () => window.clearTimeout(pending);
  }, [yourTurn]);

  const playing = yourTurn && Boolean(round?.trump);
  const phase = phaseText(room, yourTurn, stillBidding, choosingTrump);
  const hand = room.cards ?? [];
  const yourBid = round?.bids.find((entry) => entry.seat === you?.seat);
  const liveTrick = round?.trick ?? [];

  return (
    <div className="table-wrap">
      <div className="felt">
        {others.map((seat, index) => {
          const bid = round?.bids.find((entry) => entry.seat === seat.seat);
          return (
            <div key={seat.seat} data-seat={seat.seat} className={`seat-chip ${round?.turn === seat.seat ? "turn" : ""}`} style={seatSpot(index, others.length)}>
              {round?.turn === seat.seat ? (
                <span className="turn-star" aria-hidden="true">
                  ★
                </span>
              ) : null}
              {round ? <SeatScores name={seat.name} bid={bid?.bid} won={won[seat.seat - 1]} /> : <span className="seat-name">{seat.name}</span>}
            </div>
          );
        })}
        <div className={`table-center ${gather ? "gather" : ""}`}>
          {shownTrick.length > 0 ? (
            <div className="trick">
              {shownTrick.map((card) => (
                <Face
                  key={`${card.seat}-${card.suit}-${card.rank}`}
                  card={card}
                  className={
                    taken && !gather && card.seat === taken.winner
                      ? "card-win"
                      : card === shownTrick[shownTrick.length - 1] && !taken
                        ? "card-in"
                        : ""
                  }
                />
              ))}
            </div>
          ) : null}
          {stillBidding && round && round.bids.length > 0 ? (
            <ul className="bid-list">
              {round.bids.map((entry) => (
                <li key={entry.seat} className="bid-chip">
                  <span className="bid-chip-name">{entry.name}</span>
                  <span className="bid-chip-number">{entry.bid}</span>
                  <span className="card-name">
                    {entry.name} bid {entry.bid}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {choosingTrump && yourTurn ? (
            <div className="trump-choices">
              {SUITS.map((suit) => {
                const red = suit === "hearts" || suit === "diamonds";
                return (
                  <button key={suit} type="button" className="card-button" onClick={() => onTrump(suit)}>
                    <span className={`card trump-card ${red ? "card-red" : "card-black"}`}>
                      <span className="card-suit" aria-hidden="true">
                        {SUIT_MARK[suit]}
                      </span>
                      <span className="card-name">{suit}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        {you ? (
          <div data-seat={you.seat} className={`seat-chip own ${round?.turn === yourSeat ? "turn" : ""}`}>
            {round?.turn === yourSeat ? (
              <span className="turn-star" aria-hidden="true">
                ★
              </span>
            ) : null}
            {round ? <SeatScores name={you.name} bid={yourBid?.bid} won={won[you.seat - 1]} /> : <span className="seat-name">{you.name}</span>}
          </div>
        ) : null}
      </div>
      {you ? (
        <div className="your-seat">
          {phase ? <p className="phase">{phase}</p> : null}
          {stillBidding && yourTurn && round ? (
            <div className="bid-form flex w-full flex-wrap justify-center gap-2">
              {Array.from({ length: round.cardsDealt + 1 }, (_, bid) => {
                const blocked = bidBlocked(bid, round.cardsDealt, round.bids, room.seats.length);
                return (
                  <Button key={bid} type="button" variant="outline" className="min-w-11" disabled={blocked} onClick={() => onBid(bid)}>
                    {bid}
                  </Button>
                );
              })}
            </div>
          ) : null}
          {round ? (
            <div className="hand">
              {hand.map((card, index) => {
                const allowed = cardAllowed(card, hand, liveTrick);
                return playing ? (
                  <button
                    key={`${card.suit}-${card.rank}`}
                    type="button"
                    className={`card-button ${allowed ? "playable" : ""}`}
                    disabled={!allowed}
                    onClick={() => onPlay(card)}
                  >
                    <Face card={card} className={dealing ? "card-deal" : ""} delay={`${index * 40}ms`} />
                  </button>
                ) : (
                  <Face key={`${card.suit}-${card.rank}`} card={card} className={dealing ? "card-deal" : ""} delay={`${index * 40}ms`} />
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function pointScale(values: number[]): number[] {
  let low = Math.min(...values);
  let high = Math.max(...values);
  if (low === high) {
    const pad = Math.max(10, Math.abs(low) || 10);
    low -= pad;
    high += pad;
  }
  const rough = (high - low) / 4;
  const power = 10 ** Math.floor(Math.log10(rough));
  const fraction = rough / power;
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  const step = Math.max(1, nice * power);
  const start = Math.floor(low / step) * step;
  const end = Math.ceil(high / step) * step;
  const ticks: number[] = [];
  for (let value = start; value <= end + step * 0.001; value += step) {
    ticks.push(Math.round(value));
  }
  return ticks;
}

function Graph({ room, totals = false }: { room: Room; totals?: boolean }) {
  const rounds = room.rounds ?? [];
  const label = totals ? "Total" : "Points";
  if (rounds.length === 0) {
    return (
      <svg className="graph" viewBox="0 0 340 176" role="img" aria-label="No scored round yet">
        <line x1="64" y1="16" x2="64" y2="120" stroke="currentColor" />
        <line x1="64" y1="120" x2="320" y2="120" stroke="currentColor" />
        <text x="8" y="12" fontSize="12">
          {label}
        </text>
        <text x="168" y="164" fontSize="12">
          Rounds
        </text>
      </svg>
    );
  }
  const lines = room.seats.map((seat) => {
    const gained = rounds.map((result) => result.find((entry) => entry.seat === seat.seat)?.points ?? 0);
    if (!totals) return gained;
    let sum = 0;
    return [0, ...gained.map((points) => (sum += points))];
  });
  const ticks = pointScale(lines.flat());
  const low = ticks[0];
  const high = ticks[ticks.length - 1];
  const span = high - low || 1;
  const count = lines[0]?.length ?? rounds.length;
  const xAt = (index: number) => 64 + (index / Math.max(count - 1, 1)) * 240;
  const yAt = (points: number) => 120 - ((points - low) / span) * 96;
  const roundSize = rounds.length > 12 ? 8 : 11;
  return (
    <svg
      className="graph"
      viewBox="0 0 340 176"
      role="img"
      aria-label={totals ? "Total points after each round" : "Points gained or lost each round"}
    >
      <line x1="64" y1="16" x2="64" y2="120" stroke="currentColor" />
      <line x1="64" y1="120" x2="320" y2="120" stroke="currentColor" />
      <text x="8" y="12" fontSize="12">
        {label}
      </text>
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1="60" y1={yAt(tick)} x2="64" y2={yAt(tick)} stroke="currentColor" />
          <text x="56" y={yAt(tick) + 4} fontSize="11" textAnchor="end">
            {tick}
          </text>
        </g>
      ))}
      {rounds.map((_, index) => (
        <g key={index}>
          <line x1={xAt(totals ? index + 1 : index)} y1="120" x2={xAt(totals ? index + 1 : index)} y2="124" stroke="currentColor" />
          <text x={xAt(totals ? index + 1 : index)} y="140" fontSize={roundSize} textAnchor="middle">
            {index + 1}
          </text>
        </g>
      ))}
      <text x="168" y="164" fontSize="12">
        Rounds
      </text>
      {room.seats.map((seat, seatIndex) => (
        <polyline
          key={seat.seat}
          points={(lines[seatIndex] ?? []).map((value, index) => `${xAt(index)},${yAt(value)}`).join(" ")}
          fill="none"
          stroke={LINE_COLORS[(seat.seat - 1) % LINE_COLORS.length]}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

function MatchList({ matches }: { matches: MatchSummary[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-center text-xl font-semibold text-felt">Your matches</h2>
      {matches.length === 0 ? (
        <p className="note">No matches yet.</p>
      ) : (
        <div className="mt-3">
          <ScoreTable>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Seats</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.roomId}>
                  <TableCell className="whitespace-nowrap">{match.startedOn}</TableCell>
                  <TableCell>
                    <Button asChild variant="outline" className="whitespace-nowrap">
                      <a href={dashboardPath(match.roomId)}>{match.roomId}</a>
                    </Button>
                  </TableCell>
                  <TableCell>{match.seats.map((seat) => seat.name).join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ScoreTable>
        </div>
      )}
    </section>
  );
}

function Rules({ roomId }: { roomId: string }) {
  const back = roomId ? roomPath(roomId) : "/";
  const backLabel = roomId ? "Room" : "Home";
  return (
    <article className="rules">
      <h2>Rules</h2>
      <p className="mt-3 flex justify-center">
        <Button asChild variant="outline">
          <a href={back}>{backLabel}</a>
        </Button>
      </p>
      <h3>How a match is played</h3>
      <p>
        A match is a run of rounds. Each round is a deal, a bid from every player, a trump suit, and then tricks until the dealt cards are gone. The winner is the highest rank after the scores are added up. A tie on the score is broken by how many bids were exact.
      </p>
      <h3>Players</h3>
      <p>A match has 3 to 10 players. Seats stay fixed, and that order is the turn order. Play goes clockwise.</p>
      <h3>The deal</h3>
      <p>
        Every player is dealt the same number of cards. That number is the most that can be dealt equally from a 52-card deck, and it is never more than 10. Cards that are not dealt stay out of the round. They are not played, and they are not trump.
      </p>
      <p>
        The first round deals that many cards. Each following round deals one fewer, down to 1. The one-card round is played twice. The deals then rise by one card each round, back to the first number. That number is dealt on the first round and again on the last. A match has twice as many rounds as cards in the first deal, and never more than 20.
      </p>
      <p>With a first deal of 5, the rounds are 5, 4, 3, 2, 1, 1, 2, 3, 4, 5. The next round starts only after the current round has been scored.</p>
      <h3>Bidding</h3>
      <p>
        Players bid before any card is played, clockwise, one bid each. A bid is a whole number from 0 through the cards dealt this round. A bid cannot be changed. There are as many tricks as cards dealt, and the bids together must not add up to that number.
      </p>
      <p>
        Any player may bid first in round 1. That same player leads the first trick. The first bidder moves one seat clockwise every round, so the player who bid first bids last in the next round. The last bidder must choose a number that keeps the total different from the cards dealt. Any other bid from that player is refused.
      </p>
      <p>Four players with 7 cards, and the first three bids 2, 1, and 3: the last player cannot bid 1, because the total would be 7.</p>
      <h3>Trump</h3>
      <p>
        After every bid is locked, one player names a trump suit for the round. It stays fixed. The chooser is the first player in that round's bidding order to bid the highest number. A later player who bids the same number does not take the choice. When every bid is 0, the player who bid first selects trump.
      </p>
      <h3>The cards</h3>
      <p>
        The deck is 52 cards: clubs, diamonds, hearts, and spades. Each suit runs from 2 up through 10, Jack, Queen, King, and Ace. There are no jokers. The deck is shuffled before every round. Each player may look at their own hand before bidding, and sees only those cards.
      </p>
      <h3>Tricks</h3>
      <p>
        Each trick, every player plays one card, clockwise. One player wins the trick. The winner leads the next trick. Play continues until every dealt card has been played. The player who bid first leads the first trick.
      </p>
      <p>
        The first card sets the led suit. A player who still holds that suit must play it. A player with none of that suit may play any other card, and it does not have to be trump. Trump beats every card that is not trump. If more than one trump is played, the higher trump wins. If no trump is played, the highest card of the led suit wins. Any other card cannot win the trick.
      </p>
      <h3>Scoring</h3>
      <p>
        A player scores only by matching the bid exactly. The size of a miss does not change the points, and a miss scores the same amount with a minus. A bid of 0 scores +10 when exact and −10 otherwise. A bid above 0 scores the bid times 11 when exact, and minus that number otherwise. The round score is added to the match score.
      </p>
      <ScoreTable>
        <TableHeader>
          <TableRow>
            <TableHead>Bid</TableHead>
            <TableHead>Tricks</TableHead>
            <TableHead>Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>+10</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>0</TableCell>
            <TableCell>1</TableCell>
            <TableCell>−10</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>+11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>+22</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>−22</TableCell>
          </TableRow>
        </TableBody>
      </ScoreTable>
      <h3>The winner</h3>
      <p>
        After the last round, the higher cumulative score ranks first. Only a tie on that score looks at successful bids. A successful bid is a round won with exactly the bid, and two exact bids count as two, whatever the numbers were. More successful bids rank higher. When the score and that count are both equal, those players share the rank. The highest rank wins, and players who share it share the win.
      </p>
    </article>
  );
}

function Dashboard({ room, matches }: { room: Room; matches: MatchSummary[] }) {
  return (
    <section className="mt-6">
      <h2 className="text-center text-xl font-semibold text-felt">Dashboard</h2>
      <p className="mt-3 flex justify-center">
        <Button asChild variant="outline">
          <a href={roomPath(room.roomId)}>Room</a>
        </Button>
      </p>
      <p className="note">Started {room.startedOn}.</p>
      <div className="mt-4">
        <ScoreTable>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(room.ranking ?? []).map((entry) => (
              <TableRow key={entry.seat}>
                <TableCell>{entry.rank}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScoreTable>
      </div>
      <Graph room={room} />
      <Graph room={room} totals />
      <ul className="legend">
        {room.seats.map((seat) => (
          <li key={seat.seat} className="inline-flex items-center gap-2">
            <span className="inline-block size-3" style={{ background: LINE_COLORS[(seat.seat - 1) % LINE_COLORS.length] }} />
            {seat.name}
          </li>
        ))}
      </ul>
      {(room.rounds ?? []).length === 0 ? <p className="note">No scored round yet.</p> : null}
      {room.over ? <p className="note">The ranking is final.</p> : null}
      <MatchList matches={matches} />
    </section>
  );
}

export function App() {
  const [player, setPlayer] = useState<Player | null>(() => readPlayer());
  const [location, setLocation] = useState(() => parsePath(window.location.pathname));
  const [joining, setJoining] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [matches, setMatches] = useState<MatchSummary[]>([]);
  const [error, setError] = useState("");
  const [resultVisible, setResultVisible] = useState(false);
  const closedResult = useRef<number | null>(null);
  const seenResultRoom = useRef<string | null>(null);
  const heldResult = useRef<number | null>(null);
  const waitingResult = useRef<number | null>(null);
  const watchId = useRef(crypto.randomUUID());

  function go(path: string) {
    window.history.pushState({}, "", path);
    setLocation(parsePath(path));
    setRoom(null);
    setError("");
  }

  useEffect(() => {
    function onPop() {
      setLocation(parsePath(window.location.pathname));
      setRoom(null);
      setError("");
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (location.screen !== "room") {
      seenResultRoom.current = null;
      heldResult.current = null;
      waitingResult.current = null;
      setResultVisible(false);
      return;
    }
    if (!room) {
      return;
    }
    const at = room.resultAt ?? null;
    const firstLook = seenResultRoom.current !== room.roomId;
    if (firstLook) {
      seenResultRoom.current = room.roomId;
      heldResult.current = null;
      waitingResult.current = null;
    }
    if (at == null) {
      heldResult.current = null;
      waitingResult.current = null;
      setResultVisible(false);
      return;
    }
    if (heldResult.current === at || waitingResult.current === at) {
      return;
    }
    if (firstLook) {
      heldResult.current = at;
      setResultVisible(true);
      return;
    }
    waitingResult.current = at;
    setResultVisible(false);
    const timer = window.setTimeout(() => {
      if (waitingResult.current !== at) {
        return;
      }
      waitingResult.current = null;
      heldResult.current = at;
      setResultVisible(true);
    }, 2000);
    return () => {
      window.clearTimeout(timer);
      if (waitingResult.current === at) {
        waitingResult.current = null;
      }
    };
  }, [location.screen, room?.roomId, room?.resultAt]);

  useEffect(() => {
    if (!player) {
      return;
    }
    let cancelled = false;
    listMatches(player.playerId)
      .then((next) => {
        if (!cancelled) {
          setMatches(next);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMatches([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [player]);

  useEffect(() => {
    if (location.screen === "rules" || !location.roomId || (location.screen !== "dashboard" && !player)) {
      return;
    }
    let stop = () => {};
    let cancelled = false;
    const callerId = player?.playerId ?? "";
    const watching = location.screen === "dashboard";
    const liveId = watching || !player ? watchId.current : player.playerId;
    const open =
      location.screen === "dashboard" || !player
        ? loadRoom(location.roomId, callerId)
        : joinRoom(location.roomId, player.name, player.playerId);
    open
      .then((next) => {
        if (cancelled) {
          return;
        }
        if (location.screen === "dashboard" && !next.started) {
          setRoom(null);
          setError("the match has not started");
          return;
        }
        setRoom(next);
        setError("");
        stop = watchRoom(next.iotEndpoint, next.authorizerName, next.roomId, liveId, (notice) => {
          setRoom((current) => {
            if (!current) {
              return current;
            }
            const merged = {
              ...current,
              seats: notice.seats ?? current.seats,
              openerSeat: notice.openerSeat ?? current.openerSeat,
              cards: notice.cards ?? current.cards,
              started: notice.kind === "started" ? true : current.started,
            };
            if (notice.kind === "trump" && notice.trump && current.round) {
              merged.round = {
                ...current.round,
                trump: notice.trump,
                turn: notice.leadSeat ?? current.round.turn,
                leadSeat: notice.leadSeat ?? current.round.leadSeat,
              };
            }
            if (notice.kind === "continued") {
              return { ...merged, resultAt: undefined };
            }
            return merged;
          });
          loadRoom(next.roomId, callerId)
            .then((loaded) => {
              if (cancelled) {
                return;
              }
              if (closedResult.current != null && loaded.resultAt === closedResult.current) {
                return;
              }
              if (loaded.resultAt == null) {
                closedResult.current = null;
              }
              setRoom((current) => keepChosenTrump(current, loaded));
            })
            .catch(() => undefined);
        }, !watching);
      })
      .catch((reason: unknown) => {
        if (cancelled) {
          return;
        }
        setRoom(null);
        const message = reason instanceof ApiError ? reason.message : "the room could not be opened";
        if (location.screen === "room" && reason instanceof ApiError && reason.status === 404) {
          setJoining(true);
          setError(message === "the room could not be opened" ? "there is no room with that id" : message);
          window.history.replaceState({}, "", "/");
          setLocation({ screen: "home", roomId: "" });
          return;
        }
        setError(message);
      });
    return () => {
      cancelled = true;
      stop();
    };
  }, [player, location.roomId, location.screen]);

  function onNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    if (!name) {
      return;
    }
    setPlayer(savePlayer(name));
  }

  async function onCreate() {
    if (!player) {
      return;
    }
    setError("");
    try {
      const next = await createRoom(player.name, player.playerId);
      go(roomPath(next.roomId));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : "the room could not be created");
    }
  }

  async function onJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!player) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const id = String(data.get("roomId") ?? "").trim();
    if (!parsePath(roomPath(id)).roomId) {
      setError("there is no room with that id");
      return;
    }
    setError("");
    try {
      await joinRoom(id, player.name, player.playerId);
      go(roomPath(id));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : "there is no room with that id");
    }
  }

  async function onStart(seat: number) {
    if (!player || !room) {
      return;
    }
    setError("");
    try {
      await startMatch(room.roomId, player.playerId, seat);
      setRoom(await loadRoom(room.roomId, player.playerId));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : "the match could not be started");
    }
  }

  async function onBid(bid: number) {
    if (!player || !room) {
      return;
    }
    setError("");
    try {
      setRoom(await submitBid(room.roomId, player.playerId, bid));
    } catch (reason) {
      if (reason instanceof ApiError && reason.status === 409) {
        setError(reason.message);
      }
    }
  }

  async function onTrump(suit: string) {
    if (!player || !room) {
      return;
    }
    setError("");
    try {
      setRoom(await selectTrump(room.roomId, player.playerId, suit));
    } catch {
      setError("");
    }
  }

  async function onPlay(card: Card) {
    if (!player || !room) {
      return;
    }
    setError("");
    try {
      await playCard(room.roomId, player.playerId, card);
      setRoom(await loadRoom(room.roomId, player.playerId));
    } catch {
      setError("");
    }
  }

  async function onResult() {
    if (!player || !room || room.resultAt == null) {
      return;
    }
    const shown = room.resultAt;
    setError("");
    try {
      await acceptResult(room.roomId, player.playerId);
      closedResult.current = shown;
      const loaded = await loadRoom(room.roomId, player.playerId);
      if (loaded.resultAt == null) {
        closedResult.current = null;
      }
      setRoom(loaded);
    } catch {
      const loaded = await loadRoom(room.roomId, player.playerId);
      if (loaded.resultAt !== shown) {
        closedResult.current = shown;
      }
      setRoom(loaded.resultAt === shown ? room : loaded);
    }
  }

  async function onLeave() {
    if (!player || !room) {
      return;
    }
    const next = await leaveRoom(room.roomId, player.playerId);
    setRoom(next);
  }

  const pageUrl = room ? `${window.location.origin}${roomPath(room.roomId)}` : "";

  return (
    <main className="mx-auto box-border max-w-3xl px-6 py-8">
      <h1 className="brand">
        <svg className="brand-crown" viewBox="0 0 24 16" aria-hidden="true">
          <path fill="currentColor" d="M2 14.5 4.2 5.2 8.2 9.4 12 2.2 15.8 9.4 19.8 5.2 22 14.5z" />
        </svg>
        BidMaster
      </h1>
      {location.screen === "room" && room ? <p className="room-name">{room.roomId}</p> : null}
      {location.screen === "room" && room ? (
        room.round?.trump ? (
          <p className={`trump-spot ${room.round.trump === "hearts" || room.round.trump === "diamonds" ? "card-red" : "card-black"}`}>
            <span aria-hidden="true">{SUIT_MARK[room.round.trump]}</span>
            <span className="card-name">Trump is {room.round.trump}.</span>
          </p>
        ) : (
          <p className="trump-spot trump-spot-empty" aria-hidden="true" />
        )
      ) : null}
      <Dialog open={!player && location.screen !== "dashboard" && location.screen !== "rules"}>
        <DialogContent
          onPointerDownOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <form className="grid gap-3" onSubmit={onNameSubmit}>
            <DialogTitle>Name</DialogTitle>
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input id="name" name="name" autoFocus required />
            <Button type="submit">Continue</Button>
          </form>
        </DialogContent>
      </Dialog>
      {player && location.screen === "home" ? (
        <div className="mt-6 flex flex-wrap items-end justify-center gap-3">
          <Button type="button" onClick={onCreate}>
            Create room
          </Button>
          {joining ? (
            <form className="flex flex-wrap items-end justify-center gap-3" onSubmit={onJoin}>
              <div className="grid gap-1.5">
                <Label htmlFor="roomId">Room id</Label>
                <Input id="roomId" name="roomId" required />
              </div>
              <Button type="submit">Join</Button>
            </form>
          ) : (
            <Button type="button" variant="outline" onClick={() => setJoining(true)}>
              Join room
            </Button>
          )}
        </div>
      ) : null}
      {player && location.screen === "home" ? (
        <p className="mt-3 flex justify-center">
          <Button asChild variant="outline">
            <a href={rulesPath()}>Rules</a>
          </Button>
        </p>
      ) : null}
      {player && location.screen === "home" ? <MatchList matches={matches} /> : null}
      {location.screen === "rules" ? <Rules roomId={location.roomId} /> : null}
      {location.screen === "dashboard" && room?.started ? <Dashboard room={room} matches={matches} /> : null}
      {location.screen === "room" && resultVisible && room?.resultAt != null ? <RoundResult room={room} onOk={onResult} /> : null}
      {location.screen === "room" && room ? (
        <section>
          {room.seats.length === 0 ? <p className="note">This room has no seated player. The room id stays reserved.</p> : <Table room={room} onBid={onBid} onTrump={onTrump} onPlay={onPlay} />}
          <div className="under-table">
            <Button type="button" variant="outline" onClick={() => navigator.clipboard.writeText(pageUrl)}>
              Copy link
            </Button>
            <Button asChild variant="outline">
              <a href={rulesPath(room.roomId)}>Rules</a>
            </Button>
            {room.started ? (
              <Button asChild variant="outline">
                <a href={dashboardPath(room.roomId)}>Dashboard</a>
              </Button>
            ) : null}
            {room.yourSeat === 1 && !room.started ? (
              <Button type="button" variant="outline" onClick={onLeave}>
                Leave room
              </Button>
            ) : null}
            {room.yourSeat === 1 && !room.started && room.seats.length >= 3 ? <StartForm seats={room.seats} onStart={onStart} /> : null}
          </div>
        </section>
      ) : null}
      {error ? (
        <p className="note note-alert" role="alert">
          {error}
        </p>
      ) : null}
    </main>
  );
}

function RoundResult({ room, onOk }: { room: Room; onOk: () => void }) {
  const shownAt = room.resultAt ?? 0;
  const [openToAll, setOpenToAll] = useState(false);
  useEffect(() => {
    const tick = () => setOpenToAll(Date.now() >= shownAt + 5000);
    tick();
    const timer = window.setInterval(tick, 200);
    return () => window.clearInterval(timer);
  }, [shownAt]);
  const round = room.round;
  const points = room.rounds?.[room.rounds.length - 1] ?? [];
  const won = room.seats.map(() => 0);
  for (const trick of round?.tricks ?? []) {
    won[trick.winner - 1] += 1;
  }
  const host = room.yourSeat === 1;
  return (
    <Dialog open>
      <DialogContent
        className="w-[min(32rem,calc(100vw-2rem))]"
        onPointerDownOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogTitle>Round result</DialogTitle>
        <ScoreTable className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Bid</TableHead>
              <TableHead>Tricks</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {room.seats.map((seat) => {
              const bid = round?.bids.find((entry) => entry.seat === seat.seat)?.bid;
              const score = points.find((entry) => entry.seat === seat.seat)?.points;
              return (
                <TableRow key={seat.seat}>
                  <TableCell>{seat.name}</TableCell>
                  <TableCell>{bid ?? "–"}</TableCell>
                  <TableCell>{won[seat.seat - 1]}</TableCell>
                  <TableCell>{score === undefined ? "–" : score > 0 ? `+${score}` : score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ScoreTable>
        <Button type="button" className="mt-5 w-full" disabled={!host && !openToAll} onClick={onOk}>
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function StartForm({ seats, onStart }: { seats: Room["seats"]; onStart: (seat: number) => void }) {
  const [seat, setSeat] = useState(String(seats[0]?.seat ?? 1));
  return (
    <form
      className="flex flex-wrap items-end justify-center gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onStart(Number(seat));
      }}
    >
      <div className="grid gap-1.5">
        <Label htmlFor="opener">Bids first</Label>
        <Select id="opener" label="Bids first" value={seat} onValueChange={setSeat}>
          {seats.map((entry) => (
            <SelectItem key={entry.seat} value={String(entry.seat)}>
              {entry.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button type="submit">Start match</Button>
    </form>
  );
}
