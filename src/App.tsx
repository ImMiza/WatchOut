import React, { useEffect, useState } from 'react';
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";

function App() {


  function checkCollision(entity1: Entity, entity2: Entity){
    return (entity1.getLocation.getX() < (entity2.getLocation.getX() + entity2.getWidth)) &&
        ((entity1.getLocation.getX() + entity1.getWidth) > entity2.getLocation.getX()) &&
        (entity1.getLocation.getY() < (entity2.getLocation.getY() + entity2.getHeight)) &&
        ((entity1.getLocation.getY() + entity1.getHeight) > entity2.getLocation.getY());
  }

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
