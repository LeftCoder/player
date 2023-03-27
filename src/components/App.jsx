import Player from './Player'

const path = 'videos/'

const parseExtension = (filename) => {
  return filename.split('.').pop()
}

const makeSources = (files) => {
  const sources = files.map(file => (
    {
      sources: [{
        src: path + file,
        type: 'video/' + parseExtension(file)
      }]
    }
  ))

  return sources
}

const App = ({files}) => {
  const playlist = makeSources(files)

  const options = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true
  };

  return (
    <>
      <Player options={options} playlist={playlist} />
    </>
  );
}

export default App;