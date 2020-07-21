/**
 * @author bubao
 * @description 知乎专栏
 * @date: 2019-04-09 00:18:47
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-02 00:12:12
 */

const api = require("../config/api/v4");
const { template, getTrueURL } = require("../module/utils");
const { request } = require("../config/commonModules");
const cheerio = require("cheerio");
const EventEmitter = require("events");

/**
 * 知乎专栏文章
 *
 * @class Columns
 * @extends {EventEmitter}
 */
class Columns extends EventEmitter {
	constructor () {
		super();
		this.instcance = null;
		this.api = {
			info: api.columns.root,
			coauthors: api.columns.coauthors,
			articles: api.columns.articles,
			followers: api.columns.followers
		};
	}

	/**
	 * 初始化单例实例
	 *
	 * @static
	 * @returns this
	 * @memberof Columns
	 */
	static init () {
		if (!this.instcance) {
			this.instcance = new this();
		}
		return this.instcance;
	}

	/**
	 * 专栏基础信息
	 * @param {string} columnsID 专栏ID
	 * @returns {Promise} 响应结果
	 * @memberof Columns
	 */
	info (columnsID) {
		return request({
			uri: template(this.api.info)({ columnsID }),
			gzip: true,
			json: true
		});
	}

	/**
	 * 专栏作者信息
	 * @param {string} columnsID 专栏ID
	 * @returns {Promise} 响应结果
	 * @memberof Columns
	 */
	coauthors (columnsID) {
		return request({
			uri: template(this.api.info)({ columnsID }),
			gzip: true,
			json: true
		});
	}

	/**
	 * 单批次文章简介
	 * @param {string} columnsID 专栏ID
	 * @param {number} [limit=20] 数据长度
	 * @param {number} [offset=0] 偏移量
	 * @returns {Promise} 响应体[]
	 * @memberof Columns
	 */
	articlesInfo (columnsID, limit = 20, offset = 0) {
		const UrlTemplate = template(this.api.articles)({ columnsID });
		const uri = getTrueURL(UrlTemplate, { limit, offset });
		return request({
			uri,
			gzip: true,
			json: true
		});
	}

	/**
	 * 获取单批次文章内容
	 * @param {array} info articlesInfo body data
	 * @returns {Promise} 响应体
	 * @memberof Columns
	 */
	async articles (info) {
		let item;
		const posts = [];
		while (info.length > 0) {
			item = info.splice(0, 1)[0];
			const result = await request({
				uri: item.url,
				gzip: true
			});
			const $ = cheerio.load(result.body);
			const res = JSON.parse($("#js-initialData").html());
			const content = res.initialState.entities.articles[item.id];
			const data = {
				id: item.id,
				body: result.body,
				content
			};
			posts.push(data);
			this.emit("data", data);
		}
		this.emit("end", posts);
		return posts;
	}
}

module.exports = Columns;
