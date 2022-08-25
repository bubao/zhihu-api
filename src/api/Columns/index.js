/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-02-13 15:09:44
 * @LastEditors: bubao
 * @LastEditTime: 2022-08-25 11:14:20
 */

const Articles = require("./Articles");
const Followers = require("./Followers");
const Items = require("./Items");
const { info, coauthors } = require("./single");

module.exports = {
	info,
	Articles,
	Items,
	Followers,
	coauthors
};
