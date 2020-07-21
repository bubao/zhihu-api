/**
 * @description:
 * @author: bubao
 * @Date: 2018-05-17 14:00:09
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 22:52:37
 */

const url = require("url");
const cheerio = require("cheerio");
const console = require("better-console");
const request = require("request-promise");

const QUERY = require("./query");
const { h2m, timeout } = require("./../module");

module.exports = {
	url,
	console,
	cheerio,
	h2m,
	QUERY,
	timeout,
	request
};
