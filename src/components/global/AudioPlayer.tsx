import { MutableRefObject, useRef } from "react";

export default function AudioPlayer({
    src,
    handlePlayAudio,
}: {
    src: string;
    handlePlayAudio: (
        arg0: string,
        ref: MutableRefObject<HTMLAudioElement | null> | null
    ) => void;
}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    return (
        <div>
            <audio
                ref={audioRef}
                controls
                onPlay={() => {
                    handlePlayAudio(src, audioRef)
                }}
            >
                <source src={src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
