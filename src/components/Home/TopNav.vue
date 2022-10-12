<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
        <div class="topContent">
            <span>我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="topRight" @click="$router.push('/search')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>

    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
    .topNav{
        width: 100%;
        height: 13.3333vw;
        padding: 2.6667vw;
        display:flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        .topContent{
            width: 65%;
            height: 100%;
            display: flex;
            justify-content:space-around;
            font-size: 4.8vw;
            .active{
                font-weight: 900;
            }

        }
    }

</style>