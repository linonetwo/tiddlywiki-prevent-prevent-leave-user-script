### 功能

这个插件主要是让在线部署后的 Wiki 不会弹出「有变动关闭网页前请保存」这样的对话框。

### 动机

来自 TiddlyMap 的 [[$:/plugins/felixhayashi/tiddlymap/misc/defaultViewHolder]] 和来自系统的 [[$:/StoryList]] 老是自动变：

```diff
created: 20200409022623558
creator: Lin Onetwo - 林一二
-modified: 20200414104033109
+modified: 20200414135126182
modifier: Lin Onetwo - 林一二
title: $:/plugins/felixhayashi/tiddlymap/misc/defaultViewHolder
type: text/vnd.tiddlywiki
```

没有实质性的变化，而且又经常发生在 wiki 部署后，这样在线版 wiki 就会弹出「This page is asking you to confirm that you want to leave - data you have entered may not be saved」。

但我只是想做浏览不想做编辑啊，这让我觉得很烦。

后来发现原来是 onbeforeunload 导致的，[[我去仓库里搜到了|https://github.com/Jermolene/TiddlyWiki5/search?q=beforeunload&unscoped_q=beforeunload]]是 `$tw.utils.each($tw.unloadTasks` 在用它，所以我就过滤了一下 `$tw.unloadTasks`。而且还不能立即做这个过滤，因为 `$:/tags/RawMarkup` 是在沙盒里执行的，不能修改 `$tw` 。

所以最终我跟着 [[Adding Babel Polyfill to TiddlyWiki|https://tiddlywiki.com/dev/#Adding%20Babel%20Polyfill%20to%20TiddlyWiki]] 这篇教程，加了一个 startup script，在启动时、上述代码之后，就清理掉那个导致弹窗的 unloadTask，世界终于清静了。

最终，我把它包装成了这个 [[prevent-edit|$:/plugins/linonetwo/prevent-edit]] 插件。(现在是用户脚本了）
