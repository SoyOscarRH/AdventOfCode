import { readFileSync } from 'fs';
const input = readFileSync('./1.input.txt', 'utf-8');
const result = input
  .split('\n')
  .map(
    (line) => line.split('')
      .map(Number)
      .filter(num => !Number.isNaN(num))
  )
  .map(nums => Number(`${nums.at(0)}${nums.at(-1)}`))
  .reduce((total, nums) => total + nums, 0);

console.log(result);