import { readFileSync } from 'fs';
const input = readFileSync('./3.input.txt', 'utf-8');
const lines = input.split('\n');
const grid = lines.map(line => line.split(''))

const digits = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])

function range(size: number, startAt = 0) {
  return Array.from(Array(size).keys()).map(i => i + startAt);
}

function getPartNumbers(grid: string[][]): number {
  function hasNonDigitAdjacent(i: number, j: number): boolean {
    const adjacents = [
      grid[i - 1]?.[j - 1],
      grid[i - 1]?.[j],
      grid[i - 1]?.[j + 1],
      grid[i]?.[j - 1],
      grid[i]?.[j + 1],
      grid[i + 1]?.[j - 1],
      grid[i + 1]?.[j],
      grid[i + 1]?.[j + 1],
    ]
    return adjacents.filter(x => x != null && x !== '.')
      .some(element => !digits.has(element))
  }

  function calculateMinMaxJ(grid: string[][], i: number, j: number) {
    let minJ = j;
    let maxJ = j;
    while (minJ > 0 && digits.has(grid[i][minJ - 1])) {
      minJ--;
    }

    while (maxJ < grid[i].length && digits.has(grid[i][maxJ + 1])) {
      maxJ++;
    }

    return { minJ, maxJ };
  }

  let result = 0;
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length;) {
      const element = line[j];
      if (digits.has(element)) {
        const { minJ, maxJ } = calculateMinMaxJ(grid, i, j);
        const hasAnyNonDigitAdjacent = range(maxJ - minJ + 1, minJ).some(someJ => hasNonDigitAdjacent(i, someJ));
        if (hasAnyNonDigitAdjacent) {
          const value = lines[i].slice(minJ, maxJ + 1);
          result += parseInt(value);
        }
        j = maxJ + 1;
      }
      else {
        j++
      }
    }
  }

  return result;
}

console.log(getPartNumbers(grid));