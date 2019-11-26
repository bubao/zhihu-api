/**
 * @author bubao
 * @description 话题
 * @date: 2018-05-17 12:15:31
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-22 21:29:47
 */

// const merge = require('lodash/merge');
const template = require("lodash/template");
const capitalize = require("lodash/capitalize");
const API = require("../config/api");
const { request, console } = require("../config/commonModules");
const { loopGet, requestOpts } = require("../module/utils");

const questions = (topicID, options) => {
	options.uri = template(API.topic.topQuestion)({ topicID });
	return loopGet(options);
};

/**
 * 通用方法
 * @param {string|number} topicID 话题ID
 * @param {object} options 配置选项
 * @param {string} countName template名
 */
const universalMethod = async (topicID, options, countName) => {
	if (options.headers) {
		const { timeline } = options;
		if (countName === "question" || countName === "activity") {
			countName = `${timeline ? "timeline" : "top"}${capitalize(
				countName
			)}`;
		}
		const object = requestOpts({ topicID }, options, API.topic[countName]);
		return JSON.parse((await request(object)).body);
	}
	console.error("lost headers");
	return false;
};

module.exports = {
	info: (topicID, options) => {
		return universalMethod(topicID, options, "info");
	},
	parent: (topicID, options) => {
		return universalMethod(topicID, options, "parent");
	},
	children: (topicID, options) => {
		return universalMethod(topicID, options, "children");
	},
	organize: (topicID, options) => {
		return universalMethod(topicID, options, "organize");
	},
	followers: (topicID, options) => {
		return universalMethod(topicID, options, "followers");
	},

	questions,

	activity: (topicID, options) => {
		return universalMethod(topicID, options, "activity");
	},
	topActivity: (topicID, options) => {
		return universalMethod(topicID, options, "topActivity");
	},
	timelineActivity: (topicID, options) => {
		return universalMethod(topicID, options, "timelineActivity");
	},
	question: (topicID, options) => {
		return universalMethod(topicID, options, "question");
	},
	topQuestion: (topicID, options) => {
		return universalMethod(topicID, options, "topQuestion");
	},
	timelineQuestion: (topicID, options) => {
		return universalMethod(topicID, options, "timelineQuestion");
	},
	essence: (topicID, options) => {
		return universalMethod(topicID, options, "essence");
	},
	bestAnswerers: (topicID, options) => {
		return universalMethod(topicID, options, "bestAnswerers");
	}
};
