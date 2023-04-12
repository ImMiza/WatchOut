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
    const [timervalue, setTimeValue] = React.useState<timervalue>({
        time ,
        minutes : 0,
        seconds : 0,
        milliseconds : 0,


    });
    React.useEffect(() => {
      if (timerOn === false) {
        props.on_timer_end(timervalue);
      }
    },[timerOn]);


    React.useEffect(() => {
      setTimerOn(props.timer_on);
    },[props.timer_on])

  
    React.useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined ;
      if (timerOn) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 100);
        }, 10);
      } else if (!timerOn) {
        clearInterval(interval);
        setTimeValue({
            time : time,
            minutes : Math.floor((time / 60000) % 60),
            seconds : Math.floor((time / 1000) % 60),
            milliseconds :((time / 10) % 100),
        })

      }
      return () => clearInterval(interval);
    }, [timerOn]);

    return (
      <div className="Timers">
        <h2>chronomètre</h2>
        <div id="display">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
            <div >
            {!timerOn && time > 0 && (
                <div id="display">
                    <h2>votre score : </h2>
            <span>{timervalue.minutes} minutes :</span>
            <span>  {timervalue.seconds} seconds:</span>
            <span> {timervalue.milliseconds} milliseconds</span>
            </div>
            )}
            </div>
            
  
        <div id="buttons">
          {!timerOn && time === 0 && (
            <button onClick={() => setTimerOn(true)}>Start</button>
          )}
          {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
          {!timerOn && time > 0 && (
            <button onClick={() => setTime(0)}>Reset
            </button>
          )}
        </div>
      </div>
      
    );
  };
  



export default Timer;


