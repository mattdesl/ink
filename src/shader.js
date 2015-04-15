import mat4 from 'gl-mat4'
import createShader from 'gl-shader'

const projection = mat4.create()
const model = mat4.create()
const view = mat4.create()

// needed for AST
const glslify = require('glslify') 

module.exports = function(gl) {
  const vert = glslify('./shaders/point.vert')
  const frag = glslify('./shaders/point.frag')

  var images = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
  if (images <= 0) {
    alert("Sorry, this demo isn't ready for your device yet!")
    console.error("no vertex texture image units")
  }

  const shader = createShader(gl, vert, frag)

  let time = 0
  let rotation = Math.PI/2
  let resolution = [gl.drawingBufferWidth, gl.drawingBufferHeight]
  let translation = [0, 0, -5]

  function bind(dt) {
    time += dt / 1000
    
    const width = gl.drawingBufferWidth
    const height = gl.drawingBufferHeight
    const aspect = width / height

    mat4.perspective(projection, Math.PI/4, aspect, 1, 1000)

    mat4.identity(model)
    mat4.translate(model, model, translation)
    mat4.rotateY(model, model, Math.PI/2)
    mat4.rotateX(model, model, rotation)
    // mat4.rotateZ(model, model, rotation)
    rotation += dt * 0.000025

    shader.bind()
    shader.uniforms.iGlobalTime = time
    shader.uniforms.iResolution = resolution
    shader.uniforms.iChannel0 = 0
    shader.uniforms.projection = projection
    shader.uniforms.model = model
    shader.uniforms.view = view
  }

  return {
    shader: shader,
    bind: bind,
    tint: (rgb) => { shader.uniforms.tint = rgb }
  }
}