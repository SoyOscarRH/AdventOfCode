import { readFileSync } from 'fs';
const input = readFileSync('./4.input.txt', 'utf-8');
const lines = input.split('\n');

function parseCard(line: string) {
  const [id, rest] = line.split(':');
  const [winningNumbersEncoded, numsEncoded] = rest.split('|');
  const toNums = (words: string) => words.split(' ').filter(num => Boolean(num.trim())).map(Number);
  const winningNumbers = toNums(winningNumbersEncoded);
  const nums = toNums(numsEncoded);

  return { id, winningNumbers, nums } as const;
}

function getReward(card: ReturnType<typeof parseCard>) {
  const { winningNumbers, nums } = card;
  let matches = 0;
  for (const num of nums) {
    const index = winningNumbers.indexOf(num);
    if (index !== -1) {
      matches += 1;
      winningNumbers.splice(index, 1);
    }
  }
  return matches > 0 ? Math.pow(2, matches - 1) : 0;
}

function sum(a: number, b: number) {
  return a + b;
}

const rewards = lines
  .map(parseCard)
  .map(getReward)
  .reduce(sum, 0);

console.log(rewards);