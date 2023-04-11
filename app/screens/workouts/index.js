import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {svgImages} from '../../helpers';
import {theme} from '../../theme';
import {screenHeight, screenWidth} from '../../constants';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import FAB from '../../components/fab';
import TextField from '../../components/textField';
import AppFlatlist from '../../components/appFlatlist';
import {Commons} from '../../utils';

function Workouts({navigation}) {
  const [filter, setFilter] = React.useState({});
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '10%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SvgXml
              width={0.12 * screenWidth}
              height={0.12 * screenWidth}
              xml={svgImages.logoIcon}
            />
          </TouchableOpacity>
          <View style={{width: '90%', alignItems: 'flex-end'}}>
            <TextField
              inputWidth={0.8 * screenWidth}
              height={0.12 * screenWidth}
              borderColor={theme.colors.greyText}
              borderRadius={0.4 * screenWidth}
              searchIcon={svgImages.searchIcon}
              filterIcon={svgImages.filterIcon}
              placeholder={'Search'}
              showPassword={false}
              paddingHorizontal={10}
              type={'search'}
            />
          </View>
        </View>
      </View>
      <View style={styles.headSeperator} />

      {/* // Part of see all section left side */}
      <AppFlatlist
        horizontal
        style={{width: screenWidth, paddingHorizontal: 10}}
        ListFooterComponent={<View />}
        data={Commons.workoutsFilter}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              height: 0.1 * screenWidth,
              borderRadius: 0.1 * screenWidth,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              marginHorizontal: 5,
              borderWidth: 2,
              borderColor: theme.colors.gray1,
              backgroundColor:
                item.value === filter.value
                  ? theme.colors.primary
                  : theme.colors.transparent,
            }}
            onPress={() => {
              setFilter(item);
            }}>
            <Text style={{fontFamily: fontFamily.argentum_sans}}>
              {item.value}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <Text style={styles.screenTitle}>Workouts</Text>
        <AppFlatlist
          style={{
            marginTop: 15,
            marginBottom: 10,
          }}
          data={Commons.workouts}
          ListFooterComponent={<View />}
          height={screenHeight}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: `${item.bgColor}`,
                marginHorizontal: 15,
                borderRadius: 20,
                marginVertical: 5,
              }}
              onPress={() => {}}>
              <View>
                <Text
                  style={{
                    fontFamily: fontFamily.argentum_sans,
                    fontSize: fontSize.verbiage_24,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>{`${item.title}`}</Text>
                {item.time && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <SvgXml xml={svgImages.clock} style={{marginRight: 5}} />
                    <Text
                      style={{
                        fontFamily: fontFamily.argentum_sans,
                        fontSize: fontSize.verbiage_medium,
                      }}>{`${item.time}`}</Text>
                  </View>
                )}
              </View>
              {item.image}
            </TouchableOpacity>
          )}
        />
      </View>
      <FAB onPress={() => {}} icon={svgImages.add} />
    </View>
  );
}
export default Workouts;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: screenWidth,
    backgroundColor: theme.colors.whisper,
  },
  headerMainContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginTop: 0.12 * screenWidth,
  },
  headContainer: {
    flexDirection: 'row',
    marginTop: 0.01 * screenHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth,
    paddingHorizontal: 15,
  },
  headSeperator: {
    height: 2,
    width: screenWidth,
    backgroundColor: theme.colors.gray1,
    marginVertical: 15,
  },
  screenTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: 'bold',
    fontSize: fontSize.verbiage_24,
    color: theme.colors.greyText,
    paddingHorizontal: 15,
    marginTop: 10,
  },
});