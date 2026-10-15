# Look

Status: agreed on 2026-10-14 in [IMPL-011](../tasks/impl/IMPL-011-card-table.md). The trump mark, the turn highlight, and which hand cards are raised were added in [IMPL-012](../tasks/impl/IMPL-012-table-play.md). The circle of names was added in [IMPL-013](../tasks/impl/IMPL-013-seat-circle.md). The caller's own seat chip was added in [IMPL-014](../tasks/impl/IMPL-014-own-seat.md) and placed on the felt in [IMPL-016](../tasks/impl/IMPL-016-own-seat-on-felt.md). The shell and the oval felt were agreed in [IMPL-017](../tasks/impl/IMPL-017-shadcn-table.md). [Decision 0011](../decisions/0011-tailwind-shadcn.md) is accepted. The title, the bid choices, the seat arc, and the controls under the table were agreed in [IMPL-018](../tasks/impl/IMPL-018-table-comments.md). The bid and tricks on a seat chip were agreed in [IMPL-019](../tasks/impl/IMPL-019-seat-scores.md). The center bids, the turn line, the room id under the title, and the centered actions were agreed in [IMPL-020](../tasks/impl/IMPL-020-center-and-room-name.md). The spread of a small table, the light page, and the name-only seat lists were agreed in [IMPL-021](../tasks/impl/IMPL-021-seat-spread.md). The page, the buttons, and the scoreboard header were agreed in [IMPL-022](../tasks/impl/IMPL-022-shell-colors.md). The royal emerald and gold theme was agreed in [IMPL-025](../tasks/impl/IMPL-025-emerald-gold.md). The card sound, the won trick moving to the winner, and the stronger turn mark were agreed in [IMPL-024](../tasks/impl/IMPL-024-play-sound-and-turn.md).

The room page is a card table. The home page, the name popup, the dashboard, and the rules page share the page. The felt is only the table. The dashboard stays a scoreboard. The rules page is writing, with the same title and the same buttons. A played card lifts, travels, and snaps on the player's own screen, agreed in [V3-001](../tasks/v3/V3-001-card-landing.md). A seated player can send a reaction, agreed in [V3-002](../tasks/v3/V3-002-reactions.md).

Colors, type, and motion durations live in `web/src/tokens.css`. That file is the Tailwind theme. Shell controls use those tokens. A later restyle edits this record, then the tokens.

## Color

- The page is warm ivory, `#F5F0E6`.
- The table is deep emerald, `#064E36`, with a forest highlight, `#0B6042`, and a thin antique-gold trim, `#C89A45`.
- Cards are warm white, `#FFFCF7`.
- Hearts and diamonds are `#C52D22`. Clubs and spades are `#1E1D1A`.
- Page text is charcoal, `#29271F`. Secondary text is muted green-gray, `#657467`.
- A filled button is antique gold, `#C89A45`, with deep emerald text. An outline button is warm white with a beige border, `#DDD3BF`.
- The scoreboard header is deep emerald with warm white text. Its rows are warm ivory, separated by beige lines.
- A bid number is pale amber, `#F6E3BF`, with dark gold text, `#B87516`. A tricks-won number is soft blue, `#DCE6FF`, with royal blue text, `#244FC5`.
- The felt is a stadium: straight sides and semicircular ends, lighter toward the center and deep emerald at the rim, with a cloth grain across it. On a wide screen the long axis is horizontal, so the round ends are on the left and right. On a phone the long axis is vertical, so the round ends are on the top and bottom. The gold rim is a raised rail: a bright edge, antique gold, a darker edge, and a shadow under the stadium.
- The title is BidMaster in deep emerald, with a small gold crown just above the word, clear of the letters, and short gold lines.
- The browser tab shows a playing card: warm white, an antique-gold edge, and an emerald club. The file is `web/public/favicon.png`.

## Shell

The page title is BidMaster, centered. The caller's name is not repeated under that title. On a room page, the room id is centered directly under that title. The full address is not printed.

