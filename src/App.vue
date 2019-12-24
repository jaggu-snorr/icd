<template>
  <div id="app">
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
body {
  font-family: monospace;
  margin: 0;
  padding: 0;
  background-color: #545775;
  color: #545775;
}

#app {
  height: 100vh;
  width: 100vw;
  padding: 0 0rem;
  margin: 0;

  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;

  background-color: #DBCFB0;
}

#content {
  padding: 0 2rem;
}

.button {
  background-color: #90B494;
  border: 1px solid;
  border-color: #545775;
  color: #545775;
  padding: 1rem 2.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 800;
  font-family: monospace;
}
</style>
