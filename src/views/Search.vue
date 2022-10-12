<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input ref='search' type="text" :placeholder="placeholder" v-model="state.searchKey"
            @keydown.enter="searchFunc" />
        <span @click="searchFunc">搜索</span>
    </div>
    <div class="searchHistory">
        <span class="searchSpan">历史</span>
        <div class="searchKey">
            <span v-for="(item, i) in state.historyList" :key="i">{{ item }}</span>
        </div>
        <svg class="icon" aria-hidden="true" @click="clearHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
</template>

<script setup>
import { reactive } from '@vue/reactivity'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { getDefaultSearchKey, getSearchList } from '@/request/api/search'

const state = reactive({
    defaultKey: '',
    searchKey: '',
    historyList: [],
    searchList: []
})
const search = ref()
onMounted(async () => {
    //获取默认搜索值
    let res = await getDefaultSearchKey()
    if (res.data.code == 200) {
        state.defaultKey = res.data.data.realkeyword
    }

    //获取历史搜索记录
    const historyList = JSON.parse(localStorage.getItem('historyList'))
    state.historyList = historyList ? historyList : []

})

const placeholder = computed(() => {
    return state.historyList[0] ? state.historyList[0] : state.defaultKey
})

const searchFunc = async () => {
    if (state.searchKey === '' && search.value.placeholder !== '') {
        state.searchKey = search.value.placeholder

    }
    state.historyList.unshift(state.searchKey.trim())

    //去重
    state.historyList = [...new Set(state.historyList)]
    //固定长度
    if (state.historyList.length > 10) {
        state.historyList.splice(state.historyList.length - 1, 1)
    }
    //存储在localStorage,
    localStorage.setItem('historyList', JSON.stringify(state.historyList))

    let res = await getSearchList(state.searchKey)
    if (res.data.code == 200) {

        state.searchList = res.data.result.songs
    }


}

const clearHistory = () => {
    state.historyList = []
    localStorage.removeItem('historyList')

}
</script>

<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 13.3333vw;
    padding: 0 2.6667vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    input {
        width: 75%;
        border: none;
        border-bottom: 1px solid #999;
        padding: 5px;
    }

    span {
        font-weight: 700;
        letter-spacing: 1px;
    }
}

.searchHistory {
    width: 100%;
    padding: 2.6667vw;
    position: relative;
    font-size: 13px;

    .searchSpan {
        font-weight: 700;
    }

    .searchKey {
        position: absolute;
        top: 7vw;
        left: 0;

        span {
            font-size: 12px;
            color: #999;
            padding: 3px 10px;
            background-color: #fff;
            border-radius: 20px;
            display: inline-block;
            margin-left: 10px;
            margin-top: 10px;


        }
    }

    .icon {
        width: 4vw;
        height: 4vw;
        position: absolute;
        right: 2.6667vw;
    }
}
</style>