try{Typekit.load();}catch(e){};/**/
var sgxdata = {};
(function ($) {
  Drupal.behaviors.common = {
    attach: function (context, settings) {
      var current_url = window.location.pathname;
      var login_info = '<div class="login-info"><ul>' +
        '<li class="header-home-group subscribe-link app_sorce"><a href="https://subscribe.sph.com.sg/publications-bt/?utm_campaign=bt_subscription&utm_medium=sph-publication&utm_source=bt&utm_content=subscribelink-header" target="_blank">Subscribe</a></li>' +
        '<li class="header-home-group login-link"><a href="javascript:;" abvariant="BT-DEFAULT-HEADER" class="mysph_login mysph-ga-event">Log in</a></li></ul></div>';

      var login_info_mobile = '<ul>' +
        '<li class="header-home-group subscribe-link app_sorce"><a href="https://subscribe.sph.com.sg/publications-bt/?utm_campaign=bt_subscription&utm_medium=sph-publication&utm_source=bt&utm_content=subscribelink-header" target="_blank">Subscribe</a></li>' +
        '<li class="header-home-group login-link"><a href="javascript:;" abvariant="BT-DEFAULT-HEADER" class="mysph_login mysph-ga-event">Log in</a></li></ul>';

      // Do ajax for login details
      $.ajax({
        type: "POST",
        url: "/ldap/details",
        dataType: "json",
        cache: true,
        success: function (data) {
          if (data.loginid) {
            var unverified_bell = '';
            var unverified_menu = '';
            if (data.usertype == 'y-reg' && data.userstatus != 'verified') {
              unverified_bell = '<i class="fa fa-bell text-red"></i> ';
              unverified_menu = '<li><a href="javascript:;" class="mysph_verify_email text-red mysph-ga-verify" event-label="Dropdown Login Menu">Please verify your email</a></li>';
            }
            $("body").addClass("mysph-loggedin");
            login_info = '<div class="dropdown">' + unverified_bell + 'HI <a href="javascript:;" class="dropdown-toggle login_user_name"  data-toggle="dropdown"><span id="sph_user_name">' + data.loginid + '</span><i class="caret-icon fa fa-caret-down un"></i></a><ul class="dropdown-menu"><i class="fa fa-caret-up dw"></i>' + unverified_menu + '<li><a class="mysph_user_name"  href="javascript:;">Update your password</a></li><li><a class="mysph_logout" href="javascript:;">Logout</a></li></ul></div>';
            login_info_mobile = unverified_bell + 'HI <a class="login_user_name" data-toggle="collapse" href="#collapseLogin" aria-expanded="false" aria-controls="collapseLogin"><span id="sph_user_name">' + data.loginid + '</span><i class="caret-icon fa fa-caret-down un"></i></a><div class="collapse" id="collapseLogin"><ul>' + unverified_menu + '<li style="padding-bottom: 15px; border-right: 0px;"><a class="mysph_user_name"  href="javascript:;">Update your password</a></li><li><a class="mysph_logout" href="javascript:;">Logout</a></li></ul></div>';

            if (data.usertype == 'y-reg' && data.userstatus != 'verified') {
              $("#paywall-resent-email").removeClass('hidden');
              $(".cxense_wall").hide();

              // Show the unverified email banner on top of the site
              $(".mysph-unverified").removeClass("hidden");
              $(".mysph-unverified .unverifiedemail").html(data.loginid);
            }
          } else {
            trySingleSignOnLogin();
          }
          $(".login-info-desktop").html(login_info);
          $(".mobile-login .login-info").html(login_info_mobile);
        },
        error: function (error) {
          $(".login-info").html(login_info);
        }
      });

      $(document).on('click', '.mysph-ga-event', function () {
        var ab_variant = $(this).attr('abvariant');
        var label = $(this).text();
        customGAEvent('Signup User Account', 'click', label, ab_variant);
      });

      $(document).on('click', '.mysph-ga-verify', function () {
        var label = $(this).attr('event-label');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'custom_event',
          'eventCategory': 'Email Verification',
          'eventAction': 'resend',
          'eventLabel': label
        });
      })

      function customGAEvent(category, action, label, ab_variant) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'custom_event',
          'eventCategory': category,
          'eventAction': action,
          'eventLabel': label,
          'abVariant': ab_variant,
        });
      }

      $(".login_user_name").click(function () {
        $(".caret-icon").toggleClass('fa-caret-up fa-caret-down');
      });
    }
  };
  /* Main navigation */
  Drupal.behaviors.menu = {
    attach: function (context, settings) {
      if (context == document) {
        $('#lifestyle-menu').click(function (e) { //kill the dropdown
          if (!$('.navbar-header').hasClass('menu-on') || !$('body').hasClass('lifestyle')) {
            e.stopPropagation();
          }
        });

        //initiate burger menu
        $(".navbar-toggle").click(function () {
          var $popupButton = $('.navbar-header,.navbar-collapse');
          if ($popupButton.hasClass("menu-on")) {
            $popupButton.removeClass("menu-on");
            $('body > .backdrop-tab').remove();
          } else {
            $popupButton.addClass("menu-on");
            $(".weekly-menu .dropdown-toggle").closest('ul').removeClass('expand');
            //check default
            if (!$('body').hasClass('lifestyle')) { //not lifestyle page
              $('.navbar-collapse.menu-on .all-news-menu').addClass('default');
              $('.navbar-collapse.menu-on').addClass('all-news').removeClass('expand');
            } else {
              $('.navbar-collapse.menu-on .lifestyle-menu').addClass('default');
              $('.navbar-collapse.menu-on').addClass('lifestyle').removeClass('expand');
            }
            $('body > .backdrop-tab').remove();
            this.$backdrop = $('<div class="modal-backdrop backdrop-tab" />')
              .appendTo(document.body).on("click", function () {
                $popupButton.removeClass("menu-on");
                $('.navbar-collapse').removeClass('all-news lifestyle');
                $(this).remove();
              });
          }
        });

        $(".weekly-menu .dropdown-toggle").click(function (e) {
          $(this).closest('li').toggleClass('open'); //show dropdown
          $(this).closest('ul').toggleClass('expand'); //show dropdown
          $(this).closest('.navbar-collapse').toggleClass('expand'); //show dropdown
          e.preventDefault();
          e.stopPropagation(); //stops from hiding menu
        });

        $(".all-news-menu").click(function () {
          $('.navbar-collapse.menu-on').removeClass('all-news lifestyle expand weekly');
          $(".weekly-menu").removeClass('open');
          $(".weekly-menu .dropdown-toggle").closest('ul').removeClass('expand');
        });

        $('#all-news, #lifestyle, #focus').on('click', function (e) { //need to add additional IDs for any dropdown

          if (!$('.navbar-collapse').hasClass('menu-on')) {
            var li5 = $(".all-news-menu > ul > li");
            for (var i = 0; i < li5.length; i += 5) {
              li5.slice(i, i + 5).wrapAll("<div class='sub-allnews'></div>");
            }
            var li4 = $(".weekly-menu > ul > li");
            for (var i = 0; i < li4.length; i += 5) {
              li4.slice(i, i + 5).wrapAll("<div class='sub-allnews'></div>");
            }
          }
          //$('#all-news').removeClass("weekly-open");
          $('.navbar-collapse.menu-on .all-news-menu, .navbar-collapse.menu-on .lifestyle-menu').removeClass('default');
          var id = $(this).attr('id');
          if ($(this).hasClass("open") && $(this).hasClass("dropdown") && $('.container-top .navbar-collapse').hasClass("menu-on")) {
            //$('.navbar-collapse.menu-on').addClass(id);
            if ($('.weekly-menu').hasClass('open')) {
              $('.navbar-collapse.menu-on').addClass('expand');
            }
          } else {
            $('.navbar-collapse.menu-on').removeClass('all-news lifestyle');
            $('.navbar-collapse.menu-on').toggleClass(id);
          }
        });

        //$( window ).resize(function() {
        //close modal and hanburger menu - optional
        //var width = $('body').width();
        //if (width >= 768){
        //  $('.navbar-collapse').attr('navbar-collapse collapse');
        //}
        //});
        var li6 = $("#block-menu-menu-footer-news > ul > li");
        for (var i = 0; i < li6.length; i += 6) {
          li6.slice(i, i + 6).wrapAll("<div class='sub-allnews'></div>");
        }

        $('.top-menu a, #MainMenu a').each(function () {
          console.log(jQuery(this).attr('href'));
          if ($(this).attr('href') != undefined && $(this).attr('href') != '#') {
            $(this).attr('target', '_blank');
          }
        });

      }
    }
  };
  Drupal.behaviors.search = {
    attach: function (context, settings) {
      if (context == document) {
        // Initialize hamburger and search menu pop-up
        $("#mainnav-popup-search-button").on("click", function () {
          var $popupButton = $(this);
          var $right = $('.header-section-right');
          var $mainnavPopupContainer = $($(this).attr("data-target"));
          if ($mainnavPopupContainer.hasClass("open")) {
            $mainnavPopupContainer.removeClass("open");
            $popupButton.removeClass("active");
            $right.removeClass("menu-on");
            $('body > .backdrop-tab').remove();
          } else {
            $(".dropdown-bt-hamburger.open").removeClass("open");
            $mainnavPopupContainer.addClass("open");
            $popupButton.addClass("active");
            $right.addClass("menu-on");
            $('body > .backdrop-tab').remove();
            this.$backdrop = $('<div class="modal-backdrop backdrop-tab" />')
              .appendTo(document.body).on("click", function () {
                $mainnavPopupContainer.removeClass("open");
                $popupButton.removeClass("active");
                $right.removeClass("menu-on");
                $(this).remove();
              });
          }
        });
      }
    }
  };
  /* Twitter Live Feed & Most Read. */
  Drupal.behaviors.twitterLiveFeed = {
    attach: function (context, settings) {
      if (context == document) {
        // If tabs already exist, do not generate again, as function might be called more than once from other ajax calls.
        if ($('.tab-content').length <= 0) {
          // If there is at least one block requiring tabbing, setup tabs.
          if ($('.tab-pane').length > 0) {
            // For setting up tabs for blocks.
            $('.tab-pane').wrapAll('<div class="tab-content" />');
            $('.tab-content').before('<div class="nav-tabs-menu"><ul class="nav nav-tabs" role="tablist" />');
            $('div.nav-tabs-menu').next('.tab-content').andSelf().wrapAll('<div class="sidebar-tabs visible-lg" />');

            // Dynamically obtain the block's id and h2 title.
            $('.tab-pane').each(function () {
              if ($(this).is(':first-child')) {
                $('div.nav-tabs-menu ul.nav-tabs').append('<li class="active"><a href="#' + $(this).attr('id') + '" role="tab" data-toggle="tab">' + $(this).find('h2:first').text() + '</a></li>');
              } else {
                $('div.nav-tabs-menu ul.nav-tabs').append('<li><a href="#' + $(this).attr('id') + '" role="tab" data-toggle="tab">' + $(this).find('h2:first').text() + '</a></li>');
              }

              $(this).find('h2:first').hide();
            });
          }

          // Display only after all HTML wrappers are generated.
          if ($('#mini-panel-breaking_headlines').length > 0) {
            // Article page.
            $('#mini-panel-breaking_headlines').css('visibility', 'visible');
          } else if ($('#mini-panel-breaking_headlines_lifestyle_').length > 0) {
            // Lifestyle article page.
            $('#mini-panel-breaking_headlines_lifestyle_').css('visibility', 'visible');
          }
        }
      }
    }
  };

  /*
   * Google Publisher Tag's IMU.
   */
  Drupal.behaviors.gptImu = {
    attach: function (context, settings) {
      // In admin portal, panels cause blocks to be executed twice, thus creating two 'ins' containers.
      // The first one will be empty. We retain only the second one.
      if ($('body').hasClass('logged-in')) {
        $('#bt_home_imu_ad_container').find('ins:first').remove();

        // Hide the placeholder for the IMU.
        $('.empty-content-imu').hide();
      }
    }
  };

  /*
   * Search box.
   */
  Drupal.behaviors.searchBox = {
    attach: function (context, settings) {
      // Auto-hide placeholder in search box upon focus (desktop version).
      // $('.navbar-bt-search input').data('holder', $('.navbar-bt-search input').attr('placeholder'));
      // $('.navbar-bt-search input').focusin(function() { $(this).attr('placeholder', ''); });
      // $('.navbar-bt-search input').focusout(function() { $(this).attr('placeholder', $(this).data('holder')); });

      // // Auto-hide placeholder in search box upon focus (mobile version).
      // $('.navbar-bt-search-mobile input').data('holder', $('.navbar-bt-search input').attr('placeholder'));
      // $('.navbar-bt-search-mobile input').focusin(function() { $(this).attr('placeholder', ''); });
      // $('.navbar-bt-search-mobile input').focusout(function() { $(this).attr('placeholder', $(this).data('holder')); });

      var $searchbutton = $(".search-btn");
      var $searchclose = $(".search-close");
      var $searchbox = $("#searchbox");
      var $searchwrap = $(".search-wrap");
      var $searchform = $searchbox.find("form");

      $searchbutton.add($searchclose).once("btn", function () {
        $(this).on("click", function () {
          $searchwrap.children().toggleClass("hidden");
          $searchbox.slideToggle("fast").toggleClass("active");
          $(this).closest(".search-form").toggleClass("active");
        });
      });

      $searchform.submit(function () {
        var searchTerm = encodeURIComponent($(this).find("#search-term").val());
        //if( searchTerm ) location.href = '/search/' + searchTerm + '?page=1&filter=headline_en%2Cbody_en%2Cauthor.name';
        //Removing body_en and author.name as during initial page load only headline needs to be checked.
        if (searchTerm) location.href = '/search/' + searchTerm + '?page=1&filter=headline_en';
        return false;
      });

      /* Lifestyle */
      // Auto-hide placeholder in search box upon focus (mobile version).
      $('.search-form input').data('holder', $('.search-form input').attr('placeholder'));
      $('.search-form input').focusin(function () { $(this).attr('placeholder', ''); });
      $('.search-form input').focusout(function () { $(this).attr('placeholder', $(this).data('holder')); });

      $('.search-form').submit(function () {
        if ($(this).find('#keyword-search').val()) {
          location.href = '/search/' + encodeURIComponent($(this).find('#keyword-search').val()) + '?page=1&filter=headline_en%2Cbody_en%2Cauthor.name';
          return false;
        } else {
          return false;
        }
      });
    }
  };

  /*
   * Back-To-Top Button.
   */
  Drupal.behaviors.backToTop = {
    attach: function (context, settings) {
      if (context == document) {
        $('.back-to-top').on('click', function () {
          $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
      }
    }
  };

  /* Corporate Earnings and Market Cap table functions */
  Drupal.behaviors.dataTables = {
    attach: function (context, settings) {
      if ($('.datatables .tablefield').length > 0) {
        if ($('.datatables .tablefield').hasClass('table-responsive') == false) { //make sure datatables is initialised only once
          $('.datatables .tablefield').addClass('table-condensed table-responsive');
          $('.datatables .tablefield').dataTable({
            "lengthMenu": [
              [10, 25, 50, -1],
              [10, 25, 50, "All"]
            ],
            dom: 'C<"clear">lfrtip'
          });
        }
      }
    }
  };

  /* Homepage stocks ticker */
  Drupal.behaviors.stocksticker = {
    attach: function (context, settings) {
      $(".stocks-ticker").load('/sites/all/themes/custom/businesstimes/stocks_ticker.php?', function () {
        $(".stocks-ticker").marquee({
          speed: 10000,
          gap: 2,
          delayBeforeStart: 2,
          direction: 'left',
          duplicated: false,
          pauseOnHover: true
        });
      });
    }
  };

  /*
   * Blog Listing - ShareThis Social Media Widgets.
   */
  Drupal.behaviors.shareThisWidget = {
    attach: function (context, settings) {
      if (context == document) {
        // Generate the ShareThis links and modal.
        if ($('body').hasClass('blog')) {
          $('.sharethis-wrapper').each(function (i) {
            sharethis = '<div class="story-share-item"><a href="#" data-toggle="modal" data-target="#modal-share-' + i + '">Share</a></div>';

            $(this).after('<div class="story-share">' + sharethis + '</div>');
            $(this).after(
              '<div id="modal-share-' + i + '" class="modal fade modal-bt">' +
              '<div class="modal-dialog">' +
              '<div class="modal-content">' +
              '<div class="modal-body">' +
              '<div data-dismiss="modal" class="modal-close fa fa-times"></div>' +
              '<div class="text-title">Share</div>' +
              '<div class="text-headline">' + $(this).parent().parent().siblings().find('.headline a:last').html() + '</div>' +
              '<div class="story-share-panel">' + $(this)[0].outerHTML + '</div>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>'
            );
          });
        }
      }
    }
  };

  /*
   * Today's Paper Page - JUMP TO Menu.
   */
  Drupal.behaviors.jumpToMenu = {
    attach: function (context, settings) {
      if (context == document) {
        var textArr = [];
        $('.views-limit-grouping-group h3 a').each(function () {
          var categoryTxt = $(this).text();
          $(this).attr("name", categoryTxt);
          var txt = "<a href='#" + categoryTxt + "'>" + categoryTxt + "</a>";
          textArr.push(txt);
        });

        if ($('.jumptomenu').length > 0) {

          if (textArr != null && textArr.length !== 0) {
            $(".jumptomenu").html("<h4>JUMP TO:</h4>");
          }
          $(".jumptomenu").append(textArr.join(''));

          $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
              $('.jumptomenu').fadeIn();
            } else {
              $('.jumptomenu').fadeOut();
            }
            if (($(this).height() + $(this).scrollTop()) > ($('.row-fluid-main').offset().top + $('.row-fluid-main').height())) {
              //console.log(' bottom reached! ');
              $('.jumptomenu').css({ "position": "absolute", "bottom": "initial", "width": "100%" });
            } else {
              $('.jumptomenu').css({ "position": "fixed", "bottom": "0" });
            }
          });
        }
      }
    }
  };

  /*
   * Miscellaneous scripts here
   */
  Drupal.behaviors.misc = {
    attach: function (context, settings) {
      /* Content swapping */
      $.fn.swapWith = function (to) {
        return this.each(function () {
          var copy_to = $(to).clone(true);
          var copy_from = $(this).clone(true);
          $(to).replaceWith(copy_from);
          $(this).replaceWith(copy_to);
        });
      };
      setInterval(function () {
        if ($('.front .navbar-header').css('display') == 'block' || $('.front .site-title').css('height') == '39px') {
          if ($('.businesstimes-flipped-sidebar .editors-choice').length > 0) {
            $('.empty-content-seven-days-archive').swapWith($('.seven-days-archive')); //put the 7 days archive in main content
            $('.empty-content-e-paper').swapWith($('.e-paper'));
            $('.empty-content-breaking-news').swapWith($('.breaking-news-sidebar'));
            $('.empty-content-editors-choice').swapWith($('.editors-choice')); //put the editor's choice in main content
          }
        } else {
          if ($('.businesstimes-flipped-content .editors-choice').length > 0) {
            $('.empty-content-seven-days-archive').swapWith($('.seven-days-archive')); //put the 7 days archive back to sidebar
            $('.empty-content-e-paper').swapWith($('.e-paper'));
            $('.empty-content-breaking-news').swapWith($('.breaking-news-sidebar'));
            $('.empty-content-editors-choice').swapWith($('.editors-choice')); //put the editor's back to sidebar
          }
        }

        //for stocks prices
        //desktop
        if ($('.page-taxonomy-term-36 .header-date').css('display') == 'block') {

          if ($('.stock-prices #iframeAdjust').hasClass('mobile')) {
            $('.stock-prices').html('<iframe id="iframeAdjust" class="desktop" src="http://www.btinvest.com.sg/markets/stock_prices/prices_frame.html" width="98%" height="1050" frameborder="0"></iframe>');
          }

          //mobile
        } else {

          if ($('.stock-prices #iframeAdjust').hasClass('desktop')) {
            $('.stock-prices').html('<iframe id="iframeAdjust" class="mobile" src="http://www.btinvest.com.sg/markets/stock_prices/prices_frame?per_page=10" width="98%" height="550" frameborder="0"></iframe>');
          }

        }

        //for brandinsider - homepage
        if (!jQuery.trim(jQuery('.bt-wide .brandinsider-imu').html()).length) {
          jQuery('.bt_brandinsider').addClass('col-lg-12').removeClass('col-lg-8');
          jQuery('.bt_brandinsider').addClass('col-lg-12').removeClass('col-md-8');
        }
        if (jQuery.trim(jQuery('.bt-wide #mini-panel-brand_insider_imu .panel-panel div').html()).length) {
          jQuery('.bt-wide #mini-panel-brand_insider_imu').addClass('mini-panel-brand_insider_imu')

        }

        //for bt editorial - homepage
        if (!jQuery.trim(jQuery('.bt-wide .bt-editorial-imu div div').html()).length) {
          jQuery('.bt-editorial').addClass('col-lg-12').removeClass('col-lg-8');
          jQuery('.bt-editorial').addClass('col-lg-12').removeClass('col-md-8');
          jQuery('.bt-editorial-imu-wrapper').css('display', 'none');
          jQuery('.bt-wide .bt-editorial .view-single-queue-story .field-name-field-scald-image img').css('width', '300px');
        }

      }, 500);
    }
  };

  /*
   * Newsletter sign-up form - BT Wide
   */
  Drupal.behaviors.signupform = {
    attach: function (context, settings) {
      if (context == document) {
        var j = jQuery.noConflict();
        j('#loading-image').hide();

        j('#loading-image').bind('ajaxStart', function () {
          j("#newsetter_msg").hide();
          j(this).show();
        }).bind('ajaxStop', function () {
          j(this).hide();
          j("#newsetter_msg").show();
        });

        j("#newsletter_submit_form").submit(function () {
          var email_address = j("#email").val();
          j.ajax({
            type: "POST",
            dataType: "text",
            url: "/newsletter/sign-up/article_sign_up_form.php",
            data: {
              email: email_address,
              morning: 1,
              evening: 1,
              garage: 1
            },
            success: function (data) {
              j("#newsetter_msg").html(data);
              j(".success_msg").removeClass("success_msg_bottom");
              j(".success_msg").addClass("success_msg_top");
              j("#email").val("");
            }
          });

          return false;
        });
      }
    }
  };

  /*
   * Newsletter sign-up form - Footer
   */
  Drupal.behaviors.signupformFooter = {
    attach: function (context, settings) {
      if (context == document) {
        $("#newsletter_submit_form_2").submit(function () {
          var email_address = $("#email_footer").val();
          var $form = $(this);

          $("#newsletter_submit").html("<i class=\"fa fa-spinner fa-pulse fa-fw\"></i>");
          $.ajax({
            type: "POST",
            dataType: "text",
            url: "/newsletter/sign-up/article_sign_up_form.php",
            data: {
              email: email_address,
              morning: 1,
              evening: 1,
              garage: 1,
              lifestyle: 1,
              asean: 1,
            },
            success: function (data) {
              var color = (data.indexOf("success_msg") != -1) ? "success" : "error";
              $form.find(".message").replaceWith("<div class=\"message " + color + "\">" + data + "</div>");
              if (color == "success") $("#email_footer").val("");
              $("#newsletter_submit").html("SIGN UP");
            }
          });

          return false;
        });
      }
    }
  };



  /*
   * Detect mobile device - BT Wide Footer
   */
  Drupal.behaviors.mobiledetect = {
    attach: function (context, settings) {
      if (context == document) {
        var j = jQuery.noConflict();
        var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
        if (isiPad) {
          j(".app-store .iphone-link").css("display", "none");
          j(".app-store .ipad-link").css("display", "block");
        } else {
          j(".app-store .iphone-link").css("display", "block");
          j(".app-store .ipad-link").css("display", "none");
        }
      }
    }
  };

  /**
   * Lifestyle homepage reviews carousel
   */
  Drupal.behaviors.lifestyleCarousel = {
    attach: function (context, settings) {

      if ($.isFunction($.fn.owlCarousel)) {
        $(".lifestyle-carousel .view-content").owlCarousel({
          items: 3,
          itemsDesktop: [1199, 4], //3 items between 1000px and 901px
          itemsDesktopSmall: [979, 3], // betweem 991px and 601px
          itemsTablet: [768, 2], //2 items between 600 and 0
          itemsMobile: [478, 1],
          //Autoplay
          autoPlay: false,
          stopOnHover: false,
          // Navigation
          navigation: true,
          navigationText: ["", ""],
          rewindNav: true,
          scrollPerPage: true,

          //Pagination
          pagination: false,
          paginationNumbers: false,

          // Responsive
          responsive: true,
          responsiveRefreshRate: 200,
          responsiveBaseWidth: window,
          afterInit: function (elem) {
            var that = this
            that.owlControls.prependTo(elem)
          }
        });
        // Custom Navigation Events
        $(".next").click(function () {
          owl.trigger('owl.next');
        })
        $(".prev").click(function () {
          owl.trigger('owl.prev');
        })
      }
    }
  };

  /*
   * new header
   */
  Drupal.behaviors.newmenu = {
    attach: function (context, settings) {
      if (context == document) {

        $('.hamburger-btn').click(function (event) {
          event.preventDefault();
          itemId = ''; //remove value

          //show default open menu
          if ($('.new-nav-bar').hasClass('lifestyle')) {
            $('#menu2').addClass('in').removeAttr('style');
            $('[href=#menu2]').removeClass('collapsed');
          } else {
            $('#menu1').addClass('in').removeAttr('style');
            $('[href=#menu1]').removeClass('collapsed');
          }

          $(this).toggleClass('active');
          $('#menu').toggleClass('hidden show');
          //call custom function
          checkSize();
          $(window).resize(checkSize);
        });

        $('.menu-links, #menu').mouseenter(function (event) {
          event.preventDefault();
          $('#menu').attr('class', 'show');
          if ($(this).is('.menu-links')) {
            $('.hamburger-btn').removeClass('active'); //kill the active button if there is any
            $(this).addClass('active');
            itemId = '#' + $(this).attr('id');
            console.log(itemId);
          } else {
            $(itemId).addClass('active');
          }

          showMenuItem(itemId);
        });
        $('.menu-links, #menu').mouseleave(function (event) {
          event.preventDefault();
          if (!$('.hamburger-btn').hasClass('active')) {
            $('#menu').attr('class', 'hidden');
            $('.menu-links').removeClass('active')
          }
          $('.main-list, .panel-main-2, .panel-news, .panel-weekly, [href=#SubMenu1], [href=#SubMenu2] ').removeClass('hidden');
          //$('#menu').removeClass('all-gray');
          //removed style attribute added by accordion
          $('#SubMenu1, #SubMenu2').removeAttr('style');
        });

        var checkSize = function () {
          if ($(".top-menu ul").css("display") === "flex") {
            //display desktop and tablet
            $('#menu1, #menu2, #SubMenu1, #SubMenu2').removeClass('collapse');
          } else {
            //display mobile
            $('#SubMenu1, #SubMenu2').addClass('collapse');

            //news
            $('#menu2').addClass('collapse');

            //lifestyle
            $('#menu1').addClass('collapse');
          }
        }

        var showMenuItem = function (itemId) {
          switch (itemId) {
            case '#item1':
              $('.main-list, .panel-main-2, .panel-weekly, [href=#SubMenu1], [href=#SubMenu2]').addClass('hidden');
              //$('#menu').addClass('all-gray');
              break;
            case '#item2':
              $('.main-list, .panel-main-2, .panel-news, [href=#SubMenu1], [href=#SubMenu2]').addClass('hidden');
              //$('#menu').addClass('all-gray');
              break;
          }
        }

        /****** SEARCH ******/
        // $('.search-btn').click(function (event) {
        //   event.preventDefault();
        //   $('.search-form-fields, .search-wrap').toggleClass('animate');
        // });
        // $('.search-wrap').mouseleave(function (event) {
        //   if ($('.search-form-fields, .search-wrap').hasClass('animate')) {
        //     $('.search-form-fields, .search-wrap').toggleClass('animate');
        //   }
        // });
      }
    }
  };

  /*
   * Lifestyle - Review Menu (Add active class)
   */
  Drupal.behaviors.activeMenu = {
    attach: function (context, settings) {
      if (context == document) {
        var j = jQuery.noConflict();
        var current = location.pathname;
        j('.review-menu li a').each(function () {
          var jthis = j(this);
          if (jthis.attr('href') === current) {
            jthis.addClass('active');
          }
        });
      }
    }
  };


  /*
   * Lifestyle - homepage picsize
   */
  Drupal.behaviors.homepageFeaturePic = {
    attach: function (context, settings) {
      if ($('.ls-top-story-featured .view-single-queue-story img').length > 0) {
        $(window).resize(function () {
          var winHeight = $(window).height();
          var picHeight = $('.ls-top-story-featured .view-single-queue-story img').height();
          var topHeight = (winHeight - picHeight) / 2;
          if (topHeight < 0) {
            $('.ls-top-story-featured .view-single-queue-story img').css('top', topHeight);
          }
        });
      }
    }
  };

  /*
   * Supplement
   */
  Drupal.behaviors.supplementAd = {
    attach: function (context, settings) {
      if (!$.trim($('.main_sponsor .views-row-1 , .main_sponsor1 a').html()).length) $('.main_sponsor , .main_sponsor1').css('display', 'none');
      if (!$.trim($('.sponsor_logos .views-row-1').html()).length) $('.sponsor_logos').css('display', 'none');
      if (!$.trim($('.sponsor-logos .views-row-1').html()).length) $('.sponsor-logos').css('display', 'none');
      if (!$.trim($('.supplement_pdf .views-row-1').html()).length) $('.supplement_pdf').css('display', 'none');
      if (!$.trim($('.supplement-pdf .views-row-1').html()).length) $('.supplement-pdf').css('display', 'none');
    }
  };


  /*
   * Stock widget
   */
  // Drupal.behaviors.stockwidget = {
  //   attach: function (context, settings) {
  //     $.browser.device = (/android|webos|iphone|ipadd|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
  //     if($.browser.device == true){
  //       $(".stock-prices #iframeAdjust").attr("src", "http://www.btinvest.com.sg/markets/stock_prices/prices_frame?per_page=10");
  //       $(".stock-prices #iframeAdjust").attr("height", "550");
  //     }else{
  //       $(".stock-prices #iframeAdjust").attr("src", "http://www.btinvest.com.sg/markets/stock_prices/prices_frame");
  //     }
  //   }
  // };

  /*
   * Pagination of recommended page
   */
  Drupal.behaviors.recommendedPagination = {
    attach: function (context, settings) {
      if (!!$.prototype.twbsPagination) {
        $('.recommended-list .media-object-contents .widget').slice(0, 20).addClass("active");
        $('.recommended-list .media-object-contents').twbsPagination({
          totalPages: 10,
          visiblePages: 0,
          paginationClass: "pager pager-show-more",
          nextClass: "pager-show-more-next",
          next: "LOAD MORE",
          prevClass: "hidden",
          lastClass: "hidden",
          firstClass: "hidden",
          pageClass: "hidden",
          initiateStartPageClick: false,
          onPageClick: function (event, page) {
            var $widgets = $(this).find(".widget");
            var item_per_page = 20;
            var end = page * item_per_page;
            var start = end - item_per_page;

            var wrapper_height = $(this).height();
            $widgets.slice(start, end).addClass("active");

            var position_top = $widgets.offset().top + wrapper_height - 50;
            $('html, body').animate({ scrollTop: position_top }, "slow");
          }
        });
      }
    }
  };

  /**
   * Make social icons on article page sticky
   */
  Drupal.behaviors.a2aSticky = {
    attach: function (context, settings) {
      $(window).bind("load", function () {
        var $anchor_bottom = $(".field-name-facebook-comment-box");
        var anchor_top = $("body").hasClass("lifestyle-revamp") ? $(this).height() + 500 : 700;

        if ($anchor_bottom.length) {
          var anchor_bottom = $(document).height() - $anchor_bottom.position().top - 100;
          $("#a2a_sticky").affix({
            offset: {
              top: anchor_top,
              bottom: anchor_bottom
            }
          });
        }
      });
    }
  };

  /**
   * Stick report pane-content on startup page
   */
  Drupal.behaviors.affixReport = {
    attach: function (context, settings) {
      $(window).bind("load", function () {
        var $affix = $(".affix-report");
        var $imu1 = $(".imu1");
        var $aside = $(".report-aside");

        var affix_top = $imu1.length ? $imu1.position().top + 550 : 900;
        var affix_bottom = $aside.length ? $aside.offset().top + 400 + $aside.outerWidth(true) : 1200;

        if ($affix.length) {
          $affix.affix({
            offset: {
              top: affix_top,
              bottom: affix_bottom
            }
          });
          $affix.on('affix.bs.affix', function () {
            $(this).css("width", $(this).outerWidth(true));
          });
        }
      });
    }
  }

  /**
   * Activating a view carousel
   */
  Drupal.behaviors.viewCarouselActivate = {
    attach: function (context, settings) {
      $(".v2").find(".widget__content").append($("<div>", { "class": "badge badge--color-blue" }).html("REPORT"));

      var $activator = $(".view-carousel-activate");
      var $carousel = $activator.find(".view-content");

      if ($carousel.length && $carousel.children(".media-object-contents").children().length != 1) {
        $activator.addClass("carouselled");

        $carousel.addClass("carousel slide").attr("id", "reports").children(".media-object-contents").addClass("carousel-inner").children(".node").addClass("item");
        $carousel.find(".media-object-contents > .node:first-child").addClass("active");

        var $prev = $("<a>", {
          "class": "left carousel-control",
          "href": "#reports",
          "role": "button",
          "data-slide": "prev"
        }).append($("<span>", {
          "class": "fa fa-chevron-left",
          "aria-hidden": "true"
        })).append($("<span>", { "class": "sr-only" }).html("Previous"));

        var $next = $("<a>", {
          "class": "right carousel-control",
          "href": "#reports",
          "role": "button",
          "data-slide": "next"
        }).append($("<span>", {
          "class": "fa fa-chevron-right",
          "aria-hidden": "true"
        })).append($("<span>", { "class": "sr-only" }).html("Next"));

        $carousel.append($prev).append($next);
        $(".view-content.carousel").carousel();
      }
    }
  };

  /**
   * BT Garage - disable first story image
   */
  Drupal.behaviors.disableReportsImageLink = {
    attach: function (context, settings) {
      $(".page-v1 .view-carousel-activate .widget__image a").addClass("btn disabled");
      $(".page-v2 .view-carousel-activate .widget__image a").addClass("btn disabled");
    }
  }

  /**
   * BT Garage - randomize default image
   */
  Drupal.behaviors.randomizeDefaultImage = {
    attach: function (context, settings) {
      $(".random-default-image .view .media-object-contents").children(".has-no-image").each(function () {
        var index = $(this).index();
        var mod = index % 4;

        $(this).attr("data-default-image", mod);
      });
    }
  }

  /**
   * Brandinsider to load the images to be background-images coz
   * brandinsider team can not provide 3:2 ratio images
   */
  Drupal.behaviors.businessInsiderImages = {
    attach: function (context, settings) {
      $(".widget > .widget__image[data-bi-image]").each(function () {
        var image = $(this).attr("data-bi-image");
        $(this).css("background-image", "url(" + image + ")");
      });
    }
  }

  /**
   * BT Homepage - asean/garage widget
   */
  Drupal.behaviors.toggleAseanGarageWidget = {
    attach: function (context, settings) {
      $(window).scroll(function () {
        var height = $(window).scrollTop();
        var init = $(".asean-garage-popup-wrapper").hasClass("init") ? true : false;

        if (showAseanGarage) {
          if (height > 100 && init) {
            $(".asean-garage-popup-wrapper").toggleClass("closed").removeClass("init");
          }
        }
      });

      $(".asean-garage-popup-wrapper .close-widget").once("clickHandler", function () {
        $(this).click(function () {
          $(".asean-garage-popup-wrapper").toggleClass("closed");
        });
      });
    }
  }

  /**
   * BT Garage Filter sticky
   */
  Drupal.behaviors.stickyGarageFilter = {
    attach: function (context, settings) {
      var $view = $(".view-display-id-panel_pane_32");
      var $affix = $view.find(".view-filters");
      var $anchor_bottom = $(".region-footertop");

      if ($affix.length > 0 && $anchor_bottom.length > 0) {
        var anchor_bottom = $(document).height() - $anchor_bottom.position().top - 100;
        $affix.affix({
          offset: {
            top: 500,
            bottom: anchor_bottom
          }
        }).on('affix.bs.affix', function () {
          $(this).css("width", $view.outerWidth(true));
        });
      }
    }
  }

  /**
   * BT Homepage - asean/garage widget click tracker
   */
  Drupal.behaviors.aseanGarageWidgetClickTracker = {
    attach: function (context, settings) {
      $("#asean-garage-widget-asean").once("click-tracker", function () {
        $(this).click(function () {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'custom_event',
            'eventCategory': "ASEAN/Garage Widget",
            'eventAction': "click",
            'eventLabel': "ASEAN/Garage widget ASEAN link"
          });
        });
      });

      $("#asean-garage-widget-garage").once("click-tracker", function () {
        $(this).click(function () {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'custom_event',
            'eventCategory': "ASEAN/Garage Widget",
            'eventAction': "click",
            'eventLabel': "ASEAN/Garage widget Garage link"
          });
        });
      });

      $("#asean-garage-widget-close").once("click-tracker", function () {
        $(this).click(function () {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'custom_event',
            'eventCategory': "ASEAN/Garage Widget",
            'eventAction': "click",
            'eventLabel': "ASEAN/Garage widget close button"
          });
        });
      });
    }
  }

  /**
   * BT Customer Council banner
   */
  Drupal.behaviors.customerCouncil = {
    attach: function (context, settings) {
      window.closedbefore = 0;
      $(".custco-close").click(function () {
        $(".custco-wrapper").animate({ "bottom": "-50vh" }, 300);
        window.closedbefore = 1;
      });

      $(window).scroll(function () {
        if ($(window).scrollTop() > $(window).height() && !window.transadloaded && !window.closedbefore) {
          $(".custco-wrapper").animate({ "bottom": "0" }, 300);
        }
      });
    }
  }

  /**
   * BT One Signal Auto Prompt
   */
  Drupal.behaviors.oneSignalAutoPrompt = {
    attach: function (context, settings) {
      var oneSignalled = false;
      if (typeof OneSignal !== 'undefined' || OneSignal !== null && !oneSignalled) {
        OneSignal.push(function () {
          OneSignal.showNativePrompt();
          window.oneSignalled = true;
        });
      }
    }
  }

  /**
   * In Body Newsletter sign-up form
   */
  Drupal.behaviors.newsletterSignUp = {
    attach: function (context, settings) {
      $(".newsletter.signup form").submit(function () {
        var $newsletter = $(this);
        var $email = $newsletter.find("input[type=\"email\"]");
        $newsletter.find("button[type=\"submit\"]").html("<i class=\"fa fa-spinner fa-spin\"></i>");
        var dataObj;
        var dataObj = {
          email: $email.val(),
          morning: 1,
          evening: 1,
          garage: 1,
          lifestyle: 1
        }
        var yearendsignupflag = $newsletter.find("input[type=\"hidden\"][class=\"hiddenflag\"]");
        if (yearendsignupflag && (1 == yearendsignupflag.val())) {
          dataObj.yearendsignupflag = 1;
          console.log('Hey, You must have clicked sign up form from homepage.' + yearendsignupflag);
        }
        $.ajax({
          type: "POST",
          dataType: "text",
          url: "/newsletter/sign-up/article_sign_up_form.php",
          data: dataObj,
          success: function (data) {
            $newsletter.closest(".newsletter-wrapper").find(".messages_wrapper").html(data);
            $newsletter.find("button[type=\"submit\"]").html("Sign Up");
            $email.val("");

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'custom_event',
              'eventCategory': "newsletter sign up",
              'eventAction': "click",
              'eventLabel': "INBODY: Sign Up",
              'nonInteraction': "False"
            });
          }
        });

        return false;
      });
    }
  }

  /*
  * Lifestyle page: Add BT Luxe Carousel.
  */
  Drupal.behaviors.btluxeCarousel = {
    attach: function (context, settings) {
      if (context == document) {
        var jlux = jQuery.noConflict();
        jlux('.btluxecarousel .view-content').once('init-slider', function () {
          jlux(this).lightSlider({
            item: 1,
            slideMove: 1,
            auto: true,
            loop: true,
            controls: false,
            adaptiveHeight: true,
            pause: 4000,
            enableTouch: true,
            enableDrag: true,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  item: 1,
                }
              }
            ]
          });
        });
      }
    }
  };

  Drupal.behaviors.noticesSearch = {
    attach: function (context, settings) {
      $("#notices-reset").once().click(function () {
        $(".notices.view-notices-and-announcements .views-exposed-widget input[type='text']").removeAttr("value");
        $("#edit-submit-notices-and-announcements").click();
      });

      $("#edit-submit-notices-and-announcements").once().click(function () {
        var searchterm = $(".notices.view-notices-and-announcements .views-exposed-widget input[type='text']").val();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'custom_event',
          'eventCategory': "Notices Search",
          'eventAction': "click",
          'eventLabel': searchterm,
          'nonInteraction': "False"
        });
      });
    }
  }

  Drupal.behaviors.surveySetCookie = {
    attach: function () {
      $(".msa-survey .link").once().click(function () {
        createCookie("msa-survey-click", 1);

        function createCookie(name, value, days) {
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
          }
          else var expires = "";
          document.cookie = name + "=" + value + expires + "; path=/";
        }
      });
    }
  }
})(jQuery);
;/**/
/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;/**/
