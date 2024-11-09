import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    let data;

    try {
        data = await request.json();
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return Response.json({ ok: false, message: "Invalid JSON format" }, {
            status: 400
        });
    }

    for (const value of Object.values(data)) {
        if (!value) {
            return Response.json({ ok: false, message: "Some data is missing" }, {
                status: 400
            });
        }
    }

    try {
        const docRef = collection(db, "posts");
        const result = await addDoc(docRef, data);
    
        return Response.json({ ok: true, message: "Document added successfully",result }, {
            status: 200
        });
    } catch (error) {
        console.error("Failed to add document:", error);
        return Response.json({ ok: false, message: "Failed to save data to the database" }, {
            status: 500
        });
    }
}