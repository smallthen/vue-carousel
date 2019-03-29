import vuecarousel from './vuecarousel.vue';
let carousel = {};
carousel.install = function (Vue, options) {
  Vue.prototype.$msg = 'vuecarousel.vue';
  Vue.prototype.$myMethod = function (arr) {
    if (arr.length < 0) {
      return false;
    } else {
      arr = arr.join('');
      return arr;
    }
  }
  Vue.component(vuecarousel.name, vuecarousel);
};
export default carousel;