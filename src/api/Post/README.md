<!--
 * @description:
 * @author: bubao
 * @Date: 2020-07-21 07:20:37
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 07:45:33
-->

# Post

知乎专栏接口

引入

```js
const { Post } = require("zhihu-api");
```

## Articles

可控制获取知乎专栏文章。

### 初始化

```js
const Articles = Post.Articles;
const articles = new Articles("oh-hard");
// 等同于
// const articles = new Articles();
// articles.init('oh-hard');
```

### 获取下一组数据

继承于`Base`。

```js
articles.next();
```

返回`body`所有数据。

### 获取上一组数据

继承于`Base`。

```js
articles.previous();
```

返回`body`所有数据。

### 获取全部数据

继承于`Base`。

```js
articles.all();
```

返回`body.data`所有数据。

## info

获取专栏信息。

```js
Post.info("oh-hard");
```

## posts

获取知乎专栏全部文章，与`articles.all()`返回内容一致。

```js
Post.posts("oh-hard");
```
