import { getChapterInfo, getFullAudio, getTranslatedVerses, getVerses, getVersesAudio } from "@/lib/chapter"

export async function GET(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {

        const versesArabic = await getVerses(id) as { text_uthmani: string }[]
        // console.log({versesArabic})
        const translatedVerses = await getTranslatedVerses(id) as { text: string }[]
        // console.log({translatedVerses})
        const versesAudio = await getVersesAudio(id) as { url: string }[]
        // console.log({versesAudio})
        const fullAudio = await getFullAudio(id)
        // console.log({fullAudio})
        const unformattedChapterInfo = await getChapterInfo(id)
        const chapterInfo = {
            name_arabic:unformattedChapterInfo.name_arabic,
            name_english:unformattedChapterInfo.name_simple,
            bismillah_pre:unformattedChapterInfo.bismillah_pre,
            revelation_place : unformattedChapterInfo.revelation_place
        }
        if (!versesArabic || !translatedVerses || !fullAudio || !versesAudio || !versesArabic.length || !translatedVerses.length || !versesAudio.length
        ) {
            console.log("error from the condition")
            return Response.json({ error: "Error in the api" }, {
                status: 500
            })
        }
        console.log(versesArabic[10], versesAudio[10], translatedVerses[10])
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
        return Response.json({ error }, {
            status: 500
        })
    }
}