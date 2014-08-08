// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; try { args.callee = f.caller } catch(e) {}; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.









/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9999.8 (26-OCT-2012)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($, undefined) {
"use strict";

var ver = '2.9999.8';

// if $.support is not defined (pre jQuery 1.3) add what I need
if ($.support === undefined) {
  $.support = {
    opacity: !($.browser.msie)
  };
}

function debug(s) {
  if ($.fn.cycle.debug)
    log(s);
}   
function log() {
  if (window.console && console.log)
    console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
  return el.cyclePause;
};


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//   that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
  var o = { s: this.selector, c: this.context };

  // in 1.3+ we can fix mistakes with the ready state
  if (this.length === 0 && options != 'stop') {
    if (!$.isReady && o.s) {
      log('DOM not ready, queuing slideshow');
      $(function() {
        $(o.s,o.c).cycle(options,arg2);
      });
      return this;
    }
    // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
    log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
    return this;
  }

  // iterate the matched nodeset
  return this.each(function() {
    var opts = handleArguments(this, options, arg2);
    if (opts === false)
      return;

    opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
    
    // stop existing slideshow for this container (if there is one)
    if (this.cycleTimeout)
      clearTimeout(this.cycleTimeout);
    this.cycleTimeout = this.cyclePause = 0;
    this.cycleStop = 0; // issue #108

    var $cont = $(this);
    var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
    var els = $slides.get();

    if (els.length < 2) {
      log('terminating; too few slides: ' + els.length);
      return;
    }

    var opts2 = buildOptions($cont, $slides, els, opts, o);
    if (opts2 === false)
      return;

    var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

    // if it's an auto slideshow, kick it off
    if (startTime) {
      startTime += (opts2.delay || 0);
      if (startTime < 10)
        startTime = 10;
      debug('first timeout: ' + startTime);
      this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards);}, startTime);
    }
  });
};

function triggerPause(cont, byHover, onPager) {
  var opts = $(cont).data('cycle.opts');
  if (!opts)
    return;
  var paused = !!cont.cyclePause;
  if (paused && opts.paused)
    opts.paused(cont, opts, byHover, onPager);
  else if (!paused && opts.resumed)
    opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
  if (cont.cycleStop === undefined)
    cont.cycleStop = 0;
  if (options === undefined || options === null)
    options = {};
  if (options.constructor == String) {
    switch(options) {
    case 'destroy':
    case 'stop':
      var opts = $(cont).data('cycle.opts');
      if (!opts)
        return false;
      cont.cycleStop++; // callbacks look for change
      if (cont.cycleTimeout)
        clearTimeout(cont.cycleTimeout);
      cont.cycleTimeout = 0;
      if (opts.elements)
        $(opts.elements).stop();
      $(cont).removeData('cycle.opts');
      if (options == 'destroy')
        destroy(cont, opts);
      return false;
    case 'toggle':
      cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
      checkInstantResume(cont.cyclePause, arg2, cont);
      triggerPause(cont);
      return false;
    case 'pause':
      cont.cyclePause = 1;
      triggerPause(cont);
      return false;
    case 'resume':
      cont.cyclePause = 0;
      checkInstantResume(false, arg2, cont);
      triggerPause(cont);
      return false;
    case 'prev':
    case 'next':
      opts = $(cont).data('cycle.opts');
      if (!opts) {
        log('options not found, "prev/next" ignored');
        return false;
      }
      $.fn.cycle[options](opts);
      return false;
    default:
      options = { fx: options };
    }
    return options;
  }
  else if (options.constructor == Number) {
    // go to the requested slide
    var num = options;
    options = $(cont).data('cycle.opts');
    if (!options) {
      log('options not found, can not advance slide');
      return false;
    }
    if (num < 0 || num >= options.elements.length) {
      log('invalid slide index: ' + num);
      return false;
    }
    options.nextSlide = num;
    if (cont.cycleTimeout) {
      clearTimeout(cont.cycleTimeout);
      cont.cycleTimeout = 0;
    }
    if (typeof arg2 == 'string')
      options.oneTimeFx = arg2;
    go(options.elements, options, 1, num >= options.currSlide);
    return false;
  }
  return options;
  
  function checkInstantResume(isPaused, arg2, cont) {
    if (!isPaused && arg2 === true) { // resume now!
      var options = $(cont).data('cycle.opts');
      if (!options) {
        log('options not found, can not resume');
        return false;
      }
      if (cont.cycleTimeout) {
        clearTimeout(cont.cycleTimeout);
        cont.cycleTimeout = 0;
      }
      go(options.elements, options, 1, !options.backwards);
    }
  }
}

function removeFilter(el, opts) {
  if (!$.support.opacity && opts.cleartype && el.style.filter) {
    try { el.style.removeAttribute('filter'); }
    catch(smother) {} // handle old opera versions
  }
}

