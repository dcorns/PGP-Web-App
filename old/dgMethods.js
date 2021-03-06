/**
 * dgMethods
 * Created by dcorns on 3/16/15.
 * Common methods for dgApp
 */
'use strict';
var dgMethod = {};
//Method for setting scripts to run after the window loads
dgMethod.winReady = function(f){
  var preOnload = window.onload;
  if(typeof preOnload !== 'function'){
    window.onload = f;
  }
  else{
    window.onload = function() {
      preOnload();
      f();
    }
  }
};

dgMethod.ajaxPostJson = function(url, jsonData, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    console.dir(ajaxReq);
    console.dir(data);
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('POST', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json');
if(token){
  ajaxReq.setRequestHeader('Authorization', token);
}
  ajaxReq.send(JSON.stringify(jsonData));
};

dgMethod.ajaxPutJson = function(url, jsonData, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('PUT', url, true);
  ajaxReq.setRequestHeader('Content-Type', 'application/json');
  if(token){
    ajaxReq.setRequestHeader('Authorization', token);
  }
  ajaxReq.send(JSON.stringify(jsonData));
};

dgMethod.ajaxGet = function(url, cb, token){
  var ajaxReq = new XMLHttpRequest();
  ajaxReq.addEventListener('load', function(){
    if(ajaxReq.status === 200) cb(null, JSON.parse(ajaxReq.responseText));
    else cb(JSON.parse(ajaxReq.response), null);
  });
  ajaxReq.addEventListener('error', function(data){
    console.dir(ajaxReq);
    console.dir(data);
    cb({XMLHttpRequestError: 'A fatal error occurred, see console for more information'}, null);
  });

//Must open before setting request header, so this order is required
  ajaxReq.open('GET', url, true);
  //ajaxReq.setRequestHeader('Content-Type', 'application/json');
  if(token){
    ajaxReq.setRequestHeader('Authorization', token);
  }
  ajaxReq.send();
};

dgMethod.dataBindInput = function(elem, evnt, mdl, item){
  elem.addEventListener(evnt, function(){
    dgApp[mdl][item] = this.value;
  });
};

dgMethod.dataLoadSelect = function(elId, ary, item) {
  var el = document.getElementById(elId);
  el.innerHTML = '';
  var len = ary.length, c = 0, opt, display;
  for (c; c < len; c++) {
    if (Array.isArray(item)) {
      display = '';
      var itLen = item.length, itC = 0;
      for (itC; itC < itLen; itC++) {
        display = display + ary[c][item[itC]] + '|';
      }
      display = display.substr(0, display.length - 1);
    }
    else {
      display = '<label class=selOptTitle>' + ary[c][item] + '</label>';
    }
    opt = document.createElement('option');
    opt.innerHTML = display;
    opt.accessKey = c;
    el.appendChild(opt);
  }
};

dgMethod.makeFormCheckBoxGroup = function(formID, data, nameKey, descriptionKey, idKey){
  var elId = document.getElementById(formID), c = 0, len = data.length, cb, cblbl;
  for(c; c < len; c++){
    cb = document.createElement('input');
    cb.id = formID+ 'Cb' + c;
    cb.title = data[c][descriptionKey];
    cblbl = document.createElement('label');
    cblbl.for = cb.id;
    cblbl.innerHTML = data[c][nameKey];
    cb.setAttribute('type', 'checkbox');
    cb.alt = data[c][idKey] || c;
    elId.appendChild(cblbl);
    elId.appendChild(cb);
  }
};

dgMethod.arrayContains = function(ary, aValue, aKey){
  var c = 0, len = ary.length;
  if (aKey) {
    for (c; c < len; c++) {
      if(ary[c][aKey] === aValue) return true;
    }
  }
  else{
    for (c; c < len; c++) {
      if(ary[c] === aValue) return true;
    }
  }
};

dgMethod.selectAddOption = function (selId, optObj, item){
  var opt = document.createElement('option');
  opt.innerHTML = optObj[item];
  console.log(opt.innerHTML);
  var sel = document.getElementById(selId);
  opt.accessKey = sel.options.length;
  sel.appendChild(opt);
};

module.exports = function (app){
  app.dgMethod = dgMethod;
};