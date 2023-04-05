import lightTheme from '../theme/light-theme';
import {screenHeight, screenWidth} from './common-styles';

export const fontFamily = {
  argentum_sans: 'Argentum Sans',
};
export const fontWeight = {
  400: '400',
  500: '500',
  500: '600',
  600: '700',
  700: '800',
  800: '900',
  bold: 'bold',
};
export const fontSize = {
  title: 0.03 * screenHeight,

  verbiage_16: 0.016 * screenHeight,
  verbiage_large: 0.017 * screenHeight,
  verbiage_medium: 0.016 * screenHeight,
  verbiage: 0.015 * screenHeight,
  verbiage_small: 0.012 * screenHeight,
  verbiage_13: 0.013 * screenHeight,
  verbiage_extra_small: 0.008 * screenHeight,
  verbiage_10: 0.01 * screenHeight,
  verbiage_11: 0.011 * screenHeight,

  verbiage_20: 0.02 * screenHeight,

  verbiage_empty_screen: 0.018 * screenHeight,
  bottom_sheet_title: 0.026 * screenHeight,
  screen_title: 0.036 * screenHeight,
  screen_title_medium: 0.049 * screenHeight,
  screen_title_large: 0.058 * screenHeight,
};
export const textColors = {
  titleColor: '#003B7D',
  verbiageColor: '#979797',
  white: '#ffffff',
  black: '#22292E',
  card_title: '#8F9BB3',
  placeholder: '#C5CEE0',
  secondary: '#F9AC00',
  warning: 'red',
};
export const containerStyle = {
  backgroundColor: '#ffffff',
  headerBackgroundColor: lightTheme.colors.primary,
};
export const actionBaseColors = {
  disabled: 'gray',
};
