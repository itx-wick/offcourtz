import React from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';
import dummyVideo from '../assets/videos/dummyVideo.mp4';
import {screenHeight, screenWidth} from '../constants';
import {StyleSheet} from 'react-native';
import {theme} from '../theme';
function Detail() {
  const videoPlayer = React.useRef(null);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const togglePlaying = () => {};
  function secondsToTime(time) {
    return time / 60 + ':' + (((time % 60 < 10 ? '0' : '') * time) % 60);
  }

  return (
    <View>
      <View
        style={{
          height: screenHeight / 2.5,
          width: screenWidth,
          backgroundColor: theme.colors.whisper,
        }}>
        <Video
          ref={ref => (videoPlayer.current = ref)}
          source={dummyVideo} // the video file
          style={styles.player}
          controls={true}
        />
      </View>
    </View>
  );
}

export default Detail;

const styles = StyleSheet.create({
  controls: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 48,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  player: {
    width: '100%',
    height: '100%',
  },
});
