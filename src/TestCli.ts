import Game from './Game';
import QuestionGenerator from './QuestionGenerator';

const generator = new QuestionGenerator({
  operatorOrder: '+-*/',
  levelsPerOperator: 2,
  level1IntervalStart: 0,
  level1IntervalEnd: 10,
});

const game = new Game({
  startTimeSec: 10,
  questionGenerator: generator,
});

for (let i = 0; i < 20; ++i) {
  console.log(`Level: ${game.level()}`);
  console.log(`Question: ${game.currentQuestion()}`);
  console.log(`Alternatives: ${game.currentAlternatives()}`);
  console.log(`Answer: ${game.currentAnswer()}`);
  console.log('');

  game.giveAnswer(game.currentAnswer());
}