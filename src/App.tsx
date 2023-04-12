import React, { useEffect, useState } from 'react';
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";
import Spaceship from './utils/Spaceship';
import Location from './utils/Location';

function App() {
  
  const screenWidth = window.innerWidth; // Width of the viewport
  const screenHeight = window.innerHeight; // Height of the viewport

  const screenMiddleX = screenWidth / 2; // Middle X coordinate
  const screenMiddleY = screenHeight / 2; // Middle Y coordinate

  const [spaceship, setSpaceship] = useState(new Spaceship(new Location(screenMiddleX, screenMiddleY), new Vector(0,0), '', 40, 40, true, 4));
  /**
   * The main function
   * call 30 times per seconds (30fps)
   */
  function main(): void {
    setSpaceship(Object.create(spaceship.startRotation()));
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === " " || event.code === "Space") {
        console.log(spaceship.getIsMoving);
         if(spaceship.getIsMoving === true){
            spaceship.setIsMoving(false);
            const spaceshipSquarre = document.getElementById("spaceship"); // Remplacez "monCarre" par l'ID de votre élément carré
            if(spaceshipSquarre) {
              console.log(spaceship.getLocation);
            spaceship.displacement(1, spaceship.getLocation);
            spaceship.screenLimit(spaceship.getLocation)
            spaceship.setIsMoving(true);
            console.log(spaceship.getLocation);
            return;
            }
         
         }
      }
    });
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

  return <div>{spaceship.getJsxSpaceship()}</div>;
}

export default App;
