import { readFileSync } from 'fs';
const input = readFileSync('./1.input.txt', 'utf-8');

const fromLineToNumbers = (line: string): Array<number> => {
  const toSearch = [
    { keys: ["0"], value: 0 },
    { keys: ["1", "one"], value: 1 },
    { keys: ["2", "two"], value: 2 },
    { keys: ["3", "three"], value: 3 },
    { keys: ["4", "four"], value: 4 },
    { keys: ["5", "five"], value: 5 },
    { keys: ["6", "six"], value: 6 },
    { keys: ["7", "seven"], value: 7 },
    { keys: ["8", "eight"], value: 8 },
    { keys: ["9", "nine"], value: 9 },
  ]

  const thingAndIndexes = toSearch
    .flatMap(({ keys, value }) => keys.map(key => ({ value, firstIndex: line.indexOf(key), lastIndex: line.lastIndexOf(key) })))

  const firstIndexes = thingAndIndexes.filter(({ firstIndex }) => firstIndex !== -1).toSorted((a, b) => a.firstIndex - b.firstIndex)
  const lastIndexes = thingAndIndexes.filter(({ lastIndex }) => lastIndex !== -1).toSorted((a, b) => a.lastIndex - b.lastIndex)

  return [firstIndexes.at(0).value, lastIndexes.at(-1).value]
}

const result = input
  .split('\n')
  .map(fromLineToNumbers)
  .map(nums => Number(`${nums.at(0)}${nums.at(-1)}`))
  .reduce((total, nums) => total + nums, 0);

console.log(result);