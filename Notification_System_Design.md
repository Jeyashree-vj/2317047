# Campus Notification System - Design Notes

## Priority Algorithm
Each notification has a `type`:
- **Placement** → priority **3**
- **Result** → priority **2**
- **Event** → priority **1**

Sorting rules (used for Priority Notifications):
1. **Higher priority first**
2. If two notifications have the same priority, the one with the **latest timestamp** comes first.

Timestamp handling:
- Assumes `timestamp` is ISO-8601 or a value parseable by `new Date(timestamp)`.
- Comparison uses `Date.getTime()`.

## Stage 1 vs Stage 2
- **Stage 1** focuses on computing priority order and showing the Top N notifications.
- **Stage 2** expands the UI/UX:
  - Pagination
  - Filtering by type
  - Read/Unread state
  - Loading and error states
  - Clicking a notification marks it as read

## Read/Unread Design
- Implemented with **React Context** (no database).
- Initial read state is empty.
- Clicking a notification updates local state to `read`.

## Client-side Filtering & Pagination
- The API is called once and the client performs:
  - Type filtering
  - Priority or non-priority list derivation
  - Pagination (slice)

## Modular Structure
- `src/services/notificationService.js` → API calls with Axios
- `src/utils/priority.js` → priority mapping + sorting
- `src/context/NotificationContext.jsx` → read/unread state
- `src/components/*` → reusable UI building blocks
- `src/pages/*` → route pages

