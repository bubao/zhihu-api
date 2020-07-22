/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-22 13:34:03
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-22 13:35:53
 */
const Base = require("../Base");
const API = require("../../config/api/index");

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
	 * @param {string} urlToken 专栏id
	 * @param {headers} ReqOps request options
	 * @memberof Articles
	 */
	init (urlToken, ReqOps = {}) {
		this.ReqOps = {
			...this.ReqOps,
			...{
				json: true,
				uri: API.user.followers({ url_token: urlToken })
			},
			...ReqOps
		};
		this._next = this.ReqOps.uri;
		this.urlToken = urlToken;
	}
}

module.exports = Followers;
