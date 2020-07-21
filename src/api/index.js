/**
 * @description:
 * @author: bubao
 * @Date: 2018-2-13 14:13:30
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 19:28:23
 */

const Post = require("./Columns/index");
const User = require("./User");
const Topic = require("./Topic");
const Columns = require("./Columns");
const API = require("../config/api");
const template = require("lodash/template");

const APIURL = (urlToken, mode, detail) => {
	return template(API[mode][detail])({ url_token: urlToken });
};

module.exports = {
	Post,
	User,
	Topic,
	Columns,
	APIURL
};
