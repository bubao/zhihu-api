/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-20 05:57:38
 * @LastEditors: bubao
 * @LastEditTime: 2022-08-25 10:20:02
 */
const { Columns } = require("../src/api");
const { console } = require("../src/config/commonModules");

const columns = Columns.init();

// /**
//  * 获取专栏基础信息
//  */
// columns.info("YJango").then(data => {
// 	console.log(data.body);
// });

// /**
//  * 获取专栏作者基础信息
//  */
// columns.coauthors("YJango").then(data => {
// 	console.log(data.body);
// });
// /**
//  * 获取文章简介
//  */
// columns.articlesInfo("YJango").then(data => {
// 	console.log(data.body);
// });

// async function test (columnsID) {
// 	/**
// 	 * 获取专栏基础信息
// 	 */
// 	const Info = await columns.info(columnsID);
// 	if (Info.error) {
// 		return Info.error;
// 	}
// 	const { articles_count: articlesCount, title } = Info.body;
// 	console.log(title);
// 	let next = 0;
// 	const limit = 20;

// 	columns.on("end", data => {
// 		console.log(`${columnsID} end`, data.length);
// 	});
// 	while (next * limit <= articlesCount) {
// 		console.log(next * limit);
// 		/**
// 		 * 获取文章简介
// 		 */
// 		const ArticlesInfo = await columns.articlesInfo(columnsID, limit, next);
// 		if (ArticlesInfo.error) {
// 			break;
// 		}
// 		/**
// 		 * 获取专栏文章内容
// 		 */
// 		await columns.articles(ArticlesInfo.body.data);
// 		next += 1;
// 	}
// }

// test("YJango");

async function test (columnsID) {
	/**
	 * 获取专栏基础信息
	 */
	const Info = await columns.info(columnsID);
	if (Info.error) {
		return Info.error;
	}
	// console.log(Info);
	const { items_count: itemsCount, title } = Info;
	console.log(title, itemsCount);
	let next = 0;
	const limit = 20;

	// columns.on("end", data => {
	// 	console.log(`${columnsID} end`, data.length);
	// });
	while (next * limit <= itemsCount) {
		console.log(next * limit);
		/**
		 * 获取文章简介
		 */
		const items = await columns.items(columnsID, next);
		if (items.error) {
			break;
		}

		console.log(items.data);
		next += 1;
	}
}

test("YJango");
