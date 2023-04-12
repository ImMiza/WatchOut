import React, {useEffect, useState} from "react";
import Vector from "./utils/Vector";
import Entity from "./utils/Entity";
import Spaceship from "./utils/Spaceship";
import Location from "./utils/Location";
import Timer, {timervalue} from "./components/settings/timer";
import Meteor from "./utils/Meteor";
import MusicPlayer, {Music} from "./utils/MusicPlayer";
import Modal from "./components/Modal";
import ModalList from "./components/ModalList";
import Settings from "./utils/Settings";
import Setting from "./components/settings/Setting";
import ReactAudioPlayer from "react-audio-player";

function App() {
  const [isStart, setStart] = React.useState<boolean>(false);
  const [isEnd, setEnd] = React.useState<boolean>(false);
  const [currentMusic, setCurrentMusic] = React.useState<Music>(Music.nomusic);
  const [isLoop, setLoop] = React.useState<boolean>(true);

  const [isOpenSetting, setOpenSetting] = React.useState<boolean>(false);

  let timeBeforeApparition = 60;
  let currentTimeBefore = timeBeforeApparition;

  const cleanMeteors = 300;
  let currentCleanMeteors = cleanMeteors;

  let meteorSpeed = 4;
  const riseDifficult = 90;
  let currentRiseDifficult = riseDifficult;

  function riseLevel(): void {
    currentRiseDifficult -= 1;
    if(currentRiseDifficult <= 0) {
      currentRiseDifficult = riseDifficult;
      timeBeforeApparition -= 3;
      meteorSpeed += 0.5;
    }
  }

  const spaceshipSize: number = 40;
  const centerX: number = window.innerWidth / 2.0 - spaceshipSize;
  const centerY: number = window.innerHeight / 2.0 - spaceshipSize;
  const [spaceship, setSpaceship] = useState(
    new Spaceship(
      new Location(centerX, centerY),
      new Vector(0, 0),
      Settings.getSpaceshipModel(),
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
    spaceship.setLocation = new Location(centerX, centerY);
    spaceship.setVector = new Vector(0, 0);
    currentTimeBefore = timeBeforeApparition;
    currentCleanMeteors = cleanMeteors;
    if(Settings.isSoundAllow()) {
      setLoop(true);
      setCurrentMusic(Music.musique);
    }
    setStart(true);
    setEnd(false);
  }

  /**
   * Update all the meteor positions and check collision
   */
  function updateMeteors(): void {
    setMeteors((prev) =>
      prev.map((m) => {
        if (Entity.checkCollision(m, spaceship)) {
          if(Settings.isSoundAllow()) {
            setLoop(false);
            setCurrentMusic(Music.explosion);
          }
          setEnd(true);
          setStart(false);
        }
        m.move();
        return m;
      })
    );
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
          new Meteor(spaceship.getLocation, Settings.getMeteorModel(), 40, 40, (Math.random() * ((meteorSpeed + 2) - (meteorSpeed - 2) + 1) + (meteorSpeed - 2)))
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

    spaceship.setLocation = spaceship.startRotation();

    cleanMeteor();
    updateAddMeteor();
    riseLevel();
  }

  const [openModal, setOpenModal] = useState(false);
  const [openModalList, setOpenModalList] = useState(false);

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
        if (spaceship.getIsMoving) {
          spaceship.setIsMoving(false);
          spaceship.displacement(spaceship.getLocation.getRotation, 30);
          spaceship.screenLimit(spaceship.getLocation);
          spaceship.setIsMoving(true);
          return;
        }
      }
    });
  }, []);

  return (
    <div>
      <h1>
        <Timer timer_on={isStart} on_timer_end={(value) => setTimer(value)} />
      </h1>
      {openModalList && <ModalList closeModal={setOpenModalList} />}
      {!isStart && (
        <div>
          <div className="background">
            <div className="shape1"></div>
            <div className="shape2"></div>
          </div>
          <div className="form">
            <div className="pen-intro">
              <h1>Watch Out</h1>
            </div>
            <button className="eightbit-btn" onClick={() => {
              setStart(true);
              if (Settings.isSoundAllow()) {
                setLoop(true);
                setCurrentMusic(Music.musique);
              }
            }}>
              Play Game
            </button>
            <button className="eightbit-btn eightbit-btn--proceed" onClick={() => setOpenSetting(true)} >
              Setting
            </button>
            <button className="eightbit-btn eightbit-btn--reset" onClick={() => setOpenModalList(true)}>Score</button>
          </div>
        </div>
      )}
      {
        isOpenSetting &&
          <Setting onSave={(value) => {
            setOpenSetting(false);
            Settings.setMeteorModel(value.meteorModel);
            Settings.setSpaceshipModel(value.spaceshipModel);
            Settings.setSoundAllow(value.allowSound);
            spaceship.setImage = value.spaceshipModel;
          }} />
      }
      {isEnd && (
        <>
          <div>
            <div className="background">
              <div className="shape1"></div>
              <div className="shape2"></div>
            </div>
            <div className="form">
              <div className="pen-intro">
                <h1>Game Over</h1>
              </div>
              <p>
                Your Score : {timer?.minutes}min {timer?.seconds}s{" "}
                {timer?.milliseconds}ms
              </p>
              {openModal && timer && <Modal closeModal={setOpenModal} timer={timer} />}
              <div className="container-btn">
                <button
                  className="eightbit-btn eightbit-btn--proceed"
                  onClick={() => setOpenModal(true)}
                >
                  Save
                </button>
                <button
                  className="eightbit-btn eightbit-btn--proceed"
                  onClick={() => setOpenModalList(true)}
                >
                  list score
                </button>
              </div>
              <button
                className="eightbit-btn eightbit-btn--proceed"
                onClick={() => retry()}
              >
                Try again
              </button>
              <a className="eightbit-btn eightbit-btn--reset">Return</a>
            </div>
          </div>
        </>
      )}
      {spaceship.getJsxSpaceship()}
      {meteors.map((m) => m.jsxElement)}
      <MusicPlayer music={currentMusic} loop={isLoop} />
    </div>
  );
}

export default App;
