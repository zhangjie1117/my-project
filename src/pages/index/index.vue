<template>
	<view :style="{height: pageHeight,overflow: 'hidden'}">
        <!-- 搜索框 -->
         <search @search="disableScroll"></search>
		<!-- 轮播图 -->
		<swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item :key="banner.goods_id" v-for="banner in bannerList">
        <navigator>
          <image :src="banner.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

		<!-- 主导航 -->
		<view class="navs">
			<navigator v-for="nav in navList" :key="nav.name">
				<image :src="nav.image_src"></image>
			</navigator>
		</view>
		<!-- 楼层 -->
		<view class="floors">
			<view class="floor" :key="index" v-for="(floor, index) in floorList">
        <view class="title">
          <image :src="floor.floor_title.image_src"></image>
        </view>
        <view class="items">
          <navigator :key="key" v-for="(product, key) in floor.product_list">
            <image :src="product.image_src"></image>
          </navigator>
        </view>
      </view>
		</view>
		<!-- 回到顶部 -->
    <!-- v-show 在 uni-app 中有 bug -->
    <view class="goTop icon-top" v-if="scrollTop > 100" @click="goTop"></view>
	</view>
</template>

<script>
import search from '@/components/search'
	export default {
		data () {
			return {
				pageHeight: 'auto',
				navList: [],
				floorList: [],
				bannerList: [],
				scrollTop: 0
			}
		},
		components: {
			search
		},
		methods: {
		   disableScroll (ev) {
             this.pageHeight = ev.pageHeight + 'px'
		   },
		   goTop() {
		   	 uni.pageScrollTo({
					scrollTop: 0
				})
		   },
           async getbannerList() {
			//    注意：是uni.request
			// request前要加this！！！
              const res = await this.request({
				  url:'/api/public/v1/home/swiperdata'
			  })
			  this.bannerList=res.message
		   },
		   async getnavList() {
              const res = await this.request({
				  url: '/api/public/v1/home/catitems'
			  })
			  this.navList=res.message
		   },
		   async getfloorList() {
             const res = await this.request({
				 url: '/api/public/v1/home/floordata'
			 })
			 this.floorList=res.message
		   }
		},
		// 注意：是onLoad
		async onLoad() {
		   this.getbannerList();
		   this.getnavList();
		   this.getfloorList();
		},
		// 监听用户是否有下拉加载的操作
		async onPullDownRefresh() {
		//  加await的原因是，这几个函数发请求都是异步的
		// 所以，最后的停止下拉刷新的函数回先执行
		  await this.getbannerList();
		  await this.getnavList();
		  await this.getfloorList();
		  uni.stopPullDownRefresh()
		},
		onPageScroll(ev) {
			this.scrollTop = ev.scrollTop
			console.log(this.scrollTop)
		}
	}
</script >

<style lang="less">

	swiper image {
		width: 750rpx;
		height: 340rpx;
	}
	.navs {
		height: 193rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		image {
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor {

		.title {
			width: 750rpx;
			height: 60rpx;
			padding: 20rpx 0 0 10rpx;
			background-color: #f4f4f4;
		}

		.items {
			overflow: hidden;
			padding: 20rpx 16rpx;

			navigator {
				float: left;
				margin-left: 10rpx;

				&:first-child {
					width: 232rpx;
					height: 386rpx;
					margin-left: 0;
				}

				&:nth-child(2),
				&:nth-child(5) {
					width: 273rpx;
					height: 188rpx;
				}

				&:nth-child(3),
				&:nth-child(4) {
					width: 193rpx;
					height: 188rpx;
				}
				
				&:nth-last-child(-n+2) {
					margin-top: 10rpx;
				}
			}
		}

		&:first-child {
			.items {

				navigator {
					width: 233rpx;
				}
			}
		}
	}
	.goTop {
    position: fixed;
    bottom: 30rpx;
    /* #ifdef H5 */
    bottom: 65px;
    /* #endif */
    right: 30rpx;
  
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>
