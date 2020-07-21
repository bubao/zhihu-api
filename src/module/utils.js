/**
 * @author bubao
 * @description
 * @date: 2018-5-19 11:32:29
 * @Last Modified by: bubao
 * @Last Modified time: 2019-12-01 23:32:26
 */

const { request, timeout } = require("../config/commonModules");
const { URL, URLSearchParams } = require("url");
const url = require("url");
const assign = require("lodash/assign");
const isObject = require("lodash/isObject");
const forEach = require("lodash/forEach");
const template = require("lodash/template");
const merge = require("lodash/merge");
const uniq = require("lodash/uniq");
const concat = require("lodash/concat");
const clamp = require("lodash/clamp");
const compact = require("lodash/compact");

const requestMethod = options =>
	request(options).then(res => JSON.parse(res.body));

async function loopGet (options, results) {
	const { body } = await request(options);
	const value = JSON.parse(body);
	results = uniq(compact(concat(value.data, results)));
	if (!value.paging.is_end) {
		await timeout(options.timeout || 10000, results);
		options.uri = value.paging.next;
		results = await loopGet(options, results);
	}
	return results;
}
/**
 * 获取url的参数
 * @param {number} offset
 * @param {number} limit
 */
const getURLParams = params => {
	const { offset, limit, ...other } = params;
	const result = {
		limit: limit ? clamp(limit, 1, 20) : undefined,
		offset: offset * limit,
		...other
	};
	return result;
};
/**
 * 获取真实url
 * @param {string} u url
 * @param {object} params url参数object
 */
const getTrueURL = (u, params) => {
	const query = url.parse(u, true).query;
	u = new URL(u);
	u.search = new URLSearchParams(getURLParams({ ...query, ...params }));
	return u.toString();
};

function requestOpts (ID, options, templ) {
	if (isObject(ID)) return merge(options, { uri: template(templ)(ID) });
	return false;
}

const times = (count, limit = 20) => (count - (count % limit)) / limit;

function cycleMethod (cycle) {
	const defaultCycle = 20;
	if (cycle && cycle !== defaultCycle) {
		cycle %= defaultCycle;
	}
	cycle = cycle || defaultCycle;
	return cycle;
}

/**
 *
 * @param {nubmer} count 总数
 * @param {nubmer} cycle 周期
 */
function rateMethod (count, cycle) {
	count = count === undefined ? 20 : count;
	cycle = cycleMethod(cycle);
	const posts = count % cycle;
	const times = (count - posts) / cycle;
	return {
		times,
		count,
		cycle,
		writeTimes: 0,
		allObject: []
	};
}
/**
 *
 * @param {object} config 配置信息
 * @param {function} callback 回调函数
 */
function loopMethod (config, callback) {
	const { urlTemplate, ...options } = config.options;
	const opts = {
		url: url.resolve(
			urlTemplate,
			`?limit=${config.cycle}&offset=${config.writeTimes * 20}`
		),
		...options
	};
	requestMethod(opts).then(c => {
		forEach(c.data, item => {
			config.allObject.push(item);
		});
		if (config.writeTimes === config.times) {
			callback(config.allObject);
		} else {
			config.writeTimes += 1;
			loopMethod(config, callback);
		}
	});
}

module.exports = {
	assign,
	forEach,
	template,

	loopGet,
	requestOpts,
	// loopdown,
	getTrueURL,
	times,
	loopMethod,
	cycleMethod,
	rateMethod,
	requestMethod
};
