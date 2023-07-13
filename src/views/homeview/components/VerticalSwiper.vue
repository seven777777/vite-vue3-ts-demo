<template>
    <swiper
        v-if="list.length && iKeep"
        class="swiper-con"
        direction="vertical"
        :autoplay="{ delay: 2600, pauseOnMouseEnter: true }"
        :loop="true"
        :modules="[Autoplay]"
        @click="swiperClick"
    >
        <swiper-slide class="swiper-item" v-for="news in list" :key="news.id">
            <div class="innerText link" :data-id="news.id">
                <span :style="{ '--tag-color': LandTypeColor[news.type] }">【{{ news.type }}-{{ news.city }}】</span>
                {{ news.content }}
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
import { onActivated, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import 'swiper/scss'
import { LandTypeColor } from '@/config/enum.config'
import type { INewList } from '@/types/home.type'

const props = defineProps<{ list: INewList[] }>()
const swiperClick: (swiper: any, event: any) => void = (swiper, event) => {
    console.log(event.target.getAttribute('data-id'))
}

// 解决keepalive返回swiper自动轮播失效问题
let iKeep = ref<boolean>(true)
onActivated(() => {
    iKeep.value = false
    setTimeout(() => {
        iKeep.value = true
    }, 100)
})
</script>

<style lang="scss" scoped>
.swiper-con {
    height: 100%;
}
.swiper-item {
    display: flex;
    align-items: center;

    .innerText {
        @include one_line_hidden;
        span {
            color: var(--tag-color);
        }
    }
}
</style>
