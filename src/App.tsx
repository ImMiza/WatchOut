import React, { useEffect, useState } from "react";
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";
import Spaceship from './utils/Spaceship';
import Location from './utils/Location';
import Timer from './components/settings/timer';
import Popup from "./components/popup/Popup";

function App() {

  const [isStart, setStart] = React.useState<boolean>(false);
  const [isEnd, setEnd] = React.useState<boolean>(false);

  const spaceshipSize: number = 40;
  const centerX: number = (window.innerWidth / 2.0) - spaceshipSize;
  const centerY: number = (window.innerHeight / 2.0) - spaceshipSize;
  const [spaceship, setSpaceship] = useState(new Spaceship(new Location(centerX,centerY), new Vector(0,0), '', spaceshipSize, spaceshipSize, true, 4));
  /**
   * The main function
   * call 30 times per seconds (30fps)
   */
  function main(): void {
    if(!isStart) {
      return;
    }
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
  }, [isStart, isEnd]);

  return (
      <div>
        {
          !isStart &&
            <Popup title={'Watch out !'} buttonText={'Start'} onClick={() => setStart(true)} />
        }
        {spaceship.getJsxSpaceship()}
      </div>
  );
}

export default App;
