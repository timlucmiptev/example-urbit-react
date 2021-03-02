# tldr; React Dev on Urbit, Explained
Setting up a quick React app with Visual Studio Code and `create-react-app` is easy. Figuring out how to connect that app to your Urbit is easy.  Handling all the state and interactions with your Urbit is hard.

This document provides an overview of what types of interactions we need to handle, followed by a how-to of setting up an interface project that interacts with your Urbit, remotely or locally.

The code in this project is a HOWTO/reference for these patterns. See the [README](README.md) for what's in it.

## Handling Global State and APIs
Frequently, when writing a UX application, you want to create "global" objects that you initialize once, and then have accessible everywhere in your app.

### Primary Use Cases/Needs
1. APIs that you do some setup work for that you don't want to repeat (negotiating initial auth, subscribing to data feeds, etc.)
2. State objects that can be accessed from anywhere in your app, obviating the need to pass variables down your component hierarchy ("prop drilling").
3. Watching one of those state objects to run an action whenever it changes (update a remote log whenever the set of users changes).
4. TODO: write about need for lazy-loading state

### Approaches to Meeting Those Needs 
1. `useApi/memoization` pattern: create an object in a library, and use `memoize()` to create it at most once. Whenever another piece of code imports this object, it will be created if it doesn't exist, but returned if it already does. This lets us ensure that things like initial auth are done only once. 
2. React Hooks: very similar to memoization. The most basic use is [State Hooks](https://reactjs.org/docs/hooks-state.html), which are just a non-user created version of a memoized state object. Libraries like `zustand` use a `create` function that initializes the store if it doesn't exist, and returns it if it does. You can also do `useEffect` [hooks](https://reactjs.org/docs/hooks-overview.html#effect-hook), that watch *another* piece of state from a store, and run a side effect if the state changes.

### Lazy-Loading State
TODO: relate to #4 in use cases

## Sending and Receiving Data from Your Urbit
There are two ways of sending data to a running Urbit, and three ways of receiving it. They are handled in different places in the code.

Sending. This always happens via the `api` object we create with the `useApi` pattern.
1. thread
2. poke

Receiving:
1. scry (without reducers)
2. thread(without reducers)
3. subscription(need reducer)

### Update State: Reducers
You can always update state by simply creating `set*`-type functions inside your zustand stores. However, because Urbit is always returning data on subscription paths, it's useful to make some reducers to handle those.

There is *nothing special* about reducers. They are just functions that let us take data and produce a new state, which we can then merge back into a Zustand or React Hooks store so that our UI refreshes. 

We only need a reducer when we're unsure what kind of data we are getting back and need to "switch". This means that reducers are only used to handle subscription results, which can have multiple types of data. Scrys and threads can just be made API actions, and processed pseudo-synchronously with `await`/`Promise`.

## Structure

### Dependencies
1. React
2. Typescript (optional)
3. Urbit `npm` APIs
4. Zustand or similar state manager
5. CORS proxy (in some cases, for development)

### Things to Create the First Time


## How to Connect 
TODO: write proxy/CORS considerations
### To Local Ship in Development

### To Remote Ship
