function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    var updatedCookie = name + "=" + value;
    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

$(document).ready(function () {
    $(".link-encode").each(function () {
        $(this).attr("href", base64_decode($(this).data("link")))
    });
    $(".c-menu a, .broker-page-header a").click(function (e) {
        if ($(this).data('cookie')) {
            setCookie('cookie-tab', $(this).data('cookie'), {path: '/'});
        }
    });

    function inIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    if (!getCookie('ros')) {
        if (inIframe()) return false;
        $.ajax({
            url: '/banners/popup', dataType: 'json', success: function (result) {
                if (result) {
                    try {
                        function doIt(popup) {
                            var win = $(window);
                            var popUpWidth = popup.width();
                            var popUpHeight = popup.height();
                            if (popup.find('iframe').width() > popUpWidth) {
                                popUpWidth = popup.find('iframe').width()
                            }
                            var winWidth = win.width();
                            var winHeight = win.height();
                            var left = Math.round((winWidth - popUpWidth) / 2);
                            var top = Math.round((winHeight - popUpHeight) / 2);
                            if (popUpWidth > winWidth || popUpHeight > winHeight) {
                                return;
                            }
                            var bPopup = popup.bPopup({
                                modalClose: false,
                                opacity: 0.6,
                                positionStyle: 'fixed',
                                position: [left, top],
                                onOpen: function () {
                                    setCookie('ros', 1, {path: '/'});
                                }
                            });
                            popup.find('.element-close').click(function () {
                                bPopup.close();
                                return false;
                            });
                        }

                        if (!result.data.trim()) return false;
                        $('body').append('<div id="element_to"><div class="container"><div class="wrapper"><div class="top-container"><div class="element_to-close-ico element-close">&nbsp;</div></div><div class="content">' + result.data + '</div><div class="bottom-container"><a href="#" class="close-link element-close">Перейти на Brokers.ru</a></div></div></div></div>');
                        var target = $("#element_to");
                        var items = target.find('img, iframe');
                        var count = items.size();
                        if (count > 0) {
                            target.find('img, iframe').load(function () {
                                count -= 1;
                                if (count == 0) {
                                    var f = delay(doIt, 2000);
                                    f(target);
                                }
                            });
                        } else {
                            doIt(target);
                        }
                    } catch (err) {
                    }
                }
            }
        });
    }
    $('a[data-type="compare"]').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        setCookie('compare', $(this).data('ids'), {path: '/'});
        location.assign($(this).attr('href'));
    });
    $(document).on('click', 'body > .popup-bg.popup-bg_gray', function () {
        $('.closer-auth').trigger('click');
    });
    $(document).on('click', '.closer-auth', function () {
        $('body').css('overflow-y', 'auto');
        $('.popup-bg,.popup').fadeOut();
        $('body > .popup,body > .popup-window').fadeOut();
        $(this).closest('.popup-window').fadeOut();
        $('.popup-content').html('');
        $('.popup:visible').each(function () {
            if ($(this).css('position') == 'fixed') $(this).fadeOut();
        });
        $('.clearRightBlock,.clearLeftBlock').show();
    });
    $(document).on('click', '.alparifed__item-likes span', function (e) {
        e.preventDefault();
        reviewLikeAjax(this);
    });
    var selRating = 0;
    $('.talpari__rating[data-r] span').hover(function () {
        selRating = 0;
        var cont = $(this).closest('div');
        cont.find('span').addClass('disable');
        $(this).prevAll().add($(this)).removeClass('disable');
        cont.find('span').each(function () {
            if (!$(this).hasClass('disable')) {
                selRating++;
            }
        });
    }, function () {
    });
    $('.talpari__rating[data-r]').hover(function () {
    }, function () {
        $(this).find('span').addClass('disable');
        var rating = parseInt($(this).data('r'));
        for (var i = 1; i <= rating; i++) {
            $(this).find('span:nth-child(' + i + ')').removeClass('disable');
        }
    });
    $('.c-rating:not(.page-rating) .talpari__rating[data-r]').click(function () {
        var link = $(this).data('l');
        window.location.assign(link + '?r=' + selRating + '#add-review');
    });
    $('.c-rating.page-rating .talpari__rating[data-r]').click(function () {
        $('.c-rating.page-rating .talpari__rating[data-r]').off('hover');
        var _th = $(this);
        var locale_prefix = _th.data('locale_prefix');
        var cont = _th.closest('.page-rating');
        $.post(locale_prefix + '/page-rating', {rating: selRating}, function (response) {
            if (response.status) {
                _th.data('r', response.rating);
                _th.find('span').addClass('disable');
                for (var i = 1; i <= response.rating; i++) {
                    _th.find('span:nth-child(' + i + ')').removeClass('disable');
                }
                cont.find('.talpari__count').html('<span>' + response.rating + '</span> (' + response.ratingCount + ')');
            }
        }, 'json');
    });
    //
});

