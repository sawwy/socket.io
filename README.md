# Socket.IO testing with Remix

## Scope

Backend just for fun, mainly frontend stuff. Using Remix for frontend.

Future considerations:

1. Basic CSS Modules could be upgraded with sass
2. Color scheme was stolen from discord but overall design architeture would use shared tokens / variables
3. Both backend and frontend create a layered testing architectture but next level would be in creating actual production builds with tests
4. Texts could be internationalized
5. Chat and User list supports scrolling but there is room in tracking user activity and handling new messages depending users vertical scroll position. Longer message history should be virtualized / paged
6. Backend: exposes `/flushUsers` to support E2E testing. For real production deployment there should at least be e.g. an env variable so the api is only usable in dev / staging / ci
7. Backend: Users are currently stored in-memory in the backend.
8. Backend: message history should be stored somewhere
9. Remix library had some hydration issues with React 18.2. These were very bluntly side-stepped with a `cy.wait()`. For a real app, I would strongly reconsider using Remix in the first place or at least have a look on [remix-island](https://github.com/Xiphe/remix-island)
10. Frontend styles for desktop experience. Would likely create separate components for the mobile web users to nail the ux on mobile.

### Structure

For the frontend, the most interesting parts can be found inside `app` and `cypress` folders.

The contents of app include:

`components`: Standalone building blocks that include jest snapshots to bolster against accidental breaking changes in the future.
`contexts`: Basic React Context structure to provide the logic for state updates. For an app of a bigger scope, I would consider e.g. Redux Toolkit
`hooks`: A couple of small abstractions for socket usage and tracking/reacting to user interactions for clicks outside an html element
`routes`: simple routes used Remix
`styles`: General css reset and a shared stylesheets
`utils`: helper functions
`views`: The main layout files for the "login" and "lobby" views.

Outside `enums` and `types`, the rest of the files inside the app folder are Remix generated scaffolding. `cypress` folder hosts the e2e specs.

### Libraries

1. Decided to take the React Remix for a spin as the boilerplate app
2. cypress for 2e2 tests
3. identity-obj-proxy to solve css module mapping with ts-jest
4. ts-jest for creating component snapshots
5. react-test-renderer for jest snapsnots
6. pluralize to assist in creating texts for the UI
7. usehooks-ts to assist in creating custom hooks

## Start up

Using node (v21.6.2)
Install via yarn and start up dev servers.

Backend (`./backend`):

```sh
yarn
yarn dev
```

Frontend (`./frontend`):

```sh
yarn
yarn dev
```

check the frontend prompt for the address and open in browser (likely: http://localhost:5173/)

## Testing

Test can be run separately on backend and frontend. Current structure is built on the idea that frontend tests would be run against a backend server on a ci pipeline. E.g spinning up frontend and backend containers with docker.

### Backend

```sh
yarn test
```

### Frontend

```sh
yarn test:jest
yarn test:cypress
```
