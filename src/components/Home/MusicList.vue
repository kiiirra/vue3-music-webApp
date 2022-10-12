<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="130" :show-indicators="false" class="music-swipe">
                <van-swipe-item v-for="item in state.musicList" :key="item.id">
                    <router-link :to="{path:'/playlist',query:{id:item.id}}">
                        <img :src="item.picUrl" alt="">
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-24gl-play"></use>
                            </svg>
                            {{ changeCount(item.playCount) }}
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link>

                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicList } from '@/request/api/home'
import { reactive, onMounted} from 'vue'
import { changeCount } from '@/utils'

export default {
    setup() {
        const state = reactive({
            musicList: []

        })
        onMounted(async () => {
            /* 获取推荐歌单列表 */
            let res = await getMusicList()
            if (res.data.code == 200) {

                state.musicList = res.data.result
            } else {
                console.log('请求失败');

            }
        })
       



        return { state, changeCount }
    }
}
</script>

<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 66.6667vw;
    padding: 2.6667vw;
    background-color: #fff;
    .musicTop {
        width: 100%;
        height: 8vw;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 5.3333vw;
            font-weight: 900;

        }

        .more {
            border: 1px solid #ccc;
            border-radius: 5.3333vw;
            padding: 0 2.6667vw;
            line-height: 8vw;
            text-align: center;
        }
    }

    .musicContent {
        width: 100%;
        height: 48vw;
        margin-top: 2.6667vw;

        .van-swipe-item {
            position: relative;
            padding-right: 2.6667vw;
            font-size: 13px;

            img {
                width: 100%;
                height: 32vw;
                border-radius: 2.6667vw;
            }

            .playCount {
                position: absolute;
                top: 1.6vw;
                right: 4vw;
                z-index: 100;
                color: white;

                .icon {
                    width: 4vw;
                    height: 4vw;
                    vertical-align: -0.15em;
                    fill: #fff
                }

            }

            .name {
                width: 100%;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

        }


    }
}
</style>