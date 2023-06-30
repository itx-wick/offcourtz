import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ChatCard from '../../components/chatCard';
import {FlatList} from 'react-native-gesture-handler';
import ChatInput from '../../components/chatInput';
import {useDispatch, useSelector} from 'react-redux';
import {theme} from '../../theme';
import {Platform} from 'react-native';
import {screenWidth} from '../../constants';
import {fontFamily, fontSize} from '../../constants/fontDecorations';
import {SvgXml} from 'react-native-svg';
import {svgImages} from '../../helpers';
import {setLoader} from '../../redux/reducers/commonSlice';
import {Commons} from '../../utils';
import ApiService from '../../services/ApiService';
import {END_POINTS} from '../../config';
import {useToast} from 'react-native-toast-notifications';

const ChatScreen = props => {
  const group = props.route.params;
  const toast = useToast();
  const dispatch = useDispatch();
  const isLoader = useSelector(state => state.Common.loader);
  const authToken = useSelector(state => state.Auth.token);
  const user = useSelector(state => state.Auth.user);
  const [messages, setMessages] = useState(group.messages);
  const [message, setMessage] = useState();

  useEffect(() => {
    console.log(JSON.stringify(group, null, 2));
  }, []);

  const triggerSendMessage = () => {
    if (message) {
      process();
    }
    setMessage('');
  };

  const process = async () => {
    try {
      let body = {
        groupId: group._id,
        text: message,
      };
      if (!isLoader) {
        dispatch(setLoader(true));
      }
      await ApiService.post(END_POINTS.sendGroupMsg, body, authToken)
        .then(res => {
          console.log('Send Message Response', res);
          fetchGroupData();
        })
        .catch(err => {
          dispatch(setLoader(false));
          showToast('normal', err, 3000);
          console.log('promise error', err);
        });
    } catch (error) {
      showToast('normal', error, 3000);
      console.log('try/catch', error);
    }
  };

  const fetchGroupData = async () => {
    if (!isLoader) {
      dispatch(setLoader(true));
    }
    await ApiService.get(END_POINTS.fetchGroup, authToken, group._id)
      .then(res => {
        console.log('Fetch Group Data', res.data);
        setMessages(res.data.messages);
        dispatch(setLoader(false));
      })
      .catch(err => {
        dispatch(setLoader(false));
        console.log('promise error', err);
      });
  };

  const showToast = (type, msg, duration) => {
    toast.show(msg, {
      type: type,
      placement: 'bottom',
      duration: duration,
      offset: 30,
      animationType: 'zoom-in',
    });
  };

  const navigateBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerMainContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={navigateBack}
            style={{position: 'absolute', left: 15}}>
            <SvgXml width="36" height="36 " xml={svgImages.back} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{group.title}</Text>
        </View>
        <View style={styles.underlineView} />
      </View>
      <FlatList
        contentContainerStyle={{flex: 1, justifyContent: 'flex-end'}}
        data={messages}
        renderItem={message => (
          <ChatCard
            selfMessage={message.item.user._id === user._id}
            text={message.item.text}
          />
        )}
      />
      <ChatInput
        msgValue={message}
        onChangeText={message => setMessage(message)}
        onClick={() => triggerSendMessage()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerMainContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0.12 * screenWidth : 0.04 * screenWidth,
  },
  headContainer: {
    flexDirection: 'row',
    height: 0.12 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
  },
  headerTitle: {
    fontFamily: fontFamily.argentum_sans,
    fontWeight: '500',
    fontSize: fontSize.verbiage_20,
    color: theme.colors.secondaryBlack,
  },
  underlineView: {
    width: screenWidth,
    height: 1,
    backgroundColor: theme.colors.gray1,
    marginVertical: 10,
  },
});

export default ChatScreen;
