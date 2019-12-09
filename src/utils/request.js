export default function (Vue, config) {
    return function () {
        const {
            baseurl
        } = config
        Vue.prototype.request = async function (params) {
            const {
                url
            } = params;
            uni.showLoading({
                title: '正在加载中'
            })
            const res = await uni.request({
                url: baseurl + url
            })
            uni.hideLoading();
            return res[1].data
        }
    }
}