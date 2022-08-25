/**
 * @Description:
 * @Author: bubao
 * @Date: 2022-08-25 10:43:14
 * @LastEditors: bubao
 * @LastEditTime: 2022-08-25 11:07:12
 */

const Base = require("../Base");
const API = require("../../config/api/index");
const { info } = require("./single");
/**
 * @description 知乎专栏文章
 * @author bubao
 * @date 2020-07-21
 * @class Items
 * @extends {Base}
 */
class Items extends Base {
	/**
	 *Creates an instance of Items.
	 * @author bubao
	 * @date 2020-07-21
	 * @param {string} columnsId 专栏id
	 * @memberof Items
	 */
	constructor (columnsId) {
		super();
		this.ReqOps = {
			...this.ReqOps,
			...{
				json: true,
				uri: API.columns.items({ columnsId })
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
	 * @memberof Items
	 */
	static init (columnsId) {
		if (!this.instance) {
			this.instance = new Items(columnsId);
		}
		return this.instance;
	}

	/**
	 * @description 知乎专栏信息
	 * @author bubao
	 * @date 2020-07-21
	 * @returns
	 * @memberof Items
	 */
	info () {
		return info(this.columnsId);
	}
}

module.exports = Items;