The name dialog, buttons, fields, the bids-first select, and the scoreboard table share one set of controls. A sentence of copy is centered in the muted green-gray. That covers an empty match list, the date a match started, a dashboard with no scored round, a final ranking, a room with no seated player, and the names in the graph color key. An error uses that same line in red. An empty match list says there are no matches yet. Each past match is one row: the date, the room id, and the seat names, in separate parts. The names have no seat numbers. The color key under the graph is each name with its color, and no seat number. The ranking table shows rank, name, and score, and has no Seat column. Each Bids first choice is the player's name, with no seat number. Copy link, Rules, Leave room, Dashboard, the Bids first select, and Start match share one baseline at the bottom of the room page. The Bids first label stays above the select. On a phone those controls stay full width and stacked, still centered. Create room and Join room are centered, and Rules sits centered below them. The bids-first row, the Room button on the dashboard, and the Room or Home button on the rules page are centered. The Dashboard and Your matches headings are centered. On the scoreboard graph, the Points and Rounds labels sit outside the plot.

## Cards

A face-up card has a large rank in the left corner and one large suit mark in the center, with a thin border and a shadow. Jack, queen, king, and ace use that same face. When the card is playable, the rank stays in that left corner.

The caller sees only their own cards, in a row below the table. Cards in that row may overlap so the row fits. That row keeps the height of one card after the last card is played, so Copy link, Leave room, and Dashboard stay where they are. The caller's own seat is a larger chip inside the felt, close to the gold rim along the bottom. It is highlighted when it is that player's turn. It does not cover the trump mark, the trick, or another seat.

Other seats sit around the table, clockwise from the caller's left, close to the rim. A small table spreads those seats around the stadium, far from the caller and from each other. A full table uses the same rim and still fits. Those chips do not cover the trump mark, the trick, or each other.

A seat chip shows the name. It does not show how many cards are left. Once a round has started, it also shows two numbers: the bid once stored, and the tricks won so far. A bid that is not stored yet is a dash. Tricks won start at 0. The bid number is gold. The tricks-won number is blue. The words "bid" and "won" are not written on the chip.

While bids are still being stored, each stored bid sits in the center of the felt on a small light chip: the name in ink and the number in the bid gold. That chip does not cover a seat. On a phone the chips wrap to the next row before they fill the center, with space between them and clear of the seats. A long name keeps its chip on its own row. Short names can still share a row. The trump mark and the trick stay as they are.

The line with the hand says "Your bid", "Choose trump", or whose turn it is. It is a centered golden-yellow pill, `#F5CC70`, with deep emerald text, larger than body text. That line does not cover a seat, the trump mark, or the trick. On the caller's bid, the choices are buttons for each whole number from 0 through the cards dealt. Tapping one submits that bid. When that player is the last to bid, the one number that would make the bids equal the cards dealt is disabled. Every other number stays available. When no whole number in that range would make that total, every button stays enabled.

A hand card stays flat, and is not a control, when it is not that player's turn to play. On that turn, a card the rules allow is enabled and raised. A card the rules do not allow stays visible, flat, and disabled.

When a round is scored, the last trick keeps the 2 second pause, and only then a popup shows one table for that round: name, bid, tricks, and points. The columns line up, and points keep their sign. The table uses the same header and rows as the scoreboard. The felt stays on the finished round. Once the popup is open, the host, seat 1, can press OK at once. Any other player can press OK after 5 seconds from the score. One accepted OK hides the popup on every screen, and the next round is dealt only then. After the last round, OK hides the popup and deals nothing further. The dashboard stays a scoreboard.

## Trump

The player who chooses trump sees four cards in a 2×2 grid: clubs, diamonds, hearts, then spades. Each card is the same face as a hand card, with only the suit symbol in the center and no rank or suit name. Hearts and diamonds are red. Clubs and spades are near-black. The cards share one size. Tapping a card chooses that suit. That player's screen leaves the four cards and shows the suit mark as soon as the choice is accepted, without a refresh. A refused choice leaves the four cards up. A player who is not choosing does not see them. Before a suit is chosen, the felt shows no trump mark. Once chosen, trump is a small card centered on the felt, above the trick and below a seat at the top of the table. The card is the same face as a hand card, smaller than a played card, with only the suit symbol in the center and no rank. Hearts and diamonds use the red symbol. Clubs and spades use the near-black symbol. The card does not cover the trick. A full table of 10 players still keeps the top seat above it. The trick sits in the center of the felt. Up to 10 cards overlap in one row, with each rank still visible. On a phone they overlap more tightly than on a wide screen. The row stays inside the stadium and does not cover a seat.

