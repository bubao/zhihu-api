/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-21 18:40:15
 * @LastEditors: bubao
 * @LastEditTime: 2022-08-25 11:13:28
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
	 * @memberof Followers
	 */
	constructor (columnsId) {
		super();
		this.ReqOps = {
			...this.ReqOps,
			...{
				json: true,
				uri: API.columns.Followers({ columnsId })
			}
		};
		this._next = this.ReqOps.uri;
		this.columnsId = columnsId;
	}

	/**
	 * @description 初始化
	 * @author bubao
	 * @date 2020-07-21
	 * @param {string} columnsId
	 * @memberof Followers
	 */
	static init (columnsId) {
		if (!this.instance) {
			this.instance = new Followers(columnsId);
		}
		return this.instance;
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
