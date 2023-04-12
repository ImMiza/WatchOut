import React from "react";
import Settings from "../../utils/Settings";

export interface SettingParameters {
    spaceshipModel: string,
    meteorModel: string,
    allowSound: boolean
}
function Setting(props: {
    onSave?: (value: SettingParameters) => void
}): JSX.Element {

    const [spaceshipSelected, setSpaceshipSelected] = React.useState(Settings.getSpaceshipModel());
    const [meteorSelected, setMeteorSelected] = React.useState(Settings.getMeteorModel());
    const [soundAllow, setSoundAllow] = React.useState(Settings.isSoundAllow());

    return (
        <div>
            <div className="background">
                <div className="shape1"></div>
                <div className="shape2"></div>
            </div>
            <div className="form">
                <div className="pen-intro">
                    <h1>Settings</h1>
                </div>
                <div className="pen-intro" style={{ marginTop: '15px'}}>
                    <p>Spaceships</p>
                </div>
                <div className="pen-intro">
                    {
                        Settings.getSpaceshipModels().map(s => {
                           return (
                               <img src={s} alt='model' style={{
                                   width: '50px',
                                   height: '50px',
                                   margin: '5px',
                                   padding: '5px',
                                   cursor: 'pointer',
                                   backgroundColor: 'gray',
                                   border: `4px ${spaceshipSelected === s ? 'green' : 'black'} solid`
                               }}
                               onClick={() => setSpaceshipSelected(s)}
                               />
                           )
                        })
                    }
                </div>
                <div className="pen-intro" style={{ marginTop: '15px'}}>
                    <p>Meteors</p>
                </div>
                <div className="pen-intro">
                    {
                        Settings.getMeteorModels().map(m => {
                            return (
                                <img src={m} alt='model' style={{
                                    width: '50px',
                                    height: '50px',
                                    margin: '5px',
                                    padding: '5px',
                                    cursor: 'pointer',
                                    backgroundColor: 'gray',
                                    border: `4px ${meteorSelected === m ? 'green' : 'black'} solid`
                                }}
                                     onClick={() => setMeteorSelected(m)}
                                />
                            )
                        })
                    }
                </div>
                <div className="pen-intro" style={{ marginTop: '15px'}}>
                    <p>Sounds</p>
                </div>
                <div className="pen-intro">
                    <input type="checkbox" name="checkbox" id="checkbox_sound" checked={soundAllow} onClick={() => setSoundAllow(!soundAllow)} />
                </div>
                <button className="eightbit-btn" onClick={() => props.onSave && props.onSave({
                    spaceshipModel: spaceshipSelected,
                    meteorModel: meteorSelected,
                    allowSound: soundAllow
                })}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default Setting;