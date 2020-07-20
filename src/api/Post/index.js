/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-02-13 15:09:44
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 07:19:29
 */

const { request } = require("../../config/commonModules");
const API = require("../../config/api/index");
const Base = require("../Base");

/**
 * 知乎专栏信息
 * @param {string} columnsId //专栏ID
 */
const info = async columnsId => {
	const urlTemplate = API.post.columns({ columnsId });
	const ReqOps = {
		url: urlTemplate,
		gzip: true
	};
	return JSON.parse((await request(ReqOps)).body);
};

/**
 * 专栏所有post
 * @param {string} columnsId 专栏ID
 */
const posts = async columnsId => {
	const urlTemplate = API.post.articles({ columnsId });
	let isEnd = false;
	const ReqOps = {
		url: urlTemplate,
		gzip: true
	};
	const postsList = [];

	while (!isEnd) {
		const postsIteams = JSON.parse((await request(ReqOps)).body);
		postsList.push(...postsIteams.data);
		isEnd = postsIteams.paging.is_end;
		ReqOps.url = postsIteams.paging.next;
	}
	return postsList;
};
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
	constructor(columnsId) {
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
	init(columnsId) {
		this.ReqOps = {
			gzip: true,
			url: API.post.articles({ columnsId })
		};
		this._next = this.ReqOps.url;
		this.columnsId = columnsId;
	}
}

module.exports = {
	info,
	posts,
	Articles
};
