import React from "react";
import './timer.css';

 export interface timervalue   {
    time : number,
    minutes : number,
    seconds : number,
    milliseconds : number,

}
const Timer =(props : {
  timer_on : boolean
  on_timer_end : (value : timervalue) => void
}) =>{
    const [time, setTime] = React.useState(0);
    const [timerOn, setTimerOn] = React.useState(props.timer_on);

    React.useEffect(() => {
        if(props.timer_on) {
            setTime(0);
        }
        setTimerOn(props.timer_on);
    },[props.timer_on])

  
    React.useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined ;
      if (timerOn) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 100);
        }, 100);
      } else if (!timerOn) {
          clearInterval(interval);
          const result = {
              time: time,
              minutes: Math.floor((time / 60000) % 60),
              seconds: Math.floor((time / 1000) % 60),
              milliseconds: ((time / 10) % 100),
          };
          props.on_timer_end(result);
      }
      return () => clearInterval(interval);
    }, [timerOn]);

    return (
      <div className="Timers">
        <div id="display">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
      </div>
      
    );
  };
  



export default Timer;


