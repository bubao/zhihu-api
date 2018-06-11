/**
 * @author bubao
 * @description
 * @date: 2018-02-13
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-23 14:25:54
 */

const { request } = require('../config/commonModules');
const API = require('../config/api');
const { times, requestOpts, loopdown } = require('../config/utils');

/**
 * 通用方法
 * @param {string|number} columnsID 专栏ID
 * @param {object} options 配置选项
 * @param {string} countName template名
 */
const universalMethod = async (columnsID, options, countName) => {
	if (options.headers) {
		const object = requestOpts({ columnsID }, options, API.post[countName]);
		return JSON.parse((await request(object)).body);
	}
	return false;
}
const info = async (columnsID, options) => { return await universalMethod(columnsID, options, 'info') }

const posts = async (columnsID, options) => {
	const { articles_count } = await info(columnsID, options);
	const object = requestOpts({ columnsID }, options, API.post.articles);
	return (await loopdown(object, times(articles_count)));
}
module.exports = {
	info,
	posts,
}
