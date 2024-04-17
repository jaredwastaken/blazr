import { CHARS } from './alphanum';

let min = 0;
let max = 62;

export function randomize(input: string) {
  const len = input.length;
  let output = '';
  for (let i = 0; i < len; i++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    output += CHARS[randomNum];
  }

  return output;
}
