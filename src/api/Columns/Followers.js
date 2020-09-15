/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-21 18:40:15
 * @LastEditors: bubao
 * @LastEditTime: 2020-09-15 15:56:32
 */
const Base = require("../Base");
const API = require("../../config/api/index");
const { info } = require("./single");

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
	 * @param {headers} ReqOps request options
	 * @memberof Articles
	 */
	constructor (columnsId, ReqOps = {}) {
		super();
		if (columnsId) {
			this.init(columnsId, ReqOps);
		}
	}

	/**
	 * @description 初始化
	 * @author bubao
	 * @date 2020-07-21
	 * @param {string} columnsId 专栏id
	 * @param {headers} ReqOps request options
	 * @memberof Articles
	 */
	init (columnsId, ReqOps = {}) {
		this.ReqOps = {
			...this.ReqOps,
			...{
				json: true,
				uri: API.columns.followers({ columnsId })
			},
			...ReqOps
		};
		this._next = this.ReqOps.uri;
		this.columnsId = columnsId;
	}

	/**
	 * @description 知乎专栏信息
	 * @author bubao
	 * @date 2020-07-21
	 * @returns
	 * @memberof Followers
	 */
	info () {
		return info(this.columnsId);
	}
}

module.exports = Followers;
