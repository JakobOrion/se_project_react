import { useState, useEffect } from 'react';

function useKey(key) {
  const [keyPressed, setKeyPressed] = useState(false);

  const match = (e) => key.toLowerCase() == e.key.toLowerCase();

  const onDown = (e) => {
    if (match(e)) setKeyPressed(true);
  };
  const onUp = (e) => {
    if (match(e)) setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [key]);

  return keyPressed;
}

export default useKey;
