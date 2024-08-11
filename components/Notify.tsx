import { View, Text, Button, Platform } from "react-native"
import * as Device from 'expo-device';
import * as Notificactions from 'expo-notifications';
import { useEffect, useRef, useState } from "react";
import Constants from 'expo-constants';

Notificactions.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
})

export default function Notify() {
    const [pushToken, setPushToken] = useState("")
    const [channel, setChannel] = useState<Notificactions.NotificationChannel[]>([])
    const [notification, setNotification] = useState<Notificactions.Notification|undefined>(undefined)
    const notificationListener = useRef<Notificactions.Subscription>()
    const responseListener = useRef<Notificactions.Subscription>()

    useEffect(()=>{
        registerForPushNotificationsAsync().then(token => token && setPushToken(token))
        if( Platform.OS === 'android') {
            Notificactions.getNotificationChannelsAsync().then(channels => setChannel(channels ?? []))
        }
        notificationListener.current = Notificactions.addNotificationReceivedListener(notification => {
            setNotification(notification)
        })

        responseListener.current = Notificactions.addNotificationResponseReceivedListener(response => {
            console.log(response)
        })

        return () => {
            notificationListener.current && Notificactions.removeNotificationSubscription(notificationListener.current)
            responseListener.current && Notificactions.removeNotificationSubscription(responseListener.current)
        }
    },[])



    const sendNotification = async () => {
        
            await Notificactions.scheduleNotificationAsync({
                content: {
                    title: "My first local notification",
                    body: "This is the body of the first local notification",
                    data: { data: 'goes here' }
                },
                trigger: {
                    seconds: 2
                }
            })
        
    }

    const enableMusic = async () => {
        await Notificactions.setNotificationCategoryAsync('music', [
            {
                identifier: 'play',
                buttonTitle: 'Play',
                options: {
                    isAuthenticationRequired: false,
                    isDestructive: false
                }
            },
            {
                identifier: 'pause',
                buttonTitle: 'Pause',
                options: {
                    isAuthenticationRequired: false,
                    isDestructive: false
                }
            }
        ])

    }

    return <>
        <Button title="Send Notification" onPress={sendNotification} />
    </>

}

async function registerForPushNotificationsAsync() {
    let token;
    if(Platform.OS !== 'web') {
        const { status } = await Notificactions.getPermissionsAsync()
        let finalStatus = status
        if( status !== 'granted') {
            const { status } = await Notificactions.requestPermissionsAsync()
            finalStatus = status
        }
        if( finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!')
            return
        }
        token = (await Notificactions.getExpoPushTokenAsync()).data
        console.log(token)
    } else {
        alert('Must use physical device for Push Notifications')
    }

    if(Platform.OS === 'android') {
        Notificactions.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notificactions.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        })
        // for play music in background
        Notificactions.setNotificationChannelAsync('music', {
            name: 'music',
            importance: Notificactions.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        })

    }

    if( Device.isDevice ) {
        const { status: existingStatus } = await Notificactions.getPermissionsAsync()
        let finalStatus = existingStatus
        if( existingStatus !== 'granted') {
            const { status } = await Notificactions.requestPermissionsAsync()
            finalStatus = status
        }
        if( finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!')
            return
        }
        
        try{
            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
            if( !projectId ) {
                throw new Error('Missing projectId')
            }
            token = (await Notificactions.getExpoPushTokenAsync({ projectId })).data
            console.log(token)
        } catch(error) {
            console.log(error)
        }
    }
    else {
        alert('Must use physical device for Push Notifications')
    }
    return token
}