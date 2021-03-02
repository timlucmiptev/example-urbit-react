import logo from "./logo.svg";
import Urbit_Logo from "./Urbit_Logo.svg";
import React from "react";
import create from "zustand";
import "./App.css";

// declare types
type Todo = { userId: number; id: number; title: string; completed: boolean };
type Store = {
  bears: number;
  todo: Todo | null;
  increasePopulation: () => void;
  removeAllBears: () => void;
  getTodo: (id: number) => void;
};

// declare a store
const useStore = create<Store>((set) => ({
  bears: 0,
  todo: null,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
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
      </header>
    </div>
  );
}

export default App;
