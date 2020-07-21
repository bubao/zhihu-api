/**
 * @description:
 * @author: bubao
 * @Date: 2020-07-20 07:30:57
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 18:00:10
 */

const { request } = require("../../config/commonModules");
class Base {
	/**
	 * @description 获取下一组数据
	 * @author bubao
	 * @date 2020-07-20
	 * @returns
	 * @memberof Base
	 */
	async next () {
		const postsIteams = JSON.parse(
			(await request({ ...this.ReqOps, url: this._next })).body
		);
		this.isStart = postsIteams.paging.is_start;
		this.isEnd = postsIteams.paging.is_end;
		this._next = postsIteams.paging.next;
		this._previous = postsIteams.paging.previous;
		this.ReqOps.url = this._next;
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
			const postsIteams = JSON.parse((await request(this.ReqOps)).body);
			postsList.push(...postsIteams.data);
			isEnd = postsIteams.paging.is_end;
			this.ReqOps.url = postsIteams.paging.next;
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
		const postsIteams = JSON.parse(
			(await request({ ...this.ReqOps, url: this._previous })).body
		);
		this.isStart = postsIteams.paging.is_start;
		this.isEnd = postsIteams.paging.is_end;
		this._next = postsIteams.paging.next;
		this._previous = postsIteams.paging.previous;
		this.ReqOps.url = this._previous;
		return postsIteams;
	}
}

module.exports = Base;
