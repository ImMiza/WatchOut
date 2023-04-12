import React from "react";

const Background: React.CSSProperties = {
  width: "600px",
  height: "300px",
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

function Modal({ closeModal }: { closeModal: any }) {
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
          />
          <input className="eightbit-btn" type="submit" value="Envoyer" />
        </form>
      </div>
      <button
        className="eightbit-btn eightbit-btn--reset"
        onClick={() => closeModal(false)}
      >
        Return
      </button>
    </div>
  );
}

export default Modal;
