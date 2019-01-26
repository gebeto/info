function CHECKER_INIT(e) {
    function t() {
        n(),
        // l = setTimeout(i, Math.random())
        l = setTimeout(i, 100)
    }
    function n() {
        var e = new window.URL(window.location.href)
          , t = e.searchParams.get("token");
        null !== t && "" !== t && (o(t),
        e.searchParams["delete"]("token"),
        history.replaceState(null, document.title, e.toString()))
    }
    function a(e) {
        var t;
        clearTimeout(p),
        e && (t = new Date(e).getTime() - (new Date).getTime(),
        t > 0 && (p = setTimeout(c, t)))
    }
    function o(e) {
        var t = new Date;
        h = e,
        t.setMinutes(t.getMinutes() + 10),
        document.cookie = "token=" + e + "; expires=" + t.toUTCString(),
        r() || (document.cookie = "token=" + e)
    }
    function r() {
        for (var e = document.cookie.split(";"), t = 0, n = e.length; n > t; t++) {
            var a = e[t]
              , o = a.substr(0, a.indexOf("="));
            if ("token" == o.replace(/ /g, ""))
                return a.substr(a.indexOf("=") + 1)
        }
        return h
    }
    function i() {
        var t = r()
          , n = {
            now: (new Date).getTime() - 100
        };
        // console.clear();
    	console.log("%cChecking Data %s", 'color: red; font-size: 30px;', n.now);
        t && (n.token = t),
        e.queueData || (f = setTimeout(e.pageManager.loadingMessage, 1500)),
        qwest.get(e.refreshUrl, n).then(function(e, t) {
    		// debugger;
            clearTimeout(f);
            try {
                d(t, u(n.now))
            } catch (a) {
                s(12e4)
            }
        })["catch"](function() {
        	console.error.apply(null, arguments);
        	// debugger
            e.gaManager.sendGATiming(u(n.now), "failed"),
            s()
        })
    }
    function u(e) {
        return (new Date).getTime() - e
    }
    function s(e) {
        clearTimeout(l),
        // l = setTimeout(i, e || 2e4 * Math.random())
        // l = setTimeout(i, 300)
        l = setTimeout(i, 100)
    }
    function c() {
        e.pageManager.renderPage(),
        e.announcementManager.renderAnnouncements()
    }
    function d(t, n) {
        0 === Object.keys(t).length ? (e.gaManager.sendGATiming(n, "no data"),
        s()) : (e.queueData = t,
        t.redirect ? (o(""),
        e.gaManager.sendGATiming(n, "redirect"),
        e.foManager.loadRedirectURL(t.redirect)) : (o(t.token || ""),
        a(t.start_date),
        e.gaManager.sendGATiming(n, "success"),
        null === e.langManager.locale && e.langManager.setLocale(t.content.locale),
        c(),
        // s(t.refresh_seconds ? 1e3 * t.refresh_seconds : 3e4 + 6e4 * Math.random())))
        s(100)))
    }
    var l = null
      , f = null
      , p = null
      , h = null;
    qwest.setDefaultOptions({
        responseType: "json",
        // timeout: 6e4,
        timeout: 1000,
        cache: !0
    }),
    // document.addEventListener("lang-changed", c),
    // document.addEventListener("page-changed", function() {
    //     e.gaManager.sendGAPage(e.queueData.content.active_page_name)
    // }),
    t();
    console.log("%c!!!SLAVIK IS HERE!!!", 'color: green; font-size: 40px;');
}

var CH = CHECKER_INIT(window.PL);