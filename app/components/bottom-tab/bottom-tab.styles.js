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
        height: 70,
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
        alignItems: 'center',
        backgroundColor: theme.colors.bottomTabBackgroundColor,
        shadowOpacity: 0.1,
        shadowColor: '#000',
      },
    }),
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 0.2 * screenWidth,
  },
  tabText: {
    color: inActiveTabTextColor,
    fontFamily: fontFamily.pt_sans,
    fontWeight: fontWeight[400],
    fontSize: fontSize.verbiage_small,
  },
});
