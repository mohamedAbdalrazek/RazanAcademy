export async function getVerses(id: string) {

    const responseVerses = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!responseVerses.ok) {
        const errorText = await responseVerses.text();
        console.error("API error from getVerses:", responseVerses.status, errorText);
        throw new Error(`API call failed with status ${responseVerses.status}`);
    }
    const data = await responseVerses.json()
    return data.verses
}

export async function getTranslatedVerses(id: string) {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${id}/en.asad`);

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", response.status, errorText);
        throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log({data})
    return data.data.ayahs;
}



export async function getFullAudio(id: string) {

    const responseFullAudio = await fetch(`https://api.quran.com/api/v4/chapter_recitations/2/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!responseFullAudio.ok) {
        const errorText = await responseFullAudio.text();
        console.error("API error from getFullAudio:", responseFullAudio.status, errorText);
        throw new Error(`API call failed with status ${responseFullAudio.status}`);
    }
    const data = await responseFullAudio.json()
    return data.audio_file.audio_url
}

export async function getVersesAudio(id: string) {

    const responseVersesAudio = await fetch(`https://api.quran.com/api/v4/quran/recitations/2?chapter_number=${id}`, {

        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!responseVersesAudio.ok) {
        const errorText = await responseVersesAudio.text();
        console.error("API error from getVersesAudio:", responseVersesAudio.status, errorText);
        throw new Error(`API call failed with status ${responseVersesAudio.status}`);
    }
    const data = await responseVersesAudio.json()
    return data.audio_files
}

export async function getChapterInfo(id: string) {

    const responseChapterInfo = await fetch(`https://api.quran.com/api/v4/chapters/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!responseChapterInfo.ok) {
        const errorText = await responseChapterInfo.text();
        console.error("API error from getChapterInfo:", responseChapterInfo.status, errorText);
        throw new Error(`API call failed with status ${responseChapterInfo.status}`);
    }
    const data = await responseChapterInfo.json()
    return data.chapter
}