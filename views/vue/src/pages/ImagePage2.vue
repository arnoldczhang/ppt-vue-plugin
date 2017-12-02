<template>
  <div class="imagePage">
    <h2 class="contentTitle">{{ title }}</h2>
    <ul v-if="subTitle" class="listUl">
      <li class="listLi">{{ subTitle }}</li>
    </ul>
    <section class="imgBox">
      <img
        class="imgImage"
        v-for="item in img"
        :src="item"
        v-bind:style="styleObject"
      />
    </section>
  </div>
</template>

<script>
const state = window.INITIAL_STATE;
export default {
  name: 'imagePage',
  create() {
  },
  methods: {
  },
  computed: {
    title() {
      return state[this.$router.getPageId()].title;
    },
    subTitle() {
      return state[this.$router.getPageId()].subTitle;
    },
    img() {
      let img = state[this.$router.getPageId()].image;
      if (typeof img === 'string') {
        img = [img];
      }
      this.styleObject.width = `${(100 / img.length) - 5}%`;
      return img;
    },
  },
  data() {
    return {
      styleObject: {
        width: '100%',
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgBox {
  padding: 30px 0;
  padding-top: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 70vh;
  overflow: hidden;
  box-sizing: border-box;
}
.imgImage {
  object-fit: contain;
}
.imagePage {
  padding-top: 5vh;
  height: 100%;
  width: 100%;
}
.listUl {
  padding: 0;
  padding-left: 50px;
  list-style: disc;
}
.listLi {
  font-size: 36px;
  padding-left: 30px;
  color: #333;
  display: block;
  position: relative;
}
.listLi:before {
  content: '';
  height: 15px;
  width: 15px;
  border-radius: 50%;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  display: inline-block;
  position: absolute;
  color: #333;
  background-color: #666;
}
</style>
