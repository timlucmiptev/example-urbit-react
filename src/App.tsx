import Urbit_Logo from "./Urbit_Logo.svg";
import React from "react";
import Urbit from "@urbit/http-api";
import create from "zustand";
import _ from "lodash";
import "./App.css";

// default ~zod +code
const code: string = "lidlut-tabwed-pillex-ridrup";
const url: string = "http://localhost:80";

//const code: string = "lavdyr-mocdut-podtex-balsed";
//const url: string = "http://localhost:8080";

// declare types (would be in a types file or dir)
type Todo = { userId: number; id: number; title: string; completed: boolean };
type Store = {
  bears: number;
  todo: Todo | null;
  increasePopulation: () => void;
  removeAllBears: () => void;
  getTodo: (id: number) => void;
};

//
const useApi = _.memoize(() => {
  const api = new Urbit(url, code);
  (async () => {
    await api.connect();
  })();
  return api;
});

// declare a store
const useStore = create<Store>((set) => ({
  bears: 0,
  todo: null,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

  // Use this async pattern to do GET requests (queries to scrys)
  // We don't need a reducer here because we know exactly what we're getting back,
  // and we get it right away
  getTodo: async (id) => {
    const resp = await fetch(
      "https://jsonplaceholder.typicode.com/todos/" + id
    );
    const json = await resp.json();
    set({ todo: json });
  },
}));

// operate on the store outside React component
// note that we don't *call* useStore, but rather access a property
useStore.setState({ bears: 9 });

function App() {
  const api = useApi();

  // pick apart the Zustand store inside our component
  const bears = useStore((state) => state.bears);
  const todo = useStore((state) => state.todo);
  const increasePopulation = useStore((state) => state.increasePopulation);
  const getTodo = useStore((state) => state.getTodo);
  return (
    <div className="App">
      <header className="App-header">
        <img src={Urbit_Logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          {bears} Bear{bears === 1 ? "" : "s"}
        </p>
        <button onClick={() => increasePopulation()}>one up</button>
        <button onClick={() => useStore.setState({ bears: bears + 3 })}>
          Increase Manually by 3
        </button>
        <p />
        <h3>Current TODO</h3>
        <p>{todo !== null ? JSON.stringify(todo) : "No TODO Selected"}</p>
        <button onClick={() => getTodo(1)}>Get TODO remotely/async</button>
        <h4>Connection</h4>
        <p>{api.ship !== null ? api.ship : "Not connected"}</p>
      </header>
    </div>
  );
}

export default App;
