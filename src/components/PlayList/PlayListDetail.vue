<template>
	<img :src="single.al.picUrl" :alt="single.al.name" class="bgimg" />
	<div class="detailTop">
		<div class="detailTopLeft">
			<svg class="icon" aria-hidden="true" @click="backHome">
				<use xlink:href="#icon-zuojiantou"></use>
			</svg>
			<div class="leftMarquee">
				<Vue3Marquee style="color: #fff">{{ single.name }}</Vue3Marquee>
				<div class="singer">
					<span v-for="(item, index) in single.ar" :key="item.id"
						>{{ item.name
						}}{{ index == single.ar.length - 1 ? '' : '/' }}</span
					>
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-youjiantou1"></use>
					</svg>
				</div>
			</div>
		</div>
		<div class="detailTopRight">
			<svg class="icon liebiao" aria-hidden="true">
				<use xlink:href="#icon-fenxiang"></use>
			</svg>
		</div>
	</div>
	<div
		class="detailContent"
		v-show="!state.isLyricShow"
		@click="state.isLyricShow = true"
	>
		<img
			src="@/assets/needle-ab.png"
			alt=""
			class="img_needle"
			:class="{ img_needle_active: !isPaused }"
		/>
		<img src="@/assets/cd.png" alt="" class="img_cd" />
		<img
			:src="single.al.picUrl"
			alt=""
			class="img_al"
			:class="{ img_al_active: !isPaused, img_al_paused: isPaused }"
		/>
	</div>
	<div
		class="lyric"
		v-show="state.isLyricShow"
		ref="musicLyric"
		@click="state.isLyricShow = false"
	>
		<p
			v-for="(item, index) in lyric"
			:key="index"
			:class="{
				active:
					currentTime * 1000 >= item.time &&
					currentTime * 1000 < item.next,
			}"
		>
			{{ item.lrc }}
		</p>
	</div>
	<div class="detailFooter">
		<div class="footerTop" :class="{ footerTop_hidden: state.isLyricShow }">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-aixin"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-yinlechangpian"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-liebiao-"></use>
			</svg>
		</div>
		<div class="footerContent">
			<span>{{ s_to_ms(currentTime) }}</span>
			<van-slider
				class="range"
				v-model="currentTime"
				min="0"
				:max="duration"
				step=".05"
				bar-height="1px"
				button-size="7px"
				active-color="#fff"
				inactive-color="#999"
                @change="setProcessFunc"
			/>
			<span>{{ s_to_ms(duration) }}</span>
		</div>
		<div class="footer">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-xunhuan"></use>
			</svg>
			<svg class="icon" aria-hidden="true" @click="goPlay(-1)">
				<use xlink:href="#icon-shangyishoushangyige"></use>
			</svg>
			<svg
				class="icon bofang"
				aria-hidden="true"
				v-if="isPaused"
				@click="play"
			>
				<use xlink:href="#icon-bofang1"></use>
			</svg>
			<svg class="icon bofang" aria-hidden="true" v-else @click="play">
				<use xlink:href="#icon-zanting"></use>
			</svg>
			<svg class="icon" aria-hidden="true" @click="goPlay(1)">
				<use xlink:href="#icon-xiayigexiayishou"></use>
			</svg>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-zu"></use>
			</svg>
		</div>
	</div>
</template>

<script setup>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { computed, onMounted, reactive, watch, ref, toRefs } from 'vue'
import playlistStore from '@/store'
import { storeToRefs } from 'pinia'

const store = playlistStore()
const { isPaused, lyricList, duration, currentTime } = storeToRefs(store)
const musicLyric = ref()

const state = reactive({
	isLyricShow: false, //是否显示歌词,默认不显示
})

//接收props参数
const props = defineProps({
	single: Object,
	play: Function,
    updateTime: Function,
    audio: Object,
    interval: Number,
})

const {audio,interval} = toRefs(props)

