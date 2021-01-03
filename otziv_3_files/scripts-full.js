window.addEventListener('load', function() {
  var navbarToggle = document.querySelector('.navbar-toggle');
  var navbar = document.querySelector('nav');
  var searchBtn = document.querySelector('.search-btn');
  var yandexSearch = document.querySelector('.yandex_search');

  navbarToggle.addEventListener('click', function() {
    if(navbarToggle.classList.contains('search')) {
      navbarToggle.classList.remove('active', 'search');
      
      yandexSearch.classList.remove('yandex_search_active');
      
      searchBtn.classList.remove('search-btn_hide');
    } else {
      if(navbarToggle.classList.contains('active')) {
        navbarToggle.classList.remove('active');
        navbar.classList.remove('active');
      } else {
        navbarToggle.classList.add('active');
        navbar.classList.add('active');
      }
    }
  });

  var navbarBlockHeads = document.querySelectorAll('.afl_navigation_menu_block-head');
  navbarBlockHeads.forEach(function(item) {
    item.addEventListener('click', function() {
      var activeHead = document.querySelector('.afl_navigation_menu_block-head.active');
      if(activeHead) {
        activeHead.classList.remove('active');
      }

      var nextList = item.nextElementSibling;
      var nextListStyle = getComputedStyle(nextList);
      if(nextListStyle.display === 'block') {
        item.nextElementSibling.style.display = 'none';
      } else {
        hideNavbarLists(navbar);

        item.classList.add('active');
        item.nextElementSibling.style.display = 'block';
      }
    });
  });
});

function hideNavbarLists(navbar) {
  Array.prototype.slice.call(navbar.childNodes).forEach(function(elem) {
    if(elem.tagName === 'UL' && getComputedStyle(elem).display === 'block') {
      elem.style.display = 'none';
    }
  });
}
window.addEventListener('load', function() {
  var topBtn = document.querySelector('.top-btn');
  checkTopBtn(topBtn);

  window.addEventListener('scroll', function() {
    checkTopBtn(topBtn);
  });

  topBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

function checkTopBtn(btn) {
  if(window.pageYOffset >= 200 && btn.classList.contains('top-btn_hide')) {
    btn.classList.remove('top-btn_hide');
  } else if(window.pageYOffset < 200 && !btn.classList.contains('top-btn_hide')) {
    btn.classList.add('top-btn_hide');
  }
}
window.addEventListener('load', function() {
  var yandexSearch = document.querySelector('.yandex_search');
  var searchBtn = document.querySelector('.search-btn');
  var navbarToggle = document.querySelector('.navbar-toggle');
  var navbar = document.querySelector('nav');

  searchBtn.addEventListener('click', function() {
    if(navbarToggle.classList.contains('active')) {
      navbar.classList.remove('active');
    }

    showSearch();
    var searchField = yandexSearch.querySelector('.ya-site-form__input-text');
    searchField.focus();
  });

  var searchClose = yandexSearch.querySelector('.search-close');
  searchClose.addEventListener('click', function() {
    hideSearch();
  });
  
  var searchSubmit = yandexSearch.querySelector('.search-submit');
  searchSubmit.addEventListener('click', function() {
    document.querySelector('.ya-site-form__submit').click();
  });

  yandexSearch.addEventListener('click', function(e) {
    if(e.target.classList.contains('dark-bg')) {
      searchBtn.classList.remove('search-btn_hide');
      yandexSearch.classList.remove('yandex_search_active');
      navbarToggle.classList.remove('active', 'search');
    }
  });
});

function showSearch() {
  var yandexSearch = document.querySelector('.yandex_search');
  var searchBtn = document.querySelector('.search-btn');
  var navbarToggle = document.querySelector('.navbar-toggle');

  yandexSearch.classList.add('yandex_search_active');
  searchBtn.classList.add('search-btn_hide');
  navbarToggle.classList.add('active', 'search');
}

function hideSearch() {
  var yandexSearch = document.querySelector('.yandex_search');
  var searchBtn = document.querySelector('.search-btn');
  var navbarToggle = document.querySelector('.navbar-toggle');
  
  searchBtn.classList.remove('search-btn_hide');
  yandexSearch.classList.remove('yandex_search_active');
  navbarToggle.classList.remove('active');
}