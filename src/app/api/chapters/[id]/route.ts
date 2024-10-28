import { getFullAudio, getTranslatedVerses, getVerses, getVersesAudio } from "@/lib/chapter"

export async function GET(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {

        const versesArabic = await getVerses(id) as { text_uthmani: string }[]
        const translatedVerses = await getTranslatedVerses(id) as { text: string }[]
        const versesAudio = await getVersesAudio(id) as { url: string }[]
        const fullAudio = await getFullAudio(id)
        if (!versesArabic || !translatedVerses || !fullAudio || !versesAudio || !versesArabic.length || !translatedVerses.length || !versesAudio.length
        ) {
            return Response.json({ error: "Error in the api" }, {
                status: 500
            })
        }
        const verses = versesArabic.map((verse, index: number) => {
            return {
                id: index.toString(),
                arabic_verse: verse.text_uthmani,
                english_verse: translatedVerses[index].text,
                audio: `https://verses.quran.com/${versesAudio[index].url}`
            }
        })

        return Response.json({ fullAudio, verses }, {
            status: 200
        })
    } catch (error) {
        return Response.json({ error }, {
            status: 500
        })
    }
}