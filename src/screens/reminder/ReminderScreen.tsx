import { useState } from 'react';
import { View, Text, Pressable, Button } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { reminderActivate, reminderSetTime } from 'store/reminder';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import notifee, {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';

const ReminderScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Reminder'>) => {
  const dispatch = useDispatch();
  const reminder = useSelector((state: RootState) => state.reminderReducer);

  const [open, setOpen] = useState(false);

  const activateNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const date = new Date(reminder.time); // get date of reminder
    const notifyDate = new Date(); // get current date
    notifyDate.setDate(notifyDate.getDate() + 1); // Add one day
    notifyDate.setHours(date.getHours()); // set the hours of reminder
    notifyDate.setMinutes(date.getMinutes()); // set the minutes of remidner

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: notifyDate.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    // Display a notification
    await notifee.createTriggerNotification(
      {
        id: '0',
        title: 'Inventory notification!',
        body: "It's time for inventory",
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );
  };

  const cancelNotification = () => {
    notifee
      .getTriggerNotificationIds()
      .then(async ids => await notifee.cancelTriggerNotifications(ids));
  };

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
          onPress={() => {
            if (!reminder.active) {
              activateNotification();
            } else {
              cancelNotification();
            }
            dispatch(reminderActivate());
          }}>
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
            {new Date(reminder.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
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
          date={new Date(Date.now())}
          mode={'time'}
          onConfirm={date => {
            setOpen(false);
            dispatch(reminderSetTime({ newTime: date.toString() }));
            if (reminder.active) {
              activateNotification();
            }
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
