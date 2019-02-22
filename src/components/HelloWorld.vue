<template>
    <div>
        <Carousel :carouselOption="carouselOption"> </Carousel>
    </div>
</template>

<script>
import Vue from 'vue'
// import Carousel from '../plugin/vuecarousel.js'
import Carousel from '../../dist/vuecarousel.js'
Vue.use(Carousel)
export default {
    data () {
        return {
             carouselOption:{
                carouselWidth: 600,   // 轮播宽度
                carouselHeight: 400,  // 轮播高度
                carouselImages: [     // 轮播图片列表
                    'http://img542.ph.126.net/tCiiyha3uF51JQ77kuq5vQ==/2657968205079579487.jpg',
                    'http://img.pptjia.com/image/20180126/215946d933577fbe7e0d044d847e027d.jpg',
                    'http://img17.3lian.com/d/file/201702/14/bf13787b4f6a5c346c07b8f10466a682.jpg',
                    'http://img17.3lian.com/d/file/201702/27/9adc3b40032957c924068833dc051279.jpg'
                ],
                showCarouselArrow: true,  // 是否显示轮播箭头
                showCarouselDot: true,    // 是否显示轮播圆点
                carouselInterval: 3000,   // 轮播自动播放间隔
                carouselAnimateTime: 200, // 轮播动画时间
            },
        }
    },
    components: {

    },
}
</script>

<style>
</style>