// unbind event handlers
function destroy(cont, opts) {
  if (opts.next)
    $(opts.next).unbind(opts.prevNextEvent);
  if (opts.prev)
    $(opts.prev).unbind(opts.prevNextEvent);
  
  if (opts.pager || opts.pagerAnchorBuilder)
    $.each(opts.pagerAnchors || [], function() {
      this.unbind().remove();
    });
  opts.pagerAnchors = null;
  $(cont).unbind('mouseenter.cycle mouseleave.cycle');
  if (opts.destroy) // callback
    opts.destroy(opts);
}

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
  var startingSlideSpecified;
  // support metadata plugin (v1.0 and v2.0)
  var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
  var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
  if (meta)
    opts = $.extend(opts, meta);
  if (opts.autostop)
    opts.countdown = opts.autostopCount || els.length;

  var cont = $cont[0];
  $cont.data('cycle.opts', opts);
  opts.$cont = $cont;
  opts.stopCount = cont.cycleStop;
  opts.elements = els;
  opts.before = opts.before ? [opts.before] : [];
  opts.after = opts.after ? [opts.after] : [];

  // push some after callbacks
  if (!$.support.opacity && opts.cleartype)
    opts.after.push(function() { removeFilter(this, opts); });
  if (opts.continuous)
    opts.after.push(function() { go(els,opts,0,!opts.backwards); });

  saveOriginalOpts(opts);

  // clearType corrections
  if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
    clearTypeFix($slides);

  // container requires non-static position so that slides can be position within
  if ($cont.css('position') == 'static')
    $cont.css('position', 'relative');
  if (opts.width)
    $cont.width(opts.width);
  if (opts.height && opts.height != 'auto')
    $cont.height(opts.height);

  if (opts.startingSlide !== undefined) {
    opts.startingSlide = parseInt(opts.startingSlide,10);
    if (opts.startingSlide >= els.length || opts.startSlide < 0)
      opts.startingSlide = 0; // catch bogus input
    else 
      startingSlideSpecified = true;
  }
  else if (opts.backwards)
    opts.startingSlide = els.length - 1;
  else
    opts.startingSlide = 0;

  // if random, mix up the slide array
  if (opts.random) {
    opts.randomMap = [];
    for (var i = 0; i < els.length; i++)
      opts.randomMap.push(i);
    opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
    if (startingSlideSpecified) {
      // try to find the specified starting slide and if found set start slide index in the map accordingly
      for ( var cnt = 0; cnt < els.length; cnt++ ) {
        if ( opts.startingSlide == opts.randomMap[cnt] ) {
          opts.randomIndex = cnt;
        }
      }
    }
    else {
      opts.randomIndex = 1;
      opts.startingSlide = opts.randomMap[1];
    }
  }
  else if (opts.startingSlide >= els.length)
    opts.startingSlide = 0; // catch bogus input
  opts.currSlide = opts.startingSlide || 0;
  var first = opts.startingSlide;

  // set position and zIndex on all the slides
  $slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
    var z;
    if (opts.backwards)
      z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
    else
      z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
    $(this).css('z-index', z);
  });

  // make sure first slide is visible
  $(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
  removeFilter(els[first], opts);

  // stretch slides
  if (opts.fit) {
    if (!opts.aspect) {
          if (opts.width)
              $slides.width(opts.width);
          if (opts.height && opts.height != 'auto')
              $slides.height(opts.height);
    } else {
      $slides.each(function(){
        var $slide = $(this);
        var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
        if( opts.width && $slide.width() != opts.width ) {
          $slide.width( opts.width );
          $slide.height( opts.width / ratio );
        }

        if( opts.height && $slide.height() < opts.height ) {
          $slide.height( opts.height );
          $slide.width( opts.height * ratio );
        }
      });
    }
  }

  if (opts.center && ((!opts.fit) || opts.aspect)) {
    $slides.each(function(){
      var $slide = $(this);
      $slide.css({
        "margin-left": opts.width ?
          ((opts.width - $slide.width()) / 2) + "px" :
          0,
        "margin-top": opts.height ?
          ((opts.height - $slide.height()) / 2) + "px" :
          0
      });
    });
  }

  if (opts.center && !opts.fit && !opts.slideResize) {
    $slides.each(function(){
      var $slide = $(this);
      $slide.css({
        "margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
        "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
      });
    });
  }
    
  // stretch container
  var reshape = (opts.containerResize || opts.containerResizeHeight) && !$cont.innerHeight();
  if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
    var maxw = 0, maxh = 0;
    for(var j=0; j < els.length; j++) {
      var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
      if (!w) w = e.offsetWidth || e.width || $e.attr('width');
      if (!h) h = e.offsetHeight || e.height || $e.attr('height');
      maxw = w > maxw ? w : maxw;
      maxh = h > maxh ? h : maxh;
    }
    if (opts.containerResize && maxw > 0 && maxh > 0)
      $cont.css({width:maxw+'px',height:maxh+'px'});
    if (opts.containerResizeHeight && maxh > 0)
      $cont.css({height:maxh+'px'});
  }

  var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
  if (opts.pause)
    $cont.bind('mouseenter.cycle', function(){
      pauseFlag = true;
      this.cyclePause++;
      triggerPause(cont, true);
    }).bind('mouseleave.cycle', function(){
        if (pauseFlag)
          this.cyclePause--;
        triggerPause(cont, true);
    });

  if (supportMultiTransitions(opts) === false)
    return false;

  // apparently a lot of people use image slideshows without height/width attributes on the images.
  // Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
  var requeue = false;
  options.requeueAttempts = options.requeueAttempts || 0;
  $slides.each(function() {
    // try to get height/width of each slide
    var $el = $(this);
    this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
    this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

    if ( $el.is('img') ) {
      // sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
      // an image is being downloaded and the markup did not include sizing info (height/width attributes);
      // there seems to be some "default" sizes used in this situation
      var loadingIE = ($.browser.msie  && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
      var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
      var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
      var loadingOther = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
      // don't requeue for images that are still loading but have a valid size
      if (loadingIE || loadingFF || loadingOp || loadingOther) {
        if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
          log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
          setTimeout(function() {$(o.s,o.c).cycle(options);}, opts.requeueTimeout);
          requeue = true;
          return false; // break each loop
        }
        else {
          log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
        }
      }
    }
    return true;
  });

  if (requeue)
    return false;

  opts.cssBefore = opts.cssBefore || {};
  opts.cssAfter = opts.cssAfter || {};
  opts.cssFirst = opts.cssFirst || {};
  opts.animIn = opts.animIn || {};
  opts.animOut = opts.animOut || {};

  $slides.not(':eq('+first+')').css(opts.cssBefore);
  $($slides[first]).css(opts.cssFirst);

  if (opts.timeout) {
    opts.timeout = parseInt(opts.timeout,10);
    // ensure that timeout and speed settings are sane
    if (opts.speed.constructor == String)
      opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
    if (!opts.sync)
      opts.speed = opts.speed / 2;
    
    var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
    while((opts.timeout - opts.speed) < buffer) // sanitize timeout
      opts.timeout += opts.speed;
  }
  if (opts.easing)
    opts.easeIn = opts.easeOut = opts.easing;
  if (!opts.speedIn)
    opts.speedIn = opts.speed;
  if (!opts.speedOut)
    opts.speedOut = opts.speed;

  opts.slideCount = els.length;
  opts.currSlide = opts.lastSlide = first;
  if (opts.random) {
    if (++opts.randomIndex == els.length)
      opts.randomIndex = 0;
    opts.nextSlide = opts.randomMap[opts.randomIndex];
  }
  else if (opts.backwards)
    opts.nextSlide = opts.startingSlide === 0 ? (els.length-1) : opts.startingSlide-1;
  else
    opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

  // run transition init fn
  if (!opts.multiFx) {
    var init = $.fn.cycle.transitions[opts.fx];
    if ($.isFunction(init))
      init($cont, $slides, opts);
    else if (opts.fx != 'custom' && !opts.multiFx) {
      log('unknown transition: ' + opts.fx,'; slideshow terminating');
      return false;
    }
  }

  // fire artificial events
  var e0 = $slides[first];
  if (!opts.skipInitializationCallbacks) {
    if (opts.before.length)
      opts.before[0].apply(e0, [e0, e0, opts, true]);
    if (opts.after.length)
      opts.after[0].apply(e0, [e0, e0, opts, true]);
  }
  if (opts.next)
    $(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});
  if (opts.prev)
    $(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});
  if (opts.pager || opts.pagerAnchorBuilder)
    buildPager(els,opts);

  exposeAddSlide(opts, els);

  return opts;
}

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
  opts.original = { before: [], after: [] };
  opts.original.cssBefore = $.extend({}, opts.cssBefore);
  opts.original.cssAfter  = $.extend({}, opts.cssAfter);
  opts.original.animIn  = $.extend({}, opts.animIn);
  opts.original.animOut   = $.extend({}, opts.animOut);
  $.each(opts.before, function() { opts.original.before.push(this); });
  $.each(opts.after,  function() { opts.original.after.push(this); });
}

