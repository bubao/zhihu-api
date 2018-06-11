/**
 * @author bubao
 * @description
 * @date: 2018-05-21 18:29:38
 * @Last Modified by: bubao
 * @Last Modified time: 2018-05-22 10:41:40
 */
const Post = require('../src/api/Post');
const config = require('./env.json');
const fs = require('fs');

const { console } = require('../src/config/commonModules');

Post.info('oh-hard', config).then((res) => {
	fs.writeFile('./nopush/zhuanlanInfo.json', JSON.stringify(res), () => { console.log("zhuanlanInfo"); });
})

Post.articles('oh-hard', config).then((res) => {
	fs.writeFile('./nopush/zhuanlanArticles.json', JSON.stringify(res), () => { console.log("zhuanlanArticles"); });
})
