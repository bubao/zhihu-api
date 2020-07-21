<!--
 * @description:
 * @author: bubao
 * @Date: 2020-07-21 07:20:37
 * @LastEditors: bubao
 * @LastEditTime: 2020-07-21 20:48:12
-->

# Post

知乎专栏接口

引入

```js
const { Post } = require("zhihu-api");
```

## Articles

可控制获取知乎专栏文章。

### Articles 初始化

```js
const Articles = Post.Articles;
const articles = new Articles("oh-hard");
// 等同于
// const articles = new Articles();
// articles.init('oh-hard');
```

### 获取专栏实例 info

获取专栏信息。

```js
articles.info();
```

### 获取 Articles 下一组数据

继承于`Base`。

```js
articles.next();
```

返回`body`所有数据。

### 获取 Articles 上一组数据

继承于`Base`。

```js
articles.previous();
```

返回`body`所有数据。

### 获取 Articles 全部数据

继承于`Base`。

```js
articles.all();
```

返回`body.data`所有数据。

## Followers

专栏关注者。

### Followers 初始化

```js
const Followers = Post.Followers;
const followers = new Followers("oh-hard");
// 等同于
// const followers = new Followers();
// followers.init('oh-hard');
```

### 获取 Followers 下一组数据

继承于`Base`。

```js
followers.next();
```

返回`body`所有数据。

### 获取 Followers 上一组数据

继承于`Base`。

```js
followers.previous();
```

返回`body`所有数据。

### 获取 Followers 全部数据

继承于`Base`。

```js
followers.all();
```

返回`body.data`所有数据。

## coauthors

获取专栏作者信息

```js
Post.coathors("oh-hard");
```

## info

获取专栏信息。

```js
Post.info("oh-hard");
```
