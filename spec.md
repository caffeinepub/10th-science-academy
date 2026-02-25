# Specification

## Summary
**Goal:** Add user-created Pages and Posts management to the 10th Science Academy site, allowing authenticated users to create, view, edit, and delete their own pages and posts.

**Planned changes:**
- Add backend data models and CRUD API for custom pages (title, content, author, timestamps) in the Motoko actor
- Add backend data models and CRUD API for posts (title, body, author, timestamps) in the Motoko actor, with data persistence across upgrades
- Add a "Pages" section to the frontend with a list view (card grid), create form, and edit/delete controls for page owners
- Add a "Posts" section to the frontend with a reverse-chronological list, create form, and edit/delete controls for post owners
- Add "Pages" and "Posts" navigation links to the site header
- Wire both sections to the backend using the existing useActor hook and React Query for fetching, mutations, and cache invalidation
- Show loading and error states during async operations; unauthenticated users can view but not create, edit, or delete

**User-visible outcome:** Users can navigate to dedicated Pages and Posts sections, browse all content, and—when logged in—create, edit, and delete their own pages and posts without a page refresh, all styled consistently with the existing red-accented academy theme.
