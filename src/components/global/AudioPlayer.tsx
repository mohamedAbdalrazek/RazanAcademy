export default function AudioPlayer({src}:{src:string}) {

    return (
        <div>
            <audio controls>
                <source src={src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}