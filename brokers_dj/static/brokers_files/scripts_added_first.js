$(function () {
    var body = $('body');
    var html = $('html');
    var sticked = false;
    var rightcol = $('.js-rightcol');
    var controlSticky = function (stickyBlock, stickyParent, stickyWidth) {
        if (stickyBlock.nextAll().length == 0) {
            if (rightcol.height() < stickyParent.height()) {
                if (stickyBlock.prevAll().length == 0)stickyBlock.parent().prepend('<div class="stickyFirst"></div>');
                var windowHeight = $(window).height();
                var topScroll = body.scrollTop() || html.scrollTop();
                if (topScroll + windowHeight > stickyBlock.offset().top + stickyBlock.outerHeight() && !sticked) {
                    stickyBlock.addClass('sticky-banner');
                    stickyBlock.css('width', stickyWidth);
                    sticked = true;
                } else if (stickyBlock.prev().offset().top + stickyBlock.prev().outerHeight(true) > stickyBlock.offset().top) {
                    stickyBlock.removeClass('sticky-banner');
                    sticked = false;
                }
                var newBottom = topScroll + windowHeight - (stickyParent.offset().top + stickyParent.height());
                if (newBottom < 0)newBottom = 0;
                stickyBlock.css({'bottom': newBottom});
            }
        }
    };
    var stickyBlock = $('.js-sticky-banner');
    if (stickyBlock.length == 0) {
        return;
    }
    $(window).on('scroll', function () {
        controlSticky(stickyBlock, $('.js-page-wrapper-sticky-parent'), stickyBlock.parent().width());
    });
    $(window).on('load', function () {
        controlSticky(stickyBlock, $('.js-page-wrapper-sticky-parent'), stickyBlock.parent().width());
    });
});