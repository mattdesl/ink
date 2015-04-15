import badge from 'soundcloud-badge'
import Analyser from 'gl-audio-analyser'

module.exports = function(gl) {
  const audio = new Audio()
  const ctx = new (window.AudioContext)()
  let analyser 
  // const analyser = Analyser(gl, audio)

  badge({
    client_id: 'b95f61a90da961736c03f659c03cb0cc',
    song: 'https://soundcloud.com/flume/holdin-on',
    dark: false,
    getFonts: true
  }, function(err, src, json, div) {
    if (err) throw err
      
    console.log(src)
    var source = document.createElement('source')
    // source.src = src
    audio.setAttribute('crossorigin', 'anonymous')
    audio.src = src
    // audio.appendChild(source)

    // audio.loop = true
    audio.addEventListener('canplay', function() {
      console.log("Yup", audio)
      audio.play()
    }, false)

    audio.addEventListener('canplaythrough', function() {
      setTimeout(function() {
        analyser = Analyser(gl, audio, ctx)
      }, 1000)
      console.log("Yup2", audio)
    })
  })

  return function waveform(shader) {
    if (analyser)
      shader.uniforms.iWaveform = analyser.bindWaveform(1)
  }
}