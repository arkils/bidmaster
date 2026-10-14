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

function playCardSound() {
  const sound = new Audio("/card.mp3");
  sound.volume = 0.55;
  void sound.play().catch(() => undefined);
}

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
    left: `${50 + 30 * Math.cos(angle)}%`,
    top: `${50 + 34 * Math.sin(angle)}%`,
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

  const playing = yourTurn && Boolean(round?.trump);
  const phase = phaseText(room, yourTurn, stillBidding, choosingTrump);
  const hand = room.cards ?? [];
  const yourBid = round?.bids.find((entry) => entry.seat === you?.seat);
  const liveTrick = round?.trick ?? [];
  const trumpRed = round?.trump === "hearts" || round?.trump === "diamonds";

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
          {round?.trump ? (
            <p className={`trump ${trumpRed ? "card-red" : "card-black"}`}>
              <span className="trump-mark" aria-hidden="true">
                {SUIT_MARK[round.trump]}
              </span>
              <span className="card-name">Trump is {round.trump}.</span>
            </p>
          ) : null}
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
          {hand.length ? (
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

function Graph({ room }: { room: Room }) {
  const rounds = room.rounds ?? [];
  if (rounds.length === 0) {
    return (
      <svg className="graph" viewBox="0 0 340 168" role="img" aria-label="No scored round yet">
        <line x1="64" y1="16" x2="64" y2="120" stroke="currentColor" />
        <line x1="64" y1="120" x2="320" y2="120" stroke="currentColor" />
        <text x="8" y="72" fontSize="12">
          Points
        </text>
        <text x="168" y="148" fontSize="12">
          Rounds
        </text>
      </svg>
    );
  }
  const values = rounds.flatMap((result) => result.map((entry) => entry.points));
  const low = Math.min(0, ...values);
  const high = Math.max(0, ...values);
  const span = high - low || 1;
  const xAt = (index: number) => 64 + (index / Math.max(rounds.length - 1, 1)) * 240;
  const yAt = (points: number) => 120 - ((points - low) / span) * 96;
  return (
    <svg className="graph" viewBox="0 0 340 168" role="img" aria-label="Points gained or lost each round">
      <line x1="64" y1="16" x2="64" y2="120" stroke="currentColor" />
      <line x1="64" y1="120" x2="320" y2="120" stroke="currentColor" />
      <text x="8" y="72" fontSize="12">
        Points
      </text>
      <text x="168" y="148" fontSize="12">
        Rounds
      </text>
      {room.seats.map((seat) => {
        const points = rounds.map((result) => result.find((entry) => entry.seat === seat.seat)?.points ?? 0);
        const line = points.map((value, index) => `${xAt(index)},${yAt(value)}`).join(" ");
        return (
          <polyline
            key={seat.seat}
            points={line}
            fill="none"
            stroke={LINE_COLORS[(seat.seat - 1) % LINE_COLORS.length]}
            strokeWidth="2"
          />
        );
      })}
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
              <TableHead>Seat</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(room.ranking ?? []).map((entry) => (
              <TableRow key={entry.seat}>
                <TableCell>{entry.rank}</TableCell>
                <TableCell>{entry.seat}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScoreTable>
      </div>
      <Graph room={room} />
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
  const closedResult = useRef<number | null>(null);

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
    if (!player || !location.roomId) {
      return;
    }
    let stop = () => {};
    let cancelled = false;
    const open = location.screen === "dashboard" ? loadRoom(location.roomId, player.playerId) : joinRoom(location.roomId, player.name, player.playerId);
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
        stop = watchRoom(next.iotEndpoint, next.authorizerName, next.roomId, player.playerId, (notice) => {
          if (notice.kind === "started" && location.screen === "room") {
            go(dashboardPath(next.roomId));
            return;
          }
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
            if (notice.kind === "continued") {
              return { ...merged, resultAt: undefined };
            }
            return merged;
          });
          loadRoom(next.roomId, player.playerId)
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
              setRoom(loaded);
            })
            .catch(() => undefined);
        });
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
      go(dashboardPath(room.roomId));
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
      <Dialog open={!player}>
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
      {player && location.screen === "home" ? <MatchList matches={matches} /> : null}
      {location.screen === "dashboard" && room?.started ? <Dashboard room={room} matches={matches} /> : null}
      {location.screen === "room" && room?.resultAt != null ? <RoundResult room={room} onOk={onResult} /> : null}
      {location.screen === "room" && room ? (
        <section>
          {room.seats.length === 0 ? <p className="note">This room has no seated player. The room id stays reserved.</p> : <Table room={room} onBid={onBid} onTrump={onTrump} onPlay={onPlay} />}
          <div className="under-table">
            <Button type="button" variant="outline" onClick={() => navigator.clipboard.writeText(pageUrl)}>
              Copy link
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
              {entry.seat}. {entry.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button type="submit">Start match</Button>
    </form>
  );
}
