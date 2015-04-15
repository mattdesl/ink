import createTexture from 'gl-texture2d'
import loadImage from 'img'
import events from 'dom-events'

module.exports = function(gl, cb) {
  const element = document.createElement('video')
  element.setAttribute('loop', true)

  events.on(element, 'canplay', ev => {
    const texture = createTexture(gl, element)
    texture.update = update.bind(null, texture)
    element.play()
    cb(null, texture)
  })
  element.src = 'video/horse.mp4'

  function update(texture) {
    texture.setPixels(element)
  }
}