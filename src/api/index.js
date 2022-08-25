/**
 * @description:
 * @author: bubao
 * @Date: 2018-2-13 14:13:30
 * @LastEditors: bubao
 * @LastEditTime: 2022-08-25 11:56:42
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
exports.Post = Post;
exports.User = User;
exports.Topic = Topic;
exports.Columns = Columns;
exports.APIURL = APIURL;
