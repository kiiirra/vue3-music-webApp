
<template>
    <PlayListTop :playList='state.playList' />
    <PlayListContent :trackList = 'state.trackList' :subscribedCount='state.playList.subscribedCount'/>
    <PlayBar/>
</template>
<script>
import PlayListTop from '@/components/PlayList/PlayListTop'
import PlayListContent from '@/components/PlayList/PlayListContent'
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getPlayList,getAllTrackList } from '@/request/api/playlist'
export default {
    components:{PlayListTop,PlayListContent},
    setup () {
        const state = reactive({
            playList:{},
            trackList:[]
        })
        onMounted(async ()=>{
            const router = useRoute()
            let id = router.query.id
            //获取歌单详情
            let res = await getPlayList(id)
            state.playList = res.data.playlist
        

            //获取歌单所有歌曲
            let result = await getAllTrackList({id, limit:20, offset:0})
            state.trackList = result.data.songs

            sessionStorage.setItem('playList',JSON.stringify(state))
        })

        return {state}
    }
}
</script>

<style lang="less" scoped>

</style>