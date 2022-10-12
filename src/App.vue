<template>
  <div id="app">
    <router-view />
  </div>

</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
a{
  color: #212121;
}
body{
  background-color:rgba(240, 240, 240, 0.941);
}

/* 图标字体大小 */
.icon {
  width: 5.3333vw;
  height: 5.3333vw;
}

html {
  font-size: calc(100% + 2 * (100vw - 375px) / 225);
}

@media screen and (min-width:600px) {
  html {
    font-size: calc(112.5% + 4 * (100vw - 600px) / 400);

  }
}

@media screen and (min-width: 1000px) {
  html {
    font-size: calc(137.5% + 5 * (100vw - 1000px) / 1000);

  }

}
</style>
