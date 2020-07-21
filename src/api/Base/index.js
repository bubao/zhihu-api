/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-20 07:30:57
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 22:26:26
 */

const request = require("request-promise");
class Base {
	constructor () {
		this.ReqOps = {
			json: true
		};
	}

	/**
	 * @description 获取下一组数据
	 * @author bubao
	 * @date 2020-07-20
	 * @returns
	 * @memberof Base
	 */
	async next () {
		const options = { ...this.ReqOps, uri: this._next };
		const postsIteams = await request(options);
		this.isStart = postsIteams.paging.is_start;
		this.isEnd = postsIteams.paging.is_end;
		this._next = postsIteams.paging.next;
		this._previous = postsIteams.paging.previous;
		this.ReqOps.uri = this._next;
		return postsIteams;
	}

	/**
	 * @description 获取所有数据
	 * @author bubao
	 * @date 2020-07-20
	 * @returns
	 * @memberof Base
	 */
	async all () {
		let isEnd = false;
		const postsList = [];

		while (!isEnd) {
			const postsIteams = await request(this.ReqOps);
			postsList.push(...postsIteams.data);
			isEnd = postsIteams.paging.is_end;
			this.ReqOps.uri = postsIteams.paging.next;
		}
		return postsList;
	}

	/**
	 * @description 获取上一组数据
	 * @author bubao
	 * @date 2020-07-20
	 * @returns
	 * @memberof Base
	 */
	async previous () {
		const postsIteams = await request({ ...this.ReqOps, uri: this._previous });
		this.isStart = postsIteams.paging.is_start;
		this.isEnd = postsIteams.paging.is_end;
		this._next = postsIteams.paging.next;
		this._previous = postsIteams.paging.previous;
		this.ReqOps.uri = this._previous;
		return postsIteams;
	}
}

module.exports = Base;
