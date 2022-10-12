<template>
    <div class="playListContent">
        <div class="list-top">
            <div class="top-left" @click="playMusic(0)">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span>播放全部<span>(共{{ trackList.length }}首)</span></span>
            </div>
            <div class="top-right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{ changeCount(subscribedCount) }})</span>
            </div>
        </div>
        <div class="list">
            <div class="item" v-for="(track, i) in trackList" :key="track.id">
                <div class="item-left" @click="playMusic(i)">
                    <span class="item-index">
                        {{ i + 1 }}
                    </span>
                    <div class="item-intro">
                        <p>{{ track.name }}</p>
                        <span v-for="(item, index) in track.ar" :key="item.id">{{ item.name }}{{ index ===
                                track.ar.length - 1 ? "" : "/"
                        }}</span>
                    </div>
                </div>
                <div class="item-right">
                    <svg class="icon mv" aria-hidden="true" v-if="track.mv != 0">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon list" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import {changeCount} from '@/utils'
import  playlistStore  from '@/store'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
export default {
    props: ['trackList', 'subscribedCount'],
    setup(props) {
        const store = playlistStore()  

        const playMusic = ( i )=>{
            store.updatePlayList(props.trackList)
            store.updatePlayListIndex(i)            
        }

        return { changeCount,playMusic }
    }
}
</script>

<style lang="less" scoped>
.playListContent {
    width: 100%;
    padding: 0 2.6667vw;
    background-color: #fff;
    border-top-left-radius: 5.3333vw;
    border-top-right-radius: 5.3333vw;
    margin-bottom: 16vw;

    .list-top {
        width: 100%;
        height: 13.3333vw;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .top-left {
            width: 40vw;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                stroke: #333;
                stroke-width: 20;
            }

            span {
                font-weight: 900;

                span {
                    font-size: 3.2vw;
                    font-weight: 400;
                    color: #999;
                }
            }
        }

        .top-right {
            height: 10.6667vw;
            line-height: 10.6667vw;
            padding: 0 2.6667vw;
            text-align: center;
            display: flex;
            align-items: center;
            background-color: red;
            border-radius: 5.3333vw;
            color: #fff;

            /* font-size: 15px; */
            .icon {
                width: 4vw;
                height: 4vw;
                fill: #fff;
                margin-right: 1.3333vw;
                stroke: #fff;
                stroke-width: 50;

            }

        }
    }

    .list {
        width: 100%;
        

        .item {
            width: 100%;
            height: 18.6667vw;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .item-left {
                width:80%;
                display: flex;
                align-items: center;
                color: #999;

                .item-index {
                    display: block;
                    width: 3.2vw;
                    text-align:center;
                    font-size: 3.2vw;
                }

                .item-intro {
                    margin-left: 5.3333vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    p {
                        width: 58.6667vw;
                        font-size: 4vw;
                        color: black;
    
                    }

                    span {
                        font-size: 3.2vw;
                    }

                }
            }

            .item-right {
                width: 20%;
                display: flex;
                /* justify-content: space-between; */
                align-items: center;
                position: relative;

                .icon {
                    width: 5.3333vw;
                    height: 5.3333vw;
                    fill: #999;
                }

                .mv {
                    position: absolute;
                    left: 0;
                }

                .list {
                    position: absolute;
                    right: 0;
                }
            }

        }
    }

}
</style>