var number = 0;
var num;
var text;
$(document).ready(function () {
    var yourRating = $('.js-your-rating');
    yourRating.hide();
    var yourRatingInput = yourRating.find('.your-rating__item');
    yourRatingInput.focus(function () {
        $(this).trigger('blur');
    });
    var ratingBlockItem = $('.js-rating-stars .rating-stars__item');
    ratingBlockItem.hover(function () {
        var elements = $(this).parent().children();
        thisIndex = $(this).index();
        var elements = $(this).parent().children();
        for (var i = 0; i < elements.length; i++) {
            elements.removeClass('rating-stars__item_bad').removeClass('rating-stars__item_neutral').removeClass('rating-stars__item_good');
        }
        switch (thisIndex) {
            case 0:
            case 1:
                for (var i = 0; i < thisIndex + 1; i++) {
                    elements.eq(i).addClass('rating-stars__item_bad');
                }
                break
            case 2:
                for (var i = 0; i < thisIndex + 1; i++) {
                    elements.eq(i).addClass('rating-stars__item_neutral');
                }
                break
            case 3:
            case 4:
                for (var i = 0; i < thisIndex + 1; i++) {
                    elements.eq(i).addClass('rating-stars__item_good');
                }
                break
        }
    }, function () {
        var elements = $(this).parent().children();
        if (!$(this).parent().hasClass('rating-stars__rated')) {
            for (var i = 0; i < elements.length; i++) {
                elements.removeClass('rating-stars__item_bad').removeClass('rating-stars__item_neutral').removeClass('rating-stars__item_good');
            }
        }
        var thisMarkIndex = $(this).parent().find('.your-rating__item_mark').index();
        if (thisMarkIndex != -1) {
            switch (thisMarkIndex) {
                case 0:
                case 1:
                    elements.removeClass('rating-stars__item_bad').removeClass('rating-stars__item_neutral').removeClass('rating-stars__item_good');
                    for (var i = 0; i < thisMarkIndex + 1; i++) {
                        elements.eq(i).addClass('rating-stars__item_bad');
                    }
                    break
                case 2:
                    elements.removeClass('rating-stars__item_bad').removeClass('rating-stars__item_neutral').removeClass('rating-stars__item_good');
                    for (var i = 0; i < thisMarkIndex + 1; i++) {
                        elements.eq(i).addClass('rating-stars__item_neutral');
                    }
                    break
                case 3:
                case 4:
                    elements.removeClass('rating-stars__item_bad').removeClass('rating-stars__item_neutral').removeClass('rating-stars__item_good');
                    for (var i = 0; i < thisMarkIndex + 1; i++) {
                        elements.eq(i).addClass('rating-stars__item_good');
                    }
                    break
            }
        }
    });
    ratingBlockItem.on('click', function () {
        var elements = $(this).parent().children();
        thisIndex = $(this).index();
        var yourRatingBlock = $(this).parent().next('.js-your-rating');
        yourRatingBlock.fadeIn();
        yourRatingBlock.find('.your-rating__item').val(thisIndex + 1);
        $(this).addClass('your-rating__item_mark').siblings().removeClass('your-rating__item_mark');
        $(this).parent().addClass('rating-stars__rated');
        $(this).trigger('userClickStar');
    });
    $('#add-review-form').find('[type="submit"]').addClass('button_not-active');
    $('#add-review-form').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        if (checkForm(true)) {
            form.find('[type="submit"]').attr('disabled', true);
            $.ajax({
                url: form.attr("action") + '?id=' + form.data('id'),
                data: form.serialize(),
                type: form.attr("method"),
                dataType: "json",
                success: function (data) {
                    form.find('[type="submit"]').attr('disabled', false);
                    if (data.r) {
                        $("#reviewsList").prepend($(data.r));
                        if (data.dialog) {
                            openHtmlDialog(data.dialog);
                        }
                    } else if (data.messages) {
                        openMsgDialog(data.messages.join(', '));
                        return;
                    } else if (data.dialog) {
                        setTimeout(function () {
                            openHtmlDialog(data.dialog);
                        }, 150);
                        return;
                    }
                    if (typeof  stretchContent == 'function') {//for brokers
                        stretchContent();
                    }
                    $('.talpari__addcomments').hide();
                }
            });
        }
    });

    $('#add-review-form .stars span').on('click', function (e) {
        checkForm();
        var rating = $(this).data('rating');
        var ratingFld = $('#add-review-form input[name="rating"]');
        ratingFld.val(rating);
        checkForm();
    });

    $('#add-review-form').find('textarea').keyup(function () {
        checkForm();
    });

    //
    text = $('.rate-number span').text();
    $('.talpari__addcomments span').hover(function () {
        num = 0;
        $('.talpari__addcomments span').addClass('disable');
        $(this).prevAll().add($(this)).addClass('active2');
        $('.talpari__addcomments span').each(function () {
            if ($(this).hasClass('active2')) {
                num++;
            }
        });
        $('.rate-number span').text(num);
    }, function () {
        $('.talpari__addcomments span').removeClass('disable');
        $('.talpari__addcomments span').removeClass('active2');
        $('.rate-number span').text(number);
    });
    $('.talpari__addcomments span').on('click', function () {
        number = 0;
        $('.talpari__addcomments span').removeClass('active');
        $(this).prevAll().add($(this)).addClass('active');
        $('.talpari__addcomments span').each(function () {
            if ($(this).hasClass('active')) {
                number++;
            }
        });
        $('.rate-number span').text(number);
        return number;
    });
});
var checkForm = function (bMessages) {//проверка формы
    var bMessages = bMessages || false,
        inputReady = true;

    $('#add-review-form').find('textarea, [name="rating"]').each(function () {//заполнены ли инпуты
        if ($(this).val().trim() == '' || $(this).val() == 0) {
            inputReady = false;
            if(bMessages) {
                $(this).parent().find('.error-input-rating').show();
            }
        } else {
            $(this).parent().find('.error-input-rating').hide();
        }
    });

    if (!inputReady) {//если что то не заполнено
        $('#add-review-form').find('[type="submit"]').addClass('button_not-active');
        return false;//то не даем форме отправить данные
    }
    $('#add-review-form').find('[type="submit"]').removeClass('button_not-active');
    return true;//позволяем форме отправить данные
};