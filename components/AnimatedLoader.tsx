import { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";

export default function AnimatedLoader({ children, onPress, active }:{ children?: any, onPress?: Function, active?: boolean }) {
    const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

    const interpolateRotation = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '1100deg']
    });

    const animatedStyles = {
        transform: [{ rotate: interpolateRotation }]
    };

    const handleAnimation = async () => {
        Animated.timing(rotateAnimation, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true
        }).start();
    }

    const handlerPress = () => {
        if( onPress ) {
            setRotateAnimation(new Animated.Value(0));
            onPress();
            handleAnimation();
        }
    }


    useEffect(() => {
        if( active ) {
            handleAnimation();
        }
    }, [active]);


    return <TouchableOpacity onPress={handlerPress}>
        <Animated.View style={[animatedStyles]}>
            { children }
        </Animated.View>
    </TouchableOpacity>
}