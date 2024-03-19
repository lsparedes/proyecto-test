/******************** 
 * Ds_Adapt_Fb Test *
 ********************/

import { PsychoJS } from 'https://pavlovia.org/lib/core.js';
import * as core from 'https://pavlovia.org/lib/core.js';
import { TrialHandler } from 'https://pavlovia.org/lib/data.js';
import { Scheduler } from 'https://pavlovia.org/lib/util.js';
import * as util from 'https://pavlovia.org/lib/util.js';
import * as visual from 'https://pavlovia.org/lib/visual.js';
import { Sound } from 'https://pavlovia.org/lib/sound.js';

// init psychoJS:
var psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0, 0, 0]),
  units: 'height'
});

// store info about the experiment session:
let expName = 'DS_Adapt_FB';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

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
flowScheduler.add(InstrRoutineBegin);
flowScheduler.add(InstrRoutineEachFrame);
flowScheduler.add(InstrRoutineEnd);
flowScheduler.add(InstrForwardRoutineBegin);
flowScheduler.add(InstrForwardRoutineEachFrame);
flowScheduler.add(InstrForwardRoutineEnd);
const trials_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_2LoopBegin, trials_2LoopScheduler);
flowScheduler.add(trials_2LoopScheduler);
flowScheduler.add(trials_2LoopEnd);
flowScheduler.add(routine_goRoutineBegin);
flowScheduler.add(routine_goRoutineEachFrame);
flowScheduler.add(routine_goRoutineEnd);
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin, trialsLoopScheduler);
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);
flowScheduler.add(InstrBackRoutineBegin);
flowScheduler.add(InstrBackRoutineEachFrame);
flowScheduler.add(InstrBackRoutineEnd);
const trials_3LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_3LoopBegin, trials_3LoopScheduler);
flowScheduler.add(trials_3LoopScheduler);
flowScheduler.add(trials_3LoopEnd);
flowScheduler.add(GoodbyeRoutineBegin);
flowScheduler.add(GoodbyeRoutineEachFrame);
flowScheduler.add(GoodbyeRoutineEnd);
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({expName, expInfo});

var frameDur;
function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '3.1.2';

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0/Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0/60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}

