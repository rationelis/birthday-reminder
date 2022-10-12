export function onlyLetters(input: string): boolean {
  return /^[a-zA-Z]+$/.test(input);
}

export function getSubsequentStrings(startIndex: number, text: Array<string>): string {
  let name = text[startIndex];
  for (let i = startIndex; i < text.length - 1; i++) {
    if (!onlyLetters(text[i + 1])) {
      break;
    }
    name += " " + text[i + 1];
  }
  return name;
}

