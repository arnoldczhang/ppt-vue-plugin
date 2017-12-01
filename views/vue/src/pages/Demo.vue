<template>
  <div class="demoPage">
    <h1 class="title">demo</h1>
  </div>
</template>

<script>
export default {
  name: 'entrance',
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
.demoPage {
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
