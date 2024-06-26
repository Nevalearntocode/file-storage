# Fullstack File Storage App: Next.js, Convex, Clerk, Tailwind

## Features
- Upload/archive/favorite files in real-time using Convex
- Authentication/organization with Clerk
- Search/filter files
- View files as images or table

## Getting Started
### Environment variables
```js
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```
### Convex
In convex setting, add the following environment variables:
- CLERK_WEBHOOK_SECRET=
- CLERK_HOSTNAME=
### Commands
```bash
npm install
npm run dev
npx convex dev
``` 

## Demos
- Main page <br>
  - ![Main page](demos/main-view.png)
- Table and filters <br>
  - ![Table and filters](demos/table-and-filters-view.png)
- Favorite <br>
  - ![Favorite](demos/favorite-view.png)
- Archive <br>
  - ![Archive](demos/archive-view.png)
- Upload <br>
  - ![Upload](demos/upload-view.png)
- Search and actions <br>
  - ![Search and actions](demos/search-and-actions-view.png)
- Restore <br>
  - ![Restore](demos/restore-view.png) 
