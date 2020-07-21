/**
 * @description:
 * @author: bubao
 * @Date: 2018-05-21 13:21:17
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 18:38:04
 */

const User = require("../src/api/User");
// const config = require("./env.json");
const config = {};
const fs = require("fs");

const { console } = require("../src/config/commonModules");

// User.info('binka', config).then((res) => {
// 	fs.writeFile('./nopush/UserInfo.json', JSON.stringify(res), () => {
// 		console.log('UserInfo');
// 	});
// });

User.followers("binka", config).then(res => {
	fs.writeFile("./nopush/followers.json", JSON.stringify(res), () => {
		console.log("followers");
	});
});
