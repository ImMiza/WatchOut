import React, { useEffect, useState } from "react";
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";
import Spaceship from './utils/Spaceship';
import Location from './utils/Location';
import Timer from './components/settings/timer';
import Popup from "./components/popup/Popup";
import Meteor from "./utils/Meteor";

function App() {

  const [isStart, setStart] = React.useState<boolean>(false);
  const [isEnd, setEnd] = React.useState<boolean>(false);

  let timeBeforeApparition = 60;
  let currentTimeBefore = timeBeforeApparition;

  const cleanMeteors = 240;
  let currentCleanMeteors = cleanMeteors;

  const spaceshipSize: number = 40;
  const centerX: number = (window.innerWidth / 2.0) - spaceshipSize;
  const centerY: number = (window.innerHeight / 2.0) - spaceshipSize;
  const [spaceship, setSpaceship] = useState(new Spaceship(new Location(centerX,centerY), new Vector(0,0), '', spaceshipSize, spaceshipSize, true, 4));

  const [meteors, setMeteors] = React.useState<Meteor[]>([]);

  /**
   * Retry the game
   */
  function retry(): void {
    setMeteors([]);
    setSpaceship(new Spaceship(new Location(centerX,centerY), new Vector(0,0), '', spaceshipSize, spaceshipSize, true, 4));
    currentTimeBefore = timeBeforeApparition;
    currentCleanMeteors = cleanMeteors;
    setStart(true);
    setEnd(false);
  }

  /**
   * Update all the meteor positions and check collision
   */
  function updateMeteors(): void {
    setMeteors((prev) => prev.map(m => {
      if (Entity.checkCollision(m, spaceship)) {
        setEnd(true);
      }
      m.move();
      return m;
    }));
  }

  /**
   * clean the meteors table for optimization
   */
  function cleanMeteor(): void {
    currentCleanMeteors -= 1;
    if (currentCleanMeteors <= 0) {
      currentCleanMeteors = cleanMeteors;
      setMeteors((prev) => prev.filter(m => {
        return !(m.getLocation.getX < 0
            || m.getLocation.getX > window.innerWidth
            || m.getLocation.getY > window.innerHeight
            || (m.getLocation.getY + m.getHeight) < 0)
      }));
    }
  }

  /**
   * add new meteor on the map
   */
  function updateAddMeteor(): void {
    currentTimeBefore -= 1;
    if (currentTimeBefore <= 0) {
      currentTimeBefore = timeBeforeApparition
      setMeteors((prev) => prev.concat(new Meteor(spaceship.getLocation, '', 40, 40)));
    }
  }

  /**
   * The main function
   * call 30 times per seconds (30fps)
   */
  function main(): void {
    if(!isStart) {
      return;
    }

    if(isEnd) {
      return;
    }

    updateMeteors();

    setSpaceship(Object.create(spaceship.startRotation()));

    cleanMeteor();

    updateAddMeteor();
  }

  /**
   * don't touch
   */
  useEffect(() => {
    const interval = setInterval(() => {
      main();
    }, 1000 / 27);

    return () => clearInterval(interval);
  }, [isStart, isEnd]);

  return (
      <div>
        {
          !isStart &&
            <Popup title={'Watch out !'} buttonText={'Start'} onClick={() => setStart(true)} />
        }
        {
          isEnd &&
            <Popup title={'Game over !'} buttonText={'Retry'} onClick={() => retry()} />
        }
        {spaceship.getJsxSpaceship()}
        {meteors.map(m => m.jsxElement)}
      </div>
  );
}

export default App;
