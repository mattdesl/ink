import create from 'gl-vignette-background'
import { rgb } from './colors'

module.exports = function(gl) {
  const bg = create(gl)

  //optional styling 
  bg.style({
      scale: [ 1, 1 ],
      aspect: 1,
      color1: rgb('#e4d3b6'),
      color2: rgb('#6f614a'),
      smoothing: [ -0.5, 1.0 ],
      noiseAlpha: 0.08,
      coloredNoise: true,
      offset: [ -0.05, -0.15 ]
  })

  return function() {
    bg.style({ aspect: gl.drawingBufferWidth / gl.drawingBufferHeight })
    bg.draw()
  }
}