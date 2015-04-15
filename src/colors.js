import hex from 'hex-rgb'

export const rgb = (str) => hex(str).map(x => x/255)
export const rgba = (str, a=1) => [...rgb(str), a]
export default hex
