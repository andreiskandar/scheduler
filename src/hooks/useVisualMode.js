import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setHistory((prev) => (replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]));
    setMode(mode);
    // setHistory((prev) => [...prev, newMode : null]);
  };
  // setHistory((prev) => (replace ? [...prev, mode] : [...prev, mode]));
  const back = () => {
    // setHistory((prev) => [...prev.splice(history.length - 1, 1)]);
    if (history.length < 2) return;

    setHistory((prev) => [...prev.slice(0, history.length - 1)]);
  };
  // setMode(history[history.length - 1]);

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
