# V2-013: Trump mark above the table

| Field | Value |
| --- | --- |
| **ID** | V2-013 |
| **Track** | Version 2 prep |
| **Phase** | Development |
| **Component** | room |
| **Status** | DONE |
| **Priority** | Important |
| **Blocked by** | — |
| **Blocks** | — |
| **Completed** | 2026-10-15 |

## Summary

Once trump is chosen, the suit is a small mark in the ivory gap between the room id and the top of the stadium. The trick then sits alone in the center. Up to 10 cards overlap in one row so they stay inside the stadium and clear of the seats.

## Read first

- [x] [00-discovery-status.md](../../00-discovery-status.md)
- [x] [product/look.md](../../product/look.md)
- [x] [v2/V2-012-stadium-table.md](V2-012-stadium-table.md)

Read every item in this list before writing.

## Open questions to resolve

| ID | Question | Resolution |
| --- | --- | --- |
| — | None. The user asked on 2026-10-15 to put the suit icon above the stadium, and for the played cards to take the center that frees. | The mark is above the stadium. A full trick of 10 cards overlaps in the center. |

## Acceptance criteria

- [x] After trump is chosen, the suit is a small mark centered between the room id and the top of the stadium
- [x] Hearts and diamonds are red. Clubs and spades are near-black
- [x] That mark is not a full card, and it does not sit in the center of the felt
- [x] The trick sits in the center of the felt, in the place the trump card leaves
- [x] A trick of 10 cards is one overlapping row. Each rank stays visible. The row stays inside the stadium and does not cover a seat
- [x] On a phone the cards overlap more tightly than on a wide screen. The page does not scroll sideways
- [x] While a player is still choosing, the four trump cards stay in the center. A player who is not choosing does not see them
- [x] The same suit place is used on a wide screen and on a phone, including a table of 10
- [x] [product/look.md](../../product/look.md) records the mark above the stadium and the overlapping trick
- [x] Status updated in [backlog.md](../backlog.md)

## Definition of done

A later agent can see a small suit mark between the room id and the stadium, and a trick of 10 overlapping cards in the center that stays inside the stadium and clear of the seats, and can read that in `docs/product/look.md`.

## Notes log

| Date | Author | Note |
| --- | --- | --- |
| 2026-10-15 | user | Put the suit icon in the ivory gap under the room id, above the stadium, as shown. Not started. |
| 2026-10-15 | user | Moving that mark changes where the played cards sit. Test a trick of 10 cards. |
| 2026-10-15 | agent | With the trump card removed and 10 cards in a row, the row runs off a phone and across the side seats. Overlapped in the center, the same 10 stay inside the stadium. On a phone each rank still shows and the last card shows its suit. On a wide screen they spread more and still clear the seats. The suit mark stays above the stadium. Not started. |
| 2026-10-15 | agent | The suit mark sits between the room id and the stadium. Hearts are red. A trick of 10 overlaps in the center: 20px apart on a phone and 36px on a wide screen. The row stays inside and clear of the seats, and the phone does not scroll sideways. The four choice cards stay in the center, and that screen has no suit mark. |
