#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2022.2.5),
    on February 04, 2024, at 20:22
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

import psychopy
psychopy.useVersion('2022.2.5')


# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
prefs.hardware['audioLib'] = 'ptb'
prefs.hardware['audioLatencyMode'] = '3'
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from codeLang
# Before Experiment:
def buttonSelector(selectedButton):
    selectedButton.fillColor = [-0.92, -0.24, -0.29] 
    
reminder = None


# Run 'Before Experiment' code from codeInstrP
showInstructionP = False
# Run 'Before Experiment' code from codeTrial
trialBlock = 0
showReminder = 1


# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2022.2.5'
expName = 'verbal-fluency'  # from the Builder filename that created this script
expInfo = {
    'participant': f"{randint(0, 999999):06.0f}",
    'session': '001',
}
# --- Show participant info dialog --
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath="C:\\Users\\caron\\OneDrive\\Documents\\Douglas\\Katie's task\\cognitiveBattery\\VERBAL_FLUENCY\\MyProject\\Foca\\new_format_practice\\verbal-fluency\\verbal-fluency_lastrun.py",
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation
# Make folder to store recordings from micTrial
micTrialRecFolder = filename + '_micTrial_recorded'
if not os.path.isdir(micTrialRecFolder):
    os.mkdir(micTrialRecFolder)

# --- Setup the Window ---
win = visual.Window(
    size=[1536, 864], fullscr=True, screen=0, 
    winType='pyglet', allowStencil=False,
    monitor='testMonitor', color='white', colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
win.mouseVisible = False
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# --- Setup input devices ---
ioConfig = {}

# Setup iohub keyboard
ioConfig['Keyboard'] = dict(use_keymap='psychopy')

ioSession = '1'
if 'session' in expInfo:
    ioSession = str(expInfo['session'])
ioServer = io.launchHubServer(window=win, **ioConfig)
eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='iohub')

# --- Initialize components for Routine "lang" ---
enButton = visual.ButtonStim(win, 
    text='ENGLISH', font='Arial',
    pos=(0, 0.02),
    letterHeight=0.035,
    size=(0.3, 0.1), borderWidth=2.0,
    fillColor='whitesmoke', borderColor='darkcyan',
    color='darkcyan', colorSpace='rgb',
    opacity=1.0,
    bold=True, italic=False,
    padding=None,
    anchor='center',
    name='enButton'
)
enButton.buttonClock = core.Clock()
frButton = visual.ButtonStim(win, 
    text='FRANÇAIS', font='Arial',
    pos=(0, -0.1),
    letterHeight=0.035,
    size=(0.3, 0.1), borderWidth=2.0,
    fillColor='whitesmoke', borderColor='darkcyan',
    color='darkcyan', colorSpace='rgb',
    opacity=1.0,
    bold=True, italic=False,
    padding=None,
    anchor='center',
    name='frButton'
)
frButton.buttonClock = core.Clock()
mouse = event.Mouse(win=win)
x, y = [None, None]
mouse.mouseClock = core.Clock()

# --- Initialize components for Routine "instruPractice" ---
mouseInstrP = event.Mouse(win=win)
x, y = [None, None]
mouseInstrP.mouseClock = core.Clock()
titleInstrP = visual.TextStim(win=win, name='titleInstrP',
    text='',
    font='Arial',
    pos=(0, 0.4), height=0.05, wrapWidth=None, ori=0.0, 
    color=[-0.92, -0.24, -0.29], colorSpace='rgb', opacity=1.0, 
    languageStyle='LTR',
    depth=-2.0);
txtInstrP = visual.TextStim(win=win, name='txtInstrP',
    text=None,
    font='Arial',
    pos=(0, 0), height=0.05, wrapWidth=1.7, ori=0.0, 
    color=[-0.92, -0.24, -0.29], colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-3.0);
