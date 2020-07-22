/**
 * @description:
 * @author: bubao
 * @Date: 2018-05-17 13:49:02
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-22 13:38:05
 */

const { request } = require("../../config/commonModules");
const API = require("../../config/api/index");

/**
 * @description user info
 * @author bubao
 * @date 2020-07-22
 * @param {string} urlToken user id
 * @param {headers} [options={}] request options
 * @returns
 */
function info (urlToken, options = {}) {
	options.uri = API.user.info({ url_token: urlToken });
	return request(options);
}

/**
 * @description
 * @author bubao
 * @date 2020-07-22
 * @param {string} urlToken user id
 * @param {headers} [options={}] request options
 * @returns
 */
function zhuanlansFocus (urlToken, options = {}) {
	options.uri = API.user.zhuanlansFocus({ url_token: urlToken });
	return request(options);
}

module.exports = {
	info,
	zhuanlansFocus
};
