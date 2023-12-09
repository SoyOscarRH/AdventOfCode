import { readFileSync } from 'fs';
const input = readFileSync('./3.input.txt', 'utf-8');
const lines = input.split('\n');
const grid = lines.map(line => line.split(''))

const digits = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])

const gears: Record<string, Array<bigint>> = {}

function range(size: number, startAt = 0) {
  return Array.from(Array(size).keys()).map(i => i + startAt);
}

function calculateGears(grid: string[][]) {
  function gearsAdjacent(i: number, j: number): Array<{ i: number, j: number }> {
    const adjacents = [
      { i: i - 1, j: j - 1 },
      { i: i - 1, j: j },
      { i: i - 1, j: j + 1 },
      { i: i, j: j - 1 },
      { i: i, j: j + 1 },
      { i: i + 1, j: j - 1 },
      { i: i + 1, j: j },
      { i: i + 1, j: j + 1 },
    ]

    return adjacents.filter(({ i, j }) => grid[i]?.[j] === '*');
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

  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length;) {
      const element = line[j];
      if (digits.has(element)) {
        const { minJ, maxJ } = calculateMinMaxJ(grid, i, j);
        const value = BigInt(lines[i].slice(minJ, maxJ + 1));
        const gearsSeen = range(maxJ - minJ + 1, minJ)
          .flatMap(someJ => gearsAdjacent(i, someJ))
          .map(gear => `${gear.i},${gear.j}`)

        const uniqueGearsSeen = Array.from(new Set(gearsSeen));
        for (const gearKey of uniqueGearsSeen) {
          if (gears[gearKey] == null) {
            gears[gearKey] = [value];
          }
          else {
            gears[gearKey].push(value);
          }
        }

        j = maxJ + 1;
      }
      else {
        j++
      }
    }
  }
}

calculateGears(grid);
const result = Object.values(gears)
  .filter(nums => nums.length == 2)
  .map(nums => Array.from(nums))
  .map(nums => nums[0] * nums[1])
  .reduce((a, b) => a + b, BigInt(0));

console.log(result);