nextButton = visual.ImageStim(
    win=win,
    name='nextButton', 
    image='stimuli/images/next.png', mask=None, anchor='center',
    ori=0.0, pos=(0.75, -0.35), size=(0.1, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
replayButtonInstrP = visual.ImageStim(
    win=win,
    name='replayButtonInstrP', 
    image='stimuli/images/replay.png', mask=None, anchor='center',
    ori=0.0, pos=(0, -0.35), size=(0.1, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
backgroundInstrP = visual.Rect(
    win=win, name='backgroundInstrP',
    width=(2, 1)[0], height=(2, 1)[1],
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor='black', fillColor='black',
    opacity=None, depth=-6.0, interpolate=True)
infoBoxP = visual.TextBox2(
     win, text=None, font='Arial',
     pos=(0, 0),     letterHeight=0.03,
     size=(1.3, 0.8), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=0.1, alignment='center',
     anchor='center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='infoBoxP',
     autoLog=True,
)
infoButtonInstrP = visual.ImageStim(
    win=win,
    name='infoButtonInstrP', 
    image='stimuli/images/info.png', mask=None, anchor='center',
    ori=0.0, pos=(-0.75, -0.35), size=(0.1, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-8.0)

# --- Initialize components for Routine "endPractice" ---
mouseEndPractice = event.Mouse(win=win)
x, y = [None, None]
mouseEndPractice.mouseClock = core.Clock()
textEndPractice = visual.TextStim(win=win, name='textEndPractice',
    text=None,
    font='Arial',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color=[-0.92, -0.24, -0.29], colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
nextExButton = visual.ImageStim(
    win=win,
    name='nextExButton', 
    image='stimuli/images/next.png', mask=None, anchor='center',
    ori=0.0, pos=(0.75, -0.35), size=(0.1, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
backgroundEndP = visual.Rect(
    win=win, name='backgroundEndP',
    width=(2, 1)[0], height=(2, 1)[1],
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor='black', fillColor='black',
    opacity=None, depth=-4.0, interpolate=True)
infoBoxEnd = visual.TextBox2(
     win, text=None, font='Arial',
     pos=(0, 0),     letterHeight=0.03,
     size=(1.3, 0.8), borderWidth=2.0,
     color='black', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0,
     padding=0.1, alignment='center',
     anchor='center',
     fillColor='white', borderColor=None,
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='infoBoxEnd',
     autoLog=True,
)
infoEnd = visual.ImageStim(
    win=win,
    name='infoEnd', 
    image='stimuli/images/info.png', mask=None, anchor='center',
    ori=0.0, pos=(-0.75, -0.35), size=(0.1, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)

# --- Initialize components for Routine "instructions" ---
blackBackground = visual.Rect(
    win=win, name='blackBackground',
    width=(4, 4)[0], height=(4, 4)[1],
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor='black', fillColor='black',
    opacity=1.0, depth=-1.0, interpolate=True)
mouseInstr = event.Mouse(win=win)
x, y = [None, None]
mouseInstr.mouseClock = core.Clock()
keyInstr = keyboard.Keyboard()
textInstr = visual.TextStim(win=win, name='textInstr',
    text=None,
    font='Arial',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
textPressInstru = visual.TextStim(win=win, name='textPressInstru',
    text='',
    font='Arial',
    pos=(0.575, -0.35), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);
nextButtonRemind = visual.ImageStim(
    win=win,
    name='nextButtonRemind', 
    image='stimuli/images/next.png', mask=None, anchor='center',
    ori=0.0, pos=(0.75, -0.35), size=(0.1, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)

# --- Initialize components for Routine "trial" ---
blackBackgroundTrial = visual.Rect(
    win=win, name='blackBackgroundTrial',
    width=(4, 4)[0], height=(4, 4)[1],
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor='black', fillColor='black',
    opacity=1.0, depth=-1.0, interpolate=True)
micTrial = sound.microphone.Microphone(
    device=None, channels=None, 
    sampleRateHz=48000, maxRecordingSize=24000.0
)
audioTrial = sound.Sound('A', secs=-1, stereo=True, hamming=True,
    name='audioTrial')
audioTrial.setVolume(1.0)
txtTrial = visual.TextStim(win=win, name='txtTrial',
    text='',
    font='Arial',
    pos=(0, 0.35), height=0.1, wrapWidth=None, ori=0.0, 
    color=[-0.92, -0.24, -0.29], colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-4.0);
txtRemind = visual.TextStim(win=win, name='txtRemind',
    text='',
    font='Arial',
    pos=(0, 0.35), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-5.0);
micStart = visual.ImageStim(
    win=win,
    name='micStart', 
    image='stimuli/images/mic_start.png', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(0.5, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)
micStop = visual.ImageStim(
    win=win,
    name='micStop', 
    image='stimuli/images/mic_stop.png', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(0.5, 0.5),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)

# --- Initialize components for Routine "endTrial" ---
blackBackgroundEnd = visual.Rect(
    win=win, name='blackBackgroundEnd',
    width=(4, 4)[0], height=(4, 4)[1],
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor='black', fillColor='black',
    opacity=1.0, depth=-1.0, interpolate=True)
textEndTrial = visual.TextStim(win=win, name='textEndTrial',
    text=None,
    font='Arial',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine 

# --- Prepare to start Routine "lang" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
# Run 'Begin Routine' code from codeLang
endRoutineLang=False
clickTime = None
# setup some python lists for storing info about the mouse
mouse.x = []
mouse.y = []
mouse.leftButton = []
mouse.midButton = []
mouse.rightButton = []
mouse.time = []
mouse.clicked_name = []
gotValidClick = False  # until a click is received
# keep track of which components have finished
langComponents = [enButton, frButton, mouse]
for thisComponent in langComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "lang" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    # Run 'Each Frame' code from codeLang
    # Quand un bouton est cliqué
    if endRoutineLang and clickTime is None:
        clickTime = globalClock.getTime()  # Enregistrez le temps de clic
    
    if enButton.contains(mouse) & mouse.getPressed()[0]==1:
        buttonSelector(enButton)
    else:
        enButton.fillColor = 'whitesmoke'
        enButton.color = 'darkcyan'
        enButton.borderColor = 'darkcyan'
    enButton.draw()
    
    if frButton.contains(mouse) & mouse.getPressed()[0]==1:
        frButton.fillColor = 'darkcyan'
        frButton.color = 'black'
        frButton.borderColor = 'whitesmoke'
    else:
        frButton.fillColor = 'whitesmoke'
        frButton.color = 'darkcyan'
        frButton.borderColor = 'darkcyan'
    frButton.draw()  
    
    
    # Vérifiez si 5 secondes se sont écoulées depuis le clic
    if clickTime is not None and globalClock.getTime() - clickTime >= 0.5:
        continueRoutine = False
    
    
    
    # *enButton* updates
    if enButton.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
        # keep track of start time/frame for later
        enButton.frameNStart = frameN  # exact frame index
        enButton.tStart = t  # local t and not account for scr refresh
        enButton.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(enButton, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'enButton.started')
        enButton.setAutoDraw(True)
    if enButton.status == STARTED:
        # check whether enButton has been pressed
        if enButton.isClicked:
            if not enButton.wasClicked:
                enButton.timesOn.append(enButton.buttonClock.getTime()) # store time of first click
                enButton.timesOff.append(enButton.buttonClock.getTime()) # store time clicked until
            else:
                enButton.timesOff[-1] = enButton.buttonClock.getTime() # update time clicked until
            if not enButton.wasClicked:
                conditionsInstrPCSV = "conditions/fluency-instructions-en.csv"
                conditionsPracticeCSV = "conditions/fluency-practices-en.csv"
                conditionsCSV="conditions/fluency-trials-en.csv"
                beginButtonTxt="BEGIN"
                endTxt="Thank you. Please wait while the task completes."
                endWAV="stimuli/audio/end-en.wav"
                endRoutineLang=True
            enButton.wasClicked = True  # if enButton is still clicked next frame, it is not a new click
        else:
            enButton.wasClicked = False  # if enButton is clicked next frame, it is a new click
    else:
        enButton.wasClicked = False  # if enButton is clicked next frame, it is a new click
    
    # *frButton* updates
    if frButton.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
        # keep track of start time/frame for later
        frButton.frameNStart = frameN  # exact frame index
        frButton.tStart = t  # local t and not account for scr refresh
        frButton.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(frButton, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'frButton.started')
        frButton.setAutoDraw(True)
    if frButton.status == STARTED:
        # check whether frButton has been pressed
        if frButton.isClicked:
            if not frButton.wasClicked:
                frButton.timesOn.append(frButton.buttonClock.getTime()) # store time of first click
                frButton.timesOff.append(frButton.buttonClock.getTime()) # store time clicked until
            else:
                frButton.timesOff[-1] = frButton.buttonClock.getTime() # update time clicked until
            if not frButton.wasClicked:
                conditionsInstrPCSV = "conditions/fluency-instructions-fr.csv"
                conditionsPracticeCSV="conditions/fluency-practices-fr.csv" 
                conditionsCSV="conditions/fluency-trials-fr.csv"
                beginButtonTxt="DÉBUTER"
                endTxt="Merci. Veuillez patientez pendant que la tâche se termine."
                endWAV="stimuli/audio/end-fr.wav"
                endRoutineLang=True
            frButton.wasClicked = True  # if frButton is still clicked next frame, it is not a new click
        else:
            frButton.wasClicked = False  # if frButton is clicked next frame, it is a new click
    else:
        frButton.wasClicked = False  # if frButton is clicked next frame, it is a new click
    # *mouse* updates
    if mouse.status == NOT_STARTED and t >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        mouse.frameNStart = frameN  # exact frame index
        mouse.tStart = t  # local t and not account for scr refresh
        mouse.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(mouse, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.addData('mouse.started', t)
        mouse.status = STARTED
        mouse.mouseClock.reset()
        prevButtonState = mouse.getPressed()  # if button is down already this ISN'T a new click
    if mouse.status == STARTED:  # only update if started and not finished!
        buttons = mouse.getPressed()
        if buttons != prevButtonState:  # button state changed?
            prevButtonState = buttons
            if sum(buttons) > 0:  # state changed to a new click
                # check if the mouse was inside our 'clickable' objects
                gotValidClick = False
                try:
                    iter([enButton, frButton])
                    clickableList = [enButton, frButton]
                except:
                    clickableList = [[enButton, frButton]]
                for obj in clickableList:
                    if obj.contains(mouse):
                        gotValidClick = True
                        mouse.clicked_name.append(obj.name)
                x, y = mouse.getPos()
                mouse.x.append(x)
                mouse.y.append(y)
                buttons = mouse.getPressed()
                mouse.leftButton.append(buttons[0])
                mouse.midButton.append(buttons[1])
                mouse.rightButton.append(buttons[2])
                mouse.time.append(mouse.mouseClock.getTime())
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in langComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "lang" ---
for thisComponent in langComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('enButton.numClicks', enButton.numClicks)
if enButton.numClicks:
   thisExp.addData('enButton.timesOn', enButton.timesOn)
   thisExp.addData('enButton.timesOff', enButton.timesOff)
else:
   thisExp.addData('enButton.timesOn', "")
   thisExp.addData('enButton.timesOff', "")
thisExp.addData('frButton.numClicks', frButton.numClicks)
if frButton.numClicks:
   thisExp.addData('frButton.timesOn', frButton.timesOn)
   thisExp.addData('frButton.timesOff', frButton.timesOff)
else:
   thisExp.addData('frButton.timesOn', "")
   thisExp.addData('frButton.timesOff', "")
# store data for thisExp (ExperimentHandler)
thisExp.addData('mouse.x', mouse.x)
thisExp.addData('mouse.y', mouse.y)
thisExp.addData('mouse.leftButton', mouse.leftButton)
thisExp.addData('mouse.midButton', mouse.midButton)
thisExp.addData('mouse.rightButton', mouse.rightButton)
thisExp.addData('mouse.time', mouse.time)
thisExp.addData('mouse.clicked_name', mouse.clicked_name)
thisExp.nextEntry()
# the Routine "lang" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
vfRedoInstru = data.TrialHandler(nReps=99.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions(conditionsInstrPCSV),
    seed=None, name='vfRedoInstru')
thisExp.addLoop(vfRedoInstru)  # add the loop to the experiment
thisVfRedoInstru = vfRedoInstru.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisVfRedoInstru.rgb)
if thisVfRedoInstru != None:
    for paramName in thisVfRedoInstru:
        exec('{} = thisVfRedoInstru[paramName]'.format(paramName))

for thisVfRedoInstru in vfRedoInstru:
    currentLoop = vfRedoInstru
    # abbreviate parameter names if possible (e.g. rgb = thisVfRedoInstru.rgb)
    if thisVfRedoInstru != None:
        for paramName in thisVfRedoInstru:
            exec('{} = thisVfRedoInstru[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "instruPractice" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from codeInstrP
    txtInstrP.text = instructionVideo
    titleInstrP.text = title
    # setup some python lists for storing info about the mouseInstrP
    mouseInstrP.x = []
    mouseInstrP.y = []
    mouseInstrP.leftButton = []
    mouseInstrP.midButton = []
    mouseInstrP.rightButton = []
    mouseInstrP.time = []
    mouseInstrP.clicked_name = []
    gotValidClick = False  # until a click is received
    infoBoxP.reset()
    # keep track of which components have finished
    instruPracticeComponents = [mouseInstrP, titleInstrP, txtInstrP, nextButton, replayButtonInstrP, backgroundInstrP, infoBoxP, infoButtonInstrP]
    for thisComponent in instruPracticeComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "instruPractice" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        # Run 'Each Frame' code from codeInstrP
        #click next after instructions
        if nextButton.contains(mouseInstrP) & mouseInstrP.getPressed()[0]==1:
            continueRoutine=False
            
        if (infoButtonInstrP.contains(mouseInstrP) & mouseInstrP.getPressed()[0]==1):
            showInstructionP = True;
            infoBoxP.text = instructionPractice
            infoBoxP.opacity = 1;
            backgroundInstrP.opacity = 1;
        
        if (not infoButton.contains(mouseInstrP)):
            infoBoxP.opacity = 0;
            backgroundInstrP.opacity = 0;
        
        # *mouseInstrP* updates
        if mouseInstrP.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            mouseInstrP.frameNStart = frameN  # exact frame index
            mouseInstrP.tStart = t  # local t and not account for scr refresh
            mouseInstrP.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(mouseInstrP, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.addData('mouseInstrP.started', t)
            mouseInstrP.status = STARTED
            mouseInstrP.mouseClock.reset()
            prevButtonState = mouseInstrP.getPressed()  # if button is down already this ISN'T a new click
        if mouseInstrP.status == STARTED:  # only update if started and not finished!
            buttons = mouseInstrP.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    try:
                        iter(nextButton)
                        clickableList = nextButton
                    except:
                        clickableList = [nextButton]
                    for obj in clickableList:
                        if obj.contains(mouseInstrP):
                            gotValidClick = True
                            mouseInstrP.clicked_name.append(obj.name)
                    x, y = mouseInstrP.getPos()
                    mouseInstrP.x.append(x)
                    mouseInstrP.y.append(y)
                    buttons = mouseInstrP.getPressed()
                    mouseInstrP.leftButton.append(buttons[0])
                    mouseInstrP.midButton.append(buttons[1])
                    mouseInstrP.rightButton.append(buttons[2])
                    mouseInstrP.time.append(mouseInstrP.mouseClock.getTime())
                    if gotValidClick:
                        continueRoutine = False  # abort routine on response
        
        # *titleInstrP* updates
        if titleInstrP.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            titleInstrP.frameNStart = frameN  # exact frame index
            titleInstrP.tStart = t  # local t and not account for scr refresh
            titleInstrP.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(titleInstrP, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'titleInstrP.started')
            titleInstrP.setAutoDraw(True)
        if titleInstrP.status == STARTED:  # only update if drawing
            titleInstrP.setText(title, log=False)
        
        # *txtInstrP* updates
        if txtInstrP.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            txtInstrP.frameNStart = frameN  # exact frame index
            txtInstrP.tStart = t  # local t and not account for scr refresh
            txtInstrP.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(txtInstrP, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'txtInstrP.started')
            txtInstrP.setAutoDraw(True)
        
        # *nextButton* updates
        if nextButton.status == NOT_STARTED and tThisFlip >= 5.0-frameTolerance:
            # keep track of start time/frame for later
            nextButton.frameNStart = frameN  # exact frame index
            nextButton.tStart = t  # local t and not account for scr refresh
            nextButton.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(nextButton, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'nextButton.started')
            nextButton.setAutoDraw(True)
        
        # *replayButtonInstrP* updates
        if replayButtonInstrP.status == NOT_STARTED and tThisFlip >= 5-frameTolerance:
            # keep track of start time/frame for later
            replayButtonInstrP.frameNStart = frameN  # exact frame index
            replayButtonInstrP.tStart = t  # local t and not account for scr refresh
            replayButtonInstrP.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(replayButtonInstrP, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'replayButtonInstrP.started')
            replayButtonInstrP.setAutoDraw(True)
        
        # *backgroundInstrP* updates
        if backgroundInstrP.status == NOT_STARTED and showInstructionP:
            # keep track of start time/frame for later
            backgroundInstrP.frameNStart = frameN  # exact frame index
            backgroundInstrP.tStart = t  # local t and not account for scr refresh
            backgroundInstrP.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(backgroundInstrP, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'backgroundInstrP.started')
            backgroundInstrP.setAutoDraw(True)
        
        # *infoBoxP* updates
        if infoBoxP.status == NOT_STARTED and showInstructionP:
            # keep track of start time/frame for later
            infoBoxP.frameNStart = frameN  # exact frame index
            infoBoxP.tStart = t  # local t and not account for scr refresh
            infoBoxP.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(infoBoxP, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'infoBoxP.started')
            infoBoxP.setAutoDraw(True)
        
        # *infoButtonInstrP* updates
        if infoButtonInstrP.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            infoButtonInstrP.frameNStart = frameN  # exact frame index
            infoButtonInstrP.tStart = t  # local t and not account for scr refresh
            infoButtonInstrP.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(infoButtonInstrP, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'infoButtonInstrP.started')
            infoButtonInstrP.setAutoDraw(True)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in instruPracticeComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "instruPractice" ---
    for thisComponent in instruPracticeComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # store data for vfRedoInstru (TrialHandler)
    vfRedoInstru.addData('mouseInstrP.x', mouseInstrP.x)
    vfRedoInstru.addData('mouseInstrP.y', mouseInstrP.y)
    vfRedoInstru.addData('mouseInstrP.leftButton', mouseInstrP.leftButton)
    vfRedoInstru.addData('mouseInstrP.midButton', mouseInstrP.midButton)
    vfRedoInstru.addData('mouseInstrP.rightButton', mouseInstrP.rightButton)
    vfRedoInstru.addData('mouseInstrP.time', mouseInstrP.time)
    vfRedoInstru.addData('mouseInstrP.clicked_name', mouseInstrP.clicked_name)
    # the Routine "instruPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
# completed 99.0 repeats of 'vfRedoInstru'


# set up handler to look after randomisation of conditions etc
endPracticeLoop = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions(conditionsPracticeCSV),
    seed=None, name='endPracticeLoop')
thisExp.addLoop(endPracticeLoop)  # add the loop to the experiment
thisEndPracticeLoop = endPracticeLoop.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisEndPracticeLoop.rgb)
if thisEndPracticeLoop != None:
    for paramName in thisEndPracticeLoop:
        exec('{} = thisEndPracticeLoop[paramName]'.format(paramName))

for thisEndPracticeLoop in endPracticeLoop:
    currentLoop = endPracticeLoop
    # abbreviate parameter names if possible (e.g. rgb = thisEndPracticeLoop.rgb)
    if thisEndPracticeLoop != None:
        for paramName in thisEndPracticeLoop:
            exec('{} = thisEndPracticeLoop[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "endPractice" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from codeEndPractice
    textEndPractice.text = instruEndPractice
    # setup some python lists for storing info about the mouseEndPractice
    mouseEndPractice.x = []
    mouseEndPractice.y = []
    mouseEndPractice.leftButton = []
    mouseEndPractice.midButton = []
    mouseEndPractice.rightButton = []
    mouseEndPractice.time = []
    mouseEndPractice.clicked_name = []
    gotValidClick = False  # until a click is received
    infoBoxEnd.reset()
    # keep track of which components have finished
    endPracticeComponents = [mouseEndPractice, textEndPractice, nextExButton, backgroundEndP, infoBoxEnd, infoEnd]
    for thisComponent in endPracticeComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "endPractice" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        # Run 'Each Frame' code from codeEndPractice
        if (infoEnd.contains(mouseEndPractice) & mouseEndPractice.getPressed()[0]==1):
            showInstructionEndP = True;
            infoBoxEnd.text = instructionRemind
            infoBoxEnd.opacity = 1;
            backgroundEndP.opacity = 1;
        
        if (not infoEnd.contains(mouseEndPractice)):
            infoBoxEnd.opacity = 0;
            backgroundEndP.opacity = 0;
        # *mouseEndPractice* updates
        if mouseEndPractice.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            mouseEndPractice.frameNStart = frameN  # exact frame index
            mouseEndPractice.tStart = t  # local t and not account for scr refresh
            mouseEndPractice.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(mouseEndPractice, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.addData('mouseEndPractice.started', t)
            mouseEndPractice.status = STARTED
            mouseEndPractice.mouseClock.reset()
            prevButtonState = mouseEndPractice.getPressed()  # if button is down already this ISN'T a new click
        if mouseEndPractice.status == STARTED:  # only update if started and not finished!
            buttons = mouseEndPractice.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    try:
                        iter(nextExButton)
                        clickableList = nextExButton
                    except:
                        clickableList = [nextExButton]
                    for obj in clickableList:
                        if obj.contains(mouseEndPractice):
                            gotValidClick = True
                            mouseEndPractice.clicked_name.append(obj.name)
                    x, y = mouseEndPractice.getPos()
                    mouseEndPractice.x.append(x)
                    mouseEndPractice.y.append(y)
                    buttons = mouseEndPractice.getPressed()
                    mouseEndPractice.leftButton.append(buttons[0])
                    mouseEndPractice.midButton.append(buttons[1])
                    mouseEndPractice.rightButton.append(buttons[2])
                    mouseEndPractice.time.append(mouseEndPractice.mouseClock.getTime())
                    if gotValidClick:
                        continueRoutine = False  # abort routine on response
        
        # *textEndPractice* updates
        if textEndPractice.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            textEndPractice.frameNStart = frameN  # exact frame index
            textEndPractice.tStart = t  # local t and not account for scr refresh
            textEndPractice.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(textEndPractice, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'textEndPractice.started')
            textEndPractice.setAutoDraw(True)
        
        # *nextExButton* updates
        if nextExButton.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            nextExButton.frameNStart = frameN  # exact frame index
            nextExButton.tStart = t  # local t and not account for scr refresh
            nextExButton.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(nextExButton, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'nextExButton.started')
            nextExButton.setAutoDraw(True)
        
        # *backgroundEndP* updates
        if backgroundEndP.status == NOT_STARTED and showInstructionEndP:
            # keep track of start time/frame for later
            backgroundEndP.frameNStart = frameN  # exact frame index
            backgroundEndP.tStart = t  # local t and not account for scr refresh
            backgroundEndP.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(backgroundEndP, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'backgroundEndP.started')
            backgroundEndP.setAutoDraw(True)
        
        # *infoBoxEnd* updates
        if infoBoxEnd.status == NOT_STARTED and showInstructionEndP:
            # keep track of start time/frame for later
            infoBoxEnd.frameNStart = frameN  # exact frame index
            infoBoxEnd.tStart = t  # local t and not account for scr refresh
            infoBoxEnd.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(infoBoxEnd, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'infoBoxEnd.started')
            infoBoxEnd.setAutoDraw(True)
        
        # *infoEnd* updates
        if infoEnd.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            infoEnd.frameNStart = frameN  # exact frame index
            infoEnd.tStart = t  # local t and not account for scr refresh
            infoEnd.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(infoEnd, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'infoEnd.started')
            infoEnd.setAutoDraw(True)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in endPracticeComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "endPractice" ---
    for thisComponent in endPracticeComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # store data for endPracticeLoop (TrialHandler)
    endPracticeLoop.addData('mouseEndPractice.x', mouseEndPractice.x)
    endPracticeLoop.addData('mouseEndPractice.y', mouseEndPractice.y)
    endPracticeLoop.addData('mouseEndPractice.leftButton', mouseEndPractice.leftButton)
    endPracticeLoop.addData('mouseEndPractice.midButton', mouseEndPractice.midButton)
    endPracticeLoop.addData('mouseEndPractice.rightButton', mouseEndPractice.rightButton)
    endPracticeLoop.addData('mouseEndPractice.time', mouseEndPractice.time)
    endPracticeLoop.addData('mouseEndPractice.clicked_name', mouseEndPractice.clicked_name)
    # the Routine "endPractice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
# completed 1.0 repeats of 'endPracticeLoop'


# set up handler to look after randomisation of conditions etc
trialLoop = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions(conditionsCSV),
    seed=None, name='trialLoop')
thisExp.addLoop(trialLoop)  # add the loop to the experiment
thisTrialLoop = trialLoop.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTrialLoop.rgb)
if thisTrialLoop != None:
    for paramName in thisTrialLoop:
        exec('{} = thisTrialLoop[paramName]'.format(paramName))

for thisTrialLoop in trialLoop:
    currentLoop = trialLoop
    # abbreviate parameter names if possible (e.g. rgb = thisTrialLoop.rgb)
    if thisTrialLoop != None:
        for paramName in thisTrialLoop:
            exec('{} = thisTrialLoop[paramName]'.format(paramName))
    
    # set up handler to look after randomisation of conditions etc
    hideReminder = data.TrialHandler(nReps=showReminder, method='sequential', 
        extraInfo=expInfo, originPath=-1,
        trialList=[None],
        seed=None, name='hideReminder')
    thisExp.addLoop(hideReminder)  # add the loop to the experiment
    thisHideReminder = hideReminder.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisHideReminder.rgb)
    if thisHideReminder != None:
        for paramName in thisHideReminder:
            exec('{} = thisHideReminder[paramName]'.format(paramName))
    
    for thisHideReminder in hideReminder:
        currentLoop = hideReminder
        # abbreviate parameter names if possible (e.g. rgb = thisHideReminder.rgb)
        if thisHideReminder != None:
            for paramName in thisHideReminder:
                exec('{} = thisHideReminder[paramName]'.format(paramName))
        
        # --- Prepare to start Routine "instructions" ---
        continueRoutine = True
        routineForceEnded = False
        # update component parameters for each repeat
        # Run 'Begin Routine' code from codeInstr
        trialBlock += 1
        textInstr.text = instructionTrial
        win.color = 'black'
        
        
            
        
        # setup some python lists for storing info about the mouseInstr
        mouseInstr.x = []
        mouseInstr.y = []
        mouseInstr.leftButton = []
        mouseInstr.midButton = []
        mouseInstr.rightButton = []
        mouseInstr.time = []
        mouseInstr.clicked_name = []
        gotValidClick = False  # until a click is received
        keyInstr.keys = []
        keyInstr.rt = []
        _keyInstr_allKeys = []
        # keep track of which components have finished
        instructionsComponents = [blackBackground, mouseInstr, keyInstr, textInstr, textPressInstru, nextButtonRemind]
        for thisComponent in instructionsComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "instructions" ---
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *blackBackground* updates
            if blackBackground.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                blackBackground.frameNStart = frameN  # exact frame index
                blackBackground.tStart = t  # local t and not account for scr refresh
                blackBackground.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(blackBackground, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'blackBackground.started')
                blackBackground.setAutoDraw(True)
            # *mouseInstr* updates
            if mouseInstr.status == NOT_STARTED and t >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                mouseInstr.frameNStart = frameN  # exact frame index
                mouseInstr.tStart = t  # local t and not account for scr refresh
                mouseInstr.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(mouseInstr, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.addData('mouseInstr.started', t)
                mouseInstr.status = STARTED
                mouseInstr.mouseClock.reset()
                prevButtonState = mouseInstr.getPressed()  # if button is down already this ISN'T a new click
            if mouseInstr.status == STARTED:  # only update if started and not finished!
                buttons = mouseInstr.getPressed()
                if buttons != prevButtonState:  # button state changed?
                    prevButtonState = buttons
                    if sum(buttons) > 0:  # state changed to a new click
                        # check if the mouse was inside our 'clickable' objects
                        gotValidClick = False
                        try:
                            iter(nextButtonRemind)
                            clickableList = nextButtonRemind
                        except:
                            clickableList = [nextButtonRemind]
                        for obj in clickableList:
                            if obj.contains(mouseInstr):
                                gotValidClick = True
                                mouseInstr.clicked_name.append(obj.name)
                        x, y = mouseInstr.getPos()
                        mouseInstr.x.append(x)
                        mouseInstr.y.append(y)
                        buttons = mouseInstr.getPressed()
                        mouseInstr.leftButton.append(buttons[0])
                        mouseInstr.midButton.append(buttons[1])
                        mouseInstr.rightButton.append(buttons[2])
                        mouseInstr.time.append(mouseInstr.mouseClock.getTime())
                        if gotValidClick:
                            continueRoutine = False  # abort routine on response
            
            # *keyInstr* updates
            waitOnFlip = False
            if keyInstr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                keyInstr.frameNStart = frameN  # exact frame index
                keyInstr.tStart = t  # local t and not account for scr refresh
                keyInstr.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(keyInstr, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'keyInstr.started')
                keyInstr.status = STARTED
                # keyboard checking is just starting
                waitOnFlip = True
                win.callOnFlip(keyInstr.clock.reset)  # t=0 on next screen flip
                win.callOnFlip(keyInstr.clearEvents, eventType='keyboard')  # clear events on next screen flip
            if keyInstr.status == STARTED and not waitOnFlip:
                theseKeys = keyInstr.getKeys(keyList=['space'], waitRelease=False)
                _keyInstr_allKeys.extend(theseKeys)
                if len(_keyInstr_allKeys):
                    keyInstr.keys = _keyInstr_allKeys[-1].name  # just the last key pressed
                    keyInstr.rt = _keyInstr_allKeys[-1].rt
                    # a response ends the routine
                    continueRoutine = False
            
            # *textInstr* updates
            if textInstr.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                textInstr.frameNStart = frameN  # exact frame index
                textInstr.tStart = t  # local t and not account for scr refresh
                textInstr.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(textInstr, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'textInstr.started')
                textInstr.setAutoDraw(True)
            
            # *textPressInstru* updates
            if textPressInstru.status == NOT_STARTED and tThisFlip >= 5-frameTolerance:
                # keep track of start time/frame for later
                textPressInstru.frameNStart = frameN  # exact frame index
                textPressInstru.tStart = t  # local t and not account for scr refresh
                textPressInstru.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(textPressInstru, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'textPressInstru.started')
                textPressInstru.setAutoDraw(True)
            if textPressInstru.status == STARTED:  # only update if drawing
                textPressInstru.setText(press, log=False)
            
            # *nextButtonRemind* updates
            if nextButtonRemind.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                nextButtonRemind.frameNStart = frameN  # exact frame index
                nextButtonRemind.tStart = t  # local t and not account for scr refresh
                nextButtonRemind.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(nextButtonRemind, 'tStartRefresh')  # time at next scr refresh
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'nextButtonRemind.started')
                nextButtonRemind.setAutoDraw(True)
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in instructionsComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "instructions" ---
        for thisComponent in instructionsComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # store data for hideReminder (TrialHandler)
        hideReminder.addData('mouseInstr.x', mouseInstr.x)
        hideReminder.addData('mouseInstr.y', mouseInstr.y)
        hideReminder.addData('mouseInstr.leftButton', mouseInstr.leftButton)
        hideReminder.addData('mouseInstr.midButton', mouseInstr.midButton)
        hideReminder.addData('mouseInstr.rightButton', mouseInstr.rightButton)
        hideReminder.addData('mouseInstr.time', mouseInstr.time)
        hideReminder.addData('mouseInstr.clicked_name', mouseInstr.clicked_name)
        # check responses
        if keyInstr.keys in ['', [], None]:  # No response was made
            keyInstr.keys = None
        hideReminder.addData('keyInstr.keys',keyInstr.keys)
        if keyInstr.keys != None:  # we had a response
            hideReminder.addData('keyInstr.rt', keyInstr.rt)
        # the Routine "instructions" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
    # completed showReminder repeats of 'hideReminder'
    
    
    # --- Prepare to start Routine "trial" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from codeTrial
    win.color = 'black'
    trialBlock += 1
    
    if trialBlock == 3:
        showReminder = 1
    else:
        showReminder = 0
    audioTrial.setSound(audioPrompt, secs=8, hamming=True)
    audioTrial.setVolume(1.0, log=False)
    txtTrial.setText(prompt)
    txtRemind.setText(reminderTrial)
    # keep track of which components have finished
    trialComponents = [blackBackgroundTrial, micTrial, audioTrial, txtTrial, txtRemind, micStart, micStop]
    for thisComponent in trialComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "trial" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *blackBackgroundTrial* updates
        if blackBackgroundTrial.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            blackBackgroundTrial.frameNStart = frameN  # exact frame index
            blackBackgroundTrial.tStart = t  # local t and not account for scr refresh
            blackBackgroundTrial.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(blackBackgroundTrial, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'blackBackgroundTrial.started')
            blackBackgroundTrial.setAutoDraw(True)
        
        # micTrial updates
        if micTrial.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            micTrial.frameNStart = frameN  # exact frame index
            micTrial.tStart = t  # local t and not account for scr refresh
            micTrial.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(micTrial, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.addData('micTrial.started', t)
            # start recording with micTrial
            micTrial.start()
            micTrial.status = STARTED
        if micTrial.status == STARTED:
            # update recorded clip for micTrial
            micTrial.poll()
        if micTrial.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > micTrial.tStartRefresh + 66-frameTolerance:
                # keep track of stop time/frame for later
                micTrial.tStop = t  # not accounting for scr refresh
                micTrial.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.addData('micTrial.stopped', t)
                # stop recording with micTrial
                micTrial.stop()
                micTrial.status = FINISHED
        # start/stop audioTrial
        if audioTrial.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            audioTrial.frameNStart = frameN  # exact frame index
            audioTrial.tStart = t  # local t and not account for scr refresh
            audioTrial.tStartRefresh = tThisFlipGlobal  # on global time
            # add timestamp to datafile
            thisExp.addData('audioTrial.started', tThisFlipGlobal)
            audioTrial.play(when=win)  # sync with win flip
        if audioTrial.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > audioTrial.tStartRefresh + 8-frameTolerance:
                # keep track of stop time/frame for later
                audioTrial.tStop = t  # not accounting for scr refresh
                audioTrial.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'audioTrial.stopped')
                audioTrial.stop()
        
        # *txtTrial* updates
        if txtTrial.status == NOT_STARTED and tThisFlip >= 2.0-frameTolerance:
            # keep track of start time/frame for later
            txtTrial.frameNStart = frameN  # exact frame index
            txtTrial.tStart = t  # local t and not account for scr refresh
            txtTrial.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(txtTrial, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'txtTrial.started')
            txtTrial.setAutoDraw(True)
        if txtTrial.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > txtTrial.tStartRefresh + 5-frameTolerance:
                # keep track of stop time/frame for later
                txtTrial.tStop = t  # not accounting for scr refresh
                txtTrial.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'txtTrial.stopped')
                txtTrial.setAutoDraw(False)
        
        # *txtRemind* updates
        if txtRemind.status == NOT_STARTED and tThisFlip >= 32.0-frameTolerance:
            # keep track of start time/frame for later
            txtRemind.frameNStart = frameN  # exact frame index
            txtRemind.tStart = t  # local t and not account for scr refresh
            txtRemind.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(txtRemind, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'txtRemind.started')
            txtRemind.setAutoDraw(True)
        if txtRemind.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > txtRemind.tStartRefresh + 5-frameTolerance:
                # keep track of stop time/frame for later
                txtRemind.tStop = t  # not accounting for scr refresh
                txtRemind.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'txtRemind.stopped')
                txtRemind.setAutoDraw(False)
        
        # *micStart* updates
        if micStart.status == NOT_STARTED and tThisFlip >= 3-frameTolerance:
            # keep track of start time/frame for later
            micStart.frameNStart = frameN  # exact frame index
            micStart.tStart = t  # local t and not account for scr refresh
            micStart.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(micStart, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'micStart.started')
            micStart.setAutoDraw(True)
        if micStart.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > micStart.tStartRefresh + 60-frameTolerance:
                # keep track of stop time/frame for later
                micStart.tStop = t  # not accounting for scr refresh
                micStart.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'micStart.stopped')
                micStart.setAutoDraw(False)
        if micStart.status == STARTED:  # only update if drawing
            micStart.setOpacity(thisOpacityTrial, log=False)
        
        # *micStop* updates
        if micStop.status == NOT_STARTED and tThisFlip >= 63-frameTolerance:
            # keep track of start time/frame for later
            micStop.frameNStart = frameN  # exact frame index
            micStop.tStart = t  # local t and not account for scr refresh
            micStop.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(micStop, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'micStop.started')
            micStop.setAutoDraw(True)
        if micStop.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > micStop.tStartRefresh + 3-frameTolerance:
                # keep track of stop time/frame for later
                micStop.tStop = t  # not accounting for scr refresh
                micStop.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'micStop.stopped')
                micStop.setAutoDraw(False)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in trialComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "trial" ---
    for thisComponent in trialComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # tell mic to keep hold of current recording in micTrial.clips and transcript (if applicable) in micTrial.scripts
    # this will also update micTrial.lastClip and micTrial.lastScript
    micTrial.stop()
    tag = data.utils.getDateStr()
    micTrialClip = micTrial.bank(
        tag=tag, transcribe='None',
        config=None
    )
    trialLoop.addData('micTrial.clip', os.path.join(micTrialRecFolder, 'recording_micTrial_%s.wav' % tag))
    audioTrial.stop()  # ensure sound has stopped at end of routine
    # the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'trialLoop'


# set up handler to look after randomisation of conditions etc
endLoop = data.TrialHandler(nReps=1.0, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions(conditionsInstrPCSV),
    seed=None, name='endLoop')
thisExp.addLoop(endLoop)  # add the loop to the experiment
thisEndLoop = endLoop.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisEndLoop.rgb)
if thisEndLoop != None:
    for paramName in thisEndLoop:
        exec('{} = thisEndLoop[paramName]'.format(paramName))

for thisEndLoop in endLoop:
    currentLoop = endLoop
    # abbreviate parameter names if possible (e.g. rgb = thisEndLoop.rgb)
    if thisEndLoop != None:
        for paramName in thisEndLoop:
            exec('{} = thisEndLoop[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "endTrial" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    # Run 'Begin Routine' code from codeEndTrial
    textEndTrial.text = endInstru
    # keep track of which components have finished
    endTrialComponents = [blackBackgroundEnd, textEndTrial]
    for thisComponent in endTrialComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "endTrial" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *blackBackgroundEnd* updates
        if blackBackgroundEnd.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            blackBackgroundEnd.frameNStart = frameN  # exact frame index
            blackBackgroundEnd.tStart = t  # local t and not account for scr refresh
            blackBackgroundEnd.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(blackBackgroundEnd, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'blackBackgroundEnd.started')
            blackBackgroundEnd.setAutoDraw(True)
        
        # *textEndTrial* updates
        if textEndTrial.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            textEndTrial.frameNStart = frameN  # exact frame index
            textEndTrial.tStart = t  # local t and not account for scr refresh
            textEndTrial.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(textEndTrial, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'textEndTrial.started')
            textEndTrial.setAutoDraw(True)
        if textEndTrial.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > textEndTrial.tStartRefresh + 5-frameTolerance:
                # keep track of stop time/frame for later
                textEndTrial.tStop = t  # not accounting for scr refresh
                textEndTrial.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'textEndTrial.stopped')
                textEndTrial.setAutoDraw(False)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in endTrialComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "endTrial" ---
    for thisComponent in endTrialComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # the Routine "endTrial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'endLoop'

# save micTrial recordings
for tag in micTrial.clips:
    for i, clip in enumerate(micTrial.clips[tag]):
        clipFilename = 'recording_micTrial_%s.wav' % tag
        # if there's more than 1 clip with this tag, append a counter for all beyond the first
        if i > 0:
            clipFilename += '_%s' % i
        clip.save(os.path.join(micTrialRecFolder, clipFilename))

# --- End experiment ---
# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
