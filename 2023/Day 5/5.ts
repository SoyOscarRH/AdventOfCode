import { readFileSync } from 'fs';

function parseMapping(input: string) {
  const [title, ...mappings] = input.split('\n');
  const [from, middle, to] = title.split(' ').at(0).split('-');

  const ranges = mappings
    .map(line => (line.split(' ').map(BigInt)))
    .map(([destination, source, size]) => ({ destination, source, size }));

  return { from, to, ranges };
}

function parseInput(input: string) {
  const [initialSeeds, ...mappings] = input.split('\n\n');
  const initialSeedsNumsPairs = initialSeeds.split(': ').at(1).split(" ").map(BigInt);
  const maps = mappings.map(parseMapping);

  const initialSeedsRanges = [];
  for (let i = 0; i < initialSeedsNumsPairs.length; i += 2) {
    const start = initialSeedsNumsPairs[i];
    const size = initialSeedsNumsPairs[i + 1];
    
    initialSeedsRanges.push({ start, end: start + size });
  }

  return { initialSeedsRanges, maps };
}

function checkOverlap(lineA: {start: bigint, end: bigint}, lineB: {start: bigint, end: bigint}) {
  return lineA.start >= lineB.start && lineA.start <= lineB.end || 
         lineA.end >= lineB.start && lineA.end <= lineB.end ||
         lineB.start >= lineA.start && lineB.start <= lineA.end || 
         lineB.end >= lineA.start && lineB.end <= lineA.end;
}

function calculateMappedRange(range: { start: bigint, end: bigint }, mappings: { destination: bigint, source: bigint, size: bigint }[]) {
  const ranges = [range];
  const newRanges = [];

  for (const { destination, source, size } of mappings) {

    for (const indivialRange of ranges) {
      const startToMapRange = indivialRange.start;
      const endToMapRange = indivialRange.end;

      const startMappingRange = source;
      const endMappingRange = source + size;
      
      const doTouch = checkOverlap({ start: startToMapRange, end: endToMapRange }, { start: startMappingRange, end: endMappingRange });
      if (!doTouch) {
        continue;
      }

      const newStart = startToMapRange < startMappingRange ? startMappingRange : startToMapRange;
      const newEnd = endToMapRange < endMappingRange ? endToMapRange : endMappingRange;

      newRanges.push({ start: destination + (newStart - source), end: destination + (newEnd - source) });
      
      // left 
      

    }
  }

  return newRanges;
}

const input = readFileSync('./5.input.txt', 'utf-8');
const data = parseInput(input);

function calculateLocation(range: { start: bigint, end: bigint }) {
  let currentState = "seed"
  let value = range;
  for (const { from, to, ranges } of data.maps) {
    if (currentState === from) {
      value = calculateMappedRange(value, ranges);
      currentState = to;
    }

    if (currentState === "location") {
      return value;
    }
  }
}

const locations = data.initialSeeds.map(calculateLocation).map(Number);
const minLocation = Math.min(...locations);
console.log(minLocation);

