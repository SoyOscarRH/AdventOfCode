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

function getPowerSetCubes(draws: Array<Draw>): number {
  const red = Math.max(...draws.map(({ red }) => red ?? 0))
  const blue = Math.max(...draws.map(({ blue }) => blue ?? 0))
  const green = Math.max(...draws.map(({ green }) => green ?? 0))
  
  return red * blue * green
}

const result = lines
  .map(toGame)
  .map(({ draws }) => draws)
  .map(getPowerSetCubes)
  .reduce((a, b) => a + b, 0)

console.log(result);