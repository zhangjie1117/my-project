<template>
  <view class="search" :class="{focused: focused}">
    <!-- 输入框 -->
    <view class="input-box">
      <input type="text" :placeholder="placeholder" @focus="goSearch" />
      <text class="cancel" @click="cancelSearch">取消</text>
    </view>
    <!-- 搜索结果 -->
    <view class="content"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      focused: false,
      placeholder: ""
    };
  },
  methods: {
    goSearch() {
      this.focused = true;
      this.placeholder = "请输入你想要搜索的商品";
      this.$emit("search", {
        pageHeight: uni.getSystemInfoSync().windowHeight
      });
      uni.hideTabBar();
    },
    cancelSearch() {
      this.focused = false;
      this.placeholder = "";
      this.$emit("search", {
        pageHeight: "auto"
      });
      uni.showTabBar();
    }
  }
};
</script>

<style scoped lang='less'>
.search {
  .input-box {
    padding: 20rpx;
    background-color: #ea4451;
    position: relative;
    display: flex;

    &::after {
      content: "搜索";
      display: block;
      transform: translate(-50%, -50%);
      color: #bbb;
      font-size: 24rpx;
      background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
      background-size: 32rpx auto;
      padding-left: 50rpx;
      background-position: left center;
      background-repeat: no-repeat;

      position: absolute;
      top: 50%;
      left: 50%;
    }

    &::before {
      content: "";
      display: none;
      width: 33rpx;
      height: 33rpx;
      transform: translate(20rpx, -50%);
      background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
      background-size: 32rpx auto;

      position: absolute;
      top: 50%;
    }
  }
  input {
    flex: 1;
    height: 60rpx;
    background-color: #fff;
    border-radius: 8rpx;
    padding-left: 65rpx;
    color: #808080;
    font-size: 27rpx;
  }
  .cancel {
    display: none;
    color: #333;
    font-size: 30rpx;
    line-height: 60rpx;
    text-align: right;
  }
  .content {
    display: none;
    position: absolute;
    top: 100rpx;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: pink;
  }

  &.focused {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-color: #fff;

    .input-box {
      background-color: #eee;

      &::before {
        display: block;
      }

      &::after {
        display: none;
      }
    }
    .cancel {
      display: block;
      width: 100rpx;
    }

    .content {
      display: block;
    }
  }
}
</style>