onMounted(() => {
    /* console.log(store.lyricList.lrc.lyric) */
})
//返回歌单页
const backHome = () => {
	store.updateDetailShow()
}
const lyric = computed(() => {
	let arr
	let lyric = store.lyricList.lrc.lyric
	if (store.lyricList.lrc.lyric) {
		arr = lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
			let min = item.slice(1, 3)
			let sec = item.slice(4, 6)
			let mill = item.slice(7, 10)
			let lrc = item.slice(11, item.length)
			if (isNaN(Number(mill))) {
				mill = item.slice(7, 9)
				lrc = item.slice(10, item.length)
			}
			let time =
				parseInt(min) * 60 * 1000 +
				parseInt(sec) * 1000 +
				parseInt(mill)
			return { min, sec, mill, lrc, time }
		})
		//显示当前歌词,在currentTime 与 下一首歌time之间
		arr.forEach((item, i) => {
            if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
				item.next = 10000000
			} else {
				item.next = arr[i + 1].time
			}
		})
	}
	return arr
})
//切换上一首/下一首
const goPlay = (num) => {
    let index = store.playListIndex + num
	if (index < 0) {
        index = store.playList.lenght - 1
	} else if (index == store.playList.length) {
        index = 0
	}
	store.updatePlayListIndex(index)
}

//拖动进度条
const setProcessFunc = (value)=>{
    clearInterval(interval)
    audio.value.currentTime = value
    audio.value.play()
    props.updateTime()
     
}
watch(currentTime, (newValue, oldValue) => {
	//歌词样式往下滚动
	let p = document.querySelector('p.active')
	if (p) {
		if (p.offsetTop > 300) {
			musicLyric.value.scrollTop = p.offsetTop - 250
		}
	}
	//歌曲播放完后自动切换下一首
	if (newValue === store.duration) {
		goPlay(1)
	}
})
//分秒转换
const s_to_ms = (time) => {
	let min
	let sec
	min = parseInt(time / 60)
	sec = parseInt(time % 60)
	min += ''
	sec += ''
	min = min.length === 1 ? '0' + min : min
	sec = sec.length === 1 ? '0' + sec : sec
	return min + ':' + sec
}
</script>

<style lang="less" scoped>
.bgimg {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: -1;
	filter: blur(50px);
}

.detailTop {
	width: 100%;
	height: 13.3333vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2.6667vw;
	fill: #fff;

	.detailTopLeft {
		display: flex;
		align-items: center;

		.leftMarquee {
			width: 40vw;
			height: 100%;
			margin-left: 5.3333vw;

			.singer {
				display: flex;
				color: rgba(255, 255, 255, 0.6);
				font-size: 3.7333vw;

				span {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.icon {
					width: 4vw;
					height: 4vw;
					fill: rgba(255, 255, 255, 0.6);
				}
			}
		}
	}
}

.detailContent {
	width: 100%;
	height: 120vw;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	position: relative;

	.img_al {
		width: 42.6667vw;
		height: 42.6667vw;
		position: absolute;
		bottom: 41.8667vw;
		border-radius: 50%;
		animation: rotate_al 10s linear infinite;
	}

	.img_al_active {
		animation-play-state: running;
	}

	.img_al_paused {
		animation-play-state: paused;
	}

	@keyframes rotate_al {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.img_cd {
		width: 66.6667vw;
		height: 66.6667vw;
		position: absolute;
		z-index: -1;
		bottom: 30.6667vw;
	}

	.img_needle {
		width: 26.6667vw;
		height: 40vw;
		position: absolute;
		left: 46%;
		transform-origin: 0 0;
		transform: rotate(-15deg);
		transition: all 2s;
	}

	.img_needle_active {
		transform-origin: 0 0;
		transform: rotate(0deg);
		transition: all 2s;
	}
}

.lyric {
	width: 100%;
	height: 120vw;
	padding: 4vw;
	overflow: scroll;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		font-size: 4vw;
		text-align: center;
		letter-spacing: 1px;
		color: rgb(221, 216, 216);
		line-height: 12vw;
	}

	.active {
		font-size: 4.8vw;
		color: #fff;
	}
}

.detailFooter {
	width: 100%;
	height: 40vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.footerTop {
		width: 100%;
		height: 13.3333vw;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.icon {
			width: 4.8vw;
			height: 4.8vw;
			fill: #fff;
		}
	}

	.footerTop_hidden {
		visibility: hidden;
	}

	.footerContent {
		width: 100%;
		height: 0.8vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2.6667vw;
		margin-top: 10px;

		span {
			font-size: 5px;
			color: #fff;
		}

		.range {
			width: 80%;
			margin: 0 5px;
		}

		/* input[type='range']::-webkit-slider-thumb{
            appearance: none;
            -webkit-appearance: none;
            height: 10px;
            width: 10px;
            border-radius: 1px;
        } */
	}

	.footer {
		width: 100%;
		height: 26.6667vw;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.icon {
			fill: #fff;
		}

		.bofang {
			width: 13.3333vw;
			height: 13.3333vw;
		}
	}
}
</style>