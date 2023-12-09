import { readFileSync } from 'fs';
const input = readFileSync('./4.input.txt', 'utf-8');
const lines = input.split('\n');

function range(size: number, startAt = 0) {
  return Array.from(Array(size).keys()).map(i => i + startAt);
}

function sum(a: number, b: number) {
  return a + b;
}


function parseCard(line: string) {
  const [cardId, rest] = line.split(':');
  const [winningNumbersEncoded, numsEncoded] = rest.split('|');
  const toNums = (words: string) => words.split(' ').filter(num => Boolean(num.trim())).map(Number);
  const winningNumbers = toNums(winningNumbersEncoded);
  const nums = toNums(numsEncoded);
  const id = parseInt(cardId.replace('Card ', ''));

  return { id, winningNumbers, nums } as const;
}

function calculateRewards(card: ReturnType<typeof parseCard>, thePile: typeof totalPile) {
  const { winningNumbers, nums } = card;
  const localCopyOfWinningNumbers = [...winningNumbers];
  let matches = 0;
  for (const num of nums) {
    const index = localCopyOfWinningNumbers.indexOf(num);
    if (index !== -1) {
      matches += 1;
      localCopyOfWinningNumbers.splice(index, 1);
    }
  }

  const copies = range(matches, card.id + 1);
  for (const copy of copies) {
    const copiedCard = cards[copy - 1];
    calculateRewards(copiedCard, thePile);
  }

  thePile.push(card.id);
}


const totalPile: Array<number> = [];
const cards = lines.map(parseCard)

for (const card of cards) {
  calculateRewards(card, totalPile);
}

console.log(totalPile.length);