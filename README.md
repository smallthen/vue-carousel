vue图片轮播组件
------
npm i @yaozewei/vue-carousel
------

```
<template>
    <div>
        <Carousel :carouselOption="carouselOption"> </Carousel>
    </div>
</template>

import Vue from 'vue'
import Carousel from '@yaozewei/vue-carousel'
Vue.use(Carousel)

export default {
    data () {
        return {
             carouselOption:{
                carouselWidth: 600,   // 轮播宽度
                carouselHeight: 400,  // 轮播高度
                carouselImages: [     // 轮播图片列表
                    '',
                ],
                showCarouselArrow: true,  // 是否显示轮播箭头
                showCarouselDot: true,    // 是否显示轮播圆点
                carouselInterval: 3000,   // 轮播自动播放间隔
                carouselAnimateTime: 200, // 轮播动画时间
            },
        }
    }
}
```
