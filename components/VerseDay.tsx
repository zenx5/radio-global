import { useEffect, useState } from "react"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Alert, Text, TouchableOpacity, View, Share } from "react-native"
import { useBible } from "@/hooks/useBible";
import { BOOKS_NAMES } from "@/constants/Books";


export function VerseDay(){
    const [verse, setVerse] = useState({
        text: "",
        reference: ""
    })

    const { getRandomVerse } = useBible()

    useEffect(()=>{
        const {
            content,
            book,
            chapter,
            verse
        } = getRandomVerse()
        setVerse({
            text: content,
            reference: `${BOOKS_NAMES[book]} ${chapter}:${verse}`
        })
    },[])

    const randomVerse = () => {
        const {
            content,
            book,
            chapter,
            verse
        } = getRandomVerse()
        setVerse({
            text: content,
            reference: `${BOOKS_NAMES[book]} ${chapter}:${verse}`
        })
    }

    const handlerShare = () => {
        try{
            Share.share({
                message: `${verse.text}\n*${verse.reference}*\n[Iglesia Acción Bíblica Global]`
            })
        }catch(error){
            console.log(error)
            Alert.alert('Error', 'No se pudo compartir el verso, reinicia la aplicación e intenta de nuevo')
        }
    }

    return <View style={{ display:'flex', flexDirection:'column', gap:5, opacity:0.7 }}>
        <TouchableOpacity style={{ marginTop: 16, marginBottom: 0 }} onPress={randomVerse}>
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