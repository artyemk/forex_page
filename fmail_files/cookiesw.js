function on_load() {
//    $('#frontline').modal('show');}
setTimeout(function() { $('#frontline').modal('show') }, 5000);
}

function on_load_warning() {
    window.containerwarning = document.getElementById("containerwarning");
    window.containerwarning.style.display = "block";
}


function close_warning() {
    window.containerwarning.style.display = "none";
}

function get_cookie_warning(Name) {
    var search = Name + "=",
        returnvalue = "";

    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1)
                end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    return returnvalue;
}


function check_cookie_warning() {
    if (get_cookie_warning("warning") == "") {
        window.onload = on_load_warning;
        var today = new Date();
        d = new Date(today.getTime() + 60000*6000);
        document.cookie = "warning=yes; path=/; expires=" + d.toGMTString();
    }
}

function close_banner() {
    window.containerbanner.style.display = "none";
}

function get_cookie_banner(Name) {
    var search = Name + "=",
        returnvalue = "";

    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1)
                end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    return returnvalue;
}
function check_cookie() {
    if (get_cookie_banner("droppedin") == "") {
        if (get_cookie_warning("warning") == "yes") {
            window.onload = on_load;
            var today = new Date();
            d = new Date(today.getTime() + 8 * 6000);
            document.cookie = "droppedin=yes; path=/; expires=" + d.toGMTString();
        }
    }
}

check_cookie();
check_cookie_warning();

$(window).scroll(function(){
    if ($(window).scrollTop() > 400) {
        $('#toplink').css('display', 'inline');
    }
    else {
        $('#toplink').css('display', 'none');
    }
});
