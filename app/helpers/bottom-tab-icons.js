import React from 'react';
import {SvgXml} from 'react-native-svg';
import {svgImages} from './svgImages';

const tabIcons = {
  challenge: <SvgXml xml={svgImages.challenges} />,
  workout: <SvgXml xml={svgImages.workouts} />,
  excercise: <SvgXml xml={svgImages.excercise} />,
  community: <SvgXml xml={svgImages.community} />,

  activeChallenge: <SvgXml xml={svgImages.activeChallenges} />,
  activeWorkout: <SvgXml xml={svgImages.activeWorkouts} />,
  activeExcercise: <SvgXml xml={svgImages.activeExcercise} />,
  activeCommunity: <SvgXml xml={svgImages.activeCommunity} />,
};

export {tabIcons};
