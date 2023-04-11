import React, { useEffect, useState } from "react";
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";
import Location from "./utils/Location";

function App() {
  const entite1 = new Entity(
    new Location(100, 200),
    new Vector(0, 0),
    "",
    40,
    40
  );
  const entite2 = new Entity(new Location(1, 2), new Vector(0, 0), "", 40, 40);

  console.log(Entity.checkCollision(entite1, entite2));
  /**
   * The main function
   * call 30 times per seconds (30fps)
   */
  function main(): void {}

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
