import React from 'react';
import {BackHandler} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {svgImages} from '../helpers';

export default {
  calculateDateFromObj: date => {
    let strDate =
      date.getFullYear() +
      '-' +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)) +
      '-' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
    return strDate || date;
  },

  timeDiff: (start, end) => {
    var diff = end - start;
    var units = [1000 * 60 * 60 * 24, 1000 * 60 * 60, 1000 * 60, 1000];

    var rv = [];
    for (var i = 0; i < units.length; ++i) {
      rv.push(Math.floor(diff / units[i]));
      diff = diff % units[i];
    }
    var thisFullYear = end.getFullYear();
    var daysInLastMonth = new Date(thisFullYear, end.getMonth(), 0).getDate();
    var thisMonth = end.getMonth();
    thisFullYear = thisFullYear - start.getFullYear();
    thisMonth = thisMonth - start.getMonth();
    var subAddDays = daysInLastMonth - start.getDate();
    var thisDay = end.getDate();
    thisMonth = thisMonth - 1;
    if (thisMonth < 0) {
      thisFullYear = thisFullYear - 1;
      thisMonth = 12 + thisMonth;
    }
    subAddDays = daysInLastMonth - start.getDate();
    subAddDays = thisDay + subAddDays;

    if (subAddDays >= daysInLastMonth) {
      subAddDays = subAddDays - daysInLastMonth;
      thisMonth++;
      if (thisMonth > 11) {
        thisFullYear++;
        thisMonth = 0;
      }
    }
    return {
      years: thisFullYear,
      months: thisMonth,
      days: subAddDays,
      hours: rv[1],
      minutes: rv[2],
      seconds: rv[3],
    };
  },

  reset: (navigation, screen) => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: screen}],
    });
    navigation.dispatch(resetAction);
  },

  navigateParams: (navigation, screen, params) => {
    navigation.navigate(screen, params);
  },

  navigate: (navigation, screen) => {
    navigation.navigate(screen);
  },

  exitApp: () => {
    BackHandler.exitApp();
    return true;
  },

  goBack: navigation => {
    navigation.goBack(null);
    return true;
  },

  challenges: [
    {
      id: 1,
      title: 'Backhand',
      time: '20 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#E4DBFF',
    },
    {
      id: 2,
      title: 'Weekly',
      time: '30 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#FFDBDB',
    },
  ],

  workoutsFilter: [
    {
      id: 1,
      value: 'Easy',
    },
    {
      id: 2,
      value: 'Medium',
    },
    {
      id: 3,
      value: 'Hard',
    },
    {
      id: 4,
      value: 'Weekly',
    },
    {
      id: 5,
      value: 'Custom',
    },
  ],

  communityFilter: [
    {
      id: 1,
      title: 'Global',
    },
    {
      id: 2,
      title: 'Friends',
    },
  ],

  workouts: [
    {
      id: 1,
      title: 'Smash',
      time: '30 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#FFEBD4',
    },
    {
      id: 2,
      title: 'Backhand',
      time: '20 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#E4DBFF',
    },
  ],

  exercises: [
    {
      id: 1,
      title: 'Forehand',
      time: '30 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#DBE9FF',
    },
    {
      id: 2,
      title: 'Smash',
      time: '30 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#FFEBD4',
    },
    {
      id: 3,
      title: 'Backhand',
      time: '20 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#E4DBFF',
    },
  ],

  durations: [
    {
      id: 1,
      title: '10',
    },
    {
      id: 2,
      title: '20',
    },
    {
      id: 3,
      title: '30',
    },
  ],

  countries: [
    {
      title: 'Ascension Island',
      code: 'AC',
      emoji: '🇦🇨',
      unicode: 'U+1F1E6 U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg',
    },
    {
      title: 'Andorra',
      code: 'AD',
      emoji: '🇦🇩',
      unicode: 'U+1F1E6 U+1F1E9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg',
    },
    {
      title: 'United Arab Emirates',
      code: 'AE',
      emoji: '🇦🇪',
      unicode: 'U+1F1E6 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg',
    },
    {
      title: 'Afghanistan',
      code: 'AF',
      emoji: '🇦🇫',
      unicode: 'U+1F1E6 U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg',
    },
    {
      title: 'Antigua & Barbuda',
      code: 'AG',
      emoji: '🇦🇬',
      unicode: 'U+1F1E6 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg',
    },
    {
      title: 'Anguilla',
      code: 'AI',
      emoji: '🇦🇮',
      unicode: 'U+1F1E6 U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg',
    },
    {
      title: 'Albania',
      code: 'AL',
      emoji: '🇦🇱',
      unicode: 'U+1F1E6 U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg',
    },
    {
      title: 'Armenia',
      code: 'AM',
      emoji: '🇦🇲',
      unicode: 'U+1F1E6 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg',
    },
    {
      title: 'Angola',
      code: 'AO',
      emoji: '🇦🇴',
      unicode: 'U+1F1E6 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg',
    },
    {
      title: 'Antarctica',
      code: 'AQ',
      emoji: '🇦🇶',
      unicode: 'U+1F1E6 U+1F1F6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AQ.svg',
    },
    {
      title: 'Argentina',
      code: 'AR',
      emoji: '🇦🇷',
      unicode: 'U+1F1E6 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg',
    },
    {
      title: 'American Samoa',
      code: 'AS',
      emoji: '🇦🇸',
      unicode: 'U+1F1E6 U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg',
    },
    {
      title: 'Austria',
      code: 'AT',
      emoji: '🇦🇹',
      unicode: 'U+1F1E6 U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg',
    },
    {
      title: 'Australia',
      code: 'AU',
      emoji: '🇦🇺',
      unicode: 'U+1F1E6 U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg',
    },
    {
      title: 'Aruba',
      code: 'AW',
      emoji: '🇦🇼',
      unicode: 'U+1F1E6 U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AW.svg',
    },
    {
      title: 'Åland Islands',
      code: 'AX',
      emoji: '🇦🇽',
      unicode: 'U+1F1E6 U+1F1FD',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AX.svg',
    },
    {
      title: 'Azerbaijan',
      code: 'AZ',
      emoji: '🇦🇿',
      unicode: 'U+1F1E6 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg',
    },
    {
      title: 'Bosnia & Herzegovina',
      code: 'BA',
      emoji: '🇧🇦',
      unicode: 'U+1F1E7 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg',
    },
    {
      title: 'Barbados',
      code: 'BB',
      emoji: '🇧🇧',
      unicode: 'U+1F1E7 U+1F1E7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BB.svg',
    },
    {
      title: 'Bangladesh',
      code: 'BD',
      emoji: '🇧🇩',
      unicode: 'U+1F1E7 U+1F1E9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg',
    },
    {
      title: 'Belgium',
      code: 'BE',
      emoji: '🇧🇪',
      unicode: 'U+1F1E7 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg',
    },
    {
      title: 'Burkina Faso',
      code: 'BF',
      emoji: '🇧🇫',
      unicode: 'U+1F1E7 U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg',
    },
    {
      title: 'Bulgaria',
      code: 'BG',
      emoji: '🇧🇬',
      unicode: 'U+1F1E7 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg',
    },
    {
      title: 'Bahrain',
      code: 'BH',
      emoji: '🇧🇭',
      unicode: 'U+1F1E7 U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg',
    },
    {
      title: 'Burundi',
      code: 'BI',
      emoji: '🇧🇮',
      unicode: 'U+1F1E7 U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg',
    },
    {
      title: 'Benin',
      code: 'BJ',
      emoji: '🇧🇯',
      unicode: 'U+1F1E7 U+1F1EF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg',
    },
    {
      title: 'St. Barthélemy',
      code: 'BL',
      emoji: '🇧🇱',
      unicode: 'U+1F1E7 U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BL.svg',
    },
    {
      title: 'Bermuda',
      code: 'BM',
      emoji: '🇧🇲',
      unicode: 'U+1F1E7 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BM.svg',
    },
    {
      title: 'Brunei',
      code: 'BN',
      emoji: '🇧🇳',
      unicode: 'U+1F1E7 U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg',
    },
    {
      title: 'Bolivia',
      code: 'BO',
      emoji: '🇧🇴',
      unicode: 'U+1F1E7 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg',
    },
    {
      title: 'Caribbean Netherlands',
      code: 'BQ',
      emoji: '🇧🇶',
      unicode: 'U+1F1E7 U+1F1F6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BQ.svg',
    },
    {
      title: 'Brazil',
      code: 'BR',
      emoji: '🇧🇷',
      unicode: 'U+1F1E7 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg',
    },
    {
      title: 'Bahamas',
      code: 'BS',
      emoji: '🇧🇸',
      unicode: 'U+1F1E7 U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BS.svg',
    },
    {
      title: 'Bhutan',
      code: 'BT',
      emoji: '🇧🇹',
      unicode: 'U+1F1E7 U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg',
    },
    {
      title: 'Bouvet Island',
      code: 'BV',
      emoji: '🇧🇻',
      unicode: 'U+1F1E7 U+1F1FB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BV.svg',
    },
    {
      title: 'Botswana',
      code: 'BW',
      emoji: '🇧🇼',
      unicode: 'U+1F1E7 U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg',
    },
    {
      title: 'Belarus',
      code: 'BY',
      emoji: '🇧🇾',
      unicode: 'U+1F1E7 U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg',
    },
    {
      title: 'Belize',
      code: 'BZ',
      emoji: '🇧🇿',
      unicode: 'U+1F1E7 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg',
    },
    {
      title: 'Canada',
      code: 'CA',
      emoji: '🇨🇦',
      unicode: 'U+1F1E8 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg',
    },
    {
      title: 'Cocos (Keeling) Islands',
      code: 'CC',
      emoji: '🇨🇨',
      unicode: 'U+1F1E8 U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CC.svg',
    },
    {
      title: 'Congo - Kinshasa',
      code: 'CD',
      emoji: '🇨🇩',
      unicode: 'U+1F1E8 U+1F1E9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg',
    },
    {
      title: 'Central African Republic',
      code: 'CF',
      emoji: '🇨🇫',
      unicode: 'U+1F1E8 U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg',
    },
    {
      title: 'Congo - Brazzaville',
      code: 'CG',
      emoji: '🇨🇬',
      unicode: 'U+1F1E8 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg',
    },
    {
      title: 'Switzerland',
      code: 'CH',
      emoji: '🇨🇭',
      unicode: 'U+1F1E8 U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg',
    },
    {
      title: 'Côte d’Ivoire',
      code: 'CI',
      emoji: '🇨🇮',
      unicode: 'U+1F1E8 U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg',
    },
    {
      title: 'Cook Islands',
      code: 'CK',
      emoji: '🇨🇰',
      unicode: 'U+1F1E8 U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CK.svg',
    },
    {
      title: 'Chile',
      code: 'CL',
      emoji: '🇨🇱',
      unicode: 'U+1F1E8 U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg',
    },
    {
      title: 'Cameroon',
      code: 'CM',
      emoji: '🇨🇲',
      unicode: 'U+1F1E8 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg',
    },
    {
      title: 'China',
      code: 'CN',
      emoji: '🇨🇳',
      unicode: 'U+1F1E8 U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg',
    },
    {
      title: 'Colombia',
      code: 'CO',
      emoji: '🇨🇴',
      unicode: 'U+1F1E8 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg',
    },
    {
      title: 'Clipperton Island',
      code: 'CP',
      emoji: '🇨🇵',
      unicode: 'U+1F1E8 U+1F1F5',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CP.svg',
    },
    {
      title: 'Costa Rica',
      code: 'CR',
      emoji: '🇨🇷',
      unicode: 'U+1F1E8 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg',
    },
    {
      title: 'Cuba',
      code: 'CU',
      emoji: '🇨🇺',
      unicode: 'U+1F1E8 U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg',
    },
    {
      title: 'Cape Verde',
      code: 'CV',
      emoji: '🇨🇻',
      unicode: 'U+1F1E8 U+1F1FB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg',
    },
    {
      title: 'Curaçao',
      code: 'CW',
      emoji: '🇨🇼',
      unicode: 'U+1F1E8 U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CW.svg',
    },
    {
      title: 'Christmas Island',
      code: 'CX',
      emoji: '🇨🇽',
      unicode: 'U+1F1E8 U+1F1FD',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CX.svg',
    },
    {
      title: 'Cyprus',
      code: 'CY',
      emoji: '🇨🇾',
      unicode: 'U+1F1E8 U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg',
    },
    {
      title: 'Czechia',
      code: 'CZ',
      emoji: '🇨🇿',
      unicode: 'U+1F1E8 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg',
    },
    {
      title: 'Germany',
      code: 'DE',
      emoji: '🇩🇪',
      unicode: 'U+1F1E9 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg',
    },
    {
      title: 'Diego Garcia',
      code: 'DG',
      emoji: '🇩🇬',
      unicode: 'U+1F1E9 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DG.svg',
    },
    {
      title: 'Djibouti',
      code: 'DJ',
      emoji: '🇩🇯',
      unicode: 'U+1F1E9 U+1F1EF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg',
    },
    {
      title: 'Denmark',
      code: 'DK',
      emoji: '🇩🇰',
      unicode: 'U+1F1E9 U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg',
    },
    {
      title: 'Dominica',
      code: 'DM',
      emoji: '🇩🇲',
      unicode: 'U+1F1E9 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DM.svg',
    },
    {
      title: 'Dominican Republic',
      code: 'DO',
      emoji: '🇩🇴',
      unicode: 'U+1F1E9 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg',
    },
    {
      title: 'Algeria',
      code: 'DZ',
      emoji: '🇩🇿',
      unicode: 'U+1F1E9 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg',
    },
    {
      title: 'Ceuta & Melilla',
      code: 'EA',
      emoji: '🇪🇦',
      unicode: 'U+1F1EA U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EA.svg',
    },
    {
      title: 'Ecuador',
      code: 'EC',
      emoji: '🇪🇨',
      unicode: 'U+1F1EA U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg',
    },
    {
      title: 'Estonia',
      code: 'EE',
      emoji: '🇪🇪',
      unicode: 'U+1F1EA U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg',
    },
    {
      title: 'Egypt',
      code: 'EG',
      emoji: '🇪🇬',
      unicode: 'U+1F1EA U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg',
    },
    {
      title: 'Western Sahara',
      code: 'EH',
      emoji: '🇪🇭',
      unicode: 'U+1F1EA U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EH.svg',
    },
    {
      title: 'Eritrea',
      code: 'ER',
      emoji: '🇪🇷',
      unicode: 'U+1F1EA U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg',
    },
    {
      title: 'Spain',
      code: 'ES',
      emoji: '🇪🇸',
      unicode: 'U+1F1EA U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg',
    },
    {
      title: 'Ethiopia',
      code: 'ET',
      emoji: '🇪🇹',
      unicode: 'U+1F1EA U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg',
    },
    {
      title: 'European Union',
      code: 'EU',
      emoji: '🇪🇺',
      unicode: 'U+1F1EA U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EU.svg',
    },
    {
      title: 'Finland',
      code: 'FI',
      emoji: '🇫🇮',
      unicode: 'U+1F1EB U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg',
    },
    {
      title: 'Fiji',
      code: 'FJ',
      emoji: '🇫🇯',
      unicode: 'U+1F1EB U+1F1EF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg',
    },
    {
      title: 'Falkland Islands',
      code: 'FK',
      emoji: '🇫🇰',
      unicode: 'U+1F1EB U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FK.svg',
    },
    {
      title: 'Micronesia',
      code: 'FM',
      emoji: '🇫🇲',
      unicode: 'U+1F1EB U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FM.svg',
    },
    {
      title: 'Faroe Islands',
      code: 'FO',
      emoji: '🇫🇴',
      unicode: 'U+1F1EB U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FO.svg',
    },
    {
      title: 'France',
      code: 'FR',
      emoji: '🇫🇷',
      unicode: 'U+1F1EB U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg',
    },
    {
      title: 'Gabon',
      code: 'GA',
      emoji: '🇬🇦',
      unicode: 'U+1F1EC U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg',
    },
    {
      title: 'United Kingdom',
      code: 'GB',
      emoji: '🇬🇧',
      unicode: 'U+1F1EC U+1F1E7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg',
    },
    {
      title: 'Grenada',
      code: 'GD',
      emoji: '🇬🇩',
      unicode: 'U+1F1EC U+1F1E9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GD.svg',
    },
    {
      title: 'Georgia',
      code: 'GE',
      emoji: '🇬🇪',
      unicode: 'U+1F1EC U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg',
    },
    {
      title: 'French Guiana',
      code: 'GF',
      emoji: '🇬🇫',
      unicode: 'U+1F1EC U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GF.svg',
    },
    {
      title: 'Guernsey',
      code: 'GG',
      emoji: '🇬🇬',
      unicode: 'U+1F1EC U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GG.svg',
    },
    {
      title: 'Ghana',
      code: 'GH',
      emoji: '🇬🇭',
      unicode: 'U+1F1EC U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg',
    },
    {
      title: 'Gibraltar',
      code: 'GI',
      emoji: '🇬🇮',
      unicode: 'U+1F1EC U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GI.svg',
    },
    {
      title: 'Greenland',
      code: 'GL',
      emoji: '🇬🇱',
      unicode: 'U+1F1EC U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg',
    },
    {
      title: 'Gambia',
      code: 'GM',
      emoji: '🇬🇲',
      unicode: 'U+1F1EC U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg',
    },
    {
      title: 'Guinea',
      code: 'GN',
      emoji: '🇬🇳',
      unicode: 'U+1F1EC U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg',
    },
    {
      title: 'Guadeloupe',
      code: 'GP',
      emoji: '🇬🇵',
      unicode: 'U+1F1EC U+1F1F5',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GP.svg',
    },
    {
      title: 'Equatorial Guinea',
      code: 'GQ',
      emoji: '🇬🇶',
      unicode: 'U+1F1EC U+1F1F6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg',
    },
    {
      title: 'Greece',
      code: 'GR',
      emoji: '🇬🇷',
      unicode: 'U+1F1EC U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg',
    },
    {
      title: 'South Georgia & South Sandwich Islands',
      code: 'GS',
      emoji: '🇬🇸',
      unicode: 'U+1F1EC U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GS.svg',
    },
    {
      title: 'Guatemala',
      code: 'GT',
      emoji: '🇬🇹',
      unicode: 'U+1F1EC U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg',
    },
    {
      title: 'Guam',
      code: 'GU',
      emoji: '🇬🇺',
      unicode: 'U+1F1EC U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GU.svg',
    },
    {
      title: 'Guinea-Bissau',
      code: 'GW',
      emoji: '🇬🇼',
      unicode: 'U+1F1EC U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg',
    },
    {
      title: 'Guyana',
      code: 'GY',
      emoji: '🇬🇾',
      unicode: 'U+1F1EC U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg',
    },
    {
      title: 'Hong Kong SAR China',
      code: 'HK',
      emoji: '🇭🇰',
      unicode: 'U+1F1ED U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HK.svg',
    },
    {
      title: 'Heard & McDonald Islands',
      code: 'HM',
      emoji: '🇭🇲',
      unicode: 'U+1F1ED U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HM.svg',
    },
    {
      title: 'Honduras',
      code: 'HN',
      emoji: '🇭🇳',
      unicode: 'U+1F1ED U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg',
    },
    {
      title: 'Croatia',
      code: 'HR',
      emoji: '🇭🇷',
      unicode: 'U+1F1ED U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg',
    },
    {
      title: 'Haiti',
      code: 'HT',
      emoji: '🇭🇹',
      unicode: 'U+1F1ED U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg',
    },
    {
      title: 'Hungary',
      code: 'HU',
      emoji: '🇭🇺',
      unicode: 'U+1F1ED U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg',
    },
    {
      title: 'Canary Islands',
      code: 'IC',
      emoji: '🇮🇨',
      unicode: 'U+1F1EE U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IC.svg',
    },
    {
      title: 'Indonesia',
      code: 'ID',
      emoji: '🇮🇩',
      unicode: 'U+1F1EE U+1F1E9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg',
    },
    {
      title: 'Ireland',
      code: 'IE',
      emoji: '🇮🇪',
      unicode: 'U+1F1EE U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg',
    },
    {
      title: 'Israel',
      code: 'IL',
      emoji: '🇮🇱',
      unicode: 'U+1F1EE U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IL.svg',
    },
    {
      title: 'Isle of Man',
      code: 'IM',
      emoji: '🇮🇲',
      unicode: 'U+1F1EE U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IM.svg',
    },
    {
      title: 'India',
      code: 'IN',
      emoji: '🇮🇳',
      unicode: 'U+1F1EE U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg',
    },
    {
      title: 'British Indian Ocean Territory',
      code: 'IO',
      emoji: '🇮🇴',
      unicode: 'U+1F1EE U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IO.svg',
    },
    {
      title: 'Iraq',
      code: 'IQ',
      emoji: '🇮🇶',
      unicode: 'U+1F1EE U+1F1F6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg',
    },
    {
      title: 'Iran',
      code: 'IR',
      emoji: '🇮🇷',
      unicode: 'U+1F1EE U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg',
    },
    {
      title: 'Iceland',
      code: 'IS',
      emoji: '🇮🇸',
      unicode: 'U+1F1EE U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg',
    },
    {
      title: 'Italy',
      code: 'IT',
      emoji: '🇮🇹',
      unicode: 'U+1F1EE U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg',
    },
    {
      title: 'Jersey',
      code: 'JE',
      emoji: '🇯🇪',
      unicode: 'U+1F1EF U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JE.svg',
    },
    {
      title: 'Jamaica',
      code: 'JM',
      emoji: '🇯🇲',
      unicode: 'U+1F1EF U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg',
    },
    {
      title: 'Jordan',
      code: 'JO',
      emoji: '🇯🇴',
      unicode: 'U+1F1EF U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg',
    },
    {
      title: 'Japan',
      code: 'JP',
      emoji: '🇯🇵',
      unicode: 'U+1F1EF U+1F1F5',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg',
    },
    {
      title: 'Kenya',
      code: 'KE',
      emoji: '🇰🇪',
      unicode: 'U+1F1F0 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg',
    },
    {
      title: 'Kyrgyzstan',
      code: 'KG',
      emoji: '🇰🇬',
      unicode: 'U+1F1F0 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg',
    },
    {
      title: 'Cambodia',
      code: 'KH',
      emoji: '🇰🇭',
      unicode: 'U+1F1F0 U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg',
    },
    {
      title: 'Kiribati',
      code: 'KI',
      emoji: '🇰🇮',
      unicode: 'U+1F1F0 U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KI.svg',
    },
    {
      title: 'Comoros',
      code: 'KM',
      emoji: '🇰🇲',
      unicode: 'U+1F1F0 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg',
    },
    {
      title: 'St. Kitts & Nevis',
      code: 'KN',
      emoji: '🇰🇳',
      unicode: 'U+1F1F0 U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KN.svg',
    },
    {
      title: 'North Korea',
      code: 'KP',
      emoji: '🇰🇵',
      unicode: 'U+1F1F0 U+1F1F5',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg',
    },
    {
      title: 'South Korea',
      code: 'KR',
      emoji: '🇰🇷',
      unicode: 'U+1F1F0 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg',
    },
    {
      title: 'Kuwait',
      code: 'KW',
      emoji: '🇰🇼',
      unicode: 'U+1F1F0 U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg',
    },
    {
      title: 'Cayman Islands',
      code: 'KY',
      emoji: '🇰🇾',
      unicode: 'U+1F1F0 U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KY.svg',
    },
    {
      title: 'Kazakhstan',
      code: 'KZ',
      emoji: '🇰🇿',
      unicode: 'U+1F1F0 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg',
    },
    {
      title: 'Laos',
      code: 'LA',
      emoji: '🇱🇦',
      unicode: 'U+1F1F1 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg',
    },
    {
      title: 'Lebanon',
      code: 'LB',
      emoji: '🇱🇧',
      unicode: 'U+1F1F1 U+1F1E7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg',
    },
    {
      title: 'St. Lucia',
      code: 'LC',
      emoji: '🇱🇨',
      unicode: 'U+1F1F1 U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LC.svg',
    },
    {
      title: 'Liechtenstein',
      code: 'LI',
      emoji: '🇱🇮',
      unicode: 'U+1F1F1 U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg',
    },
    {
      title: 'Sri Lanka',
      code: 'LK',
      emoji: '🇱🇰',
      unicode: 'U+1F1F1 U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg',
    },
    {
      title: 'Liberia',
      code: 'LR',
      emoji: '🇱🇷',
      unicode: 'U+1F1F1 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg',
    },
    {
      title: 'Lesotho',
      code: 'LS',
      emoji: '🇱🇸',
      unicode: 'U+1F1F1 U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg',
    },
    {
      title: 'Lithuania',
      code: 'LT',
      emoji: '🇱🇹',
      unicode: 'U+1F1F1 U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg',
    },
    {
      title: 'Luxembourg',
      code: 'LU',
      emoji: '🇱🇺',
      unicode: 'U+1F1F1 U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg',
    },
    {
      title: 'Latvia',
      code: 'LV',
      emoji: '🇱🇻',
      unicode: 'U+1F1F1 U+1F1FB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg',
    },
    {
      title: 'Libya',
      code: 'LY',
      emoji: '🇱🇾',
      unicode: 'U+1F1F1 U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg',
    },
    {
      title: 'Morocco',
      code: 'MA',
      emoji: '🇲🇦',
      unicode: 'U+1F1F2 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg',
    },
    {
      title: 'Monaco',
      code: 'MC',
      emoji: '🇲🇨',
      unicode: 'U+1F1F2 U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg',
    },
    {
      title: 'Moldova',
      code: 'MD',
      emoji: '🇲🇩',
      unicode: 'U+1F1F2 U+1F1E9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg',
    },
    {
      title: 'Montenegro',
      code: 'ME',
      emoji: '🇲🇪',
      unicode: 'U+1F1F2 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg',
    },
    {
      title: 'St. Martin',
      code: 'MF',
      emoji: '🇲🇫',
      unicode: 'U+1F1F2 U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MF.svg',
    },
    {
      title: 'Madagascar',
      code: 'MG',
      emoji: '🇲🇬',
      unicode: 'U+1F1F2 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg',
    },
    {
      title: 'Marshall Islands',
      code: 'MH',
      emoji: '🇲🇭',
      unicode: 'U+1F1F2 U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MH.svg',
    },
    {
      title: 'North Macedonia',
      code: 'MK',
      emoji: '🇲🇰',
      unicode: 'U+1F1F2 U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg',
    },
    {
      title: 'Mali',
      code: 'ML',
      emoji: '🇲🇱',
      unicode: 'U+1F1F2 U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg',
    },
    {
      title: 'Myanmar (Burma)',
      code: 'MM',
      emoji: '🇲🇲',
      unicode: 'U+1F1F2 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg',
    },
    {
      title: 'Mongolia',
      code: 'MN',
      emoji: '🇲🇳',
      unicode: 'U+1F1F2 U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg',
    },
    {
      title: 'Macao SAR China',
      code: 'MO',
      emoji: '🇲🇴',
      unicode: 'U+1F1F2 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MO.svg',
    },
    {
      title: 'Northern Mariana Islands',
      code: 'MP',
      emoji: '🇲🇵',
      unicode: 'U+1F1F2 U+1F1F5',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MP.svg',
    },
    {
      title: 'Martinique',
      code: 'MQ',
      emoji: '🇲🇶',
      unicode: 'U+1F1F2 U+1F1F6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MQ.svg',
    },
    {
      title: 'Mauritania',
      code: 'MR',
      emoji: '🇲🇷',
      unicode: 'U+1F1F2 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg',
    },
    {
      title: 'Montserrat',
      code: 'MS',
      emoji: '🇲🇸',
      unicode: 'U+1F1F2 U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MS.svg',
    },
    {
      title: 'Malta',
      code: 'MT',
      emoji: '🇲🇹',
      unicode: 'U+1F1F2 U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg',
    },
    {
      title: 'Mauritius',
      code: 'MU',
      emoji: '🇲🇺',
      unicode: 'U+1F1F2 U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg',
    },
    {
      title: 'Maldives',
      code: 'MV',
      emoji: '🇲🇻',
      unicode: 'U+1F1F2 U+1F1FB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg',
    },
    {
      title: 'Malawi',
      code: 'MW',
      emoji: '🇲🇼',
      unicode: 'U+1F1F2 U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg',
    },
    {
      title: 'Mexico',
      code: 'MX',
      emoji: '🇲🇽',
      unicode: 'U+1F1F2 U+1F1FD',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg',
    },
    {
      title: 'Malaysia',
      code: 'MY',
      emoji: '🇲🇾',
      unicode: 'U+1F1F2 U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg',
    },
    {
      title: 'Mozambique',
      code: 'MZ',
      emoji: '🇲🇿',
      unicode: 'U+1F1F2 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg',
    },
    {
      title: 'Namibia',
      code: 'NA',
      emoji: '🇳🇦',
      unicode: 'U+1F1F3 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg',
    },
    {
      title: 'New Caledonia',
      code: 'NC',
      emoji: '🇳🇨',
      unicode: 'U+1F1F3 U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NC.svg',
    },
    {
      title: 'Niger',
      code: 'NE',
      emoji: '🇳🇪',
      unicode: 'U+1F1F3 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg',
    },
    {
      title: 'Norfolk Island',
      code: 'NF',
      emoji: '🇳🇫',
      unicode: 'U+1F1F3 U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NF.svg',
    },
    {
      title: 'Nigeria',
      code: 'NG',
      emoji: '🇳🇬',
      unicode: 'U+1F1F3 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg',
    },
    {
      title: 'Nicaragua',
      code: 'NI',
      emoji: '🇳🇮',
      unicode: 'U+1F1F3 U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg',
    },
    {
      title: 'Netherlands',
      code: 'NL',
      emoji: '🇳🇱',
      unicode: 'U+1F1F3 U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg',
    },
    {
      title: 'Norway',
      code: 'NO',
      emoji: '🇳🇴',
      unicode: 'U+1F1F3 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg',
    },
    {
      title: 'Nepal',
      code: 'NP',
      emoji: '🇳🇵',
      unicode: 'U+1F1F3 U+1F1F5',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg',
    },
    {
      title: 'Nauru',
      code: 'NR',
      emoji: '🇳🇷',
      unicode: 'U+1F1F3 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NR.svg',
    },
    {
      title: 'Niue',
      code: 'NU',
      emoji: '🇳🇺',
      unicode: 'U+1F1F3 U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NU.svg',
    },
    {
      title: 'New Zealand',
      code: 'NZ',
      emoji: '🇳🇿',
      unicode: 'U+1F1F3 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg',
    },
    {
      title: 'Oman',
      code: 'OM',
      emoji: '🇴🇲',
      unicode: 'U+1F1F4 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg',
    },
    {
      title: 'Panama',
      code: 'PA',
      emoji: '🇵🇦',
      unicode: 'U+1F1F5 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg',
    },
    {
      title: 'Peru',
      code: 'PE',
      emoji: '🇵🇪',
      unicode: 'U+1F1F5 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg',
    },
    {
      title: 'French Polynesia',
      code: 'PF',
      emoji: '🇵🇫',
      unicode: 'U+1F1F5 U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PF.svg',
    },
    {
      title: 'Papua New Guinea',
      code: 'PG',
      emoji: '🇵🇬',
      unicode: 'U+1F1F5 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg',
    },
    {
      title: 'Philippines',
      code: 'PH',
      emoji: '🇵🇭',
      unicode: 'U+1F1F5 U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg',
    },
    {
      title: 'Pakistan',
      code: 'PK',
      emoji: '🇵🇰',
      unicode: 'U+1F1F5 U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg',
    },
    {
      title: 'Poland',
      code: 'PL',
      emoji: '🇵🇱',
      unicode: 'U+1F1F5 U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg',
    },
    {
      title: 'St. Pierre & Miquelon',
      code: 'PM',
      emoji: '🇵🇲',
      unicode: 'U+1F1F5 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PM.svg',
    },
    {
      title: 'Pitcairn Islands',
      code: 'PN',
      emoji: '🇵🇳',
      unicode: 'U+1F1F5 U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PN.svg',
    },
    {
      title: 'Puerto Rico',
      code: 'PR',
      emoji: '🇵🇷',
      unicode: 'U+1F1F5 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PR.svg',
    },
    {
      title: 'Palestinian Territories',
      code: 'PS',
      emoji: '🇵🇸',
      unicode: 'U+1F1F5 U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg',
    },
    {
      title: 'Portugal',
      code: 'PT',
      emoji: '🇵🇹',
      unicode: 'U+1F1F5 U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg',
    },
    {
      title: 'Palau',
      code: 'PW',
      emoji: '🇵🇼',
      unicode: 'U+1F1F5 U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PW.svg',
    },
    {
      title: 'Paraguay',
      code: 'PY',
      emoji: '🇵🇾',
      unicode: 'U+1F1F5 U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg',
    },
    {
      title: 'Qatar',
      code: 'QA',
      emoji: '🇶🇦',
      unicode: 'U+1F1F6 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg',
    },
    {
      title: 'Réunion',
      code: 'RE',
      emoji: '🇷🇪',
      unicode: 'U+1F1F7 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RE.svg',
    },
    {
      title: 'Romania',
      code: 'RO',
      emoji: '🇷🇴',
      unicode: 'U+1F1F7 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg',
    },
    {
      title: 'Serbia',
      code: 'RS',
      emoji: '🇷🇸',
      unicode: 'U+1F1F7 U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg',
    },
    {
      title: 'Russia',
      code: 'RU',
      emoji: '🇷🇺',
      unicode: 'U+1F1F7 U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg',
    },
    {
      title: 'Rwanda',
      code: 'RW',
      emoji: '🇷🇼',
      unicode: 'U+1F1F7 U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg',
    },
    {
      title: 'Saudi Arabia',
      code: 'SA',
      emoji: '🇸🇦',
      unicode: 'U+1F1F8 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg',
    },
    {
      title: 'Solomon Islands',
      code: 'SB',
      emoji: '🇸🇧',
      unicode: 'U+1F1F8 U+1F1E7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SB.svg',
    },
    {
      title: 'Seychelles',
      code: 'SC',
      emoji: '🇸🇨',
      unicode: 'U+1F1F8 U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg',
    },
    {
      title: 'Sudan',
      code: 'SD',
      emoji: '🇸🇩',
      unicode: 'U+1F1F8 U+1F1E9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg',
    },
    {
      title: 'Sweden',
      code: 'SE',
      emoji: '🇸🇪',
      unicode: 'U+1F1F8 U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg',
    },
    {
      title: 'Singapore',
      code: 'SG',
      emoji: '🇸🇬',
      unicode: 'U+1F1F8 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg',
    },
    {
      title: 'St. Helena',
      code: 'SH',
      emoji: '🇸🇭',
      unicode: 'U+1F1F8 U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SH.svg',
    },
    {
      title: 'Slovenia',
      code: 'SI',
      emoji: '🇸🇮',
      unicode: 'U+1F1F8 U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg',
    },
    {
      title: 'Svalbard & Jan Mayen',
      code: 'SJ',
      emoji: '🇸🇯',
      unicode: 'U+1F1F8 U+1F1EF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SJ.svg',
    },
    {
      title: 'Slovakia',
      code: 'SK',
      emoji: '🇸🇰',
      unicode: 'U+1F1F8 U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg',
    },
    {
      title: 'Sierra Leone',
      code: 'SL',
      emoji: '🇸🇱',
      unicode: 'U+1F1F8 U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg',
    },
    {
      title: 'San Marino',
      code: 'SM',
      emoji: '🇸🇲',
      unicode: 'U+1F1F8 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg',
    },
    {
      title: 'Senegal',
      code: 'SN',
      emoji: '🇸🇳',
      unicode: 'U+1F1F8 U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg',
    },
    {
      title: 'Somalia',
      code: 'SO',
      emoji: '🇸🇴',
      unicode: 'U+1F1F8 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg',
    },
    {
      title: 'Surititle',
      code: 'SR',
      emoji: '🇸🇷',
      unicode: 'U+1F1F8 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg',
    },
    {
      title: 'South Sudan',
      code: 'SS',
      emoji: '🇸🇸',
      unicode: 'U+1F1F8 U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SS.svg',
    },
    {
      title: 'São Tomé & Príncipe',
      code: 'ST',
      emoji: '🇸🇹',
      unicode: 'U+1F1F8 U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ST.svg',
    },
    {
      title: 'El Salvador',
      code: 'SV',
      emoji: '🇸🇻',
      unicode: 'U+1F1F8 U+1F1FB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg',
    },
    {
      title: 'Sint Maarten',
      code: 'SX',
      emoji: '🇸🇽',
      unicode: 'U+1F1F8 U+1F1FD',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SX.svg',
    },
    {
      title: 'Syria',
      code: 'SY',
      emoji: '🇸🇾',
      unicode: 'U+1F1F8 U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg',
    },
    {
      title: 'Eswatini',
      code: 'SZ',
      emoji: '🇸🇿',
      unicode: 'U+1F1F8 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg',
    },
    {
      title: 'Tristan da Cunha',
      code: 'TA',
      emoji: '🇹🇦',
      unicode: 'U+1F1F9 U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TA.svg',
    },
    {
      title: 'Turks & Caicos Islands',
      code: 'TC',
      emoji: '🇹🇨',
      unicode: 'U+1F1F9 U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TC.svg',
    },
    {
      title: 'Chad',
      code: 'TD',
      emoji: '🇹🇩',
      unicode: 'U+1F1F9 U+1F1E9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg',
    },
    {
      title: 'French Southern Territories',
      code: 'TF',
      emoji: '🇹🇫',
      unicode: 'U+1F1F9 U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TF.svg',
    },
    {
      title: 'Togo',
      code: 'TG',
      emoji: '🇹🇬',
      unicode: 'U+1F1F9 U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg',
    },
    {
      title: 'Thailand',
      code: 'TH',
      emoji: '🇹🇭',
      unicode: 'U+1F1F9 U+1F1ED',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg',
    },
    {
      title: 'Tajikistan',
      code: 'TJ',
      emoji: '🇹🇯',
      unicode: 'U+1F1F9 U+1F1EF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg',
    },
    {
      title: 'Tokelau',
      code: 'TK',
      emoji: '🇹🇰',
      unicode: 'U+1F1F9 U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TK.svg',
    },
    {
      title: 'Timor-Leste',
      code: 'TL',
      emoji: '🇹🇱',
      unicode: 'U+1F1F9 U+1F1F1',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TL.svg',
    },
    {
      title: 'Turkmenistan',
      code: 'TM',
      emoji: '🇹🇲',
      unicode: 'U+1F1F9 U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg',
    },
    {
      title: 'Tunisia',
      code: 'TN',
      emoji: '🇹🇳',
      unicode: 'U+1F1F9 U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg',
    },
    {
      title: 'Tonga',
      code: 'TO',
      emoji: '🇹🇴',
      unicode: 'U+1F1F9 U+1F1F4',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TO.svg',
    },
    {
      title: 'Turkey',
      code: 'TR',
      emoji: '🇹🇷',
      unicode: 'U+1F1F9 U+1F1F7',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg',
    },
    {
      title: 'Trinidad & Tobago',
      code: 'TT',
      emoji: '🇹🇹',
      unicode: 'U+1F1F9 U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg',
    },
    {
      title: 'Tuvalu',
      code: 'TV',
      emoji: '🇹🇻',
      unicode: 'U+1F1F9 U+1F1FB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TV.svg',
    },
    {
      title: 'Taiwan',
      code: 'TW',
      emoji: '🇹🇼',
      unicode: 'U+1F1F9 U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TW.svg',
    },
    {
      title: 'Tanzania',
      code: 'TZ',
      emoji: '🇹🇿',
      unicode: 'U+1F1F9 U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg',
    },
    {
      title: 'Ukraine',
      code: 'UA',
      emoji: '🇺🇦',
      unicode: 'U+1F1FA U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg',
    },
    {
      title: 'Uganda',
      code: 'UG',
      emoji: '🇺🇬',
      unicode: 'U+1F1FA U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg',
    },
    {
      title: 'U.S. Outlying Islands',
      code: 'UM',
      emoji: '🇺🇲',
      unicode: 'U+1F1FA U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UM.svg',
    },
    {
      title: 'United Nations',
      code: 'UN',
      emoji: '🇺🇳',
      unicode: 'U+1F1FA U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UN.svg',
    },
    {
      title: 'United States',
      code: 'US',
      emoji: '🇺🇸',
      unicode: 'U+1F1FA U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg',
    },
    {
      title: 'Uruguay',
      code: 'UY',
      emoji: '🇺🇾',
      unicode: 'U+1F1FA U+1F1FE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg',
    },
    {
      title: 'Uzbekistan',
      code: 'UZ',
      emoji: '🇺🇿',
      unicode: 'U+1F1FA U+1F1FF',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg',
    },
    {
      title: 'Vatican City',
      code: 'VA',
      emoji: '🇻🇦',
      unicode: 'U+1F1FB U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VA.svg',
    },
    {
      title: 'St. Vincent & Grenadines',
      code: 'VC',
      emoji: '🇻🇨',
      unicode: 'U+1F1FB U+1F1E8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VC.svg',
    },
    {
      title: 'Venezuela',
      code: 'VE',
      emoji: '🇻🇪',
      unicode: 'U+1F1FB U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg',
    },
    {
      title: 'British Virgin Islands',
      code: 'VG',
      emoji: '🇻🇬',
      unicode: 'U+1F1FB U+1F1EC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VG.svg',
    },
    {
      title: 'U.S. Virgin Islands',
      code: 'VI',
      emoji: '🇻🇮',
      unicode: 'U+1F1FB U+1F1EE',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VI.svg',
    },
    {
      title: 'Vietnam',
      code: 'VN',
      emoji: '🇻🇳',
      unicode: 'U+1F1FB U+1F1F3',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg',
    },
    {
      title: 'Vanuatu',
      code: 'VU',
      emoji: '🇻🇺',
      unicode: 'U+1F1FB U+1F1FA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VU.svg',
    },
    {
      title: 'Wallis & Futuna',
      code: 'WF',
      emoji: '🇼🇫',
      unicode: 'U+1F1FC U+1F1EB',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WF.svg',
    },
    {
      title: 'Samoa',
      code: 'WS',
      emoji: '🇼🇸',
      unicode: 'U+1F1FC U+1F1F8',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WS.svg',
    },
    {
      title: 'Kosovo',
      code: 'XK',
      emoji: '🇽🇰',
      unicode: 'U+1F1FD U+1F1F0',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/XK.svg',
    },
    {
      title: 'Yemen',
      code: 'YE',
      emoji: '🇾🇪',
      unicode: 'U+1F1FE U+1F1EA',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg',
    },
    {
      title: 'Mayotte',
      code: 'YT',
      emoji: '🇾🇹',
      unicode: 'U+1F1FE U+1F1F9',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg',
    },
    {
      title: 'South Africa',
      code: 'ZA',
      emoji: '🇿🇦',
      unicode: 'U+1F1FF U+1F1E6',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg',
    },
    {
      title: 'Zambia',
      code: 'ZM',
      emoji: '🇿🇲',
      unicode: 'U+1F1FF U+1F1F2',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg',
    },
    {
      title: 'Zimbabwe',
      code: 'ZW',
      emoji: '🇿🇼',
      unicode: 'U+1F1FF U+1F1FC',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg',
    },
    {
      title: 'England',
      code: 'ENGLAND',
      emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      unicode: 'U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ENGLAND.svg',
    },
    {
      title: 'Scotland',
      code: 'SCOTLAND',
      emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
      unicode: 'U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SCOTLAND.svg',
    },
    {
      title: 'Wales',
      code: 'WALES',
      emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
      unicode: 'U+1F3F4 U+E0067 U+E0062 U+E0077 U+E006C U+E0073 U+E007F',
      image:
        'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WALES.svg',
    },
  ],

  step1Data: [
    {key: '1', title: 'Challenge Yourself', selected: false},
    {key: '2', title: 'Challenge Groups', selected: false},
    {key: '3', title: 'Challenge Friends', selected: false},
  ],

  step2Data: [
    {
      id: 1,
      title: 'Custom\nChallenge',
      // time: '30 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#E4DBFF',
      selected: false,
    },
    {
      id: 2,
      title: 'Forehand',
      time: '30 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#DBE9FF',
      selected: false,
    },
    {
      id: 3,
      title: 'Smash',
      time: '30 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#FFEBD4',
      selected: false,
    },
    {
      id: 4,
      title: 'Backhand',
      time: '20 Min',
      image: require('../assets/images/image1.png'),
      bgColor: '#E4DBFF',
      selected: false,
    },
  ],

  step3Data: [
    {key: '1', title: 'In a row', selected: false},
    {key: '2', title: 'Minutes', selected: false},
    {key: '3', title: 'Km/h', selected: false},
    {key: '4', title: 'In total', selected: false},
    {key: '5', title: 'KG', selected: false},
    {key: '6', title: 'Reps', selected: false},
    {key: '7', title: 'Targets', selected: false},
  ],

  step4Data: [
    {key: '1', title: '10 in a Row', selected: false},
    {key: '2', title: '100 Kg with Weight', selected: false},
    {key: '3', title: '5 in a Row', selected: false},
    {key: '4', title: '5 mins long with time', selected: false},
  ],

  step5Data: [
    {key: '1', title: 'Challenge Yourself', selected: false},
    {key: '2', title: 'Challenge Groups', selected: false},
    {key: '3', title: 'Challenge Friends', selected: false},
  ],

  groupsData: [
    {id: '1', title: 'Tennis Group', selected: false},
    {id: '2', title: 'All England Club', selected: false},
    {id: '3', title: 'Ronald Garr Group', selected: false},
    {id: '4', title: 'Cross League Club', selected: false},
  ],

  friendsData: [
    {id: '1', title: 'Jane Cooper', selected: false},
    {id: '2', title: 'Robert Smith', selected: false},
    {id: '3', title: 'James Smith', selected: false},
    {id: '4', title: 'David Hernz', selected: false},
    {id: '5', title: 'Maria Rodriguez', selected: false},
    {id: '6', title: 'Mary Hernandez', selected: false},
  ],

  communityData: [
    {
      id: '1',
      name: 'John Doe',
      desc: 'Tenis Forehand Techinque!',
      postTime: '8 mins ago',
      playTime: '12 Mins',
      playTechnique: 'Technique',
      playCount: '7 Exercises',
      userImage: require('../assets/images/userImg1.png'),
      image: require('../assets/images/post1.png'),
      likes: 65,
      comments: 2,
    },
    {
      id: '2',
      name: 'Ronnie Wright',
      desc: 'Tenis Backhand Techinque!',
      postTime: '15 mins ago',
      playTime: '12 Mins',
      playTechnique: 'Technique',
      playCount: '7 Exercises',
      userImage: require('../assets/images/userImg2.png'),
      image: require('../assets/images/post2.png'),
      likes: 107,
      comments: 2,
    },
  ],

  communityModalData: [
    {
      id: '1',
      title: 'Create New Post',
    },
    {
      id: '2',
      title: 'Create New Group',
    },
  ],

  communityPostMoreOpts: [
    {
      id: '1',
      title: 'Edit Post',
    },
    {
      id: '2',
      title: 'Delete Post',
    },
  ],

  listTab: [
    {
      id: '1',
      status: 'Received',
    },
    {
      id: '2',
      status: 'Sent',
    },
  ],
  groupTabs: [
    {
      id: '1',
      status: 'Public',
    },
    {
      id: '2',
      status: 'Private',
    },
  ],

  recievedListData: [
    {
      id: '1',
      title: 'Robert James',
      time: '5 hours ago',
      image: require('../assets/images/userImg1.png'),
    },
    {
      id: '2',
      title: 'David Henz',
      time: '8 hours ago',
      image: require('../assets/images/userImg1.png'),
    },
    {
      id: '3',
      title: 'Jane Cooper',
      time: '10 hours ago',
      image: require('../assets/images/userImg1.png'),
    },
  ],

  sentListData: [
    {
      id: '1',
      title: 'Robert James',
      time: '5 hours ago',
      image: require('../assets/images/userImg1.png'),
    },
    {
      id: '2',
      title: 'David Henz',
      time: '8 hours ago',
      image: require('../assets/images/userImg1.png'),
    },
    {
      id: '3',
      title: 'Jane Cooper',
      time: '10 hours ago',
      image: require('../assets/images/userImg1.png'),
    },
  ],

  favorites: [
    {
      id: 1,
      title: 'Forehand Exercise',
      time: '10 Mins',
      technique: 'Technique',
    },
    {
      id: 2,
      title: 'Classic vs Modern',
      time: '12 Mins',
      technique: 'Technique',
    },
  ],

  notifications: [
    {
      id: 1,
      title: 'Ronnie liked your post',
      time: '5 hours ago',
      image: require('../assets/images/userImg1.png'),
      status: 1,
    },
    {
      id: 2,
      title: 'Alexa is now your friend',
      time: '10 hours ago',
      image: require('../assets/images/userImg1.png'),
      status: 2,
    },
    {
      id: 3,
      title: 'Robert James sent you a friend request',
      time: '6 hours ago',
      image: require('../assets/images/userImg1.png'),
      status: 3,
    },
  ],

  sports: [
    {
      id: 1,
      title: 'Tennis',
      selected: false,
    },
    {
      id: 2,
      title: 'Pedal',
      selected: false,
    },
  ],

  gameType: [
    {
      id: 1,
      title: 'Singles',
      selected: false,
    },
    {
      id: 2,
      title: 'Doubles',
      selected: false,
    },
  ],

  objectives: [
    {
      id: 1,
      title: 'Technique',
      selected: false,
    },
    {
      id: 2,
      title: 'Tactics',
      selected: false,
    },
    {
      id: 3,
      title: 'Physical',
      selected: false,
    },
    {
      id: 4,
      title: 'Mental',
      selected: false,
    },
  ],

  situation: [
    {
      id: 1,
      title: 'Baseline',
      selected: false,
    },
    {
      id: 2,
      title: 'Service',
      selected: false,
    },
    {
      id: 3,
      title: 'Return',
      selected: false,
    },
    {
      id: 4,
      title: 'Net Play',
      selected: false,
    },
  ],

  shots: [
    {
      id: 1,
      title: 'Forehand',
      selected: false,
    },
    {
      id: 2,
      title: 'Backhand',
      selected: false,
    },
    {
      id: 4,
      title: '1st Service',
      selected: false,
    },
    {
      id: 5,
      title: '2nd Service',
      selected: false,
    },
  ],

  abilities: [
    {
      id: 1,
      title: 'Speed',
      selected: false,
    },
    {
      id: 2,
      title: 'Direction',
      selected: false,
    },
    {
      id: 4,
      title: 'Rotation',
      selected: false,
    },
    {
      id: 5,
      title: 'Consistence',
      selected: false,
    },
  ],

  physicalQualities: [
    {
      id: 1,
      title: 'Strength',
      selected: false,
    },
    {
      id: 2,
      title: 'Flexibility',
      selected: false,
    },
    {
      id: 4,
      title: 'Endurance',
      selected: false,
    },
  ],
};
