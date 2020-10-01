import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  console.log('history: ', history);

  const transition = (mode, replace = false) => {
    // setHistory((prev) => [...prev, newMode : null]);
    // setHistory((prev) => (replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]));
    setHistory((prev) => (replace ? [...prev, mode] : [...prev, mode]));

    console.log('history: inside transition ', history);

    setMode(mode);
  };
  //['First', 'second', 'third']
  const back = () => {
    // setHistory((prev) => [...prev.splice(history.length - 1, 1)]);
    if (history.length < 2) return;

    setHistory((prev) => [...prev.slice(0, history.length - 1)]);
  };
  // setMode(history[history.length - 1]);

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;

const arr = [1, 2, 3, 4];
const newArr = [...arr];