var InstrClock;
var InstrText;
var InstrForwardClock;
var text_2;
var routine_roundTrialClock;
var text_6;
var text_7;
var text_8;
var routine_presTrialClock;
var seq1_tr;
var Seq2_tr;
var Seq3_tr;
var Seq4_tr;
var routine_RespTrialClock;
var textType;
var textFeedback;
var routine_goClock;
var text_go;
var routine_roundClock;
var text_3;
var text_4;
var text_5;
var routine_DpresClock;
var Seq1;
var Seq2;
var Seq3;
var Seq4;
var Seq5;
var Seq6;
var Seq7;
var Seq8;
var Seq9;
var Seq10;
var Seq11;
var Seq12;
var Seq13;
var Seq14;
var Seq15;
var Seq16;
var routine_DrespClock;
var textType_2;
var textFeedback_2;
var InstrBackClock;
var text;
var routine_round_2Clock;
var text_9;
var text_10;
var text_11;
var routine_BackPresClock;
var Seq1_b;
var Seq2_b;
var Seq3_b;
var Seq4_b;
var Seq5_b;
var Seq6_b;
var Seq7_b;
var Seq8_b;
var Seq9_b;
var Seq10_b;
var Seq11_b;
var Seq12_b;
var Seq13_b;
var Seq14_b;
var Seq15_b;
var Seq16_b;
var routine_BackRespClock;
var textType_2B;
var textFeedback_2B;
var GoodbyeClock;
var GB;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "Instr"
  InstrClock = new util.Clock();
  InstrText = new visual.TextStim({
    win: psychoJS.window,
    name: 'InstrText',
    text: "Thank you for Participating!\n\nIn this experiment, you will be shown a series of numbers one after the other.\nPlease try to remember the numbers so that afterwards, you can type them into the computer\n\nThere are two short tasks - in the forward task you will type the numbers in the same order you saw them\nIn the backward task, you will type in the numbers backwards\n\nLet's get started!\nPress any key to continue",
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "InstrForward"
  InstrForwardClock = new util.Clock();
  text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_2',
    text: 'We will start with the FORWARD task\n\nA series of numbers will be shown on the screen, please try to remember them.\nYou will then type them into the computer in the same order as they appeared.\n\nIf you get it CORRECT, the following round will be one digit LONGER.\nIf you get it INCORRECT, the following round will be the same length.\nAfter 2 incorrect responses, the following round will be one digit SHORTER.\n\nYou will do this for a total of 14 rounds\n\nIf you are ready, press any key to do one trial round\n\nGood luck!\n',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "routine_roundTrial"
  routine_roundTrialClock = new util.Clock();
  text_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_6',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.3,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  text_7 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_7',
    text: 'TRIAL ROUND',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0.25], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  text_8 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_8',
    text: 'press "Space"  to continue',
    font: 'Arial',
    units : undefined, 
    pos: [0, (- 0.25)], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  // Initialize components for Routine "routine_presTrial"
  routine_presTrialClock = new util.Clock();
  seq1_tr = new visual.TextStim({
    win: psychoJS.window,
    name: 'seq1_tr',
    text: '1',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  Seq2_tr = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq2_tr',
    text: '2',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  Seq3_tr = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq3_tr',
    text: '3',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -3.0 
  });
  
  Seq4_tr = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq4_tr',
    text: '4',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -4.0 
  });
  
  // Initialize components for Routine "routine_RespTrial"
  routine_RespTrialClock = new util.Clock();
  textType = new visual.TextStim({
    win: psychoJS.window,
    name: 'textType',
    text: 'Please type in the numbers as you saw them, followed by the ENTER button:',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0.25], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  textFeedback = new visual.TextStim({
    win: psychoJS.window,
    name: 'textFeedback',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "routine_go"
  routine_goClock = new util.Clock();
  text_go = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_go',
    text: 'That\'s it!\n\nLet\'s start doing the actual task.\n\nPress "space" to start',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "routine_round"
  routine_roundClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.3,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  text_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_4',
    text: 'ROUND',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0.25], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  text_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_5',
    text: 'Press "SPACE" to continue',
    font: 'Arial',
    units : undefined, 
    pos: [0, (- 0.25)], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  // Initialize components for Routine "routine_Dpres"
  routine_DpresClock = new util.Clock();
  Seq1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq1',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  Seq2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq2',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  Seq3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq3',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -3.0 
  });
  
  Seq4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq4',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -4.0 
  });
  
  Seq5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq5',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -5.0 
  });
  
  Seq6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq6',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -6.0 
  });
  
  Seq7 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq7',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -7.0 
  });
  
  Seq8 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq8',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -8.0 
  });
  
  Seq9 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq9',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -9.0 
  });
  
  Seq10 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq10',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -10.0 
  });
  
  Seq11 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq11',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -11.0 
  });
  
  Seq12 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq12',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -12.0 
  });
  
  Seq13 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq13',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -13.0 
  });
  
  Seq14 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq14',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -14.0 
  });
  
  Seq15 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq15',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -15.0 
  });
  
  Seq16 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq16',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -16.0 
  });
  
  // Initialize components for Routine "routine_Dresp"
  routine_DrespClock = new util.Clock();
  textType_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'textType_2',
    text: 'Please type in the numbers as you saw them, followed by the ENTER button:',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0.25], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  textFeedback_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'textFeedback_2',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "InstrBack"
  InstrBackClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'Now, you will do the same thing, but type in the number in the REVERSE order.\n\nFor example, if you are presented with \n[1, 2, 3] \nyou would type in \n[3, 2, 1]\n\nPress any key to start the next round',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "routine_round_2"
  routine_round_2Clock = new util.Clock();
  text_9 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_9',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.3,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  text_10 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_10',
    text: 'ROUND',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0.25], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  text_11 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_11',
    text: 'Press "SPACE" to continue',
    font: 'Arial',
    units : undefined, 
    pos: [0, (- 0.25)], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  // Initialize components for Routine "routine_BackPres"
  routine_BackPresClock = new util.Clock();
  Seq1_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq1_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  Seq2_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq2_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  Seq3_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq3_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -3.0 
  });
  
  Seq4_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq4_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -4.0 
  });
  
  Seq5_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq5_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -5.0 
  });
  
  Seq6_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq6_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -6.0 
  });
  
  Seq7_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq7_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -7.0 
  });
  
  Seq8_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq8_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -8.0 
  });
  
  Seq9_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq9_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -9.0 
  });
  
  Seq10_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq10_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -10.0 
  });
  
  Seq11_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq11_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -11.0 
  });
  
  Seq12_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq12_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -12.0 
  });
  
  Seq13_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq13_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -13.0 
  });
  
  Seq14_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq14_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -14.0 
  });
  
  Seq15_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq15_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -15.0 
  });
  
  Seq16_b = new visual.TextStim({
    win: psychoJS.window,
    name: 'Seq16_b',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.5,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -16.0 
  });
  
  // Initialize components for Routine "routine_BackResp"
  routine_BackRespClock = new util.Clock();
  textType_2B = new visual.TextStim({
    win: psychoJS.window,
    name: 'textType_2B',
    text: 'Please type in the numbers in the reverse order that you saw them, followed by the ENTER button:',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0.25], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  textFeedback_2B = new visual.TextStim({
    win: psychoJS.window,
    name: 'textFeedback_2B',
    text: 'default text',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  // Initialize components for Routine "Goodbye"
  GoodbyeClock = new util.Clock();
  GB = new visual.TextStim({
    win: psychoJS.window,
    name: 'GB',
    text: 'Thats it!\n\nThanks again for participating! \n\nPlease press escape to leave the experiment',
    font: 'Arial',
    units : undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
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
var Welcome_resp;
var InstrComponents;
function InstrRoutineBegin() {
  //------Prepare to start Routine 'Instr'-------
  t = 0;
  InstrClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  Welcome_resp = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  InstrComponents = [];
  InstrComponents.push(InstrText);
  InstrComponents.push(Welcome_resp);
  
  for (const thisComponent of InstrComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}

var continueRoutine;
function InstrRoutineEachFrame() {
  //------Loop for each frame of Routine 'Instr'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = InstrClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *InstrText* updates
  if (t >= 0.0 && InstrText.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    InstrText.tStart = t;  // (not accounting for frame time here)
    InstrText.frameNStart = frameN;  // exact frame index
    InstrText.setAutoDraw(true);
  }

  
  // *Welcome_resp* updates
  if (t >= 0.0 && Welcome_resp.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Welcome_resp.tStart = t;  // (not accounting for frame time here)
    Welcome_resp.frameNStart = frameN;  // exact frame index
    Welcome_resp.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (Welcome_resp.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys();
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of InstrComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function InstrRoutineEnd() {
  //------Ending Routine 'Instr'-------
  for (const thisComponent of InstrComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // the Routine "Instr" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var key_resp_2;
var InstrForwardComponents;
function InstrForwardRoutineBegin() {
  //------Prepare to start Routine 'InstrForward'-------
  t = 0;
  InstrForwardClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  key_resp_2 = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  InstrForwardComponents = [];
  InstrForwardComponents.push(text_2);
  InstrForwardComponents.push(key_resp_2);
  
  for (const thisComponent of InstrForwardComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function InstrForwardRoutineEachFrame() {
  //------Loop for each frame of Routine 'InstrForward'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = InstrForwardClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *text_2* updates
  if (t >= 0.0 && text_2.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_2.tStart = t;  // (not accounting for frame time here)
    text_2.frameNStart = frameN;  // exact frame index
    text_2.setAutoDraw(true);
  }

  
  // *key_resp_2* updates
  if (t >= 0.0 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp_2.tStart = t;  // (not accounting for frame time here)
    key_resp_2.frameNStart = frameN;  // exact frame index
    key_resp_2.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp_2.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys();
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of InstrForwardComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function InstrForwardRoutineEnd() {
  //------Ending Routine 'InstrForward'-------
  for (const thisComponent of InstrForwardComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // the Routine "InstrForward" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var trials_2;
var currentLoop;
function trials_2LoopBegin(thisScheduler) {
  // set up handler to look after randomisation of conditions etc
  trials_2 = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 2, method: TrialHandler.Method.RANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: undefined,
    seed: undefined, name: 'trials_2'});
  psychoJS.experiment.addLoop(trials_2); // add the loop to the experiment
  currentLoop = trials_2;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisTrial_2 of trials_2) {
    thisScheduler.add(importConditions(trials_2));
    thisScheduler.add(routine_roundTrialRoutineBegin);
    thisScheduler.add(routine_roundTrialRoutineEachFrame);
    thisScheduler.add(routine_roundTrialRoutineEnd);
    thisScheduler.add(routine_presTrialRoutineBegin);
    thisScheduler.add(routine_presTrialRoutineEachFrame);
    thisScheduler.add(routine_presTrialRoutineEnd);
    thisScheduler.add(routine_RespTrialRoutineBegin);
    thisScheduler.add(routine_RespTrialRoutineEachFrame);
    thisScheduler.add(routine_RespTrialRoutineEnd);
  }

  return Scheduler.Event.NEXT;
}


function trials_2LoopEnd() {
  psychoJS.experiment.removeLoop(trials_2);

  return Scheduler.Event.NEXT;
}

var trials;
function trialsLoopBegin(thisScheduler) {
  // set up handler to look after randomisation of conditions etc
  trials = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'Digit_span.xlsx',
    seed: undefined, name: 'trials'});
  psychoJS.experiment.addLoop(trials); // add the loop to the experiment
  currentLoop = trials;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisTrial of trials) {
    thisScheduler.add(importConditions(trials));
    thisScheduler.add(routine_roundRoutineBegin);
    thisScheduler.add(routine_roundRoutineEachFrame);
    thisScheduler.add(routine_roundRoutineEnd);
    thisScheduler.add(routine_DpresRoutineBegin);
    thisScheduler.add(routine_DpresRoutineEachFrame);
    thisScheduler.add(routine_DpresRoutineEnd);
    thisScheduler.add(routine_DrespRoutineBegin);
    thisScheduler.add(routine_DrespRoutineEachFrame);
    thisScheduler.add(routine_DrespRoutineEnd);
    thisScheduler.add(endLoopIteration(thisScheduler, thisTrial));
  }

  return Scheduler.Event.NEXT;
}


function trialsLoopEnd() {
  psychoJS.experiment.removeLoop(trials);

  return Scheduler.Event.NEXT;
}

var trials_3;
function trials_3LoopBegin(thisScheduler) {
  // set up handler to look after randomisation of conditions etc
  trials_3 = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
    extraInfo: expInfo, originPath: undefined,
    trialList: 'back_digit_span.xlsx',
    seed: undefined, name: 'trials_3'});
  psychoJS.experiment.addLoop(trials_3); // add the loop to the experiment
  currentLoop = trials_3;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisTrial_3 of trials_3) {
    thisScheduler.add(importConditions(trials_3));
    thisScheduler.add(routine_round_2RoutineBegin);
    thisScheduler.add(routine_round_2RoutineEachFrame);
    thisScheduler.add(routine_round_2RoutineEnd);
    thisScheduler.add(routine_BackPresRoutineBegin);
    thisScheduler.add(routine_BackPresRoutineEachFrame);
    thisScheduler.add(routine_BackPresRoutineEnd);
    thisScheduler.add(routine_BackRespRoutineBegin);
    thisScheduler.add(routine_BackRespRoutineEachFrame);
    thisScheduler.add(routine_BackRespRoutineEnd);
    thisScheduler.add(endLoopIteration(thisScheduler, thisTrial_3));
  }

  return Scheduler.Event.NEXT;
}


function trials_3LoopEnd() {
  psychoJS.experiment.removeLoop(trials_3);

  return Scheduler.Event.NEXT;
}

var key_resp_6;
var routine_roundTrialComponents;
function routine_roundTrialRoutineBegin() {
  //------Prepare to start Routine 'routine_roundTrial'-------
  t = 0;
  routine_roundTrialClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  text_6.setText((trials_2.thisRepN + 1));
  key_resp_6 = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  routine_roundTrialComponents = [];
  routine_roundTrialComponents.push(text_6);
  routine_roundTrialComponents.push(text_7);
  routine_roundTrialComponents.push(text_8);
  routine_roundTrialComponents.push(key_resp_6);
  
  for (const thisComponent of routine_roundTrialComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_roundTrialRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_roundTrial'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_roundTrialClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *text_6* updates
  if (t >= 0.0 && text_6.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_6.tStart = t;  // (not accounting for frame time here)
    text_6.frameNStart = frameN;  // exact frame index
    text_6.setAutoDraw(true);
  }

  
  // *text_7* updates
  if (t >= 0.0 && text_7.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_7.tStart = t;  // (not accounting for frame time here)
    text_7.frameNStart = frameN;  // exact frame index
    text_7.setAutoDraw(true);
  }

  
  // *text_8* updates
  if (t >= 0.0 && text_8.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_8.tStart = t;  // (not accounting for frame time here)
    text_8.frameNStart = frameN;  // exact frame index
    text_8.setAutoDraw(true);
  }

  
  // *key_resp_6* updates
  if (t >= 0.0 && key_resp_6.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp_6.tStart = t;  // (not accounting for frame time here)
    key_resp_6.frameNStart = frameN;  // exact frame index
    key_resp_6.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp_6.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys({keyList:['y', 'n', 'left', 'right', 'space']});
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_roundTrialComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_roundTrialRoutineEnd() {
  //------Ending Routine 'routine_roundTrial'-------
  for (const thisComponent of routine_roundTrialComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // the Routine "routine_roundTrial" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var routine_presTrialComponents;
function routine_presTrialRoutineBegin() {
  //------Prepare to start Routine 'routine_presTrial'-------
  t = 0;
  routine_presTrialClock.reset(); // clock
  frameN = -1;
  routineTimer.add(4.500000);
  // update component parameters for each repeat
  // keep track of which components have finished
  routine_presTrialComponents = [];
  routine_presTrialComponents.push(seq1_tr);
  routine_presTrialComponents.push(Seq2_tr);
  routine_presTrialComponents.push(Seq3_tr);
  routine_presTrialComponents.push(Seq4_tr);
  
  for (const thisComponent of routine_presTrialComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}

var frameRemains;
function routine_presTrialRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_presTrial'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_presTrialClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *seq1_tr* updates
  if (t >= 0.5 && seq1_tr.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    seq1_tr.tStart = t;  // (not accounting for frame time here)
    seq1_tr.frameNStart = frameN;  // exact frame index
    seq1_tr.setAutoDraw(true);
  }

  frameRemains = 0.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (seq1_tr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    seq1_tr.setAutoDraw(false);
  }
  
  // *Seq2_tr* updates
  if (t >= 1.5 && Seq2_tr.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq2_tr.tStart = t;  // (not accounting for frame time here)
    Seq2_tr.frameNStart = frameN;  // exact frame index
    Seq2_tr.setAutoDraw(true);
  }

  frameRemains = 1.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq2_tr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq2_tr.setAutoDraw(false);
  }
  
  // *Seq3_tr* updates
  if (t >= 2.5 && Seq3_tr.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq3_tr.tStart = t;  // (not accounting for frame time here)
    Seq3_tr.frameNStart = frameN;  // exact frame index
    Seq3_tr.setAutoDraw(true);
  }

  frameRemains = 2.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq3_tr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq3_tr.setAutoDraw(false);
  }
  
  // *Seq4_tr* updates
  if (t >= 3.5 && Seq4_tr.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq4_tr.tStart = t;  // (not accounting for frame time here)
    Seq4_tr.frameNStart = frameN;  // exact frame index
    Seq4_tr.setAutoDraw(true);
  }

  frameRemains = 3.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq4_tr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq4_tr.setAutoDraw(false);
  }
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_presTrialComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine && routineTimer.getTime() > 0) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_presTrialRoutineEnd() {
  //------Ending Routine 'routine_presTrial'-------
  for (const thisComponent of routine_presTrialComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  return Scheduler.Event.NEXT;
}

var key_resp_4;
var routine_RespTrialComponents;
function routine_RespTrialRoutineBegin() {
  //------Prepare to start Routine 'routine_RespTrial'-------
  t = 0;
  routine_RespTrialClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  key_resp_4 = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  routine_RespTrialComponents = [];
  routine_RespTrialComponents.push(textType);
  routine_RespTrialComponents.push(textFeedback);
  routine_RespTrialComponents.push(key_resp_4);
  
  for (const thisComponent of routine_RespTrialComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_RespTrialRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_RespTrial'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_RespTrialClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *textType* updates
  if (t >= 0 && textType.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    textType.tStart = t;  // (not accounting for frame time here)
    textType.frameNStart = frameN;  // exact frame index
    textType.setAutoDraw(true);
  }

  
  // *textFeedback* updates
  if (t >= 0 && textFeedback.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    textFeedback.tStart = t;  // (not accounting for frame time here)
    textFeedback.frameNStart = frameN;  // exact frame index
    textFeedback.setAutoDraw(true);
  }

  
  if (textFeedback.status === PsychoJS.Status.STARTED){ // only update if being drawn
    textFeedback.setText(screen_text);
  }
  
  // *key_resp_4* updates
  if (t >= 0.0 && key_resp_4.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp_4.tStart = t;  // (not accounting for frame time here)
    key_resp_4.frameNStart = frameN;  // exact frame index
    key_resp_4.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.window.callOnFlip(function() { key_resp_4.clock.reset(); }); // t = 0 on screen flip
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp_4.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys({keyList:['1', '2', '3', '4', '5', '6', '7', '8', '9', 'backspace', 'return']});
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      key_resp_4.keys = key_resp_4.keys.concat(theseKeys);  // storing all keys
      key_resp_4.rt = key_resp_4.rt.concat(key_resp_4.clock.getTime());
      // was this 'correct'?
      if (key_resp_4.keys == '') {
          key_resp_4.corr = 1;
      } else {
          key_resp_4.corr = 0;
      }
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_RespTrialComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_RespTrialRoutineEnd() {
  //------Ending Routine 'routine_RespTrial'-------
  for (const thisComponent of routine_RespTrialComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  
  // check responses
  if (key_resp_4.keys === undefined || key_resp_4.keys.length === 0) {    // No response was made
      key_resp_4.keys = undefined;
  }
  
  // was no response the correct answer?!
  if (key_resp_4.keys === undefined) {
    if (['None','none',undefined].includes('')) {
       key_resp_4.corr = 1  // correct non-response
    } else {
       key_resp_4.corr = 0  // failed to respond (incorrectly)
    }
  }
  // store data for thisExp (ExperimentHandler)
  psychoJS.experiment.addData('key_resp_4.keys', key_resp_4.keys);
  psychoJS.experiment.addData('key_resp_4.corr', key_resp_4.corr);
  if (typeof key_resp_4.keys !== 'undefined') {  // we had a response
      psychoJS.experiment.addData('key_resp_4.rt', key_resp_4.rt);
      }
  
  // the Routine "routine_RespTrial" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var key_resp_5;
var routine_goComponents;
function routine_goRoutineBegin() {
  //------Prepare to start Routine 'routine_go'-------
  t = 0;
  routine_goClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  key_resp_5 = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  routine_goComponents = [];
  routine_goComponents.push(text_go);
  routine_goComponents.push(key_resp_5);
  
  for (const thisComponent of routine_goComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_goRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_go'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_goClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *text_go* updates
  if (t >= 0.5 && text_go.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_go.tStart = t;  // (not accounting for frame time here)
    text_go.frameNStart = frameN;  // exact frame index
    text_go.setAutoDraw(true);
  }

  
  // *key_resp_5* updates
  if (t >= 0.5 && key_resp_5.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp_5.tStart = t;  // (not accounting for frame time here)
    key_resp_5.frameNStart = frameN;  // exact frame index
    key_resp_5.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp_5.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys({keyList:['space']});
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_goComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_goRoutineEnd() {
  //------Ending Routine 'routine_go'-------
  for (const thisComponent of routine_goComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // the Routine "routine_go" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var key_resp_3;
var routine_roundComponents;
function routine_roundRoutineBegin() {
  //------Prepare to start Routine 'routine_round'-------
  t = 0;
  routine_roundClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  text_3.setText((trials.thisTrialN + 1));
  key_resp_3 = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  routine_roundComponents = [];
  routine_roundComponents.push(text_3);
  routine_roundComponents.push(text_4);
  routine_roundComponents.push(text_5);
  routine_roundComponents.push(key_resp_3);
  
  for (const thisComponent of routine_roundComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_roundRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_round'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_roundClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *text_3* updates
  if (t >= 0.5 && text_3.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_3.tStart = t;  // (not accounting for frame time here)
    text_3.frameNStart = frameN;  // exact frame index
    text_3.setAutoDraw(true);
  }

  
  // *text_4* updates
  if (t >= 0.5 && text_4.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_4.tStart = t;  // (not accounting for frame time here)
    text_4.frameNStart = frameN;  // exact frame index
    text_4.setAutoDraw(true);
  }

  
  // *text_5* updates
  if (t >= 0.5 && text_5.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_5.tStart = t;  // (not accounting for frame time here)
    text_5.frameNStart = frameN;  // exact frame index
    text_5.setAutoDraw(true);
  }

  
  // *key_resp_3* updates
  if (t >= 0.5 && key_resp_3.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp_3.tStart = t;  // (not accounting for frame time here)
    key_resp_3.frameNStart = frameN;  // exact frame index
    key_resp_3.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp_3.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys({keyList:['space']});
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_roundComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_roundRoutineEnd() {
  //------Ending Routine 'routine_round'-------
  for (const thisComponent of routine_roundComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // the Routine "routine_round" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var routine_DpresComponents;
function routine_DpresRoutineBegin() {
  //------Prepare to start Routine 'routine_Dpres'-------
  t = 0;
  routine_DpresClock.reset(); // clock
  frameN = -1;
  routineTimer.add(16.500000);
  // update component parameters for each repeat
  Seq1.setText(S1);
  Seq2.setText(S2);
  Seq3.setText(S3);
  Seq4.setText(S4);
  Seq5.setText(S5);
  Seq6.setText(S6);
  Seq7.setText(S7);
  Seq8.setText(S8);
  Seq9.setText(S9);
  Seq10.setText(S10);
  Seq11.setText(S11);
  Seq12.setText(S12);
  Seq13.setText(S13);
  Seq14.setText(S14);
  Seq15.setText(S15);
  Seq16.setText(S16);
  // keep track of which components have finished
  routine_DpresComponents = [];
  routine_DpresComponents.push(Seq1);
  routine_DpresComponents.push(Seq2);
  routine_DpresComponents.push(Seq3);
  routine_DpresComponents.push(Seq4);
  routine_DpresComponents.push(Seq5);
  routine_DpresComponents.push(Seq6);
  routine_DpresComponents.push(Seq7);
  routine_DpresComponents.push(Seq8);
  routine_DpresComponents.push(Seq9);
  routine_DpresComponents.push(Seq10);
  routine_DpresComponents.push(Seq11);
  routine_DpresComponents.push(Seq12);
  routine_DpresComponents.push(Seq13);
  routine_DpresComponents.push(Seq14);
  routine_DpresComponents.push(Seq15);
  routine_DpresComponents.push(Seq16);
  
  for (const thisComponent of routine_DpresComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_DpresRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_Dpres'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_DpresClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *Seq1* updates
  if (t >= 0.5 && Seq1.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq1.tStart = t;  // (not accounting for frame time here)
    Seq1.frameNStart = frameN;  // exact frame index
    Seq1.setAutoDraw(true);
  }

  frameRemains = 0.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq1.setAutoDraw(false);
  }
  
  // *Seq2* updates
  if (t >= 1.5 && Seq2.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq2.tStart = t;  // (not accounting for frame time here)
    Seq2.frameNStart = frameN;  // exact frame index
    Seq2.setAutoDraw(true);
  }

  frameRemains = 1.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq2.setAutoDraw(false);
  }
  
  // *Seq3* updates
  if (t >= 2.5 && Seq3.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq3.tStart = t;  // (not accounting for frame time here)
    Seq3.frameNStart = frameN;  // exact frame index
    Seq3.setAutoDraw(true);
  }

  frameRemains = 2.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq3.setAutoDraw(false);
  }
  
  // *Seq4* updates
  if (t >= 3.5 && Seq4.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq4.tStart = t;  // (not accounting for frame time here)
    Seq4.frameNStart = frameN;  // exact frame index
    Seq4.setAutoDraw(true);
  }

  frameRemains = 3.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq4.setAutoDraw(false);
  }
  
  // *Seq5* updates
  if (t >= 4.5 && Seq5.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq5.tStart = t;  // (not accounting for frame time here)
    Seq5.frameNStart = frameN;  // exact frame index
    Seq5.setAutoDraw(true);
  }

  frameRemains = 4.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq5.setAutoDraw(false);
  }
  
  // *Seq6* updates
  if (t >= 5.5 && Seq6.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq6.tStart = t;  // (not accounting for frame time here)
    Seq6.frameNStart = frameN;  // exact frame index
    Seq6.setAutoDraw(true);
  }

  frameRemains = 5.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq6.setAutoDraw(false);
  }
  
  // *Seq7* updates
  if (t >= 6.5 && Seq7.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq7.tStart = t;  // (not accounting for frame time here)
    Seq7.frameNStart = frameN;  // exact frame index
    Seq7.setAutoDraw(true);
  }

  frameRemains = 6.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq7.setAutoDraw(false);
  }
  
  // *Seq8* updates
  if (t >= 7.5 && Seq8.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq8.tStart = t;  // (not accounting for frame time here)
    Seq8.frameNStart = frameN;  // exact frame index
    Seq8.setAutoDraw(true);
  }

  frameRemains = 7.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq8.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq8.setAutoDraw(false);
  }
  
  // *Seq9* updates
  if (t >= 8.5 && Seq9.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq9.tStart = t;  // (not accounting for frame time here)
    Seq9.frameNStart = frameN;  // exact frame index
    Seq9.setAutoDraw(true);
  }

  frameRemains = 8.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq9.setAutoDraw(false);
  }
  
  // *Seq10* updates
  if (t >= 9.5 && Seq10.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq10.tStart = t;  // (not accounting for frame time here)
    Seq10.frameNStart = frameN;  // exact frame index
    Seq10.setAutoDraw(true);
  }

  frameRemains = 9.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq10.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq10.setAutoDraw(false);
  }
  
  // *Seq11* updates
  if (t >= 10.5 && Seq11.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq11.tStart = t;  // (not accounting for frame time here)
    Seq11.frameNStart = frameN;  // exact frame index
    Seq11.setAutoDraw(true);
  }

  frameRemains = 10.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq11.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq11.setAutoDraw(false);
  }
  
  // *Seq12* updates
  if (t >= 11.5 && Seq12.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq12.tStart = t;  // (not accounting for frame time here)
    Seq12.frameNStart = frameN;  // exact frame index
    Seq12.setAutoDraw(true);
  }

  frameRemains = 11.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq12.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq12.setAutoDraw(false);
  }
  
  // *Seq13* updates
  if (t >= 12.5 && Seq13.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq13.tStart = t;  // (not accounting for frame time here)
    Seq13.frameNStart = frameN;  // exact frame index
    Seq13.setAutoDraw(true);
  }

  frameRemains = 12.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq13.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq13.setAutoDraw(false);
  }
  
  // *Seq14* updates
  if (t >= 13.5 && Seq14.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq14.tStart = t;  // (not accounting for frame time here)
    Seq14.frameNStart = frameN;  // exact frame index
    Seq14.setAutoDraw(true);
  }

  frameRemains = 13.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq14.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq14.setAutoDraw(false);
  }
  
  // *Seq15* updates
  if (t >= 14.5 && Seq15.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq15.tStart = t;  // (not accounting for frame time here)
    Seq15.frameNStart = frameN;  // exact frame index
    Seq15.setAutoDraw(true);
  }

  frameRemains = 14.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq15.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq15.setAutoDraw(false);
  }
  
  // *Seq16* updates
  if (t >= 15.5 && Seq16.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq16.tStart = t;  // (not accounting for frame time here)
    Seq16.frameNStart = frameN;  // exact frame index
    Seq16.setAutoDraw(true);
  }

  frameRemains = 15.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq16.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq16.setAutoDraw(false);
  }
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_DpresComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine && routineTimer.getTime() > 0) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_DpresRoutineEnd() {
  //------Ending Routine 'routine_Dpres'-------
  for (const thisComponent of routine_DpresComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  return Scheduler.Event.NEXT;
}

var key_resp2_2;
var routine_DrespComponents;
function routine_DrespRoutineBegin() {
  //------Prepare to start Routine 'routine_Dresp'-------
  t = 0;
  routine_DrespClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  key_resp2_2 = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  routine_DrespComponents = [];
  routine_DrespComponents.push(textType_2);
  routine_DrespComponents.push(textFeedback_2);
  routine_DrespComponents.push(key_resp2_2);
  
  for (const thisComponent of routine_DrespComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_DrespRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_Dresp'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_DrespClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *textType_2* updates
  if (t >= 0 && textType_2.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    textType_2.tStart = t;  // (not accounting for frame time here)
    textType_2.frameNStart = frameN;  // exact frame index
    textType_2.setAutoDraw(true);
  }

  
  // *textFeedback_2* updates
  if (t >= 0 && textFeedback_2.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    textFeedback_2.tStart = t;  // (not accounting for frame time here)
    textFeedback_2.frameNStart = frameN;  // exact frame index
    textFeedback_2.setAutoDraw(true);
  }

  
  if (textFeedback_2.status === PsychoJS.Status.STARTED){ // only update if being drawn
    textFeedback_2.setText(screen_text);
  }
  
  // *key_resp2_2* updates
  if (t >= 0 && key_resp2_2.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp2_2.tStart = t;  // (not accounting for frame time here)
    key_resp2_2.frameNStart = frameN;  // exact frame index
    key_resp2_2.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.window.callOnFlip(function() { key_resp2_2.clock.reset(); }); // t = 0 on screen flip
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp2_2.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys({keyList:['1', '2', '3', '4', '5', '6', '7', '8', '9', 'backspace', 'return']});
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      key_resp2_2.keys = key_resp2_2.keys.concat(theseKeys);  // storing all keys
      key_resp2_2.rt = key_resp2_2.rt.concat(key_resp2_2.clock.getTime());
      // was this 'correct'?
      if (key_resp2_2.keys == '') {
          key_resp2_2.corr = 1;
      } else {
          key_resp2_2.corr = 0;
      }
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_DrespComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_DrespRoutineEnd() {
  //------Ending Routine 'routine_Dresp'-------
  for (const thisComponent of routine_DrespComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  
  // check responses
  if (key_resp2_2.keys === undefined || key_resp2_2.keys.length === 0) {    // No response was made
      key_resp2_2.keys = undefined;
  }
  
  // was no response the correct answer?!
  if (key_resp2_2.keys === undefined) {
    if (['None','none',undefined].includes('')) {
       key_resp2_2.corr = 1  // correct non-response
    } else {
       key_resp2_2.corr = 0  // failed to respond (incorrectly)
    }
  }
  // store data for thisExp (ExperimentHandler)
  psychoJS.experiment.addData('key_resp2_2.keys', key_resp2_2.keys);
  psychoJS.experiment.addData('key_resp2_2.corr', key_resp2_2.corr);
  if (typeof key_resp2_2.keys !== 'undefined') {  // we had a response
      psychoJS.experiment.addData('key_resp2_2.rt', key_resp2_2.rt);
      }
  
  // the Routine "routine_Dresp" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var key_resp;
var InstrBackComponents;
function InstrBackRoutineBegin() {
  //------Prepare to start Routine 'InstrBack'-------
  t = 0;
  InstrBackClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  key_resp = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  InstrBackComponents = [];
  InstrBackComponents.push(text);
  InstrBackComponents.push(key_resp);
  
  for (const thisComponent of InstrBackComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function InstrBackRoutineEachFrame() {
  //------Loop for each frame of Routine 'InstrBack'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = InstrBackClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *text* updates
  if (t >= 0.5 && text.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text.tStart = t;  // (not accounting for frame time here)
    text.frameNStart = frameN;  // exact frame index
    text.setAutoDraw(true);
  }

  
  // *key_resp* updates
  if (t >= 0.5 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp.tStart = t;  // (not accounting for frame time here)
    key_resp.frameNStart = frameN;  // exact frame index
    key_resp.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys();
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of InstrBackComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function InstrBackRoutineEnd() {
  //------Ending Routine 'InstrBack'-------
  for (const thisComponent of InstrBackComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // the Routine "InstrBack" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var key_resp_7;
var routine_round_2Components;
function routine_round_2RoutineBegin() {
  //------Prepare to start Routine 'routine_round_2'-------
  t = 0;
  routine_round_2Clock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  text_9.setText((trials_3.thisTrialN + 1));
  key_resp_7 = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  routine_round_2Components = [];
  routine_round_2Components.push(text_9);
  routine_round_2Components.push(text_10);
  routine_round_2Components.push(text_11);
  routine_round_2Components.push(key_resp_7);
  
  for (const thisComponent of routine_round_2Components)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_round_2RoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_round_2'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_round_2Clock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *text_9* updates
  if (t >= 0.5 && text_9.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_9.tStart = t;  // (not accounting for frame time here)
    text_9.frameNStart = frameN;  // exact frame index
    text_9.setAutoDraw(true);
  }

  
  // *text_10* updates
  if (t >= 0.5 && text_10.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_10.tStart = t;  // (not accounting for frame time here)
    text_10.frameNStart = frameN;  // exact frame index
    text_10.setAutoDraw(true);
  }

  
  // *text_11* updates
  if (t >= 0.5 && text_11.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    text_11.tStart = t;  // (not accounting for frame time here)
    text_11.frameNStart = frameN;  // exact frame index
    text_11.setAutoDraw(true);
  }

  
  // *key_resp_7* updates
  if (t >= 0.5 && key_resp_7.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp_7.tStart = t;  // (not accounting for frame time here)
    key_resp_7.frameNStart = frameN;  // exact frame index
    key_resp_7.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp_7.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys({keyList:['space']});
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      // a response ends the routine
      continueRoutine = false;
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_round_2Components)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_round_2RoutineEnd() {
  //------Ending Routine 'routine_round_2'-------
  for (const thisComponent of routine_round_2Components) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  // the Routine "routine_round_2" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var routine_BackPresComponents;
function routine_BackPresRoutineBegin() {
  //------Prepare to start Routine 'routine_BackPres'-------
  t = 0;
  routine_BackPresClock.reset(); // clock
  frameN = -1;
  routineTimer.add(16.500000);
  // update component parameters for each repeat
  Seq1_b.setText(S1);
  Seq2_b.setText(S2);
  Seq3_b.setText(S3);
  Seq4_b.setText(S4);
  Seq5_b.setText(S5);
  Seq6_b.setText(S6);
  Seq7_b.setText(S7);
  Seq8_b.setText(S8);
  Seq9_b.setText(S9);
  Seq10_b.setText(S10);
  Seq11_b.setText(S11);
  Seq12_b.setText(S12);
  Seq13_b.setText(S13);
  Seq14_b.setText(S14);
  Seq15_b.setText(S15);
  Seq16_b.setText(S16);
  // keep track of which components have finished
  routine_BackPresComponents = [];
  routine_BackPresComponents.push(Seq1_b);
  routine_BackPresComponents.push(Seq2_b);
  routine_BackPresComponents.push(Seq3_b);
  routine_BackPresComponents.push(Seq4_b);
  routine_BackPresComponents.push(Seq5_b);
  routine_BackPresComponents.push(Seq6_b);
  routine_BackPresComponents.push(Seq7_b);
  routine_BackPresComponents.push(Seq8_b);
  routine_BackPresComponents.push(Seq9_b);
  routine_BackPresComponents.push(Seq10_b);
  routine_BackPresComponents.push(Seq11_b);
  routine_BackPresComponents.push(Seq12_b);
  routine_BackPresComponents.push(Seq13_b);
  routine_BackPresComponents.push(Seq14_b);
  routine_BackPresComponents.push(Seq15_b);
  routine_BackPresComponents.push(Seq16_b);
  
  for (const thisComponent of routine_BackPresComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_BackPresRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_BackPres'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_BackPresClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *Seq1_b* updates
  if (t >= 0.5 && Seq1_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq1_b.tStart = t;  // (not accounting for frame time here)
    Seq1_b.frameNStart = frameN;  // exact frame index
    Seq1_b.setAutoDraw(true);
  }

  frameRemains = 0.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq1_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq1_b.setAutoDraw(false);
  }
  
  // *Seq2_b* updates
  if (t >= 1.5 && Seq2_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq2_b.tStart = t;  // (not accounting for frame time here)
    Seq2_b.frameNStart = frameN;  // exact frame index
    Seq2_b.setAutoDraw(true);
  }

  frameRemains = 1.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq2_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq2_b.setAutoDraw(false);
  }
  
  // *Seq3_b* updates
  if (t >= 2.5 && Seq3_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq3_b.tStart = t;  // (not accounting for frame time here)
    Seq3_b.frameNStart = frameN;  // exact frame index
    Seq3_b.setAutoDraw(true);
  }

  frameRemains = 2.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq3_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq3_b.setAutoDraw(false);
  }
  
  // *Seq4_b* updates
  if (t >= 3.5 && Seq4_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq4_b.tStart = t;  // (not accounting for frame time here)
    Seq4_b.frameNStart = frameN;  // exact frame index
    Seq4_b.setAutoDraw(true);
  }

  frameRemains = 3.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq4_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq4_b.setAutoDraw(false);
  }
  
  // *Seq5_b* updates
  if (t >= 4.5 && Seq5_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq5_b.tStart = t;  // (not accounting for frame time here)
    Seq5_b.frameNStart = frameN;  // exact frame index
    Seq5_b.setAutoDraw(true);
  }

  frameRemains = 4.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq5_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq5_b.setAutoDraw(false);
  }
  
  // *Seq6_b* updates
  if (t >= 5.5 && Seq6_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq6_b.tStart = t;  // (not accounting for frame time here)
    Seq6_b.frameNStart = frameN;  // exact frame index
    Seq6_b.setAutoDraw(true);
  }

  frameRemains = 5.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq6_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq6_b.setAutoDraw(false);
  }
  
  // *Seq7_b* updates
  if (t >= 6.5 && Seq7_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq7_b.tStart = t;  // (not accounting for frame time here)
    Seq7_b.frameNStart = frameN;  // exact frame index
    Seq7_b.setAutoDraw(true);
  }

  frameRemains = 6.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq7_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq7_b.setAutoDraw(false);
  }
  
  // *Seq8_b* updates
  if (t >= 7.5 && Seq8_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq8_b.tStart = t;  // (not accounting for frame time here)
    Seq8_b.frameNStart = frameN;  // exact frame index
    Seq8_b.setAutoDraw(true);
  }

  frameRemains = 7.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq8_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq8_b.setAutoDraw(false);
  }
  
  // *Seq9_b* updates
  if (t >= 8.5 && Seq9_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq9_b.tStart = t;  // (not accounting for frame time here)
    Seq9_b.frameNStart = frameN;  // exact frame index
    Seq9_b.setAutoDraw(true);
  }

  frameRemains = 8.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq9_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq9_b.setAutoDraw(false);
  }
  
  // *Seq10_b* updates
  if (t >= 9.5 && Seq10_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq10_b.tStart = t;  // (not accounting for frame time here)
    Seq10_b.frameNStart = frameN;  // exact frame index
    Seq10_b.setAutoDraw(true);
  }

  frameRemains = 9.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq10_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq10_b.setAutoDraw(false);
  }
  
  // *Seq11_b* updates
  if (t >= 10.5 && Seq11_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq11_b.tStart = t;  // (not accounting for frame time here)
    Seq11_b.frameNStart = frameN;  // exact frame index
    Seq11_b.setAutoDraw(true);
  }

  frameRemains = 10.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq11_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq11_b.setAutoDraw(false);
  }
  
  // *Seq12_b* updates
  if (t >= 11.5 && Seq12_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq12_b.tStart = t;  // (not accounting for frame time here)
    Seq12_b.frameNStart = frameN;  // exact frame index
    Seq12_b.setAutoDraw(true);
  }

  frameRemains = 11.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq12_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq12_b.setAutoDraw(false);
  }
  
  // *Seq13_b* updates
  if (t >= 12.5 && Seq13_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq13_b.tStart = t;  // (not accounting for frame time here)
    Seq13_b.frameNStart = frameN;  // exact frame index
    Seq13_b.setAutoDraw(true);
  }

  frameRemains = 12.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq13_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq13_b.setAutoDraw(false);
  }
  
  // *Seq14_b* updates
  if (t >= 13.5 && Seq14_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq14_b.tStart = t;  // (not accounting for frame time here)
    Seq14_b.frameNStart = frameN;  // exact frame index
    Seq14_b.setAutoDraw(true);
  }

  frameRemains = 13.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq14_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq14_b.setAutoDraw(false);
  }
  
  // *Seq15_b* updates
  if (t >= 14.5 && Seq15_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq15_b.tStart = t;  // (not accounting for frame time here)
    Seq15_b.frameNStart = frameN;  // exact frame index
    Seq15_b.setAutoDraw(true);
  }

  frameRemains = 14.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq15_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq15_b.setAutoDraw(false);
  }
  
  // *Seq16_b* updates
  if (t >= 15.5 && Seq16_b.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    Seq16_b.tStart = t;  // (not accounting for frame time here)
    Seq16_b.frameNStart = frameN;  // exact frame index
    Seq16_b.setAutoDraw(true);
  }

  frameRemains = 15.5 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (Seq16_b.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    Seq16_b.setAutoDraw(false);
  }
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_BackPresComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine && routineTimer.getTime() > 0) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_BackPresRoutineEnd() {
  //------Ending Routine 'routine_BackPres'-------
  for (const thisComponent of routine_BackPresComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  return Scheduler.Event.NEXT;
}

var key_resp2_2B;
var routine_BackRespComponents;
function routine_BackRespRoutineBegin() {
  //------Prepare to start Routine 'routine_BackResp'-------
  t = 0;
  routine_BackRespClock.reset(); // clock
  frameN = -1;
  // update component parameters for each repeat
  key_resp2_2B = new core.BuilderKeyResponse(psychoJS);
  
  // keep track of which components have finished
  routine_BackRespComponents = [];
  routine_BackRespComponents.push(textType_2B);
  routine_BackRespComponents.push(textFeedback_2B);
  routine_BackRespComponents.push(key_resp2_2B);
  
  for (const thisComponent of routine_BackRespComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function routine_BackRespRoutineEachFrame() {
  //------Loop for each frame of Routine 'routine_BackResp'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = routine_BackRespClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *textType_2B* updates
  if (t >= 0 && textType_2B.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    textType_2B.tStart = t;  // (not accounting for frame time here)
    textType_2B.frameNStart = frameN;  // exact frame index
    textType_2B.setAutoDraw(true);
  }

  
  // *textFeedback_2B* updates
  if (t >= 0 && textFeedback_2B.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    textFeedback_2B.tStart = t;  // (not accounting for frame time here)
    textFeedback_2B.frameNStart = frameN;  // exact frame index
    textFeedback_2B.setAutoDraw(true);
  }

  
  if (textFeedback_2B.status === PsychoJS.Status.STARTED){ // only update if being drawn
    textFeedback_2B.setText(screen_text);
  }
  
  // *key_resp2_2B* updates
  if (t >= 0 && key_resp2_2B.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    key_resp2_2B.tStart = t;  // (not accounting for frame time here)
    key_resp2_2B.frameNStart = frameN;  // exact frame index
    key_resp2_2B.status = PsychoJS.Status.STARTED;
    // keyboard checking is just starting
    psychoJS.window.callOnFlip(function() { key_resp2_2B.clock.reset(); }); // t = 0 on screen flip
    psychoJS.eventManager.clearEvents({eventType:'keyboard'});
  }

  if (key_resp2_2B.status === PsychoJS.Status.STARTED) {
    let theseKeys = psychoJS.eventManager.getKeys({keyList:['1', '2', '3', '4', '5', '6', '7', '8', '9', 'backspace', 'return']});
    
    // check for quit:
    if (theseKeys.indexOf('escape') > -1) {
      psychoJS.experiment.experimentEnded = true;
    }
    
    if (theseKeys.length > 0) {  // at least one key was pressed
      key_resp2_2B.keys = key_resp2_2B.keys.concat(theseKeys);  // storing all keys
      key_resp2_2B.rt = key_resp2_2B.rt.concat(key_resp2_2B.clock.getTime());
      // was this 'correct'?
      if (key_resp2_2B.keys == '') {
          key_resp2_2B.corr = 1;
      } else {
          key_resp2_2B.corr = 0;
      }
    }
  }
  
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of routine_BackRespComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function routine_BackRespRoutineEnd() {
  //------Ending Routine 'routine_BackResp'-------
  for (const thisComponent of routine_BackRespComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  
  // check responses
  if (key_resp2_2B.keys === undefined || key_resp2_2B.keys.length === 0) {    // No response was made
      key_resp2_2B.keys = undefined;
  }
  
  // was no response the correct answer?!
  if (key_resp2_2B.keys === undefined) {
    if (['None','none',undefined].includes('')) {
       key_resp2_2B.corr = 1  // correct non-response
    } else {
       key_resp2_2B.corr = 0  // failed to respond (incorrectly)
    }
  }
  // store data for thisExp (ExperimentHandler)
  psychoJS.experiment.addData('key_resp2_2B.keys', key_resp2_2B.keys);
  psychoJS.experiment.addData('key_resp2_2B.corr', key_resp2_2B.corr);
  if (typeof key_resp2_2B.keys !== 'undefined') {  // we had a response
      psychoJS.experiment.addData('key_resp2_2B.rt', key_resp2_2B.rt);
      }
  
  // the Routine "routine_BackResp" was not non-slip safe, so reset the non-slip timer
  routineTimer.reset();
  
  return Scheduler.Event.NEXT;
}

var GoodbyeComponents;
function GoodbyeRoutineBegin() {
  //------Prepare to start Routine 'Goodbye'-------
  t = 0;
  GoodbyeClock.reset(); // clock
  frameN = -1;
  routineTimer.add(6.500000);
  // update component parameters for each repeat
  // keep track of which components have finished
  GoodbyeComponents = [];
  GoodbyeComponents.push(GB);
  
  for (const thisComponent of GoodbyeComponents)
    if ('status' in thisComponent)
      thisComponent.status = PsychoJS.Status.NOT_STARTED;
  
  return Scheduler.Event.NEXT;
}


function GoodbyeRoutineEachFrame() {
  //------Loop for each frame of Routine 'Goodbye'-------
  let continueRoutine = true; // until we're told otherwise
  // get current time
  t = GoodbyeClock.getTime();
  frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
  // update/draw components on each frame
  
  // *GB* updates
  if (t >= 0.5 && GB.status === PsychoJS.Status.NOT_STARTED) {
    // keep track of start time/frame for later
    GB.tStart = t;  // (not accounting for frame time here)
    GB.frameNStart = frameN;  // exact frame index
    GB.setAutoDraw(true);
  }

  frameRemains = 0.5 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
  if (GB.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    GB.setAutoDraw(false);
  }
  // check for quit (typically the Esc key)
  if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
    return psychoJS.quit('The [Escape] key was pressed. Goodbye!', false);
  }
  
  // check if the Routine should terminate
  if (!continueRoutine) {  // a component has requested a forced-end of Routine
    return Scheduler.Event.NEXT;
  }
  
  continueRoutine = false;  // reverts to True if at least one component still running
  for (const thisComponent of GoodbyeComponents)
    if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
      continueRoutine = true;
      break;
    }
  
  // refresh the screen if continuing
  if (continueRoutine && routineTimer.getTime() > 0) {
    return Scheduler.Event.FLIP_REPEAT;
  }
  else {
    return Scheduler.Event.NEXT;
  }
}


function GoodbyeRoutineEnd() {
  //------Ending Routine 'Goodbye'-------
  for (const thisComponent of GoodbyeComponents) {
    if (typeof thisComponent.setAutoDraw === 'function') {
      thisComponent.setAutoDraw(false);
    }
  }
  return Scheduler.Event.NEXT;
}


function endLoopIteration(thisScheduler, thisTrial) {
  // ------Prepare for next entry------
  return function () {
    // ------Check if user ended loop early------
    if (currentLoop.finished) {
      thisScheduler.stop();
    } else if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
      psychoJS.experiment.nextEntry();
    }
  return Scheduler.Event.NEXT;
  };
}


function importConditions(loop) {
  const trialIndex = loop.getTrialIndex();
  return function () {
    loop.setTrialIndex(trialIndex);
    psychoJS.importAttributes(loop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});

  return Scheduler.Event.QUIT;
}
