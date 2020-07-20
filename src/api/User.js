/**
 * @description:
 * @author: bubao
 * @Date: 2018-05-17 13:49:02
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-20 07:19:24
 */

const { request } = require("../config/commonModules");
const API = require("../config/api/index");
const { requestOpts, loopGet } = require("../module/utils");

const followers = async (urlToken, options) => {
	options.uri = API.user.followers({ url_token: urlToken });
	const v = await loopGet(options);
	return v;
};
const follower = (urlToken, options) => {
	options.uri = API.user.followers({ url_token: urlToken });
	return loopGet(options);
};
/**
 * 通用方法
 * @param {string|number} urlToken 话题ID
 * @param {object} options 配置选项
 * @param {string} countName template名
 */
const universalMethod = async (urlToken, options, countName) => {
	if (options.headers) {
		const object = requestOpts(
			{ url_token: urlToken },
			options,
			API.user[countName]
		);
		return JSON.parse((await request(object)).body);
	}
	return false;
};
module.exports = {
	info: (urlToken, options) => {
		return universalMethod(urlToken, options, "info");
	},
	followers,
	follower,
	zhuanlansFocus: (urlToken, options) => {
		return universalMethod(urlToken, options, "zhuanlansFocus");
	}
};
