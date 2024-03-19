/*********** 
 * Rl Test *
 ***********/

import { PsychoJS } from './lib/core-2020.2.js';
import * as core from './lib/core-2020.2.js';
import { TrialHandler } from './lib/data-2020.2.js';
import { Scheduler } from './lib/util-2020.2.js';
import * as visual from './lib/visual-2020.2.js';
import * as sound from './lib/sound-2020.2.js';
import * as util from './lib/util-2020.2.js';
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: false,
  color: new util.Color([0, 0, 0]),
  units: 'height',
  waitBlanking: true
});

// store info about the experiment session:
let expName = 'rl';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'age': '', 'gender': '', 'years of education': ''};

// Start code blocks for 'Before Experiment'
//condition = choose(["cued", "uncued"]);




// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(InstructionsRoutineBegin());
flowScheduler.add(InstructionsRoutineEachFrame());
flowScheduler.add(InstructionsRoutineEnd());
const outerLoopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(outerLoopLoopBegin, outerLoopLoopScheduler);
flowScheduler.add(outerLoopLoopScheduler);
flowScheduler.add(outerLoopLoopEnd);
flowScheduler.add(EndRoutineBegin());
flowScheduler.add(EndRoutineEachFrame());
flowScheduler.add(EndRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'auditory_stim/silence.wav', 'path': 'auditory_stim/silence.wav'},
    {'name': 'Rewardnull.png', 'path': 'Rewardnull.png'},
    {'name': 'images/blue_box.png', 'path': 'images/blue_box.png'},
    {'name': 'images/gold_box.png', 'path': 'images/gold_box.png'},
    {'name': 'auditory_stim/coin4.wav', 'path': 'auditory_stim/coin4.wav'},
    {'name': 'cued.csv', 'path': 'cued.csv'},
    {'name': 'auditory_stim/coin2.wav', 'path': 'auditory_stim/coin2.wav'},
    {'name': 'images/Reward5.png', 'path': 'images/Reward5.png'},
    {'name': 'images/Reward1.png', 'path': 'images/Reward1.png'},
    {'name': 'uncued.csv', 'path': 'uncued.csv'},
    {'name': 'images/Rewardnull.png', 'path': 'images/Rewardnull.png'},
    {'name': 'images/Reward2.png', 'path': 'images/Reward2.png'},
    {'name': 'images/Reward4.png', 'path': 'images/Reward4.png'},
    {'name': 'images/red_box.png', 'path': 'images/red_box.png'},
    {'name': 'images/Reward3.png', 'path': 'images/Reward3.png'},
    {'name': 'auditory_stim/coin1.wav', 'path': 'auditory_stim/coin1.wav'},
    {'name': 'auditory_stim/silence_short.wav', 'path': 'auditory_stim/silence_short.wav'},
    {'name': 'auditory_stim/coin5.wav', 'path': 'auditory_stim/coin5.wav'},
    {'name': 'images/green_box.png', 'path': 'images/green_box.png'},
    {'name': 'images/purple_box.png', 'path': 'images/purple_box.png'},
    {'name': 'conditions.xlsx', 'path': 'conditions.xlsx'},
    {'name': 'auditory_stim/coin3.wav', 'path': 'auditory_stim/coin3.wav'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2020.2.10';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  psychoJS.setRedirectUrls(('https://wvu.sona-systems.com/webstudy_credit.aspx?experiment_id=626&credit_token=8ef8ac89bde24d55bbed2ae6f007771a&survey_code=${e://Field/id}' + expInfo['participant']), '');

  return Scheduler.Event.NEXT;
}


