import mat4 from 'gl-mat4'
import createGeom from 'gl-geometry'
import createShader from 'gl-shader'
import range from 'array-range'
import rand from 'randf'
import { rgb } from './colors'
import { length, random as rvec3 } from 'gl-vec3'

const glslify = require('glslify') // needed for AST

const lineTint = rgb('#605c51')
const pointTint = rgb('#323232')
const projection = mat4.create()
const model = mat4.create()
const view = mat4.create()

//get N random 3D unit vectors
const N = 40000
const unit = () => rand(-1, 1)
const unitVector = () => range(3).map(unit)
const sphereVector = () => rvec3([])

const pointPositions = range(N).map(sphereVector)
const offsets = range(N).map(unitVector)
const linePositions = pointPositions
          .slice()
          .sort(comparator)
          .slice(0, 100)

module.exports = function(gl) {
  const points = createGeom(gl)
    .attr('position', pointPositions)
    .attr('offset', offsets)
  const lines = createGeom(gl)
    .attr('position', linePositions)
    .attr('offset', offsets)


  const vert = glslify('./shaders/point.vert')
  const frag = glslify('./shaders/point.frag')
  const shader = createShader(gl, vert, frag)
  let time = 0
  let rotation = Math.PI/2
  let resolution = [gl.drawingBufferWidth, gl.drawingBufferHeight]

  return function(dt) {
    time += dt / 1000
    const width = gl.drawingBufferWidth
    const height = gl.drawingBufferHeight
    const aspect = width / height

    //resolution

    mat4.perspective(projection, Math.PI/4, aspect, 1, 1000)

    mat4.identity(model)
    mat4.translate(model, model, [0, 0, -5])
    mat4.rotateY(model, model, rotation)
    // rotation += dt * 0.0001

    shader.bind()
    shader.uniforms.iGlobalTime = time
    shader.uniforms.iResolution = resolution
    shader.uniforms.projection = projection
    shader.uniforms.model = model
    shader.uniforms.view = view

    shader.uniforms.tint = lineTint
    lines.bind(shader)
    lines.draw(gl.LINES)
    lines.unbind()

    shader.uniforms.tint = pointTint
    points.bind(shader)
    points.draw(gl.POINTS)
    points.unbind()

  }
}

function comparator(a, b) {
  return length(b) - length(a)
}