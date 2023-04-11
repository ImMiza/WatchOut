import React, { useEffect, useState } from "react";
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";
import Spaceship from './utils/Spaceship';
import Location from './utils/Location';

function App() {
  
  const [spaceship, setSpaceship] = useState(new Spaceship(new Location(50,50), new Vector(0,0), '', 40, 40, true, 4));
  /**
   * The main function
   * call 30 times per seconds (30fps)
   */
  function main(): void {
    setSpaceship(Object.create(spaceship.startRotation()));
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

  return (
      <div>
        {spaceship.getJsxSpaceship()}
      </div>
  );
}

export default App;
