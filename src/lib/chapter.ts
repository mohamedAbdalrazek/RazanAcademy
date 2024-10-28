export async function getVerses(id:string){
    const responseVerses = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await responseVerses.json()
    return data.verses
}

export async function getTranslatedVerses(id:string){
    const responseTranslatedVerses = await fetch(`https://api.quran.com/api/v4/quran/translations/131?chapter_number=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await responseTranslatedVerses.json()
    return data.translations
}


export async function getFullAudio(id:string){
    const responseFullAudio = await fetch(`https://api.quran.com/api/v4/chapter_recitations/2/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await responseFullAudio.json()
    return data.audio_file.audio_url
}

export async function getVersesAudio(id:string){
    const responseVersesAudio = await fetch(`https://api.quran.com/api/v4/recitations/2/by_chapter/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await responseVersesAudio.json()
    return data.audio_files
}