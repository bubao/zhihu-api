/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-05-21 18:29:38
 * @LastEditors: bubao
 * @LastEditTime: 2020-09-15 15:57:06
 */

const {
	Articles,
	Followers,
	info,
	coauthors
} = require("../src/api/Columns/index");

const { console } = require("../src/config/commonModules");

(async () => {
	console.log(await info("c_187975189"));
})();

(async () => {
	console.log(await coauthors("YJango"));
})();

(async () => {
	const articles = new Articles();
	articles.init("YJango");
	const info = await articles.info();
	if (info.items_count <= 0) {
		return;
	}
	let isEnd = false;
	const list = [];
	while (!isEnd) {
		list.push(...(await articles.next()).data);
		await new Promise((resolve) => {
			setTimeout(resolve, 5000);
		});
		console.log(list.length);
		isEnd = articles.isEnd;
	}
})();

(async () => {
	const followers = new Followers("c_187975189");
	const info = await followers.info();
	if (info.followers) {
		console.log(await followers.next());
	}
})();
