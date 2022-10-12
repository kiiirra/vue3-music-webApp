<template>
    <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>


<style lang="less" scoped>
.iconList{
    width: 100%;
    height: 26.6667vw;
    padding-top:4vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(231, 228, 228, 0.938);
    .iconItem{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon{
            width: 13.3333vw;
            height: 13.3333vw;
        }
    }
}

</style>