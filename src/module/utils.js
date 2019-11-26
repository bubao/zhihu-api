/**
 * @author bubao
 * @description
 * @date: 2018-5-19 11:32:29
 * @Last Modified by: bubao
 * @Last Modified time: 2018-06-11 11:47:11
 */

const { request, timeout } = require("../config/commonModules");
const { URL, URLSearchParams } = require("url");
const url = require("url");
const forEach = require("lodash/forEach");
const isObject = require("lodash/isObject");
const isNaN = require("lodash/isNaN");
const template = require("lodash/template");
const merge = require("lodash/merge");
const uniq = require("lodash/uniq");
const concat = require("lodash/concat");
const clamp = require("lodash/clamp");
const compact = require("lodash/compact");

const loopGet = async (options, results) => {
	const { body } = await request(options);
	const value = JSON.parse(body);
	results = uniq(compact(concat(value.data, results)));
	if (!value.paging.is_end) {
		await timeout(options.timeout || 10000, results);
		options.uri = value.paging.next;
		results = await loopGet(options, results);
	}
	return results;
};
/**
 * 获取url的参数
 * @param {number} offset
 * @param {number} limit
 */
const getURLParams = params => {
	const { offset, limit, ...other } = params;
	return {
		limit: limit ? clamp(limit, 1, 20) : undefined,
		"amp;offset": isNaN(offset * limit) ? offset * limit : undefined,
		...other
	};
};
/**
 * 获取真实url
 * @param {string} u url
 * @param {object} params url参数object
 */
const getTrueURL = (u, params) => {
	u = new URL(u);
	u.search = new URLSearchParams(getURLParams(params));
	return u.toString();
};

/**
 * 第二层循环下载器
 * @param {number} postsCount 文章数量
 * @param {string} zhihuzhuanlanId 知乎专栏的ID
 * @param {string} localPath 下载路径
 */
// async function loopdown(options, count, v = {}) {
// 	options.uri = getTrueURL(options.uri, { limit: 20, offset: count });
// 	const { body } = await request(options);
// 	const value = JSON.parse(body);
// 	v = uniq(concat(value.data, v));
// 	if (count) {
// 		await timeout(options.timeout || 10000, v === {});
// 		v = await loopdown(options, count - 1, v);
// 	}
// 	return v;
// };

const requestOpts = (ID, options, templ) => {
	if (isObject(ID)) {
		return merge(options, { uri: template(templ)(ID) });
	}
	return false;
};

const times = (count, limit = 20) => {
	return (count - (count % limit)) / limit;
};
const requestMethod = options => {
	return request(options).then(c => {
		return JSON.parse(c.body);
	});
};
/**
 *
 * @param {nubmer} count 总数
 * @param {nubmer} cycle 周期
 */
const rateMethod = (count, cycle) => {
	count = count === undefined ? 20 : count;
	cycle = cycleMethod(cycle);
	const posts = count % cycle;
	const times = (count - posts) / cycle;
	return {
		times,
		count,
		cycle,
		writeTimes: 0,
		allObject: {}
	};
};

const cycleMethod = cycle => {
	const defaultCycle = 20;
	if (cycle && cycle !== defaultCycle) {
		cycle = cycle % defaultCycle;
	}
	cycle = cycle || defaultCycle;
	return cycle;
};
/**
 *
 * @param {object} config 配置信息
 * @param {function} callback 回调函数
 */
const loopMethod = (config, callback) => {
	const { urlTemplate, ...options } = config.options;
	const opts = {
		url: url.resolve(
			urlTemplate,
			`?limit=${config.cycle}&offset=${config.writeTimes * 20}`
		),
		...options
	};
	requestMethod(opts).then(c => {
		forEach(c, (item, index) => {
			config.allObject[index + config.writeTimes * 20] = item;
		});
		if (config.writeTimes === config.times) {
			callback(config.allObject);
		} else {
			config.writeTimes += 1;
			loopMethod(config, callback);
		}
	});
};

module.exports = {
	loopGet,
	requestOpts,
	// loopdown,
	times,
	loopMethod,
	cycleMethod,
	rateMethod,
	requestMethod
};