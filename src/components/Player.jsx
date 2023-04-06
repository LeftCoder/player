import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import videojsPlaylistPlugin from 'videojs-playlist';
import { useRef, useEffect } from 'preact/hooks';

videojs.registerPlugin('playlist', videojsPlaylistPlugin);

const Player = ({options, playlist, onReady}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        playerRef.current = player;
    
        player.playlist(playlist);
        player.playlist.autoadvance(0);
        player.playlist.repeat(true)
      });

    } else {
      const player = playerRef.current;
      
      player.playlist(playlist);
      player.playlist.autoadvance(0);
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