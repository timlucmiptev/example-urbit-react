import logo from "./logo.svg";
import React from "react";
import create from 'zustand';
import "./App.css";

// declare some types
type IUser = {name: string};
type Store = 
  {bears: number
   increasePopulation: () => void
   removeAllBears: () => void
  };

// declare a store
const useStore = create<Store>(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}));

// operate on the store outside React component (note that we don't *call* useStore, but access a property)
useStore.setState({bears: 9});

function App() {
  const [val, setVal] = React.useState<IUser | null>(null);
  const bears = useStore(state => state.bears);
  const increasePopulation = useStore(state => state.increasePopulation);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Zustand state</p>
        <p>{bears} Bear{bears === 1 ? '' : 's'}</p>
        <button onClick={() => increasePopulation()}>one up</button>
        <button onClick={() => increasePopulation()}>Increase Manually</button>
        <p />
        <p>{val !== null ? val.name : "BLANK"}</p>
        <button onClick={() => setVal({name: "me"})}>change string</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
