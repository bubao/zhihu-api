/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-21 19:33:06
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 23:14:27
 */

const API = require("../../config/api/index");
const request = require("request-promise");

async function base (uri, options = {}) {
	const ReqOps = {
		uri,
		gzip: true,
		json: true,
		...options
	};
	return await request(ReqOps);
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
