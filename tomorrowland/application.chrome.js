!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        t.qwest = e()
    }
}(function() {
    var e;
    return function t(e, n, a) {
        function o(i, u) {
            if (!n[i]) {
                if (!e[i]) {
                    var s = "function" == typeof require && require;
                    if (!u && s)
                        return s(i, !0);
                    if (r)
                        return r(i, !0);
                    var c = new Error("Cannot find module '" + i + "'");
                    throw c.code = "MODULE_NOT_FOUND",
                    c
                }
                var d = n[i] = {
                    exports: {}
                };
                e[i][0].call(d.exports, function(t) {
                    var n = e[i][1][t];
                    return o(n ? n : t)
                }, d, d.exports, t, e, n, a)
            }
            return n[i].exports
        }
        for (var r = "function" == typeof require && require, i = 0; i < a.length; i++)
            o(a[i]);
        return o
    }({
        1: [function(t, n) {
            !function(t) {
                "use strict";
                var a = function(e) {
                    var t = function(e, t, n) {
                        n = "function" == typeof n ? n() : null === n ? "" : void 0 === n ? "" : n,
                        e[e.length] = encodeURIComponent(t) + "=" + encodeURIComponent(n)
                    }
                      , n = function(e, a, o) {
                        var r, i, u;
                        if ("[object Array]" === Object.prototype.toString.call(a))
                            for (r = 0,
                            i = a.length; i > r; r++)
                                n(e + "[" + ("object" == typeof a[r] ? r : "") + "]", a[r], o);
                        else if (a && "[object Object]" === a.toString())
                            for (u in a)
                                a.hasOwnProperty(u) && (e ? n(e + "[" + u + "]", a[u], o, t) : n(u, a[u], o, t));
                        else if (e)
                            t(o, e, a);
                        else
                            for (u in a)
                                t(o, u, a[u]);
                        return o
                    };
                    return n("", e, []).join("&").replace(/%20/g, "+")
                };
                "object" == typeof n && "object" == typeof n.exports ? n.exports = a : "function" == typeof e && e.amd ? e([], function() {
                    return a
                }) : t.param = a
            }(this)
        }
        , {}],
        2: [function(e, t) {
            !function(e) {
                function t(e) {
                    return "function" == typeof e
                }
                function n(e) {
                    return "object" == typeof e
                }
                function a(e) {
                    "undefined" != typeof setImmediate ? setImmediate(e) : "undefined" != typeof process && process.nextTick ? process.nextTick(e) : setTimeout(e, 0)
                }
                var o;
                e[0][e[1]] = function r(e) {
                    var i, u = [], s = [], c = function(e, t) {
                        return null == i && null != e && (i = e,
                        u = t,
                        s.length && a(function() {
                            for (var e = 0; e < s.length; e++)
                                s[e]()
                        })),
                        i
                    };
                    return c.then = function(c, d) {
                        var l = r(e)
                          , f = function() {
                            function e(a) {
                                var r, i = 0;
                                try {
                                    if (a && (n(a) || t(a)) && t(r = a.then)) {
                                        if (a === l)
                                            throw new TypeError;
                                        r.call(a, function() {
                                            i++ || e.apply(o, arguments)
                                        }, function(e) {
                                            i++ || l(!1, [e])
                                        })
                                    } else
                                        l(!0, arguments)
                                } catch (u) {
                                    i++ || l(!1, [u])
                                }
                            }
                            try {
                                var a = i ? c : d;
                                t(a) ? e(a.apply(o, u || [])) : l(i, u)
                            } catch (r) {
                                l(!1, [r])
                            }
                        };
                        return null != i ? a(f) : s.push(f),
                        l
                    }
                    ,
                    e && (c = e(c)),
                    c
                }
            }("undefined" == typeof t ? [window, "pinkySwear"] : [t, "exports"])
        }
        , {}],
        qwest: [function(e, t) {
            t.exports = function() {
                var t = "undefined" != typeof window ? window : self
                  , n = e("pinkyswear")
                  , a = e("jquery-param")
                  , o = {}
                  , r = "json"
                  , i = "post"
                  , u = null
                  , s = 0
                  , c = []
                  , d = t.XMLHttpRequest ? function() {
                    return new t.XMLHttpRequest
                }
                : function() {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                }
                  , l = "" === d().responseType
                  , f = function(e, f, p, h, m) {
                    e = e.toUpperCase(),
                    p = void 0 === p ? null : p,
                    h = h || {};
                    for (var g in o)
                        if (!(g in h))
                            if ("object" == typeof o[g] && "object" == typeof h[g])
                                for (var y in o[g])
                                    h[g][y] = o[g][y];
                            else
                                h[g] = o[g];
                    var v, w, b, T, _, E = !1, L = !1, M = !1, x = 0, P = {}, k = {
                        text: "*/*",
                        xml: "text/xml",
                        json: "application/json",
                        post: "application/x-www-form-urlencoded",
                        document: "text/html"
                    }, S = {
                        text: "*/*",
                        xml: "application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",
                        json: "application/json; q=1.0, text/*; q=0.8, */*; q=0.1"
                    }, q = !1, j = n(function(n) {
                        return n.abort = function() {
                            M || (w && 4 != w.readyState && w.abort(),
                            q && (--s,
                            q = !1),
                            M = !0)
                        }
                        ,
                        n.send = function() {
                            if (!q) {
                                if (s == u)
                                    return void c.push(n);
                                if (M)
                                    return void (c.length && c.shift().send());
                                if (++s,
                                q = !0,
                                w = d(),
                                v && ("withCredentials"in w || !t.XDomainRequest || (w = new XDomainRequest,
                                L = !0,
                                "GET" != e && "POST" != e && (e = "POST"))),
                                L ? w.open(e, f) : (w.open(e, f, h.async, h.user, h.password),
                                l && h.async && (w.withCredentials = h.withCredentials)),
                                !L)
                                    for (var a in P)
                                        P[a] && w.setRequestHeader(a, P[a]);
                                if (l && "auto" != h.responseType)
                                    try {
                                        w.responseType = h.responseType,
                                        E = w.responseType == h.responseType
                                    } catch (o) {}
                                l || L ? (w.onload = C,
                                w.onerror = O,
                                L && (w.onprogress = function() {}
                                )) : w.onreadystatechange = function() {
                                    4 == w.readyState && C()
                                }
                                ,
                                h.async ? "timeout"in w ? (w.timeout = h.timeout,
                                w.ontimeout = R) : b = setTimeout(R, h.timeout) : L && (w.ontimeout = function() {}
                                ),
                                "auto" != h.responseType && "overrideMimeType"in w && w.overrideMimeType(k[h.responseType]),
                                m && m(w),
                                L ? setTimeout(function() {
                                    w.send("GET" != e ? p : null)
                                }, 0) : w.send("GET" != e ? p : null)
                            }
                        }
                        ,
                        n
                    }), C = function() {
                        var e;
                        if (q = !1,
                        clearTimeout(b),
                        c.length && c.shift().send(),
                        !M) {
                            --s;
                            try {
                                if (E) {
                                    if ("response"in w && null === w.response)
                                        throw "The request response is empty";
                                    _ = w.response
                                } else {
                                    if (e = h.responseType,
                                    "auto" == e)
                                        if (L)
                                            e = r;
                                        else {
                                            var n = w.getResponseHeader("Content-Type") || "";
                                            e = n.indexOf(k.json) > -1 ? "json" : n.indexOf(k.xml) > -1 ? "xml" : "text"
                                        }
                                    switch (e) {
                                    case "json":
                                        if (w.responseText.length)
                                            try {
                                                _ = "JSON"in t ? JSON.parse(w.responseText) : new Function("return (" + w.responseText + ")")()
                                            } catch (a) {
                                                throw "Error while parsing JSON body : " + a
                                            }
                                        break;
                                    case "xml":
                                        try {
                                            t.DOMParser ? _ = (new DOMParser).parseFromString(w.responseText, "text/xml") : (_ = new ActiveXObject("Microsoft.XMLDOM"),
                                            _.async = "false",
                                            _.loadXML(w.responseText))
                                        } catch (a) {
                                            _ = void 0
                                        }
                                        if (!_ || !_.documentElement || _.getElementsByTagName("parsererror").length)
                                            throw "Invalid XML";
                                        break;
                                    default:
                                        _ = w.responseText
                                    }
                                }
                                if ("status"in w && !/^2|1223/.test(w.status))
                                    throw w.status + " (" + w.statusText + ")";
                                j(!0, [w, _])
                            } catch (a) {
                                j(!1, [a, w, _])
                            }
                        }
                    }, O = function(e) {
                        M || (e = "string" == typeof e ? e : "Connection aborted",
                        j.abort(),
                        j(!1, [new Error(e), w, null]))
                    }, R = function() {
                        M || (h.attempts && ++x == h.attempts ? O("Timeout (" + f + ")") : (w.abort(),
                        q = !1,
                        j.send()))
                    };
                    if (h.async = !("async"in h && !h.async),
                    h.cache = "cache"in h && !!h.cache,
                    h.dataType = "dataType"in h ? h.dataType.toLowerCase() : i,
                    h.responseType = "responseType"in h ? h.responseType.toLowerCase() : "auto",
                    h.user = h.user || "",
                    h.password = h.password || "",
                    h.withCredentials = !!h.withCredentials,
                    h.timeout = "timeout"in h ? parseInt(h.timeout, 10) : 3e4,
                    h.attempts = "attempts"in h ? parseInt(h.attempts, 10) : 1,
                    T = f.match(/\/\/(.+?)\//),
                    v = T && !!T[1] && T[1] != location.host,
                    "ArrayBuffer"in t && p instanceof ArrayBuffer ? h.dataType = "arraybuffer" : "Blob"in t && p instanceof Blob ? h.dataType = "blob" : "Document"in t && p instanceof Document ? h.dataType = "document" : "FormData"in t && p instanceof FormData && (h.dataType = "formdata"),
                    null !== p)
                        switch (h.dataType) {
                        case "json":
                            p = JSON.stringify(p);
                            break;
                        case "post":
                            p = a(p)
                        }
                    if (h.headers) {
                        var D = function(e, t, n) {
                            return t + n.toUpperCase()
                        };
                        for (T in h.headers)
                            P[T.replace(/(^|-)([^-])/g, D)] = h.headers[T]
                    }
                    return "Content-Type"in P || "GET" == e || h.dataType in k && k[h.dataType] && (P["Content-Type"] = k[h.dataType]),
                    P.Accept || (P.Accept = h.responseType in S ? S[h.responseType] : "*/*"),
                    v || "X-Requested-With"in P || (P["X-Requested-With"] = "XMLHttpRequest"),
                    h.cache || "Cache-Control"in P || (P["Cache-Control"] = "no-cache"),
                    "GET" == e && p && "string" == typeof p && (f += (/\?/.test(f) ? "&" : "?") + p),
                    h.async && j.send(),
                    j
                }
                  , p = function(e) {
                    var t = []
                      , a = 0
                      , o = [];
                    return n(function(n) {
                        var r = -1
                          , i = function(e) {
                            return function(i, u, s, c) {
                                var d = ++r;
                                return ++a,
                                t.push(f(e, n.base + i, u, s, c).then(function() {
                                    o[d] = arguments,
                                    --a || n(!0, 1 == o.length ? o[0] : [o])
                                }, function() {
                                    n(!1, arguments)
                                })),
                                n
                            }
                        };
                        n.get = i("GET"),
                        n.post = i("POST"),
                        n.put = i("PUT"),
                        n["delete"] = i("DELETE"),
                        n["catch"] = function(e) {
                            return n.then(null, e)
                        }
                        ,
                        n.complete = function(e) {
                            var t = function() {
                                e()
                            };
                            return n.then(t, t)
                        }
                        ,
                        n.map = function(e, t, n, a, o) {
                            return i(e.toUpperCase()).call(this, t, n, a, o)
                        }
                        ;
                        for (var u in e)
                            u in n || (n[u] = e[u]);
                        return n.send = function() {
                            for (var e = 0, a = t.length; a > e; ++e)
                                t[e].send();
                            return n
                        }
                        ,
                        n.abort = function() {
                            for (var e = 0, a = t.length; a > e; ++e)
                                t[e].abort();
                            return n
                        }
                        ,
                        n
                    })
                }
                  , h = {
                    base: "",
                    get: function() {
                        return p(h).get.apply(this, arguments)
                    },
                    post: function() {
                        return p(h).post.apply(this, arguments)
                    },
                    put: function() {
                        return p(h).put.apply(this, arguments)
                    },
                    "delete": function() {
                        return p(h)["delete"].apply(this, arguments)
                    },
                    map: function() {
                        return p(h).map.apply(this, arguments)
                    },
                    xhr2: l,
                    limit: function(e) {
                        return u = e,
                        h
                    },
                    setDefaultOptions: function(e) {
                        return o = e,
                        h
                    },
                    setDefaultXdrResponseType: function(e) {
                        return r = e.toLowerCase(),
                        h
                    },
                    setDefaultDataType: function(e) {
                        return i = e.toLowerCase(),
                        h
                    },
                    getOpenRequests: function() {
                        return s
                    }
                };
                return h
            }()
        }
        , {
            "jquery-param": 1,
            pinkyswear: 2
        }]
    }, {}, [1, 2])("qwest")
});
try {
    var ce = new window.CustomEvent("test");
    if (ce.preventDefault(),
    ce.defaultPrevented !== !0)
        throw new Error("Could not prevent default")
} catch (e) {
    var CustomEvent = function(e, t) {
        var n, a;
        return t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        },
        n = document.createEvent("CustomEvent"),
        n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail),
        a = n.preventDefault,
        n.preventDefault = function() {
            a.call(this);
            try {
                Object.defineProperty(this, "defaultPrevented", {
                    get: function() {
                        return !0
                    }
                })
            } catch (e) {
                this.defaultPrevented = !0
            }
        }
        ,
        n
    };
    CustomEvent.prototype = window.Event.prototype,
    window.CustomEvent = CustomEvent
}
!function(e) {
    var t = function() {
        try {
            return !!Symbol.iterator
        } catch (e) {
            return !1
        }
    }
      , n = t()
      , a = function(e) {
        var t = {
            next: function() {
                var t = e.shift();
                return {
                    done: void 0 === t,
                    value: t
                }
            }
        };
        return n && (t[Symbol.iterator] = function() {
            return t
        }
        ),
        t
    }
      , o = function(e) {
        return encodeURIComponent(e).replace(/%20/g, "+")
    }
      , r = function(e) {
        return decodeURIComponent(e).replace(/\+/g, " ")
    }
      , i = function() {
        var t = function(e) {
            if (Object.defineProperty(this, "_entries", {
                writable: !0,
                value: {}
            }),
            "string" == typeof e)
                "" !== e && this._fromString(e);
            else if (e instanceof t) {
                var n = this;
                e.forEach(function(e, t) {
                    n.append(t, e)
                })
            }
        }
          , i = t.prototype;
        i.append = function(e, t) {
            e in this._entries ? this._entries[e].push(t.toString()) : this._entries[e] = [t.toString()]
        }
        ,
        i["delete"] = function(e) {
            delete this._entries[e]
        }
        ,
        i.get = function(e) {
            return e in this._entries ? this._entries[e][0] : null
        }
        ,
        i.getAll = function(e) {
            return e in this._entries ? this._entries[e].slice(0) : []
        }
        ,
        i.has = function(e) {
            return e in this._entries
        }
        ,
        i.set = function(e, t) {
            this._entries[e] = [t.toString()]
        }
        ,
        i.forEach = function(e, t) {
            var n;
            for (var a in this._entries)
                if (this._entries.hasOwnProperty(a)) {
                    n = this._entries[a];
                    for (var o = 0; o < n.length; o++)
                        e.call(t, n[o], a, this)
                }
        }
        ,
        i.keys = function() {
            var e = [];
            return this.forEach(function(t, n) {
                e.push(n)
            }),
            a(e)
        }
        ,
        i.values = function() {
            var e = [];
            return this.forEach(function(t) {
                e.push(t)
            }),
            a(e)
        }
        ,
        i.entries = function() {
            var e = [];
            return this.forEach(function(t, n) {
                e.push([n, t])
            }),
            a(e)
        }
        ,
        n && (i[Symbol.iterator] = i.entries),
        i.toString = function() {
            var e = [];
            return this.forEach(function(t, n) {
                e.push(o(n) + "=" + o(t))
            }),
            e.join("&")
        }
        ,
        Object.defineProperty(i, "_fromString", {
            enumerable: !1,
            configurable: !1,
            writable: !1,
            value: function(e) {
                this._entries = {},
                e = e.replace(/^\?/, "");
                for (var t, n = e.split("&"), a = 0; a < n.length; a++)
                    t = n[a].split("="),
                    this.append(r(t[0]), t.length > 1 ? r(t[1]) : "")
            }
        }),
        e.URLSearchParams = t
    };
    "URLSearchParams"in e && "a=1" === new URLSearchParams("?a=1").toString() || i(),
    "function" != typeof URLSearchParams.prototype.sort && (URLSearchParams.prototype.sort = function() {
        var e = this
          , t = [];
        this.forEach(function(n, a) {
            t.push([a, n]),
            e._entries || e["delete"](a)
        }),
        t.sort(function(e, t) {
            return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0
        }),
        e._entries && (e._entries = {});
        for (var n = 0; n < t.length; n++)
            this.append(t[n][0], t[n][1])
    }
    )
}("undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : this),
function(e) {
    var t = function() {
        try {
            var e = new URL("b","http://a");
            return e.pathname = "c%20d",
            "http://a/c%20d" === e.href && e.searchParams
        } catch (t) {
            return !1
        }
    }
      , n = function() {
        var t = e.URL
          , n = function(t, n) {
            "string" != typeof t && (t = String(t));
            var a, o = document;
            if (n && (void 0 === e.location || n !== e.location.href)) {
                o = document.implementation.createHTMLDocument(""),
                a = o.createElement("base"),
                a.href = n,
                o.head.appendChild(a);
                try {
                    if (0 !== a.href.indexOf(n))
                        throw new Error(a.href)
                } catch (r) {
                    throw new Error("URL unable to set base " + n + " due to " + r)
                }
            }
            var i = o.createElement("a");
            if (i.href = t,
            a && (o.body.appendChild(i),
            i.href = i.href),
            ":" === i.protocol || !/:/.test(i.href))
                throw new TypeError("Invalid URL");
            Object.defineProperty(this, "_anchorElement", {
                value: i
            });
            var u = new URLSearchParams(this.search)
              , s = !0
              , c = !0
              , d = this;
            ["append", "delete", "set"].forEach(function(e) {
                var t = u[e];
                u[e] = function() {
                    t.apply(u, arguments),
                    s && (c = !1,
                    d.search = u.toString(),
                    c = !0)
                }
            }),
            Object.defineProperty(this, "searchParams", {
                value: u,
                enumerable: !0
            });
            var l = void 0;
            Object.defineProperty(this, "_updateSearchParams", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: function() {
                    this.search !== l && (l = this.search,
                    c && (s = !1,
                    this.searchParams._fromString(this.search),
                    s = !0))
                }
            })
        }
          , a = n.prototype
          , o = function(e) {
            Object.defineProperty(a, e, {
                get: function() {
                    return this._anchorElement[e]
                },
                set: function(t) {
                    this._anchorElement[e] = t
                },
                enumerable: !0
            })
        };
        ["hash", "host", "hostname", "port", "protocol"].forEach(function(e) {
            o(e)
        }),
        Object.defineProperty(a, "search", {
            get: function() {
                return this._anchorElement.search
            },
            set: function(e) {
                this._anchorElement.search = e,
                this._updateSearchParams()
            },
            enumerable: !0
        }),
        Object.defineProperties(a, {
            toString: {
                get: function() {
                    var e = this;
                    return function() {
                        return e.href
                    }
                }
            },
            href: {
                get: function() {
                    return this._anchorElement.href.replace(/\?$/, "")
                },
                set: function(e) {
                    this._anchorElement.href = e,
                    this._updateSearchParams()
                },
                enumerable: !0
            },
            pathname: {
                get: function() {
                    return this._anchorElement.pathname.replace(/(^\/?)/, "/")
                },
                set: function(e) {
                    this._anchorElement.pathname = e
                },
                enumerable: !0
            },
            origin: {
                get: function() {
                    var e = {
                        "http:": 80,
                        "https:": 443,
                        "ftp:": 21
                    }[this._anchorElement.protocol]
                      , t = this._anchorElement.port != e && "" !== this._anchorElement.port;
                    return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (t ? ":" + this._anchorElement.port : "")
                },
                enumerable: !0
            },
            password: {
                get: function() {
                    return ""
                },
                set: function() {},
                enumerable: !0
            },
            username: {
                get: function() {
                    return ""
                },
                set: function() {},
                enumerable: !0
            }
        }),
        n.createObjectURL = function() {
            return t.createObjectURL.apply(t, arguments)
        }
        ,
        n.revokeObjectURL = function() {
            return t.revokeObjectURL.apply(t, arguments)
        }
        ,
        e.URL = n
    };
    if (t() || n(),
    void 0 !== e.location && !("origin"in e.location)) {
        var a = function() {
            return e.location.protocol + "//" + e.location.hostname + (e.location.port ? ":" + e.location.port : "")
        };
        try {
            Object.defineProperty(e.location, "origin", {
                get: a,
                enumerable: !0
            })
        } catch (o) {
            setInterval(function() {
                e.location.origin = a()
            }, 100)
        }
    }
}("undefined" != typeof global ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : this),
function(e) {
    function t(e, t) {
        return e.filter(function(e) {
            return 0 === t.filter(function(t) {
                return t.id === e.id
            }).length
        })
    }
    function n(t) {
        t.forEach(function(t) {
            var n = document.querySelector('[data-announcement-item-id="' + t.id + '"]');
            e.util.fade(n, "out", 500, function() {
                n.parentNode.removeChild(n)
            })
        })
    }
    function a(t, n) {
        var a, r = document.querySelector(".announcement-content"), i = e.announcementManager.data;
        t.forEach(function(t, u) {
            var s = document.querySelector('[data-announcement-item-id="' + t.id + '"]');
            s ? (a = i.filter(function(e) {
                return e.id === t.id
            })[0],
            a.text[e.announcementManager.locale] !== t.text[n] && e.util.fade(s, "out", 500, function() {
                s.innerHTML = t.text[n],
                e.util.fade(s, "in", 500)
            })) : (s = o(t, n),
            s = 0 === u ? r.insertAdjacentHTML("afterbegin", s) : r.querySelector(".announcement-item:nth-child(" + u + ")").insertAdjacentHTML("afterend", s),
            s = document.querySelector('[data-announcement-item-id="' + t.id + '"]'),
            e.util.fade(s, "out", 500, function() {
                e.util.fade(s, "in", 500)
            }))
        })
    }
    function o(e, t) {
        return ['<div class="announcement-item" data-announcement-item-id="', e.id, '">', e.text[t], "</div>"].join("")
    }
    function r() {
        var o = e.queueData.content.announcements
          , r = e.langManager.locale;
        if (0 !== o.length || 0 !== e.announcementManager.data.length) {
            var i = t(e.announcementManager.data, o);
            i.length > 0 && n(i),
            a(o, r),
            e.announcementManager.data = o,
            e.announcementManager.locale = r
        }
    }
    e.announcementManager = {
        data: [],
        locale: "",
        renderAnnouncements: r
    }
}(window.PL),
function(e) {
    function t(e, t) {
        -1 !== t.indexOf(s) && (e.innerHTML = t.replace(s, "<countdown></countdown>"),
        u = e.querySelector("countdown"),
        r(),
        i = setInterval(r, 200))
    }
    function n(t, n) {
        return e.langManager.translate(t, n)
    }
    function a() {
        var t = e.queueData.start_date
          , n = new Date(t).getTime() - (new Date).getTime();
        return Math.floor(Math.max(n, 0) / 1e3)
    }
    function o() {
        var e, t, o, r, i, u, s = [], c = " ", d = ", ", l = c + n("and") + c;
        return r = a(),
        i = r,
        e = Math.floor(r / 86400),
        i >= 86400 && s.push(e + c + n("day", e)),
        r -= 86400 * e,
        t = Math.floor(r / 3600) % 24,
        i >= 3600 && s.push(t + c + n("hour", t)),
        r -= 3600 * t,
        o = Math.floor(r / 60) % 60,
        i >= 60 && s.push(o + c + n("minute", o)),
        r -= 60 * o,
        0 === e && s.push(r + c + n("second", r)),
        u = s.pop(),
        s.length ? s.join(d) + l + u : u
    }
    function r() {
        u.innerHTML = o()
    }
    var i = null
      , u = null
      , s = "{countdown}";
    document.addEventListener("page-changed", function(e) {
        var n = e.detail;
        clearInterval(i),
        "not_started" === n.pageName && t(n.element, n.pageHtml)
    })
}(window.PL),
function(e, t) {
    t.isMobileBrowser = /(android|bb\d+|meego).+mobile|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
}(navigator.userAgent || navigator.vendor || window.opera, window.PL),
function(e) {
    function t(e) {
        var t = new window.URL(e)
          , n = new window.URL(window.location.href)
          , a = new window.URLSearchParams(n.hash.slice(1));
        n.searchParams.forEach(function(e, n) {
            t.searchParams.has(n) || t.searchParams.set(n, e)
        }),
        a.has("pld") && !t.searchParams.has("pld") && t.searchParams.set("pld", a.get("pld")),
        document.location.href = t.toString()
    }
    e.foManager = {
        loadRedirectURL: t
    }
}(window.PL),
function(e) {
    function t(e, t) {
        _gaq.push(["paylogic._trackTiming", "Permanent Queue", "AJAX update", e, t, 20])
    }
    function n(t) {
        o.forEach(function(n) {
            _gaq.push([n + "._trackPageview", (e.eventName || "default") + "/" + t])
        })
    }
    function a() {
        o.forEach(function(e) {
            _gaq.push([e + "._trackEvent", "Permanent Queue", "Ping"])
        })
    }
    var o = [];
    e.gaManager = {
        sendGAPage: n,
        sendGATiming: t
    },
    e.analytics.paylogic_tracker_id && (o.push("paylogic"),
    _gaq.push(["paylogic._setAccount", e.analytics.paylogic_tracker_id])),
    e.analytics.event_tracker_id && (o.push("event"),
    _gaq.push(["event._setAccount", e.analytics.event_tracker_id])),
    setInterval(a, 3e5),
    n("landing")
}(window.PL),
function(e) {
    function t() {
        n(o.value),
        document.dispatchEvent(new CustomEvent("lang-changed"))
    }
    function n(t) {
        e.langManager.locale = t,
        o && o.value !== t && (o.value = t)
    }
    function a(t, n) {
        return "number" == typeof n && 1 !== n && (t += "s"),
        e.translations[e.langManager.locale][t]
    }
    var o = document.querySelector("#lang");
    o && o.addEventListener("change", t),
    e.langManager = {
        locale: null,
        setLocale: n,
        translate: a
    }
}(window.PL),
function(e) {
    function t(t, n) {
        var a = n[t];
        return a[e.langManager.locale] || a[n.enabled_languages[0]]
    }
    function n(e) {
        return !e || (new Date).getTime() >= new Date(e).getTime()
    }
    function a() {
        var a = e.queueData.content
          , o = e.langManager.locale
          , s = "not_started"
          , c = t("not_started_page", a);
        n(e.queueData.start_date) && (s = a.active_page_name,
        c = t("active_page", a)),
        (s !== r || o !== i) && (e.util.fade(u, "out", r ? 500 : 0, function() {
            var t = {
                detail: {
                    element: u,
                    pageHtml: c,
                    pageName: s
                }
            };
            u.innerHTML = c,
            document.dispatchEvent(new CustomEvent("page-changed",t)),
            e.util.fade(u, "in", 500)
        }),
        r = s,
        i = o)
    }
    function o() {
        r = "loading",
        u.innerHTML = '<h2 class="loading">Loading…</h2>',
        e.util.fade(u, "in", 500)
    }
    var r = null
      , i = null
      , u = document.querySelector(".template-content");
    e.pageManager = {
        renderPage: a,
        loadingMessage: o
    }
}(window.PL),
function(e) {
    function t(e) {
        var t = e && e.match(/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/);
        return t ? t[1] : void 0
    }
    function n() {
        var e = document.querySelectorAll(".yt-player-control")
          , t = document.querySelector("#un-mute")
          , n = document.querySelector("#pause-play");
        t.checked = c,
        t.addEventListener("change", o),
        n.checked = !1,
        n.addEventListener("change", r),
        Array.prototype.forEach.call(e, function(e) {
            e.classList.remove("hide")
        })
    }
    function a() {
        u.getPlayerState() === window.YT.PlayerState.CUED && u.playVideo(),
        u.setVolume(5),
        n(),
        i(),
        window.addEventListener("resize", i)
    }
    function o(e) {
        var t = e.target.checked;
        t ? u.mute() : u.unMute()
    }
    function r(e) {
        var t = e.target.checked;
        t ? u.pauseVideo() : u.playVideo()
    }
    function i() {
        var e, t = {}, n = {}, a = document.querySelector(".bg-media"), o = document.querySelector(".bg-media iframe");
        t.width = a.offsetWidth,
        t.height = a.offsetHeight,
        n.width = t.width,
        n.height = Math.ceil(Math.ceil(t.width * (9 / 16))),
        n.marginTop = -((n.height - t.height) / 2),
        n.marginLeft = 0,
        e = n.height < t.height,
        e && (n.height = t.height,
        n.width = Math.floor(Math.floor(t.height * (16 / 9))),
        n.marginTop = 0,
        n.marginLeft = -((n.width - t.width) / 2)),
        o.style.width = n.width + "px",
        o.style.height = n.height + "px",
        o.style.marginTop = n.marginTop + "px",
        o.style.marginLeft = n.marginLeft + "px"
    }
    var u, s = t(e.media.youtube_url), c = Boolean(navigator.userAgent.match("Chrome/"));
    s && !e.isMobileBrowser && window.setTimeout(function() {
        var e = document.createElement("script");
        e.src = "https://www.youtube.com/iframe_api",
        document.body.appendChild(e)
    }, 500),
    window.onYouTubeIframeAPIReady = function() {
        u = new window.YT.Player("bgMediaFrame",{
            width: "100%",
            height: "100%",
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                loop: 1,
                modestbranding: 1,
                mute: Number(c),
                showinfo: 0,
                rel: 0,
                playlist: s
            },
            videoId: s,
            events: {
                onReady: a
            }
        })
    }
}(window.PL),
function(e) {
    function t() {
        var t, r = document.createDocumentFragment();
        if (e.media.images && 0 !== e.media.images.length && (!e.media.youtube_url || e.isMobileBrowser)) {
            for (var s = 0, c = e.media.images.length; c > s; s++)
                t = document.createElement("div"),
                t.classList.add("bg-slide"),
                r.appendChild(t),
                u.push(t);
            document.querySelector(".bg-media").appendChild(r),
            n(0),
            o = setInterval(a, i),
            a()
        }
    }
    function n(t) {
        var a = new Image;
        t !== e.media.images.length && (a.addEventListener("load", function() {
            var e = u[t];
            e.style.backgroundImage = ["url(", this.src, ")"].join(""),
            e.classList.add("loaded"),
            n(++t)
        }),
        a.src = e.media.images[t])
    }
    function a() {
        var t = document.querySelector(".bg-slide.active");
        return t && t.classList.toggle("active"),
        u[r].classList.toggle("active"),
        1 === e.media.images.length ? void clearInterval(o) : (r++,
        void (r === e.media.images.length && (r = 0)))
    }
    var o, r = 0, i = 8e3, u = [];
    t()
}(window.PL),
function(e) {
    function t(e) {
        var t = document.createElement("iframe");
        return t.src = "https://open.spotify.com/embed?uri=" + encodeURIComponent(e),
        t.setAttribute("allow", "encrypted-media"),
        t.setAttribute("allowtransparency", "true"),
        t.setAttribute("frameborder", "0"),
        t.classList.add("pl-spotify"),
        t
    }
    var n, a;
    a && a === e.media.spotify_embed || (a = e.media.spotify_embed,
    n && document.body.removeChild(n),
    a && (n = t(a),
    document.querySelector(".pl-body-footer").appendChild(n)))
}(window.PL),
function(e) {
    e.translations = {
        nl: {
            second: "seconde",
            seconds: "seconden",
            minute: "minuut",
            minutes: "minuten",
            hour: "uur",
            hours: "uur",
            day: "dag",
            days: "dagen",
            and: "en"
        },
        en: {
            second: "second",
            seconds: "seconds",
            minute: "minute",
            minutes: "minutes",
            hour: "hour",
            hours: "hours",
            day: "day",
            days: "days",
            and: "and"
        },
        de: {
            second: "Sekunde",
            seconds: "Sekunden",
            minute: "Minute",
            minutes: "Minuten",
            hour: "Stunde",
            hours: "Stunden",
            day: "Tag",
            days: "Tage",
            and: "und"
        },
        fr: {
            second: "seconde",
            seconds: "secondes",
            minute: "minute",
            minutes: "minutes",
            hour: "heure",
            hours: "heures",
            day: "jour",
            days: "jours",
            and: "et"
        },
        es: {
            second: "segundo",
            seconds: "segundos",
            minute: "minuto",
            minutes: "minutos",
            hour: "hora",
            hours: "horas",
            day: "día",
            days: "días",
            and: "y"
        },
        pt: {
            second: "segundo",
            seconds: "segundos",
            minute: "minuto",
            minutes: "minutos",
            hour: "hora",
            hours: "horas",
            day: "dia",
            days: "dias",
            and: "e"
        }
    }
}(window.PL),
function(e) {
    function t() {
        n(),
        l = setTimeout(i, Math.random())
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
            now: (new Date).getTime()
        };
        t && (n.token = t),
        e.queueData || (f = setTimeout(e.pageManager.loadingMessage, 1500)),
        qwest.get(e.refreshUrl, n).then(function(e, t) {
            clearTimeout(f);
            try {
                d(t, u(n.now))
            } catch (a) {
                s(12e4)
            }
        })["catch"](function() {
            e.gaManager.sendGATiming(u(n.now), "failed"),
            s()
        })
    }
    function u(e) {
        return (new Date).getTime() - e
    }
    function s(e) {
        clearTimeout(l),
        l = setTimeout(i, e || 2e4 * Math.random())
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
        s(t.refresh_seconds ? 1e3 * t.refresh_seconds : 3e4 + 6e4 * Math.random())))
    }
    var l = null
      , f = null
      , p = null
      , h = null;
    qwest.setDefaultOptions({
        responseType: "json",
        timeout: 6e4,
        cache: !0
    }),
    document.addEventListener("lang-changed", c),
    document.addEventListener("page-changed", function() {
        e.gaManager.sendGAPage(e.queueData.content.active_page_name)
    }),
    t()
}(window.PL),
function(e) {
    function t(e, t, n, a) {
        function o() {
            i = r ? i + s : i - s,
            e.style.opacity = i,
            0 >= i && (e.style.display = "none"),
            (0 >= i || i >= 1) && (clearInterval(c),
            a && a.call(this))
        }
        var r = "in" === t
          , i = r ? 0 : 1
          , u = 16
          , s = u / n;
        r && (e.style.display = "block",
        e.style.opacity = i);
        var c = setInterval(o, u)
    }
    e.util = {
        fade: t
    }
}(window.PL);
