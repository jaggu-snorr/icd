<template>
  <div id="home">
    <p id="title">Inte Cheops Direkt</p>
    <p id="instructions-list">
      <span>- Svara rätt på så många frågor du kan innan tiden tar slut.</span>
      <br>
      <span>- Du får mer tid varje gång du svarar <span style="color: green;">rätt</span>.</span>
      <br>
      <span>- Du blir av med tid varje gång du svarar <span style="color: red;">fel</span>!</span>
      <br>
    </p>
    <div>
      <router-link class="button" to="/game">Kööör!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>

<style>
#home {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-top: 1rem;
}

#title {
  font-size: 2rem;
}

#instructions-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

</style>