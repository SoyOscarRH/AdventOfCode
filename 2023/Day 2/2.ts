import { readFileSync } from 'fs';
const input = readFileSync('./2.input.txt', 'utf-8');
const lines = input.split('\n')

type Draw = { red?: number, blue?: number, green?: number }
type Game = { draws: Array<Draw>, id: number }

function toDraw(drawPrinted: string) {
  return drawPrinted
    .split(',')
    .map(item => {
      const [value, key] = item.split(' ').slice(1)
      return { value: parseInt(value), key }
    })
    .reduce(
      (draw, item) => ({ ...draw, [item.key]: item.value }),
      {} as Draw
    )
}

function toGame(line: string, id: number): Game {
  const drawsPrinted = line.split(':').at(1)!.split(';')
  return { draws: drawsPrinted.map(toDraw), id: id + 1 }
}

function isDrawInValid(draw: Draw) {
  const MAX_RED = 12, MAX_GREEN = 13, MAX_BLUE = 14
  const { red, blue, green } = draw
  return (
    red != null && red > MAX_RED ||
    blue != null && blue > MAX_BLUE ||
    green != null && green > MAX_GREEN
  )
}

const result = lines
  .map(toGame)
  .filter(({ draws }) => !draws.some(isDrawInValid))
  .map(({ id }) => id)
  .reduce((a, b) => a + b, 0)

console.log(result);