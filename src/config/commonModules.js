/**
 * @author bubao
 * @description
 * @date: 2018-05-17 14:00:09
 * @Last Modified by: bubao
 * @Last Modified time: 2019-04-09 00:30:48
 */
const url = require("url");
const cheerio = require("cheerio");
const console = require("better-console");
const { request } = require("self-promise-request");

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
