/************************ 
 * Digit Span Task *
 ************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.2.3.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'Digit Span Task';  // from the Builder filename that created this script
let expInfo = {
    'participant': '',
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
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
flowScheduler.add(helloRoutineBegin());
flowScheduler.add(helloRoutineEachFrame());
flowScheduler.add(helloRoutineEnd());
flowScheduler.add(InstructionsRoutineBegin());
flowScheduler.add(InstructionsRoutineEachFrame());
flowScheduler.add(InstructionsRoutineEnd());
const blocksLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blocksLoopBegin(blocksLoopScheduler));
flowScheduler.add(blocksLoopScheduler);
flowScheduler.add(blocksLoopEnd);








flowScheduler.add(EndRoutineBegin());
flowScheduler.add(EndRoutineEachFrame());
flowScheduler.add(EndRoutineEnd());
flowScheduler.add(Instructions_ForwardRoutineBegin());
flowScheduler.add(Instructions_ForwardRoutineEachFrame());
flowScheduler.add(Instructions_ForwardRoutineEnd());
const blocks_fwdLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blocks_fwdLoopBegin(blocks_fwdLoopScheduler));
flowScheduler.add(blocks_fwdLoopScheduler);
flowScheduler.add(blocks_fwdLoopEnd);








flowScheduler.add(End_FwdRoutineBegin());
flowScheduler.add(End_FwdRoutineEachFrame());
flowScheduler.add(End_FwdRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'choose_digitSpan.xlsx', 'path': 'choose_digitSpan.xlsx'},
    {'name': 'three.xlsx', 'path': 'three.xlsx'},
    {'name': 'four.xlsx', 'path': 'four.xlsx'},
    {'name': 'five.xlsx', 'path': 'five.xlsx'},
    {'name': 'six.xlsx', 'path': 'six.xlsx'},
    {'name': 'seven.xlsx', 'path': 'seven.xlsx'},
    {'name': 'eight.xlsx', 'path': 'eight.xlsx'},
    {'name': 'nine.xlsx', 'path': 'nine.xlsx'},
    {'name': 'ten.xlsx', 'path': 'ten.xlsx'},
    {'name': 'eleven.xlsx', 'path': 'eleven.xlsx'},
    {'name': 'twelve.xlsx', 'path': 'twelve.xlsx'},
    {'name': 'choose_digitSpan_fwd.xlsx', 'path': 'choose_digitSpan_fwd.xlsx'},
    {'name': 'three_fwd.xlsx', 'path': 'three_fwd.xlsx'},
    {'name': 'four_fwd.xlsx', 'path': 'four_fwd.xlsx'},
    {'name': 'five_fwd.xlsx', 'path': 'five_fwd.xlsx'},
    {'name': 'six_fwd.xlsx', 'path': 'six_fwd.xlsx'},
    {'name': 'seven_fwd.xlsx', 'path': 'seven_fwd.xlsx'},
    {'name': 'eight_fwd.xlsx', 'path': 'eight_fwd.xlsx'},
    {'name': 'nine_fwd.xlsx', 'path': 'nine_fwd.xlsx'},
    {'name': 'ten_fwd.xlsx', 'path': 'ten_fwd.xlsx'},
    {'name': 'eleven_fwd.xlsx', 'path': 'eleven_fwd.xlsx'},
    {'name': 'twelve_fwd.xlsx', 'path': 'twelve_fwd.xlsx'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.2.3';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var helloClock;
var text_hello;
var key_resp_hello;
var InstructionsClock;
var instr_bwd;
var start_bwd;
var PresentationClock;
var fixation;
var pres_text;
var RecallClock;
var recall_txt;
var textbox;
var allResponses;
var key_resp;
var FeedbackClock;
var feedback_text;
var EndClock;
var thank_you;
var Instructions_ForwardClock;
var instr_fwd;
var start_fwd;
var Presentation_ForwardClock;
var fixation_fwd;
var pres_text_fwd;
var Recall_ForwardClock;
var recall_txt_fwd;
var textbox_fwd;
var allResponsesfwd;
var key_resp_fwd;
var Feedback_ForwardClock;
var feedback_text_fwd;
var End_FwdClock;
var thank_you_fwd;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "hello"
  helloClock = new util.Clock();
  text_hello = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_hello',
    text: "Welcome to memory tests.\n\nThese tests require undivided attention. Make sure the room you are in is quiet and your phone is off or on silent.\n\nPLEASE DO NOT START THE TESTS BEFORE READING THE DESCRIPTIONS.\n\nThere are two consecutive tests in this study. The description of each test will appear on the screen before the test starts.\n\nPlease try to answer as quickly and accurately as possible in both tests.\n\nDO NOT USE PEN AND PAPER DURING TESTS.\nJUST KEEP THE NUMBERS IN MIND!\n\nPress SPACE when you're ready to continue.",
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp_hello = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Instructions"
  InstructionsClock = new util.Clock();
  instr_bwd = new visual.TextStim({
    win: psychoJS.window,
    name: 'instr_bwd',
    text: 'Digit Span Backward test\n\nIn this test, some number sequences will appear on your screen. What you are asked to do is to remember the number sequences and write them in "reverse order". For example, when 1-2-3 appears on the screen, you are asked to write 3-2-1 on the memory screen.\n\nThe test will start with 3-digit sequences (such as 1-2-3). If you remember the 3-digit strings correctly, the string will be extended by one digit (like 1-2-3-4). If you make three mistakes in a row, the test will end.\n\nUse the number keys on your keyboard to type your answer. If you make a mistake, you can correct your mistake with the BACKSPACE button. After entering the numbers, press ENTER to submit your response. You will receive feedback after each answer.\n\nDo not leave spaces between numbers when entering them. Do not enter any characters (+, -, etc.) other than numbers.\n\nIf you understand the explanations, press the SPACE key when you are ready to start the experiment.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  start_bwd = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Presentation"
  PresentationClock = new util.Clock();
  fixation = new visual.TextStim({
    win: psychoJS.window,
    name: 'fixation',
    text: '+',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  pres_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'pres_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "Recall"
  RecallClock = new util.Clock();
  recall_txt = new visual.TextStim({
    win: psychoJS.window,
    name: 'recall_txt',
    text: 'Write the numbers in reverse order',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.25], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  textbox = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.1,
    lineSpacing: 1.0,
    size: [null, null],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  // Run 'Begin Experiment' code from code
  allResponses = [];
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Feedback"
  FeedbackClock = new util.Clock();
  feedback_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "End"
  EndClock = new util.Clock();
  thank_you = new visual.TextStim({
    win: psychoJS.window,
    name: 'thank_you',
    text: 'The backward number sequence test is over.\nThe next number sequence will start soon.\nPlease wait...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "Instructions_Forward"
  Instructions_ForwardClock = new util.Clock();
  instr_fwd = new visual.TextStim({
    win: psychoJS.window,
    name: 'instr_fwd',
    text: 'Digit Span Forward test\n\nIn this test, some number sequences will appear on your screen. What you are asked to do is to remember the number sequences and write them "in the same order". For example, when 1-2-3 appears on the screen, you are asked to write 1-2-3 on the memory screen.\n\nThe test will start with 3-digit sequences (such as 1-2-3). If you remember the 3-digit strings correctly, the string will be extended by one digit (like 1-2-3-4). If you make three mistakes in a row, the test will end.\n\nUse the number keys on your keyboard to type your answer. If you make a mistake, you can correct your mistake with the BACKSPACE button. After entering the numbers, press ENTER to submit your response. You will receive feedback after each answer.\n\nDo not leave spaces between numbers when entering them. Do not enter any characters (+, -, etc.) other than numbers.\n\nIf you understand the explanations, press the SPACE key when you are ready to start the experiment.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  start_fwd = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Presentation_Forward"
  Presentation_ForwardClock = new util.Clock();
  fixation_fwd = new visual.TextStim({
    win: psychoJS.window,
    name: 'fixation_fwd',
    text: '+',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  pres_text_fwd = new visual.TextStim({
    win: psychoJS.window,
    name: 'pres_text_fwd',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "Recall_Forward"
  Recall_ForwardClock = new util.Clock();
  recall_txt_fwd = new visual.TextStim({
    win: psychoJS.window,
    name: 'recall_txt_fwd',
    text: 'Write the numbers in the same order',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.25], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  textbox_fwd = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox_fwd',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.1,
    lineSpacing: 1.0,
    size: [null, null],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  // Run 'Begin Experiment' code from code_fwd
  allResponsesfwd = [];
  
  key_resp_fwd = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Feedback_Forward"
  Feedback_ForwardClock = new util.Clock();
  feedback_text_fwd = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_text_fwd',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "End_Fwd"
  End_FwdClock = new util.Clock();
  thank_you_fwd = new visual.TextStim({
    win: psychoJS.window,
    name: 'thank_you_fwd',
    text: 'The study has ended.\nThanks for your participation.\n\n',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
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
var _key_resp_hello_allKeys;
var helloComponents;
function helloRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'hello' ---
    t = 0;
    helloClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('hello.started', globalClock.getTime());
    key_resp_hello.keys = undefined;
    key_resp_hello.rt = undefined;
    _key_resp_hello_allKeys = [];
    // keep track of which components have finished
    helloComponents = [];
    helloComponents.push(text_hello);
    helloComponents.push(key_resp_hello);
    
    for (const thisComponent of helloComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function helloRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'hello' ---
    // get current time
    t = helloClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_hello* updates
    if (t >= 0.0 && text_hello.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_hello.tStart = t;  // (not accounting for frame time here)
      text_hello.frameNStart = frameN;  // exact frame index
      
      text_hello.setAutoDraw(true);
    }
    
    
    // *key_resp_hello* updates
    if (t >= 0.0 && key_resp_hello.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_hello.tStart = t;  // (not accounting for frame time here)
      key_resp_hello.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_hello.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_hello.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_hello.clearEvents(); });
    }
    
    if (key_resp_hello.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_hello.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_hello_allKeys = _key_resp_hello_allKeys.concat(theseKeys);
      if (_key_resp_hello_allKeys.length > 0) {
        key_resp_hello.keys = _key_resp_hello_allKeys[_key_resp_hello_allKeys.length - 1].name;  // just the last key pressed
        key_resp_hello.rt = _key_resp_hello_allKeys[_key_resp_hello_allKeys.length - 1].rt;
        key_resp_hello.duration = _key_resp_hello_allKeys[_key_resp_hello_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
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
    for (const thisComponent of helloComponents)
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


function helloRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'hello' ---
    for (const thisComponent of helloComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('hello.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_hello.corr, level);
    }
    psychoJS.experiment.addData('key_resp_hello.keys', key_resp_hello.keys);
    if (typeof key_resp_hello.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_hello.rt', key_resp_hello.rt);
        psychoJS.experiment.addData('key_resp_hello.duration', key_resp_hello.duration);
        routineTimer.reset();
        }
    
    key_resp_hello.stop();
    // the Routine "hello" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _start_bwd_allKeys;
var InstructionsComponents;
function InstructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Instructions' ---
    t = 0;
    InstructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('Instructions.started', globalClock.getTime());
    start_bwd.keys = undefined;
    start_bwd.rt = undefined;
    _start_bwd_allKeys = [];
    // keep track of which components have finished
    InstructionsComponents = [];
    InstructionsComponents.push(instr_bwd);
    InstructionsComponents.push(start_bwd);
    
    for (const thisComponent of InstructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function InstructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Instructions' ---
    // get current time
    t = InstructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instr_bwd* updates
    if (t >= 0.0 && instr_bwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr_bwd.tStart = t;  // (not accounting for frame time here)
      instr_bwd.frameNStart = frameN;  // exact frame index
      
      instr_bwd.setAutoDraw(true);
    }
    
    
    // *start_bwd* updates
    if (t >= 0.0 && start_bwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      start_bwd.tStart = t;  // (not accounting for frame time here)
      start_bwd.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { start_bwd.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { start_bwd.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { start_bwd.clearEvents(); });
    }
    
    if (start_bwd.status === PsychoJS.Status.STARTED) {
      let theseKeys = start_bwd.getKeys({keyList: ['space'], waitRelease: false});
      _start_bwd_allKeys = _start_bwd_allKeys.concat(theseKeys);
      if (_start_bwd_allKeys.length > 0) {
        start_bwd.keys = _start_bwd_allKeys[_start_bwd_allKeys.length - 1].name;  // just the last key pressed
        start_bwd.rt = _start_bwd_allKeys[_start_bwd_allKeys.length - 1].rt;
        start_bwd.duration = _start_bwd_allKeys[_start_bwd_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
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
  return async function () {
    //--- Ending Routine 'Instructions' ---
    for (const thisComponent of InstructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Instructions.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(start_bwd.corr, level);
    }
    psychoJS.experiment.addData('start_bwd.keys', start_bwd.keys);
    if (typeof start_bwd.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('start_bwd.rt', start_bwd.rt);
        psychoJS.experiment.addData('start_bwd.duration', start_bwd.duration);
        routineTimer.reset();
        }
    
    start_bwd.stop();
    // the Routine "Instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var blocks;
function blocksLoopBegin(blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 5, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'choose_digitSpan.xlsx',
      seed: undefined, name: 'blocks'
    });
    psychoJS.experiment.addLoop(blocks); // add the loop to the experiment
    currentLoop = blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisBlock of blocks) {
      snapshot = blocks.getSnapshot();
      blocksLoopScheduler.add(importConditions(snapshot));
      const trialsLoopScheduler = new Scheduler(psychoJS);
      blocksLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
      blocksLoopScheduler.add(trialsLoopScheduler);
      blocksLoopScheduler.add(trialsLoopEnd);
      blocksLoopScheduler.add(blocksLoopEndIteration(blocksLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: condition_file,
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial of trials) {
      snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      const digitLoopLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(digitLoopLoopBegin(digitLoopLoopScheduler, snapshot));
      trialsLoopScheduler.add(digitLoopLoopScheduler);
      trialsLoopScheduler.add(digitLoopLoopEnd);
      trialsLoopScheduler.add(RecallRoutineBegin(snapshot));
      trialsLoopScheduler.add(RecallRoutineEachFrame());
      trialsLoopScheduler.add(RecallRoutineEnd(snapshot));
      trialsLoopScheduler.add(FeedbackRoutineBegin(snapshot));
      trialsLoopScheduler.add(FeedbackRoutineEachFrame());
      trialsLoopScheduler.add(FeedbackRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var digitLoop;
function digitLoopLoopBegin(digitLoopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    digitLoop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: digitSpan, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'digitLoop'
    });
    psychoJS.experiment.addLoop(digitLoop); // add the loop to the experiment
    currentLoop = digitLoop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisDigitLoop of digitLoop) {
      snapshot = digitLoop.getSnapshot();
      digitLoopLoopScheduler.add(importConditions(snapshot));
      digitLoopLoopScheduler.add(PresentationRoutineBegin(snapshot));
      digitLoopLoopScheduler.add(PresentationRoutineEachFrame());
      digitLoopLoopScheduler.add(PresentationRoutineEnd(snapshot));
      digitLoopLoopScheduler.add(digitLoopLoopEndIteration(digitLoopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function digitLoopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(digitLoop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function digitLoopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function blocksLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(blocks);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function blocksLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var blocks_fwd;
function blocks_fwdLoopBegin(blocks_fwdLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    blocks_fwd = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 5, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'choose_digitSpan_fwd.xlsx',
      seed: undefined, name: 'blocks_fwd'
    });
    psychoJS.experiment.addLoop(blocks_fwd); // add the loop to the experiment
    currentLoop = blocks_fwd;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisBlocks_fwd of blocks_fwd) {
      snapshot = blocks_fwd.getSnapshot();
      blocks_fwdLoopScheduler.add(importConditions(snapshot));
      const trials_fwdLoopScheduler = new Scheduler(psychoJS);
      blocks_fwdLoopScheduler.add(trials_fwdLoopBegin(trials_fwdLoopScheduler, snapshot));
      blocks_fwdLoopScheduler.add(trials_fwdLoopScheduler);
      blocks_fwdLoopScheduler.add(trials_fwdLoopEnd);
      blocks_fwdLoopScheduler.add(blocks_fwdLoopEndIteration(blocks_fwdLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var trials_fwd;
function trials_fwdLoopBegin(trials_fwdLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_fwd = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: condition_file_fwd,
      seed: undefined, name: 'trials_fwd'
    });
    psychoJS.experiment.addLoop(trials_fwd); // add the loop to the experiment
    currentLoop = trials_fwd;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrials_fwd of trials_fwd) {
      snapshot = trials_fwd.getSnapshot();
      trials_fwdLoopScheduler.add(importConditions(snapshot));
      const digitLoop_fwdLoopScheduler = new Scheduler(psychoJS);
      trials_fwdLoopScheduler.add(digitLoop_fwdLoopBegin(digitLoop_fwdLoopScheduler, snapshot));
      trials_fwdLoopScheduler.add(digitLoop_fwdLoopScheduler);
      trials_fwdLoopScheduler.add(digitLoop_fwdLoopEnd);
      trials_fwdLoopScheduler.add(Recall_ForwardRoutineBegin(snapshot));
      trials_fwdLoopScheduler.add(Recall_ForwardRoutineEachFrame());
      trials_fwdLoopScheduler.add(Recall_ForwardRoutineEnd(snapshot));
      trials_fwdLoopScheduler.add(Feedback_ForwardRoutineBegin(snapshot));
      trials_fwdLoopScheduler.add(Feedback_ForwardRoutineEachFrame());
      trials_fwdLoopScheduler.add(Feedback_ForwardRoutineEnd(snapshot));
      trials_fwdLoopScheduler.add(trials_fwdLoopEndIteration(trials_fwdLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var digitLoop_fwd;
function digitLoop_fwdLoopBegin(digitLoop_fwdLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    digitLoop_fwd = new TrialHandler({
      psychoJS: psychoJS,
      nReps: digitSpan_fwd, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'digitLoop_fwd'
    });
    psychoJS.experiment.addLoop(digitLoop_fwd); // add the loop to the experiment
    currentLoop = digitLoop_fwd;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisDigitLoop_fwd of digitLoop_fwd) {
      snapshot = digitLoop_fwd.getSnapshot();
      digitLoop_fwdLoopScheduler.add(importConditions(snapshot));
      digitLoop_fwdLoopScheduler.add(Presentation_ForwardRoutineBegin(snapshot));
      digitLoop_fwdLoopScheduler.add(Presentation_ForwardRoutineEachFrame());
      digitLoop_fwdLoopScheduler.add(Presentation_ForwardRoutineEnd(snapshot));
      digitLoop_fwdLoopScheduler.add(digitLoop_fwdLoopEndIteration(digitLoop_fwdLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function digitLoop_fwdLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(digitLoop_fwd);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function digitLoop_fwdLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function trials_fwdLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials_fwd);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trials_fwdLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function blocks_fwdLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(blocks_fwd);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function blocks_fwdLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var PresentationComponents;
function PresentationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Presentation' ---
    t = 0;
    PresentationClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('Presentation.started', globalClock.getTime());
    pres_text.setText(digits.toString()[digitLoop.thisN]);
    // keep track of which components have finished
    PresentationComponents = [];
    PresentationComponents.push(fixation);
    PresentationComponents.push(pres_text);
    
    for (const thisComponent of PresentationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function PresentationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Presentation' ---
    // get current time
    t = PresentationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *fixation* updates
    if (t >= 0.0 && fixation.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation.tStart = t;  // (not accounting for frame time here)
      fixation.frameNStart = frameN;  // exact frame index
      
      fixation.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (fixation.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      fixation.setAutoDraw(false);
    }
    
    // *pres_text* updates
    if (t >= 1 && pres_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pres_text.tStart = t;  // (not accounting for frame time here)
      pres_text.frameNStart = frameN;  // exact frame index
      
      pres_text.setAutoDraw(true);
    }
    
    frameRemains = 1 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pres_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pres_text.setAutoDraw(false);
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
    for (const thisComponent of PresentationComponents)
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


function PresentationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Presentation' ---
    for (const thisComponent of PresentationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Presentation.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_allKeys;
var RecallComponents;
function RecallRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Recall' ---
    t = 0;
    RecallClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('Recall.started', globalClock.getTime());
    textbox.setText('');
    textbox.refresh();
    // this is a temporary fix to allow editable textbox to be used on several trials
    textbox.refresh()
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    // keep track of which components have finished
    RecallComponents = [];
    RecallComponents.push(recall_txt);
    RecallComponents.push(textbox);
    RecallComponents.push(key_resp);
    
    for (const thisComponent of RecallComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function RecallRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Recall' ---
    // get current time
    t = RecallClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *recall_txt* updates
    if (t >= 0 && recall_txt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      recall_txt.tStart = t;  // (not accounting for frame time here)
      recall_txt.frameNStart = frameN;  // exact frame index
      
      recall_txt.setAutoDraw(true);
    }
    
    
    // *textbox* updates
    if (t >= 0.0 && textbox.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox.tStart = t;  // (not accounting for frame time here)
      textbox.frameNStart = frameN;  // exact frame index
      
      textbox.setAutoDraw(true);
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
      let theseKeys = key_resp.getKeys({keyList: ['return'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        key_resp.duration = _key_resp_allKeys[_key_resp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
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
    for (const thisComponent of RecallComponents)
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


var correct;
var fbTxt;
function RecallRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Recall' ---
    for (const thisComponent of RecallComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Recall.stopped', globalClock.getTime());
    psychoJS.experiment.addData('textbox.text',textbox.text)
    // Run 'End Routine' code from code
    if ((textbox.text === response.toString())) {
        correct = 1;
        fbTxt = "Correct!";
    } else {
        correct = 0;
        fbTxt = "Incorrect";
    }
    psychoJS.experiment.addData("correct", correct);
    allResponses.push(correct);
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp.corr, level);
    }
    psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        psychoJS.experiment.addData('key_resp.duration', key_resp.duration);
        routineTimer.reset();
        }
    
    key_resp.stop();
    // the Routine "Recall" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var FeedbackComponents;
function FeedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Feedback' ---
    t = 0;
    FeedbackClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('Feedback.started', globalClock.getTime());
    feedback_text.setText(fbTxt);
    // keep track of which components have finished
    FeedbackComponents = [];
    FeedbackComponents.push(feedback_text);
    
    for (const thisComponent of FeedbackComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function FeedbackRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Feedback' ---
    // get current time
    t = FeedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_text* updates
    if (t >= 0.0 && feedback_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_text.tStart = t;  // (not accounting for frame time here)
      feedback_text.frameNStart = frameN;  // exact frame index
      
      feedback_text.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_text.setAutoDraw(false);
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
  return async function () {
    //--- Ending Routine 'Feedback' ---
    for (const thisComponent of FeedbackComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Feedback.stopped', globalClock.getTime());
    // Run 'End Routine' code from feedback_code
    if (((allResponses.length >= 3) && (util.sum(allResponses.slice((- 3))) === 0))) {
        trials.finished = true;
        blocks.finished = true;
    } else {
        if ((util.sum(allResponses.slice((- 2))) === 2)) {
            trials.finished = true;
            allResponses = [];
        }
    }
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var EndComponents;
function EndRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'End' ---
    t = 0;
    EndClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(5.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('End.started', globalClock.getTime());
    // keep track of which components have finished
    EndComponents = [];
    EndComponents.push(thank_you);
    
    for (const thisComponent of EndComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function EndRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'End' ---
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
    
    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (thank_you.status === PsychoJS.Status.STARTED && t >= frameRemains) {
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
  return async function () {
    //--- Ending Routine 'End' ---
    for (const thisComponent of EndComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('End.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _start_fwd_allKeys;
var Instructions_ForwardComponents;
function Instructions_ForwardRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Instructions_Forward' ---
    t = 0;
    Instructions_ForwardClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('Instructions_Forward.started', globalClock.getTime());
    start_fwd.keys = undefined;
    start_fwd.rt = undefined;
    _start_fwd_allKeys = [];
    // keep track of which components have finished
    Instructions_ForwardComponents = [];
    Instructions_ForwardComponents.push(instr_fwd);
    Instructions_ForwardComponents.push(start_fwd);
    
    for (const thisComponent of Instructions_ForwardComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Instructions_ForwardRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Instructions_Forward' ---
    // get current time
    t = Instructions_ForwardClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instr_fwd* updates
    if (t >= 0.0 && instr_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr_fwd.tStart = t;  // (not accounting for frame time here)
      instr_fwd.frameNStart = frameN;  // exact frame index
      
      instr_fwd.setAutoDraw(true);
    }
    
    
    // *start_fwd* updates
    if (t >= 0.0 && start_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      start_fwd.tStart = t;  // (not accounting for frame time here)
      start_fwd.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { start_fwd.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { start_fwd.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { start_fwd.clearEvents(); });
    }
    
    if (start_fwd.status === PsychoJS.Status.STARTED) {
      let theseKeys = start_fwd.getKeys({keyList: ['space'], waitRelease: false});
      _start_fwd_allKeys = _start_fwd_allKeys.concat(theseKeys);
      if (_start_fwd_allKeys.length > 0) {
        start_fwd.keys = _start_fwd_allKeys[_start_fwd_allKeys.length - 1].name;  // just the last key pressed
        start_fwd.rt = _start_fwd_allKeys[_start_fwd_allKeys.length - 1].rt;
        start_fwd.duration = _start_fwd_allKeys[_start_fwd_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
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
    for (const thisComponent of Instructions_ForwardComponents)
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


function Instructions_ForwardRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Instructions_Forward' ---
    for (const thisComponent of Instructions_ForwardComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Instructions_Forward.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(start_fwd.corr, level);
    }
    psychoJS.experiment.addData('start_fwd.keys', start_fwd.keys);
    if (typeof start_fwd.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('start_fwd.rt', start_fwd.rt);
        psychoJS.experiment.addData('start_fwd.duration', start_fwd.duration);
        routineTimer.reset();
        }
    
    start_fwd.stop();
    // the Routine "Instructions_Forward" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Presentation_ForwardComponents;
function Presentation_ForwardRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Presentation_Forward' ---
    t = 0;
    Presentation_ForwardClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('Presentation_Forward.started', globalClock.getTime());
    pres_text_fwd.setText(digits_fwd.toString()[digitLoop_fwd.thisN]);
    // keep track of which components have finished
    Presentation_ForwardComponents = [];
    Presentation_ForwardComponents.push(fixation_fwd);
    Presentation_ForwardComponents.push(pres_text_fwd);
    
    for (const thisComponent of Presentation_ForwardComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Presentation_ForwardRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Presentation_Forward' ---
    // get current time
    t = Presentation_ForwardClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *fixation_fwd* updates
    if (t >= 0.0 && fixation_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_fwd.tStart = t;  // (not accounting for frame time here)
      fixation_fwd.frameNStart = frameN;  // exact frame index
      
      fixation_fwd.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (fixation_fwd.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      fixation_fwd.setAutoDraw(false);
    }
    
    // *pres_text_fwd* updates
    if (t >= 1 && pres_text_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pres_text_fwd.tStart = t;  // (not accounting for frame time here)
      pres_text_fwd.frameNStart = frameN;  // exact frame index
      
      pres_text_fwd.setAutoDraw(true);
    }
    
    frameRemains = 1 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pres_text_fwd.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pres_text_fwd.setAutoDraw(false);
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
    for (const thisComponent of Presentation_ForwardComponents)
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


function Presentation_ForwardRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Presentation_Forward' ---
    for (const thisComponent of Presentation_ForwardComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Presentation_Forward.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_resp_fwd_allKeys;
var Recall_ForwardComponents;
function Recall_ForwardRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Recall_Forward' ---
    t = 0;
    Recall_ForwardClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('Recall_Forward.started', globalClock.getTime());
    textbox_fwd.setText('');
    textbox_fwd.refresh();
    // this is a temporary fix to allow editable textbox to be used on several trials
    textbox.refresh()
    key_resp_fwd.keys = undefined;
    key_resp_fwd.rt = undefined;
    _key_resp_fwd_allKeys = [];
    // keep track of which components have finished
    Recall_ForwardComponents = [];
    Recall_ForwardComponents.push(recall_txt_fwd);
    Recall_ForwardComponents.push(textbox_fwd);
    Recall_ForwardComponents.push(key_resp_fwd);
    
    for (const thisComponent of Recall_ForwardComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Recall_ForwardRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Recall_Forward' ---
    // get current time
    t = Recall_ForwardClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *recall_txt_fwd* updates
    if (t >= 0 && recall_txt_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      recall_txt_fwd.tStart = t;  // (not accounting for frame time here)
      recall_txt_fwd.frameNStart = frameN;  // exact frame index
      
      recall_txt_fwd.setAutoDraw(true);
    }
    
    
    // *textbox_fwd* updates
    if (t >= 0.0 && textbox_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox_fwd.tStart = t;  // (not accounting for frame time here)
      textbox_fwd.frameNStart = frameN;  // exact frame index
      
      textbox_fwd.setAutoDraw(true);
    }
    
    
    // *key_resp_fwd* updates
    if (t >= 0.0 && key_resp_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_fwd.tStart = t;  // (not accounting for frame time here)
      key_resp_fwd.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_fwd.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_fwd.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_fwd.clearEvents(); });
    }
    
    if (key_resp_fwd.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_fwd.getKeys({keyList: ['return'], waitRelease: false});
      _key_resp_fwd_allKeys = _key_resp_fwd_allKeys.concat(theseKeys);
      if (_key_resp_fwd_allKeys.length > 0) {
        key_resp_fwd.keys = _key_resp_fwd_allKeys[_key_resp_fwd_allKeys.length - 1].name;  // just the last key pressed
        key_resp_fwd.rt = _key_resp_fwd_allKeys[_key_resp_fwd_allKeys.length - 1].rt;
        key_resp_fwd.duration = _key_resp_fwd_allKeys[_key_resp_fwd_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
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
    for (const thisComponent of Recall_ForwardComponents)
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


var fbTxtFwd;
function Recall_ForwardRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Recall_Forward' ---
    for (const thisComponent of Recall_ForwardComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Recall_Forward.stopped', globalClock.getTime());
    psychoJS.experiment.addData('textbox_fwd.text',textbox_fwd.text)
    // Run 'End Routine' code from code_fwd
    if ((textbox_fwd.text === digits_fwd.toString())) {
        correct = 1;
        fbTxtFwd = "Correct!";
    } else {
        correct = 0;
        fbTxtFwd = "Incorrect";
    }
    psychoJS.experiment.addData("correct", correct);
    allResponsesfwd.push(correct);
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_resp_fwd.corr, level);
    }
    psychoJS.experiment.addData('key_resp_fwd.keys', key_resp_fwd.keys);
    if (typeof key_resp_fwd.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_fwd.rt', key_resp_fwd.rt);
        psychoJS.experiment.addData('key_resp_fwd.duration', key_resp_fwd.duration);
        routineTimer.reset();
        }
    
    key_resp_fwd.stop();
    // the Routine "Recall_Forward" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Feedback_ForwardComponents;
function Feedback_ForwardRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Feedback_Forward' ---
    t = 0;
    Feedback_ForwardClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('Feedback_Forward.started', globalClock.getTime());
    feedback_text_fwd.setText(fbTxtFwd);
    // keep track of which components have finished
    Feedback_ForwardComponents = [];
    Feedback_ForwardComponents.push(feedback_text_fwd);
    
    for (const thisComponent of Feedback_ForwardComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Feedback_ForwardRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Feedback_Forward' ---
    // get current time
    t = Feedback_ForwardClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_text_fwd* updates
    if (t >= 0.0 && feedback_text_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_text_fwd.tStart = t;  // (not accounting for frame time here)
      feedback_text_fwd.frameNStart = frameN;  // exact frame index
      
      feedback_text_fwd.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_text_fwd.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_text_fwd.setAutoDraw(false);
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
    for (const thisComponent of Feedback_ForwardComponents)
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


function Feedback_ForwardRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Feedback_Forward' ---
    for (const thisComponent of Feedback_ForwardComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Feedback_Forward.stopped', globalClock.getTime());
    // Run 'End Routine' code from feedback_code_fwd
    if (((allResponsesfwd.length >= 3) && (util.sum(allResponsesfwd.slice((- 3))) === 0))) {
        trials_fwd.finished = true;
        blocks_fwd.finished = true;
    } else {
        if ((util.sum(allResponsesfwd.slice((- 2))) === 2)) {
            trials_fwd.finished = true;
            allResponsesfwd = [];
        }
    }
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var End_FwdComponents;
function End_FwdRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'End_Fwd' ---
    t = 0;
    End_FwdClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(3.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('End_Fwd.started', globalClock.getTime());
    // keep track of which components have finished
    End_FwdComponents = [];
    End_FwdComponents.push(thank_you_fwd);
    
    for (const thisComponent of End_FwdComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function End_FwdRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'End_Fwd' ---
    // get current time
    t = End_FwdClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *thank_you_fwd* updates
    if (t >= 0.0 && thank_you_fwd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      thank_you_fwd.tStart = t;  // (not accounting for frame time here)
      thank_you_fwd.frameNStart = frameN;  // exact frame index
      
      thank_you_fwd.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (thank_you_fwd.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      thank_you_fwd.setAutoDraw(false);
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
    for (const thisComponent of End_FwdComponents)
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


function End_FwdRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'End_Fwd' ---
    for (const thisComponent of End_FwdComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('End_Fwd.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
