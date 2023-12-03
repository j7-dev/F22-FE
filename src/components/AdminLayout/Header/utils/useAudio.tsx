import { useRef } from 'react';

const useAudio = () => {
    const audio = useRef<HTMLAudioElement>(null);
    const audioUrl = `${window.location.origin}/audio/notice.mp3`;

    const play = () => {
        console.log('⭐  audio.current:', audio.current);

        if (audio.current) {
            audio.current.play();
            console.log('⭐  played:');
        }
    };

    const Audio = () => (
        <audio ref={audio} controls className="hidden">
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    );

    return { Audio, play };
};

export default useAudio;
