import React from "react";
import {Data, getScoreData} from "../data/Data";
import {timervalue} from "./settings/timer";

const Background: React.CSSProperties = {
  width: "600px",
  height: "600px",
  backgroundColor: "#384454",
  borderRadius: "10px",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  boxShadow: "rgba(0, 0, 0, 0.25) 5px 5px 0px",
  alignItems: "center",
  zIndex: 15,
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

const Body: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-around',
};

function ModalList({ closeModal }: { closeModal: (value: boolean) => void }) {

  const [scores, setScores] = React.useState<Data[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    getScoreData().then(response => {
      setScores(response);
      setLoading(false);
    });
  }, []);

  if(isLoading) {
    return <div style={Background}>Score loading...</div>
  }

  return (
    <div style={Background}>
      <div style={Title}> BEST SCORE</div>
      {
        scores.length <= 0 &&
          <div style={Body}>
            <p>No score register yet...</p>
          </div>
      }
      {
        scores.map(s => {
          const result: timervalue = {
            time: s.value,
            minutes: Math.floor((s.value / 60000) % 60),
            seconds: Math.floor((s.value / 1000) % 60),
            milliseconds: ((s.value / 10) % 100),
          };
          return (
              <div style={Body}>
                <p>RANK : {s.rank}</p>
                <p>NAME : {s.name}</p>
                <p>SCORE : {`${result.minutes}m ${result.seconds}s ${result.milliseconds}ms`}</p>
              </div>
          )
        })
      }
      <button style={Button} onClick={() => closeModal(false)}>
        RETURN
      </button>
    </div>
  );
}

export default ModalList;
