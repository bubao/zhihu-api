/**
 * @Description: 知乎的API
 * @Author: bubao
 * @Date: 2018-05-17 12:27:02
 * @LastEditors: bubao
 * @LastEditTime: 2022-08-25 10:44:04
 */

const zhihu = "https://www.zhihu.com";
const zhuanlan = "https://zhuanlan.zhihu.com";
const zhimg = "https://pic1.zhimg.com";

module.exports = {
	zhihu,
	zhuanlan,
	zhimg,
	topic: {
		/**
		 * @param {{topicId:string}}
		 */
		info: ({ topicId }) =>
			`${zhihu}/api/v4/topics/${topicId}?include=introduction%2Cquestions_count%2Cbest_answers_count%2Cfollowers_count%2Cis_following`,
		/**
		 *  @param {{topicId:string}}
		 */
		timelineQuestion: ({ topicId }) =>
			`${zhihu}/api/v4/topics/${topicId}/feeds/timeline_question`,
		/**
		 *  @param {{topicId:string}}
		 */
		timelineActivity: ({ topicId }) =>
			`${zhihu}/api/v4/topics/${topicId}/feeds/timeline_activity`,
		/**
		 *  @param {{topicId:string}}
		 */
		essence: ({ topicId }) =>
			`${zhihu}/api/v4/topics/${topicId}/feeds/essence`,
		/**
		 *  @param {{topicId:string}}
		 */
		topQuestion: ({ topicId }) =>
			`${zhihu}/api/v4/topics/${topicId}/feeds/top_question`,
		/**
		 *  @param {{topicId:string}}
		 */
		topActivity: ({ topicId }) =>
			`${zhihu}/api/v4/topics/${topicId}/feeds/top_activity`,

		/**
		 *  @param {{topicId:string}}
		 */
		bestAnswerers: ({ topicId }) =>
			`${zhihu}/api/v4/topics/${topicId}/best_answerers?limit=3`,
		/**
		 * 话题关注者
		 *  @param {{topicId:string}}
		 */
		followers: ({ topicId }) =>
			`${zhihu}/api/v4/topics/${topicId}/followers?include=data%5B%2A%5D.gender%2Canswer_count%2Carticles_count%2Cfollower_count%2Cis_following%2Cis_followed&limit=20&offset=20`,
		/**
		 * 话题的父话题
		 *  @param {{topicId:string}}
		 */
		parent: ({ topicId }) => `${zhihu}/api/v3/topics/${topicId}/parent`,
		/**
		 * 话题的子话题
		 *  @param {{topicId:string}}
		 */
		children: ({ topicId }) => `${zhihu}/api/v3/topics/${topicId}/children`,
		/**
		 * 话题结构
		 *  @param {{topicId:string}}
		 */
		organize: ({ topicId }) => `${zhihu}/topic/${topicId}/organize/entire`,
		/**
		 * 查询下一级的话题
		 * @param {{topicId:string,childId:string}}
		 */
		entire: ({ topicId, childId }) =>
			`${zhihu}/topic/${topicId}/organize/entire?child=${childId}&parent=${topicId}`
	},
	post: {
		// info: `${zhuanlan}/api/posts/<%= postId%>`,
		/**
		 *  @param {{columnsId:string}}
		 */
		info: ({ columnsId }) =>
			`${zhihu}/api/v4/columns/${columnsId}?include=title%2Cintro%2Cdescription%2Cimage_url%2Carticles_count%2Cfollowers%2Cis_following%2Clast_article.created`,
		// /**
		//  *  @param {{columnsId:string}}
		//  */
		// // page: ({ columnsId }) => `${zhuanlan}/api/columns/${columnsId}/posts`,
		/**
		 * @param {{url_token:string, options:{limit?:10,offset?:0}}}
		 */
		items: ({ columnsId, options = {} }) =>
			`${zhihu}/api/v4/columns/${columnsId}/items?offset=${options.offset || 0}&limit=${options.limit || 10}`,
		/**
		 * @param {{columnsId:string}}
		 */
		columns: ({ columnsId }) => `${zhuanlan}/api/columns/${columnsId}`,
		/**
		 *  @param {{columnsId:string}}
		 */
		articles: ({ columnsId }) =>
			`${zhihu}/api/v4/columns/${columnsId}/articles?include=data%5B*%5D.admin_closed_comment%2Ccomment_count%2Csuggest_edit%2Cis_title_image_full_screen%2Ccan_comment%2Cupvoted_followees%2Ccan_open_tipjar%2Ccan_tip%2Cvoteup_count%2Cvoting%2Ctopics%2Creview_info%2Cauthor.is_following`,
		/**
		 * @param {{postId:string}}
		 */
		likers: ({ postId }) => `${zhuanlan}/api/posts/${postId}`,
		// columns: `${zhuanlan}/api/columns/<%= columnsID%>`,
		// zhuanlan: zhuanlan + '/api/columns/',
		/**
		 * @param {{postId:string}}
		 */
		comments: ({ postId }) => `${zhuanlan}/api/posts/${postId}/comments`,
		/**
		 * @param {{columnsId:string}}
		 */
		followers: ({ columnsId }) =>
			`${zhuanlan}/api/columns/${columnsId}/followers`
	},
	answer: {
		likers: () => `${zhihu}/node/AnswerFullVoteInfoV2`,
		/**
		 * @param {{answerId:string}}
		 */
		voters: ({ answerId }) => `${zhihu}/answer/${answerId}/voters_profile`
	},
	user: {
		// info: zhihu + '/node/MemberProfileCardV2',
		// info: `${zhihu}/people/<%= url_token %>/pins`,
		/**
		 * @param {{url_token:string}}
		 */
		info: ({ url_token }) =>
			`${zhihu}/api/v4/members/${url_token}?include=allow_message%2Cis_followed%2Cis_following%2Cis_org%2Cis_blocking%2Cemployments%2Canswer_count%2Cfollower_count%2Carticles_count%2Cgender%2Cbadge[%3F(type%3Dbest_answerer)].topics`,
		/**
		 * @param {{url_token:string, options:{limit?:20,offset?:0}}}
		 */
		followers: ({ url_token, options = {} }) =>
			`${zhihu}/api/v4/members/${url_token}/followers?include=data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=${options.offset ||
			0}&limit=${options.limit || 20}`,
		/**
		 * @param {{url_token:string, options:{limit?:20,offset?:0}}}
		 */
		column_contributions: ({ url_token, options = {} }) =>
			`${zhihu}/api/v4/members/${url_token}/column-contributions?include=data%5B*%5D.column.intro%2Cfollowers%2Carticles_count&offset=${options.offset ||
			0}&limit=${options.limit || 20}`,
		/**
		 * @param {{url_token:string, options:{limit?:20,offset?:0}}}
		 */
		zhuanlansFocus: ({ url_token, options = {} }) =>
			`${zhihu}/api/v4/members/${url_token}/following-columns?include=data%5B*%5D.intro%2Cfollowers%2Carticles_count&offset=${options.offset ||
			0}&limit=${options.limit || 20}`,
		/**
		 * 查询该用户动态
		 * @param {{url_token:string}}
		 */
		activities: ({ url_token }) =>
			`${zhihu}/api/v4/members/${url_token}/activities?limit=7&after_id=1542031612&desktop=True`, // 查询该用户动态
		/**
		 * 用户提问
		 * @param {{url_token:string, options:{limit?:20,offset?:0}}}
		 */
		questions: ({ url_token, options = {} }) =>
			`${zhihu}/api/v4/members/${url_token}/questions?include=data%5B*%5D.created%2Canswer_count%2Cfollower_count%2Cauthor%2Cadmin_closed_comment&offset=${options.offset ||
			0}&limit=${options.limit || 20}`, // 用户提问
		/**
		 * 用户文章
		 * @param  {{url_token:string, options:{limit?:20,offset?:0}}}
		 */
		articles: ({ url_token, options = {} }) =>
			`${zhihu}/api/v4/members/${url_token}/articles?include=data%5B*%5D.comment_count%2Csuggest_edit%2Cis_normal%2Cthumbnail_extra_info%2Cthumbnail%2Ccan_comment%2Ccomment_permission%2Cadmin_closed_comment%2Ccontent%2Cvoteup_count%2Ccreated%2Cupdated%2Cupvoted_followees%2Cvoting%2Creview_info%2Cis_labeled%2Clabel_info%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=${options.offset ||
			0}&limit=${options.limit || 20}&sort_by=created` // 用户文章
	},

	columns: {
		items: ({ columnsId }) => `${zhihu}/api/v4/columns/${columnsId}/items`,
		/**
		 * 基本信息
		 * @param {{columnsId:string}}
		 */
		root: ({ columnsId }) => `${zhuanlan}/api/columns/${columnsId}`, // 基本信息
		/**
		 * 文章
		 * @param {{columnsId:string}}
		 */
		articles: ({ columnsId }) =>
			`${zhuanlan}/api/columns/${columnsId}/articles?include=data%5B*%5D.admin_closed_comment%2Ccomment_count%2Csuggest_edit%2Cis_title_image_full_screen%2Ccan_comment%2Cupvoted_followees%2Ccan_open_tipjar%2Ccan_tip%2Cvoteup_count%2Cvoting%2Ctopics%2Creview_info%2Cauthor.is_following%2Cis_labeled%2Clabel_info`,
		/**
		 * 关注者
		 * @param {{columnsId:string}}
		 */
		// followers: ({ columnsId }) =>
		// 	`${zhihu}/api/v4/columns/${columnsId}/followers?include=data%5B*%5D.follower_count%2Cgender%2Cis_followed%2Cis_following&offset=0&limit=10`,
		followers: ({ columnsId }) => `${zhuanlan}/api/columns/${columnsId}/followers`,
		/**
		 * 关于
		 * @param {{columnsId:string}}
		 */
		coauthors: ({ columnsId }) =>
			`${zhuanlan}/api/columns/${columnsId}/coauthors?filter=all` // 关于
	},

	collection: {
		// full url: http://www.zhihu.com/collection/25547043?page=1
		url: `${zhihu}/collection/`
	}
};
