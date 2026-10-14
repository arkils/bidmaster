# Look

Status: agreed on 2026-10-14 in [IMPL-011](../tasks/impl/IMPL-011-card-table.md). The trump mark, the turn highlight, and which hand cards are raised were added in [IMPL-012](../tasks/impl/IMPL-012-table-play.md). The circle of names was added in [IMPL-013](../tasks/impl/IMPL-013-seat-circle.md). The caller's own seat chip was added in [IMPL-014](../tasks/impl/IMPL-014-own-seat.md) and placed on the felt in [IMPL-016](../tasks/impl/IMPL-016-own-seat-on-felt.md).

The room page is a card table. The home page, the name popup, and the dashboard share the stone page. The felt is only the table. The dashboard stays a scoreboard.

Colors, type, and motion durations live in `web/src/tokens.css`. Components use those variables. A later restyle edits this record, then the tokens.

## Color

- The page is stone, neither very dark nor very bright.
- The table is muted olive.
- Cards are white.
- Hearts and diamonds are red.
- Clubs and spades are near-black.
- Page text is a plain sans.

## Cards

A face-up card has a large rank in the corner and one large suit mark in the center. Jack, queen, king, and ace use that same face.

The caller sees only their own cards, in a row below the table. The caller's own seat is a chip inside the felt, along the bottom edge: the name only, the bid once stored, the tricks won, and a face-down count. It is highlighted when it is that player's turn. It does not cover the trump mark, the trick, or another seat.

Other seats sit around the table, clockwise from the caller's left. Each shows the name only, a face-down count, the bid once it is stored, and the tricks won. Those chips do not cover the trump mark, the trick, or each other.

A hand card stays flat, and is not a control, when it is not that player's turn to play. On that turn, a card the rules allow is enabled and raised. A card the rules do not allow stays visible, flat, and disabled.

## Trump

Once chosen, trump is a suit mark in the center, above the trick. Hearts and diamonds use the red symbol. Clubs and spades use the near-black symbol. The mark does not cover a seat, the trick, or the caller's name.

## Turn

The seat whose turn it is, for a bid, the trump choice, or a card, is highlighted on every player's screen. The highlight uses the turn color in `web/src/tokens.css`. A seat that is not to move is not highlighted.

## Motion

Motion is snappy.

- A played card slides into the trick.
- The winning card lifts when the trick is taken.
- A new hand deals in with a short slide.
- The seat whose turn it is pulses briefly, and stays marked.
