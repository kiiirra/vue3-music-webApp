<template>
    <div class="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.imageUrl" />
            </van-swipe-item>
        </van-swipe>
    </div>

</template>

<script>
import {reactive, onMounted} from 'vue'
import { getBanner } from '@/request/api/home'
export default {
    setup() {
        const state  = reactive({
            images: [ ],
        })
        onMounted(async ()=>{
            let res = await getBanner()

            state.images = res.data.banners               

        })
        return { state };

    }
}
</script>

<style lang="less" scoped>
.swiperTop {
    .van-swipe {
        width: 100%;
        height: 40vw;
        .van-swipe-item {
            padding: 0 2.6667vw;

            img {
                width: 100%;
                height: 100%;
                border-radius: 2.6667vw;
            }

        }
    }

    :deep(.van-swipe__indicator--active) {
        background-color: rgba(219, 130, 130);
    }
}
</style>