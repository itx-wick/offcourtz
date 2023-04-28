import React, {useRef} from 'react';
import {
  Alert,
  Animated,
  FlatList,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {screenHeight, screenWidth} from '../../constants';
import Paginator from '../../components/paginator';
import Button from '../../components/button';
import {svgImages} from '../../helpers';
import {SvgXml} from 'react-native-svg';
import {fontSize} from '../../constants/fontDecorations';
import {screens} from '../../config';
import {theme} from '../../theme';
const {colors} = theme;

const GetStarted = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const openUrl = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const DATA = [
    {
      id: '1',
      image: require('../../assets/images/onboarding1.png'),
    },
    {
      id: '2',
      image: require('../../assets/images/onboarding2.png'),
    },
    {
      id: '3',
      image: require('../../assets/images/onboarding3.png'),
    },
  ];

  const Item = ({image}) => (
    <ImageBackground style={styles.item} source={image}></ImageBackground>
  );

  const renderItem = ({item}) => (
    <Item title={item.title} image={item.image} scrollX={scrollX} />
  );

  return (
    <View>
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        ref={slidesRef}
      />
      <View style={styles.headContainer}>
        <SvgXml width="125" height="55" xml={svgImages.logo} />

        <Button
          title={'LOGIN'}
          btnWidth={screenWidth * 0.25}
          btnHeight={40}
          titleColor={colors.black}
          backgroundColor={colors.white}
          onPress={() => navigation.navigate(screens.login)}
        />
      </View>
      <View style={styles.btnContainer}>
        <Paginator data={DATA} scrollX={scrollX} />

        <View style={styles.btn}>
          <Button
            title={'SIGN UP WITH EMAIL'}
            onPress={() => navigation.navigate(screens.signUp)}
            backgroundColor={colors.secondaryBlack}
          />
        </View>
        <View style={styles.socialBtns}>
          <Button
            title={'FACEBOOK'}
            onPress={() => {
              openUrl('https://www.facebook.com');
            }}
            iconHeight={26}
            iconWidth={26}
            icon={svgImages.facebook}
            btnWidth={screenWidth * 0.43}
            backgroundColor={'rgba(52, 52, 52, 0.4)'}
            titleStyle={{fontSize: fontSize.verbiage, paddingHorizontal: 7}}
          />
          <Button
            title={'GOOGLE'}
            iconHeight={26}
            iconWidth={26}
            icon={svgImages.google}
            onPress={() => {
              openUrl('https://www.google.com');
            }}
            btnWidth={screenWidth * 0.43}
            backgroundColor={'rgba(52, 52, 52, 0.4)'}
            titleStyle={{fontSize: fontSize.verbiage, paddingHorizontal: 7}}
          />
        </View>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  headContainer: {
    flexDirection: 'row',
    marginTop: 0.01 * screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth,
    position: 'absolute',
    paddingHorizontal: 25,
    top: Platform.OS === 'ios' ? 40 : 10,
  },
  item: {
    height: screenHeight,
    width: screenWidth,
  },
  btn: {
    marginTop: 0.035 * screenHeight,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    margin: 10,
  },
  btnContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: Platform.OS === 'ios' ? 50 : 20,
    marginVertical: 5,
  },
  socialBtns: {
    flexDirection: 'row',
    marginTop: 0.01 * screenHeight,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: screenWidth * 0.9,
  },
});
