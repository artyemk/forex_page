var stretchContent = function () {
    var content = $('.js-content');
    var contentContainer = $('.js-content__container');
    contentContainer.css('height', 'auto');
    var contentHeight = content.height();
    var rightcolHeight = $('.js-rightcol').height();
    var deficit = rightcolHeight - contentHeight;
    if (deficit > 0) {
        var contentContainerHeight = contentContainer.height();
        var firstChildMarginTop = parseInt(content.children().eq(0).css('margin-top'));
        if (isNaN(firstChildMarginTop)) firstChildMarginTop = 0;
        contentContainer.css('min-height', deficit + contentContainerHeight - firstChildMarginTop)
    }
};
window.onload = function () {
    stretchContent()
};
$(function () {
    if ($(window).width() > 960) {
        var delay = 0, setTimeoutConst, _curMenu;
        $('.nav2 ul li').hover(function () {
            _curMenu = $(this);
            setTimeoutConst = setTimeout(function () {
                _curMenu.children('a').stop().addClass('active__link');
                _curMenu.children('.menu__second').stop().fadeIn(1);
                $('.menu__second > div.secondlvl:first').css('min-height',$('.secondlvl-wr').height());
            }, delay);
        }, function () {
            clearTimeout(setTimeoutConst);
            _curMenu.children('.menu__second').stop().fadeOut(1);
            _curMenu.children('a').removeClass('active__link');
        });
    }
    $(window).on('resize', function () {
        if ($(window).width() < 960) {
            $('.nav2 ul li ').hover(function () {
            }, function () {
            }).off();
            $('.secondlvl > div').hover(function () {
            }, function () {
            }).off();
        }
    });
    $('.form__search').on('click', function () {
        $('.header__form .header__background').toggleClass('active');
    });
    $('#nav-icon3').on('click', function () {
        $('.nav2 .firslvl').toggleClass('active');
        $('.nav2 .firslvl').removeAttr('style');
    });
    $('.nav2__arrow').on('click', function () {
        $(this).toggleClass('active');
        $('.nav2 .firslvl').css('height', '100%');
        $(this).siblings('div').slideToggle();
    });
    $('.secondlvl__arrow').on('click', function () {
        $(this).toggleClass('active');
        $(this).siblings('div').slideToggle();
    });
    $('.alparifed__commet span').on('click', function () {
        $(this).parent().siblings('.addcom').slideToggle();
    });
});

