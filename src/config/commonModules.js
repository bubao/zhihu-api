/**
 * @author bubao
 * @description
 * @date: 2018-05-17 14:00:09
 * @Last Modified by: bubao
 * @Last Modified time: 2019-11-30 21:31:48
 */
const url = require("url");
const cheerio = require("cheerio");
const console = require("better-console");
const Req = require("self-promise-request");
const Request = Req.init();

const request = Request.request;

const QUERY = require("./query");
const { h2m, timeout } = require("./../module");

module.exports = {
	url,
	console,
	cheerio,
	Request,
	h2m,
	QUERY,
	timeout,
	request
};
