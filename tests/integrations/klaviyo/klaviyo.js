!(function () {
  var e = 'onsite-modules',
    n = document;
  var c =
    window.__klKey ||
    (function () {
      var e = window._learnq;
      if (e && e instanceof Array)
        for (var n = 0; n < e.length; n += 1) {
          var c = e[n];
          if ('account' === c[0]) return c[1];
        }
      return null;
    })();
  if (c) {
    var a = (function () {
        for (
          var e, c = /klaviyo.com.*klaviyo.js/, a = n.getElementsByTagName('script'), t = 0;
          t < a.length;
          t += 1
        ) {
          var r = a[t];
          if (c.exec(r.src)) {
            e = r;
            break;
          }
        }
        if (!e) return null;
        var o = new RegExp('[?&]'.concat('module', '=([^&#]*)')).exec(e.src);
        return (o && o[1] && decodeURI(o[1])) || null;
      })(),
      t = a ? '&module='.concat(a) : '',
      r = n.createElement('script');
    (r.type = 'text/javascript'),
      (r.async = !0),
      (r.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id='
        .concat(c)
        .concat(t, '')),
      n.head.appendChild(r);
  } else
    !(function (n) {
      var c;
      try {
        c = localStorage.getItem('debug');
      } catch (e) {
        return;
      }
      c && -1 !== c.indexOf(e) && console.log(''.concat(e, ' - ').concat(n));
    })('exiting | could not find company ID');
})();
