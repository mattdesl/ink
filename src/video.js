import createTexture from 'gl-texture2d'
import loadImage from 'img'
import events from 'dom-events'

module.exports = function(gl, cb) {
  const element = document.createElement('video')
  element.setAttribute('loop', true)
  element.setAttribute('muted', 'muted')
  addSource('video/mp4', 'video/nyc.mp4')
  
  events.on(element, 'canplay', ev => {
    const texture = createTexture(gl, element)
    texture.update = update.bind(null, texture)
    element.play()
    cb(null, texture)
  })

  function addSource(type, path) {
    var source = document.createElement('source')
    source.src = path
    source.type = type
    return element.appendChild(source)
  }

  function update(texture) {
    texture.setPixels(element)
  }
}