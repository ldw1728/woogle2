
export function setCookie(key, value){
    var todayDate = new Date();
    todayDate.setDate(todayDate.getTime() + 30 * 60 * 1000);
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";";
}

export function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

export function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }