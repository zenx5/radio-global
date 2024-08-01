import { useState } from "react"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from "react-native"


export function VerseDay(){
    const [verse, setVerse] = useState({
        text: "pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.",
        reference: "Hechos 1:8"
    })

    const handlerShare = () => {

    }

    const handlerCopy = () => {

    }

    return <View style={{ display:'flex', flexDirection:'column', gap:5, opacity:0.7 }}>
        <TouchableOpacity style={{ marginTop: 16, marginBottom: 0 }} onPress={handlerCopy}>
            <Text style={{ textAlign: 'center', fontStyle:'italic', fontSize:18 }}>
                "{verse.text}"
            </Text>
        </TouchableOpacity>
        <View style={{ display:'flex', flexDirection:'row', gap:20, justifyContent:'center', alignItems:'center', marginTop: 10, marginBottom: 16 }}>
            <Text style={{ textAlign: 'center', fontWeight:'bold', fontSize:18 }}>{verse.reference}</Text>
            <TouchableOpacity onPress={handlerShare}>
                <FontAwesome name="share-alt" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </View>
}