import { useEffect, useRef, useState, type FormEvent } from "react";
import {
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
import { watchRoom } from "./live";
import { readPlayer, savePlayer, type Player } from "./player";
import "./App.css";

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

function seatSpot(index: number, total: number): { left: string; top: string; width: string } {
  const along = total === 1 ? 0.5 : index / (total - 1);
  const angle = Math.PI + along * Math.PI;
  const room = total <= 1 ? 22 : 2 * 36 * Math.sin(Math.PI / (2 * (total - 1))) * 0.82;
  return {
    left: `${50 + 36 * Math.cos(angle)}%`,
    top: `${46 + 38 * Math.sin(angle)}%`,
    width: `min(5.4rem, ${room}%)`,
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
  const trickCount = useRef(tricks.length);
  const handKey = (room.cards ?? []).map((card) => `${card.suit}-${card.rank}`).join("|");
  const [dealing, setDealing] = useState(false);
  const seenHand = useRef("");

  useEffect(() => {
    if (tricks.length > trickCount.current) {
      setTaken(tricks[tricks.length - 1]);
      trickCount.current = tricks.length;
      const timer = window.setTimeout(() => setTaken(null), 280);
      return () => window.clearTimeout(timer);
    }
    trickCount.current = tricks.length;
  }, [tricks, trickCount]);

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
  const hand = room.cards ?? [];
  const yourBid = round?.bids.find((entry) => entry.seat === you?.seat);
  const liveTrick = round?.trick ?? [];
  const trumpRed = round?.trump === "hearts" || round?.trump === "diamonds";

  return (
    <div className="table-wrap">
      <div className="table">
        {others.map((seat, index) => {
          const bid = round?.bids.find((entry) => entry.seat === seat.seat);
          return (
            <div key={seat.seat} className={`seat-chip ${round?.turn === seat.seat ? "turn" : ""}`} style={seatSpot(index, others.length)}>
              <span>{seat.name}</span>
              {bid ? <span>bid {bid.bid}</span> : null}
              {round?.trump ? <span>won {won[seat.seat - 1]}</span> : null}
              {seat.cardsLeft !== undefined ? <span className="card-back">{seat.cardsLeft}</span> : null}
            </div>
          );
        })}
        <div className="table-center">
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
                  className={`${card === shownTrick[shownTrick.length - 1] && !taken ? "card-in" : ""} ${taken && card.seat === taken.winner ? "card-lift" : ""}`}
                />
              ))}
            </div>
          ) : null}
          {stillBidding && round && round.bids.length > 0 ? (
            <ul className="seats">
              {round.bids.map((entry) => (
                <li key={entry.seat}>
                  {entry.name} bid {entry.bid}
                </li>
              ))}
            </ul>
          ) : null}
          {choosingTrump && yourTurn ? (
            <div className="actions">
              {SUITS.map((suit) => (
                <button key={suit} type="button" className="suit-choice" onClick={() => onTrump(suit)}>
                  {SUIT_MARK[suit]} {suit}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        {you ? (
          <div className={`seat-chip own ${round?.turn === yourSeat ? "turn" : ""}`}>
            <span>{you.name}</span>
            {yourBid ? <span>bid {yourBid.bid}</span> : null}
            {round?.trump ? <span>won {won[you.seat - 1]}</span> : null}
            {you.cardsLeft !== undefined ? <span className="card-back">{you.cardsLeft}</span> : null}
          </div>
        ) : null}
      </div>
      {you ? (
        <div className="your-seat">
          {stillBidding && yourTurn && round ? (
            <form
              className="bid-form"
              onSubmit={(event) => {
                event.preventDefault();
                onBid(Number(new FormData(event.currentTarget).get("bid")));
              }}
            >
              <label htmlFor="bid">Bid, 0 through {round.cardsDealt}</label>
              <input id="bid" name="bid" type="number" min={0} max={round.cardsDealt} step={1} required />
              <button type="submit">Bid</button>
            </form>
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
      <svg className="graph" viewBox="0 0 320 140" role="img" aria-label="No scored round yet">
        <line x1="36" y1="16" x2="36" y2="112" stroke="currentColor" />
        <line x1="36" y1="112" x2="300" y2="112" stroke="currentColor" />
        <text x="8" y="70" fontSize="12">
          Points
        </text>
        <text x="140" y="132" fontSize="12">
          Rounds
        </text>
      </svg>
    );
  }
  const values = rounds.flatMap((result) => result.map((entry) => entry.points));
  const low = Math.min(0, ...values);
  const high = Math.max(0, ...values);
  const span = high - low || 1;
  const xAt = (index: number) => 36 + (index / Math.max(rounds.length - 1, 1)) * 264;
  const yAt = (points: number) => 112 - ((points - low) / span) * 96;
  return (
    <svg className="graph" viewBox="0 0 320 140" role="img" aria-label="Points gained or lost each round">
      <line x1="36" y1="16" x2="36" y2="112" stroke="currentColor" />
      <line x1="36" y1="112" x2="300" y2="112" stroke="currentColor" />
      <text x="8" y="70" fontSize="12">
        Points
      </text>
      <text x="140" y="132" fontSize="12">
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
    <section>
      <h2>Your matches</h2>
      <ul className="seats">
        {matches.map((match) => (
          <li key={match.roomId}>
            <a href={dashboardPath(match.roomId)}>
              {match.startedOn} {match.roomId}
            </a>
            {match.seats.map((seat) => `${seat.seat}. ${seat.name}`).join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Dashboard({ room, matches }: { room: Room; matches: MatchSummary[] }) {
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <p>
        <a href={roomPath(room.roomId)}>Room</a>
      </p>
      <p>Started {room.startedOn}.</p>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Seat</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {(room.ranking ?? []).map((entry) => (
            <tr key={entry.seat}>
              <td>{entry.rank}</td>
              <td>{entry.seat}</td>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Graph room={room} />
      <ul className="legend">
        {room.seats.map((seat) => (
          <li key={seat.seat}>
            <span style={{ background: LINE_COLORS[(seat.seat - 1) % LINE_COLORS.length] }} />
            {seat.seat}. {seat.name}
          </li>
        ))}
      </ul>
      {(room.rounds ?? []).length === 0 ? <p>No scored round yet.</p> : null}
      {room.over ? <p>The ranking is final.</p> : null}
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
          setRoom((current) =>
            current
              ? {
                  ...current,
                  seats: notice.seats ?? current.seats,
                  openerSeat: notice.openerSeat ?? current.openerSeat,
                  cards: notice.cards ?? current.cards,
                  started: notice.kind === "started" ? true : current.started,
                }
              : current,
          );
          loadRoom(next.roomId, player.playerId)
            .then((loaded) => {
              if (!cancelled) {
                setRoom(loaded);
              }
            })
            .catch(() => undefined);
        });
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setRoom(null);
          setError(reason instanceof ApiError ? reason.message : "the room could not be opened");
        }
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

  function onJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = String(data.get("roomId") ?? "").trim();
    if (!parsePath(roomPath(id)).roomId) {
      setError("there is no room with that id");
      return;
    }
    go(roomPath(id));
  }

  async function onStart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!player || !room) {
      return;
    }
    const seat = Number(new FormData(event.currentTarget).get("seat"));
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

  async function onLeave() {
    if (!player || !room) {
      return;
    }
    const next = await leaveRoom(room.roomId, player.playerId);
    setRoom(next);
  }

  const pageUrl = room ? `${window.location.origin}${roomPath(room.roomId)}` : "";

  return (
    <main>
      <h1>Bidmaster</h1>
      {player ? <p>{player.name}</p> : null}
      {!player ? (
        <dialog open>
          <form onSubmit={onNameSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" autoFocus required />
            <button type="submit">Continue</button>
          </form>
        </dialog>
      ) : null}
      {player && location.screen === "home" ? (
        <div className="actions">
          <button type="button" onClick={onCreate}>
            Create room
          </button>
          {joining ? (
            <form onSubmit={onJoin}>
              <label htmlFor="roomId">Room id</label>
              <input id="roomId" name="roomId" required />
              <button type="submit">Join</button>
            </form>
          ) : (
            <button type="button" onClick={() => setJoining(true)}>
              Join room
            </button>
          )}
        </div>
      ) : null}
      {player && location.screen === "home" ? <MatchList matches={matches} /> : null}
      {location.screen === "dashboard" && room?.started ? <Dashboard room={room} matches={matches} /> : null}
      {location.screen === "room" && room ? (
        <section>
          {room.seats.length === 0 ? <p>This room has no seated player. The room id stays reserved.</p> : <Table room={room} onBid={onBid} onTrump={onTrump} onPlay={onPlay} />}
          <div className="under-table">
            <p>{pageUrl}</p>
            <button type="button" onClick={() => navigator.clipboard.writeText(pageUrl)}>
              Copy link
            </button>
            {room.started ? (
              <p>
                <a href={dashboardPath(room.roomId)}>Dashboard</a>
              </p>
            ) : null}
            {room.yourSeat === 1 && !room.started ? (
              <button type="button" onClick={onLeave}>
                Leave room
              </button>
            ) : null}
            {room.yourSeat === 1 && !room.started && room.seats.length >= 3 ? (
              <form onSubmit={onStart}>
                <label htmlFor="opener">Bids first</label>
                <select id="opener" name="seat" defaultValue={1}>
                  {room.seats.map((seat) => (
                    <option key={seat.seat} value={seat.seat}>
                      {seat.seat}. {seat.name}
                    </option>
                  ))}
                </select>
                <button type="submit">Start match</button>
              </form>
            ) : null}
          </div>
        </section>
      ) : null}
      {error ? <p>{error}</p> : null}
    </main>
  );
}
