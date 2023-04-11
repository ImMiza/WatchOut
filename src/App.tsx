import React, { useEffect, useState } from 'react';
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";

function App() {

  /**
   * The main function
   * call 30 times per seconds (30fps)
   */
  function main(): void {
  }

  /**
   * don't touch
   */
  useEffect(() => {
    const interval = setInterval(() => {
      main();
    }, 1000 / 30);

    return () => clearInterval(interval);
  }, []);

  return <div>Watch out !</div>;
}

export default App;
