import React, { useEffect, useState } from "react";
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";
import Spaceship from "./utils/Spaceship";
import Location from './utils/Location';
import Timer, {timervalue} from './components/settings/timer';
import Popup from "./components/popup/Popup";
import Scoreboard from "./components/popup/Scoreboard";
import Meteor from "./utils/Meteor";
import MusicPlayer, { Music } from "./utils/MusicPlayer";
import Modal from "./components/Modal";



function App() {

  const [isStart, setStart] = React.useState<boolean>(false);
  const [isEnd, setEnd] = React.useState<boolean>(false);
  const [currentMusic, setCurrentMusic] = React.useState<Music>(Music.nomusic);
  const [isLoop, setLoop] = React.useState<boolean>(true);


  let timeBeforeApparition = 60;
  let currentTimeBefore = timeBeforeApparition;

  const cleanMeteors = 240;
  let currentCleanMeteors = cleanMeteors;

  const spaceshipSize: number = 40;
  const centerX: number = window.innerWidth / 2.0 - spaceshipSize;
  const centerY: number = window.innerHeight / 2.0 - spaceshipSize;
  const [spaceship, setSpaceship] = useState(
    new Spaceship(
      new Location(centerX, centerY),
      new Vector(0, 0),
      "/images/rocket.svg",
      spaceshipSize,
      spaceshipSize,
      true,
      4
    )
  );

  const [meteors, setMeteors] = React.useState<Meteor[]>([]);

  const [timer, setTimer] = React.useState<timervalue>();

  /**
   * Retry the game
   */
  function retry(): void {
    setMeteors([]);
    setSpaceship(
      new Spaceship(
        new Location(centerX, centerY),
        new Vector(0, 0),
        "/images/rocket.svg",
        spaceshipSize,
        spaceshipSize,
        true,
        4
      )
    );
    currentTimeBefore = timeBeforeApparition;
    currentCleanMeteors = cleanMeteors;
    setCurrentMusic(Music.musique);
    setStart(true);
    setEnd(false);
  }

  /**
   * Update all the meteor positions and check collision
   */
  function updateMeteors(): void {
    setMeteors((prev) => prev.map(m => {
      if (Entity.checkCollision(m, spaceship)) {
        setCurrentMusic(Music.explosion);
        setEnd(true);
        setStart(false);
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
      setMeteors((prev) =>
        prev.filter((m) => {
          return !(
            m.getLocation.getX < 0 ||
            m.getLocation.getX > window.innerWidth ||
            m.getLocation.getY > window.innerHeight ||
            m.getLocation.getY + m.getHeight < 0
          );
        })
      );
    }
  }

  /**
   * add new meteor on the map
   */
  function updateAddMeteor(): void {
    currentTimeBefore -= 1;
    if (currentTimeBefore <= 0) {
      currentTimeBefore = timeBeforeApparition;
      setMeteors((prev) =>
        prev.concat(
          new Meteor(spaceship.getLocation, "/images/meteor.png", 40, 40)
        )
      );
    }
  }

  /**
   * The main function
   * call 30 times per seconds (30fps)
   */
  function main(): void {
    if (!isStart) {
      return;
    }

    if (isEnd) {
      return;
    }
    updateMeteors();
    setSpaceship(Object.create(spaceship.startRotation()));
    cleanMeteor();
    updateAddMeteor();
  }

  const [openModal, setOpenModal] = useState(false);

  /**
   * don't touch
   */
  useEffect(() => {
    const interval = setInterval(() => {
      main();
    }, 1000 / 27);

    return () => clearInterval(interval);
  }, [isStart, isEnd]);

  useEffect(() => {

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Space") {
         if(spaceship.getIsMoving === true){
            spaceship.setIsMoving(false);
            spaceship.displacement(spaceship.getLocation.getRotation , 30);
            spaceship.screenLimit(spaceship.getLocation)
            spaceship.setIsMoving(true);
            return;
         }
      }
    });

  }, []);

  return (
      <div>
        <Timer timer_on={isStart} on_timer_end={(value) => setTimer(value)} />
        {
          !isStart &&
            <div>
              <div className="background">
              <div className="shape1"></div>
              <div className="shape2"></div>
              </div>
              <form>
                <div className="pen-intro">
                  <h1>Watch Out</h1>
                </div>
                <button className="eightbit-btn" onClick={() => setStart(true)} >Play Game</button>
                <button className="eightbit-btn eightbit-btn--proceed">Setting</button>
                <button className="eightbit-btn eightbit-btn--reset">Information</button>
              </form>
            </div>
        }
        {
          isEnd &&
            <>
              <div>
                <div className="background">
                  <div className="shape1"></div>
                  <div className="shape2"></div>
                </div>
                <form>
                  <div className="pen-intro">
                    <h1>Game Over</h1>
                  </div>
                  <button className="eightbit-btn eightbit-btn--proceed" onClick={() => retry()} >Try again</button>
                  <a className="eightbit-btn eightbit-btn--reset">Return</a>
                </form>
              </div>
              <Scoreboard
                  title={"Votre score : 1 min 30 sec"}
                  buttonText={"Save Score"}
                  buttonList={"List of score"}
                  onClickSave={() => {
                    setOpenModal(true);
                  }}
              />
            </>
        }
        {spaceship.getJsxSpaceship()}
        {meteors.map(m => m.jsxElement)}
        <MusicPlayer music={currentMusic} loop={false} />
      </div>
  );
}

export default App;
