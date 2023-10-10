// ==UserScript==
// @name          	Tiddlywiki Prevent Prevent Leave
// @description     Prevent annoying "This website prevent you leave" dialog in tiddlywiki based websites.
// @version         0.0.1
// @icon https://tiddlywiki.com/favicon.ico
// @author			Lin Onetwo <https://github.com/linonetwo/wiki>
// @namespace       https://github.com/linonetwo
// @downloadURL		https://raw.github.com/linonetwo/tiddlywiki-prevent-prevent-leave-user-script/master/prevent-prevent-leave.user.js
// @updateURL		https://raw.github.com/linonetwo/tiddlywiki-prevent-prevent-leave-user-script/master/prevent-prevent-leave.user.js
// @supportURL		https://github.com/linonetwo/tiddlywiki-prevent-prevent-leave-user-script/issues
//
// @license         MIT
//
// @include         *://*
//
// @run-at			document-end
// @unwrap
// ==/UserScript==

/**
 * Wait until $tw exists, then modify the wiki.
 *
 * For user script APIs:
 * @see http://wiki.greasespot.net/API_reference
 * @see http://wiki.greasespot.net/Metadata_Block
 */
(function() {
  let waitTwCounter = 0;
  const MAX_WAIT_TW_RETRY = 10;
  function waitTwLoaded() {
    if (waitTwCounter++ > MAX_WAIT_TW_RETRY) return;
    if (typeof $tw !== 'undefined') {
      onTwLoaded();
    } else {
      setTimeout(() => {
        waitTwLoaded();
      }, 100);
    }
  }
  waitTwLoaded();

  function onTwLoaded() {
    $tw.unloadTasks = $tw.unloadTasks.filter(task => !(task.toString().includes('UnsavedChangesWarning')));
  }
})();
