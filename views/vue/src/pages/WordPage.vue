<template>
  <div class="wordPage">
    <h1 class="title">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  create() {
  },
  methods: {
  },
  computed: {
    msg() {
      return window.INITIAL_STATE[this.$router.getPageId()].content;
    },
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
.wordPage {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title{
  font-weight: bold;
  font-size: 72px;
  color: #333;
  text-align: center;
}
</style>
