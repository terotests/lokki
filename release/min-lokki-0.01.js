(function(){var t={},n=function(){var n=function(){!function(t){var n,e,i,o,r;t.add=function(t,n,i){if(n||i){var o;"[object Array]"===Object.prototype.toString.call(i)?o=i:(o=Array.prototype.slice.call(arguments,2),o||(o=[])),e.push([n,t,o])}else e.push(t)},t.after=function(t,n,e){e||(e="time"+(new Date).getTime()+Math.random(1e7)),o[e]={step:Math.floor(1e3*t),fn:n,nextTime:0,remove:!0}},t.asap=function(t){this.add(t)},t.every=function(t,n,e){e||(e="time"+(new Date).getTime()+Math.random(1e7)),o[e]={step:Math.floor(1e3*t),fn:n,nextTime:0}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){if(!n){this.polyfill();var t,a;if("undefined"!=typeof window){var t=window.requestAnimationFrame,a=window.cancelRequestAnimationFrame;["","ms","moz","webkit","o"].forEach(function(n){t||(t=window[n+"RequestAnimationFrame"],a=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"])})}t||(t=function(t){return setTimeout(t,16)}),a||(a=function(t){clearTimeout(t)}),e=[],i={},o={},r=[];var s=0,l=function(){for(var n,a=(new Date).getTime();n=e.shift();)"[object Array]"===Object.prototype.toString.call(n)?n[1].apply(n[0],n[2]):n();for(var c=0;c<r.length;c++){var f=r[c];f()}for(var u in i)if(i.hasOwnProperty(u)){var _=i[u];_[0](_[1]),delete i[u]}for(var u in o)if(o.hasOwnProperty(u)){var _=o[u];_.nextTime<a&&(_.remove?_.nextTime>0?(_.fn(),delete o[u]):_.nextTime=a+_.step:(_.fn(),_.nextTime=a+_.step)),_.until&&_.until<a&&delete o[u]}t(l),s=a};l(),n=!0}}),t.once=function(t,n,e){i[t]=[n,e]},t.onFrame=function(t){r.push(t)},t.polyfill=function(){},t.removeFrameFn=function(t){var n=r.indexOf(t);return n>=0?(t._onRemove&&t._onRemove(),r.splice(n,1),!0):!1}}(this)},e=function(t,n,i,o,r,a,s,l){var c,f=this;if(!(f instanceof e))return new e(t,n,i,o,r,a,s,l);var u=[t,n,i,o,r,a,s,l];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,u)}),"function"==typeof c){if(c._classInfo.name!=e._classInfo.name)return new c(t,n,i,o,r,a,s,l)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,u)}):"function"==typeof f.init&&f.init.apply(f,u)};e._classInfo={name:"later"},e.prototype=new n;var i=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return t instanceof Array},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var n;t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t){return t?(n||(n={}),n[t]?n[t]:void(n[t]=this)):void 0}),t.addMetrics=function(t,n){var e=this._metrics[t];console.log(t,n),e||(e=this._metrics[t]={cnt:0,min:n,max:n,total:0}),e.cnt++,e.total+=n,e.max<n&&(e.max=n),e.min>n&&(e.min=n),e.avg=e.total/e.cnt,console.log(t,e.total)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){this._tag=t,this._log=[],this._metrics={};var n=this;e().every(.2,function(){0!=n._log.length&&console.group&&(console.group(n._tag),n._log.forEach(function(t){1==t.length&&console.log(t[0]),2==t.length&&console.log(t[0],t[1]),3==t.length&&console.log(t[0],t[1],t[2]),4==t.length&&console.log(t[0],t[1],t[2],t[3])}),n._log.length=0,console.groupEnd())}),e().every(.2,function(){if(n._logMemoryCnt&&n._logMemoryCnt>0&&(n._logMemoryCnt--,process&&process.memoryUsage)){var t=(require("util"),process.memoryUsage());console.log("process mem ",t),console.log("process rss = ",t.rss),n.value("rss",t.rss),n.value("heapTotal",t.heapTotal),n.value("heapUsed",t.heapUsed),n.value("heapUsage",parseInt(100*t.heapUsed/t.heapTotal))}if(console&&console.group)console.group("Metrics"),console.table(n._metrics,["cnt","min","max","avg"]),console.groupEnd();else for(var e in n._metrics){var t=n._metrics[e];console.log(e,t.cnt,t.min,t.max,t.avg)}})}),t.log=function(){for(var t=[],n=0;n<arguments.length;n++)t.push(arguments[n]);this._log.push(t)},t.recordHeap=function(t){this._logMemoryCnt=t},t.value=function(t,n){this.addMetrics(t,n)}}(this)},o=function(t,n,e,i,r,a,s,l){var c,f=this;if(!(f instanceof o))return new o(t,n,e,i,r,a,s,l);var u=[t,n,e,i,r,a,s,l];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,u)}),"function"==typeof c){if(c._classInfo.name!=o._classInfo.name)return new c(t,n,e,i,r,a,s,l)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,u)}):"function"==typeof f.init&&f.init.apply(f,u)};o._classInfo={name:"lokki"},o.prototype=new i,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.lokki=o,this.lokki=o):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.lokki=o:this.lokki=o}.call(new Function("return this")()),function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},e=function(t,n,i,o,r,a,s,l){var c,f=this;if(!(f instanceof e))return new e(t,n,i,o,r,a,s,l);var u=[t,n,i,o,r,a,s,l];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,u)}),"function"==typeof c){if(c._classInfo.name!=e._classInfo.name)return new c(t,n,i,o,r,a,s,l)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,u)}):"function"==typeof f.init&&f.init.apply(f,u)};e._classInfo={name:"lokkiLoki"},e.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.lokkiLoki=e,this.lokkiLoki=e):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.lokkiLoki=e:this.lokkiLoki=e}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());