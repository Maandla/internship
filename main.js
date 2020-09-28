
util = {
  on: function(source, action, target, callback) {
    var fn;
 
    if (arguments.length > 3) {
      fn = function(e)  {

        e = e ? e : window.event;

        var targets = source.querySelectorAll(target);

        for (var i = 0, len = targets.length; i < len; i++) if (e.target === targets[i]) return callback(e, source);

        return null;
      }
    }


    else fn = function(e) {return target(e, source)};    


    var actions = action.split(' ');
    for (var i = 0, len = actions.length; i < len; i++) {

      if (window.addEventListener) source.addEventListener(actions[i], fn, false);

      else if (window.attachEvent) source.attachEvent('on' + actions[i], fn);

      else source['on' + actions[i]] = fn;
    }
    return fn;    
  },
  
  separate: function(text, delimiter, spaces) {return text.trim().split(new RegExp('[' + ((delimiter || ',;\\s') + (delimiter && spaces ? '\\s' : '')) + ']+'))},
  
  hasClass: function(e, c) {return !!e.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'))},

  addClass: function(e, c) {if (!util.hasClass(e, c)) e.className += ' ' + c},

  removeClass: function(e, c) {
    if (util.hasClass(e, c)) {
      var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
      e.className = e.className.replace(reg, ' ');
    }
  }
}

function initSwitches() {
  

  function clickHandler(evt) {
    var attr = util.separate(evt.target.getAttribute('data-click-switch'));
    if (attr.length > 2) {  
   
      var group = document.getElementsByClassName(attr[0]);
      for (var i = 0, len = group.length; i < len; i++) util.removeClass(group[i], attr[2]);

      var target = document.getElementsByClassName(attr[1]);
      for (var i = 0, len = target.length; i < len; i++) util.addClass(target[i], attr[2]);

      evt.preventDefault();
    }
  }
  

  function hoverHandler(evt) {
    var attr = util.separate(evt.target.getAttribute('data-hover-switch'));
    if (attr.length > 1) {
      var targets = document.getElementsByClassName(attr[0]);
  
      if (evt.type == 'mouseenter') for (var i = 0, len = targets.length; i < len; i++) util.addClass(targets[i], attr[1]);      

      if (evt.type == 'mouseleave') for (var i = 0, len = targets.length; i < len; i++) util.removeClass(targets[i], attr[1]);
    }
  }
  

  var switches;
  switches = document.querySelectorAll('[data-click-switch]');
  if (switches) for (var i = 0, len = switches.length; i < len; i++) util.on(switches[i], 'click', clickHandler);
  switches = document.querySelectorAll('[data-hover-switch]');
  if (switches) for (var i = 0, len = switches.length; i < len; i++) util.on(switches[i], 'mouseenter mouseleave', hoverHandler);
  
}

initSwitches();