function initTabs(tabs) {
    tabs = tabs || $('.js-tabs');
    for (var i = 0; i < tabs.length; i++) {
        tabs.eq(i).find('.tabs__list__item').eq(0).addClass('tabs__list__item_active');
        tabs.eq(i).find('.tabs__contents__item').hide().eq(0).show()
    }
    tabs.find('.tabs__list__item').click(function () {
        var thisIndex = $(this).index();
        $(this).addClass('tabs__list__item_active').siblings().removeClass('tabs__list__item_active');
        $(this).closest('div').find('.tabs__contents__item').eq(thisIndex).show().siblings().hide();
        stretchContent();
        if ($(this).data('id')) {
            $('.rightcol3 .sidebar[data-id]').hide();
            $('.rightcol3 .sidebar[data-id="' + $(this).data('id') + '"]').show()
        }
    })
}
jQuery.fn.pseudoSelect = function (options) {
    options = jQuery.extend({change: null, onToggle: null}, options);
    this.each(function () {
        var chooser = $(this);
        var slideUp = function (chooser) {
            if (chooser.data("opened") == 0) {
                chooser.find(".chooser__list").slideUp()
            }
        }
        chooser.data("opened", 0);
        chooser.find('.chooser__title').mouseenter(function () {
            chooser.data("opened", chooser.data("opened") + 1);
            $(this).next().slideDown(100)
        }).mouseleave(function () {
            chooser.data("opened", chooser.data("opened") - 1);
            setTimeout(function () {
                slideUp(chooser)
            }, 250)
        });
        chooser.find('.chooser__list').mouseenter(function () {
            chooser.data("opened", chooser.data("opened") + 1)
        }).mouseleave(function () {
            chooser.data("opened", chooser.data("opened") - 1);
            setTimeout(function () {
                slideUp(chooser)
            }, 250)
        });
        chooser.find('.chooser__list__item .chooser__list__item__link').click(function (e) {
            e.preventDefault();
            $(this).parent().parent().prev().find('.chooser__title__text').html($(this).parent().html());
            $(this).parent().parent().slideUp();
            if (typeof options.change == 'function') {
                options.change(this, chooser)
            }
        })
    });
    $('body').click(function (e) {
        thisClasses = e.target.className;
        thisHasClass = thisClasses.indexOf('chooser');
        if (thisHasClass != -1) {
            return !1
        }
        $(this).find('.chooser__list').slideUp()
    })
};
jQuery.fn.brokerTabs = function (options) {
    options = jQuery.extend({navigation: null, activeItemClass: "active"}, options);
    var bx = {};

    function toggle(a) {
        for (var i in bx) {
            bx[i].hide();
            if (i == 'brokerTabsMain') $('.brokerTabsMain').hide()
        }
        if (a && a.data("broker-tab-id") && bx[a.data("broker-tab-id")]) {
            if (a.data("broker-tab-id") == 'brokerTabsReviews' || a.data("broker-tab-id") == 'brokerTabsMain') {
                $('#bottom-review-form').show()
            } else {
                $('#bottom-review-form').hide()
            }
            bx[a.data("broker-tab-id")].show();
            if (a.data("broker-tab-id") == 'brokerTabsMain') $('.brokerTabsMain').show();
            setHash(a.data("broker-tab-id"));
            setActiveMenuItem(a);
            if (options.onToggle !== null) {
                options.onToggle(a, bx[a.data("broker-tab-id")])
            }
        } else {
            for (var i in bx) {
                bx[i].show();
                if (i == 'brokerTabsMain') $('.brokerTabsMain').show();
                setActiveMenuItem();
                if (options.onToggle !== null) {
                    options.onToggle(a)
                }
                break
            }
        }
    }

    function setHash(hash) {
        var fx, node = $('#' + hash);
        if (node.length) {
            node.attr('id', '');
            fx = $('<div></div>').css({
                position: 'absolute',
                visibility: 'hidden',
                top: $(document).scrollTop() + 'px'
            }).attr('id', hash).appendTo(document.body)
        }
        if (node.length) {
            fx.remove();
            node.attr('id', hash)
        }
    }

    function setActiveMenuItem(a) {
        if (a && options.navigation) {
            options.navigation.find("li." + options.activeItemClass).removeClass(options.activeItemClass);
            var item = a.closest("li");
            if (item.length == 0) {
                item = a.parent()
            }
            item.addClass(options.activeItemClass)
        }
    }

    this.each(function (i) {
        var tab = $(this).click(function (e) {
            var a = $(this);
            if (a.data("broker-tab-id")) {
                e.preventDefault();
                toggle(a)
            }
        });
        var tabId = tab.data("tab");
        var b = $("#" + tabId);
        if (b.length > 0) {
            tab.data("broker-tab-id", tabId);
            bx[tab.data("broker-tab-id")] = b
        }
    });
    var tmpArr = document.location.href.split("#");
    if (tmpArr.length > 1) {
        this.each(function () {
            if (this.href.indexOf(tmpArr[1]) !== -1) {
                toggle($(this));
                return !1
            }
            return !0
        })
    } else {
        toggle()
    }
    return this
};
$(document).ready(function () {
    initTabs();
    $('.feedback input.button').addClass('button_not-active');
    var checkButton = function () {
        var elements = $('.feedback input:visible').add('.feedback textarea:visible').add('.feedback select:visible');
        var validateFlag = !0;
        for (var i = 0; i < elements.length; i++) {
            if (elements.eq(i).hasClass('error')) {
                validateFlag = !1
            }
            if (elements.eq(i).val() == '' && elements.eq(i).attr('required') == 'required') {
                validateFlag = !1
            }
            if (elements.eq(i).val() == null && elements.eq(i).attr('required') == 'required') {
                validateFlag = !1
            }
        }
        if (validateFlag) {
            $('.feedback input.button').removeClass('button_not-active')
        } else {
            $('.feedback input.button').addClass('button_not-active')
        }
    };
    $('.feedback select').on('change', function () {
        $(this).removeClass('error');
        checkButton()
    });
    $('.feedback input, .feedback textarea').on('change', checkButton);
    $('.feedback input, .feedback textarea').on('blur', checkButton);
    $('.feedback input, .feedback textarea').on('keyup', checkButton);
    $('.chzn-container .chzn-results li').on('click', checkButton);
    $('.chzn-container').on('hover', checkButton);
    $('.js-show-map').click(function (e) {
        $('body').css('overflow-y', 'hidden');
        $('.popup-bg').not('.popup-bg_gray').fadeIn();
        $('.popup').not('.popup_login').fadeIn();
        e.preventDefault()
    });
    $('.js-auth__link').click(function (e) {
        e.preventDefault();
        var topScroll = $('body').scrollTop() || $('html').scrollTop();
        openElDialog('.popup_login');
    });
    var accounts = $('.js-accounts');
    var accountsItemLength = accounts.find('.accounts__item').length;
    var accountsItemCounter = 0;
    accounts.each(function () {
        $(this).find('.accounts__item').hide().eq(0).show()
    });
    $('.js-comparison-datepicker-next').on('click', function () {
        var thisIndex = $(this).parent().index();
        accounts.each(function () {
            if ($(this).parent().index() == thisIndex) {
                if ($(this).find('.accounts__item:visible').next().length) {
                    $(this).find('.accounts__item:visible').next().show().siblings().hide()
                } else {
                    $(this).find('.accounts__item:first').show().siblings().hide()
                }
            }
        })
    });
    $('.js-comparison-datepicker-prev').on('click', function () {
        var thisIndex = $(this).parent().index();
        accounts.each(function () {
            if ($(this).parent().index() == thisIndex) {
                if ($(this).find('.accounts__item:visible').prev().length) {
                    $(this).find('.accounts__item:visible').prev().show().siblings().hide()
                } else {
                    $(this).find('.accounts__item:last').show().siblings().hide()
                }
            }
        })
    })
});
function toPrint(element) {
    text = document.getElementById(element).innerHTML;
    printwin = open('', 'printwin');
    printwin.document.open();
    printwin.document.writeln('<html><head><title></title></head><body onload=print();close()>');
    printwin.document.writeln(text);
    printwin.document.writeln('</body></html>');
    printwin.document.close()
}
jQuery.fn.brokerMenu = function (options) {
    options = jQuery.extend({change: null}, options);
    this.each(function () {
        var chooser = $(this);
        var slideUp = function (chooser) {
            if (chooser.data("opened") == 0) {
                chooser.find(".chooser__list").slideUp()
            }
        };
        chooser.data("opened", 0);
        chooser.find('.chooser__title').mouseenter(function () {
            chooser.data("opened", chooser.data("opened") + 1);
            $(this).next().slideDown(100)
        }).mouseleave(function () {
            chooser.data("opened", chooser.data("opened") - 1);
            setTimeout(function () {
                slideUp(chooser)
            }, 250)
        });
        chooser.find('.chooser__list').mouseenter(function () {
            chooser.data("opened", chooser.data("opened") + 1)
        }).mouseleave(function () {
            chooser.data("opened", chooser.data("opened") - 1);
            setTimeout(function () {
                slideUp(chooser)
            }, 250)
        });
        chooser.find('.chooser__list__item .chooser__list__item__link').click(function (e) {
            if (this.href && this.href != "#") {
                return !0
            }
            e.preventDefault();
            $(this).parent().parent().prev().find('.chooser__title__text').html($(this).parent().html());
            $(this).parent().parent().slideUp();
            if (typeof options.change == 'function') {
                options.change(this, chooser)
            }
        })
    })
};
jQuery.fn.roLinksGroup = function (options) {
    options = jQuery.extend({change: null}, options);
    this.each(function () {
        var group = $(this);
        var links = group.find('a');
        var chooser = group.next('.js-ro-links-group-chooser');
        if (links.eq(0).next().length > 0 && links.eq(0).next().get(0).tagName.toUpperCase() != 'BR') {
            links.eq(0).after('<br />')
        }
        if (links.length > 2) {
            chooser.show();
            links.each(function (index) {
                if (index > 1) {
                    chooser.find('.chooser__list').append('<li class="chooser__list__item"><a class="chooser__list__item__link js-compar-chooser-link" target="_blank" href="' + $(this).attr('href') + '">' + $(this).text() + '</a></li>');
                    $(this).remove()
                }
            })
        }
    })
};
$(function () {
    $('.js-ro-links-group').roLinksGroup()
});
$(function () {
    $("img.sidebar__ad-image").parent().attr("href", "http://www.fxpro.ru/?ib=176043").attr("target", "_blank")
});
var sBox = [];
$(document).ready(function () {
    $('.filter_toggle_bottom').click(function () {
        $('.filter_box').slideUp(500);
        var titleOpen = $('.filter_toggle[data-title-open]').data('title-open');
        var titleClose = $('.filter_toggle[data-title-close]').data('title-close');
        $('.filter_toggle b').text($(this).text() == titleOpen ? titleClose : titleOpen);
        $('.filter_toggle span').addClass('filter_show')
    });
    $('.filter_toggle').click(function () {
        var titleOpen = $('.filter_toggle[data-title-open]').data('title-open');
        var titleClose = $('.filter_toggle[data-title-close]').data('title-close');
        $(this).find('b').text($(this).find('b').text() == titleOpen ? titleClose : titleOpen);
        $(this).find('span').toggleClass('filter_show');
        $('.filter_box').slideToggle(500)
    });
    $('body').addClass('hasJS');
    $('select.custom').each(function () {
        var sb = new SelectBox({
            selectbox: $(this),
            customScrollbar: !1,
            height: 240,
            scrollOptions: {autoReinitialise: !0, showArrows: !0}
        });
        $(this).attr('data-s', sBox.length);
        sBox[sBox.length] = sb
    });
    $(window).load(function () {
        $('#sort td').removeClass('sorting_1')
    });
    $('.article-wrapper2 .more').click(function () {
        if ($(this).hasClass('closed')) {
            $(this).removeClass('closed').addClass('opened')
        }
        else if ($(this).hasClass('opened')) {
            $(this).removeClass('opened').addClass('closed')
        }
    })
});
$(function () {
    if(jQuery().datepicker) {
    $("#date").datepicker({
        beforeShow: function (input, inst) {
            $('#ui-datepicker-div').addClass('tables');
        }
    });
    $.datepicker.regional.ru = {
        closeText: 'Закрыть',
        prevText: '&lt;',
        nextText: '&gt;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: !1
    };
    $.datepicker.setDefaults($.datepicker.regional.ru)
    }
});