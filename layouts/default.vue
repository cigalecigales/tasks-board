<template lang="pug">
  div
    nuxt
</template>

<style lang="scss">
html, body {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 15px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background: #f3f3f3;
  color: #2b2b2b;
  width: 100%;
  height: 100%;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

// 入力欄
.commonInput {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #c5c5c5;
  outline: none;
  margin-left: 5px;

  &:focus {
    border: 1px solid #8f8f8f;
  }
}

// ボタン
.commonButtonArea {
  margin-top: 20px;

  &:after, :before {
    clear: both;
    content: '';
    display: block;
  }
}

.commonButton {
  background: #eeeeee;
  padding: 5px 10px;
  margin-right: 10px;
  float: right;

  &:hover {
    background: #c7c7c7;
    cursor: pointer;
  }
}

// モーダル
.commonModalMask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.commonModalWrapper {
  display: table-cell;
  vertical-align: middle;
}

.commonModalContainer {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
</style>

