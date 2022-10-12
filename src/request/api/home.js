import service from '..'
export const getBanner =()=>{
    return service({
        method:'GET',
        url:'/banner?type=0'
    }) 
} 
export const getMusicList =()=>{
    return service({
        method:'GET',
        url:'/personalized?limit=20'
    })
}