import createGeom from 'gl-geometry'
import range from 'array-range'
import rand from 'randf'
import { rgb } from './colors'
import { length, random as rvec3 } from 'gl-vec3'
import icosphere from 'icosphere'

import createTexture from 'gl-texture2d'
import createShader from './shader'
import createVideo from './video'
import createAudio from './audio'
import loadImage from 'img'

const lineTint = rgb('#be360d')
const pointTint = rgb('#000')
const sphere = icosphere(3)

//get N random 3D unit vectors
const N = 30000
const unit = () => rand(-1, 1)
const unitVector = () => range(3).map(unit)
const sphereVector = () => rvec3([])

const pointPositions = range(N).map(sphereVector)
const pointOffsets = range(N).map(unitVector)
const linePositions = sphere.positions
const lineOffsets = pointOffsets
//.map(x => x.map(y => y*2.5))

module.exports = function(gl) {
  const points = createGeom(gl)
    .attr('position', pointPositions)
    .attr('offset', pointOffsets)
    
  const lines = createGeom(gl)
    .attr('position', linePositions)
    .attr('offset', lineOffsets)
    // .faces(sphere.cells)

  const program = createShader(gl)
  const audio = createAudio(gl)

  let texture
  const updateVideo = createVideo(gl, (err, tex) => {
    texture = tex
  })
  // loadImage('img/road.jpg', function(err, image) {
  //   if (err)
  //     console.error(err)
  //   texture = createTexture(gl, image)
  //   texture.filter = [ gl.LINEAR, gl.LINEAR ]
  //   texture.wrap = [ gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE ]
  // })

  return function(dt) {
    if (!texture)
      return

    
    // gl.lineWidth(3)

    program.bind(dt)
    audio(program.shader)
    texture.bind(0)
    texture.update()

    program.tint(lineTint)
    lines.bind(program.shader)
    lines.draw(gl.LINE_LOOP)
    lines.unbind()

    program.tint(pointTint)
    points.bind(program.shader)
    points.draw(gl.POINTS)
    points.unbind()
  }
}