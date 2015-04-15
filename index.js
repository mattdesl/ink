const gl = require('webgl-context')()
const canvas = gl.canvas
const dpr = Math.min(1.5, window.devicePixelRatio)
const fit = require('canvas-fit')(canvas, window, dpr)
const loop = require('raf-loop')
const engine = require('./src/engine')(gl)
const background = require('./src/background')(gl)

require('domready')(() => {
  window.addEventListener('resize', fit, false)
  document.body.appendChild(canvas)
  loop(draw).start()
})

function draw(dt) {
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl

  gl.viewport(0, 0, width, height)

  gl.disable(gl.DEPTH_TEST)
  gl.disable(gl.CULL_FACE)
  gl.disable(gl.BLEND)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  
  background(dt)

  // gl.enable(gl.BLEND)
  // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  engine(dt)
}