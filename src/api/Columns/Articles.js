/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-21 18:21:28
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 22:33:42
 */
const Base = require("../Base");
const API = require("../../config/api/index");
const { info } = require("./single");
/**
 * @description 知乎专栏文章
 * @author bubao
 * @date 2020-07-21
 * @class Articles
 * @extends {Base}
 */
class Articles extends Base {
	/**
	 *Creates an instance of Articles.
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
			...this.ReqOps,
			...{
				json: true,
				uri: API.columns.articles({ columnsId })
			}
		};
		this._next = this.ReqOps.uri;
		this.columnsId = columnsId;
	}

	/**
	 * @description 知乎专栏信息
	 * @author bubao
	 * @date 2020-07-21
	 * @returns
	 * @memberof Articles
	 */
	info () {
		return info(this.columnsId);
	}
}

module.exports = Articles;
