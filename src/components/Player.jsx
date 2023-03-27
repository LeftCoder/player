import videojs from 'video.js';
import videojsPlaylistPlugin from 'videojs-playlist';
import 'video.js/dist/video-js.css';
import { useRef, useEffect } from 'preact/hooks';

videojs.registerPlugin('playlist', videojsPlaylistPlugin);

const Player = ({options, playlist}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        player.playlist(playlist);
        player.playlist.autoadvance(0);
        player.play();
        player.playlist.repeat(true)
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.playlist(playlist);
      player.playlist.autoadvance(0);
      player.play();
      player.playlist.repeat(true)
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default Player;