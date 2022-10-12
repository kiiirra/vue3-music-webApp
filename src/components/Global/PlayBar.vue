<template>
	<div class="playbar">
		<div class="left" @click="store.updateDetailShow">
			<img :src="playList[playListIndex].al.picUrl" alt="" />
			<p>
				<span class="single">{{ playList[playListIndex].name }}</span>
				<span class="singer">&nbsp;-&nbsp;</span>
				<span
					class="singer"
					v-for="(singer, index) in playList[playListIndex].ar"
					:key="singer.id"
					>{{ singer.name
					}}{{
						index == playList[playListIndex].ar.length - 1
							? ''
							: '/'
					}}</span
				>
			</p>
		</div>
		<div class="right">
			<svg
				class="icon pause"
				aria-hidden="true"
				v-if="isPaused"
				@click="play"
			>
				<use xlink:href="#icon-bofanganniu"></use>
			</svg>
			<svg class="icon play" aria-hidden="true" @click="play" v-else>
				<use xlink:href="#icon-weibiaoti--"></use>
			</svg>
			<svg class="icon playlist" aria-hidden="true">
				<use xlink:href="#icon-zu"></use>
			</svg>
		</div>
		<audio
			ref="audio"
			@canplay="getDuration"
			:src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
		></audio>
		<van-popup
			v-model:show="detailShow"
			position="bottom"
			:style="{ height: '100%', width: '100%' }"
		>
			<PlayListDetail
				:single="playList[playListIndex]"
				:play="play"
				:audio="audio"
                :updateTime="updateTime"
                :interval = 'state.interval'
			/>
		</van-popup>
	</div>
</template>

<script setup>
import { onMounted, onUpdated, reactive, ref, watch } from 'vue'
//引入pinia
import playlistStore from '@/store'
import { storeToRefs } from 'pinia'
import PlayListDetail from '@/components/PlayList/PlayListDetail'
const store = playlistStore()
const { playList, isPaused, playListIndex, detailShow } = storeToRefs(store)
const audio = ref()
const state = reactive({
	interval: 0,
})
onMounted(() => {
	store.getLyric(store.playList[store.playListIndex].id)
	/* console.log(audio) */
	/* updateTime() */
})

//判断音乐是否播放
const play = () => {
	if (audio.value.paused) {
		//播放
		audio.value.play()
		store.isPaused = false
		updateTime()
	} else {
		//暂停
		clearInterval(state.interval)
		audio.value.pause()
		store.isPaused = true
	}
}

const getDuration = () => {
	store.updateDuration(audio.value.duration)
}

const updateTime = () => {
        state.interval = setInterval(() => {
            console.log(111111);
            store.updateCurrentTime(audio.value.currentTime)
        }, 1000)
}

watch([playListIndex, playList], (newValue, oldValue) => {
	clearInterval(state.interval)

	//切换歌曲时自动播放
	audio.value.autoplay = true

	//获取歌词
	store.getLyric(store.playList[store.playListIndex].id)
	if (audio.value.paused) {
		store.isPaused = false
	}
	updateTime()
})
</script>

<style lang="less" scoped>
.playbar {
	width: 100%;
	height: 13.3333vw;
	position: fixed;
	bottom: 0;
	z-index: 100;
	padding: 2.6667vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	background-color: #fff;

	.left {
		width: 70%;
		display: flex;
		align-items: center;

		img {
			width: 10vw;
			height: 10vw;
			border-radius: 50%;
			margin-right: 2.6667vw;
		}

		p {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			.single {
				font-size: 14px;
			}

			.singer {
				font-size: 12px;
				color: #999;
			}
		}
	}

	.right {
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.icon {
			width: 7vw;
			height: 7vw;
			fill: #666;
		}
	}
}
</style>