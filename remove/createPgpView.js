/**
 * createPgpView
 * Created by dcorns on 3/24/15.
 */
'use strict';

var ui = require('../js/ui');

module.exports = function(){
  //var ux = ui();
  //ux.hideMainButtons();
  //var ca = document.getElementById('btncreateaccount');
  //ca.className = 'hidden';
  //var btnCreatePgp = document.getElementById('btncreatepgp');
  //btnCreatePgp.className = 'nav_ul-li';
  //document.getElementById('btnviewpgp').className = 'nav_ul-li';

  //main view
  document.getElementById('dgView').innerHTML = '';
  ux.addTag('dgView', 'Article', 'createPGP');

  ux.addTag('createPGP', 'form', 'createPGPForm');
  ux.addTag('createPGPForm', 'fieldset', 'createPGPSelect');
  ux.addTextTag('createPGPSelect', 'legend', 'Please Select A Student');
  ux.addTag('createPGPSelect', 'select', 'studentSelect');

  ux.addTextTag('createPGPForm', 'h2', 'Save New Resources Here');
  ux.addTag('createPGPForm', 'form', 'frmGoalResource');
  ux.addInput('frmGoalResource', 'resrcTitle', 'New Resource Title', 'text');
  ux.addInput('frmGoalResource', 'resrcDescription', 'New Resource Description', 'text');
  ux.addInput('frmGoalResource', 'resrcLink', 'New Resource Link', 'text');
  ux.addTag('frmGoalResource', 'form','chooseResourceTopics');
  ux.addTextTag('chooseResourceTopics', 'h3', 'Check all that apply to new Resource');
  ux.addButton('frmGoalResource', 'btnSaveResource', 'Save New Resource');

  ux.addToggleViewButton('createPGPForm', 'btnGoalsToggle', 'GOALS', 'btnOn', 'fGoals');
  ux.addTag('createPGPForm', 'fieldset', 'fGoals');
  ux.addTextTag('fGoals', 'legend', 'Goals');
  //ux.addTag('fGoals','div', 'addGenResource');

  ux.addToggleViewButton('fGoals', 'btnG1On', 'LongTermGoals', 'btnOn', 'fG1');
  ux.addTag('fGoals', 'fieldset', 'fG1');
  ux.addTextTag('fG1', 'label', 'My long term goals:', 'pgpQuestions');
  ux.addTag('fG1', 'p', 'preGoala', 'preSurvey', 'PreSurvey: ');
  ux.addTag('fG1', 'p', 'postGoala', 'postSurvey', 'PostSurvey');

  ux.addLabel('fG1', 'sG1', 'General Resources');
  ux.addTag('fG1', 'select', 'sG1');
  ux.addTextTag('fG1', 'label', 'Resource Blame: ');
  ux.addButton('fG1', 'addToPlan', 'Add Resource to Plan');
  ux.addTextTag('fG1', 'label', 'Remove from Plan: Alt+Click');
  ux.addTag('fG1', 'ul', 'goalAresources', 'resourceList');
};