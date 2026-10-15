const apiBase = import.meta.env.VITE_API_BASE ?? "";

export type Seat = {
  seat: number;
  name: string;
};

export type Card = {
  suit: string;
  rank: string;
};

export type RankedSeat = {
  rank: number;
  seat: number;
  name: string;
  score: number;
};

export type Bid = {
  seat: number;
  name: string;
  bid: number;
};

export type PlayedCard = {
  seat: number;
  suit: string;
  rank: string;
};

export type WonTrick = {
  winner: number;
  cards: PlayedCard[];
};

export type RoundPoints = {
  seat: number;
  name: string;
  points: number;
};

export type MatchRound = {
  cardsDealt: number;
  turn: number | null;
  leadSeat: number;
  bids: Bid[];
  tricks: WonTrick[];
  trick: PlayedCard[];
  trumpSeat?: number;
  trump?: string;
};

export type Room = {
  roomId: string;
  started: boolean;
  seats: Seat[];
  url: string;
  yourSeat?: number;
  iotEndpoint: string;
  authorizerName: string;
  startedOn?: string;
  openerSeat?: number;
  cards?: Card[];
  ranking?: RankedSeat[];
  round?: MatchRound;
  rounds?: RoundPoints[][];
  over?: boolean;
  resultAt?: number;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function createRoom(name: string, playerId: string): Promise<Room> {
  return call("/api/rooms", {
    method: "POST",
    body: { name, playerId },
  });
}

export async function joinRoom(roomId: string, name: string, playerId: string): Promise<Room> {
  return call(`/api/rooms/${roomId}/join`, {
    method: "POST",
    body: { name, playerId },
  });
}

export async function leaveRoom(roomId: string, playerId: string): Promise<Room> {
  return call(`/api/rooms/${roomId}/leave`, {
    method: "POST",
    body: { playerId },
  });
}

export async function startMatch(roomId: string, playerId: string, seat: number): Promise<Room> {
  return call(`/api/rooms/${roomId}/start`, {
    method: "POST",
    body: { playerId, seat },
  });
}

export async function submitBid(roomId: string, playerId: string, bid: number): Promise<Room> {
  return call(`/api/rooms/${roomId}/bid`, {
    method: "POST",
    body: { playerId, bid },
  });
}

export async function selectTrump(roomId: string, playerId: string, suit: string): Promise<Room> {
  return call(`/api/rooms/${roomId}/trump`, {
    method: "POST",
    body: { playerId, suit },
  });
}

export async function acceptResult(roomId: string, playerId: string): Promise<Room> {
  return call(`/api/rooms/${roomId}/result`, {
    method: "POST",
    body: { playerId },
  });
}

export async function playCard(roomId: string, playerId: string, card: Card): Promise<Room> {
  return call(`/api/rooms/${roomId}/play`, {
    method: "POST",
    body: { playerId, suit: card.suit, rank: card.rank },
  });
}

export type MatchSummary = {
  startedOn: string;
  roomId: string;
  seats: Seat[];
};

export async function listMatches(playerId: string): Promise<MatchSummary[]> {
  const response = await fetch(`${apiBase}/api/matches?playerId=${encodeURIComponent(playerId)}`);
  const payload = (await response.json()) as { matches?: MatchSummary[] };
  if (!response.ok) {
    throw new ApiError("", response.status);
  }
  return payload.matches ?? [];
}

export async function loadRoom(roomId: string, playerId: string): Promise<Room> {
  const query = playerId ? `?playerId=${encodeURIComponent(playerId)}` : "";
  return call(`/api/rooms/${roomId}${query}`, { method: "GET" });
}

async function call(path: string, options: { method: string; body?: unknown }): Promise<Room> {
  const response = await fetch(`${apiBase}${path}`, {
    method: options.method,
    headers: options.body ? { "content-type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  let payload: Partial<Room> & { error?: string } = {};
  try {
    payload = (await response.json()) as Partial<Room> & { error?: string };
  } catch {
    payload = {};
  }
  if (!response.ok) {
    throw new ApiError(payload.error || "the room could not be opened", response.status);
  }
  return payload as Room;
}

export function roomTopic(roomId: string): string {
  return `bidmaster/room/${roomId}`;
}

export function playerTopic(roomId: string, playerId: string): string {
  return `bidmaster/room/${roomId}/player/${playerId}`;
}

const roomIdPattern = /^[a-z]+-[a-z]+$/;

export function roomPath(roomId: string): string {
  return `/${roomId}`;
}

export function dashboardPath(roomId: string): string {
  return `/dashboard/${roomId}`;
}

export function rulesPath(roomId = ""): string {
  return roomId ? `/rules/${roomId}` : "/rules";
}

export function roomIdFromPath(path: string): string {
  const id = path.replace(/^\/+|\/+$/g, "");
  if (!roomIdPattern.test(id)) {
    return "";
  }
  return id;
}

export function parsePath(path: string): { screen: "home" | "room" | "dashboard" | "rules"; roomId: string } {
  const parts = path.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  if (parts[0] === "rules" && (parts.length === 1 || (parts.length === 2 && roomIdPattern.test(parts[1])))) {
    return { screen: "rules", roomId: parts[1] ?? "" };
  }
  if (parts.length === 2 && parts[0] === "dashboard" && roomIdPattern.test(parts[1])) {
    return { screen: "dashboard", roomId: parts[1] };
  }
  const roomId = roomIdFromPath(path);
  if (roomId) {
    return { screen: "room", roomId };
  }
  return { screen: "home", roomId: "" };
}