function supportMultiTransitions(opts) {
  var i, tx, txs = $.fn.cycle.transitions;
  // look for multiple effects
  if (opts.fx.indexOf(',') > 0) {
    opts.multiFx = true;
    opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
    // discard any bogus effect names
    for (i=0; i < opts.fxs.length; i++) {
      var fx = opts.fxs[i];
      tx = txs[fx];
      if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
        log('discarding unknown transition: ',fx);
        opts.fxs.splice(i,1);
        i--;
      }
    }
    // if we have an empty list then we threw everything away!
    if (!opts.fxs.length) {
      log('No valid transitions named; slideshow terminating.');
      return false;
    }
  }
  else if (opts.fx == 'all') {  // auto-gen the list of transitions
    opts.multiFx = true;
    opts.fxs = [];
    for (var p in txs) {
      if (txs.hasOwnProperty(p)) {
        tx = txs[p];
        if (txs.hasOwnProperty(p) && $.isFunction(tx))
          opts.fxs.push(p);
      }
    }
  }
  if (opts.multiFx && opts.randomizeEffects) {
    // munge the fxs array to make effect selection random
    var r1 = Math.floor(Math.random() * 20) + 30;
    for (i = 0; i < r1; i++) {
      var r2 = Math.floor(Math.random() * opts.fxs.length);
      opts.fxs.push(opts.fxs.splice(r2,1)[0]);
    }
    debug('randomized fx sequence: ',opts.fxs);
  }
  return true;
}

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
  opts.addSlide = function(newSlide, prepend) {
    var $s = $(newSlide), s = $s[0];
    if (!opts.autostopCount)
      opts.countdown++;
    els[prepend?'unshift':'push'](s);
    if (opts.els)
      opts.els[prepend?'unshift':'push'](s); // shuffle needs this
    opts.slideCount = els.length;

    // add the slide to the random map and resort
    if (opts.random) {
      opts.randomMap.push(opts.slideCount-1);
      opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
    }

    $s.css('position','absolute');
    $s[prepend?'prependTo':'appendTo'](opts.$cont);

    if (prepend) {
      opts.currSlide++;
      opts.nextSlide++;
    }

    if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
      clearTypeFix($s);

    if (opts.fit && opts.width)
      $s.width(opts.width);
    if (opts.fit && opts.height && opts.height != 'auto')
      $s.height(opts.height);
    s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
    s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

    $s.css(opts.cssBefore);

    if (opts.pager || opts.pagerAnchorBuilder)
      $.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

    if ($.isFunction(opts.onAddSlide))
      opts.onAddSlide($s);
    else
      $s.hide(); // default behavior
  };
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
  fx = fx || opts.fx;
  opts.before = []; opts.after = [];
  opts.cssBefore = $.extend({}, opts.original.cssBefore);
  opts.cssAfter  = $.extend({}, opts.original.cssAfter);
  opts.animIn = $.extend({}, opts.original.animIn);
  opts.animOut   = $.extend({}, opts.original.animOut);
  opts.fxFn = null;
  $.each(opts.original.before, function() { opts.before.push(this); });
  $.each(opts.original.after,  function() { opts.after.push(this); });

  // re-init
  var init = $.fn.cycle.transitions[fx];
  if ($.isFunction(init))
    init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
  var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

  // opts.busy is true if we're in the middle of an animation
  if (manual && opts.busy && opts.manualTrump) {
    // let manual transitions requests trump active ones
    debug('manualTrump in go(), stopping active transition');
    $(els).stop(true,true);
    opts.busy = 0;
    clearTimeout(p.cycleTimeout);
  }

  // don't begin another timeout-based transition if there is one active
  if (opts.busy) {
    debug('transition active, ignoring new tx request');
    return;
  }


  // stop cycling if we have an outstanding stop request
  if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
    return;

  // check to see if we should stop cycling based on autostop options
  if (!manual && !p.cyclePause && !opts.bounce &&
    ((opts.autostop && (--opts.countdown <= 0)) ||
    (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
    if (opts.end)
      opts.end(opts);
    return;
  }

  // if slideshow is paused, only transition on a manual trigger
  var changed = false;
  if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
    changed = true;
    var fx = opts.fx;
    // keep trying to get the slide size if we don't have it yet
    curr.cycleH = curr.cycleH || $(curr).height();
    curr.cycleW = curr.cycleW || $(curr).width();
    next.cycleH = next.cycleH || $(next).height();
    next.cycleW = next.cycleW || $(next).width();

    // support multiple transition types
    if (opts.multiFx) {
      if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length))
        opts.lastFx = 0;
      else if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0))
        opts.lastFx = opts.fxs.length - 1;
      fx = opts.fxs[opts.lastFx];
    }

    // one-time fx overrides apply to:  $('div').cycle(3,'zoom');
    if (opts.oneTimeFx) {
      fx = opts.oneTimeFx;
      opts.oneTimeFx = null;
    }

    $.fn.cycle.resetState(opts, fx);

    // run the before callbacks
    if (opts.before.length)
      $.each(opts.before, function(i,o) {
        if (p.cycleStop != opts.stopCount) return;
        o.apply(next, [curr, next, opts, fwd]);
      });

    // stage the after callacks
    var after = function() {
      opts.busy = 0;
      $.each(opts.after, function(i,o) {
        if (p.cycleStop != opts.stopCount) return;
        o.apply(next, [curr, next, opts, fwd]);
      });
      if (!p.cycleStop) {
        // queue next transition
        queueNext();
      }
    };

    debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
    
    // get ready to perform the transition
    opts.busy = 1;
    if (opts.fxFn) // fx function provided?
      opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
    else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
      $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
    else
      $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
  }
  else {
    queueNext();
  }

  if (changed || opts.nextSlide == opts.currSlide) {
    // calculate the next slide
    var roll;
    opts.lastSlide = opts.currSlide;
    if (opts.random) {
      opts.currSlide = opts.nextSlide;
      if (++opts.randomIndex == els.length) {
        opts.randomIndex = 0;
        opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
      }
      opts.nextSlide = opts.randomMap[opts.randomIndex];
      if (opts.nextSlide == opts.currSlide)
        opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
    }
    else if (opts.backwards) {
      roll = (opts.nextSlide - 1) < 0;
      if (roll && opts.bounce) {
        opts.backwards = !opts.backwards;
        opts.nextSlide = 1;
        opts.currSlide = 0;
      }
      else {
        opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
        opts.currSlide = roll ? 0 : opts.nextSlide+1;
      }
    }
    else { // sequence
      roll = (opts.nextSlide + 1) == els.length;
      if (roll && opts.bounce) {
        opts.backwards = !opts.backwards;
        opts.nextSlide = els.length-2;
        opts.currSlide = els.length-1;
      }
      else {
        opts.nextSlide = roll ? 0 : opts.nextSlide+1;
        opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
      }
    }
  }
  if (changed && opts.pager)
    opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
  
  function queueNext() {
    // stage the next transition
    var ms = 0, timeout = opts.timeout;
    if (opts.timeout && !opts.continuous) {
      ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
         if (opts.fx == 'shuffle')
            ms -= opts.speedOut;
      }
    else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
      ms = 10;
    if (ms > 0)
      p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards); }, ms);
  }
}

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
  if (opts.timeoutFn) {
    // call user provided calc fn
    var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
    while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
      t += opts.speed;
    debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
    if (t !== false)
      return t;
  }
  return opts.timeout;
}

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
  var val = moveForward ? 1 : -1;
  var els = opts.elements;
  var p = opts.$cont[0], timeout = p.cycleTimeout;
  if (timeout) {
    clearTimeout(timeout);
    p.cycleTimeout = 0;
  }
  if (opts.random && val < 0) {
    // move back to the previously display slide
    opts.randomIndex--;
    if (--opts.randomIndex == -2)
      opts.randomIndex = els.length-2;
    else if (opts.randomIndex == -1)
      opts.randomIndex = els.length-1;
    opts.nextSlide = opts.randomMap[opts.randomIndex];
  }
  else if (opts.random) {
    opts.nextSlide = opts.randomMap[opts.randomIndex];
  }
  else {
    opts.nextSlide = opts.currSlide + val;
    if (opts.nextSlide < 0) {
      if (opts.nowrap) return false;
      opts.nextSlide = els.length - 1;
    }
    else if (opts.nextSlide >= els.length) {
      if (opts.nowrap) return false;
      opts.nextSlide = 0;
    }
  }

  var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
  if ($.isFunction(cb))
    cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
  go(els, opts, 1, moveForward);
  return false;
}

