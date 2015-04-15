import badge from 'soundcloud-badge'
import Analyser from 'gl-audio-analyser'

module.exports = function(gl) {
  const audio = new Audio()
  const analyser = Analyser(gl, audio)

  badge({
    client_id: '408617707914e767ff6e955669a1c4a8',
    song: 'https://soundcloud.com/flume/holdin-on',
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