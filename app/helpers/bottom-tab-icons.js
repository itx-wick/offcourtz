import React from 'react';
import {SvgXml} from 'react-native-svg';
import {svgImages} from './svgImages';

const tabIcons = {
  challenge: <SvgXml height={26} width={26} xml={svgImages.challenges} />,
  workout: <SvgXml height={26} width={26} xml={svgImages.workouts} />,
  exercise: <SvgXml height={26} width={26} xml={svgImages.exercise} />,
  community: <SvgXml height={26} width={26} xml={svgImages.community} />,

  activeChallenge: (
    <SvgXml height={26} width={26} xml={svgImages.activeChallenges} />
  ),
  activeWorkout: (
    <SvgXml height={26} width={26} xml={svgImages.activeWorkouts} />
  ),
  activeExercise: (
    <SvgXml height={26} width={26} xml={svgImages.activeExercise} />
  ),
  activeCommunity: (
    <SvgXml height={26} width={26} xml={svgImages.activeCommunity} />
  ),
};

export {tabIcons};