function buildPager(els, opts) {
  var $p = $(opts.pager);
  $.each(els, function(i,o) {
    $.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
  });
  opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
}

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
  var a;
  if ($.isFunction(opts.pagerAnchorBuilder)) {
    a = opts.pagerAnchorBuilder(i,el);
    debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
  }
  else
    a = '<a href="#">'+(i+1)+'</a>';
    
  if (!a)
    return;
  var $a = $(a);
  // don't reparent if anchor is in the dom
  if ($a.parents('body').length === 0) {
    var arr = [];
    if ($p.length > 1) {
      $p.each(function() {
        var $clone = $a.clone(true);
        $(this).append($clone);
        arr.push($clone[0]);
      });
      $a = $(arr);
    }
    else {
      $a.appendTo($p);
    }
  }

  opts.pagerAnchors =  opts.pagerAnchors || [];
  opts.pagerAnchors.push($a);
  
  var pagerFn = function(e) {
    e.preventDefault();
    opts.nextSlide = i;
    var p = opts.$cont[0], timeout = p.cycleTimeout;
    if (timeout) {
      clearTimeout(timeout);
      p.cycleTimeout = 0;
    }
    var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
    if ($.isFunction(cb))
      cb(opts.nextSlide, els[opts.nextSlide]);
    go(els,opts,1,opts.currSlide < i); // trigger the trans
//    return false; // <== allow bubble
  };
  
  if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
    $a.hover(pagerFn, function(){/* no-op */} );
  }
  else {
    $a.bind(opts.pagerEvent, pagerFn);
  }
  
  if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
    $a.bind('click.cycle', function(){return false;}); // suppress click
  
  var cont = opts.$cont[0];
  var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
  if (opts.pauseOnPagerHover) {
    $a.hover(
      function() { 
        pauseFlag = true;
        cont.cyclePause++; 
        triggerPause(cont,true,true);
      }, function() { 
        if (pauseFlag)
          cont.cyclePause--; 
        triggerPause(cont,true,true);
      } 
    );
  }
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
  var hops, l = opts.lastSlide, c = opts.currSlide;
  if (fwd)
    hops = c > l ? c - l : opts.slideCount - l;
  else
    hops = c < l ? l - c : l + opts.slideCount - c;
  return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
  debug('applying clearType background-color hack');
  function hex(s) {
    s = parseInt(s,10).toString(16);
    return s.length < 2 ? '0'+s : s;
  }
  function getBg(e) {
    for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
      var v = $.css(e,'background-color');
      if (v && v.indexOf('rgb') >= 0 ) {
        var rgb = v.match(/\d+/g);
        return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
      }
      if (v && v != 'transparent')
        return v;
    }
    return '#ffffff';
  }
  $slides.each(function() { $(this).css('background-color', getBg(this)); });
}

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
  $(opts.elements).not(curr).hide();
  if (typeof opts.cssBefore.opacity == 'undefined')
    opts.cssBefore.opacity = 1;
  opts.cssBefore.display = 'block';
  if (opts.slideResize && w !== false && next.cycleW > 0)
    opts.cssBefore.width = next.cycleW;
  if (opts.slideResize && h !== false && next.cycleH > 0)
    opts.cssBefore.height = next.cycleH;
  opts.cssAfter = opts.cssAfter || {};
  opts.cssAfter.display = 'none';
  $(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
  $(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
  var $l = $(curr), $n = $(next);
  var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
  $n.css(opts.cssBefore);
  if (speedOverride) {
    if (typeof speedOverride == 'number')
      speedIn = speedOut = speedOverride;
    else
      speedIn = speedOut = 1;
    easeIn = easeOut = null;
  }
  var fn = function() {
    $n.animate(opts.animIn, speedIn, easeIn, function() {
      cb();
    });
  };
  $l.animate(opts.animOut, speedOut, easeOut, function() {
    $l.css(opts.cssAfter);
    if (!opts.sync) 
      fn();
  });
  if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
  fade: function($cont, $slides, opts) {
    $slides.not(':eq('+opts.currSlide+')').css('opacity',0);
    opts.before.push(function(curr,next,opts) {
      $.fn.cycle.commonReset(curr,next,opts);
      opts.cssBefore.opacity = 0;
    });
    opts.animIn    = { opacity: 1 };
    opts.animOut   = { opacity: 0 };
    opts.cssBefore = { top: 0, left: 0 };
  }
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
    activePagerClass: 'activeSlide', // class name used for the active pager link
    after:            null,     // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
    allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
    animIn:           null,     // properties that define how the slide animates in
    animOut:          null,     // properties that define how the slide animates out
    aspect:           false,    // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
    autostop:         0,        // true to end slideshow after X transitions (where X == slide count)
    autostopCount:    0,        // number of transitions (optionally used with autostop to define X)
    backwards:        false,    // true to start slideshow at last slide and move backwards through the stack
    before:           null,     // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
    center:           null,     // set to true to have cycle add top/left margin to each slide (use with width and height options)
    cleartype:        !$.support.opacity,  // true if clearType corrections should be applied (for IE)
    cleartypeNoBg:    false,    // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
    containerResize:  1,        // resize container to fit largest slide
    containerResizeHeight:  0,  // resize containers height to fit the largest slide but leave the width dynamic
    continuous:       0,        // true to start next transition immediately after current one completes
    cssAfter:         null,     // properties that defined the state of the slide after transitioning out
    cssBefore:        null,     // properties that define the initial state of the slide before transitioning in
    delay:            0,        // additional delay (in ms) for first transition (hint: can be negative)
    easeIn:           null,     // easing for "in" transition
    easeOut:          null,     // easing for "out" transition
    easing:           null,     // easing method for both in and out transitions
    end:              null,     // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
    fastOnEvent:      0,        // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
    fit:              0,        // force slides to fit container
    fx:               'fade',   // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
    fxFn:             null,     // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
    height:           'auto',   // container height (if the 'fit' option is true, the slides will be set to this height as well)
    manualTrump:      true,     // causes manual transition to stop an active transition instead of being ignored
    metaAttr:         'cycle',  // data- attribute that holds the option data for the slideshow
    next:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
    nowrap:           0,        // true to prevent slideshow from wrapping
    onPagerEvent:     null,     // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
    onPrevNextEvent:  null,     // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
    pager:            null,     // element, jQuery object, or jQuery selector string for the element to use as pager container
    pagerAnchorBuilder: null,   // callback fn for building anchor links:  function(index, DOMelement)
    pagerEvent:       'click.cycle', // name of event which drives the pager navigation
    pause:            0,        // true to enable "pause on hover"
    pauseOnPagerHover: 0,       // true to pause when hovering over pager link
    prev:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
    prevNextEvent:    'click.cycle',// event which drives the manual transition to the previous or next slide
    random:           0,        // true for random, false for sequence (not applicable to shuffle fx)
    randomizeEffects: 1,        // valid when multiple effects are used; true to make the effect sequence random
    requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
    requeueTimeout:   250,      // ms delay for requeue
    rev:              0,        // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
    shuffle:          null,     // coords for shuffle animation, ex: { top:15, left: 200 }
    skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
    slideExpr:        null,     // expression for selecting slides (if something other than all children is required)
    slideResize:      1,        // force slide width/height to fixed size before every transition
    speed:            1000,     // speed of the transition (any valid fx speed value)
    speedIn:          null,     // speed of the 'in' transition
    speedOut:         null,     // speed of the 'out' transition
    startingSlide:    undefined,// zero-based index of the first slide to be displayed
    sync:             1,        // true if in/out transitions should occur simultaneously
    timeout:          4000,     // milliseconds between slide transitions (0 to disable auto advance)
    timeoutFn:        null,     // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
    updateActivePagerLink: null,// callback fn invoked to update the active pager link (adds/removes activePagerClass style)
    width:            null      // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:  2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
"use strict";

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
  opts.fxFn = function(curr,next,opts,after){
    $(next).show();
    $(curr).hide();
    after();
  };
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
  $slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
  opts.before.push(function(curr,next,opts,w,h,rev) {
    $(curr).css('zIndex',opts.slideCount + (rev !== true ? 1 : 0));
    $(next).css('zIndex',opts.slideCount + (rev !== true ? 0 : 1));
  });
  opts.animIn.opacity = 1;
  opts.animOut.opacity = 0;
  opts.cssBefore.opacity = 1;
  opts.cssBefore.display = 'block';
  opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
  $cont.css('overflow','hidden');
  opts.before.push($.fn.cycle.commonReset);
  var h = $cont.height();
  opts.cssBefore.top = h;
  opts.cssBefore.left = 0;
  opts.cssFirst.top = 0;
  opts.animIn.top = 0;
  opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
  $cont.css('overflow','hidden');
  opts.before.push($.fn.cycle.commonReset);
  var h = $cont.height();
  opts.cssFirst.top = 0;
  opts.cssBefore.top = -h;
  opts.cssBefore.left = 0;
  opts.animIn.top = 0;
  opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
  $cont.css('overflow','hidden');
  opts.before.push($.fn.cycle.commonReset);
  var w = $cont.width();
  opts.cssFirst.left = 0;
  opts.cssBefore.left = w;
  opts.cssBefore.top = 0;
  opts.animIn.left = 0;
  opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
  $cont.css('overflow','hidden');
  opts.before.push($.fn.cycle.commonReset);
  var w = $cont.width();
  opts.cssFirst.left = 0;
  opts.cssBefore.left = -w;
  opts.cssBefore.top = 0;
  opts.animIn.left = 0;
  opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
  $cont.css('overflow','hidden').width();
  opts.before.push(function(curr, next, opts, fwd) {
    if (opts.rev)
      fwd = !fwd;
    $.fn.cycle.commonReset(curr,next,opts);
    opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
    opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
  });
  opts.cssFirst.left = 0;
  opts.cssBefore.top = 0;
  opts.animIn.left = 0;
  opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
  $cont.css('overflow','hidden');
  opts.before.push(function(curr, next, opts, fwd) {
    if (opts.rev)
      fwd = !fwd;
    $.fn.cycle.commonReset(curr,next,opts);
    opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
    opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
  });
  opts.cssFirst.top = 0;
  opts.cssBefore.left = 0;
  opts.animIn.top = 0;
  opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $(opts.elements).not(curr).hide();
    $.fn.cycle.commonReset(curr,next,opts,false,true);
    opts.animIn.width = next.cycleW;
  });
  opts.cssBefore.left = 0;
  opts.cssBefore.top = 0;
  opts.cssBefore.width = 0;
  opts.animIn.width = 'show';
  opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $(opts.elements).not(curr).hide();
    $.fn.cycle.commonReset(curr,next,opts,true,false);
    opts.animIn.height = next.cycleH;
  });
  opts.cssBefore.left = 0;
  opts.cssBefore.top = 0;
  opts.cssBefore.height = 0;
  opts.animIn.height = 'show';
  opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
  var i, w = $cont.css('overflow', 'visible').width();
  $slides.css({left: 0, top: 0});
  opts.before.push(function(curr,next,opts) {
    $.fn.cycle.commonReset(curr,next,opts,true,true,true);
  });
  // only adjust speed once!
  if (!opts.speedAdjusted) {
    opts.speed = opts.speed / 2; // shuffle has 2 transitions
    opts.speedAdjusted = true;
  }
  opts.random = 0;
  opts.shuffle = opts.shuffle || {left:-w, top:15};
  opts.els = [];
  for (i=0; i < $slides.length; i++)
    opts.els.push($slides[i]);

  for (i=0; i < opts.currSlide; i++)
    opts.els.push(opts.els.shift());

  // custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
  opts.fxFn = function(curr, next, opts, cb, fwd) {
    if (opts.rev)
      fwd = !fwd;
    var $el = fwd ? $(curr) : $(next);
    $(next).css(opts.cssBefore);
    var count = opts.slideCount;
    $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
      var hops = $.fn.cycle.hopsFromLast(opts, fwd);
      for (var k=0; k < hops; k++) {
        if (fwd)
          opts.els.push(opts.els.shift());
        else
          opts.els.unshift(opts.els.pop());
      }
      if (fwd) {
        for (var i=0, len=opts.els.length; i < len; i++)
          $(opts.els[i]).css('z-index', len-i+count);
      }
      else {
        var z = $(curr).css('z-index');
        $el.css('z-index', parseInt(z,10)+1+count);
      }
      $el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
        $(fwd ? this : curr).hide();
        if (cb) cb();
      });
    });
  };
  $.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,true,false);
    opts.cssBefore.top = next.cycleH;
    opts.animIn.height = next.cycleH;
    opts.animOut.width = next.cycleW;
  });
  opts.cssFirst.top = 0;
  opts.cssBefore.left = 0;
  opts.cssBefore.height = 0;
  opts.animIn.top = 0;
  opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,true,false);
    opts.animIn.height = next.cycleH;
    opts.animOut.top   = curr.cycleH;
  });
  opts.cssFirst.top = 0;
  opts.cssBefore.left = 0;
  opts.cssBefore.top = 0;
  opts.cssBefore.height = 0;
  opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,false,true);
    opts.cssBefore.left = next.cycleW;
    opts.animIn.width = next.cycleW;
  });
  opts.cssBefore.top = 0;
  opts.cssBefore.width = 0;
  opts.animIn.left = 0;
  opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,false,true);
    opts.animIn.width = next.cycleW;
    opts.animOut.left = curr.cycleW;
  });
  $.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
  opts.animIn.left = 0;
  opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,false,false,true);
    opts.cssBefore.top = next.cycleH/2;
    opts.cssBefore.left = next.cycleW/2;
    $.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
    $.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
  });
  opts.cssFirst.top = 0;
  opts.cssFirst.left = 0;
  opts.cssBefore.width = 0;
  opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,false,false);
    opts.cssBefore.left = next.cycleW/2;
    opts.cssBefore.top = next.cycleH/2;
    $.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
  });
  opts.cssBefore.width = 0;
  opts.cssBefore.height = 0;
  opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
  var w = $cont.css('overflow','hidden').width();
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts);
    opts.animIn.width = next.cycleW;
    opts.animOut.left   = curr.cycleW;
  });
  opts.cssBefore.left = w;
  opts.cssBefore.top = 0;
  opts.animIn.left = 0;
  opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
  var h = $cont.css('overflow','hidden').height();
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts);
    opts.animIn.height = next.cycleH;
    opts.animOut.top   = curr.cycleH;
  });
  opts.cssBefore.top = h;
  opts.cssBefore.left = 0;
  opts.animIn.top = 0;
  opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
  var h = $cont.css('overflow','hidden').height();
  var w = $cont.width();
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts);
    opts.animIn.height = next.cycleH;
    opts.animOut.top   = curr.cycleH;
  });
  opts.cssBefore.top = h;
  opts.cssBefore.left = w;
  opts.animIn.top = 0;
  opts.animIn.left = 0;
  opts.animOut.top = h;
  opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,false,true);
    opts.cssBefore.left = this.cycleW/2;
    opts.animIn.left = 0;
    opts.animIn.width = this.cycleW;
    opts.animOut.left = 0;
  });
  opts.cssBefore.top = 0;
  opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,true,false);
    opts.cssBefore.top = this.cycleH/2;
    opts.animIn.top = 0;
    opts.animIn.height = this.cycleH;
    opts.animOut.top = 0;
  });
  opts.cssBefore.height = 0;
  opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,false,true,true);
    opts.cssBefore.left = next.cycleW/2;
    opts.animIn.left = 0;
    opts.animIn.width = this.cycleW;
    opts.animOut.left = curr.cycleW/2;
    opts.animOut.width = 0;
  });
  opts.cssBefore.top = 0;
  opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,true,false,true);
    opts.cssBefore.top = next.cycleH/2;
    opts.animIn.top = 0;
    opts.animIn.height = next.cycleH;
    opts.animOut.top = curr.cycleH/2;
    opts.animOut.height = 0;
  });
  opts.cssBefore.height = 0;
  opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
  var d = opts.direction || 'left';
  var w = $cont.css('overflow','hidden').width();
  var h = $cont.height();
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts);
    opts.cssAfter.display = '';
    if (d == 'right')
      opts.cssBefore.left = -w;
    else if (d == 'up')
      opts.cssBefore.top = h;
    else if (d == 'down')
      opts.cssBefore.top = -h;
    else
      opts.cssBefore.left = w;
  });
  opts.animIn.left = 0;
  opts.animIn.top = 0;
  opts.cssBefore.top = 0;
  opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
  var d = opts.direction || 'left';
  var w = $cont.css('overflow','hidden').width();
  var h = $cont.height();
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,true,true,true);
    if (d == 'right')
      opts.animOut.left = w;
    else if (d == 'up')
      opts.animOut.top = -h;
    else if (d == 'down')
      opts.animOut.top = h;
    else
      opts.animOut.left = -w;
  });
  opts.animIn.left = 0;
  opts.animIn.top = 0;
  opts.cssBefore.top = 0;
  opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
  var w = $cont.css('overflow','visible').width();
  var h = $cont.height();
  opts.before.push(function(curr, next, opts) {
    $.fn.cycle.commonReset(curr,next,opts,true,true,true);
    // provide default toss settings if animOut not provided
    if (!opts.animOut.left && !opts.animOut.top)
      $.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
    else
      opts.animOut.opacity = 0;
  });
  opts.cssBefore.left = 0;
  opts.cssBefore.top = 0;
  opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
  var w = $cont.css('overflow','hidden').width();
  var h = $cont.height();
  opts.cssBefore = opts.cssBefore || {};
  var clip;
  if (opts.clip) {
    if (/l2r/.test(opts.clip))
      clip = 'rect(0px 0px '+h+'px 0px)';
    else if (/r2l/.test(opts.clip))
      clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
    else if (/t2b/.test(opts.clip))
      clip = 'rect(0px '+w+'px 0px 0px)';
    else if (/b2t/.test(opts.clip))
      clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
    else if (/zoom/.test(opts.clip)) {
      var top = parseInt(h/2,10);
      var left = parseInt(w/2,10);
      clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
    }
  }

  opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

  var d = opts.cssBefore.clip.match(/(\d+)/g);
  var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

  opts.before.push(function(curr, next, opts) {
    if (curr == next) return;
    var $curr = $(curr), $next = $(next);
    $.fn.cycle.commonReset(curr,next,opts,true,true,false);
    opts.cssAfter.display = 'block';

    var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
    (function f() {
      var tt = t ? t - parseInt(step * (t/count),10) : 0;
      var ll = l ? l - parseInt(step * (l/count),10) : 0;
      var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
      var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
      $next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
      (step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
    })();
  });
  $.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
  opts.animIn    = { left: 0 };
  opts.animOut   = { left: 0 };
};

})(jQuery);

