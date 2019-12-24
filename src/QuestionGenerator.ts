import Question from './Question';
import { randomInInterval } from './Utils';

type QuestionGeneratorOptions = {
  operatorOrder?: string,
  levelsPerOperator?: number,
  level1IntervalStart?: number,
  level1IntervalEnd?: number,
  roundIntervalIncrease?: number,
};

export default class QuestionGenerator {
  private _operators: string[];
  private _levelsPerOperator: number;
  private _level1IntervalStart: number;
  private _level1IntervalEnd: number;
  private _roundIntervalIncrease: number;

  constructor(options: QuestionGeneratorOptions) {
    const operatorsOrder = options.operatorOrder || '+-*/';
    this._operators = operatorsOrder.split('');
    this._levelsPerOperator = options.levelsPerOperator || 5;
    this._level1IntervalStart = options.level1IntervalStart || 0;
    this._level1IntervalEnd = options.level1IntervalEnd || 10;
    this._roundIntervalIncrease = options.roundIntervalIncrease || 50;
  }

  generate(level: number) {
    const operatorIndex = Math.floor((level - 1) / this._levelsPerOperator) % this._operators.length;
    const operator = this._operators[operatorIndex];

    const roundIndex = Math.floor((level - 1) / (this._levelsPerOperator * this._operators.length));
    // TODO: Increase start as well, but maybe not as much.. two different options? One for start increase and one for interval increase
    const start = this._level1IntervalStart;
    const end = this._level1IntervalEnd + (this._roundIntervalIncrease * roundIndex);

    let firstTerm;
    let secondTerm;

    if (operator === '/') {
      const result = randomInInterval(start / this._level1IntervalEnd, end);
      // Need to tweak second factor when levels gets higher
      secondTerm = randomInInterval(this._level1IntervalStart || 1, this._level1IntervalEnd);
      firstTerm = result * secondTerm;
    } else if (operator === '-') {
      firstTerm = randomInInterval(start + Math.floor((end - start) / 2), end);
      secondTerm = randomInInterval(start, end - Math.floor((end - start) / 2));
    } else if (operator === '*') {
      firstTerm = randomInInterval(start + Math.floor((end - start) / 2), end);
      // Need to tweak second factor when levels gets higher
      secondTerm = randomInInterval(this._level1IntervalStart + Math.floor((this._level1IntervalEnd - this._level1IntervalStart) / 2), this._level1IntervalEnd);
    } else { // +
      firstTerm = randomInInterval(start, end);
      secondTerm = randomInInterval(start, end);
    }

    return new Question(firstTerm, secondTerm, operator);
  }
}
