import React, {useRef} from 'react';
import {
  Animated,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {screenHeight, screenWidth} from '../../constants';
import Paginator from '../../components/paginator/paginator';
import Button from '../../components/button/button';
import lightTheme from '../../theme/light-theme';
import {svgImages} from '../../helpers';
import {SvgXml} from 'react-native-svg';

const GetStarted = props => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

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
    <ImageBackground style={styles.item} source={image}>
      {/* <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 0.01 * screenHeight,
            alignItems: 'center',
            justifyContent: 'center',
            width: screenWidth,
          }}>
          <SvgXml height="55" xml={svgImages.facebookSvg} />
          <SvgXml height="55" xml={svgImages.googleSvg} />
        </View>
      </SafeAreaView> */}
    </ImageBackground>
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
      <View
        style={{
          flexDirection: 'row',
          marginTop: 0.01 * screenHeight,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: screenWidth,
          position: 'absolute',
          paddingHorizontal: 25,
          top: 50,
        }}>
        <SvgXml width="125" height="55" xml={svgImages.logo} />

        <Button
          title={'Login'}
          onPress={() => {}}
          btnWidth={screenWidth * 0.25}
          btnHeight={40}
          titleColor={lightTheme.colors.black}
          backgroundColor={lightTheme.colors.white}
        />
      </View>
      <View style={styles.slidesFooter}>
        <Paginator data={DATA} scrollX={scrollX} />

        <View style={{marginTop: 0.03 * screenHeight}}>
          <Button
            title={'SIGN UP WITH EMAIL'}
            onPress={() => {}}
            backgroundColor={lightTheme.colors.secondaryBlack}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 0.01 * screenHeight,
            alignItems: 'center',
            justifyContent: 'center',
            width: screenWidth,
          }}>
          <SvgXml height="55" xml={svgImages.facebookSvg} />
          <SvgXml height="55" xml={svgImages.googleSvg} />
        </View>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  item: {
    height: screenHeight,
    width: screenWidth,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    margin: 10,
  },
  slidesFooter: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    bottom: 200,
  },
});
