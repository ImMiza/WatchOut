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

const Title: React.CSSProperties = {
  color: "white",
  textAlign: "center",
  lineHeight: "64px",
};

const Button: React.CSSProperties = {
  background: "black",
  boxShadow: "10px 10px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "70px",
  borderColor: "black",
  outline: "none",
  width: "100px",
  height: "50px",
  cursor: "pointer",
  color: "white",
};

const Body: React.CSSProperties = {};

function ModalList({ closeModal }: { closeModal: any }) {
  return (
    <div style={Background}>
      <div style={Title}> BEST SCORE</div>
      <div style={Body}>
        <p>NAME : </p>
        <p>SCORE :</p>
      </div>
      <button style={Button} onClick={() => closeModal(false)}>
        RETURN
      </button>
    </div>
  );
}

export default ModalList;
