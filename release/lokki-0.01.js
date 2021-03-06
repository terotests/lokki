// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var lokkiLoki_prototype = function lokkiLoki_prototype() {
    // Then create the traits and subclasses for this class here...

    // the subclass definition comes around here then

    // The class definition is here...
    var later_prototype = function later_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;

        // Initialize static variables here...

        /**
         * @param function fn
         * @param float thisObj
         * @param float args
         */
        _myTrait_.add = function (fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === "[object Array]") {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        };

        /**
         * @param float seconds
         * @param float fn
         * @param float name
         */
        _myTrait_.after = function (seconds, fn, name) {

          if (!name) {
            name = "time" + new Date().getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0,
            remove: true
          };
        };

        /**
         * @param function fn
         */
        _myTrait_.asap = function (fn) {
          this.add(fn);
        };

        /**
         * @param float seconds
         * @param float fn
         * @param float name
         */
        _myTrait_.every = function (seconds, fn, name) {

          if (!name) {
            name = "time" + new Date().getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (interval, fn) {
          if (!_initDone) {

            this.polyfill();

            var frame, cancelFrame;
            if (typeof window != "undefined") {
              var frame = window["requestAnimationFrame"],
                  cancelFrame = window["cancelRequestAnimationFrame"];
              ["", "ms", "moz", "webkit", "o"].forEach(function (x) {
                if (!frame) {
                  frame = window[x + "RequestAnimationFrame"];
                  cancelFrame = window[x + "CancelAnimationFrame"] || window[x + "CancelRequestAnimationFrame"];
                }
              });
            }

            if (!frame) frame = function (cb) {
              return setTimeout(cb, 16);
            };

            if (!cancelFrame) cancelFrame = function (id) {
              clearTimeout(id);
            };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function _callQueQue() {
              var ms = new Date().getTime();
              var fn;
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === "[object Array]") {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }
              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    if (v.remove) {
                      if (v.nextTime > 0) {
                        v.fn();
                        delete _everies[n];
                      } else {
                        v.nextTime = ms + v.step;
                      }
                    } else {
                      v.fn();
                      v.nextTime = ms + v.step;
                    }
                  }
                  if (v.until) {
                    if (v.until < ms) {
                      delete _everies[n];
                    }
                  }
                }
              }

              frame(_callQueQue);
              lastMs = ms;
            };
            _callQueQue();
            _initDone = true;
          }
        });

        /**
         * @param  key
         * @param float fn
         * @param float value
         */
        _myTrait_.once = function (key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        };

        /**
         * @param function fn
         */
        _myTrait_.onFrame = function (fn) {

          _framers.push(fn);
        };

        /**
         * @param float t
         */
        _myTrait_.polyfill = function (t) {};

        /**
         * @param float fn
         */
        _myTrait_.removeFrameFn = function (fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        };
      })(this);
    };

    var later = function later(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    later._classInfo = {
      name: "later"
    };
    later.prototype = new later_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var lokki_prototype = function lokki_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {
          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return t instanceof Array;
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == "[object Function]";
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _instanceCache;
        var _settings;
        var _fs;
        var _logFileInited;
        var _options;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty("__factoryClass")) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id) {
          if (!id) return;

          if (!_instanceCache) _instanceCache = {};
          if (_instanceCache[id]) return _instanceCache[id];
          _instanceCache[id] = this;
        });

        /**
         * Initializes the settings refresh for logging
         * @param Object options
         */
        _myTrait_._initLogRefresh = function (options) {

          // simple node.js detection
          if (typeof global == "undefined") return;
          if (typeof process == "undefined") return;

          if (_logFileInited) return;

          if (!_fs) _fs = require("fs");

          var secs = options.logFileRefresh || 60;

          _logFileInited = true;
          var me = this;

          later().every(secs, function () {
            // console.log("checking log file "+options.logSettingsFile);
            _fs.readFile(options.logSettingsFile, "utf8", function (err, data) {
              if (err) return;
              try {
                var o = JSON.parse(data);
                if (o && o.enable) {
                  for (var n in o.enable) {
                    if (o.enable.hasOwnProperty(n)) _settings[n] = o.enable[n];
                  }
                }
                if (o) {
                  for (var n in o) {
                    if (o.hasOwnProperty(n)) {
                      if (n == "enable") continue;
                      me._options[n] = o[n];
                    }
                  }
                }
                // console.log(JSON.stringify(o));
              } catch (e) {}
            });
          });
        };

        /**
         * @param float name
         * @param float value
         */
        _myTrait_.addMetrics = function (name, value) {

          if (!_settings[this._tag]) return;

          var mObj = this._metrics[name];

          if (!mObj) {
            mObj = this._metrics[name] = {
              cnt: 0,
              latest: value,
              min: value,
              max: value,
              total: 0
            };
          }

          value = value * 1;

          if (isNaN(value)) return;

          mObj.cnt++;
          mObj.total += value;
          mObj.latest = value;

          if (mObj.max < value) mObj.max = value;
          if (mObj.min > value) mObj.min = value;

          mObj.avg = mObj.total / mObj.cnt;
        };

        /**
         * @param float obj
         */
        _myTrait_.enable = function (obj) {

          if (obj) {

            if (obj) {
              for (var n in obj) {
                if (obj.hasOwnProperty(n)) _settings[n] = obj[n];
              }
            }
          }
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (tag, options) {

          options = options || {};

          this._tag = tag;
          this._log = [];

          if (!_options) {
            _options = {}; // global fo this class
          }

          this._options = _options;

          if (typeof global != "undefined" && typeof process != "undefined") {
            this._isNode = true;
          }

          for (var n in options) {
            if (n == "enable") continue;
            if (options.hasOwnProperty(n)) _options[n] = options[n];
          }

          options.logInterval = options.logInterval || 1;
          options.metricsInterval = options.metricsInterval || 10;

          // logging certain performance charateristics
          this._metrics = {};

          if (!_settings) {
            _settings = {};
          }

          if (options.enable) {
            for (var n in options.enable) {
              if (options.enable.hasOwnProperty(n)) _settings[n] = options.enable[n];
            }
          }

          if (options.logSettingsFile) {
            this._initLogRefresh(options);
          }

          var me = this;

          var _log1 = function _log1() {

            if (!_settings[me._tag]) return;
            if (me._log.length == 0) return;

            if (me._options["logFile"] && me._isNode) {
              if (!_fs) _fs = require("fs");
              var str = "";
              me._log.forEach(function (c, line) {
                if (line > 0) str += "\n";
                c.forEach(function (s, i) {
                  if (i > 0) str += ",";
                  if (me.isObject(s)) {
                    str += "[Object]";
                    return;
                  }
                  if (me.isArray(s)) {
                    str += "[Array]";
                    return;
                  }
                  str += JSON.stringify(s);
                });
              });
              str += "\n";
              _fs.appendFile(me._options["logFile"], str, function (err) {});
            }

            if (me._options["console"]) {
              if (!console.group) {
                console.log("--- " + me._tag + " ----- ");
                me._log.forEach(function (c) {
                  if (c.length == 1) console.log(c[0]);
                  if (c.length == 2) console.log(c[0], c[1]);
                  if (c.length == 3) console.log(c[0], c[1], c[2]);
                  if (c.length == 4) console.log(c[0], c[1], c[2], c[3]);
                });
                me._log.length = 0;
                return;
              }

              console.group(me._tag);
              me._log.forEach(function (c) {
                if (c.length == 1) console.log(c[0]);
                if (c.length == 2) console.log(c[0], c[1]);
                if (c.length == 3) console.log(c[0], c[1], c[2]);
                if (c.length == 4) console.log(c[0], c[1], c[2], c[3]);
              });
              console.groupEnd();
            }
            me._log.length = 0;
          };

          var _log2 = function _log2() {

            if (!_settings[me._tag]) return;
            if (!me._options["console"]) return;

            if (me._logMemoryCnt && me._logMemoryCnt > 0) {
              me._logMemoryCnt--;
              if (process && process.memoryUsage) {
                var util = require("util");

                // var o = JSON.parse( util.inspect(process.memoryUsage()) );
                var o = process.memoryUsage();

                me.value("rss", o["rss"]);
                me.value("heapTotal", o.heapTotal);
                me.value("heapUsed", o.heapUsed);
                me.value("heapUsage", parseInt(100 * o.heapUsed / o.heapTotal));
                me.value("fromTotalGb", parseFloat(100 * o.heapTotal / (1024 * 1024 * 1024)).toFixed(2));
                /*
                { rss: 4935680,
                heapTotal: 1826816,
                heapUsed: 650472 }            
                */
              }
              // process.memoryUsage()
            }

            if (console && console.group) {
              console.group("Metrics");
              console.table(me._metrics, ["cnt", "latest", "min", "max", "avg"]);
              console.groupEnd();
            } else {
              var mCnt = 0;
              for (var n in me._metrics) {
                mCnt++;
                if (mCnt == 1) console.log("=== node.js METRICS ===");
                var o = me._metrics[n];
                console.log(n, o["cnt"], o["latest"], o["min"], o["max"], o["avg"]);
              }
            }
          };

          later().every(options.logInterval, _log1);
          later().every(options.metricsInterval, _log2);
        });

        /**
         * @param float t
         */
        _myTrait_.log = function (t) {

          if (!_settings[this._tag]) {
            return;
          }

          var data = [];
          // iterate through the arguments array...
          for (var i = 0; i < arguments.length; i++) {
            data.push(arguments[i]);
          }
          this._log.push(data);
        };

        /**
         * @param float cnt
         */
        _myTrait_.recordHeap = function (cnt) {
          this._logMemoryCnt = cnt;
        };

        /**
         * @param Object obj
         */
        _myTrait_.settings = function (obj) {

          if (obj) {

            if (obj) {
              for (var n in obj) {
                if (obj.hasOwnProperty(n)) _settings[n] = obj[n];
              }
            }
          }
        };

        /**
         * @param float name
         * @param float value
         */
        _myTrait_.value = function (name, value) {
          this.addMetrics(name, value);
        };
      })(this);
    };

    var lokki = function lokki(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof lokki) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != lokki._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new lokki(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    lokki._classInfo = {
      name: "lokki"
    };
    lokki.prototype = new lokki_prototype();

    (function () {
      if (typeof define !== "undefined" && define !== null && define.amd != null) {
        __amdDefs__["lokki"] = lokki;
        this.lokki = lokki;
      } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
        module.exports["lokki"] = lokki;
      } else {
        this.lokki = lokki;
      }
    }).call(new Function("return this")());

    (function (_myTrait_) {

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {});
    })(this);
  };

  var lokkiLoki = function lokkiLoki(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof lokkiLoki) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != lokkiLoki._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new lokkiLoki(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  lokkiLoki._classInfo = {
    name: "lokkiLoki"
  };
  lokkiLoki.prototype = new lokkiLoki_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["lokkiLoki"] = lokkiLoki;
      this.lokkiLoki = lokkiLoki;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["lokkiLoki"] = lokkiLoki;
    } else {
      this.lokkiLoki = lokkiLoki;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());

// --- let's not ---