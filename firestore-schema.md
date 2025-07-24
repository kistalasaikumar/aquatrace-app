# Firestore Data Model

This document outlines the Firestore data model for the AquaTrace application.

## Leaderboard Collection

The application uses a single collection named `leaderboard` to store user scores.

### Schema Diagram

Here is a simple ER-style representation of the `leaderboard` collection:

```
+------------------------+
|   leaderboard (C)      |
+------------------------+
| {documentID} (D)       |
|------------------------|
| name: string           |
| score: number          |
+------------------------+
```

**Legend:**

*   `(C)`: Represents a Firestore Collection.
*   `(D)`: Represents a Firestore Document. Each document has a unique, auto-generated ID.

### Fields

*   **name**: (String) The name of the user on the leaderboard.
*   **score**: (Number) The calculated "Aqua Points" score for the user.
