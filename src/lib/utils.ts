
export const fetchChapters = async () => {
    const response = await fetch(`${process.env.ROOTURL}/api/chapters`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const chapters = await response.json();
    return chapters.formatedChapters;
};





