import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity, View } from "react-native";

export function ReactBoard() {

    return  <View style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginTop:40 }}>
        <TouchableOpacity style={{ borderWidth:1, borderRadius:999, padding:10, borderColor:'#f004' }}>
            <FontAwesome name="heart" size={50} color="#f00d" />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome name="smile-o" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome name="heart" size={50} color="black" />
        </TouchableOpacity>
    </View>
}