/**
 * Created by dcorns on 10/12/14.
 */
'use strict';
var Resource = require('../models/resource');
var db = require('../js/dbutils');
var auth = require('../js/authorize');
var User = require('../models/user');
var corngoose = require('../js/corngoose');

module.exports = function (app) {
  var baseUrl = '/api/v_0_0_1/pgps/resources';

  //app.get(baseUrl, function (req, res) {
  //  Resource.find({}, function (err, rsrc) {
  //    if (err) return res.status(500).json(err);
  //    var dbs = db(rsrc);
  //    dbs.addNames(function(err, rdata){
  //      if (err) return res.status(503).json(err);
  //      return res.status(200).json(rdata);
  //    });
  //  });
  //});

  //app.get(baseUrl + '/:id', function (req, res) {
  //  Note.findOne({'_id': req.params.id}, function (err, note) {
  //    if (err) return res.status(500).json(err);
  //    return res.json(note);
  //  });
  //});
  //
  //app.post(baseUrl, function (req, res) {
  //  var user = {};
  //  var token = req.headers.authorization;
  //  var a = auth(user);
  //  a.getTokenInfo(token, function(err, usr){
  //    if(err){
  //      res.status(500).json(err);
  //    }
  //    req.body.resource.addedBy = usr._id;
  //    var ntsUtil = db(req.body);
  //    ntsUtil.pushResource(function (err, rd) {
  //      if (err) return res.status(500).json(err);
  //      return res.status(200).json(rd);
  //    });
  //    return res.status(502);
  //
  //  });
  //
  //
  //});
  //
  ////Delete Resource
  //app.put(baseUrl, function (req, res) {
  //  var user = {};
  //  var token = req.headers.authorization;
  //  var a = auth(user);
  //  a.getTokenInfo(token, function(err, usr){
  //    if(err){
  //      res.status(500).json(err);
  //    }
  //    if(usr._id == req.body.resource.addedBy || usr.roll === 'admin'){
  //      var ntsUtil = db(req.body);
  //      ntsUtil.spliceResource(function(err, rd){
  //        if (err) return res.status(502).json(err);
  //        return res.status(200).json(rd);
  //      });
  //    }
  //    else{
  //      return res.status(500).json({error: 'Resource can only be removed by creator or an admin'});
  //    }
  //  });
  //});

  app.post(baseUrl, function (req, res) {
    console.log('post: ' + baseUrl);
    var token = req.body.atoken;
    var a = auth(req.body);
     a.getTokenInfo(token, function (err, usr) {
    if(err){
      return res.status(500).json(err);
    }
    if (typeof token !== 'undefined') {
        corngoose.getCollection('resourceList', function(err, rsrcs){
          if(err)return res.status(500).json(err);
          var payLoad = {resourceList: rsrcs};
          corngoose.getCollection('topicList', function(err, topics){
            if(err) return res.status(500).json(err);
            payLoad.topicList = topics;
            return res.status(200).json(payLoad);
          });
        });
    }
    else {
      return res.status(202).send(token);
    }
    });
  });

  app.post(baseUrl + '/save', function (req, res) {
    var nrsrc = req.body;
    var token = nrsrc.token;
    delete nrsrc.token;
    var a = auth();
    a.getTokenInfo(token, function (err, usr) {
      if(err){
        return res.status(500).json(err);
      }
      nrsrc.addedBy = usr.email;
      if (typeof usr !== 'undefined') {
        corngoose.dbDocInsert({title: nrsrc.title}, nrsrc, 'resourceList', function(err, data){
          if(err) return res.status(500).json(err);
          return res.status(200).json(data);
        });
      }
      else {
        return res.status(202).send(usr);
      }
    });
  });

  app.post(baseUrl + '/remove', function (req, res){
    var removeMe = req.body;
    var token = removeMe.token;
    delete removeMe.token;
    var a = auth();
    a.getTokenInfo(token, function(err, usr){
      if(err) return res.status(500).json(err);
      if(typeof usr !== 'undefined'){
        corngoose.dbDocRemove({title: removeMe.title}, 'resourceList', function(err, success){
          if(err) return res.status(500).json(err);
          return res.status(200).json(success);
        });
      }
      else{
        return res.status(202).send(usr);
      }
    });
  });

};