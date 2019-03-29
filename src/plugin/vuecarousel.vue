<template>
  <div
    class="vueCarousel carousel-container"
    :style="carouselContainer"
    @mouseenter="enter()"
    @mouseleave="leave()"
  >
    <div
      class="carousel-wrap"
      :style="carouselWrap"
    >
      <img
        class="carousel-image"
        :src="item"
        :alt="index+1"
        v-for="(item,index) in carouselImagesMore"
        :key="index"
        :style="carouselContainer"
      >
    </div>
    <div
      class="carousel-buttons-wrap"
      v-if="carouselOption.showCarouselDot"
    >
      <div class="carousel-buttons">
        <span
          class="carousel-button"
          :class="(index+1) === carouselIndex?'on':''"
          v-for="(item,index) in carouselImagesHear"
          :key="index"
          @click="clickDot(index)"
        ></span>
      </div>
    </div>
    <div
      href="javascript:;"
      class="carousel-arrow arrow-left"
      v-if="carouselOption.showCarouselArrow"
      @click="prev()"
    >&lt;</div>
    <div
      href="javascript:;"
      class="carousel-arrow arrow-right"
      v-if="carouselOption.showCarouselArrow"
      @click="next()"
    >&gt;</div>
  </div>
</template>

<script>
let t;
export default {
  name: "Carousel",
  props: {
    carouselOption: {
      type: Object,
      default: {
        carouselWidth: 600, // 轮播宽度
        carouselHeight: 400, // 轮播高度
        carouselImages: [
          // 轮播图片列表
          "http://img542.ph.126.net/tCiiyha3uF51JQ77kuq5vQ==/2657968205079579487.jpg",
          "http://img.pptjia.com/image/20180126/215946d933577fbe7e0d044d847e027d.jpg",
          "http://img17.3lian.com/d/file/201702/14/bf13787b4f6a5c346c07b8f10466a682.jpg",
          "http://img17.3lian.com/d/file/201702/27/9adc3b40032957c924068833dc051279.jpgg"
        ],
        showCarouselArrow: true, // 是否显示轮播箭头
        showCarouselDot: true, // 是否显示轮播圆点
        carouselInterval: 3000, // 轮播自动播放间隔
        carouselAnimateTime: 100 // 轮播动画时间
      }
    }
  },
  data() {
    return {
      carouselIndex: 1,
      carouselLeft: 0,
      carouselImagesHear: [],
      time: 0,
      carouselImagesMore: []
    };
  },
  computed: {
    carouselContainer() {
      return {
        width: this.carouselOption.carouselWidth + "px",
        height: this.carouselOption.carouselHeight + "px"
      };
    },
    carouselWrap() {
      return {
        width:
          (this.carouselOption.carouselImages.length + 2) *
            this.carouselOption.carouselWidth +
          "px",
        transform: "translate3d(" + this.carouselLeft + "px, 0px, 0px)",
        "-webkit-transition": this.time + "ms",
        "-moz-transition": this.time + "ms",
        transition: this.time + "ms"
      };
    }
  },
  mounted() {
    this.setDot();
    this.autooplay();
  },
  methods: {
    setDot() {
      let carouselImages = this.carouselOption.carouselImages;
      for (let a in carouselImages) {
        this.carouselImagesHear.push(a);
      }
      for (let a of carouselImages) {
        this.carouselImagesMore.push(a);
      }
      this.carouselImagesMore.unshift(
        carouselImages[carouselImages.length - 1]
      );
      this.carouselImagesMore.push(carouselImages[0]);
      this.carouselLeft = -this.carouselOption.carouselWidth;
    },
    autooplay() {
      t = setInterval(() => {
        this.next();
      }, this.carouselOption.carouselInterval);
    },
    next() {
      const _this = this;
      this.time = this.carouselOption.carouselAnimateTime;
      let images = this.carouselOption.carouselImages;
      this.carouselLeft =
        parseInt(this.carouselLeft) -
        parseInt(this.carouselOption.carouselWidth);
      if (this.carouselIndex > this.carouselOption.carouselImages.length - 1) {
        setTimeout(() => {
          _this.time = 0;
          _this.carouselLeft = -_this.carouselOption.carouselWidth;
          _this.resetMoveCarousel(1);
          _this.carouselIndex = 1;
        }, 100);
      } else {
        this.carouselIndex++;
      }
    },
    prev() {
      const _this = this;
      let images = this.carouselOption.carouselImages;
      this.time = this.carouselOption.carouselAnimateTime;
      if (this.carouselIndex < 1) {
        setTimeout(() => {
          _this.time = 0;
          _this.carouselLeft = parseInt(
            -_this.carouselOption.carouselImages.length *
              _this.carouselOption.carouselWidth
          );
          _this.resetMoveCarousel(
            _this.carouselOption.carouselImages.length - 1
          );
          _this.carouselIndex = _this.carouselOption.carouselImages.length - 1;
        }, 100);
      } else {
        this.carouselIndex--;
        this.carouselLeft =
          parseInt(this.carouselLeft) +
          parseInt(this.carouselOption.carouselWidth);
      }
    },
    clickDot(e) {
      const _this = this;
      this.time = this.carouselOption.carouselAnimateTime;
      let images = this.carouselImagesMore;
      if (e + 1 > this.carouselIndex) {
        images.splice(this.carouselIndex + 1, 0, images[e + 1]);
        this.carouselImagesMore = images;
        this.carouselLeft =
          parseInt(this.carouselLeft) -
          parseInt(this.carouselOption.carouselWidth);

        this.resetMoveCarousel(e + 1, this.carouselIndex + 1);
        _this.carouselIndex = e + 1;
      } else if (e < this.carouselIndex) {
        images.splice(this.carouselIndex, 0, images[e + 1]);
        this.time = 0;
        this.carouselImagesMore = images;
        this.carouselLeft =
          parseInt(this.carouselLeft) -
          parseInt(this.carouselOption.carouselWidth);
        setTimeout(() => {
          _this.time = _this.carouselOption.carouselAnimateTime;
          console.log(_this.time);
          _this.carouselLeft =
            parseInt(_this.carouselLeft) +
            parseInt(_this.carouselOption.carouselWidth);
          _this.resetMoveCarousel(e + 1, _this.carouselIndex);
          _this.carouselIndex = e + 1;
        }, 10);
      }
    },
    resetMoveCarousel(e, f) {
      const _this = this;
      setTimeout(() => {
        let images = _this.carouselImagesMore;
        if (f) {
          _this.time = 0;
          images.splice(f, 1);
        } else {
          _this.time = _this.carouselOption.carouselAnimateTime;
        }
        _this.carouselLeft = parseInt(-e * _this.carouselOption.carouselWidth);
        _this.carouselImagesMore = images;
      }, _this.carouselOption.carouselAnimateTime);
    },
    enter() {
      clearInterval(t);
    },
    leave() {
      this.autooplay();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
}
.carousel-container .carousel-wrap {
  position: absolute;
  z-index: 1;
  height: 100%;
}
.carousel-container .carousel-wrap .carousel-image {
  float: left;
  height: 100%;
}
.carousel-container .carousel-buttons-wrap {
  position: absolute;
  width: 100%;
  bottom: 10%;
  text-align: center;
  z-index: 2;
}
.carousel-container .carousel-buttons-wrap .carousel-buttons {
  width: 16%;
  min-width: 120px;
  display: inline-block;
  vertical-align: middle;
  padding: 6px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 0;
}
.carousel-container .carousel-buttons-wrap .carousel-buttons .carousel-button {
  margin-right: 10%;
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  text-align: center;
  cursor: pointer;
}
.carousel-container
  .carousel-buttons-wrap
  .carousel-buttons
  .carousel-button:last-child {
  margin-right: 0;
}
.carousel-container
  .carousel-buttons-wrap
  .carousel-buttons
  .carousel-button.on {
  background-color: #fff;
}
.carousel-container .carousel-arrow {
  position: absolute;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 24px;
  top: 50%;
  margin-top: -18px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 50%;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
  transition-duration: 0.3s;
}
.carousel-container .carousel-arrow.arrow-left {
  left: 10px;
}
.carousel-container .carousel-arrow.arrow-right {
  right: 10px;
}
.carousel-container .carousel-arrow:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.carousel-container:hover .carousel-arrow {
  opacity: 1;
}
.carousel-container:hover .carousel-arrow.arrow-left {
  left: 20px;
}
.carousel-container:hover .carousel-arrow.arrow-right {
  right: 20px;
}
</style>
