/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-02-13 15:09:44
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-19 09:06:22
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

class Articles {
	init(columnsId) {
		this.ReqOps = {
			gzip: true,
			url: API.post.articles({ columnsId })
		};
		this._next = this.ReqOps.url;
		this.columnsId = columnsId;
		return this;
	}

	async next() {
		const postsIteams = JSON.parse(
			(await request({ ...this.ReqOps, url: this._next })).body
		);
		this.isEnd = postsIteams.paging.is_end;
		this._next = postsIteams.paging.next;
		this._previous = postsIteams.paging.previous;
		this.ReqOps.url = this._next;
		return postsIteams;
	}

	async all() {
		let isEnd = false;
		const postsList = [];

		while (!isEnd) {
			const postsIteams = JSON.parse((await request(this.ReqOps)).body);
			postsList.push(...postsIteams.data);
			isEnd = postsIteams.paging.is_end;
			this.ReqOps.url = postsIteams.paging.next;
		}
		return postsList;
	}

	async previous() {
		const postsIteams = JSON.parse(
			(await request({ ...this.ReqOps, url: this._previous })).body
		);
		this.isEnd = postsIteams.paging.is_end;
		this._next = postsIteams.paging.next;
		this._previous = postsIteams.paging.previous;
		this.ReqOps.url = this._previous;
		return postsIteams;
	}
}

module.exports = {
	info,
	posts,
	Articles
};
