import mqtt from "mqtt";
import { playerTopic, roomTopic, type Card, type Seat } from "./api";

export type LiveNotice = {
  kind?: string;
  seats?: Seat[];
  openerSeat?: number;
  cards?: Card[];
};

export function watchRoom(
  endpoint: string,
  authorizerName: string,
  roomId: string,
  playerId: string,
  onNotice: (notice: LiveNotice) => void,
): () => void {
  const token = encodeURIComponent(`${roomId}#${playerId}`);
  const client = mqtt.connect(
    `wss://${endpoint}/mqtt?x-amz-customauthorizer-name=${encodeURIComponent(authorizerName)}&x-amz-customauthorizer-token=${token}`,
    {
      username: `${roomId}#${playerId}`,
      clientId: `${playerId}-${roomId}`.replace(/[^a-zA-Z0-9]/g, "").slice(0, 128),
      protocolVersion: 4,
      reconnectPeriod: 3000,
      clean: true,
    },
  );
  client.on("connect", () => {
    client.subscribe(roomTopic(roomId));
    client.subscribe(playerTopic(roomId, playerId));
  });
  client.on("message", (_topic, payload) => {
    onNotice(JSON.parse(payload.toString()) as LiveNotice);
  });
  return () => {
    client.end(true);
  };
}
