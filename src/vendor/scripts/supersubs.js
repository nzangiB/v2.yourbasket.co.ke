/*
 * Supersubs v0.3b - jQuery plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */

(function ($) { // $ will refer to jQuery within this closure
  $.fn.supersubs = function (options) {
    const opts = $.extend({}, $.fn.supersubs.defaults, options);
    // return original object to support chaining
    return this.each(function () {
      // cache selections
      const $$ = $(this);
      // support metadata
      const o = $.meta ? $.extend({}, opts, $$.data()) : opts;
      // cache all ul elements and show them in preparation for measurements
      const $ULs = $$.find("ul").show();
      // get the font size of menu.
      // .css('fontSize') returns various results cross-browser, so measure an em dash instead
      const fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
        padding: 0,
        position: "absolute",
        top: "-999em",
        width: "auto"
      }).appendTo($$)[0].clientWidth; // clientWidth is faster than .width()
      // remove em dash
      $("#menu-fontsize").remove();
      // loop through each ul in menu
      $ULs.each(function (i) {
        // cache this ul
        const $ul = $(this);
        // get all (li) children of this ul
        const $LIs = $ul.children();
        // get all anchor grand-children
        const $As = $LIs.children("a");
        // force content to one line and save current float property
        const liFloat = $LIs.css("white-space", "nowrap").css("float");
        // remove width restrictions and floats so elements remain vertically stacked
        $ul.add($LIs).add($As).css({
          float: "none",
          width: "auto"
        });
        // this ul will now be shrink-wrapped to longest li due to position:absolute
        // so save its width as ems.
        let emWidth = $ul[0].clientWidth / fontsize;
        // add more width to ensure lines don't turn over at certain sizes in various browsers
        emWidth += o.extraWidth;
        // restrict to at least minWidth and at most maxWidth
        if (emWidth > o.maxWidth) { emWidth = o.maxWidth; } else if (emWidth < o.minWidth) { emWidth = o.minWidth; }
        emWidth += "em";
        // set ul to width in ems
        $ul.css("width", emWidth);
        // restore li floats to avoid IE bugs
        // set li width to full width of this ul
        // revert white-space to normal
        $LIs.css({
          float: liFloat,
          width: "100%",
          "white-space": "normal"
        })
        // update offset position of descendant ul to reflect new width of parent.
        // set it to 100% in case it isn't already set to this in the CSS
          .each(function () {
            const $childUl = $(this).children("ul");
            const offsetDirection = $childUl.css("left") !== undefined ? "left" : "right";
            $childUl.css(offsetDirection, "100%");
          });
      }).hide();
    });
  };
  // expose defaults
  $.fn.supersubs.defaults = {
    minWidth: 9,		// requires em unit.
    maxWidth: 25,		// requires em unit.
    extraWidth: 0			// extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
  };
})(jQuery); // plugin code ends
