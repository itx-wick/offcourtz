import {Platform, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../constants';
import {
  containerStyle,
  fontFamily,
  fontSize,
  fontWeight,
} from '../../constants/fontDecorations';
import {theme} from '../../theme';
const inActiveTabTextColor = theme.colors.inActiveTabColor;

export default StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        height: 0.15 * screenWidth,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: containerStyle.backgroundColor,
        // zIndex:0,
        // position:'absolute',
      },
      ios: {
        height: 70,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: theme.colors.bottomTabBackgroundColor,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        paddingBottom: 10,
      },
    }),
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.24 * screenWidth,
  },
  tabText: {
    color: inActiveTabTextColor,
    fontFamily: fontFamily.argentum_sans,
    fontWeight: fontWeight[400],
    fontSize: fontSize.verbiage_small,
    marginTop: 4,
  },
});
