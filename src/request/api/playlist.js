import service from ".."

//获取歌单详情
export const getPlayList = (id) => {
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${id}`
    })

}
///获取歌单的歌曲列表
export const getAllTrackList = (data) => {
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
    })
}

//获取歌词数据
export const getLyricInfo = (id) => {
    return service({
        method: 'GET',
        url: `/lyric?id=${id}`
    })
}