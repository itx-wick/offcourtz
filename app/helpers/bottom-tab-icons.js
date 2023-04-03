import React from 'react';
import {theme} from '../theme';
import {SvgUri} from 'react-native-svg';
const {colors} = theme;

const tabIcons = {
  categories: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/CategoriesTabInactive.svg'
      }
    />
  ),
  buisness: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/businessTabInactive.svg'
      }
    />
  ),
  cart: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/cartTabInactive.svg'
      }
    />
  ),
  notification: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/notificationsTabInactive.svg'
      }
    />
  ),
  profile: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/profileTabInactive.svg'
      }
    />
  ),

  activeCategories: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/CategoriesTabActive.svg'
      }
    />
  ),
  activeBuisness: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/businessTabActive.svg'
      }
    />
  ),
  activeCart: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/cartTabActive.svg'
      }
    />
  ),
  activeNotification: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/notificationsTabActive.svg'
      }
    />
  ),
  activeProfile: (
    <SvgUri
      uri={
        'https://metro-b2b-users-assets.s3.ap-southeast-1.amazonaws.com/App+svgs/profileTabActive.svg'
      }
    />
  ),
};

export {tabIcons};
