import Player from './Player'
const path = 'videos/'

const parseExtension = (filename) => {
  return filename.split('.').pop()
}

const makeSources = (files) => {
  return files.map(file => ({
    sources: [{
      src: path + file,
      type: 'video/' + parseExtension(file)
    }]
  }))
}

const App = ({files}) => {
  const playlist = makeSources(files)

  return (
    <>
      <Player playlist={playlist} />
    </>
  );
}

export default App;