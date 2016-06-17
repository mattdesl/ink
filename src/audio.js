import badge from 'soundcloud-badge'
import Analyser from 'gl-audio-analyser'

module.exports = function(gl) {
  const audio = new Audio()
  const analyser = Analyser(gl, audio)

  badge({
    client_id: 'b95f61a90da961736c03f659c03cb0cc',
    song: 'https://soundcloud.com/kartell/sg-lewis-no-less-kartell-remix-1',
    dark: false,
    getFonts: true
  }, function(err, src, json, div) {
    if (err) throw err
    
    //temp fix since CORS are not enabled on SoundCloud :(    
    audio.crossOrigin = 'Anonymous'
    audio.src = src
    audio.loop = true
    audio.addEventListener('canplay', function() {
      console.log("Playing audio...")
      audio.play()
    }, false)
  })

  return function waveform(shader) {
    shader.uniforms.iWaveform = analyser.bindWaveform(1)
  }
}