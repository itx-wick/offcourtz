import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import {theme} from '../../theme';
import {screenWidth} from '../../constants';

function CustomModal({open, onClose, title, desc}) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: screenWidth * 0.8,
              paddingBottom: 50,
            }}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  color: theme.colors.primary,
                }}>
                ✖
              </Text>
            </Pressable>
            <Text
              style={{
                fontSize: 24,
                color: theme.colors.primary,
                textAlign: 'center',
              }}>
              {title}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '400',
                color: '#8F9BB3',
                paddingVertical: 10,
              }}>
              {desc}
            </Text>
            <View
              style={{
                width: '90%',
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 20,
                borderColor: '#05B678',
                alignSelf: 'center',
              }}>
              <View>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: 'white',
                      paddingTop: 25,
                      alignSelf: 'center',
                    }}></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomModal;
