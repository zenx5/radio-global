import rvr from "../assets/es_rvr.json"

export function useBible(){
    const bible = rvr

    const getRandomVerse = () => {
        const capther = Math.floor( Math.random()*bible[19].chapters.length )
        const verse = Math.floor( Math.random()*bible[19].chapters[capther].length )
        return {
            book: 19,
            chapter: capther + 1,
            verse: verse + 1,
            content: bible[19].chapters[capther][verse]
        }

    }

    return {
        getRandomVerse
    }
}