import React from 'react';

const Container: React.CSSProperties = {
    width: '600px',
    height: '250px',
    backgroundColor: 'red',
    borderRadius: '20px',
    position: 'fixed',
    left: '50%',
    top: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    boxShadow: 'rgba(0, 0, 0, 0.25) 5px 5px 0px',
    transform: 'translate(-50%, -50%)',
};

const Background: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    filter: 'opacity(0.4)',
    backgroundColor: 'black'
};

const Title: React.CSSProperties = {
    fontFamily: 'Joti One',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '60px',
    lineHeight: '128px',
    textAlign: 'center',
    color: '#000000',
    textShadow: 'rgba(0, 0, 0, 0.25) 4px 4px 0px',
};

const Button: React.CSSProperties = {

};

function Popup(props: {
    title: string,
    buttonText: string
}): JSX.Element {
    return (
        <>
            <div style={Background}></div>
            <div style={Container}>
                <p style={Title}>{props.title}</p>
                <button style={Button}>{props.buttonText}</button>
            </div>
        </>
    )
}

export default Popup;