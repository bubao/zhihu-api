/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-21 18:40:15
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 19:35:50
 */
const Base = require("../Base");
const API = require("../../config/api/index");
// const { request } = require("../../config/commonModules");

/**
 * @description 知乎专栏关注者
 * @author bubao
 * @date 2020-07-21
 * @class Followers
 * @extends {Base}
 */
class Followers extends Base {
	/**
	 *Creates an instance of Followers.
	 * @author bubao
	 * @date 2020-07-21
	 * @param {string} columnsId 专栏id
	 * @memberof Articles
	 */
	constructor (columnsId) {
		super();
		if (columnsId) {
			this.init(columnsId);
		}
	}

	/**
	 * @description 初始化
	 * @author bubao
	 * @date 2020-07-21
	 * @param {string} columnsId
	 * @memberof Articles
	 */
	init (columnsId) {
		this.ReqOps = {
			gzip: true,
			url: API.columns.followers({ columnsId })
		};
		this._next = this.ReqOps.url;
		this.columnsId = columnsId;
	}
}

module.exports = Followers;
