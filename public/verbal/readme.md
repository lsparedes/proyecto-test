(This README was developed from the template available [here](https://github.com/katielavigne/documentation/wiki/Experiments-README))
# VERBAL FLUENCY

##### tags: `word fluency, semantic fluency, online, offline, audio, microphone, english, french`

This is a verbal fluency test where participants must say all the words that fit within a given letter or category. Each trial is recorded and lasts for 1 minute.

<p align="center">
<img src="https://gitlab.pavlovia.org/katielavigne/verbal-fluency/blob/master/verbal-fluency.png" width="70%" height="70%"/>
</p>

**Publication:** not available

**Experiment DOI:** [10.17605/OSF.IO/C69BU](https://doi.org/10.17605/OSF.IO/C69BU)

**Primary function assessed:** verbal fluency

**Secondary functions assessed:** word fluency, semantic fluency, speech

## Features
- [x] Repeatability
- [x] Multilingual
- [ ] Validated
- [x] Accessibility
- [x] Cross-platform
- [x] Cross-device
- [ ] Cross-species

**Alternate Forms:** 2+ (see fluency-trials-full.csv)

**Languages:** English, French

**Validation:** not available

**Accessibility:** colourblind-friendly, audio & text instructions

**Platforms:** online, offline

**Devices:** PC, smartphone, tablet

**Species:** human

## Development
**Software:** PsychoPy 2022.2.4 Builder

**Requirements:** microphone sampling rate = 48kHz (standard for newer devices)

## Administration
- Run this task via PsychoPy (download and unzip this repository) or Pavlovia (fork this repository and set experiment to "running")
- Enable/select microphone if prompted
- Files will be saved to the local data directory (PsychoPy) or available for download via the Pavlovia dashboard

## Procedure and Conditions
This test includes 3 letter trials (participant must say words starting with a given letter) followed by 2 category trials (participants must say words that fit within a certain category).

## Output Files
Output files are named in the following convention: **subjectID_verbal-fluency_date_time**:
- **.csv** files contain experiment information (participant ID, session, date, experiment name, psychopy version, framerate)
- **.log** files contain technical information for debugging purposes
- **.psydat** files contain more detailed information
- The **subjectID_verbal-fluency_date_time_mic_recorded** directory contains the media files of the participants speech recordings (one per trial)

## Scoring

At this time, scoring must be done manually by listening to the recordings (see [Planned Features](https://gitlab.pavlovia.org/katielavigne/verbal-fluency/blob/master/readme.md#planned-features) for automated scoring). Scoring is as follows:
#### Letter trials: 
- **correct responses**: sum of acceptable words starting with the given letter across trials
- **set-loss errors**: sum of incorrect words (people, places, numbers, words starting with a different letter, grammatical variants of correct words) across trials
- **repetition errors**: sum of *identically* repeated correct responses or set-loss errors across trials

#### Category trials:
- **correct responses**: sum of acceptable words within the given category across trials
- **set-loss errors**: sum of incorrect words (words outside category, words ordinate/superordinate to category, grammatical variants of correct words, repetition of set-loss error) across trials
- **repetition errors**: sum of *identically* repeated correct responses or set-loss errors across trials

## Additional Features
- Language selection
- Visual and auditory instructions
- Prompt letter/category visible for a short period to mimic traditional version
- Easy to modify trials & add languages through .csv files

## Planned Features
- Automated transcription and scoring via Google Speech API
- Automated feedback via Google Speech API
- Additional languages (e.g., spanish, german)

## How to Contribute
If you are interested in contributing to this work by adding features or new languages, you can fork this repository and make changes through the PsychoPy builder (required to maintain offline capabilities). To add a new language, you can simply translate the relevant resources (fluency-trials-en.csv, instructions-en.csv/.mp4/.wav) and add a button to the lang routine in PsychoPy. Add yourself as a contributor to this README file and note your contribution in parentheses. Then submit a pull request to merge your changes with this repository.

## Contributors
Katie Lavigne (main developer, English & French languages)

## License & Attribution
This project is licensed under the GNU General Public License v3.0. If you use this experiment in your research, please cite it as follows:

Lavigne, K. M. (2022, December 8). Verbal Fluency Task. doi:10.17605/OSF.IO/C69BU

## Additional Reading

