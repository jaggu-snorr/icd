import { randomInInterval, shuffleArray } from './Utils';

export default class Question {
  private _firstTerm: number = 0;
  private _secondTerm: number = 0;
  private _operator: string = '';

  constructor(firstTerm: number, secondTerm: number, operator: string) {
    this._firstTerm = firstTerm;
    this._secondTerm = secondTerm;
    this._operator = operator;
  }

  answer(): number {
    return eval(this.toString());
  }

  alternatives(count: number): number[] {
    const answer = this.answer();
    const digitCount = String(Math.abs(answer)).length;
    const halfSpread = Math.pow(4, digitCount);
    let start = answer - halfSpread;
    start = Math.max(start, 0);
    let end = answer + halfSpread;
    end = Math.max(end, 10);

    if (answer < 0) {
      const newStart = -end;
      end = -start;
      start = newStart;
    }

    const result: number[] = [];
    while (result.length < (count - 1)) {
      const alternative = randomInInterval(start, end);
      if (!result.includes(alternative) && alternative !== answer) {
        result.push(alternative);
      }
    }

    // The answer
    result.push(answer);

    // Shuffle it
    shuffleArray(result);
    return result;
  }

  toString(): string {
    if (!this._operator) return '';

    return `${this._firstTerm} ${this._operator} ${this._secondTerm}`;
  }
}
