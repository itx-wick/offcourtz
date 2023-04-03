import {Dimensions, Platform} from 'react-native';

export const os = Platform.OS;

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('screen').height;

const DESIGN_DIMENSIONS = {width: 375, height: 812};

export const getPercentageHeight = heightParam => {
  return Platform.select({
    ios: height * (heightParam / DESIGN_DIMENSIONS.height),
    android: heightParam,
  });
};

export const getPercentageWidth = widthParam => {
  return Platform.select({
    ios: width * (widthParam / DESIGN_DIMENSIONS.width),
    android: widthParam,
  });
};
export function numberWithCommas(price) {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const textStyle = {
  small: {
    fontSize: 12,
    fontWeight: '200',
  },
  medium: {
    fontSize: 14,
    fontWeight: '300',
  },
  normal: {
    fontSize: 16,
    fontWeight: '400',
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
  },
};

export const containerStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 3.84,
  elevation: 5,
  backgroundColor: 'white',
  alignSelf: 'center',
};
export const shadowBox = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 3.84,
  elevation: 5,
  backgroundColor: 'white',
  alignSelf: 'center',
};
export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;
