import { Swipe, SwipeItem,Popup, Slider } from 'vant';
let plugins = [Swipe, SwipeItem,Popup,Slider]
export default function getVant(app){
    plugins.forEach((item)=>{
        app.use(item)
    })
}