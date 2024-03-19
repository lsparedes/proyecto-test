/*********************** 
 * Verbal-Fluency Test *
 ***********************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2022.2.5.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'verbal-fluency';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from codeLang

function buttonSelector(selectedButton) {
    selectedButton.fillColor = [-0.92, -0.24, -0.29];
}
var reminder = null;

// Run 'Before Experiment' code from codeInstrP
showInstructionP = false;
redo = false;
// Run 'Before Experiment' code from codePractice
let wordsPractice = [];
var scorePractice = 0
var showInstruction = false;

var thisOpacity = 1;
var opacityUp = false
var showHint = 1;
var redo = false;
// Run 'Before Experiment' code from codeTrial
var trialBlock = 0;
var showReminder = 1;

var thisOpacityTrial = 1;
var opacityUpTrial = false
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color('white'),
  units: 'height',
  waitBlanking: true
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
flowScheduler.add(langRoutineBegin());
flowScheduler.add(langRoutineEachFrame());
flowScheduler.add(langRoutineEnd());
const titleLoopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(titleLoopLoopBegin(titleLoopLoopScheduler));
flowScheduler.add(titleLoopLoopScheduler);
flowScheduler.add(titleLoopLoopEnd);
const practiceLoopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(practiceLoopLoopBegin(practiceLoopLoopScheduler));
flowScheduler.add(practiceLoopLoopScheduler);
flowScheduler.add(practiceLoopLoopEnd);
const trialLoopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialLoopLoopBegin(trialLoopLoopScheduler));
flowScheduler.add(trialLoopLoopScheduler);
flowScheduler.add(trialLoopLoopEnd);
const endLoopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(endLoopLoopBegin(endLoopLoopScheduler));
flowScheduler.add(endLoopLoopScheduler);
flowScheduler.add(endLoopLoopEnd);
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'stimuli/audio/animals-en.wav', 'path': 'stimuli/audio/animals-en.wav'},
    {'name': 'stimuli/audio/meubles-fr.wav', 'path': 'stimuli/audio/meubles-fr.wav'},
    {'name': 'stimuli/images/replay.png', 'path': 'stimuli/images/replay.png'},
    {'name': 'stimuli/images/imgAudio.png', 'path': 'stimuli/images/imgAudio.png'},
    {'name': 'stimuli/audio/F-fr.wav', 'path': 'stimuli/audio/F-fr.wav'},
    {'name': 'stimuli/audio/A-en.wav', 'path': 'stimuli/audio/A-en.wav'},
    {'name': 'stimuli/audio/instructions-letter-en.wav', 'path': 'stimuli/audio/instructions-letter-en.wav'},
    {'name': 'stimuli/audio/instructions-letter-fr.wav', 'path': 'stimuli/audio/instructions-letter-fr.wav'},
    {'name': 'stimuli/audio/Z-fr.wav', 'path': 'stimuli/audio/Z-fr.wav'},
    {'name': 'stimuli/audio/S-en.wav', 'path': 'stimuli/audio/S-en.wav'},
    {'name': 'stimuli/images/mic_start.png', 'path': 'stimuli/images/mic_start.png'},
    {'name': 'stimuli/audio/A-fr.wav', 'path': 'stimuli/audio/A-fr.wav'},
    {'name': 'stimuli/audio/clothing-en.wav', 'path': 'stimuli/audio/clothing-en.wav'},
    {'name': 'conditions/fluency-instructions-fr.csv', 'path': 'conditions/fluency-instructions-fr.csv'},
    {'name': 'conditions/fluency-practices-en.csv', 'path': 'conditions/fluency-practices-en.csv'},
    {'name': 'conditions/fluency-trials-en.csv', 'path': 'conditions/fluency-trials-en.csv'},
    {'name': 'stimuli/images/info.png', 'path': 'stimuli/images/info.png'},
    {'name': 'conditions/fluency-instructions-en.csv', 'path': 'conditions/fluency-instructions-en.csv'},
    {'name': 'stimuli/images/MicTitle.png', 'path': 'stimuli/images/MicTitle.png'},
    {'name': 'stimuli/images/mic_stop.png', 'path': 'stimuli/images/mic_stop.png'},
    {'name': 'stimuli/images/next.png', 'path': 'stimuli/images/next.png'},
    {'name': 'stimuli/audio/instructions-category-fr.wav', 'path': 'stimuli/audio/instructions-category-fr.wav'},
    {'name': 'conditions/fluency-practices-fr.csv', 'path': 'conditions/fluency-practices-fr.csv'},
    {'name': 'conditions/fluency-practices-fr - Copie.csv', 'path': 'conditions/fluency-practices-fr - Copie.csv'},
    {'name': 'stimuli/audio/S-fr.wav', 'path': 'stimuli/audio/S-fr.wav'},
    {'name': 'stimuli/audio/furniture-en.wav', 'path': 'stimuli/audio/furniture-en.wav'},
    {'name': 'stimuli/audio/animaux-fr.wav', 'path': 'stimuli/audio/animaux-fr.wav'},
    {'name': 'stimuli/audio/Z-en.wav', 'path': 'stimuli/audio/Z-en.wav'},
    {'name': 'conditions/fluency-trials-fr.csv', 'path': 'conditions/fluency-trials-fr.csv'},
    {'name': 'conditions/fluency-practices-en.xlsx', 'path': 'conditions/fluency-practices-en.xlsx'},
    {'name': 'stimuli/audio/L-fr.wav', 'path': 'stimuli/audio/L-fr.wav'},
    {'name': 'conditions/fluency-practices-en - Copie.csv', 'path': 'conditions/fluency-practices-en - Copie.csv'},
    {'name': 'conditions/fluency-trials-full.csv', 'path': 'conditions/fluency-trials-full.csv'},
    {'name': 'stimuli/audio/instructions-category-en.wav', 'path': 'stimuli/audio/instructions-category-en.wav'},
    {'name': 'stimuli/audio/F-en.wav', 'path': 'stimuli/audio/F-en.wav'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2022.2.5';
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


  return Scheduler.Event.NEXT;
}


var langClock;
var enButton;
var frButton;
var mouse;
var titleClock;
var mouseTitle;
var textTitle;
var nextButtonTitle;
var imageTitle;
var instruPracticeClock;
var mouseInstrP;
var imageAudio;
var titleInstrP;
var nextButton;
var replayButtonInstrP;
var backgroundInstrP;
var infoBoxP;
var infoButtonInstrP;
var soundInstru;
var introPracticeClock;
var mouseIntro;
var textIntro;
var titleIntro;
var nextButtonIntro;
var replayButtonIntro;
var backgroundIntro;
var infoBoxIntro;
var infoButtonIntro;
var soundIntro;
var txtIntro;
var practiceClock;
var mousePract;
var infoBox;
var txtPractice;
var micStartP;
var micStopP;
var imgBackground;
var textboxInstructions;
var infoButton;
var beginButton;
var textHint;
var trialClock;
var mouseTrial;
var blackBackgroundTrial;
var micTrial;
var audioTrial;
var txtTrial;
var txtRemind;
var micStart;
var micStop;
var nextButtonTrial;
var textNext;
var endTrialClock;
var blackBackgroundEnd;
var textEndTrial;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "lang"
  langClock = new util.Clock();
  enButton = new visual.ButtonStim({
    win: psychoJS.window,
    name: 'enButton',
    text: 'ENGLISH',
    fillColor: 'whitesmoke',
    borderColor: 'darkcyan',
    color: 'darkcyan',
    colorSpace: 'rgb',
    pos: [0, 0.02],
    letterHeight: 0.035,
    size: [0.3, 0.1]
  });
  enButton.clock = new util.Clock();
  
  frButton = new visual.ButtonStim({
    win: psychoJS.window,
    name: 'frButton',
    text: 'FRANÇAIS',
    fillColor: 'whitesmoke',
    borderColor: 'darkcyan',
    color: 'darkcyan',
    colorSpace: 'rgb',
    pos: [0, (- 0.1)],
    letterHeight: 0.035,
    size: [0.3, 0.1]
  });
  frButton.clock = new util.Clock();
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  // Initialize components for Routine "title"
  titleClock = new util.Clock();
  mouseTitle = new core.Mouse({
    win: psychoJS.window,
  });
  mouseTitle.mouseClock = new util.Clock();
  textTitle = new visual.TextStim({
    win: psychoJS.window,
    name: 'textTitle',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.92, -0.24, -0.29]),  opacity: 1.0,
    depth: -2.0 
  });
  
  nextButtonTitle = new visual.ImageStim({
    win : psychoJS.window,
    name : 'nextButtonTitle', units : undefined, 
    image : 'stimuli/images/next.png', mask : undefined,
    ori : 0.0, pos : [0.75, (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  imageTitle = new visual.ImageStim({
    win : psychoJS.window,
    name : 'imageTitle', units : undefined, 
    image : 'stimuli/images/MicTitle.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.5, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  // Initialize components for Routine "instruPractice"
  instruPracticeClock = new util.Clock();
  mouseInstrP = new core.Mouse({
    win: psychoJS.window,
  });
  mouseInstrP.mouseClock = new util.Clock();
  imageAudio = new visual.ImageStim({
    win : psychoJS.window,
    name : 'imageAudio', units : undefined, 
    image : 'stimuli/images/imgAudio.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.8, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  titleInstrP = new visual.TextStim({
    win: psychoJS.window,
    name: 'titleInstrP',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.92, -0.24, -0.29]),  opacity: 1.0,
    depth: -3.0 
  });
  
  nextButton = new visual.ImageStim({
    win : psychoJS.window,
    name : 'nextButton', units : undefined, 
    image : 'stimuli/images/next.png', mask : undefined,
    ori : 0.0, pos : [0.75, (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  replayButtonInstrP = new visual.ImageStim({
    win : psychoJS.window,
    name : 'replayButtonInstrP', units : undefined, 
    image : 'stimuli/images/replay.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  backgroundInstrP = new visual.Rect ({
    win: psychoJS.window, name: 'backgroundInstrP', 
    width: [2, 1][0], height: [2, 1][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: undefined, depth: -6, interpolate: true,
  });
  
  infoBoxP = new visual.TextBox({
    win: psychoJS.window,
    name: 'infoBoxP',
    text: '',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.03,
    size: [1.3, 0.8],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.1,
    alignment: 'center',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -7.0 
  });
  
  infoButtonInstrP = new visual.ImageStim({
    win : psychoJS.window,
    name : 'infoButtonInstrP', units : undefined, 
    image : 'stimuli/images/info.png', mask : undefined,
    ori : 0.0, pos : [(- 0.75), (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  soundInstru = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  soundInstru.setVolume(1.0);
  // Initialize components for Routine "introPractice"
  introPracticeClock = new util.Clock();
  mouseIntro = new core.Mouse({
    win: psychoJS.window,
  });
  mouseIntro.mouseClock = new util.Clock();
  textIntro = new visual.TextStim({
    win: psychoJS.window,
    name: 'textIntro',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.15], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: 1.0,
    depth: -2.0 
  });
  
  titleIntro = new visual.TextStim({
    win: psychoJS.window,
    name: 'titleIntro',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.4], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.92, -0.24, -0.29]),  opacity: 1.0,
    depth: -3.0 
  });
  
  nextButtonIntro = new visual.ImageStim({
    win : psychoJS.window,
    name : 'nextButtonIntro', units : undefined, 
    image : 'stimuli/images/next.png', mask : undefined,
    ori : 0.0, pos : [0.75, (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  replayButtonIntro = new visual.ImageStim({
    win : psychoJS.window,
    name : 'replayButtonIntro', units : undefined, 
    image : 'stimuli/images/replay.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  backgroundIntro = new visual.Rect ({
    win: psychoJS.window, name: 'backgroundIntro', 
    width: [2, 1][0], height: [2, 1][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: undefined, depth: -6, interpolate: true,
  });
  
  infoBoxIntro = new visual.TextBox({
    win: psychoJS.window,
    name: 'infoBoxIntro',
    text: '',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.03,
    size: [1.3, 0.8],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.1,
    alignment: 'center',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -7.0 
  });
  
  infoButtonIntro = new visual.ImageStim({
    win : psychoJS.window,
    name : 'infoButtonIntro', units : undefined, 
    image : 'stimuli/images/info.png', mask : undefined,
    ori : 0.0, pos : [(- 0.75), (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  soundIntro = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  soundIntro.setVolume(1.0);
  txtIntro = new visual.TextStim({
    win: psychoJS.window,
    name: 'txtIntro',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.15)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.92, -0.24, -0.29]),  opacity: undefined,
    depth: -10.0 
  });
  
  // Initialize components for Routine "practice"
  practiceClock = new util.Clock();
  mousePract = new core.Mouse({
    win: psychoJS.window,
  });
  mousePract.mouseClock = new util.Clock();
  infoBox = new visual.TextBox({
    win: psychoJS.window,
    name: 'infoBox',
    text: '',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.5, 0.5],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -2.0 
  });
  
  txtPractice = new visual.TextStim({
    win: psychoJS.window,
    name: 'txtPractice',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.35], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.92, -0.24, -0.29]),  opacity: undefined,
    depth: -3.0 
  });
  
  micStartP = new visual.ImageStim({
    win : psychoJS.window,
    name : 'micStartP', units : undefined, 
    image : 'stimuli/images/mic_start.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.65, 0.65],
    color : new util.Color([1,1,1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  micStopP = new visual.ImageStim({
    win : psychoJS.window,
    name : 'micStopP', units : undefined, 
    image : 'stimuli/images/mic_stop.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.65, 0.65],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  imgBackground = new visual.Rect ({
    win: psychoJS.window, name: 'imgBackground', 
    width: [2, 1][0], height: [2, 1][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: undefined, depth: -6, interpolate: true,
  });
  
  textboxInstructions = new visual.TextBox({
    win: psychoJS.window,
    name: 'textboxInstructions',
    text: '',
    font: 'Arial',
    pos: [0, 0], letterHeight: 0.04,
    size: [1.3, 0.8],  units: undefined, 
    color: 'black', colorSpace: 'rgb',
    fillColor: 'white', borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.1,
    alignment: 'center',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -7.0 
  });
  
  infoButton = new visual.ImageStim({
    win : psychoJS.window,
    name : 'infoButton', units : undefined, 
    image : 'stimuli/images/info.png', mask : undefined,
    ori : 0.0, pos : [(- 0.75), (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  beginButton = new visual.ImageStim({
    win : psychoJS.window,
    name : 'beginButton', units : undefined, 
    image : 'stimuli/images/next.png', mask : undefined,
    ori : 0.0, pos : [0.75, (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  textHint = new visual.TextStim({
    win: psychoJS.window,
    name: 'textHint',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.35)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -10.0 
  });
  
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  mouseTrial = new core.Mouse({
    win: psychoJS.window,
  });
  mouseTrial.mouseClock = new util.Clock();
  blackBackgroundTrial = new visual.Rect ({
    win: psychoJS.window, name: 'blackBackgroundTrial', 
    width: [4, 4][0], height: [4, 4][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: 1.0, depth: -2, interpolate: true,
  });
  
  micTrial = new sound.Microphone({
    win : psychoJS.window, 
    name:'micTrial',
    sampleRateHz : 48000,
    channels : 'auto',
    maxRecordingSize : 24000.0,
    loopback : true,
    policyWhenFull : 'ignore',
  });
  audioTrial = new sound.Sound({
    win: psychoJS.window,
    value: 'A',
    secs: (- 1),
    });
  audioTrial.setVolume(1.0);
  txtTrial = new visual.TextStim({
    win: psychoJS.window,
    name: 'txtTrial',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.35], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([-0.92, -0.24, -0.29]),  opacity: undefined,
    depth: -5.0 
  });
  
  txtRemind = new visual.TextStim({
    win: psychoJS.window,
    name: 'txtRemind',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.35], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  micStart = new visual.ImageStim({
    win : psychoJS.window,
    name : 'micStart', units : undefined, 
    image : 'stimuli/images/mic_start.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.65, 0.65],
    color : new util.Color([1,1,1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  micStop = new visual.ImageStim({
    win : psychoJS.window,
    name : 'micStop', units : undefined, 
    image : 'stimuli/images/mic_stop.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.65, 0.65],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  nextButtonTrial = new visual.ImageStim({
    win : psychoJS.window,
    name : 'nextButtonTrial', units : undefined, 
    image : 'stimuli/images/next.png', mask : undefined,
    ori : 0.0, pos : [0.75, (- 0.35)], size : [0.1, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  textNext = new visual.TextStim({
    win: psychoJS.window,
    name: 'textNext',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.35], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1.0,
    depth: -10.0 
  });
  
  // Initialize components for Routine "endTrial"
  endTrialClock = new util.Clock();
  blackBackgroundEnd = new visual.Rect ({
    win: psychoJS.window, name: 'blackBackgroundEnd', 
    width: [4, 4][0], height: [4, 4][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: 1.0, depth: -1, interpolate: true,
  });
  
  textEndTrial = new visual.TextStim({
    win: psychoJS.window,
    name: 'textEndTrial',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var endRoutineLang;
var clickTime;
var gotValidClick;
var langComponents;
function langRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'lang' ---
    t = 0;
    langClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from codeLang
    endRoutineLang = false;
    clickTime = null;
    
    // setup some python lists for storing info about the mouse
    // current position of the mouse:
    mouse.x = [];
    mouse.y = [];
    mouse.leftButton = [];
    mouse.midButton = [];
    mouse.rightButton = [];
    mouse.time = [];
    mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    langComponents = [];
    langComponents.push(enButton);
    langComponents.push(frButton);
    langComponents.push(mouse);
    
    for (const thisComponent of langComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var conditionsInstrPCSV;
var conditionsPracticeCSV;
var conditionsCSV;
var beginButtonTxt;
var endTxt;
var endWAV;
var instruLetterWAV;
var instruCatWAV;
var prevButtonState;
var _mouseButtons;
var _mouseXYs;
function langRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'lang' ---
    // get current time
    t = langClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from codeLang
    if ((endRoutineLang && (clickTime === null))) {
        clickTime = globalClock.getTime();
    }
    if (((enButton.contains(mouse) & mouse.getPressed()[0]) === 1)) {
        buttonSelector(enButton);
    } else {
        enButton.fillColor = "whitesmoke";
        enButton.color = "darkcyan";
        enButton.borderColor = "darkcyan";
    }
    enButton.draw();
    if (((frButton.contains(mouse) & mouse.getPressed()[0]) === 1)) {
        frButton.fillColor = "darkcyan";
        frButton.color = "black";
        frButton.borderColor = "whitesmoke";
    } else {
        frButton.fillColor = "whitesmoke";
        frButton.color = "darkcyan";
        frButton.borderColor = "darkcyan";
    }
    frButton.draw();
    if (((clickTime !== null) && ((globalClock.getTime() - clickTime) >= 0.5))) {
        continueRoutine = false;
    }
    
    
    // *enButton* updates
    if (t >= 0 && enButton.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      enButton.tStart = t;  // (not accounting for frame time here)
      enButton.frameNStart = frameN;  // exact frame index
      
      enButton.setAutoDraw(true);
    }

    if (enButton.status === PsychoJS.Status.STARTED) {
      // check whether enButton has been pressed
      if (enButton.isClicked) {
        if (!enButton.wasClicked) {
          // store time of first click
          enButton.timesOn.push(enButton.clock.getTime());
          enButton.numClicks += 1;
          // store time clicked until
          enButton.timesOff.push(enButton.clock.getTime());
        } else {
          // update time clicked until;
          enButton.timesOff[enButton.timesOff.length - 1] = enButton.clock.getTime();
        }
        if (!enButton.wasClicked) {
          conditionsInstrPCSV = "conditions/fluency-instructions-en.csv";
          conditionsPracticeCSV = "conditions/fluency-practices-en.csv";
          conditionsCSV = "conditions/fluency-trials-en.csv";
          beginButtonTxt = "BEGIN";
          endTxt = "Thank you. Please wait while the task completes.";
          endWAV = "stimuli/audio/end-en.wav";
          endRoutineLang = true;
          instruLetterWAV = "stimuli/audio/instructions-letter-en.wav";
          instruCatWAV = "stimuli/audio/instructions-category-en.wav";
        }
        // if enButton is still clicked next frame, it is not a new click
        enButton.wasClicked = true;
      } else {
        // if enButton is clicked next frame, it is a new click
        enButton.wasClicked = false;
      }
    } else {
      // keep clock at 0 if enButton hasn't started / has finished
      enButton.clock.reset();
      // if enButton is clicked next frame, it is a new click
      enButton.wasClicked = false;
    }
    
    // *frButton* updates
    if (t >= 0 && frButton.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      frButton.tStart = t;  // (not accounting for frame time here)
      frButton.frameNStart = frameN;  // exact frame index
      
      frButton.setAutoDraw(true);
    }

    if (frButton.status === PsychoJS.Status.STARTED) {
      // check whether frButton has been pressed
      if (frButton.isClicked) {
        if (!frButton.wasClicked) {
          // store time of first click
          frButton.timesOn.push(frButton.clock.getTime());
          frButton.numClicks += 1;
          // store time clicked until
          frButton.timesOff.push(frButton.clock.getTime());
        } else {
          // update time clicked until;
          frButton.timesOff[frButton.timesOff.length - 1] = frButton.clock.getTime();
        }
        if (!frButton.wasClicked) {
          conditionsInstrPCSV = "conditions/fluency-instructions-fr.csv";
          conditionsPracticeCSV = "conditions/fluency-practices-fr.csv";
          conditionsCSV = "conditions/fluency-trials-fr.csv";
          beginButtonTxt = "D\u00c9BUTER";
          endTxt = "Merci. Veuillez patientez pendant que la t\u00e2che se termine.";
          endWAV = "stimuli/audio/end-fr.wav";
          instruLetterWAV = "stimuli/audio/instructions-letter-en.wav";
          instruCatWAV = "stimuli/audio/instructions-category-en.wav";
          endRoutineLang = true;
        }
        // if frButton is still clicked next frame, it is not a new click
        frButton.wasClicked = true;
      } else {
        // if frButton is clicked next frame, it is a new click
        frButton.wasClicked = false;
      }
    } else {
      // keep clock at 0 if frButton hasn't started / has finished
      frButton.clock.reset();
      // if frButton is clicked next frame, it is a new click
      frButton.wasClicked = false;
    }
    // *mouse* updates
    if (t >= 0.0 && mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse.tStart = t;  // (not accounting for frame time here)
      mouse.frameNStart = frameN;  // exact frame index
      
      mouse.status = PsychoJS.Status.STARTED;
      mouse.mouseClock.reset();
      prevButtonState = mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [enButton, frButton]) {
            if (obj.contains(mouse)) {
              gotValidClick = true;
              mouse.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = mouse.getPos();
          mouse.x.push(_mouseXYs[0]);
          mouse.y.push(_mouseXYs[1]);
          mouse.leftButton.push(_mouseButtons[0]);
          mouse.midButton.push(_mouseButtons[1]);
          mouse.rightButton.push(_mouseButtons[2]);
          mouse.time.push(mouse.mouseClock.getTime());
        }
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
    for (const thisComponent of langComponents)
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


function langRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'lang' ---
    for (const thisComponent of langComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('enButton.numClicks', enButton.numClicks);
    psychoJS.experiment.addData('enButton.timesOn', enButton.timesOn);
    psychoJS.experiment.addData('enButton.timesOff', enButton.timesOff);
    psychoJS.experiment.addData('frButton.numClicks', frButton.numClicks);
    psychoJS.experiment.addData('frButton.timesOn', frButton.timesOn);
    psychoJS.experiment.addData('frButton.timesOff', frButton.timesOff);
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('mouse.x', mouse.x);
    psychoJS.experiment.addData('mouse.y', mouse.y);
    psychoJS.experiment.addData('mouse.leftButton', mouse.leftButton);
    psychoJS.experiment.addData('mouse.midButton', mouse.midButton);
    psychoJS.experiment.addData('mouse.rightButton', mouse.rightButton);
    psychoJS.experiment.addData('mouse.time', mouse.time);
    psychoJS.experiment.addData('mouse.clicked_name', mouse.clicked_name);
    
    // the Routine "lang" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var titleLoop;
function titleLoopLoopBegin(titleLoopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    titleLoop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: conditionsInstrPCSV,
      seed: undefined, name: 'titleLoop'
    });
    psychoJS.experiment.addLoop(titleLoop); // add the loop to the experiment
    currentLoop = titleLoop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTitleLoop of titleLoop) {
      snapshot = titleLoop.getSnapshot();
      titleLoopLoopScheduler.add(importConditions(snapshot));
      titleLoopLoopScheduler.add(titleRoutineBegin(snapshot));
      titleLoopLoopScheduler.add(titleRoutineEachFrame());
      titleLoopLoopScheduler.add(titleRoutineEnd(snapshot));
      titleLoopLoopScheduler.add(titleLoopLoopEndIteration(titleLoopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function titleLoopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(titleLoop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function titleLoopLoopEndIteration(scheduler, snapshot) {
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


var practiceLoop;
function practiceLoopLoopBegin(practiceLoopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    practiceLoop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: conditionsPracticeCSV,
      seed: undefined, name: 'practiceLoop'
    });
    psychoJS.experiment.addLoop(practiceLoop); // add the loop to the experiment
    currentLoop = practiceLoop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisPracticeLoop of practiceLoop) {
      snapshot = practiceLoop.getSnapshot();
      practiceLoopLoopScheduler.add(importConditions(snapshot));
      const vfRedoInstruLoopScheduler = new Scheduler(psychoJS);
      practiceLoopLoopScheduler.add(vfRedoInstruLoopBegin(vfRedoInstruLoopScheduler, snapshot));
      practiceLoopLoopScheduler.add(vfRedoInstruLoopScheduler);
      practiceLoopLoopScheduler.add(vfRedoInstruLoopEnd);
      const redoPracticeLoopScheduler = new Scheduler(psychoJS);
      practiceLoopLoopScheduler.add(redoPracticeLoopBegin(redoPracticeLoopScheduler, snapshot));
      practiceLoopLoopScheduler.add(redoPracticeLoopScheduler);
      practiceLoopLoopScheduler.add(redoPracticeLoopEnd);
      practiceLoopLoopScheduler.add(practiceRoutineBegin(snapshot));
      practiceLoopLoopScheduler.add(practiceRoutineEachFrame());
      practiceLoopLoopScheduler.add(practiceRoutineEnd(snapshot));
      practiceLoopLoopScheduler.add(practiceLoopLoopEndIteration(practiceLoopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var vfRedoInstru;
function vfRedoInstruLoopBegin(vfRedoInstruLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    vfRedoInstru = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 99, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'vfRedoInstru'
    });
    psychoJS.experiment.addLoop(vfRedoInstru); // add the loop to the experiment
    currentLoop = vfRedoInstru;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisVfRedoInstru of vfRedoInstru) {
      snapshot = vfRedoInstru.getSnapshot();
      vfRedoInstruLoopScheduler.add(importConditions(snapshot));
      vfRedoInstruLoopScheduler.add(instruPracticeRoutineBegin(snapshot));
      vfRedoInstruLoopScheduler.add(instruPracticeRoutineEachFrame());
      vfRedoInstruLoopScheduler.add(instruPracticeRoutineEnd(snapshot));
      vfRedoInstruLoopScheduler.add(vfRedoInstruLoopEndIteration(vfRedoInstruLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function vfRedoInstruLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(vfRedoInstru);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function vfRedoInstruLoopEndIteration(scheduler, snapshot) {
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


var redoPractice;
function redoPracticeLoopBegin(redoPracticeLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    redoPractice = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 99, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'redoPractice'
    });
    psychoJS.experiment.addLoop(redoPractice); // add the loop to the experiment
    currentLoop = redoPractice;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisRedoPractice of redoPractice) {
      snapshot = redoPractice.getSnapshot();
      redoPracticeLoopScheduler.add(importConditions(snapshot));
      redoPracticeLoopScheduler.add(introPracticeRoutineBegin(snapshot));
      redoPracticeLoopScheduler.add(introPracticeRoutineEachFrame());
      redoPracticeLoopScheduler.add(introPracticeRoutineEnd(snapshot));
      redoPracticeLoopScheduler.add(redoPracticeLoopEndIteration(redoPracticeLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function redoPracticeLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(redoPractice);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function redoPracticeLoopEndIteration(scheduler, snapshot) {
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


async function practiceLoopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(practiceLoop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function practiceLoopLoopEndIteration(scheduler, snapshot) {
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


var trialLoop;
function trialLoopLoopBegin(trialLoopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trialLoop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: conditionsCSV,
      seed: undefined, name: 'trialLoop'
    });
    psychoJS.experiment.addLoop(trialLoop); // add the loop to the experiment
    currentLoop = trialLoop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrialLoop of trialLoop) {
      snapshot = trialLoop.getSnapshot();
      trialLoopLoopScheduler.add(importConditions(snapshot));
      trialLoopLoopScheduler.add(trialRoutineBegin(snapshot));
      trialLoopLoopScheduler.add(trialRoutineEachFrame());
      trialLoopLoopScheduler.add(trialRoutineEnd(snapshot));
      trialLoopLoopScheduler.add(trialLoopLoopEndIteration(trialLoopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trialLoopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trialLoop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialLoopLoopEndIteration(scheduler, snapshot) {
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


var endLoop;
function endLoopLoopBegin(endLoopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    endLoop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: conditionsInstrPCSV,
      seed: undefined, name: 'endLoop'
    });
    psychoJS.experiment.addLoop(endLoop); // add the loop to the experiment
    currentLoop = endLoop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisEndLoop of endLoop) {
      snapshot = endLoop.getSnapshot();
      endLoopLoopScheduler.add(importConditions(snapshot));
      endLoopLoopScheduler.add(endTrialRoutineBegin(snapshot));
      endLoopLoopScheduler.add(endTrialRoutineEachFrame());
      endLoopLoopScheduler.add(endTrialRoutineEnd(snapshot));
      endLoopLoopScheduler.add(endLoopLoopEndIteration(endLoopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function endLoopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(endLoop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function endLoopLoopEndIteration(scheduler, snapshot) {
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


var titleComponents;
function titleRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'title' ---
    t = 0;
    titleClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouseTitle
    // current position of the mouse:
    mouseTitle.x = [];
    mouseTitle.y = [];
    mouseTitle.leftButton = [];
    mouseTitle.midButton = [];
    mouseTitle.rightButton = [];
    mouseTitle.time = [];
    mouseTitle.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    titleComponents = [];
    titleComponents.push(mouseTitle);
    titleComponents.push(textTitle);
    titleComponents.push(nextButtonTitle);
    titleComponents.push(imageTitle);
    
    for (const thisComponent of titleComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function titleRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'title' ---
    // get current time
    t = titleClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // *mouseTitle* updates
    if (t >= 0.0 && mouseTitle.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouseTitle.tStart = t;  // (not accounting for frame time here)
      mouseTitle.frameNStart = frameN;  // exact frame index
      
      mouseTitle.status = PsychoJS.Status.STARTED;
      mouseTitle.mouseClock.reset();
      prevButtonState = mouseTitle.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouseTitle.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouseTitle.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [nextButtonTitle]) {
            if (obj.contains(mouseTitle)) {
              gotValidClick = true;
              mouseTitle.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = mouseTitle.getPos();
          mouseTitle.x.push(_mouseXYs[0]);
          mouseTitle.y.push(_mouseXYs[1]);
          mouseTitle.leftButton.push(_mouseButtons[0]);
          mouseTitle.midButton.push(_mouseButtons[1]);
          mouseTitle.rightButton.push(_mouseButtons[2]);
          mouseTitle.time.push(mouseTitle.mouseClock.getTime());
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *textTitle* updates
    if (t >= 0.0 && textTitle.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textTitle.tStart = t;  // (not accounting for frame time here)
      textTitle.frameNStart = frameN;  // exact frame index
      
      textTitle.setAutoDraw(true);
    }

    
    if (textTitle.status === PsychoJS.Status.STARTED){ // only update if being drawn
      textTitle.setText(title, false);
    }
    
    // *nextButtonTitle* updates
    if (t >= 0 && nextButtonTitle.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      nextButtonTitle.tStart = t;  // (not accounting for frame time here)
      nextButtonTitle.frameNStart = frameN;  // exact frame index
      
      nextButtonTitle.setAutoDraw(true);
    }

    
    // *imageTitle* updates
    if (t >= 0.0 && imageTitle.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      imageTitle.tStart = t;  // (not accounting for frame time here)
      imageTitle.frameNStart = frameN;  // exact frame index
      
      imageTitle.setAutoDraw(true);
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
    for (const thisComponent of titleComponents)
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


function titleRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'title' ---
    for (const thisComponent of titleComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    if (mouseTitle.x) {  psychoJS.experiment.addData('mouseTitle.x', mouseTitle.x[0])};
    if (mouseTitle.y) {  psychoJS.experiment.addData('mouseTitle.y', mouseTitle.y[0])};
    if (mouseTitle.leftButton) {  psychoJS.experiment.addData('mouseTitle.leftButton', mouseTitle.leftButton[0])};
    if (mouseTitle.midButton) {  psychoJS.experiment.addData('mouseTitle.midButton', mouseTitle.midButton[0])};
    if (mouseTitle.rightButton) {  psychoJS.experiment.addData('mouseTitle.rightButton', mouseTitle.rightButton[0])};
    if (mouseTitle.time) {  psychoJS.experiment.addData('mouseTitle.time', mouseTitle.time[0])};
    if (mouseTitle.clicked_name) {  psychoJS.experiment.addData('mouseTitle.clicked_name', mouseTitle.clicked_name[0])};
    
    // the Routine "title" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var button_down;
var showInstructionP;
var redo;
var instruPracticeComponents;
function instruPracticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instruPractice' ---
    t = 0;
    instruPracticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from codeInstrP
    titleInstrP.text = title;
    
    button_down = true
    showInstructionP = false;
    redo = false;
    // setup some python lists for storing info about the mouseInstrP
    // current position of the mouse:
    mouseInstrP.x = [];
    mouseInstrP.y = [];
    mouseInstrP.leftButton = [];
    mouseInstrP.midButton = [];
    mouseInstrP.rightButton = [];
    mouseInstrP.time = [];
    gotValidClick = false; // until a click is received
    soundInstru = new sound.Sound({
    win: psychoJS.window,
    value: audioInstru,
    secs: -1,
    });
    soundInstru.setVolume(1.0);
    // keep track of which components have finished
    instruPracticeComponents = [];
    instruPracticeComponents.push(mouseInstrP);
    instruPracticeComponents.push(imageAudio);
    instruPracticeComponents.push(titleInstrP);
    instruPracticeComponents.push(nextButton);
    instruPracticeComponents.push(replayButtonInstrP);
    instruPracticeComponents.push(backgroundInstrP);
    instruPracticeComponents.push(infoBoxP);
    instruPracticeComponents.push(infoButtonInstrP);
    instruPracticeComponents.push(soundInstru);
    
    for (const thisComponent of instruPracticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function instruPracticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instruPractice' ---
    // get current time
    t = instruPracticeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from codeInstrP
    // Reset buttons if they are not pressed
    if (button_down && !(mouseInstrP.getPressed()[0] === 1)){
        button_down = false
    }
    if (nextButton.contains(mouseInstrP) && mouseInstrP.getPressed()[0] === 1 && !button_down) {
        console.log('next button intru')
        button_down = true;
        continueRoutine = false;
    }
    if (((infoButtonInstrP.contains(mouseInstrP) & mouseInstrP.getPressed()[0]) === 1)) {
        showInstructionP = true;
        infoBoxP.text = instructionPractice;
        infoBoxP.opacity = 1;
        backgroundInstrP.opacity = 1;
    }
    if ((!infoButtonInstrP.contains(mouseInstrP))) {
        infoBoxP.opacity = 0;
        backgroundInstrP.opacity = 0;
    }
    if (replayButtonInstrP.contains(mouseInstrP) && mouseInstrP.getPressed()[0]==1 && !redo && !button_down){
        redo = true;
        button_down = true;
        continueRoutine = false;
    }
    // *mouseInstrP* updates
    if (t >= 0.0 && mouseInstrP.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouseInstrP.tStart = t;  // (not accounting for frame time here)
      mouseInstrP.frameNStart = frameN;  // exact frame index
      
      mouseInstrP.status = PsychoJS.Status.STARTED;
      mouseInstrP.mouseClock.reset();
      prevButtonState = mouseInstrP.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouseInstrP.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouseInstrP.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          _mouseXYs = mouseInstrP.getPos();
          mouseInstrP.x.push(_mouseXYs[0]);
          mouseInstrP.y.push(_mouseXYs[1]);
          mouseInstrP.leftButton.push(_mouseButtons[0]);
          mouseInstrP.midButton.push(_mouseButtons[1]);
          mouseInstrP.rightButton.push(_mouseButtons[2]);
          mouseInstrP.time.push(mouseInstrP.mouseClock.getTime());
        }
      }
    }
    
    // *imageAudio* updates
    if (t >= 0.0 && imageAudio.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      imageAudio.tStart = t;  // (not accounting for frame time here)
      imageAudio.frameNStart = frameN;  // exact frame index
      
      imageAudio.setAutoDraw(true);
    }

    
    // *titleInstrP* updates
    if (t >= 0.0 && titleInstrP.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      titleInstrP.tStart = t;  // (not accounting for frame time here)
      titleInstrP.frameNStart = frameN;  // exact frame index
      
      titleInstrP.setAutoDraw(true);
    }

    
    if (titleInstrP.status === PsychoJS.Status.STARTED){ // only update if being drawn
      titleInstrP.setText(title, false);
    }
    
    // *nextButton* updates
    if (t >= 5.0 && nextButton.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      nextButton.tStart = t;  // (not accounting for frame time here)
      nextButton.frameNStart = frameN;  // exact frame index
      
      nextButton.setAutoDraw(true);
    }

    
    // *replayButtonInstrP* updates
    if (t >= 5 && replayButtonInstrP.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      replayButtonInstrP.tStart = t;  // (not accounting for frame time here)
      replayButtonInstrP.frameNStart = frameN;  // exact frame index
      
      replayButtonInstrP.setAutoDraw(true);
    }

    
    // *backgroundInstrP* updates
    if ((showInstructionP) && backgroundInstrP.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      backgroundInstrP.tStart = t;  // (not accounting for frame time here)
      backgroundInstrP.frameNStart = frameN;  // exact frame index
      
      backgroundInstrP.setAutoDraw(true);
    }

    
    // *infoBoxP* updates
    if ((showInstructionP) && infoBoxP.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      infoBoxP.tStart = t;  // (not accounting for frame time here)
      infoBoxP.frameNStart = frameN;  // exact frame index
      
      infoBoxP.setAutoDraw(true);
    }

    
    // *infoButtonInstrP* updates
    if (t >= 0.0 && infoButtonInstrP.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      infoButtonInstrP.tStart = t;  // (not accounting for frame time here)
      infoButtonInstrP.frameNStart = frameN;  // exact frame index
      
      infoButtonInstrP.setAutoDraw(true);
    }

    // start/stop soundInstru
    if (t >= 0.0 && soundInstru.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      soundInstru.tStart = t;  // (not accounting for frame time here)
      soundInstru.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ soundInstru.play(); });  // screen flip
      soundInstru.status = PsychoJS.Status.STARTED;
    }
    if (t >= (soundInstru.getDuration() + soundInstru.tStart)     && soundInstru.status === PsychoJS.Status.STARTED) {
      soundInstru.stop();  // stop the sound (if longer than duration)
      soundInstru.status = PsychoJS.Status.FINISHED;
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
    for (const thisComponent of instruPracticeComponents)
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


function instruPracticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instruPractice' ---
    for (const thisComponent of instruPracticeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    if(!redo){
        vfRedoInstru.finished = true;
    }
    setTimeout(() => {
        redo = false;
    }, 2000);
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('mouseInstrP.x', mouseInstrP.x);
    psychoJS.experiment.addData('mouseInstrP.y', mouseInstrP.y);
    psychoJS.experiment.addData('mouseInstrP.leftButton', mouseInstrP.leftButton);
    psychoJS.experiment.addData('mouseInstrP.midButton', mouseInstrP.midButton);
    psychoJS.experiment.addData('mouseInstrP.rightButton', mouseInstrP.rightButton);
    psychoJS.experiment.addData('mouseInstrP.time', mouseInstrP.time);
    
    soundInstru.stop();  // ensure sound has stopped at end of routine
    // the Routine "instruPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var playSound;
var introPracticeComponents;
function introPracticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'introPractice' ---
    t = 0;
    introPracticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    showInstructionP = false;
    redo = false;
    playSound = true;
    button_down = true;
    txtIntro.text = indicePractice;
    console.log(soundIntro)
    // setup some python lists for storing info about the mouseIntro
    // current position of the mouse:
    mouseIntro.x = [];
    mouseIntro.y = [];
    mouseIntro.leftButton = [];
    mouseIntro.midButton = [];
    mouseIntro.rightButton = [];
    mouseIntro.time = [];
    gotValidClick = false; // until a click is received
    soundIntro = new sound.Sound({
    win: psychoJS.window,
    value: audioInstruP,
    secs: -1,
    });
    soundIntro.setVolume(1.0);
    // keep track of which components have finished
    introPracticeComponents = [];
    introPracticeComponents.push(mouseIntro);
    introPracticeComponents.push(textIntro);
    introPracticeComponents.push(titleIntro);
    introPracticeComponents.push(nextButtonIntro);
    introPracticeComponents.push(replayButtonIntro);
    introPracticeComponents.push(backgroundIntro);
    introPracticeComponents.push(infoBoxIntro);
    introPracticeComponents.push(infoButtonIntro);
    introPracticeComponents.push(soundIntro);
    introPracticeComponents.push(txtIntro);
    
    for (const thisComponent of introPracticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var showInstruction;
function introPracticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'introPractice' ---
    // get current time
    t = introPracticeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Reset buttons if they are not pressed
    if (button_down && !(mouseIntro.getPressed()[0] === 1)){
        button_down = false
    }
    if (infoButtonIntro.contains(mouseIntro) & mouseIntro.getPressed()[0]==1 && !button_down){
        button_down = true
        showInstruction = true;
        infoBoxIntro.text = instructionRemind
        infoBoxIntro.opacity = 1;
        backgroundIntro.opacity = 1;
    }
    if (!infoButtonIntro.contains(mouseIntro)){
        infoBoxIntro.opacity = 0;
        backgroundIntro.opacity = 0;
    }
    if (replayButtonIntro.contains(mouseIntro) && mouseIntro.getPressed()[0]==1 && !button_down){
        console.log('end practice replay', redoPractice)
        button_down = true
        continueRoutine = false;
    }
    if (nextButtonIntro.contains(mouseIntro) && mouseIntro.getPressed()[0]==1 && !button_down){
        redoPractice.thisN = 0
        redoPractice.setNReps(0)
        redoPractice.finished = true
        button_down = true;
        continueRoutine = false;
    }
    if(txtIntro.status == FINISHED){
        redoPractice.finished = true
        redoPractice.thisN = 0
        redoPractice.setNReps(0)
        continueRoutine = false
    }
    
    // *mouseIntro* updates
    if (t >= 0.0 && mouseIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouseIntro.tStart = t;  // (not accounting for frame time here)
      mouseIntro.frameNStart = frameN;  // exact frame index
      
      mouseIntro.status = PsychoJS.Status.STARTED;
      mouseIntro.mouseClock.reset();
      prevButtonState = mouseIntro.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouseIntro.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouseIntro.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          _mouseXYs = mouseIntro.getPos();
          mouseIntro.x.push(_mouseXYs[0]);
          mouseIntro.y.push(_mouseXYs[1]);
          mouseIntro.leftButton.push(_mouseButtons[0]);
          mouseIntro.midButton.push(_mouseButtons[1]);
          mouseIntro.rightButton.push(_mouseButtons[2]);
          mouseIntro.time.push(mouseIntro.mouseClock.getTime());
        }
      }
    }
    
    // *textIntro* updates
    if (t >= 0.0 && textIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textIntro.tStart = t;  // (not accounting for frame time here)
      textIntro.frameNStart = frameN;  // exact frame index
      
      textIntro.setAutoDraw(true);
    }

    
    if (textIntro.status === PsychoJS.Status.STARTED){ // only update if being drawn
      textIntro.setText(hintPractice, false);
    }
    
    // *titleIntro* updates
    if (t >= 0.0 && titleIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      titleIntro.tStart = t;  // (not accounting for frame time here)
      titleIntro.frameNStart = frameN;  // exact frame index
      
      titleIntro.setAutoDraw(true);
    }

    
    if (titleIntro.status === PsychoJS.Status.STARTED){ // only update if being drawn
      titleIntro.setText(title, false);
    }
    
    // *nextButtonIntro* updates
    if (t >= 5.0 && nextButtonIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      nextButtonIntro.tStart = t;  // (not accounting for frame time here)
      nextButtonIntro.frameNStart = frameN;  // exact frame index
      
      nextButtonIntro.setAutoDraw(true);
    }

    
    // *replayButtonIntro* updates
    if (t >= 5 && replayButtonIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      replayButtonIntro.tStart = t;  // (not accounting for frame time here)
      replayButtonIntro.frameNStart = frameN;  // exact frame index
      
      replayButtonIntro.setAutoDraw(true);
    }

    
    // *backgroundIntro* updates
    if ((showInstructionP) && backgroundIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      backgroundIntro.tStart = t;  // (not accounting for frame time here)
      backgroundIntro.frameNStart = frameN;  // exact frame index
      
      backgroundIntro.setAutoDraw(true);
    }

    
    // *infoBoxIntro* updates
    if ((showInstructionP) && infoBoxIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      infoBoxIntro.tStart = t;  // (not accounting for frame time here)
      infoBoxIntro.frameNStart = frameN;  // exact frame index
      
      infoBoxIntro.setAutoDraw(true);
    }

    
    // *infoButtonIntro* updates
    if (t >= 0.0 && infoButtonIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      infoButtonIntro.tStart = t;  // (not accounting for frame time here)
      infoButtonIntro.frameNStart = frameN;  // exact frame index
      
      infoButtonIntro.setAutoDraw(true);
    }

    // start/stop soundIntro
    if ((playSound) && soundIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      soundIntro.tStart = t;  // (not accounting for frame time here)
      soundIntro.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ soundIntro.play(); });  // screen flip
      soundIntro.status = PsychoJS.Status.STARTED;
    }
    if (t >= (soundIntro.getDuration() + soundIntro.tStart)     && soundIntro.status === PsychoJS.Status.STARTED) {
      soundIntro.stop();  // stop the sound (if longer than duration)
      soundIntro.status = PsychoJS.Status.FINISHED;
    }
    
    // *txtIntro* updates
    if (t >= 2.0 && txtIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      txtIntro.tStart = t;  // (not accounting for frame time here)
      txtIntro.frameNStart = frameN;  // exact frame index
      
      txtIntro.setAutoDraw(true);
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
    for (const thisComponent of introPracticeComponents)
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


function introPracticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'introPractice' ---
    for (const thisComponent of introPracticeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('mouseIntro.x', mouseIntro.x);
    psychoJS.experiment.addData('mouseIntro.y', mouseIntro.y);
    psychoJS.experiment.addData('mouseIntro.leftButton', mouseIntro.leftButton);
    psychoJS.experiment.addData('mouseIntro.midButton', mouseIntro.midButton);
    psychoJS.experiment.addData('mouseIntro.rightButton', mouseIntro.rightButton);
    psychoJS.experiment.addData('mouseIntro.time', mouseIntro.time);
    
    soundIntro.stop();  // ensure sound has stopped at end of routine
    // the Routine "introPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var showHint;
var practiceComponents;
function practiceRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'practice' ---
    t = 0;
    practiceClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from codePractice
    if(practiceLoop.thisIndex === 1){
        showHint = 0
        txtPractice.height = 0.06;
    }
    
    txtPractice.text = indicePractice;
    textHint.text = hint1
    button_down = true;
    
    /* BEGIN CUSTOM CODE */
    ;(async () => {
      const store = [];
    
      // Demande d'autorisation pour utiliser le microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
    
      // Configuration de la reconnaissance vocale
      const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      speechRecognition.lang = 'en-EN'; // Langue définie sur le français
      speechRecognition.continuous = true; // Mode continu
    
      // Gestion des résultats de la reconnaissance vocale
      speechRecognition.onresult = (event) => {
        if (event.results.length > 0) {
          const result = event.results[event.results.length - 1];
          if (result.isFinal) {
            wordsPractice.push(result[0].transcript)
            //console.log(result[0].transcript, typeof(result[0].transcript)); // Résultat de la transcription
          }
        }
      };
    
      // Gestion des événements de l'enregistreur
      recorder.onstart = () => {
        store.length = 0;
        speechRecognition.start(); // Démarrage de la reconnaissance vocale
      };
    
      recorder.ondataavailable = ({ data }) => {
        if (data.size > 0) {
          store.push(data);
        }
      };
    
      recorder.onstop = () => {
        speechRecognition.stop(); // Arrêt de la reconnaissance vocale
      };
    
      // Démarrage automatique de l'enregistrement
      recorder.start();
    })();
    /* END */
    
    
    // setup some python lists for storing info about the mousePract
    // current position of the mouse:
    mousePract.x = [];
    mousePract.y = [];
    mousePract.leftButton = [];
    mousePract.midButton = [];
    mousePract.rightButton = [];
    mousePract.time = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    practiceComponents = [];
    practiceComponents.push(mousePract);
    practiceComponents.push(infoBox);
    practiceComponents.push(txtPractice);
    practiceComponents.push(micStartP);
    practiceComponents.push(micStopP);
    practiceComponents.push(imgBackground);
    practiceComponents.push(textboxInstructions);
    practiceComponents.push(infoButton);
    practiceComponents.push(beginButton);
    practiceComponents.push(textHint);
    
    for (const thisComponent of practiceComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var opacityUp;
var frameRemains;
function practiceRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'practice' ---
    // get current time
    t = practiceClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Run 'Each Frame' code from codePractice
    if (button_down && !(mousePract.getPressed()[0] === 1)){
        button_down = false
    }
    if (beginButton.contains(mousePract) && mousePract.getPressed()[0] === 1 && !button_down) {
        continueRoutine = false;
    }
    if (infoButton.contains(mousePract) && mousePract.getPressed()[0]==1 && !button_down){
        showInstruction = true;
        textboxInstructions.text = instructionRemind
        textboxInstructions.opacity = 1;
        imgBackground.opacity = 1;
    }
    if (!infoButton.contains(mousePract)){
        textboxInstructions.opacity = 0;
        imgBackground.opacity = 0;
    }
    if(practiceLoop.thisIndex === 1){
        txtPractice.height = 0.06;
    }
    if(micStartP.status == FINISHED){
        textHint.text = hint2
    }
    if (thisOpacity > 0 && !opacityUp){
        thisOpacity -= 0.005
        if(thisOpacity <= 0){
            opacityUp = true
        }
    }
    if (opacityUp){
        thisOpacity += 0.005
        if(thisOpacity >=1.5){
            opacityUp = false
        }
    }
    // *mousePract* updates
    if (t >= 0 && mousePract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mousePract.tStart = t;  // (not accounting for frame time here)
      mousePract.frameNStart = frameN;  // exact frame index
      
      mousePract.status = PsychoJS.Status.STARTED;
      mousePract.mouseClock.reset();
      prevButtonState = mousePract.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mousePract.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mousePract.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          _mouseXYs = mousePract.getPos();
          mousePract.x.push(_mouseXYs[0]);
          mousePract.y.push(_mouseXYs[1]);
          mousePract.leftButton.push(_mouseButtons[0]);
          mousePract.midButton.push(_mouseButtons[1]);
          mousePract.rightButton.push(_mouseButtons[2]);
          mousePract.time.push(mousePract.mouseClock.getTime());
        }
      }
    }
    
    // *infoBox* updates
    if (t >= 0.0 && infoBox.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      infoBox.tStart = t;  // (not accounting for frame time here)
      infoBox.frameNStart = frameN;  // exact frame index
      
      infoBox.setAutoDraw(true);
    }

    
    // *txtPractice* updates
    if (t >= 2.0 && txtPractice.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      txtPractice.tStart = t;  // (not accounting for frame time here)
      txtPractice.frameNStart = frameN;  // exact frame index
      
      txtPractice.setAutoDraw(true);
    }

    
    if (txtPractice.status === PsychoJS.Status.STARTED){ // only update if being drawn
      txtPractice.setText(title, false);
    }
    
    // *micStartP* updates
    if (t >= 3 && micStartP.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      micStartP.tStart = t;  // (not accounting for frame time here)
      micStartP.frameNStart = frameN;  // exact frame index
      
      micStartP.setAutoDraw(true);
    }

    frameRemains = 3 + 17 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (micStartP.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      micStartP.setAutoDraw(false);
    }
    
    if (micStartP.status === PsychoJS.Status.STARTED){ // only update if being drawn
      micStartP.setOpacity(thisOpacity, false);
    }
    
    // *micStopP* updates
    if (t >= 20 && micStopP.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      micStopP.tStart = t;  // (not accounting for frame time here)
      micStopP.frameNStart = frameN;  // exact frame index
      
      micStopP.setAutoDraw(true);
    }

    
    // *imgBackground* updates
    if ((showInstruction) && imgBackground.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      imgBackground.tStart = t;  // (not accounting for frame time here)
      imgBackground.frameNStart = frameN;  // exact frame index
      
      imgBackground.setAutoDraw(true);
    }

    
    // *textboxInstructions* updates
    if ((showInstruction) && textboxInstructions.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textboxInstructions.tStart = t;  // (not accounting for frame time here)
      textboxInstructions.frameNStart = frameN;  // exact frame index
      
      textboxInstructions.setAutoDraw(true);
    }

    
    // *infoButton* updates
    if (t >= 0.0 && infoButton.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      infoButton.tStart = t;  // (not accounting for frame time here)
      infoButton.frameNStart = frameN;  // exact frame index
      
      infoButton.setAutoDraw(true);
    }

    
    // *beginButton* updates
    if (t >= 20 && beginButton.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      beginButton.tStart = t;  // (not accounting for frame time here)
      beginButton.frameNStart = frameN;  // exact frame index
      
      beginButton.setAutoDraw(true);
    }

    
    // *textHint* updates
    if (t >= 2 && textHint.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textHint.tStart = t;  // (not accounting for frame time here)
      textHint.frameNStart = frameN;  // exact frame index
      
      textHint.setAutoDraw(true);
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
    for (const thisComponent of practiceComponents)
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


var wordsPracticeFinal;
function practiceRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'practice' ---
    for (const thisComponent of practiceComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    var allCorrect = true
    // Filtrer pour enlever les chaînes vides
    var wordsPracticeFinal = wordsPractice.filter(element => element !== "");
    wordsPracticeFinal = wordsPracticeFinal.map(element => element.replace(/\s/g, ''));
    wordsPracticeFinal.forEach(element => {
        console.log(element.charAt(0))
        if (element.charAt(0).toLowerCase() === 'z') {
            console.log(`${element} commence par Z.`);
        } else {
            console.log(`${element} ne commence pas par Z.`);
            allCorrect = false
        }
    });
    if (allCorrect){
        scorePractice +=1
        console.log(scorePractice)
    }
    
    
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('mousePract.x', mousePract.x);
    psychoJS.experiment.addData('mousePract.y', mousePract.y);
    psychoJS.experiment.addData('mousePract.leftButton', mousePract.leftButton);
    psychoJS.experiment.addData('mousePract.midButton', mousePract.midButton);
    psychoJS.experiment.addData('mousePract.rightButton', mousePract.rightButton);
    psychoJS.experiment.addData('mousePract.time', mousePract.time);
    
    // the Routine "practice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var trialComponents;
function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from codeTrial
    button_down = true
    console.log('thisIndex', trialLoop.thisIndex)
    if(trialLoop.thisIndex >= 3){
        txtTrial.height = 0.06;
    }
    
    
    // setup some python lists for storing info about the mouseTrial
    // current position of the mouse:
    mouseTrial.x = [];
    mouseTrial.y = [];
    mouseTrial.leftButton = [];
    mouseTrial.midButton = [];
    mouseTrial.rightButton = [];
    mouseTrial.time = [];
    gotValidClick = false; // until a click is received
    audioTrial = new sound.Sound({
    win: psychoJS.window,
    value: audioPrompt,
    secs: 8,
    });
    audioTrial.secs=8;
    audioTrial.setVolume(1.0);
    txtTrial.setText(prompt);
    txtRemind.setText(reminderTrial);
    textNext.setText(nextStep);
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(mouseTrial);
    trialComponents.push(blackBackgroundTrial);
    trialComponents.push(micTrial);
    trialComponents.push(audioTrial);
    trialComponents.push(txtTrial);
    trialComponents.push(txtRemind);
    trialComponents.push(micStart);
    trialComponents.push(micStop);
    trialComponents.push(nextButtonTrial);
    trialComponents.push(textNext);
    
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var opacityUpTrial;
function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // Reset buttons if they are not pressed
    if (button_down && !(mouseTrial.getPressed()[0] === 1)){
        button_down = false
    }
    if (nextButtonTrial.contains(mouseTrial) && mouseTrial.getPressed()[0]==1 && !button_down){
        console.log('next')
        button_down = true;
        continueRoutine = false;
    }
    if (thisOpacityTrial > 0 && !opacityUpTrial){
        thisOpacityTrial -= 0.005
        if(thisOpacityTrial <= 0){
            opacityUpTrial = true
        }
    }
    if (opacityUpTrial){
        thisOpacityTrial += 0.005
        if(thisOpacityTrial >=1.5){
            opacityUpTrial = false
        }
    }
    // *mouseTrial* updates
    if (t >= 0.0 && mouseTrial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouseTrial.tStart = t;  // (not accounting for frame time here)
      mouseTrial.frameNStart = frameN;  // exact frame index
      
      mouseTrial.status = PsychoJS.Status.STARTED;
      mouseTrial.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    if (mouseTrial.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouseTrial.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          _mouseXYs = mouseTrial.getPos();
          mouseTrial.x.push(_mouseXYs[0]);
          mouseTrial.y.push(_mouseXYs[1]);
          mouseTrial.leftButton.push(_mouseButtons[0]);
          mouseTrial.midButton.push(_mouseButtons[1]);
          mouseTrial.rightButton.push(_mouseButtons[2]);
          mouseTrial.time.push(mouseTrial.mouseClock.getTime());
        }
      }
    }
    
    // *blackBackgroundTrial* updates
    if (t >= 0.0 && blackBackgroundTrial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blackBackgroundTrial.tStart = t;  // (not accounting for frame time here)
      blackBackgroundTrial.frameNStart = frameN;  // exact frame index
      
      blackBackgroundTrial.setAutoDraw(true);
    }

    if (t >= 0.0 && micTrial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      micTrial.tStart = t;  // (not accounting for frame time here)
      micTrial.frameNStart = frameN;  // exact frame index
      
      await micTrial.start();
    }
    frameRemains = 0.0 + 66 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (micTrial.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      micTrial.pause();
    }
    // start/stop audioTrial
    if (t >= 0.0 && audioTrial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      audioTrial.tStart = t;  // (not accounting for frame time here)
      audioTrial.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ audioTrial.play(); });  // screen flip
      audioTrial.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 0.0 + 8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (audioTrial.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (8 > 0.5) {
        audioTrial.stop();  // stop the sound (if longer than duration)
      }
      audioTrial.status = PsychoJS.Status.FINISHED;
    }
    
    // *txtTrial* updates
    if (t >= 2.0 && txtTrial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      txtTrial.tStart = t;  // (not accounting for frame time here)
      txtTrial.frameNStart = frameN;  // exact frame index
      
      txtTrial.setAutoDraw(true);
    }

    frameRemains = 2.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (txtTrial.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      txtTrial.setAutoDraw(false);
    }
    
    // *txtRemind* updates
    if (t >= 32.0 && txtRemind.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      txtRemind.tStart = t;  // (not accounting for frame time here)
      txtRemind.frameNStart = frameN;  // exact frame index
      
      txtRemind.setAutoDraw(true);
    }

    frameRemains = 32.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (txtRemind.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      txtRemind.setAutoDraw(false);
    }
    
    // *micStart* updates
    if (t >= 3 && micStart.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      micStart.tStart = t;  // (not accounting for frame time here)
      micStart.frameNStart = frameN;  // exact frame index
      
      micStart.setAutoDraw(true);
    }

    frameRemains = 3 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (micStart.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      micStart.setAutoDraw(false);
    }
    
    if (micStart.status === PsychoJS.Status.STARTED){ // only update if being drawn
      micStart.setOpacity(thisOpacityTrial, false);
    }
    
    // *micStop* updates
    if (t >= 63 && micStop.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      micStop.tStart = t;  // (not accounting for frame time here)
      micStop.frameNStart = frameN;  // exact frame index
      
      micStop.setAutoDraw(true);
    }

    
    // *nextButtonTrial* updates
    if (t >= 63 && nextButtonTrial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      nextButtonTrial.tStart = t;  // (not accounting for frame time here)
      nextButtonTrial.frameNStart = frameN;  // exact frame index
      
      nextButtonTrial.setAutoDraw(true);
    }

    
    // *textNext* updates
    if (t >= 63 && textNext.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textNext.tStart = t;  // (not accounting for frame time here)
      textNext.frameNStart = frameN;  // exact frame index
      
      textNext.setAutoDraw(true);
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


var showReminder;
var thisFilename;
function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    for (const thisComponent of trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    trialBlock += 1;
    if (trialBlock === 4) {
        showReminder = 1;
        console.log(trialBlock, showReminder)
    } else {
        showReminder = 0;
        console.log(trialBlock, showReminder)
    }
    console.log('trialBlock',trialBlock)
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('mouseTrial.x', mouseTrial.x);
    psychoJS.experiment.addData('mouseTrial.y', mouseTrial.y);
    psychoJS.experiment.addData('mouseTrial.leftButton', mouseTrial.leftButton);
    psychoJS.experiment.addData('mouseTrial.midButton', mouseTrial.midButton);
    psychoJS.experiment.addData('mouseTrial.rightButton', mouseTrial.rightButton);
    psychoJS.experiment.addData('mouseTrial.time', mouseTrial.time);
    
    // stop the microphone (make the audio data ready for upload)
    await micTrial.stop();
    // construct a filename for this recording
    thisFilename = 'recording_micTrial_' + currentLoop.name + '_' + currentLoop.thisN
    // get the recording
    micTrial.lastClip = await micTrial.getRecording({
      tag: thisFilename + '_' + util.MonotonicClock.getDateStr(),
      flush: false
    });
    psychoJS.experiment.addData('micTrial.clip', thisFilename);
    // start the asynchronous upload to the server
    micTrial.lastClip.upload();
    audioTrial.stop();  // ensure sound has stopped at end of routine
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var endTrialComponents;
function endTrialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'endTrial' ---
    t = 0;
    endTrialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(5.000000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from codeEndTrial
    textEndTrial.text = endInstru;
    
    // keep track of which components have finished
    endTrialComponents = [];
    endTrialComponents.push(blackBackgroundEnd);
    endTrialComponents.push(textEndTrial);
    
    for (const thisComponent of endTrialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function endTrialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'endTrial' ---
    // get current time
    t = endTrialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *blackBackgroundEnd* updates
    if (t >= 0.0 && blackBackgroundEnd.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      blackBackgroundEnd.tStart = t;  // (not accounting for frame time here)
      blackBackgroundEnd.frameNStart = frameN;  // exact frame index
      
      blackBackgroundEnd.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (blackBackgroundEnd.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      blackBackgroundEnd.setAutoDraw(false);
    }
    
    // *textEndTrial* updates
    if (t >= 0.0 && textEndTrial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textEndTrial.tStart = t;  // (not accounting for frame time here)
      textEndTrial.frameNStart = frameN;  // exact frame index
      
      textEndTrial.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (textEndTrial.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      textEndTrial.setAutoDraw(false);
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
    for (const thisComponent of endTrialComponents)
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


function endTrialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'endTrial' ---
    for (const thisComponent of endTrialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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
