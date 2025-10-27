import { getChapterInfo, getFullAudio, getTranslatedVerses, getVerses, getVersesAudio } from "@/lib/chapter"

export async function GET(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {

        const versesArabic = await getVerses(id) as { text_uthmani: string }[]

        const translatedVerses = await getTranslatedVerses(id) 
        const versesAudio = await getVersesAudio(id) as { url: string }[]
        const fullAudio = await getFullAudio(id)
        const unformattedChapterInfo = await getChapterInfo(id)
        const chapterInfo = {
            name_arabic:unformattedChapterInfo.name_arabic,
            name_english:unformattedChapterInfo.name_simple,
            bismillah_pre:unformattedChapterInfo.bismillah_pre,
            revelation_place : unformattedChapterInfo.revelation_place
        }
        if (!versesArabic || !fullAudio || !versesAudio || !versesArabic.length  || !versesAudio.length
        ) {
            return Response.json({ error: "Error in the api" }, {
                status: 500
            })
        }
        const verses = versesArabic.map((verse, index: number) => {
            const arabic_verse = verse?.text_uthmani
            const english_verse = translatedVerses[index]?.text

            const audioUrl = versesAudio[index]?.url

            return {
                id: index,
                arabic_verse,
                english_verse,
                audio: audioUrl?`https://verses.quran.com/${audioUrl}`:""
            }
        })
        return Response.json({ fullAudio, verses, chapterInfo }, {
            status: 200
        })
    } catch (error) {
        console.error(error)
        return Response.json({ error }, {
            status: 500
        })
    }
}