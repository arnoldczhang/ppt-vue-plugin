<template>
  <div class="hello">
  </div>
</template>

<script>
import 'whatwg-fetch';

export default {
  name: 'HelloWorld',
  mounted() {
  },
  methods: {
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  background-color: #f6f6f6;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
