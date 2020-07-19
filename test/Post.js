/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-05-21 18:29:38
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-19 09:47:01
 */

// const Post = require("../src/api/Post");
const { Articles } = require("../src/api/Post");
// const config = require('./env.json');
const fs = require("fs");

const { console } = require("../src/config/commonModules");

// Post.info('oh-hard').then((res) => {
// 	fs.writeFile('./nopush/zhuanlanInfo.json', JSON.stringify(res), () => { console.log("zhuanlanInfo"); });
// })

// Post.posts("oh-hard").then(res => {
// 	fs.writeFile("./nopush/zhuanlanPosts.json", JSON.stringify(res), () => {
// 		console.log("zhuanlanPosts");
// 	});
// });
const test = async () => {
	const articles = new Articles();
	const list = [];
	articles.init("oh-hard");
	while (!articles.isEnd) {
		list.push(await articles.next());
	}
	fs.writeFile("./nopush/zhuanlanPosts.json", JSON.stringify(list), () => {
		console.log("end");
	});
};

test();
