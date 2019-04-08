/**
 * @author bubao
 * @description
 * @date: 2018-5-19 11:32:29
 * @Last Modified by: bubao
 * @Last Modified time: 2019-04-09 01:55:07
 */

const { request, timeout } = require("./commonModules");
const url = require("url");

const uniq = require("lodash/uniq");
const merge = require("lodash/merge");
const assign = require("lodash/assign");
const concat = require("lodash/concat");
const forEach = require("lodash/forEach");
const compact = require("lodash/compact");
const isObject = require("lodash/isObject");
const template = require("lodash/template");

async function loopGet(options, results) {
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

function requestOpts(ID, options, templ) {
	if (isObject(ID)) return merge(options, { uri: template(templ)(ID) });
	return false;
}

const times = (count, limit = 20) => (count - (count % limit)) / limit;

const requestMethod = options => request(options).then(c => JSON.parse(c.body));

function cycleMethod(cycle) {
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
function rateMethod(count, cycle) {
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
function loopMethod(config, callback, spinner) {
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
			loopMethod(config, callback, spinner);
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
	times,
	loopMethod,
	cycleMethod,
	rateMethod,
	requestMethod
};
