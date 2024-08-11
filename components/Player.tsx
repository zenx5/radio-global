import { useState } from "react";
import { TouchableOpacity, View, type ViewProps } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Audio } from 'expo-av';

export type PlayerProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function Player() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState<Audio.Sound>();
    const uri = 'https://guri.tepuyserver.net/8144/stream'

    // create new notificaction for play sound in background
    const createPlayerNotification = async () => {
        await Audio.setAudioModeAsync({
            shouldDuckAndroid: true,
            interruptionModeAndroid: 2,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });
    }

    async function playSound() {
        try{
            if( sound) {
                await sound.playAsync();
            }
            else {
                createPlayerNotification();
                const { sound:playbackObject } = await Audio.Sound.createAsync( { uri } );
                setSound(playbackObject);
                await playbackObject.playAsync();
            }
        }catch(error){
            console.log(error)
        }
    }

    async function stopSound() {
        try{
            await sound?.pauseAsync();
        } catch(error){
            console.log(error)
        }
    }

    const handlerToggle = async () => {
        if (isPlaying) {
            await stopSound();
            setIsPlaying(false);
        } else {
            await playSound();
            setIsPlaying(true);
        }
    }

    return (
        <View style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'row' }}>
            <TouchableOpacity onPress={handlerToggle}>
                {
                    isPlaying ?
                    <FontAwesome name="pause-circle" size={96} color="#e91e63" /> :
                    <FontAwesome name="play-circle" size={96} color="#9292f6" />
                }
            </TouchableOpacity>
        </View>
    );
}