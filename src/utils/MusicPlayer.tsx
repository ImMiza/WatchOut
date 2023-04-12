import React from "react";
import ReactAudioPlayer from "react-audio-player";

interface Props {
  music: string
  loop?: boolean
}

export enum Music {
    nomusic = '',
    explosion = '/sound/Explosion.mp3',
    explosion2 = '/sound/Explosionv2.mp3',
    musique = '/sound/Sound_Effect.mp3',
}

const MusicPlayer = ({ music, loop }: Props) => {
    return <ReactAudioPlayer src={music} autoPlay controls loop={loop ?? true} style={{ display : "none"}}/>
};

export default MusicPlayer;