function delay(f, ms) {
    return function () {
        var savedThis = this;
        var savedArgs = arguments;
        setTimeout(function () {
            f.apply(savedThis, savedArgs);
        }, ms);
    };
}

function base64_decode(data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, enc = '';
    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) enc += String.fromCharCode(o1); else if (h4 == 64) enc += String.fromCharCode(o1, o2); else enc += String.fromCharCode(o1, o2, o3);
    } while (i < data.length);
    return enc;
}

function openHtmlDialog(html) {
    $('.closer-auth').trigger('click');
    $('.clearRightBlock,.clearLeftBlock').hide();
    var topScroll = $('body').scrollTop() || $('html').scrollTop();
    $('.js-auth-box').css({'top': $('.header__background').offset().top - topScroll + parseInt($('.header__background').outerHeight())});
    $('body').css('overflow-y', 'hidden');
    if ($('.popup-bg.popup-bg_gray').length == 0) {
        $('<div class="popup-bg popup-bg_gray"></div>').appendTo('body');
    }
    $('.popup-bg.popup-bg_gray:first').fadeIn();
    if ($('.popup-content').length == 0) {
        $('<div class="popup-content"></div>').appendTo('body');
    }
    $('.popup-content').html(html);
    $('.popup-content >div:first').fadeIn();
}

function openElDialog(id) {
    $('.closer-auth').trigger('click');
    $('.clearRightBlock,.clearLeftBlock').hide();
    var topScroll = $('body').scrollTop() || $('html').scrollTop();
    $('body').css('overflow-y', 'hidden');
    if ($('.popup-bg.popup-bg_gray').length == 0) {
        $('<div class="popup-bg popup-bg_gray"></div>').appendTo('body');
    }
    $('.popup-bg.popup-bg_gray:first').fadeIn();
    $(id).show();
}

function openMsgDialog(msg) {
    $('.closer-auth').trigger('click');
    $('.clearRightBlock,.clearLeftBlock').hide();
    if (!msg.includes('</')) msg = '<h3>' + msg + '</h3>';
    var html = '<div class="popup-window feedback-thanks">' + msg + '<a href="javascript: void(0)" class="closer-auth js-closer-auth"></a></div>';
    openHtmlDialog(html);
}

function authenticate(form) {
    $.ajax({
        url: form.action,
        data: $(form).serialize(),
        type: form.method,
        dataType: "html",
        success: function (resp) {

            var rArr = resp.split("\n\n", 2);
            if (rArr[0] == "OK!") {
                window.location.assign(rArr[1]);
            } else {
                if ($('.popup-content').is(':visible')) {
                    $('.popup-content').html(resp);
                    $('.popup-content >div:first').show();
                }
                if ($('.popup_login').is(':visible')) {
                    $('.auth-box').html(resp);
                }
            }
        }
    });
    return false;
}

function goToByScroll(id, offset) {
    if (typeof offset == 'undefined') offset = 0;
    $('html,body').animate({scrollTop: $(id).offset().top - offset}, 'slow');
}

function reviewLikeAjax(item) {
    item = $(item);
    item.parent().find("span").unbind("click").click(function (e) {
        e.preventDefault()
    });
    $.ajax({
        url: item.data("href"), type: "get", dataType: "json", success: function (data) {
            if (typeof data.r != 'undefined') {
                item.html(data.r);
            } else if (typeof data.dialog != 'undefined') {
                openHtmlDialog(data.dialog);
            }
        }
    })
}