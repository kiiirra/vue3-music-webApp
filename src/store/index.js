import { defineStore } from 'pinia'
import { getLyricInfo } from '@/request/api/playlist'

const store = defineStore('playlist', {
  state: () => {
    return {

      //playBar播放列表
      playList: [{
        id: 1955424233,
        name: "反派角色",
        ar: [{
          id: 12158039,
          name: "郭冠廷"
        }],
        
        //专辑名
        al: {
          id: 146408395,
          name: "反派角色",
          pic: 109951167543408350,
          picUrl: "https://p2.music.126.net/a-C8lJRnVNG8DUHaVa3cIQ==/109951167543408347.jpg",
          pic_str: "109951167543408347",
        }
        
      }],
     
      playListIndex: 0, //正在播放的歌曲下标，默认为0
      isPaused: true,//暂停按钮是否显示,默认暂停状态
      detailShow:false,//显示歌曲详情页，默认不显示
      lyricList:{},//歌词
      currentTime:0,//歌曲播放当前时间
      duration:276.323265,//歌曲总时长
    }
  },
  getters: {
  },
  actions: {
    updatePlayListIndex(value){
      this.playListIndex = value
      
    },
    updatePlayList(value){
      
      this.playList = value
      
    },
    //显示歌曲详情页面
    updateDetailShow(){
      this.detailShow = !this.detailShow
    },

    updateCurrentTime(value){
      this.currentTime = value
    },
    updateDuration(value){
      this.duration = value
    },

    //获取歌词
    async getLyric(value){
      let res = await getLyricInfo(value)
      if (res.data.code == 200) {
        this.lyricList.lrc = res.data.lrc //歌词
        this.lyricList.lyricUser = res.data.lrc  //歌词贡献者
        this.lyricList.romalrc = res.data.romalrc  //方言
        this.lyricList.tlyric = res.data.tlyric   //翻译
      }else{
        console.log('歌词加载失败');
      }
      
    }

  },
})
export default store
