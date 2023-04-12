import React from "react";
import {postScore} from "../data/Data";
import {timervalue} from "./settings/timer";

const Background: React.CSSProperties = {
  width: "600px",
  height: "350px",
  backgroundColor: "#384454",
  borderRadius: "10px",
  position: "fixed",
  left: "50%",
  top: "75%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  boxShadow: "rgba(0, 0, 0, 0.25) 5px 5px 0px",
  transform: "translate(-50%, -50%)",
  alignItems: "center",
  zIndex: 10,
};

const Body: React.CSSProperties = {};

function Modal({ closeModal, timer }: { closeModal: (value: boolean) => void, timer: timervalue }) {

    const [username, setUsername] = React.useState('');
    const [isLoading, setLoading] = React.useState<boolean>(false);

  return (
    <div style={Background}>
      <h1>Save your score ! </h1>
      <h2>Veuillez saisir votre pseudo :</h2>
      <div style={Body}>
        <form className="modalform">
          <input
            className="eightbit-btn eightbit-btn--input"
            type="text"
            name="name"
            maxLength={5}
            onChange={(value) => setUsername(value.target.value.trim())}
            value={username.toUpperCase()}
          />
          <input disabled={username.trim().length <= 0} className="eightbit-btn" type="button" value="Envoyer" onClick={() => {
              if(username.trim().length > 0) {
                  setLoading(true);
                  postScore({name: username.trim().toUpperCase(), score: timer.time})
                      .then(r => {
                          setLoading(false);
                          closeModal(false);
                      });
              }
          }} />
        </form>
      </div>
        {
            isLoading &&
            <p>Loading...</p>
        }
      <button
          type='button'
        className="eightbit-btn eightbit-btn--reset"
        onClick={() => closeModal(false) }
      >
        Return
      </button>
    </div>
  );
}

export default Modal;
