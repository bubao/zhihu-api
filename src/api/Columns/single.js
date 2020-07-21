/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-21 19:33:06
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 20:51:22
 */

const API = require("../../config/api/index");
const { request } = require("../../config/commonModules");

async function base (url, options = {}) {
	const ReqOps = {
		url,
		gzip: true,
		...options
	};
	return JSON.parse((await request(ReqOps)).body);
}

/**
 * @description 专栏作者信息
 * @author bubao
 * @date 2020-07-21
 * @param {string} columnsId //专栏ID
 * @returns
 */

function coauthors (columnsId) {
	const urlTemplate = API.columns.coauthors({ columnsId });
	return base(urlTemplate);
}

/**
 * @description 知乎专栏信息
 * @author bubao
 * @date 2020-07-21
 * @param {string} columnsId //专栏ID
 * @returns
 */
function info (columnsId) {
	const urlTemplate = API.columns.root({ columnsId });
	return base(urlTemplate);
}

module.exports = { info, coauthors };
