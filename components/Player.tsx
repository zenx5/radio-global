import { useState } from "react";
import { Button, Text, TouchableOpacity, View, type ViewProps } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export type PlayerProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function Player() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <View style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'row' }}>
            <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
                {
                    isPlaying ?
                    <FontAwesome name="pause-circle" size={96} color="#e91e63" /> :
                    <FontAwesome name="play-circle" size={96} color="#9292f6" />
                }
            </TouchableOpacity>
            <audio controls style={{ display:'none' }} />
        </View>
    );
}