<template>
  <div class="endPage">
    <h1 class="title">&nbsp;Thanks & best wishes</h1>
  </div>
</template>

<script>
export default {
  name: 'end',
  mounted() {
  },
  methods: {
  },
  computed: {
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
.endPage {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-image: url(/images/bk3.png);
  background-color: rgb(242, 242, 237);
  background-size: contain;
  background-position: 100% 100%;
  background-repeat: no-repeat;
}
.title{
  font-weight: 500;
  font-size: 48px;
  color: #fff;
  text-align: center;
  width: 45%;
}
</style>