## Rules page

The rules page says how a match is played: the players, the deals, bidding, trump, the deck, tricks, scoring, and the winner. That writing follows `docs/game/rules.md`. It does not ask for a name and it does not join a room. Home opens it at `/rules`, and Room is not on that page: Home returns to the home page. A room opens it at `/rules/{roomId}`, and Room returns to that room. The dashboard uses that same word.

## Reactions

On the room page, a seated player can send one of 👏 😂 🔥 😮 😬, or one of Nice one, Well bid, Wow, Unlucky, Good game. There is no text field. One button sits centered under the hand. It shows those five emojis and no word. The ten choices stay closed until that button is tapped. Tapping it opens them in a popup over the cards. The popup does not move the page. Tapping a choice sends it and closes the popup. Tapping the button again closes it without sending. Copy link, Rules, and Dashboard sit at the bottom of the page. The emoji or the line then appears on the sender's seat chip, on every seated player's room page. It is a comic speech bubble: a warm-white box, a thin dark outline, and a tail pointing at that chip. An emoji in the bubble is larger than a written line. There is no shadow. The chip still shows the sender's name. Each bubble stays for 5 seconds. Several seats can show a bubble at the same time. A newer reaction from the same seat replaces only that bubble and starts another 5 seconds. The dashboard does not show it. The match does not store it.

## Dashboard graph

Two graphs share the names and colors under them. The first shows how many points each player gained or lost in each scored round. The second shows each player's running total: the line starts at 0, then after every scored round it is that player's cumulative score. Each rounds axis marks each scored round with its round number. Each points axis marks a numeric range that includes the lowest and the highest point drawn, so every point stays inside the frame. That range changes when a newly scored round falls outside the previous marks. With no scored round, both graphs keep their axes and show no round number. Opening an earlier match uses the same two graphs.

## Turn

The seat whose turn it is, for a bid, the trump choice, or a card, is highlighted on every player's screen. When the turn moves to that seat, the chip lifts and the highlight snaps on. The highlight is a thick bright gold ring, `#E4AD3D`, a glow that continues, and a star just outside that ring at the top-right corner of the chip. The star does not cover the name. A seat that is not to move has none of those.

## Motion

Motion is snappy.

- A chosen bid plays one short sound from `bid.mp3` on every table. On every screen, the new center chip snaps into the center and the number snaps into that seat's gold box, together. A bid already stored when the table opens does not play. The next round clearing those bids does not play.
- On the screen of the player who played a card, that card lifts off its place in the hand, crosses the felt to its place in the trick, and snaps down. The card stays visible on that path. It plays one short card sound from `card.mp3`. On every other screen, the card lifts off that player's seat chip, crosses the felt to its place in the trick, and snaps down. That screen does not show a flight from a hand it cannot see. A hand stays flat until it is that player's turn.
- When the last card of a trick is played, including the last trick of a round and the last trick of the match, the cards stay in the center, the winning card is highlighted, and that card lifts. After 2 seconds, those cards travel to the winner's seat chip and snap down. One sound plays for each of those cards, back to back. The round result still opens after that same pause.
- On the caller's screen, a new hand lifts into the row and snaps down. The cards are staggered a little. There is no new sound. Other players do not see that hand.
- When the turn moves to a seat, that chip lifts and the gold ring, the glow, and the star snap on. Every screen sees it. There is no new sound. On that player's own screen, a buzz from `buzz.mp3` starts 10 seconds after the turn is shown and plays again every 10 seconds until the turn ends. It does not play when the turn begins, and it does not play on another player's turn. A phone vibrates once at each buzz when the browser allows it. A browser that refuses vibration still plays the buzz.
