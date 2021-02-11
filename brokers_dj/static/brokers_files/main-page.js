(function () {

    $(function () {

        /* SLIDERS ON MAIN-PAGE*/

        $('.analytic__slider, .news__slider').slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 601,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });

        /* SLIDER IN HEADER*/

        $(function () {
            var $carousel = $('.over-header__pairs').flickity({
                // options
                cellAlign: 'left',
                contain: true,
                cellSelector: ".over-header__pair",
                freeScroll: true,
                pageDots: false,
                prevNextButtons: false,
                groupCells: '100%'
            });

            $(document).on('click', '.over-header .prev-arrow', function () {
                $carousel.flickity('previous')
            });

            $(document).on('click', '.over-header .next-arrow', function () {
                $carousel.flickity('next')
            });
        });
        /* HOVER EFFECT FOR .CATEGORY-ITEM */

        $('.category__item a').hover(function () {
                $(this).parent().addClass('hover');
            },
            function () {
                $(this).parent().removeClass('hover');
            });

        /* HOVER THEAD FOR SELECT TABLE COLUMN */

        $('.monitoring__table .table-head-second td').hover(function () {

                var tdId = $(this).attr('data-id');

                $(this).closest('table').find('tbody td[data-id=' + tdId + ']').addClass('down');

            },
            function () {
                var tdId = $(this).attr('data-id');
                $(this).closest('table').find('tbody td[data-id=' + tdId + ']').removeClass('down');
            });

        /* HOVER FIRST-CHILD FOR SELECT TABLE ROW */

        $('.monitoring__table tbody td:first-child').hover(function () {

                $(this).closest('tr').find('td').addClass('down');
            },
            function () {
                $(this).closest('tr').find('td').removeClass('down');
            });

        /* SLIDE INNER LIST FOR .SELECT */

        $(document).on('click', '.monitoring__table .select', function () {
            if ($(this).find('.select__inner').css('display') === 'none') {
                $(this).find('.select__inner').show();
            } else {
                $(this).find('.select__inner').hide();
            }
        });

        /* CLOSE DROP LIST IF CLICK OUT OF LIST */
        $(document).mouseup(function (e) {
            var div = $(".monitoring .select");
            if (!div.is(e.target) //
                && div.has(e.target).length === 0) {
                $(".monitoring .select__inner").hide();
            }
        });

        /* SELECT VALUE FOR .SELECT */

        $(document).on('click', '.monitoring__table .select-inner__item', function (e) {
            e.stopPropagation();
            var selectItemValue = $(this).attr('data-value');
            var selectItemId = $(this).attr('data-id');

            $(this).closest('.select').find('.select__inner').hide();
            $(this).closest('.select').attr('data-id', selectItemId);
            $(this).closest('.select').find('span').html(selectItemValue);

            updateInfo('spreads', false);
            updateInfo('rates', false);
            $('.monitoring__table [data-pid]').each(function(){
                var pid = $(this).data('pid');
                if (typeof swaps[pid] != 'undefined' && typeof swaps[pid][selectItemId] != 'undefined'){
                    $(this).find('.long').html(swaps[pid][selectItemId]['l']);
                    $(this).find('.short').html(swaps[pid][selectItemId]['s']);
                } else {
                    $(this).find('.long').html('N/A');
                    $(this).find('.short').html('N/A');
                }
            });
            $('.monitoring__table table').trigger('update');
        });


        /* TABS FOК .PROMO */

        $(document).on('mouseover', '.promo__tab-item a', function (e) {

            var tabId = $(this).parent().attr('data-tab');

            e.preventDefault();

            $(this).closest('.promo__right-part').find('.active').removeClass('active');
            $(this).parent().addClass('active');
            $(this).closest('.promo__right-part').find('.promo__tab-content-block[data-tab=' + tabId + ']').addClass('active');
        });


        /* TABS FOR .FIND-BROKER */

        $(document).on('mouseover', '.find-broker__tabs a', function (e) {

            var tabId = $(this).parent().attr('data-tab');

            e.preventDefault();

            $(this).closest('.find-broker').find('.active').removeClass('active');
            $(this).parent().addClass('active');
            $(this).closest('.find-broker').find('.find-broker__tab-content-block[data-tab=' + tabId + ']').addClass('active');
        });

        startTime();
        $(document).click(function (e) {
            if ($('.drop-item:visible').length >0) {
                $('.drop-item').fadeOut();

            }
        });
        $(document).on('click', '.js-btn-open-payments', function () {
            var current = $('.drop-item').is(':visible');
            $('.drop-item:visible').fadeOut(0);
            if(current) return;
            $(this).parent().find('.drop-item').fadeToggle(0);
            return false;
        });

        $(document).on('click', '.risk_warning', function (e) {
            $(this).toggleClass("active");
        });


    });
})();
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getUTCHours();
    var m = today.getUTCMinutes();
    // add a zero in front of numbers<10
    h = checkTime(h);
    m = checkTime(m);
    $('#header-time').html("GMT " + h + ":" + m);
    t = setTimeout(function () {
        startTime()
    }, 2000);
}