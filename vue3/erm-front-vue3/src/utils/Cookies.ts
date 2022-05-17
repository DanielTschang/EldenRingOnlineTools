
 /**
  * set Cookie
  * @param CookieName Key
  * @param CookieValue Value
  * @param ExpireDays 過期日期
  */
 export const setCookie = (CookieName: string, CookieValue: any, ExpireDays: number = 30) => {
   const date = new Date();
   date.setTime(date.getTime() + ExpireDays * 24 * 60 * 60 * 1000);
   const expires = 'expires=' + date.toUTCString();
   document.cookie = CookieName + '=' + CookieValue + '; ' + expires;
 };
 
 /**
  * get Cookie
  * @param CookieName 名
  * @returns 值
  */
 export const getCookie = (CookieName: string): string => {
    const name = CookieName + '=';
    const AllCookies = document.cookie.split(';');
    for (let i = 0; i < AllCookies.length; i++) {
      //cut off spaces
      const Cookie = AllCookies[i].trim();
      if (Cookie.indexOf(name) == 0) return Cookie.substring(name.length, Cookie.length);
    }
    return '';
 };