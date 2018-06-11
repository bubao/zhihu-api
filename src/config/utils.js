/**
 * @author bubao
 * @description
 * @date: 2018-5-19 11:32:29
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-23 16:10:49
 */

const { request, timeout } = require('./commonModules');
const { URL, URLSearchParams } = require('url');
const isObject = require('lodash/isObject');
const isNaN = require('lodash/isNaN');
const template = require('lodash/template');
const merge = require('lodash/merge');
const uniq = require('lodash/uniq');
const concat = require('lodash/concat');
const clamp = require('lodash/clamp');
const compact = require('lodash/compact');

const loopGet = async (options, v) => {
	const { body } = await request(options);
	const value = JSON.parse(body);
	v = uniq(compact(concat(value.data, v)));
	if (!value.paging.is_end) {
		await timeout(options.timeout || 10000, v);
		options.uri = value.paging.next;
		v = await loopGet(options, v);
	}
	return v;
}
/**
 * 获取url的参数
 * @param {number} offset
 * @param {number} limit
 */
const getURLParams = (params) => {
	const { offset, limit, ...other } = params;
	return {
		limit: limit ? clamp(limit, 1, 20) : undefined,
		'amp;offset': (isNaN(offset * limit)) ? (offset * limit) : undefined,
		...other
	}
}
/**
 * 获取真实url
 * @param {string} url url
 * @param {object} params url参数object
 */
const getTrueURL = (url, params) => {
	url = new URL(url);
	url.search = new URLSearchParams(getURLParams(params));
	return url.toString();
}
/**
 * 第二层循环下载器
 * @param {number} postsCount 文章数量
 * @param {string} zhihuzhuanlanId 知乎专栏的ID
 * @param {string} localPath 下载路径
 */
async function loopdown(options, count, v = {}) {
	options.uri = getTrueURL(options.uri, { limit: 20, offset: count });
	const { body } = await request(options);
	const value = JSON.parse(body);
	v = uniq(concat(value.data, v));
	if (count) {
		await timeout(options.timeout || 10000, v === {});
		v = await loopdown(options, count - 1, v);
	}
	return v;
};

const requestOpts = (ID, options, templ) => {
	if (isObject(ID)) {
		return merge(options, { uri: template(templ)(ID) });
	}
	return false;
}

const times = (count, limit = 20) => {
	return (count - count % limit) / limit;
}

module.exports = {
	loopGet,
	requestOpts,
	loopdown,
	times,
}
