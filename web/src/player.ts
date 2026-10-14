const cookieName = "bidmaster";
const oneYear = 60 * 60 * 24 * 365;

export type Player = {
  name: string;
  playerId: string;
};

export function readPlayer(): Player | null {
  const parts = document.cookie.split("; ");
  const match = parts.find((part) => part.startsWith(`${cookieName}=`));
  if (!match) {
    return null;
  }
  try {
    const value = JSON.parse(decodeURIComponent(match.slice(cookieName.length + 1))) as Partial<Player>;
    if (!value.name || !value.playerId) {
      return null;
    }
    return { name: value.name, playerId: value.playerId };
  } catch {
    return null;
  }
}

export function savePlayer(name: string): Player {
  const existing = readPlayer();
  const player = {
    name,
    playerId: existing?.playerId ?? crypto.randomUUID(),
  };
  document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(player))}; Path=/; Max-Age=${oneYear}; SameSite=Lax`;
  return player;
}
