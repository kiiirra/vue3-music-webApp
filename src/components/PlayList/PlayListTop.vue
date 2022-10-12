<template>
    <div class="listTopHeader">
        <img :src="playList.coverImgUrl" alt="" class="bgUrl">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
    </div>
    <div class="listTopContent">
        <div class="contentLeft">
            <img :src="playList.coverImgUrl" alt="">
            <div class="playCount">

                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-play"></use>
                </svg>
                <span>
                    {{ changeCount(playList.playCount) }}
                </span>
            </div>
        </div>
        <div class="contentRight">
            <p class="list-name">{{ playList.name }}</p>
            <div class="creator">
                <img :src="playList.creator.avatarUrl" alt="">
                <span>{{ playList.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            <p class="list-desc">{{ playList.description }}</p>
        </div>

    </div>
    <div class="listTopFooter">
        <div class="footer-item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <span>
                {{ playList.commentCount }}
            </span>
        </div>
        <div class="footer-item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>
                {{ playList.shareCount }}
            </span>
        </div>
        <div class="footer-item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <span>
                下载
            </span>
        </div>
        <div class="footer-item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>
                多选
            </span>
        </div>

    </div>
</template>

<script>
import { changeCount } from '@/utils'
export default {
    props: ['playList'],
    setup(props) {
        props.playList.creator = props.playList.creator ? props.playList.creator : JSON.parse(sessionStorage.getItem('playList')).playList.creator
        return { changeCount}
    }
}
</script>

<style lang="less" scoped>
.listTopHeader {
    width: 100%;
    height: 13.3333vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .itemLeft,
    .itemRight {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 2.6667vw;

        span {
            font-size: 4.8vw;
            color: #fff;

        }

        .icon {
            fill: #fff
        }

    }

    .bgUrl {
        position: absolute;
        z-index: -100;
        width: 100%;
        height: 146.6667vw;
        top:0;
        filter: blur(10px);
    }
}

.listTopContent {
    width: 100%;
    height: 40vw;
    padding: 2.6667vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .contentLeft {
        width: 32vw;
        height: 32vw;
        position: relative;

        img {
            width: 32vw;
            height: 32vw;
            border-radius: 2.6667vw;
            position: absolute;
            z-index: -1;
        }

        .playCount {
            position: absolute;
            right: 1.3333vw;
            top: 1.3333vw;

            .icon {
                width: 4vw;
                height: 4vw;
                fill: #fff;
                vertical-align: middle;
                margin-right: .5333vw;
            }

            span {
                font-size: 3.2vw;
                color: #fff;
            }
        }
    }

    .contentRight {
        width: 60%;
        height: 32vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .list-name {
            font-size: 3.7333vw;
            color: #fff;
            font-weight: 700;
        }

        .creator {
            width: 100%;
            height: 8vw;
            color: #ccc;
            line-height: 8vw;

            img {
                width: 8vw;
                height: 8vw;
                border-radius: 50%;
                vertical-align: middle;
                margin-top: -0.2667vw;
            }

            .icon {
                width: 4vw;
                height: 4vw;
                vertical-align: middle;
                margin-left: .8vw;
            }

            span {
                font-size: 3.4667vw;
                margin-left: 2.6667vw;
            }
        }

        .list-desc {
            width: 100%;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 3.2vw;
            color: #ccc;

        }
    }
}

.listTopFooter {
    width: 100%;
    height: 18.6667vw;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .footer-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;

        .icon {
            fill: #fff;
        }

        span {
            font-size: 3.4667vw;
            margin-top: 1.3333vw;
        }
    }
}
</style>