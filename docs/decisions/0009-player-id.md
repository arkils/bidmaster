# 0009. Player id beside the name

Date: 2026-10-14

## Status

ACCEPTED

## Context

The name in the cookie was the only identity on a call. [R-4](../risks.md) says two players who join one room with the same name cannot be told apart. On 2026-10-14 the user asked to keep a unique id in the same browser, beside the name they typed, so the database can tell those players apart while the screen shows only the name. The same id should also tie together the matches that browser has played.

## Decision

The browser keeps two values in the cookie:

- The name the player typed. This is what the screen shows.
- A player id, generated once on that browser. It is not shown. It is not built from the name, so it stays the same across matches on that browser.

DynamoDB stores both on each seat. Two seats may show the same name. They are different players because their ids differ. A match keeps those seats after everyone leaves, so the matches one player id sat in can be listed later.

Giving a name is still not a server call. The id is created in the browser. There is still no account.

## Options considered

- The typed name alone. Matches the earlier journeys. Two players who type the same name share one identity.
- One stored string such as `Sam-12234`, and the screen strips the suffix. The suffix has to be saved and reused, or the next match looks like a new player. The screen also has to know the suffix is not part of the name. Two fields do that directly.
- An account with a login. That would follow a person across browsers. Version 1 has no account. The user placed the id in the browser that is already storing the name.

## Rationale

The user asked for a hidden id next to the visible name, and for a record of which matches that same player played. The cookie already remembers the name on that browser. Adding the id there keeps version 1 free of accounts, and DynamoDB can both separate two identical names and list that browser's matches.

## Consequences

- Calls send the player id. The name is display text. Seats, hands, and private topics are tied to the id. A public message names a player by seat number and the name on that seat, not by the id.
- The dashboard can list the matches this player id sat in, and open one by its room id. There is still no public lobby.
- A past match shows the name that player used in that match.
- Clearing the cookie, or playing on another browser, starts a new player id. Older matches stay stored, and this browser does not list them.
- [R-4](../risks.md) is addressed.

## Revisit triggers

- The user wants one person to keep the same id across browsers or after the cookie is cleared.
- The user wants the id shown on screen.