var InstructionsClock;
var instructions;
var key_resp;
var green_example;
var blue_example;
var question;
var pointbar;
var purplebar;
var goldbar;
var leftamount;
var rightamount;
var choose;
var thisExp;
var trialClock;
var question_mark;
var blue;
var green;
var response;
var blue_reward;
var green_reward;
var purple_marker;
var gold_marker;
var points_marker;
var FeedbackClock;
var msgIm;
var vol;
var total;
var msgIm_opacity;
var fb_sound;
var fb_correct;
var feedbackIm;
var red_frame;
var fb_blue;
var fb_green;
var fb_blue_reward;
var fb_green_reward;
var purple;
var gold;
var points;
var ITI_2Clock;
var text;
var EndClock;
var thank_you;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "Instructions"
  InstructionsClock = new util.Clock();
  instructions = new visual.TextStim({
    win: psychoJS.window,
    name: 'instructions',
    text: "Welcome to the experiment!\n\nIn each trial you will be asked to choose between green and blue options by licking the mouse on the option you prefer. Each choice can result in either winning the number of points written on the chosen box or winning nothing. The odds of winning associated with green vs. blue will change throughout the experiment. You won't know what they are but can guess based on the feedback you get after each choice. \n\nThe red bar on the bottom left will move to the right as you earn points. Additional 2 dollars will be added to your payment if you reach the purple mark, and additional 5 will be added if you reach the yellow mark. \nPlease press the SPACE bar to continue.",
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.2], height: 0.03,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  green_example = new visual.ImageStim({
    win : psychoJS.window,
    name : 'green_example', units : undefined, 
    image : 'images/green_box.png', mask : undefined,
    ori : 0, pos : [(- 0.2), (- 0.2)], size : [0.15, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -2.0 
  });
  blue_example = new visual.ImageStim({
    win : psychoJS.window,
    name : 'blue_example', units : undefined, 
    image : 'images/blue_box.png', mask : undefined,
    ori : 0, pos : [0.2, (- 0.2)], size : [0.15, 0.2],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -3.0 
  });
  question = new visual.TextStim({
    win: psychoJS.window,
    name: 'question',
    text: '?',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.2)], height: 0.03,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.686, (- 0.875), (- 0.875)]),  opacity: 1,
    depth: -4.0 
  });
  
  pointbar = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pointbar', units : 'pix', 
    image : 'images/red_box.png', mask : undefined,
    ori : 0, pos : [(- 300), (- 300)], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -5.0 
  });
  purplebar = new visual.ImageStim({
    win : psychoJS.window,
    name : 'purplebar', units : 'pix', 
    image : 'images/purple_box.png', mask : undefined,
    ori : 0, pos : [300, (- 300)], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -6.0 
  });
  goldbar = new visual.ImageStim({
    win : psychoJS.window,
    name : 'goldbar', units : 'pix', 
    image : 'images/gold_box.png', mask : undefined,
    ori : 0, pos : [400, (- 300)], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -7.0 
  });
  leftamount = new visual.TextStim({
    win: psychoJS.window,
    name: 'leftamount',
    text: '25',
    font: 'Arial',
    units: undefined, 
    pos: [(- 0.2), (- 0.2)], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.694, (- 0.882), (- 0.882)]),  opacity: 1,
    depth: -8.0 
  });
  
  rightamount = new visual.TextStim({
    win: psychoJS.window,
    name: 'rightamount',
    text: '50',
    font: 'Arial',
    units: undefined, 
    pos: [0.2, (- 0.2)], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.694, (- 0.882), (- 0.882)]),  opacity: 1,
    depth: -9.0 
  });
  
  choose = function choose(choices) {
      var index = Math.floor(Math.random() * choices.length);
      return choices[index];
      }
  thisExp = psychoJS.experiment;
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  question_mark = new visual.TextStim({
    win: psychoJS.window,
    name: 'question_mark',
    text: '?',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.694, (- 0.882), (- 0.882)]),  opacity: 1,
    depth: 0.0 
  });
  
  blue = new visual.ImageStim({
    win : psychoJS.window,
    name : 'blue', units : undefined, 
    image : 'images/blue_box.png', mask : undefined,
    ori : 0, pos : [0, 0], size : [0.3, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -1.0 
  });
  green = new visual.ImageStim({
    win : psychoJS.window,
    name : 'green', units : undefined, 
    image : 'images/green_box.png', mask : undefined,
    ori : 0, pos : [0, 0], size : [0.3, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -2.0 
  });
  
  
  response = new core.Mouse({
    win: psychoJS.window,
  });
  response.mouseClock = new util.Clock();
  blue_reward = new visual.TextStim({
    win: psychoJS.window,
    name: 'blue_reward',
    text: 'default text',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.694, (- 0.882), (- 0.882)]),  opacity: 1,
    depth: -5.0 
  });
  
  green_reward = new visual.TextStim({
    win: psychoJS.window,
    name: 'green_reward',
    text: 'default text',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.686, (- 0.875), (- 0.875)]),  opacity: 1,
    depth: -6.0 
  });
  
  purple_marker = new visual.ImageStim({
    win : psychoJS.window,
    name : 'purple_marker', units : 'pix', 
    image : 'images/purple_box.png', mask : undefined,
    ori : 0, pos : [400, (- 250)], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -7.0 
  });
  gold_marker = new visual.ImageStim({
    win : psychoJS.window,
    name : 'gold_marker', units : 'pix', 
    image : 'images/gold_box.png', mask : undefined,
    ori : 0, pos : [600, (- 250)], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -8.0 
  });
  points_marker = new visual.ImageStim({
    win : psychoJS.window,
    name : 'points_marker', units : 'pix', 
    image : 'images/red_box.png', mask : undefined,
    ori : 0, pos : [0, 0], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -9.0 
  });
  // Initialize components for Routine "Feedback"
  FeedbackClock = new util.Clock();
  msgIm = "";
  vol = "";
  total = 0;
  msgIm_opacity = 0;
  
  fb_sound = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  fb_sound.setVolume(1.0);
  fb_correct = new visual.ImageStim({
    win : psychoJS.window,
    name : 'fb_correct', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [0, 0], size : [0.3, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -3.0 
  });
  feedbackIm = new visual.ImageStim({
    win : psychoJS.window,
    name : 'feedbackIm', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0, pos : [0, 0], size : [0.22, 0.24],
    color : new util.Color([1, 1, 1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -4.0 
  });
  red_frame = new visual.ImageStim({
    win : psychoJS.window,
    name : 'red_frame', units : undefined, 
    image : 'images/red_box.png', mask : undefined,
    ori : 0, pos : [0, 0], size : [0.35, 0.45],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -5.0 
  });
  fb_blue = new visual.ImageStim({
    win : psychoJS.window,
    name : 'fb_blue', units : undefined, 
    image : 'images/blue_box.png', mask : undefined,
    ori : 0, pos : [0, 0], size : [0.3, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -6.0 
  });
  fb_green = new visual.ImageStim({
    win : psychoJS.window,
    name : 'fb_green', units : undefined, 
    image : 'images/green_box.png', mask : undefined,
    ori : 0, pos : [0, 0], size : [0.3, 0.4],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -7.0 
  });
  fb_blue_reward = new visual.TextStim({
    win: psychoJS.window,
    name: 'fb_blue_reward',
    text: 'default text',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.694, (- 0.882), (- 0.882)]),  opacity: 1,
    depth: -8.0 
  });
  
  fb_green_reward = new visual.TextStim({
    win: psychoJS.window,
    name: 'fb_green_reward',
    text: 'default text',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.694, (- 0.882), (- 0.882)]),  opacity: 1,
    depth: -9.0 
  });
  
  purple = new visual.ImageStim({
    win : psychoJS.window,
    name : 'purple', units : 'pix', 
    image : 'images/purple_box.png', mask : undefined,
    ori : 0, pos : [400, (- 250)], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -10.0 
  });
  gold = new visual.ImageStim({
    win : psychoJS.window,
    name : 'gold', units : 'pix', 
    image : 'images/gold_box.png', mask : undefined,
    ori : 0, pos : [600, (- 250)], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -11.0 
  });
  points = new visual.ImageStim({
    win : psychoJS.window,
    name : 'points', units : 'pix', 
    image : 'images/red_box.png', mask : undefined,
    ori : 0, pos : [0, 0], size : [10, 20],
    color : new util.Color([1, 1, 1]), opacity : 1,
    flipHoriz : false, flipVert : false,
    texRes : 128, interpolate : true, depth : -12.0 
  });
  // Initialize components for Routine "ITI_2"
  ITI_2Clock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: '+',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color([0.694, (- 0.882), (- 0.882)]),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "End"
  EndClock = new util.Clock();
  thank_you = new visual.TextStim({
    win: psychoJS.window,
    name: 'thank_you',
    text: 'This is the end of the experiment.\nThank you for your time.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var _key_resp_allKeys;
var InstructionsComponents;
function InstructionsRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Instructions'-------
    t = 0;
    InstructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    // keep track of which components have finished
    InstructionsComponents = [];
    InstructionsComponents.push(instructions);
    InstructionsComponents.push(key_resp);
    InstructionsComponents.push(green_example);
    InstructionsComponents.push(blue_example);
    InstructionsComponents.push(question);
    InstructionsComponents.push(pointbar);
    InstructionsComponents.push(purplebar);
    InstructionsComponents.push(goldbar);
    InstructionsComponents.push(leftamount);
    InstructionsComponents.push(rightamount);
    
    for (const thisComponent of InstructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function InstructionsRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Instructions'-------
    // get current time
    t = InstructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instructions* updates
    if (t >= 0.0 && instructions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instructions.tStart = t;  // (not accounting for frame time here)
      instructions.frameNStart = frameN;  // exact frame index
      
      instructions.setAutoDraw(true);
    }

    
    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }

    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *green_example* updates
    if (t >= 0.0 && green_example.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      green_example.tStart = t;  // (not accounting for frame time here)
      green_example.frameNStart = frameN;  // exact frame index
      
      green_example.setAutoDraw(true);
    }

    
    // *blue_example* updates
    if (t >= 0.0 && blue_example.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blue_example.tStart = t;  // (not accounting for frame time here)
      blue_example.frameNStart = frameN;  // exact frame index
      
      blue_example.setAutoDraw(true);
    }

    
    // *question* updates
    if (t >= 0.0 && question.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      question.tStart = t;  // (not accounting for frame time here)
      question.frameNStart = frameN;  // exact frame index
      
      question.setAutoDraw(true);
    }

    
    // *pointbar* updates
    if (t >= 0.0 && pointbar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pointbar.tStart = t;  // (not accounting for frame time here)
      pointbar.frameNStart = frameN;  // exact frame index
      
      pointbar.setAutoDraw(true);
    }

    
    // *purplebar* updates
    if (t >= 0.0 && purplebar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      purplebar.tStart = t;  // (not accounting for frame time here)
      purplebar.frameNStart = frameN;  // exact frame index
      
      purplebar.setAutoDraw(true);
    }

    
    // *goldbar* updates
    if (t >= 0.0 && goldbar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      goldbar.tStart = t;  // (not accounting for frame time here)
      goldbar.frameNStart = frameN;  // exact frame index
      
      goldbar.setAutoDraw(true);
    }

    
    // *leftamount* updates
    if (t >= 0.0 && leftamount.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      leftamount.tStart = t;  // (not accounting for frame time here)
      leftamount.frameNStart = frameN;  // exact frame index
      
      leftamount.setAutoDraw(true);
    }

    
    // *rightamount* updates
    if (t >= 0.0 && rightamount.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rightamount.tStart = t;  // (not accounting for frame time here)
      rightamount.frameNStart = frameN;  // exact frame index
      
      rightamount.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of InstructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function InstructionsRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Instructions'-------
    for (const thisComponent of InstructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        routineTimer.reset();
        }
    
    key_resp.stop();
    // the Routine "Instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var outerLoop;
var currentLoop;
function outerLoopLoopBegin(outerLoopLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  outerLoop = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.RANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'conditions.xlsx',
    seed: undefined, name: 'outerLoop'
  });
  psychoJS.experiment.addLoop(outerLoop); // add the loop to the experiment
  currentLoop = outerLoop;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisOuterLoop of outerLoop) {
    const snapshot = outerLoop.getSnapshot();
    outerLoopLoopScheduler.add(importConditions(snapshot));
    const trialsLoopScheduler = new Scheduler(psychoJS);
    outerLoopLoopScheduler.add(trialsLoopBegin, trialsLoopScheduler);
    outerLoopLoopScheduler.add(trialsLoopScheduler);
    outerLoopLoopScheduler.add(trialsLoopEnd);
    outerLoopLoopScheduler.add(endLoopIteration(outerLoopLoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


var trials;
function trialsLoopBegin(trialsLoopScheduler) {
  // set up handler to look after randomisation of conditions etc
  trials = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: thisCond,
    seed: undefined, name: 'trials'
  });
  psychoJS.experiment.addLoop(trials); // add the loop to the experiment
  currentLoop = trials;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisTrial of trials) {
    const snapshot = trials.getSnapshot();
    trialsLoopScheduler.add(importConditions(snapshot));
    trialsLoopScheduler.add(trialRoutineBegin(snapshot));
    trialsLoopScheduler.add(trialRoutineEachFrame(snapshot));
    trialsLoopScheduler.add(trialRoutineEnd(snapshot));
    trialsLoopScheduler.add(FeedbackRoutineBegin(snapshot));
    trialsLoopScheduler.add(FeedbackRoutineEachFrame(snapshot));
    trialsLoopScheduler.add(FeedbackRoutineEnd(snapshot));
    trialsLoopScheduler.add(ITI_2RoutineBegin(snapshot));
    trialsLoopScheduler.add(ITI_2RoutineEachFrame(snapshot));
    trialsLoopScheduler.add(ITI_2RoutineEnd(snapshot));
    trialsLoopScheduler.add(endLoopIteration(trialsLoopScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function trialsLoopEnd() {
  psychoJS.experiment.removeLoop(trials);

  return Scheduler.Event.NEXT;
}


function outerLoopLoopEnd() {
  psychoJS.experiment.removeLoop(outerLoop);

  return Scheduler.Event.NEXT;
}


var corr;
var gain;
var px;
var gotValidClick;
var trialComponents;
function trialRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'trial'-------
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    blue.setPos([pb, 0]);
    green.setPos([pg, 0]);
    corr = 0;
    gain = 0;
    px = 0;
    // setup some python lists for storing info about the response
    // current position of the mouse:
    response.x = [];
    response.y = [];
    response.leftButton = [];
    response.midButton = [];
    response.rightButton = [];
    response.time = [];
    response.clicked_name = [];
    gotValidClick = false; // until a click is received
    blue_reward.setPos([pb, 0]);
    blue_reward.setText(reward_blue);
    green_reward.setPos([pg, 0]);
    green_reward.setText(reward_green);
    points_marker.setPos([((total / 10) - 500), (- 250)]);
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(question_mark);
    trialComponents.push(blue);
    trialComponents.push(green);
    trialComponents.push(response);
    trialComponents.push(blue_reward);
    trialComponents.push(green_reward);
    trialComponents.push(purple_marker);
    trialComponents.push(gold_marker);
    trialComponents.push(points_marker);
    
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
var _mouseXYs;
function trialRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'trial'-------
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *question_mark* updates
    if (t >= 0.0 && question_mark.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      question_mark.tStart = t;  // (not accounting for frame time here)
      question_mark.frameNStart = frameN;  // exact frame index
      
      question_mark.setAutoDraw(true);
    }

    
    // *blue* updates
    if (t >= 0 && blue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blue.tStart = t;  // (not accounting for frame time here)
      blue.frameNStart = frameN;  // exact frame index
      
      blue.setAutoDraw(true);
    }

    
    // *green* updates
    if (t >= 0 && green.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      green.tStart = t;  // (not accounting for frame time here)
      green.frameNStart = frameN;  // exact frame index
      
      green.setAutoDraw(true);
    }

    for (var stimulus, _pj_c = 0, _pj_a = [blue, green], _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        stimulus = _pj_a[_pj_c];
        if (response.isPressedIn(stimulus)) {
            px = stimulus.pos[0];
            var corrAnsMaybe = "images/" + stimulus.name + "_box.png";
            console.log(stimulus.name, corrAns, corrAnsMaybe, corrAnsMaybe === corrAns, pb, pg, px);
            if ((corrAnsMaybe === corrAns)) {
                corr = 1;
                gain = corrAmount;
            }
            thisExp.addData("correct", corr);
            continueRoutine = false;
        }
    }
    
    // *response* updates
    if (t >= 0 && response.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      response.tStart = t;  // (not accounting for frame time here)
      response.frameNStart = frameN;  // exact frame index
      
      response.status = PsychoJS.Status.STARTED;
      response.mouseClock.reset();
      prevButtonState = response.getPressed();  // if button is down already this ISN'T a new click
      }
    if (response.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = response.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          _mouseXYs = response.getPos();
          response.x.push(_mouseXYs[0]);
          response.y.push(_mouseXYs[1]);
          response.leftButton.push(_mouseButtons[0]);
          response.midButton.push(_mouseButtons[1]);
          response.rightButton.push(_mouseButtons[2]);
          response.time.push(response.mouseClock.getTime());
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [blue, green]) {
            if (obj.contains(response)) {
              gotValidClick = true;
              response.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *blue_reward* updates
    if (t >= 0.0 && blue_reward.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blue_reward.tStart = t;  // (not accounting for frame time here)
      blue_reward.frameNStart = frameN;  // exact frame index
      
      blue_reward.setAutoDraw(true);
    }

    
    // *green_reward* updates
    if (t >= 0.0 && green_reward.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      green_reward.tStart = t;  // (not accounting for frame time here)
      green_reward.frameNStart = frameN;  // exact frame index
      
      green_reward.setAutoDraw(true);
    }

    
    // *purple_marker* updates
    if (t >= 0.0 && purple_marker.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      purple_marker.tStart = t;  // (not accounting for frame time here)
      purple_marker.frameNStart = frameN;  // exact frame index
      
      purple_marker.setAutoDraw(true);
    }

    
    // *gold_marker* updates
    if (t >= 0.0 && gold_marker.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      gold_marker.tStart = t;  // (not accounting for frame time here)
      gold_marker.frameNStart = frameN;  // exact frame index
      
      gold_marker.setAutoDraw(true);
    }

    
    // *points_marker* updates
    if (t >= 0.0 && points_marker.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      points_marker.tStart = t;  // (not accounting for frame time here)
      points_marker.frameNStart = frameN;  // exact frame index
      
      points_marker.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function trialRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'trial'-------
    for (const thisComponent of trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for thisExp (ExperimentHandler)
    psychoJS.experiment.addData('response.x', response.x);
    psychoJS.experiment.addData('response.y', response.y);
    psychoJS.experiment.addData('response.leftButton', response.leftButton);
    psychoJS.experiment.addData('response.midButton', response.midButton);
    psychoJS.experiment.addData('response.rightButton', response.rightButton);
    psychoJS.experiment.addData('response.time', response.time);
    psychoJS.experiment.addData('response.clicked_name', response.clicked_name);
    
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var FeedbackComponents;
function FeedbackRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'Feedback'-------
    t = 0;
    FeedbackClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(5.000000);
    // update component parameters for each repeat
    for (var stimulus, _pj_c = 0, _pj_a = [blue, green], _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        stimulus = _pj_a[_pj_c];
        if (response.isPressedIn(stimulus)) {
            px = stimulus.pos[0];
        }
    }
    
    if ((corr === 1)) {
        msgIm = ("images/" + cash_corr);
        msgIm_opacity = 1;
        vol = 1;
        total = (total + gain);
    } else {
        msgIm = ("images/" + cash_corr);
        msgIm_opacity = 0;
        vol = 0;
        total = (total + 0);
    }
    
    fb_sound = new sound.Sound({
    win: psychoJS.window,
    value: audio_corr,
    secs: 4,
    });
    fb_sound.secs=4;
    fb_sound.setVolume(vol);
    fb_correct.setImage(corrAns);
    feedbackIm.setOpacity(msgIm_opacity);
    feedbackIm.setImage(msgIm);
    red_frame.setPos([px, 0]);
    fb_blue.setPos([pb, 0]);
    fb_green.setPos([pg, 0]);
    fb_blue_reward.setText(reward_blue);
    fb_green_reward.setText(reward_green);
    // keep track of which components have finished
    FeedbackComponents = [];
    FeedbackComponents.push(fb_sound);
    FeedbackComponents.push(fb_correct);
    FeedbackComponents.push(feedbackIm);
    FeedbackComponents.push(red_frame);
    FeedbackComponents.push(fb_blue);
    FeedbackComponents.push(fb_green);
    FeedbackComponents.push(fb_blue_reward);
    FeedbackComponents.push(fb_green_reward);
    FeedbackComponents.push(purple);
    FeedbackComponents.push(gold);
    FeedbackComponents.push(points);
    
    for (const thisComponent of FeedbackComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function FeedbackRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'Feedback'-------
    // get current time
    t = FeedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // start/stop fb_sound
    if (t >= 1.0 && fb_sound.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fb_sound.tStart = t;  // (not accounting for frame time here)
      fb_sound.frameNStart = frameN;  // exact frame index
      
      fb_sound.play();  // start the sound (it finishes automatically)
      fb_sound.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1.0 + 4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((fb_sound.status === PsychoJS.Status.STARTED || fb_sound.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      if (4 > 0.5) {  fb_sound.stop();  // stop the sound (if longer than duration)
        fb_sound.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *fb_correct* updates
    if (t >= 1.0 && fb_correct.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fb_correct.tStart = t;  // (not accounting for frame time here)
      fb_correct.frameNStart = frameN;  // exact frame index
      
      fb_correct.setAutoDraw(true);
    }

    frameRemains = 1.0 + 4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((fb_correct.status === PsychoJS.Status.STARTED || fb_correct.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      fb_correct.setAutoDraw(false);
    }
    
    // *feedbackIm* updates
    if (t >= 1 && feedbackIm.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedbackIm.tStart = t;  // (not accounting for frame time here)
      feedbackIm.frameNStart = frameN;  // exact frame index
      
      feedbackIm.setAutoDraw(true);
    }

    frameRemains = 1 + 4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((feedbackIm.status === PsychoJS.Status.STARTED || feedbackIm.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      feedbackIm.setAutoDraw(false);
    }
    
    // *red_frame* updates
    if (t >= 0.0 && red_frame.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      red_frame.tStart = t;  // (not accounting for frame time here)
      red_frame.frameNStart = frameN;  // exact frame index
      
      red_frame.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((red_frame.status === PsychoJS.Status.STARTED || red_frame.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      red_frame.setAutoDraw(false);
    }
    
    // *fb_blue* updates
    if (t >= 0.0 && fb_blue.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fb_blue.tStart = t;  // (not accounting for frame time here)
      fb_blue.frameNStart = frameN;  // exact frame index
      
      fb_blue.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((fb_blue.status === PsychoJS.Status.STARTED || fb_blue.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      fb_blue.setAutoDraw(false);
    }
    
    // *fb_green* updates
    if (t >= 0.0 && fb_green.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fb_green.tStart = t;  // (not accounting for frame time here)
      fb_green.frameNStart = frameN;  // exact frame index
      
      fb_green.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((fb_green.status === PsychoJS.Status.STARTED || fb_green.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      fb_green.setAutoDraw(false);
    }
    
    // *fb_blue_reward* updates
    if (t >= 0.0 && fb_blue_reward.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fb_blue_reward.tStart = t;  // (not accounting for frame time here)
      fb_blue_reward.frameNStart = frameN;  // exact frame index
      
      fb_blue_reward.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((fb_blue_reward.status === PsychoJS.Status.STARTED || fb_blue_reward.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      fb_blue_reward.setAutoDraw(false);
    }
    
    if (fb_blue_reward.status === PsychoJS.Status.STARTED){ // only update if being drawn
      fb_blue_reward.setPos([pb, 0], false);
    }
    
    // *fb_green_reward* updates
    if (t >= 0.0 && fb_green_reward.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fb_green_reward.tStart = t;  // (not accounting for frame time here)
      fb_green_reward.frameNStart = frameN;  // exact frame index
      
      fb_green_reward.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((fb_green_reward.status === PsychoJS.Status.STARTED || fb_green_reward.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      fb_green_reward.setAutoDraw(false);
    }
    
    if (fb_green_reward.status === PsychoJS.Status.STARTED){ // only update if being drawn
      fb_green_reward.setPos([pg, 0], false);
    }
    
    // *purple* updates
    if (t >= 0.0 && purple.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      purple.tStart = t;  // (not accounting for frame time here)
      purple.frameNStart = frameN;  // exact frame index
      
      purple.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((purple.status === PsychoJS.Status.STARTED || purple.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      purple.setAutoDraw(false);
    }
    
    // *gold* updates
    if (t >= 0.0 && gold.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      gold.tStart = t;  // (not accounting for frame time here)
      gold.frameNStart = frameN;  // exact frame index
      
      gold.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((gold.status === PsychoJS.Status.STARTED || gold.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      gold.setAutoDraw(false);
    }
    
    // *points* updates
    if (t >= 0.0 && points.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      points.tStart = t;  // (not accounting for frame time here)
      points.frameNStart = frameN;  // exact frame index
      
      points.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((points.status === PsychoJS.Status.STARTED || points.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      points.setAutoDraw(false);
    }
    
    if (points.status === PsychoJS.Status.STARTED){ // only update if being drawn
      points.setPos([((total / 10) - 500), (- 250)], false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of FeedbackComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function FeedbackRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'Feedback'-------
    for (const thisComponent of FeedbackComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    if ((trials.thisTrialN === 290)) {
        trials.finished = true;
    }
    
    fb_sound.stop();  // ensure sound has stopped at end of routine
    return Scheduler.Event.NEXT;
  };
}


var ITI_2Components;
function ITI_2RoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'ITI_2'-------
    t = 0;
    ITI_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    ITI_2Components = [];
    ITI_2Components.push(text);
    
    for (const thisComponent of ITI_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ITI_2RoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'ITI_2'-------
    // get current time
    t = ITI_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }

    frameRemains = 0.0 + ITI_s - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((text.status === PsychoJS.Status.STARTED || text.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      text.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ITI_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ITI_2RoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'ITI_2'-------
    for (const thisComponent of ITI_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "ITI_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var EndComponents;
function EndRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'End'-------
    t = 0;
    EndClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(3.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    EndComponents = [];
    EndComponents.push(thank_you);
    
    for (const thisComponent of EndComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function EndRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'End'-------
    // get current time
    t = EndClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *thank_you* updates
    if (t >= 0.0 && thank_you.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thank_you.tStart = t;  // (not accounting for frame time here)
      thank_you.frameNStart = frameN;  // exact frame index
      
      thank_you.setAutoDraw(true);
    }

    frameRemains = 0.0 + 3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((thank_you.status === PsychoJS.Status.STARTED || thank_you.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      thank_you.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of EndComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function EndRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'End'-------
    for (const thisComponent of EndComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
