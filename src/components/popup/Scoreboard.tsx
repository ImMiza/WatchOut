import React from "react";

const Container: React.CSSProperties = {
  width: "600px",
  height: "125px",
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

const Background: React.CSSProperties = {
  position: "fixed",
  width: "100%",
  height: "100%",
  left: "0",
  top: "0",
  filter: "opacity(0.4)",
  backgroundColor: "black",
  zIndex: 9,
};

const Title: React.CSSProperties = {
  fontFamily: "Menlo",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "30px",
  lineHeight: "55px",
  textAlign: "left",
  color: "white",
  textShadow: "rgba(0, 0, 0, 0.25) 4px 4px 0px",
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

const ContainerButton: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};

function Scoreboard(props: {
  title: string;
  buttonText: string;
  buttonList: string;
  onClickSave?: () => void;
  onClickList?: () => void;
}): JSX.Element {
  return (
    <>
      <div style={Background}></div>
      <div style={Container}>
        <p style={Title}>{props.title}</p>
        <div style={ContainerButton}>
          <button
            onClick={() => props.onClickSave && props.onClickSave()}
            style={Button}
          >
            {props.buttonText}
          </button>
          <button
            onClick={() => props.onClickList && props.onClickList()}
            style={Button}
          >
            {props.buttonList}
          </button>
        </div>
      </div>
    </>
  );
}

export default Scoreboard;
