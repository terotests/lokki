# Lokki lokinpoikanen

A logging module for in-browser and node.js testing

## Setup

## Running

```javascript
// examples and docs coming later on.
```

# Licence

MIT.
























   

 


   
#### Class lokkiLoki





   
    
    
    
    


   
      
            
#### Class later


- [add](README.md#later_add)
- [after](README.md#later_after)
- [asap](README.md#later_asap)
- [every](README.md#later_every)
- [once](README.md#later_once)
- [onFrame](README.md#later_onFrame)
- [polyfill](README.md#later_polyfill)
- [removeFrameFn](README.md#later_removeFrameFn)



   


   



      
    
      
            
#### Class lokki


- [_classFactory](README.md#lokki__classFactory)
- [addMetrics](README.md#lokki_addMetrics)
- [log](README.md#lokki_log)
- [recordHeap](README.md#lokki_recordHeap)
- [value](README.md#lokki_value)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    





   
# Class lokkiLoki


The class has following internal singleton variables:
        
        
### lokkiLoki::constructor( options )

```javascript

```
        


   
    
    
    
    


   
      
            
# Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### <a name="later_add"></a>later::add(fn, thisObj, args)


```javascript
if(thisObj || args) {
   var tArgs;
   if( Object.prototype.toString.call( args ) === '[object Array]' ) {
       tArgs = args;
   } else {
       tArgs = Array.prototype.slice.call(arguments, 2);
       if(!tArgs) tArgs = [];
   }
   _callers.push([thisObj, fn, tArgs]);   
} else {
    _callers.push(fn);
}
```

### <a name="later_after"></a>later::after(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0,
    remove : true
};
```

### <a name="later_asap"></a>later::asap(fn)


```javascript
this.add(fn);

```

### <a name="later_every"></a>later::every(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0
};
```

### later::constructor( interval, fn )

```javascript
if(!_initDone) {
    
   this.polyfill();
 
   var frame, cancelFrame;
   if(typeof(window) != "undefined") {
       var frame = window['requestAnimationFrame'], 
           cancelFrame= window['cancelRequestAnimationFrame'];
       ['', 'ms', 'moz', 'webkit', 'o'].forEach( function(x) { 
           if(!frame) {
            frame = window[x+'RequestAnimationFrame'];
            cancelFrame = window[x+'CancelAnimationFrame'] 
                                       || window[x+'CancelRequestAnimationFrame'];
           }
        });
   }
 
    if (!frame)
        frame= function(cb) {
            return setTimeout(cb, 16);
        };
 
    if (!cancelFrame)
        cancelFrame = function(id) {
            clearTimeout(id);
        };    
        
    _callers = [];
    _oneTimers = {};
    _everies = {};
    _framers = [];
    var lastMs = 0;
    
    var _callQueQue = function() {
       var ms = (new Date()).getTime();
       var fn;
       while(fn=_callers.shift()) {
          if(Object.prototype.toString.call( fn ) === '[object Array]' ) {
              fn[1].apply(fn[0], fn[2]);
          } else {
              fn();
          }
           
       }
       
       for(var i=0; i<_framers.length;i++) {
           var fFn = _framers[i];
           fFn();
       }
       
       for(var n in _oneTimers) {
           if(_oneTimers.hasOwnProperty(n)) {
               var v = _oneTimers[n];
               v[0](v[1]);
               delete _oneTimers[n];
           }
       }
       
       for(var n in _everies) {
           if(_everies.hasOwnProperty(n)) {
               var v = _everies[n];
               if(v.nextTime < ms) {
                   if(v.remove) {
                       if(v.nextTime > 0) {
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
               if(v.until) {
                   if(v.until < ms) {
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
```
        
### <a name="later_once"></a>later::once(key, fn, value)


```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### <a name="later_onFrame"></a>later::onFrame(fn)


```javascript

_framers.push(fn);
```

### <a name="later_polyfill"></a>later::polyfill(t)


```javascript
// --- let's not ---
```

### <a name="later_removeFrameFn"></a>later::removeFrameFn(fn)


```javascript

var i = _framers.indexOf(fn);
if(i>=0) {
    if(fn._onRemove) {
        fn._onRemove();
    }
    _framers.splice(i,1);
    return true;
} else {
    return false;
}
```



   


   



      
    
      
            
# Class lokki


The class has following internal singleton variables:
        
* _instanceCache
        
        
### <a name="lokki__classFactory"></a>lokki::_classFactory(id)


```javascript
if(!id) return;

if(!_instanceCache) _instanceCache = {};
if(_instanceCache[id]) return _instanceCache[id];
_instanceCache[id] = this;
```

### <a name="lokki_addMetrics"></a>lokki::addMetrics(name, value)


```javascript

var mObj = this._metrics[name];

if(!mObj) {
    mObj = this._metrics[name] = {
        cnt : 0,
        min : value,
        max : value,
        total : 0
    };
}

mObj.cnt++;
mObj.total += value;

if(mObj.max < value) mObj.max = value;
if(mObj.min > value) mObj.min = value;

mObj.avg = mObj.total / mObj.cnt;

```

### lokki::constructor( tag, options )

```javascript

this._tag = tag;
this._log = [];

// logging certain performance charateristics
this._metrics = {};

var me = this;
later().every(1/5, function() {
    
    if(me._log.length==0) return;
    
    console.group(me._tag);
    me._log.forEach( function(c) {
        if(c.length==1) console.log(c[0]); 
        if(c.length==2) console.log(c[0],c[1]); 
        if(c.length==3) console.log(c[0],c[1],c[2]); 
        if(c.length==4) console.log(c[0],c[1],c[2],c[3]); 
    });
    me._log.length=0;
    console.groupEnd();
});

later().every(1/5, function() {
    
    if(me._logMemoryCnt && me._logMemoryCnt > 0) {
        me._logMemoryCnt--;
        if(process && process.memoryUsage) {
            var util = require('util');
            
            var o = util.inspect(process.memoryUsage());            
            me.value("rss", o.rss);
            me.value("heapTotal", o.heapTotal);
            me.value("heapUsed", o.heapUsed);
            /*
{ rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472 }            
            */
        }
        // process.memoryUsage()
    }
    
    console.group("Metrics");
    console.table(me._metrics, ["cnt", "min", "max", "avg"]);
    console.groupEnd();
    
});
```
        
### <a name="lokki_log"></a>lokki::log(t)


```javascript

var data = [];
// iterate through the arguments array...
for(var i=0; i<arguments.length; i++) {
    data.push(arguments[i]);
}
this._log.push( data );
```

### <a name="lokki_recordHeap"></a>lokki::recordHeap(cnt)


```javascript
this._logMemoryCnt = cnt;
```

### <a name="lokki_value"></a>lokki::value(name, value)


```javascript
this.addMetrics(name, value);
```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript
return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return t instanceof Array;
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    




