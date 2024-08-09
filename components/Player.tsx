import { useRef, useState } from "react";
import { TouchableOpacity, View, type ViewProps } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AnimatedLoader from "./AnimatedLoader";

export type PlayerProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function Player() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handletToggle = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handlerLoad = () => {
        setLoading(false);
    }

    return (
        <View style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'row' }}>
            {loading && <AnimatedLoader active>
                <FontAwesome name="spinner" size={96} color="#9292f6"/>
            </AnimatedLoader>}
            {!loading && <TouchableOpacity onPress={handletToggle}>
                {
                    isPlaying ?
                    <FontAwesome name="pause-circle" size={96} color="#e91e63" /> :
                    <FontAwesome name="play-circle" size={96} color="#9292f6" />
                }
            </TouchableOpacity>}
            <audio ref={audioRef} controls onLoadedData={handlerLoad} style={{ display:'none' }} >
                <source src="https://guri.tepuyserver.net/8144/stream" type="audio/mpeg" />
            </audio>

        </View>
    );
}