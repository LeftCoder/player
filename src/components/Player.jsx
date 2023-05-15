import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import videojsPlaylistPlugin from 'videojs-playlist'
import { useRef, useEffect } from 'preact/hooks'

videojs.registerPlugin('playlist', videojsPlaylistPlugin)

const Player = ({playlist}) => {
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  const options = {
    controls: false
  };

  const start = (player, playlist) => {
    player.playlist(playlist);
    player.playlist.autoadvance(0)
    player.playlist.repeat(true)
    
    player.ready(() => {
      player.play()
    })
  }

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js")
      videoElement.classList.add('w-full', 'h-screen')
      videoRef.current.appendChild(videoElement)

      playerRef.current = videojs(videoElement, options)
    }     

    start(playerRef.current, playlist)
  }, [options, videoRef])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    };
  }, [playerRef])

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default Player;