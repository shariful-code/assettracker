function timeToMillisecond(time) {
  return time * 1000;
}

export const setCookie = (cname, cvalue, exTime) => {
  const d = new Date();
  d.setTime(d.getTime() + timeToMillisecond(exTime));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + btoa(cvalue) + ";" + expires + ";path=/";
};

export const getCookie = (cname) => {
  try {
    const name = cname + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return window.atob(c.substring(name.length, c.length));
      }
    }
  } catch (e) {
    console.log("Cookie read error:", e);
  }
  return "";
};
