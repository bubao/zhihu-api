/**
 * @author bubao
 * @description 知乎专栏
 * @date: 2019-04-09 00:18:47
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-01 19:11:38
 */

const api = require("../config/api/v4");
const { loopMethod, rateMethod, assign, template } = require("../module/utils");
const { request } = require("../config/commonModules");
const cheerio = require("cheerio");

/**
 * 通用方法
 * @param {string||number} ID 传入ID
 * @param {string} API 传入api
 * @param {string} countName 传入countName
 * @param {Function} infoMethod 传入方法
 */

const universalMethod = async (ID, API, countName, infoMethod, spinner) => {
	const urlTemplate = template(API)({ postID: ID, columnsID: ID });
	const count = (await infoMethod(ID))[countName];
	if (spinner) spinner.start();
	const result = new Promise(resolve => {
		loopMethod(
			assign(
				{
					options: {
						urlTemplate
					}
				},
				rateMethod(count, 20)
			),
			resolve
		);
	});
	if (spinner) spinner.succeed(`success ${ID}`);
	return result;
};

/**
 * 知乎专栏信息
 * @param {string} columnsID //专栏ID
 */
const zhuanlanInfo = async columnsID => {
	const urlTemplate = template(api.columns.root)({ columnsID });
	let object = {};
	object = {
		uri: urlTemplate,
		gzip: true
	};

	return request(object).then(data => {
		return JSON.parse(data.body);
	});
};

const getPostsDom = async (info, posts = []) => {
	let item;
	if (info.length > 0) {
		item = info.splice(0, 1)[0];
		posts.push(
			await new Promise(resolve => {
				request({
					uri: item.url,
					gzip: true
				}).then(data => {
					resolve({
						id: item.id,
						body: data.body
					});
				});
			})
		);
		return getPostsDom(info, posts);
	} else {
		return posts;
	}
};

const getJSDom = (JSDom, posts = []) => {
	let item;
	if (JSDom.length) {
		item = JSDom.splice(0, 1)[0];
		const $ = cheerio.load(item.body);
		const res = JSON.parse($("#js-initialData").html());
		const content = res.initialState.entities.articles[item.id];
		posts.push(content);
		return getJSDom(JSDom, posts);
	} else {
		return posts;
	}
};
/**
 * 专栏所有post
 * @param {string} columnsID 专栏ID
 * @param {object} spinner ora实例
 */
const zhuanlanPosts = async (columnsID, spinner) => {
	const info = await universalMethod(
		columnsID,
		api.columns.articles,
		"articles_count",
		zhuanlanInfo,
		spinner
	);
	const JSDom = await getPostsDom(info);
	return getJSDom(JSDom);
};

module.exports = zhuanlanPosts;
