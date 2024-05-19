import { useState } from 'react';
import { View, Text, Pressable, Button } from 'react-native';

import type { RootStackScreenProps } from 'navigation/types';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

import { useStyles } from 'hooks/useStyles';
import { reminderActivate, reminderSetTime } from 'store/reminder';

import MyBackground from 'components/custom/MyBackground';
import MyTopBar from 'components/custom/MyTopBar';
import MyButton from 'components/custom/MyButton';
import MyText from 'components/custom/MyText';

import DatePicker from 'react-native-date-picker';
import notifee, {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';

function getNextTimestamp(serializedDate: string): number {
  const currentDate = new Date();
  const scheduledDate = new Date(Date.parse(serializedDate));

  // If the scheduled date has already passed, add a day to it
  if (scheduledDate < currentDate) {
    scheduledDate.setDate(scheduledDate.getDate() + 1);
  }

  // Convert the scheduled date to a timestamp
  const timestamp = scheduledDate.getTime();

  return timestamp;
}

const ReminderScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'Reminder'>) => {
  const { styles } = useStyles();
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

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: getNextTimestamp(reminder.date),
      repeatFrequency: RepeatFrequency.DAILY,
      alarmManager: {
        allowWhileIdle: true,
      },
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
    <MyBackground>
      <MyTopBar backButton={true} title="Settings" />
      <View style={{ alignItems: 'center' }}>
        <MyButton
          onPress={() => {
            if (!reminder.active) {
              activateNotification();
            } else {
              cancelNotification();
            }
            dispatch(reminderActivate());
          }}
          style={{ marginTop: 8 }}>
          <MyText
            style={{
              marginLeft: 10,
              fontWeight: '500',
              fontSize: 16,
              color: reminder.active
                ? styles.colors.paletteTextMain
                : styles.colors.paletteTextLight,
            }}
            text={`Active: ${reminder.active ? 'yes' : 'no'}`}
          />
        </MyButton>

        <MyButton
          onPress={() => {
            setOpen(true);
          }}
          style={{ marginTop: 8 }}>
          <MyText
            style={{
              marginLeft: 10,
              fontWeight: '500',
              fontSize: 16,
              color: reminder.active
                ? styles.colors.paletteTextMain
                : styles.colors.paletteTextLight,
            }}
            text={new Date(Date.parse(reminder.date)).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
        </MyButton>

        <DatePicker
          modal
          open={open}
          date={new Date(Date.now())}
          mode={'time'}
          onConfirm={date => {
            setOpen(false);
            dispatch(reminderSetTime({ newTime: date.toISOString() }));
            if (reminder.active) {
              activateNotification();
            }
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </MyBackground>
  );
};

export default ReminderScreen;
