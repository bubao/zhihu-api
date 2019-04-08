/**
 * @author bubao
 * @description
 * @date: 2018-2-13 14:13:30
 * @Last Modified by: bubao
 * @Last Modified time: 2019-04-09 00:49:40
 */

const Post = require("./Post");
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
