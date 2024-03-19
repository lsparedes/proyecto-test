#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2020.2.10),
    on March 19, 2021, at 13:36
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

from __future__ import absolute_import, division

import psychopy
psychopy.useVersion('2020.2.10')


from psychopy import locale_setup
from psychopy import prefs
prefs.hardware['audioLib'] = 'pyo'
prefs.hardware['audioLatencyMode'] = '3'
from psychopy import sound, gui, visual, core, data, event, logging, clock
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle
import os  # handy system and path functions
import sys  # to get file system encoding

from psychopy.hardware import keyboard

# Begin Experiment
#import random
#condition = random.choice(('cued','uncued'))




# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)

# Store info about the experiment session
psychopyVersion = '2020.2.10'
expName = 'rl'  # from the Builder filename that created this script
expInfo = {'participant': '', 'age': '', 'gender': '', 'years of education': ''}
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
    originPath='C:\\Users\\mashu\\Documents\\STUDIES\\bandit\\Pavlovia\\rljs\\rljs\\rl_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# Setup the Window
win = visual.Window(
    size=[1280, 720], fullscr=False, screen=0, 
    winType='pyglet', allowGUI=True, allowStencil=False,
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard()

# Initialize components for Routine "Instructions"
InstructionsClock = core.Clock()
instructions = visual.TextStim(win=win, name='instructions',
    text="Welcome to the experiment!\n\nIn each trial you will be asked to choose between green and blue options by licking the mouse on the option you prefer. Each choice can result in either winning the number of points written on the chosen box or winning nothing. The odds of winning associated with green vs. blue will change throughout the experiment. You won't know what they are but can guess based on the feedback you get after each choice. \n\nThe red bar on the bottom left will move to the right as you earn points. Additional 2 dollars will be added to your payment if you reach the purple mark, and additional 5 will be added if you reach the yellow mark. \nPlease press the SPACE bar to continue.",
    font='Arial',
    pos=(0, 0.2), height=0.03, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
key_resp = keyboard.Keyboard()
green_example = visual.ImageStim(
    win=win,
    name='green_example', 
    image='images/green_box.png', mask=None,
    ori=0, pos=(-0.2, -0.20), size=(0.15, 0.20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-2.0)
blue_example = visual.ImageStim(
    win=win,
    name='blue_example', 
    image='images/blue_box.png', mask=None,
    ori=0, pos=(0.2, -0.2), size=(0.15, 0.20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-3.0)
question = visual.TextStim(win=win, name='question',
    text='?',
    font='Arial',
    pos=(0, -0.2), height=0.03, wrapWidth=None, ori=0, 
    color=[0.686,-0.875,-0.875], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-4.0);
pointbar = visual.ImageStim(
    win=win,
    name='pointbar', units='pix', 
    image='images/red_box.png', mask=None,
    ori=0, pos=(-300, -300), size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-5.0)
purplebar = visual.ImageStim(
    win=win,
    name='purplebar', units='pix', 
    image='images/purple_box.png', mask=None,
    ori=0, pos=(300, -300), size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-6.0)
goldbar = visual.ImageStim(
    win=win,
    name='goldbar', units='pix', 
    image='images/gold_box.png', mask=None,
    ori=0, pos=(400, -300), size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-7.0)
leftamount = visual.TextStim(win=win, name='leftamount',
    text='25',
    font='Arial',
    pos=(-0.2, -0.2), height=0.04, wrapWidth=None, ori=0, 
    color=[0.694,-0.882,-0.882], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-8.0);
rightamount = visual.TextStim(win=win, name='rightamount',
    text='50',
    font='Arial',
    pos=(0.2, -0.2), height=0.04, wrapWidth=None, ori=0, 
    color=[0.694,-0.882,-0.882], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-9.0);

# Initialize components for Routine "trial"
trialClock = core.Clock()
question_mark = visual.TextStim(win=win, name='question_mark',
    text='?',
    font='Arial',
    pos=(0, 0), height=0.07, wrapWidth=None, ori=0, 
    color=[0.694,-0.882,-0.882], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);
blue = visual.ImageStim(
    win=win,
    name='blue', 
    image='images/blue_box.png', mask=None,
    ori=0, pos=[0,0], size=(0.30, 0.40),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-1.0)
green = visual.ImageStim(
    win=win,
    name='green', 
    image='images/green_box.png', mask=None,
    ori=0, pos=[0,0], size=(0.30, 0.40),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-2.0)
response = event.Mouse(win=win)
x, y = [None, None]
response.mouseClock = core.Clock()
blue_reward = visual.TextStim(win=win, name='blue_reward',
    text='default text',
    font='Arial',
    pos=[0,0], height=0.05, wrapWidth=None, ori=0, 
    color=[0.694,-0.882,-0.882], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-5.0);
green_reward = visual.TextStim(win=win, name='green_reward',
    text='default text',
    font='Arial',
    pos=[0,0], height=0.05, wrapWidth=None, ori=0, 
    color=[0.686,-0.875,-0.875], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-6.0);
purple_marker = visual.ImageStim(
    win=win,
    name='purple_marker', units='pix', 
    image='images/purple_box.png', mask=None,
    ori=0, pos=(400, -250), size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-7.0)
gold_marker = visual.ImageStim(
    win=win,
    name='gold_marker', units='pix', 
    image='images/gold_box.png', mask=None,
    ori=0, pos=(600, -250), size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-8.0)
points_marker = visual.ImageStim(
    win=win,
    name='points_marker', units='pix', 
    image='images/red_box.png', mask=None,
    ori=0, pos=[0,0], size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-9.0)

# Initialize components for Routine "Feedback"
FeedbackClock = core.Clock()
msgIm = ''
vol = ''
total = 0
msgIm_opacity = 0
fb_sound = sound.Sound('A', secs=-1, stereo=True, hamming=False,
    name='fb_sound')
fb_sound.setVolume(1.0)
fb_correct = visual.ImageStim(
    win=win,
    name='fb_correct', 
    image='sin', mask=None,
    ori=0, pos=(0, 0), size=(0.30, 0.40),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-3.0)
feedbackIm = visual.ImageStim(
    win=win,
    name='feedbackIm', 
    image='sin', mask=None,
    ori=0, pos=(0, 0), size=(0.22, 0.24),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-4.0)
red_frame = visual.ImageStim(
    win=win,
    name='red_frame', 
    image='images/red_box.png', mask=None,
    ori=0, pos=[0,0], size=(0.35, 0.45),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-5.0)
fb_blue = visual.ImageStim(
    win=win,
    name='fb_blue', 
    image='images/blue_box.png', mask=None,
    ori=0, pos=[0,0], size=(0.30, 0.40),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-6.0)
fb_green = visual.ImageStim(
    win=win,
    name='fb_green', 
    image='images/green_box.png', mask=None,
    ori=0, pos=[0,0], size=(0.30, 0.40),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-7.0)
fb_blue_reward = visual.TextStim(win=win, name='fb_blue_reward',
    text='default text',
    font='Arial',
    pos=[0,0], height=0.05, wrapWidth=None, ori=0, 
    color=[0.694,-0.882,-0.882], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-8.0);
fb_green_reward = visual.TextStim(win=win, name='fb_green_reward',
    text='default text',
    font='Arial',
    pos=[0,0], height=0.05, wrapWidth=None, ori=0, 
    color=[0.694,-0.882,-0.882], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=-9.0);
purple = visual.ImageStim(
    win=win,
    name='purple', units='pix', 
    image='images/purple_box.png', mask=None,
    ori=0, pos=(400, -250), size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-10.0)
gold = visual.ImageStim(
    win=win,
    name='gold', units='pix', 
    image='images/gold_box.png', mask=None,
    ori=0, pos=(600, -250), size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-11.0)
points = visual.ImageStim(
    win=win,
    name='points', units='pix', 
    image='images/red_box.png', mask=None,
    ori=0, pos=[0,0], size=(10, 20),
    color=[1,1,1], colorSpace='rgb', opacity=1,
    flipHoriz=False, flipVert=False,
    texRes=128, interpolate=True, depth=-12.0)

# Initialize components for Routine "ITI_2"
ITI_2Clock = core.Clock()
text = visual.TextStim(win=win, name='text',
    text='+',
    font='Arial',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0, 
    color=[0.694,-0.882,-0.882], colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);

# Initialize components for Routine "End"
EndClock = core.Clock()
thank_you = visual.TextStim(win=win, name='thank_you',
    text='This is the end of the experiment.\nThank you for your time.',
    font='Arial',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0, 
    color='white', colorSpace='rgb', opacity=1, 
    languageStyle='LTR',
    depth=0.0);

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.CountdownTimer()  # to track time remaining of each (non-slip) routine 

# ------Prepare to start Routine "Instructions"-------
continueRoutine = True
# update component parameters for each repeat
key_resp.keys = []
key_resp.rt = []
_key_resp_allKeys = []
# keep track of which components have finished
InstructionsComponents = [instructions, key_resp, green_example, blue_example, question, pointbar, purplebar, goldbar, leftamount, rightamount]
for thisComponent in InstructionsComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
InstructionsClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "Instructions"-------
while continueRoutine:
    # get current time
    t = InstructionsClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=InstructionsClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *instructions* updates
    if instructions.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        instructions.frameNStart = frameN  # exact frame index
        instructions.tStart = t  # local t and not account for scr refresh
        instructions.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(instructions, 'tStartRefresh')  # time at next scr refresh
        instructions.setAutoDraw(True)
    
    # *key_resp* updates
    waitOnFlip = False
    if key_resp.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_resp.frameNStart = frameN  # exact frame index
        key_resp.tStart = t  # local t and not account for scr refresh
        key_resp.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_resp, 'tStartRefresh')  # time at next scr refresh
        key_resp.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_resp.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_resp.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_resp.status == STARTED and not waitOnFlip:
        theseKeys = key_resp.getKeys(keyList=['space'], waitRelease=False)
        _key_resp_allKeys.extend(theseKeys)
        if len(_key_resp_allKeys):
            key_resp.keys = _key_resp_allKeys[-1].name  # just the last key pressed
            key_resp.rt = _key_resp_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    
    # *green_example* updates
    if green_example.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        green_example.frameNStart = frameN  # exact frame index
        green_example.tStart = t  # local t and not account for scr refresh
        green_example.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(green_example, 'tStartRefresh')  # time at next scr refresh
        green_example.setAutoDraw(True)
    
    # *blue_example* updates
    if blue_example.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        blue_example.frameNStart = frameN  # exact frame index
        blue_example.tStart = t  # local t and not account for scr refresh
        blue_example.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(blue_example, 'tStartRefresh')  # time at next scr refresh
        blue_example.setAutoDraw(True)
    
    # *question* updates
    if question.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        question.frameNStart = frameN  # exact frame index
        question.tStart = t  # local t and not account for scr refresh
        question.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(question, 'tStartRefresh')  # time at next scr refresh
        question.setAutoDraw(True)
    
    # *pointbar* updates
    if pointbar.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        pointbar.frameNStart = frameN  # exact frame index
        pointbar.tStart = t  # local t and not account for scr refresh
        pointbar.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(pointbar, 'tStartRefresh')  # time at next scr refresh
        pointbar.setAutoDraw(True)
    
    # *purplebar* updates
    if purplebar.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        purplebar.frameNStart = frameN  # exact frame index
        purplebar.tStart = t  # local t and not account for scr refresh
        purplebar.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(purplebar, 'tStartRefresh')  # time at next scr refresh
        purplebar.setAutoDraw(True)
    
    # *goldbar* updates
    if goldbar.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        goldbar.frameNStart = frameN  # exact frame index
        goldbar.tStart = t  # local t and not account for scr refresh
        goldbar.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(goldbar, 'tStartRefresh')  # time at next scr refresh
        goldbar.setAutoDraw(True)
    
    # *leftamount* updates
    if leftamount.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        leftamount.frameNStart = frameN  # exact frame index
        leftamount.tStart = t  # local t and not account for scr refresh
        leftamount.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(leftamount, 'tStartRefresh')  # time at next scr refresh
        leftamount.setAutoDraw(True)
    
    # *rightamount* updates
    if rightamount.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        rightamount.frameNStart = frameN  # exact frame index
        rightamount.tStart = t  # local t and not account for scr refresh
        rightamount.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(rightamount, 'tStartRefresh')  # time at next scr refresh
        rightamount.setAutoDraw(True)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in InstructionsComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "Instructions"-------
for thisComponent in InstructionsComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('instructions.started', instructions.tStartRefresh)
thisExp.addData('instructions.stopped', instructions.tStopRefresh)
# check responses
if key_resp.keys in ['', [], None]:  # No response was made
    key_resp.keys = None
thisExp.addData('key_resp.keys',key_resp.keys)
if key_resp.keys != None:  # we had a response
    thisExp.addData('key_resp.rt', key_resp.rt)
thisExp.addData('key_resp.started', key_resp.tStartRefresh)
thisExp.addData('key_resp.stopped', key_resp.tStopRefresh)
thisExp.nextEntry()
thisExp.addData('green_example.started', green_example.tStartRefresh)
thisExp.addData('green_example.stopped', green_example.tStopRefresh)
thisExp.addData('blue_example.started', blue_example.tStartRefresh)
thisExp.addData('blue_example.stopped', blue_example.tStopRefresh)
thisExp.addData('question.started', question.tStartRefresh)
thisExp.addData('question.stopped', question.tStopRefresh)
thisExp.addData('pointbar.started', pointbar.tStartRefresh)
thisExp.addData('pointbar.stopped', pointbar.tStopRefresh)
thisExp.addData('purplebar.started', purplebar.tStartRefresh)
thisExp.addData('purplebar.stopped', purplebar.tStopRefresh)
thisExp.addData('goldbar.started', goldbar.tStartRefresh)
thisExp.addData('goldbar.stopped', goldbar.tStopRefresh)
thisExp.addData('leftamount.started', leftamount.tStartRefresh)
thisExp.addData('leftamount.stopped', leftamount.tStopRefresh)
thisExp.addData('rightamount.started', rightamount.tStartRefresh)
thisExp.addData('rightamount.stopped', rightamount.tStopRefresh)
# the Routine "Instructions" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
outerLoop = data.TrialHandler(nReps=1, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('conditions.xlsx'),
    seed=None, name='outerLoop')
thisExp.addLoop(outerLoop)  # add the loop to the experiment
thisOuterLoop = outerLoop.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisOuterLoop.rgb)
if thisOuterLoop != None:
    for paramName in thisOuterLoop:
        exec('{} = thisOuterLoop[paramName]'.format(paramName))

for thisOuterLoop in outerLoop:
    currentLoop = outerLoop
    # abbreviate parameter names if possible (e.g. rgb = thisOuterLoop.rgb)
    if thisOuterLoop != None:
        for paramName in thisOuterLoop:
            exec('{} = thisOuterLoop[paramName]'.format(paramName))
    
    # set up handler to look after randomisation of conditions etc
    trials = data.TrialHandler(nReps=1, method='sequential', 
        extraInfo=expInfo, originPath=-1,
        trialList=data.importConditions(thisCond),
        seed=None, name='trials')
    thisExp.addLoop(trials)  # add the loop to the experiment
    thisTrial = trials.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
    if thisTrial != None:
        for paramName in thisTrial:
            exec('{} = thisTrial[paramName]'.format(paramName))
    
    for thisTrial in trials:
        currentLoop = trials
        # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
        if thisTrial != None:
            for paramName in thisTrial:
                exec('{} = thisTrial[paramName]'.format(paramName))
        
        # ------Prepare to start Routine "trial"-------
        continueRoutine = True
        # update component parameters for each repeat
        blue.setPos((pb, 0))
        green.setPos((pg, 0))
        corr = 0
        gain = 0
        px = 0
        # setup some python lists for storing info about the response
        response.x = []
        response.y = []
        response.leftButton = []
        response.midButton = []
        response.rightButton = []
        response.time = []
        response.clicked_name = []
        gotValidClick = False  # until a click is received
        blue_reward.setPos((pb, 0))
        blue_reward.setText(reward_blue)
        green_reward.setPos((pg, 0))
        green_reward.setText(reward_green)
        points_marker.setPos((total/10-500, -250))
        # keep track of which components have finished
        trialComponents = [question_mark, blue, green, response, blue_reward, green_reward, purple_marker, gold_marker, points_marker]
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
        trialClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
        frameN = -1
        
        # -------Run Routine "trial"-------
        while continueRoutine:
            # get current time
            t = trialClock.getTime()
            tThisFlip = win.getFutureFlipTime(clock=trialClock)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *question_mark* updates
            if question_mark.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                question_mark.frameNStart = frameN  # exact frame index
                question_mark.tStart = t  # local t and not account for scr refresh
                question_mark.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(question_mark, 'tStartRefresh')  # time at next scr refresh
                question_mark.setAutoDraw(True)
            
            # *blue* updates
            if blue.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                # keep track of start time/frame for later
                blue.frameNStart = frameN  # exact frame index
                blue.tStart = t  # local t and not account for scr refresh
                blue.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(blue, 'tStartRefresh')  # time at next scr refresh
                blue.setAutoDraw(True)
            
            # *green* updates
            if green.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                # keep track of start time/frame for later
                green.frameNStart = frameN  # exact frame index
                green.tStart = t  # local t and not account for scr refresh
                green.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(green, 'tStartRefresh')  # time at next scr refresh
                green.setAutoDraw(True)
            for stimulus in [blue, green]:
                if response.isPressedIn(stimulus):
                    print(stimulus.image, corrAns, stimulus.image==corrAns, stimulus.pos, type(stimulus.image), type(corrAns))
                    px=stimulus.pos[0]
                    if stimulus.image == corrAns:
                        corr = 1
                        gain = corrAmount
                    thisExp.addData('correct', corr)
                    continueRoutine = False
            # *response* updates
            if response.status == NOT_STARTED and t >= 0-frameTolerance:
                # keep track of start time/frame for later
                response.frameNStart = frameN  # exact frame index
                response.tStart = t  # local t and not account for scr refresh
                response.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(response, 'tStartRefresh')  # time at next scr refresh
                response.status = STARTED
                response.mouseClock.reset()
                prevButtonState = response.getPressed()  # if button is down already this ISN'T a new click
            if response.status == STARTED:  # only update if started and not finished!
                x, y = response.getPos()
                response.x.append(x)
                response.y.append(y)
                buttons = response.getPressed()
                response.leftButton.append(buttons[0])
                response.midButton.append(buttons[1])
                response.rightButton.append(buttons[2])
                response.time.append(response.mouseClock.getTime())
                buttons = response.getPressed()
                if buttons != prevButtonState:  # button state changed?
                    prevButtonState = buttons
                    if sum(buttons) > 0:  # state changed to a new click
                        # check if the mouse was inside our 'clickable' objects
                        gotValidClick = False
                        for obj in [blue, green]:
                            if obj.contains(response):
                                gotValidClick = True
                                response.clicked_name.append(obj.name)
                        if gotValidClick:  # abort routine on response
                            continueRoutine = False
            
            # *blue_reward* updates
            if blue_reward.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                blue_reward.frameNStart = frameN  # exact frame index
                blue_reward.tStart = t  # local t and not account for scr refresh
                blue_reward.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(blue_reward, 'tStartRefresh')  # time at next scr refresh
                blue_reward.setAutoDraw(True)
            
            # *green_reward* updates
            if green_reward.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                green_reward.frameNStart = frameN  # exact frame index
                green_reward.tStart = t  # local t and not account for scr refresh
                green_reward.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(green_reward, 'tStartRefresh')  # time at next scr refresh
                green_reward.setAutoDraw(True)
            
            # *purple_marker* updates
            if purple_marker.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                purple_marker.frameNStart = frameN  # exact frame index
                purple_marker.tStart = t  # local t and not account for scr refresh
                purple_marker.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(purple_marker, 'tStartRefresh')  # time at next scr refresh
                purple_marker.setAutoDraw(True)
            
            # *gold_marker* updates
            if gold_marker.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                gold_marker.frameNStart = frameN  # exact frame index
                gold_marker.tStart = t  # local t and not account for scr refresh
                gold_marker.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(gold_marker, 'tStartRefresh')  # time at next scr refresh
                gold_marker.setAutoDraw(True)
            
            # *points_marker* updates
            if points_marker.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                points_marker.frameNStart = frameN  # exact frame index
                points_marker.tStart = t  # local t and not account for scr refresh
                points_marker.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(points_marker, 'tStartRefresh')  # time at next scr refresh
                points_marker.setAutoDraw(True)
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in trialComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # -------Ending Routine "trial"-------
        for thisComponent in trialComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        trials.addData('question_mark.started', question_mark.tStartRefresh)
        trials.addData('question_mark.stopped', question_mark.tStopRefresh)
        trials.addData('blue.started', blue.tStartRefresh)
        trials.addData('blue.stopped', blue.tStopRefresh)
        trials.addData('green.started', green.tStartRefresh)
        trials.addData('green.stopped', green.tStopRefresh)
        # store data for trials (TrialHandler)
        trials.addData('response.x', response.x)
        trials.addData('response.y', response.y)
        trials.addData('response.leftButton', response.leftButton)
        trials.addData('response.midButton', response.midButton)
        trials.addData('response.rightButton', response.rightButton)
        trials.addData('response.time', response.time)
        trials.addData('response.clicked_name', response.clicked_name)
        trials.addData('response.started', response.tStart)
        trials.addData('response.stopped', response.tStop)
        trials.addData('blue_reward.started', blue_reward.tStartRefresh)
        trials.addData('blue_reward.stopped', blue_reward.tStopRefresh)
        trials.addData('green_reward.started', green_reward.tStartRefresh)
        trials.addData('green_reward.stopped', green_reward.tStopRefresh)
        trials.addData('purple_marker.started', purple_marker.tStartRefresh)
        trials.addData('purple_marker.stopped', purple_marker.tStopRefresh)
        trials.addData('gold_marker.started', gold_marker.tStartRefresh)
        trials.addData('gold_marker.stopped', gold_marker.tStopRefresh)
        trials.addData('points_marker.started', points_marker.tStartRefresh)
        trials.addData('points_marker.stopped', points_marker.tStopRefresh)
        # the Routine "trial" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # ------Prepare to start Routine "Feedback"-------
        continueRoutine = True
        routineTimer.add(5.000000)
        # update component parameters for each repeat
        if corr == 1:
            msgIm ='images/' + cash_corr
            msgIm_opacity =1
            #msg=cash_corr
            vol=1
            total=total+gain
        else:
            msgIm ='images/' +cash_corr
            msgIm_opacity =0
            vol=0
            total=total+0
        fb_sound.setSound(audio_corr, secs=4, hamming=False)
        fb_sound.setVolume(vol, log=False)
        fb_correct.setImage(corrAns)
        feedbackIm.setOpacity(msgIm_opacity)
        feedbackIm.setImage(msgIm)
        red_frame.setPos((px, 0))
        fb_blue.setPos((pb, 0))
        fb_green.setPos((pg, 0))
        fb_blue_reward.setText(reward_blue)
        fb_green_reward.setText(reward_green)
        # keep track of which components have finished
        FeedbackComponents = [fb_sound, fb_correct, feedbackIm, red_frame, fb_blue, fb_green, fb_blue_reward, fb_green_reward, purple, gold, points]
        for thisComponent in FeedbackComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        FeedbackClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
        frameN = -1
        
        # -------Run Routine "Feedback"-------
        while continueRoutine and routineTimer.getTime() > 0:
            # get current time
            t = FeedbackClock.getTime()
            tThisFlip = win.getFutureFlipTime(clock=FeedbackClock)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            # start/stop fb_sound
            if fb_sound.status == NOT_STARTED and t >= 1.0-frameTolerance:
                # keep track of start time/frame for later
                fb_sound.frameNStart = frameN  # exact frame index
                fb_sound.tStart = t  # local t and not account for scr refresh
                fb_sound.tStartRefresh = tThisFlipGlobal  # on global time
                fb_sound.play()  # start the sound (it finishes automatically)
            if fb_sound.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > fb_sound.tStartRefresh + 4-frameTolerance:
                    # keep track of stop time/frame for later
                    fb_sound.tStop = t  # not accounting for scr refresh
                    fb_sound.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(fb_sound, 'tStopRefresh')  # time at next scr refresh
                    fb_sound.stop()
            
            # *fb_correct* updates
            if fb_correct.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
                # keep track of start time/frame for later
                fb_correct.frameNStart = frameN  # exact frame index
                fb_correct.tStart = t  # local t and not account for scr refresh
                fb_correct.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(fb_correct, 'tStartRefresh')  # time at next scr refresh
                fb_correct.setAutoDraw(True)
            if fb_correct.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > fb_correct.tStartRefresh + 4-frameTolerance:
                    # keep track of stop time/frame for later
                    fb_correct.tStop = t  # not accounting for scr refresh
                    fb_correct.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(fb_correct, 'tStopRefresh')  # time at next scr refresh
                    fb_correct.setAutoDraw(False)
            
            # *feedbackIm* updates
            if feedbackIm.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
                # keep track of start time/frame for later
                feedbackIm.frameNStart = frameN  # exact frame index
                feedbackIm.tStart = t  # local t and not account for scr refresh
                feedbackIm.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(feedbackIm, 'tStartRefresh')  # time at next scr refresh
                feedbackIm.setAutoDraw(True)
            if feedbackIm.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > feedbackIm.tStartRefresh + 4-frameTolerance:
                    # keep track of stop time/frame for later
                    feedbackIm.tStop = t  # not accounting for scr refresh
                    feedbackIm.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(feedbackIm, 'tStopRefresh')  # time at next scr refresh
                    feedbackIm.setAutoDraw(False)
            
            # *red_frame* updates
            if red_frame.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                red_frame.frameNStart = frameN  # exact frame index
                red_frame.tStart = t  # local t and not account for scr refresh
                red_frame.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(red_frame, 'tStartRefresh')  # time at next scr refresh
                red_frame.setAutoDraw(True)
            if red_frame.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > red_frame.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    red_frame.tStop = t  # not accounting for scr refresh
                    red_frame.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(red_frame, 'tStopRefresh')  # time at next scr refresh
                    red_frame.setAutoDraw(False)
            
            # *fb_blue* updates
            if fb_blue.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                fb_blue.frameNStart = frameN  # exact frame index
                fb_blue.tStart = t  # local t and not account for scr refresh
                fb_blue.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(fb_blue, 'tStartRefresh')  # time at next scr refresh
                fb_blue.setAutoDraw(True)
            if fb_blue.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > fb_blue.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    fb_blue.tStop = t  # not accounting for scr refresh
                    fb_blue.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(fb_blue, 'tStopRefresh')  # time at next scr refresh
                    fb_blue.setAutoDraw(False)
            
            # *fb_green* updates
            if fb_green.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                fb_green.frameNStart = frameN  # exact frame index
                fb_green.tStart = t  # local t and not account for scr refresh
                fb_green.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(fb_green, 'tStartRefresh')  # time at next scr refresh
                fb_green.setAutoDraw(True)
            if fb_green.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > fb_green.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    fb_green.tStop = t  # not accounting for scr refresh
                    fb_green.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(fb_green, 'tStopRefresh')  # time at next scr refresh
                    fb_green.setAutoDraw(False)
            
            # *fb_blue_reward* updates
            if fb_blue_reward.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                fb_blue_reward.frameNStart = frameN  # exact frame index
                fb_blue_reward.tStart = t  # local t and not account for scr refresh
                fb_blue_reward.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(fb_blue_reward, 'tStartRefresh')  # time at next scr refresh
                fb_blue_reward.setAutoDraw(True)
            if fb_blue_reward.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > fb_blue_reward.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    fb_blue_reward.tStop = t  # not accounting for scr refresh
                    fb_blue_reward.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(fb_blue_reward, 'tStopRefresh')  # time at next scr refresh
                    fb_blue_reward.setAutoDraw(False)
            if fb_blue_reward.status == STARTED:  # only update if drawing
                fb_blue_reward.setPos((pb, 0))
            
            # *fb_green_reward* updates
            if fb_green_reward.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                fb_green_reward.frameNStart = frameN  # exact frame index
                fb_green_reward.tStart = t  # local t and not account for scr refresh
                fb_green_reward.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(fb_green_reward, 'tStartRefresh')  # time at next scr refresh
                fb_green_reward.setAutoDraw(True)
            if fb_green_reward.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > fb_green_reward.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    fb_green_reward.tStop = t  # not accounting for scr refresh
                    fb_green_reward.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(fb_green_reward, 'tStopRefresh')  # time at next scr refresh
                    fb_green_reward.setAutoDraw(False)
            if fb_green_reward.status == STARTED:  # only update if drawing
                fb_green_reward.setPos((pg, 0))
            
            # *purple* updates
            if purple.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                purple.frameNStart = frameN  # exact frame index
                purple.tStart = t  # local t and not account for scr refresh
                purple.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(purple, 'tStartRefresh')  # time at next scr refresh
                purple.setAutoDraw(True)
            if purple.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > purple.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    purple.tStop = t  # not accounting for scr refresh
                    purple.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(purple, 'tStopRefresh')  # time at next scr refresh
                    purple.setAutoDraw(False)
            
            # *gold* updates
            if gold.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                gold.frameNStart = frameN  # exact frame index
                gold.tStart = t  # local t and not account for scr refresh
                gold.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(gold, 'tStartRefresh')  # time at next scr refresh
                gold.setAutoDraw(True)
            if gold.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > gold.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    gold.tStop = t  # not accounting for scr refresh
                    gold.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(gold, 'tStopRefresh')  # time at next scr refresh
                    gold.setAutoDraw(False)
            
            # *points* updates
            if points.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                points.frameNStart = frameN  # exact frame index
                points.tStart = t  # local t and not account for scr refresh
                points.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(points, 'tStartRefresh')  # time at next scr refresh
                points.setAutoDraw(True)
            if points.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > points.tStartRefresh + 5-frameTolerance:
                    # keep track of stop time/frame for later
                    points.tStop = t  # not accounting for scr refresh
                    points.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(points, 'tStopRefresh')  # time at next scr refresh
                    points.setAutoDraw(False)
            if points.status == STARTED:  # only update if drawing
                points.setPos((total/10-500, -250))
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in FeedbackComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # -------Ending Routine "Feedback"-------
        for thisComponent in FeedbackComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        if (trials.thisTrialN) == 290:
            trials.finished = True
        fb_sound.stop()  # ensure sound has stopped at end of routine
        trials.addData('fb_sound.started', fb_sound.tStart)
        trials.addData('fb_sound.stopped', fb_sound.tStop)
        trials.addData('fb_correct.started', fb_correct.tStartRefresh)
        trials.addData('fb_correct.stopped', fb_correct.tStopRefresh)
        trials.addData('feedbackIm.started', feedbackIm.tStartRefresh)
        trials.addData('feedbackIm.stopped', feedbackIm.tStopRefresh)
        trials.addData('red_frame.started', red_frame.tStartRefresh)
        trials.addData('red_frame.stopped', red_frame.tStopRefresh)
        trials.addData('fb_blue.started', fb_blue.tStartRefresh)
        trials.addData('fb_blue.stopped', fb_blue.tStopRefresh)
        trials.addData('fb_green.started', fb_green.tStartRefresh)
        trials.addData('fb_green.stopped', fb_green.tStopRefresh)
        trials.addData('fb_blue_reward.started', fb_blue_reward.tStartRefresh)
        trials.addData('fb_blue_reward.stopped', fb_blue_reward.tStopRefresh)
        trials.addData('fb_green_reward.started', fb_green_reward.tStartRefresh)
        trials.addData('fb_green_reward.stopped', fb_green_reward.tStopRefresh)
        trials.addData('purple.started', purple.tStartRefresh)
        trials.addData('purple.stopped', purple.tStopRefresh)
        trials.addData('gold.started', gold.tStartRefresh)
        trials.addData('gold.stopped', gold.tStopRefresh)
        trials.addData('points.started', points.tStartRefresh)
        trials.addData('points.stopped', points.tStopRefresh)
        
        # ------Prepare to start Routine "ITI_2"-------
        continueRoutine = True
        # update component parameters for each repeat
        # keep track of which components have finished
        ITI_2Components = [text]
        for thisComponent in ITI_2Components:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        ITI_2Clock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
        frameN = -1
        
        # -------Run Routine "ITI_2"-------
        while continueRoutine:
            # get current time
            t = ITI_2Clock.getTime()
            tThisFlip = win.getFutureFlipTime(clock=ITI_2Clock)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *text* updates
            if text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                text.frameNStart = frameN  # exact frame index
                text.tStart = t  # local t and not account for scr refresh
                text.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(text, 'tStartRefresh')  # time at next scr refresh
                text.setAutoDraw(True)
            if text.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > text.tStartRefresh + ITI_s-frameTolerance:
                    # keep track of stop time/frame for later
                    text.tStop = t  # not accounting for scr refresh
                    text.frameNStop = frameN  # exact frame index
                    win.timeOnFlip(text, 'tStopRefresh')  # time at next scr refresh
                    text.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
                core.quit()
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in ITI_2Components:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # -------Ending Routine "ITI_2"-------
        for thisComponent in ITI_2Components:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        trials.addData('text.started', text.tStartRefresh)
        trials.addData('text.stopped', text.tStopRefresh)
        # the Routine "ITI_2" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
    # completed 1 repeats of 'trials'
    
# completed 1 repeats of 'outerLoop'


# ------Prepare to start Routine "End"-------
continueRoutine = True
routineTimer.add(3.000000)
# update component parameters for each repeat
# keep track of which components have finished
EndComponents = [thank_you]
for thisComponent in EndComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
EndClock.reset(-_timeToFirstFrame)  # t0 is time of first possible flip
frameN = -1

# -------Run Routine "End"-------
while continueRoutine and routineTimer.getTime() > 0:
    # get current time
    t = EndClock.getTime()
    tThisFlip = win.getFutureFlipTime(clock=EndClock)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *thank_you* updates
    if thank_you.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        thank_you.frameNStart = frameN  # exact frame index
        thank_you.tStart = t  # local t and not account for scr refresh
        thank_you.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(thank_you, 'tStartRefresh')  # time at next scr refresh
        thank_you.setAutoDraw(True)
    if thank_you.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > thank_you.tStartRefresh + 3-frameTolerance:
            # keep track of stop time/frame for later
            thank_you.tStop = t  # not accounting for scr refresh
            thank_you.frameNStop = frameN  # exact frame index
            win.timeOnFlip(thank_you, 'tStopRefresh')  # time at next scr refresh
            thank_you.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in EndComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# -------Ending Routine "End"-------
for thisComponent in EndComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
thisExp.addData('thank_you.started', thank_you.tStartRefresh)
thisExp.addData('thank_you.stopped', thank_you.tStopRefresh)

# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
