import { useState } from 'react';
import { View, Text, Pressable, Button } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { reminderActivate, reminderSetTime } from 'store/reminder';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// import notifee from '@notifee/react-native';

const ReminderScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Reminder'>) => {
  const dispatch = useDispatch();
  const reminder = useSelector((state: RootState) => state.reminderReducer);

  const [open, setOpen] = useState(false);
  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'Notification Title',
  //     body: 'Main body content of the notification',
  //     android: {
  //       channelId,
  //       smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //   });
  // }

  return (
    <View style={{ flex: 1, backgroundColor: '#36393f' }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          top: 0,
          width: '100%',
          height: 58,

          backgroundColor: '#292B2F',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', left: 10 }}>
          <Pressable style={{}} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcon
              name="keyboard-backspace"
              size={26}
              color="#DCDDDE"
            />
          </Pressable>
          <Text
            style={{
              color: '#DCDDDE',
              fontWeight: '500',
              fontSize: 16,
              left: 4,
            }}>
            Reminder
          </Text>
        </View>
      </View>
      <View style={{ top: 58, alignItems: 'center' }}>
        <Pressable
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => dispatch(reminderActivate())}>
          <Text
            style={{
              marginLeft: 10,
              color: reminder.active ? '#DCDDDE' : '#ABB0B6',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Active: {reminder.active ? 'yes' : 'no'}
          </Text>
        </Pressable>
        <View
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#2f3136',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: 10,
              color: reminder.active ? '#DCDDDE' : '#ABB0B6',
              fontWeight: '500',
              fontSize: 16,
            }}>
            {moment(reminder.time).format('HH:mm')}
          </Text>
        </View>
        <Pressable
          style={{
            height: 42,
            width: '95%',
            backgroundColor: '#202225',
            marginVertical: 4,
            borderRadius: 8,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setOpen(true);
          }}>
          <Text
            style={{
              marginLeft: 10,
              color: reminder.active ? '#DCDDDE' : '#ABB0B6',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Set Time
          </Text>
        </Pressable>
        <DatePicker
          modal
          open={open}
          date={new Date(reminder.time)}
          mode={'time'}
          onConfirm={date => {
            setOpen(false);
            dispatch(reminderSetTime({ newTime: date.toString() }));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};

export default ReminderScreen;
