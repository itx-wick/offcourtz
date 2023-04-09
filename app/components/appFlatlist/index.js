import React from 'react';
import {withTheme} from 'react-native-paper';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

function AppFlatlist(props) {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={props.keyboardVerticalOffset}
        behavior={props.behavior}>
        <FlatList
          contentContainerStyle={
            props.contentContainerStyle
              ? props.contentContainerStyle
              : styles.containerStyle
          }
          style={props.style ? props.style : null}
          numColumns={props.numColumns ? props.numColumns : null}
          data={props.data}
          keyExtractor={props.keyExtractor}
          showsHorizontalScrollIndicator={
            props.showsHorizontalScrollIndicator
              ? props.showsHorizontalScrollIndicator
              : false
          }
          showsVerticalScrollIndicator={
            props.showsVerticalScrollIndicator
              ? props.showsVerticalScrollIndicator
              : false
          }
          renderItem={props.renderItem}
          horizontal={props.horizontal ? props.horizontal : false}
          height={props.height ? props.height : null}
          onEndReachedThreshold={props.onEndReachedThreshold}
          onEndReached={props.onEndReached}
          ListFooterComponent={props.ListFooterComponent}
          ListHeaderComponent={props.ListHeaderComponent}
          ListFooterComponentStyle={props.ListFooterComponentStyle}
          removeClippedSubviews={props.removeClippedSubviews}
          onRefresh={props.onRefresh}
          refreshing={props.refreshing}
          refreshControl={props.refreshControl}
          onScroll={props.onScroll}
          onContentSizeChange={props.onContentSizeChange}
          ref={props.reference}
          bounces={props.bounces}
          onScrollBeginDrag={props.onScrollBeginDrag}
          onScrollEndDrag={props.onScrollEndDrag}
          nestedScrollEnabled={props.nestedScrollEnabled}
          decelerationRate={props.decelerationRate}
          scrollEventThrottle={props.scrollEventThrottle}
          stickyHeaderIndices={props.stickyHeaderIndices}
          initialScrollIndex={props.initialScrollIndex}
          scrollEnabled={props.scrollEnabled}
          ListEmptyComponent={props.ListEmptyComponent}
          extraData={props.extraData}
          onMomentumScrollBegin={props.onMomentumScrollBegin}
          onMomentumScrollEnd={props.onMomentumScrollEnd}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withTheme(AppFlatlist);

const styles = StyleSheet.create({
  containerStyle: {},
});
