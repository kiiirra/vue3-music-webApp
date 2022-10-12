import service from ".."

//获取默认搜索关键词

export const getDefaultSearchKey = ()=>{
    return service({
        method:'GET',
        url:'/search/default'
    })
}
//获取搜索结果
export const getSearchList = (data)=>{
    return service({
        method:'GET',
        url:`/cloudsearch?keywords=${data}`
    })
}