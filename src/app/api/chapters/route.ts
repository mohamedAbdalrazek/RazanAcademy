type Chapter = {
    id: number,
    revelation_place: string,
    name_simple: string,
    name_arabic: string,

}
export async function GET() {
    try {

        const response = await fetch("https://api.quran.com/api/v4/chapters", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        const chapters = data.chapters
        if (!chapters || chapters.length < 1) {
            return Response.json({ error: "Error in the api" }, {
                status: 500
            })
        }
        const formatedChapters = chapters.map((chapter: Chapter) => {
            const { id, revelation_place, name_arabic, name_simple } = chapter
            return (
                {
                    id, revelation_place, name_arabic, name_english: name_simple
                }
            )
        })
        return Response.json({ formatedChapters }, {
            status: 200
        })
    } catch (error) {
        return Response.json({ error }, {
            status: 500
        })
    }
}