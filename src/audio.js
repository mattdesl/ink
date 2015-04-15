import badge from 'soundcloud-badge'
import Analyser from 'gl-audio-analyser'

module.exports = function(gl) {
  const audio = new Audio()
  const analyser = Analyser(gl, audio)

  badge({
    client_id: 'b95f61a90da961736c03f659c03cb0cc',
    song: 'https://soundcloud.com/hermitude/holdin-on-hermitude-remix',
    dark: false,
    getFonts: true
  }, function(err, src, json, div) {
    if (err) throw err
    audio.src = src
    audio.loop = true
    audio.addEventListener('canplay', function() {
      audio.play()
    }, false)
  })

  return function waveform(shader) {
    shader.uniforms.iWaveform = analyser.bindWaveform(1)
  }
}