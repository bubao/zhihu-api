const zhihu = "https://www.zhihu.com";
const zhuanlan = "https://zhuanlan.zhihu.com";
const pic1 = "https://pic1.zhimg.com";

module.exports = {
	zhihu,
	zhuanlan,
	pic1,
	feed: {
		topstory: {
			hot_list_web: `${zhihu}/api/v3/feed/topstory/hot-list-web?limit=50&desktop=true`
		}
	}
};
