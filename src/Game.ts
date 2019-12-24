import Question from './Question';
import QuestionGenerator from './QuestionGenerator';

type GameOptions = {
  startTimeSec?: number,
  questionGenerator?: QuestionGenerator
  timeIncOnCorrect?: number,
}

type GameHistoryEntry = {
  question: Question,
  answer: number,
  correct: boolean,
}

export default class Game {
  private _questionGenerator: QuestionGenerator;
  private _level: number = 1;
  private _initialTimeLeftSec: number = 0;
  private _timeLeftSec: number = 0;
  private _timeIncOnCorrect: number = 0;
  //@ts-ignore
  private _currentQuestion: Question;
  private _history: GameHistoryEntry[] = [];

  constructor(options: GameOptions | undefined = undefined) {
    options = options || {};

    this._questionGenerator = options.questionGenerator || new QuestionGenerator({
    });

    this._level = 1;
    this._initialTimeLeftSec = this._timeLeftSec = (options.startTimeSec || 10);
    this._timeIncOnCorrect = options.timeIncOnCorrect || 5;
    this.nextQuestion();
  }

  tick(sec: number): number {
    this._timeLeftSec -= sec;
    if (this._timeLeftSec <= 0) {
      this._timeLeftSec = 0;
    }

    return this._timeLeftSec;
  }

  restart() {
    this._history = [];
    this._timeLeftSec = this._initialTimeLeftSec;
    this._level = 1;
    this.nextQuestion();
  }

  secondsLeft(): number {
    return this._timeLeftSec;
  }

  gameOver(): boolean {
    return this._timeLeftSec <= 0;
  }

  level(): number {
    return this._level;
  }

  currentQuestion(): string {
    return this._currentQuestion.toString();
  }

  currentAlternatives(count: number = 6): number[] {
    return this._currentQuestion.alternatives(count);
  }

  currentAnswer(): number {
    return this._currentQuestion.answer();
  }

  giveAnswer(answer: number) {
    let correct = (answer === this._currentQuestion.answer());

    this._history.unshift({
      question: this._currentQuestion,
      answer,
      correct,
    });

    if (correct) {
      this.nextLevel();

      this._timeLeftSec += this._timeIncOnCorrect;
    } else {
      //this.nextQuestion();

      this._timeLeftSec = Math.max(0, this._timeLeftSec - this._timeIncOnCorrect);
    }

    return correct;
  }

  history(): GameHistoryEntry[] {
    return this._history;
  }

  incorrectAnswers(): GameHistoryEntry[] {
    return this._history.filter(entry => !entry.correct);
  }

  private nextLevel() {
    ++this._level;
    this.nextQuestion();
  }

  private nextQuestion() {
    this._currentQuestion = this._questionGenerator.generate(this._level);
  }
}
