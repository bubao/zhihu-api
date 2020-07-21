/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-02-13 15:09:44
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 20:45:40
 */

const Articles = require("./Articles");
const Followers = require("./Followers");
const { info, coauthors } = require("./single");
module.exports = {
	info,
	Articles,
	Followers,
	coauthors
};
