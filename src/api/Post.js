/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-02-13 15:09:44
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-19 07:38:09
 */

const { request } = require("../config/commonModules");
const API = require("../config/api/index");

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
	const urlTemplate = API.post.items({ columnsId });
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

module.exports = {
	info,
	posts
};
