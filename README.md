# tiddlywiki-prevent-prevent-leave-user-script

Prevent annoying "This website prevent you leave" dialog in tiddlywiki based websites.

[openuserjs](https://openuserjs.org/scripts/linonetwo/Tiddlywiki_Prevent_Prevent_Leave)

[中文 Readme](./Readme_zh.md)

### Feature

This plugin is designed to prevent the "Save before closing" dialog box from popping up after deploying the wiki online.

### Motivation

The [[$:/plugins/felixhayashi/tiddlymap/misc/defaultViewHolder]] from TiddlyMap and the [[$:/StoryList]] from the system always change automatically:

``diff
created: 20200409022623558
creator: Lin Onetwo - 林一二
-modified: 20200414104033109
+modified: 20200414135126182
modifier: Lin Onetwo - 林一二
title: $:/plugins/felixhayashi/tiddlymap/misc/defaultViewHolder
type: text/vnd.tiddlywiki
``.

There's no substantial change, and again it often happens after wiki deployment so that the online version of the wiki pops up with "This page is asking you to confirm that you want to leave - data you have entered may not be saved".

But I just want to browse and not edit, and this annoyed me.

I found out that onbeforeunload was the cause, [[I went to the repository and found it|https://github.com/Jermolene/TiddlyWiki5/search?q=beforeunload&unscoped_q=beforeunload]] and it was `$tw. utils.each($tw.unloadTasks` was using it, so I filtered `$tw.unloadTasks`. And couldn't do this filtering right away because `$:/tags/RawMarkup` is executed in the sandbox and can't modify `$tw`.

So I ended up following the [[Adding Babel Polyfill to TiddlyWiki|https://tiddlywiki.com/dev/#Adding%20Babel%20Polyfill%20to%20TiddlyWiki]] tutorial and added a startup script to clean up the unloadTask that was causing the popup on startup, after the above code, and the world was finally clear.

I ended up wrapping it into this [[prevent-edit|$:/plugins/linonetwo/prevent-edit]] plugin. (And now it is a user script)
