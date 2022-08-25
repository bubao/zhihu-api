/**
 * @Description:
 * @Author: bubao
 * @Date: 2018-02-13 15:09:44
 * @LastEditors: bubao
 * @LastEditTime: 2022-08-25 11:27:46
 */

const Articles = require("./Articles");
const Followers = require("./Followers");
const Items = require("./Items");
const { info, coauthors } = require("./single");

exports.Articles = Articles;
exports.info = info;
exports.Items = Items;
exports.Followers = Followers;
exports.coauthors = coauthors;
