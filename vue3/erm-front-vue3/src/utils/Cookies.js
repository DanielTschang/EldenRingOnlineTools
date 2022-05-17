"use strict";
exports.__esModule = true;
exports.getCookie = exports.setCookie = void 0;
/**
 * set Cookie
 * @param CookieName Key
 * @param CookieValue Value
 * @param ExpireDays 過期日期
 */
var setCookie = function (CookieName, CookieValue, ExpireDays) {
    if (ExpireDays === void 0) { ExpireDays = 30; }
    var date = new Date();
    date.setTime(date.getTime() + ExpireDays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + date.toUTCString();
    document.cookie = CookieName + '=' + CookieValue + '; ' + expires;
};
exports.setCookie = setCookie;
/**
 * get Cookie
 * @param CookieName 名
 * @returns 值
 */
var getCookie = function (CookieName) {
    var name = CookieName + '=';
    var AllCookies = document.cookie.split(';');
    for (var i = 0; i < AllCookies.length; i++) {
        //cut off spaces
        var Cookie = AllCookies[i].trim();
        if (Cookie.indexOf(name) == 0)
            return Cookie.substring(name.length, Cookie.length);
    }
    return '';
};
exports.getCookie = getCookie;
