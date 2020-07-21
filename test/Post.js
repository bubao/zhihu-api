/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-05-21 18:29:38
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 23:15:11
 */

const {
	Articles,
	// Followers,
	info,
	coauthors
} = require("../src/api/Columns/index");

const { console } = require("../src/config/commonModules");

(async () => {
	console.log(await info("oh-hard"));
})();

(async () => {
	console.log(await coauthors("oh-hard"))
})();

(async () => {
	const articles = new Articles();
	articles.init("oh-hard");
	console.log(await articles.next());
})();

// (async () => {
// 	const followers = new Followers("oh-hard");
// 	followers.next().then((res) => {
// 		console.log(res);
// 	});
// })();
