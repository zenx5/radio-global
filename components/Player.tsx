import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, type ViewProps } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AnimatedLoader from "./AnimatedLoader";
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

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync( { uri } );
        setSound(sound);
        await sound.playAsync();
    }

    async function stopSound() {
        await sound?.stopAsync();
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