/*! jQuery Color v@2.1.0 http://github.com/jquery/jquery-color | jquery.org/license */
(function (a, b) { function m(a, b, c) { var d = h[b.type] || {}; return a == null ? c || !b.def ? null : b.def : (a = d.floor ? ~ ~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a) } function n(b) { var c = f(), d = c._rgba = []; return b = b.toLowerCase(), l(e, function (a, e) { var f, h = e.re.exec(b), i = h && e.parse(h), j = e.space || "rgba"; if (i) return f = c[j](i), c[g[j].cache] = f[g[j].cache], d = c._rgba = f._rgba, !1 }), d.length ? (d.join() === "0,0,0,0" && a.extend(d, k.transparent), c) : k[b] } function o(a, b, c) { return c = (c + 1) % 1, c * 6 < 1 ? a + (b - a) * c * 6 : c * 2 < 1 ? b : c * 3 < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a } var c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", d = /^([\-+])=\s*(\d+\.?\d*)/, e = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function (a) { return [a[1], a[2], a[3], a[4]] } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function (a) { return [a[1] * 2.55, a[2] * 2.55, a[3] * 2.55, a[4]] } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (a) { return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (a) { return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)] } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function (a) { return [a[1], a[2] / 100, a[3] / 100, a[4]] } }], f = a.Color = function (b, c, d, e) { return new a.Color.fn.parse(b, c, d, e) }, g = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte"}} }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent"}}} }, h = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0} }, i = f.support = {}, j = a("<p>")[0], k, l = a.each; j.style.cssText = "background-color:rgba(1,1,1,.5)", i.rgba = j.style.backgroundColor.indexOf("rgba") > -1, l(g, function (a, b) { b.cache = "_" + a, b.props.alpha = { idx: 3, type: "percent", def: 1} }), f.fn = a.extend(f.prototype, { parse: function (c, d, e, h) { if (c === b) return this._rgba = [null, null, null, null], this; if (c.jquery || c.nodeType) c = a(c).css(d), d = b; var i = this, j = a.type(c), o = this._rgba = [], p; d !== b && (c = [c, d, e, h], j = "array"); if (j === "string") return this.parse(n(c) || k._default); if (j === "array") return l(g.rgba.props, function (a, b) { o[b.idx] = m(c[b.idx], b) }), this; if (j === "object") return c instanceof f ? l(g, function (a, b) { c[b.cache] && (i[b.cache] = c[b.cache].slice()) }) : l(g, function (b, d) { var e = d.cache; l(d.props, function (a, b) { if (!i[e] && d.to) { if (a === "alpha" || c[a] == null) return; i[e] = d.to(i._rgba) } i[e][b.idx] = m(c[a], b, !0) }), i[e] && a.inArray(null, i[e].slice(0, 3)) < 0 && (i[e][3] = 1, d.from && (i._rgba = d.from(i[e]))) }), this }, is: function (a) { var b = f(a), c = !0, d = this; return l(g, function (a, e) { var f, g = b[e.cache]; return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], l(e.props, function (a, b) { if (g[b.idx] != null) return c = g[b.idx] === f[b.idx], c })), c }), c }, _space: function () { var a = [], b = this; return l(g, function (c, d) { b[d.cache] && a.push(c) }), a.pop() }, transition: function (a, b) { var c = f(a), d = c._space(), e = g[d], i = this.alpha() === 0 ? f("transparent") : this, j = i[e.cache] || e.to(i._rgba), k = j.slice(); return c = c[e.cache], l(e.props, function (a, d) { var e = d.idx, f = j[e], g = c[e], i = h[d.type] || {}; if (g === null) return; f === null ? k[e] = g : (i.mod && (g - f > i.mod / 2 ? f += i.mod : f - g > i.mod / 2 && (f -= i.mod)), k[e] = m((g - f) * b + f, d)) }), this[d](k) }, blend: function (b) { if (this._rgba[3] === 1) return this; var c = this._rgba.slice(), d = c.pop(), e = f(b)._rgba; return f(a.map(c, function (a, b) { return (1 - d) * e[b] + d * a })) }, toRgbaString: function () { var b = "rgba(", c = a.map(this._rgba, function (a, b) { return a == null ? b > 2 ? 1 : 0 : a }); return c[3] === 1 && (c.pop(), b = "rgb("), b + c.join() + ")" }, toHslaString: function () { var b = "hsla(", c = a.map(this.hsla(), function (a, b) { return a == null && (a = b > 2 ? 1 : 0), b && b < 3 && (a = Math.round(a * 100) + "%"), a }); return c[3] === 1 && (c.pop(), b = "hsl("), b + c.join() + ")" }, toHexString: function (b) { var c = this._rgba.slice(), d = c.pop(); return b && c.push(~ ~(d * 255)), "#" + a.map(c, function (a, b) { return a = (a || 0).toString(16), a.length === 1 ? "0" + a : a }).join("") }, toString: function () { return this._rgba[3] === 0 ? "transparent" : this.toRgbaString() } }), f.fn.parse.prototype = f.fn, g.hsla.to = function (a) { if (a[0] == null || a[1] == null || a[2] == null) return [null, null, null, a[3]]; var b = a[0] / 255, c = a[1] / 255, d = a[2] / 255, e = a[3], f = Math.max(b, c, d), g = Math.min(b, c, d), h = f - g, i = f + g, j = i * .5, k, l; return g === f ? k = 0 : b === f ? k = 60 * (c - d) / h + 360 : c === f ? k = 60 * (d - b) / h + 120 : k = 60 * (b - c) / h + 240, j === 0 || j === 1 ? l = j : j <= .5 ? l = h / i : l = h / (2 - i), [Math.round(k) % 360, l, j, e == null ? 1 : e] }, g.hsla.from = function (a) { if (a[0] == null || a[1] == null || a[2] == null) return [null, null, null, a[3]]; var b = a[0] / 360, c = a[1], d = a[2], e = a[3], f = d <= .5 ? d * (1 + c) : d + c - d * c, g = 2 * d - f, h, i, j; return [Math.round(o(g, f, b + 1 / 3) * 255), Math.round(o(g, f, b) * 255), Math.round(o(g, f, b - 1 / 3) * 255), e] }, l(g, function (c, e) { var g = e.props, h = e.cache, i = e.to, j = e.from; f.fn[c] = function (c) { i && !this[h] && (this[h] = i(this._rgba)); if (c === b) return this[h].slice(); var d, e = a.type(c), k = e === "array" || e === "object" ? c : arguments, n = this[h].slice(); return l(g, function (a, b) { var c = k[e === "object" ? a : b.idx]; c == null && (c = n[b.idx]), n[b.idx] = m(c, b) }), j ? (d = f(j(n)), d[h] = n, d) : f(n) }, l(g, function (b, e) { if (f.fn[b]) return; f.fn[b] = function (f) { var g = a.type(f), h = b === "alpha" ? this._hsla ? "hsla" : "rgba" : c, i = this[h](), j = i[e.idx], k; return g === "undefined" ? j : (g === "function" && (f = f.call(this, j), g = a.type(f)), f == null && e.empty ? this : (g === "string" && (k = d.exec(f), k && (f = j + parseFloat(k[2]) * (k[1] === "+" ? 1 : -1))), i[e.idx] = f, this[h](i))) } }) }), f.hook = function (b) { var c = b.split(" "); l(c, function (b, c) { a.cssHooks[c] = { set: function (b, d) { var e, g, h = ""; if (a.type(d) !== "string" || (e = n(d))) { d = f(e || d); if (!i.rgba && d._rgba[3] !== 1) { g = c === "backgroundColor" ? b.parentNode : b; while ((h === "" || h === "transparent") && g && g.style) try { h = a.css(g, "backgroundColor"), g = g.parentNode } catch (j) { } d = d.blend(h && h !== "transparent" ? h : "_default") } d = d.toRgbaString() } try { b.style[c] = d } catch (d) { } } }, a.fx.step[c] = function (b) { b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos)) } }) }, f.hook(c), a.cssHooks.borderColor = { expand: function (a) { var b = {}; return l(["Top", "Right", "Bottom", "Left"], function (c, d) { b["border" + d + "Color"] = a }), b } }, k = a.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff"} })(jQuery);

/*
* jQuery.Rule - Css Rules manipulation, the jQuery way.
* Copyright (c) 2007-2011 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 02/7/2011
* @author Ariel Flesler
* @version 1.0.2
*/
(function (f) { var c = f('<style rel="alternate stylesheet" type="text/css" />').appendTo("head")[0], k = c.sheet ? "sheet" : "styleSheet", i = c[k], m = i.rules ? "rules" : "cssRules", g = i.deleteRule ? "deleteRule" : "removeRule", d = i.ownerNode ? "ownerNode" : "owningElement", e = /^([^{]+)\{([^}]*)\}/m, l = /([^:]+):([^;}]+)/; i.disabled = true; var j = f.rule = function (n, o) { if (!(this instanceof j)) { return new j(n, o) } this.sheets = j.sheets(o); if (n && e.test(n)) { n = j.clean(n) } if (typeof n == "object" && !n.exec) { b(this, n.get ? n.get() : n.splice ? n : [n]) } else { b(this, this.sheets.cssRules().get()); if (n) { return this.filter(n) } } return this }; f.extend(j, { sheets: function (p) { var n = p; if (typeof n != "object") { n = f.makeArray(document.styleSheets) } n = f(n).not(i); if (typeof p == "string") { n = n.ownerNode().filter(p).sheet() } return n }, rule: function (n) { if (n.selectorText) { return ["", n.selectorText, n.style.cssText] } return e.exec(n) }, appendTo: function (q, n, o) { switch (typeof n) { case "string": n = this.sheets(n); case "object": if (n[0]) { n = n[0] } if (n[k]) { n = n[k] } if (n[m]) { break } default: if (typeof q == "object") { return q } n = i } var t; if (!o && (t = this.parent(q))) { q = this.remove(q, t) } var s = this.rule(q); if (n.addRule) { n.addRule(s[1], s[2] || ";") } else { if (n.insertRule) { n.insertRule(s[1] + "{" + s[2] + "}", n[m].length) } } return n[m][n[m].length - 1] }, remove: function (o, q) { q = q || this.parent(o); if (q != i) { var n = q ? f.inArray(o, q[m]) : -1; if (n != -1) { o = this.appendTo(o, 0, true); q[g](n) } } return o }, clean: function (n) { return f.map(n.split("}"), function (o) { if (o) { return j.appendTo(o + "}") } }) }, parent: function (o) { if (typeof o == "string" || !f.browser.msie) { return o.parentStyleSheet } var n; this.sheets().each(function () { if (f.inArray(o, this[m]) != -1) { n = this; return false } }); return n }, outerText: function (n) { return !n || !n.selectorText ? "" : [n.selectorText + "{", "\t" + n.style.cssText, "}"].join("\n").toLowerCase() }, text: function (o, n) { if (n !== undefined) { o.style.cssText = n } return !o ? "" : o.style.cssText.toLowerCase() } }); j.fn = j.prototype = { pushStack: function (n, p) { var o = j(n, p || this.sheets); o.prevObject = this; return o }, end: function () { return this.prevObject || j(0, []) }, filter: function (n) { var p; if (!n) { n = /./ } if (n.split) { p = f.trim(n).toLowerCase().split(/\s*,\s*/); n = function () { var o = this.selectorText || ""; return !!f.grep(o.toLowerCase().split(/\s*,\s*/), function (q) { return f.inArray(q, p) != -1 }).length } } else { if (n.exec) { p = n; n = function () { return p.test(this.selectorText) } } } return this.pushStack(f.grep(this, function (q, o) { return n.call(q, o) })) }, add: function (n, o) { return this.pushStack(f.merge(this.get(), j(n, o))) }, is: function (n) { return !!(n && this.filter(n).length) }, not: function (p, o) { p = j(p, o); return this.filter(function () { return f.inArray(this, p) == -1 }) }, append: function (n) { var p = this, o; f.each(n.split(/\s*;\s*/), function (r, q) { if ((o = l.exec(q))) { p.css(o[1], o[2]) } }); return this }, text: function (n) { return !arguments.length ? j.text(this[0]) : this.each(function () { j.text(this, n) }) }, outerText: function () { return j.outerText(this[0]) } }; f.each({ ownerNode: d, sheet: k, cssRules: m }, function (n, o) { var p = o == m; f.fn[n] = function () { return this.map(function () { return p ? f.makeArray(this[o]) : this[o] }) } }); f.fn.cssText = function () { return this.filter("link,style").eq(0).sheet().cssRules().map(function () { return j.outerText(this) }).get().join("\n") }; f.each("remove,appendTo,parent".split(","), function (n, o) { j.fn[o] = function () { var p = f.makeArray(arguments), q = this; p.unshift(0); return this.each(function (r) { p[0] = this; q[r] = j[o].apply(j, p) || q[r] }) } }); f.each(("each,index,get,size,eq,slice,map,attr,andSelf,css,show,hide,toggle,queue,dequeue,stop,animate,fadeIn,fadeOut,fadeTo").split(","), function (n, o) { j.fn[o] = f.fn[o] }); function b(o, n) { o.length = 0; Array.prototype.push.apply(o, n) } var h = f.curCSS; f.curCSS = function (o, n) { return ("selectorText" in o) ? o.style[n] || f.prop(o, n == "opacity" ? 1 : 0, "curCSS", 0, n) : h.apply(this, arguments) }; j.cache = {}; var a = function (n) { return function (p) { var o = p.selectorText; if (o) { arguments[0] = j.cache[o] = j.cache[o] || {} } return n.apply(f, arguments) } }; f.data = a(f.data); f.removeData = a(f.removeData); f(window).unload(function () { f(i).cssRules().remove() }) })(jQuery);

/* fade css hover */

(function ($) {
    $.fn.fadeCssHover = function (options, callback) {
        var _getAffectedElementDataByTarget = function (affectedElementDataArray, targetElement) {
            var affectedElementData = null;

            $(affectedElementDataArray).each(function () {
                if (this.targetElement === targetElement) {
                    affectedElementData = this;
                    return false;
                }
            });

            return affectedElementData;
        }

        var _addElementToArray = function (array, element) {
            var elementAlreadyInArray = false;
            $(array).each(function () {
                if (this === element) {
                    elementAlreadyInArray = true;
                    return false;
                }
            });
            if (!elementAlreadyInArray) {
                array.push(element);
            }
            return array;
        }


        var makeItSo = function () {
            var targetElements = [];
            //first cyle through all css rules and identify all hover targets, and the elements they affect
            $.rule(data.target).sheets.each(function (sheetIndex) {
                var sheet = this;
                try {
                    $(sheet.cssRules).each(function (ruleIndex) {
                        var cssRule = this; //sheet.cssRules[ruleIndex];
                        var splitRules = cssRule.cssText.split(',');
                        $(splitRules).each(function (splitRuleIndex) {
                            var splitRule = this;
                            var ruleText = splitRule;
                            var hoverKey = ':hover';
                            var hoverIndex = ruleText.indexOf(hoverKey);
                            if (hoverIndex !== -1) {
                                var hoverTargetSelector = $.trim(ruleText.substr(0, ruleText.length - (ruleText.substr(hoverIndex).length)));
                                var nonHoverSelector = $.trim(ruleText.substr(hoverIndex + hoverKey.length).split('{')[0]);
                                var hoverBackgroundColor = cssRule.style.backgroundColor;
                                var hoverTextColor = cssRule.style.color;
                                var hoverBackgroundImage = cssRule.style.backgroundImage;
                                var hoverTop = cssRule.style.top;
                                var hoverRight = cssRule.style.right;
                                var hoverBottom = cssRule.style.bottom;
                                var hoverLeft = cssRule.style.left;
                                var hoverDisplay = cssRule.style.display;
                                if (hoverBackgroundImage === '' || hoverBackgroundImage === 'initial') { hoverBackgroundImage = 'none' };
                                //check to see if there's a background color or text color change
                                if (
									hoverBackgroundColor !== ''
									|| hoverTextColor !== ''
									|| hoverBackgroundImage !== 'none'
                                //check for sprites
									|| hoverTop !== ''
									|| hoverRight !== ''
									|| hoverBottom !== ''
									|| hoverLeft !== ''
									|| hoverDisplay !== ''
									) {
                                    $(hoverTargetSelector).each(function (elementIndex) {
                                        var targetElement = this;
                                        if ( !($(targetElement).is(data.options.ignoreSelector)) && $(targetElement).parents(data.options.ignoreSelector).length===0 ){
                                            _addElementToArray(targetElements, targetElement);
                                            var affectedChildElements = nonHoverSelector !== '' ? $(nonHoverSelector, targetElement).get() : $(this).get();
                                            var nonHoverBackgroundColor = $(affectedChildElements[0]).css('background-color');
                                            var nonHoverTextColor = $(affectedChildElements[0]).css('color');
                                            var nonHoverBackgroundImage = $(affectedChildElements[0]).css('background-image');
                                            var nonHoverDisplay = $(affectedChildElements[0]).css('display');
                                            var nonHoverTop = $(affectedChildElements[0]).css('top');
                                            var nonHoverRight = $(affectedChildElements[0]).css('right');
                                            var nonHoverBottom = $(affectedChildElements[0]).css('bottom');
                                            var nonHoverLeft = $(affectedChildElements[0]).css('left');

                                            if (nonHoverBackgroundImage === '' || nonHoverBackgroundImage === 'initial') { nonHoverBackgroundImage = 'none'; }
                                            var targetData = $(targetElement).data('fadeCssHover');
                                            if (!targetData) {
                                                targetData = {
                                                    needsClone: false,
                                                    affectedChildElements: []
                                                };
                                                $(targetElement).data('fadeCssHover', targetData);
                                            }
                                            if (!targetData.affectedChildElements) {
                                                targetData.affectedChildElements = [];
                                            }
                                            if (!targetData.needsClone) {
                                                targetData.needsClone = false;
                                            }
                                            //we need to add data to each affectedChildElement to prevent multiple hover events from being fired, and to allow proper css overrides
                                            $(affectedChildElements).each(function () {
                                                var affectedChildElement = this;
                                                _addElementToArray(targetData.affectedChildElements, affectedChildElement);
                                                var affectedChildElementData = $(affectedChildElement).data('fadeCssHover');
                                                if (!affectedChildElementData) {
                                                    affectedChildElementData = {};
                                                    $(affectedChildElement).data('fadeCssHover', affectedChildElementData);
                                                }
                                                var fadeChanges = affectedChildElementData.fadeChanges;
                                                if (!fadeChanges) {
                                                    affectedChildElementData.fadeChanges = fadeChanges = [];
                                                }
                                                var affectedElementDataForTarget = _getAffectedElementDataByTarget(fadeChanges, targetElement);
                                                if (!affectedElementDataForTarget) {
                                                    affectedElementDataForTarget = {
                                                        targetElement: targetElement,
                                                        hoverBackgroundColor: '',
                                                        hoverTextColor: '',
                                                        hoverBackgroundImage: '',
                                                        hoverDisplay: '',
                                                        hoverTop: '',
                                                        hoverRight: '',
                                                        hoverLeft: '',
                                                        hoverBottom: '',
                                                        nonHoverBackgroundColor: '',
                                                        nonHoverTextColor: '',
                                                        nonHoverBackgroundImage: '',
                                                        nonHoverdisplay: '',
                                                        nonHoverTop: '',
                                                        nonHoverRight: '',
                                                        nonHoverLeft: '',
                                                        nonHoverBottom: ''
                                                    };
                                                    fadeChanges.push(affectedElementDataForTarget);
                                                }
                                                var newData = {};
                                                if (hoverBackgroundColor !== '') { newData.hoverBackgroundColor = hoverBackgroundColor; }
                                                if (hoverTextColor !== '') { newData.hoverTextColor = hoverTextColor; }
                                                if (hoverBackgroundImage !== '') { newData.hoverBackgroundImage = hoverBackgroundImage; }
                                                if (hoverDisplay !== '') { newData.hoverDisplay = hoverDisplay; }
                                                if (hoverTop !== '') { newData.hoverTop = hoverTop; }
                                                if (hoverRight !== '') { newData.hoverRight = hoverRight; }
                                                if (hoverBottom !== '') { newData.hoverBottom = hoverBottom; }
                                                if (hoverLeft !== '') { newData.hoverLeft = hoverLeft; } if (nonHoverBackgroundColor !== '') { newData.nonHoverBackgroundColor = nonHoverBackgroundColor; }
                                                if (nonHoverTextColor !== '') { newData.nonHoverTextColor = nonHoverTextColor; }
                                                if (nonHoverBackgroundImage !== '') { newData.nonHoverBackgroundImage = nonHoverBackgroundImage; }
                                                if (nonHoverDisplay !== '') { newData.nonHoverDisplay = nonHoverDisplay; }
                                                if (nonHoverTop !== '') { newData.nonHoverTop = nonHoverTop; }
                                                if (nonHoverRight !== '') { newData.nonHoverRight = nonHoverRight; }
                                                if (nonHoverBottom !== '') { newData.nonHoverBottom = nonHoverBottom; }
                                                if (nonHoverLeft !== '') { newData.nonHoverLeft = nonHoverLeft; }
                                                affectedElementDataForTarget = $.extend(affectedElementDataForTarget, newData);
                                                if (
												    affectedElementDataForTarget.hoverBackgroundImage !== '' && affectedElementDataForTarget.hoverBackgroundImage !== nonHoverBackgroundImage
												    || affectedElementDataForTarget.hoverTop !== '' && affectedElementDataForTarget.hoverTop !== nonHoverTop
												    || affectedElementDataForTarget.hoverRight !== '' && affectedElementDataForTarget.hoverRight !== nonHoverRight
												    || affectedElementDataForTarget.hoverBottom !== '' && affectedElementDataForTarget.hoverBottom !== nonHoverBottom
												    || affectedElementDataForTarget.hoverLeft !== '' && affectedElementDataForTarget.hoverLeft !== nonHoverLeft
												    ) {
                                                    targetData.needsClone = true;
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    });
                } catch (e) { console.log(e); }
            });

            //now add a jquery hover event to each target that either animates affected elements for simple color changes, or fades in a cloned element for background-image changes
            $(targetElements).each(function () {
                var targetElement = this;
                var targetData = $(targetElement).data('fadeCssHover');
                var affectedChildElements = targetData.affectedChildElements;

                $(affectedChildElements).each(function () {
                    $(this).css('color', $(this).css('color'))
						.css('top', $(this).css('top'))
						.css('right', $(this).css('right'))
						.css('bottom', $(this).css('bottom'))
						.css('left', $(this).css('left'))
						.css('background-color', $(this).css('background-color'))
						.css('background-image', $(this).css('background-image'))
						.css('display', $(this).css('display'));
                });

                if (targetData.needsClone) {
                    //We need to clone!
                    if ($(targetElement).css('position') == 'static' || $(targetElement).css('position') == 'relative') {

                        //clone the target
                        var hoverClone = $(targetElement).clone();


                        //insert clone before target
                        $(hoverClone).insertBefore(targetElement);

                        //append the original target to the clone
                        $(targetElement).appendTo(hoverClone);

                        //apply all hover states to any affectedChildElements under the target
                        $(affectedChildElements).each(function () {
                            var affectedElement = this;
                            var fadeChanges = $(affectedElement).data('fadeCssHover').fadeChanges;
                            var affectedElementDataForTarget = _getAffectedElementDataByTarget(fadeChanges, targetElement);
                            var backgroundColorToAnimate = affectedElementDataForTarget.hoverBackgroundColor !== '' ?
								affectedElementDataForTarget.hoverBackgroundColor : $(affectedElement).css('background-color');
                            var textColorToAnimate = affectedElementDataForTarget.hoverTextColor !== '' ?
								affectedElementDataForTarget.hoverTextColor : $(affectedElement).css('color');
                            var backgroundImageToAnimate = affectedElementDataForTarget.hoverBackgroundImage !== '' ?
								affectedElementDataForTarget.hoverBackgroundImage : $(affectedElement).css('background-image');
                            var displayToAnimate = affectedElementDataForTarget.hoverDisplay !== '' ?
								affectedElementDataForTarget.hoverDisplay : $(affectedElement).css('display');
                            var topToAnimate = affectedElementDataForTarget.hoverTop !== '' ?
								affectedElementDataForTarget.hoverTop : $(affectedElement).css('top');
                            var rightToAnimate = affectedElementDataForTarget.hoverRight !== '' ?
								affectedElementDataForTarget.hoverRight : $(affectedElement).css('right');
                            var bottomToAnimate = affectedElementDataForTarget.hoverBottom !== '' ?
								affectedElementDataForTarget.hoverBottom : $(affectedElement).css('bottom');
                            var leftToAnimate = affectedElementDataForTarget.hoverLeft !== '' ?
								affectedElementDataForTarget.hoverLeft : $(affectedElement).css('left');
                            $(affectedElement)
								.css('top', topToAnimate)
								.css('right', rightToAnimate)
								.css('bottom', bottomToAnimate)
								.css('left', leftToAnimate)
								.css('display', displayToAnimate)
								.css('background-image', backgroundImageToAnimate)
								.css('background-color', backgroundColorToAnimate)
								.css('color', textColorToAnimate);
                        });

                        //make clone relatively positioned 
                        $(hoverClone).css('position', 'relative');

                        //make the target absolutely positioned and display none
                        $(targetElement).css('display', 'none')
							.css('position', 'absolute')
							.css('top', '0')
							.css('left', '0')

                        //set up hover events on clone
                        $(hoverClone).hover(
							function () {
							    $(targetElement).stop().fadeIn(data.options.fadeInDuration);
							},
							function () {
							    $(targetElement).stop().fadeOut(data.options.fadeOutDuration);
							}
						);
                    }
                } else {
                    $(targetElement).hover(
						function () {
						    $(affectedChildElements).each(function () {
						        var affectedElement = this;
						        var fadeChanges = $(affectedElement).data('fadeCssHover').fadeChanges;
						        var affectedElementDataForTarget = _getAffectedElementDataByTarget(fadeChanges, targetElement);
						        var backgroundColorToAnimate = affectedElementDataForTarget.hoverBackgroundColor !== '' ?
									affectedElementDataForTarget.hoverBackgroundColor : $(affectedElement).css('background-color');
						        var textColorToAnimate = affectedElementDataForTarget.hoverTextColor !== '' ?
									affectedElementDataForTarget.hoverTextColor : $(affectedElement).css('color');
						        var displayToAnimate = affectedElementDataForTarget.hoverDisplay !== '' ?
									affectedElementDataForTarget.hoverDisplay : $(affectedElement).css('display');

						        $(affectedElement).stop().animate({ backgroundColor: backgroundColorToAnimate, color: textColorToAnimate }, data.options.fadeInDuration);
						        if (displayToAnimate != $(affectedElement).css('display')) {
						            if (displayToAnimate === 'none') {
						                $(affectedElement).fadeOut(data.options.fadeOutDuration, function () {
						                    $(this).css('display', 'none');
						                });
						            } else {
						                $(affectedElement).fadeIn(data.options.fadeInDuration, function () {
						                    $(this).css('display', 'block');
						                });
						            }
						        }
						    });
						},
						function () {
						    $(affectedChildElements).each(function () {
						        var affectedElement = this;
						        var fadeChanges = $(affectedElement).data('fadeCssHover').fadeChanges;
						        var affectedElementDataForTarget = _getAffectedElementDataByTarget(fadeChanges, targetElement);
						        var backgroundColorToAnimate = affectedElementDataForTarget.nonHoverBackgroundColor !== '' ?
									affectedElementDataForTarget.nonHoverBackgroundColor : $(affectedElement).css('background-color');
						        var textColorToAnimate = affectedElementDataForTarget.nonHoverTextColor !== '' ?
									affectedElementDataForTarget.nonHoverTextColor : $(affectedElement).css('color');
						        var displayToAnimate = affectedElementDataForTarget.nonHoverDisplay !== '' ?
									affectedElementDataForTarget.nonHoverDisplay : $(affectedElement).css('display');

						        $(affectedElement).stop().animate({ backgroundColor: backgroundColorToAnimate, color: textColorToAnimate }, data.options.fadeInDuration);
						        if (displayToAnimate != $(affectedElement).css('display')) {
						            if (displayToAnimate === 'none') {
						                $(affectedElement).fadeOut(data.options.fadeOutDuration, function () {
						                    $(this).css('display', 'none');
						                });
						            } else {
						                $(affectedElement).fadeIn(data.options.fadeInDuration, function () {
						                    $(this).css('display', 'block');
						                });
						            }
						        }
						    });
						}
					);
                }
            });

            //now call callback
            if (typeof (callback) === "function") {
                callback.apply();
            }
        };

        var defaultOptions = {
            fadeInDuration: 200,
            fadeOutDuration: 200,
            ignoreSelector: '.fadeCSSHoverIgnore'
        };

        var data = $(this).data('fadeCssHover');
        if (!data) {
            //ininialize this beast
            data = {
                target: $(this),
                options: options ? $.extend(defaultOptions, options) : defaultOptions
            };
            $(this).data('fadeCssHover', data);

            $(document).ready(function () {
                if (!Modernizr.touch) { //this plugin makes no sense on touchscreen
                    makeItSo.apply();
                } else {
                    //now call callback
                    if (typeof (callback) === "function") {
                        callback.apply();
                    }
                }
            });
        } else {
            data.options = options ? $.extend(true, data.options, options) : defaultOptions;
        }


    }
})(jQuery);



