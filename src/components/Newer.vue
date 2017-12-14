<template>
  <div class="hello">
    <section class="input-sec">
      <!-- <input v-if="enable" class="input" v-search="searchFunc" type="text"/> -->
      <input v-if="!enable" class="input" v-on:input="searchInputFunc()" type="text" v-model="word"/>
      <!-- <button v-on:click="toggle">toggle</button> -->
      <!-- <label class="countNumber">{{count}}</label> -->
    </section>
    <ul class="oUl">
      <li v-for="poi in list">
        <p class="name">{{poi.name}}<label>{{poi.distance}}米</label></p>
        <p class="address">{{poi.address}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import 'whatwg-fetch';

export default {
  name: 'HelloWorld',
  mounted() {
  },
  methods: {
    searchInputFunc() {
      this.count += 1;
      fetch(`/search?key=be9427ec-bca4-4bfa-b981-9314f6a1adc7&location=121.420341%2C31.215290&region=NEARBY&orderby=weight&radius=50000&pagesize=20&page=1&city=%E4%B8%8A%E6%B5%B7&_=1512027769948&keyword=${this.word}`)
        .then(res => res.json())
        .then(res => res.result)
        .then((data) => {
          this.list = data.pois;
        });
    },
    searchFunc(value) {
      this.count += 1;
      fetch(`/search?key=be9427ec-bca4-4bfa-b981-9314f6a1adc7&location=121.420341%2C31.215290&region=NEARBY&orderby=weight&radius=50000&pagesize=20&page=1&city=%E4%B8%8A%E6%B5%B7&_=1512027769948&keyword=${value}`)
        .then(res => res.json())
        .then(res => res.result)
        .then((data) => {
          this.list = data.pois;
        });
    },
    toggle() {
      this.enable = !this.enable;
    },
  },
  data() {
    return {
      enable: false,
      count: 0,
      word: '',
      list: [],
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
.input {
  outline: none;
  height: 30px;
  width: 80%;
  padding: 0 10px;
  border: 1px solid #f6f6f6;
  border-radius: 4px;
  background: #f6f6f6;
  margin-left: 10px;
  box-sizing: border-box;
}
.input-sec {
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.countNumber {
  display: inline-block;
  align-self: center;
  text-align: center;
  width: 20%;
}
.oUl {
  background-color: #fff;
  overflow:auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  flex: 1;
}
.oUl > li {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 12px 60px 12px 15px;
}
.oUl > li:after {
  content: '';
  position: absolute;
  left: 10px;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: #f0f0f0;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
.oUl > li > .name {
  line-height: 20px;
  font-size: 14px;
  color: #333;
  width: 90%;
}
.oUl > li > .name > label {
  float: right;
  color: #fb4e44!important;
}
.oUl > li > .address {
  margin-top: 5px;
  line-height: 20px;
  height: 20px;
  font-size: 14px;
  color: #666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
}
</style>
