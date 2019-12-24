<template>
  <div id="game">
    <div id="qa-container">
      <div id="question-box">
        <span id="question">{{ game.currentQuestion() }} </span>
      </div>

      <div id="answer-box">
        <!-- <span>Svar:</span> -->
        <div id="answers-box" v-if="isMobile()">
          <div id="alternative" class="button" v-for="(alternative, index) in alternatives" :key="index" @click="answer=alternative; onEnter()"><span>{{ alternative }}</span></div>
        </div>
        <input v-else id="answer-input" ref="answerInput" type="number" autofocus v-model="answer" @keydown.enter="onEnter"/>
      </div>
    </div>

    <span id="result">Antal rätt: {{ correctAnswers }}</span>

    <div id="bottom-box">
      <div id="history-box">
        <span v-if="history.length">Senaste svaren:</span>
        <div id="history-list">
          <ul>
            <li v-for="(entry, index) in history" v-bind:key="index" :class="{incorrect: !entry.correct}">
              {{ entry.question }} = {{ entry.answer }}
            </li>
          </ul>
        </div>
      </div>

      <div id="time-left-box">
        <span v-if="game.secondsLeft()" id="time-left">{{ game.secondsLeft() }}</span>
      </div>
    </div>

    <div id="game-over-box" v-if="game.gameOver()">
      <div id="game-over-content">
        <h4 id="game-over-content-header">Tiden är slut!</h4>
        <p id="result-list">
          <span>- {{ correctAnswers  }} rätt</span>
          <span>- {{ incorrectAnswers  }} fel</span>
          <br>
        </p>
        <p>
          <button class="button" @click="restart()">Igen!</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Game from '@/Game';

@Component
export default class GameComponent extends Vue {
  game: Game;
  answer: string;
  interval: any;

  constructor() {
    super();
    this.game = new Game();
    this.answer = '';
    this.interval = setInterval(this.tick, 1000);
  }

  mounted() {
    this.focusInput();
  }

  focusInput() {
    if (!this.$refs.answerInput) return;

    this.$nextTick(() => {
      // @ts-ignore
      this.$refs.answerInput.focus();
    });
  }

  onEnter() {
    const asNumber = Number(this.answer);
    if (this.answer === '' || isNaN(asNumber) || this.game.gameOver()) return;

    const correct = this.game.giveAnswer(asNumber);
    this.answer = '';
  }

  tick() {
    this.game.tick(1);
  }

  restart() {
    this.game.restart();
    this.focusInput();
  }

  isMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }

  get history() {
    return this.game.history();
  }

  get correctAnswers() {
    return this.game.level() - 1;
  }

  get incorrectAnswers() {
    return this.game.incorrectAnswers().length;
  }

  get alternatives() {
    return this.game.currentAlternatives();
  }
}
</script>

<style scoped>
#game {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 1rem;
  height: 95vh;
}

#question-box {
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  background-color: #718F94;
  border: 1px solid #545775;
  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

#question {
  font-size: 2rem;
  padding: 1rem;
  color: #dbcdb4;
}

#answer-box {
  width: 100%;
  text-align: center;
  padding-top: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

#answer-input {
  width: 100%;
  height: auto;

  word-wrap: break-word;
  word-break: break-all;

  font-size: 2rem;
  text-align: center;

  padding: 0.5rem;

  border: 1px solid #545775;
  border-radius: 1rem;

  background-color: white;
}

#answer-input:focus {
  outline-width: 0;
}

#bottom-box {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

#history-box {
  margin-bottom: 1rem;
  height: 5.5rem;
  max-height: 35%;
  align-self: flex-end;
}

#history-list {
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
}

#history-list::-webkit-scrollbar {
  display: none;
}

li {
  color: green;
}

li.incorrect {
  color: red;
}

#time-left-box {
  display: flex;
  justify-content: flex-end;
  place-self: flex-end;
}

#time-left {
  font-size: 5rem;
}

#result {
  margin-top: 1rem;
  place-self: flex-end;
}

#game-over-box {
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 10;

  text-align: center;
}

#game-over-content {
  background-color: #718F94;
  border: 0.3rem solid;
  border-color: #545775;
  color: #DBCFB0;

  width: 70%;
  height: 70%;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;

  font-size: 1.5rem;
}

#game-over-content-header {
  margin-top: 1rem;
  font-size: 2rem;
}

#result-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

#answers-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 15rem;
}

#alternative {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 1rem;
  width: auto;
  min-width: 1.5rem;
  height: 1rem;
}

</style>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}
</style>