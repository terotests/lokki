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

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty("__factoryClass")) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id) {
          if (!id) return;

          if (!_instanceCache) _instanceCache = {};
          if (_instanceCache[id]) return _instanceCache[id];
          _instanceCache[id] = this;
        });

        /**
         * @param float name
         * @param float value
         */
        _myTrait_.addMetrics = function (name, value) {

          var mObj = this._metrics[name];

          console.log(name, value);

          if (!mObj) {
            mObj = this._metrics[name] = {
              cnt: 0,
              min: value,
              max: value,
              total: 0
            };
          }

          mObj.cnt++;
          mObj.total += value;

          if (mObj.max < value) mObj.max = value;
          if (mObj.min > value) mObj.min = value;

          mObj.avg = mObj.total / mObj.cnt;

          console.log(name, mObj.total);
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (tag, options) {

          this._tag = tag;
          this._log = [];

          // logging certain performance charateristics
          this._metrics = {};

          var me = this;
          later().every(1 / 5, function () {

            if (me._log.length == 0) return;
            if (!console.group) return;

            console.group(me._tag);
            me._log.forEach(function (c) {
              if (c.length == 1) console.log(c[0]);
              if (c.length == 2) console.log(c[0], c[1]);
              if (c.length == 3) console.log(c[0], c[1], c[2]);
              if (c.length == 4) console.log(c[0], c[1], c[2], c[3]);
            });
            me._log.length = 0;
            console.groupEnd();
          });

          later().every(1 / 5, function () {

            if (me._logMemoryCnt && me._logMemoryCnt > 0) {
              me._logMemoryCnt--;
              if (process && process.memoryUsage) {
                var util = require("util");

                // var o = JSON.parse( util.inspect(process.memoryUsage()) );
                var o = process.memoryUsage();
                console.log("process mem ", o);
                console.log("process rss = ", o.rss);
                me.value("rss", o["rss"]);
                me.value("heapTotal", o.heapTotal);
                me.value("heapUsed", o.heapUsed);
                me.value("heapUsage", parseInt(100 * o.heapUsed / o.heapTotal));
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
              console.table(me._metrics, ["cnt", "min", "max", "avg"]);
              console.groupEnd();
            } else {
              for (var n in me._metrics) {
                var o = me._metrics[n];
                console.log(n, o["cnt"], o["min"], o["max"], o["avg"]);
              }
            }
          });
        });

        /**
         * @param float t
         */
        _myTrait_.log = function (t) {

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