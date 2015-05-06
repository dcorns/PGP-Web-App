/**
 * pgp
 * Created by dcorns on 3/25/15.
 */
'use strict';
var pgpMdl = {
  name: String,
  ta: String,
  student: String,
  course: String,
  rtg1: String,
  rtg2: String,
  rtg3: String,
  rtg4: String,
  rtg5: String,
  rtg6: String,
  rtg7: String,
  rtg1a: String,
  rtg2a: String,
  rtg3a: String,
  rtg4a: String,
  rtg5a: String,
  rtg6a: String,
  rtg7a: String,
  note: String,
  goal: String,
  goal2: String,
  goal3: String,
  goal4: String,
  goal5: String,
  goala: String,
  goal2a: String,
  goal3a: String,
  goal4a: String,
  goal5a: String,
  goalsrc1: [],
  goalsrc2: [],
  goalsrc3: [],
  goalsrc4: [],
  goalsrc5: [],
  rec1: String,
  rec2: String,
  rec3: String,
  rec4: String,
  rec5: String,
  rec6: String,
  rec7: String,
  recsrc1: [],
  recsrc2: [],
  recsrc3: [],
  recsrc4: [],
  recsrc5: [],
  recsrc6: [],
  recsrc7: [],
  moresrc: [],
  feedbk: String,
  preRtgComplete: Boolean,
  rtgComplete: Boolean,
  recComplete: Boolean,
  status: String
};
module.exports = function (app){
  app.pgpMdl = pgpMdl;
};