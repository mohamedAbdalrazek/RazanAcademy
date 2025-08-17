import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type FormValues = {
    name: string;
    age: number;
    phone: string;
    email: string;
    country: string;
    privateOrGroup: string;
    lessonsPerWeek: string;
    teachingLanguage: "arabic" | "english" | "uzbek";
    motherTongue?: string;
    howDidYouKnowUs?: "facebook" | "instagram" | "friend" | "family" | "other";
    otherSource?: string;
};

export async function POST(req: Request) {
    try {
        const data: FormValues = await req.json();

        const emailBody = `
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
        <!-- Header -->
        <tr>
            <td style="padding: 30px 20px; background-color: #264653; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Course Submission</h1>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td style="padding: 30px 20px; background-color: #ffffff;">
                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">You have received a new course submission with the following details:</p>
                
                <!-- Submission Details -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Name:</strong>
                            <span style="color: #727171;">${data.name}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Age:</strong>
                            <span style="color: #727171;">${data.age}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Phone:</strong>
                            <span style="color: #727171;">${data.phone}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Email:</strong>
                            <span style="color: #727171;">${data.email}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Country:</strong>
                            <span style="color: #727171;">${data.country}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Lesson Type:</strong>
                            <span style="color: #727171;">${data.privateOrGroup}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Lessons Per Week:</strong>
                            <span style="color: #727171;">${data.lessonsPerWeek}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Teaching Language:</strong>
                            <span style="color: #727171;">${data.teachingLanguage}</span>
                        </td>
                    </tr>
                    ${data.motherTongue ?
                `<tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Mother Tongue:</strong>
                            <span style="color: #727171;">${data.motherTongue}</span>
                        </td>
                    </tr>`
                : ''}
                    ${data.howDidYouKnowUs ?
                `<tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #d8d3d3;">
                            <strong style="display: inline-block; width: 150px;">Referral Source:</strong>
                            <span style="color: #727171;">${data.howDidYouKnowUs}</span>
                        </td>
                    </tr>`
                : ''}
                    ${data.otherSource ?
                `<tr>
                        <td style="padding: 10px 0;">
                            <strong style="display: inline-block; width: 150px;">Other Source:</strong>
                            <span style="color: #727171;">${data.otherSource}</span>
                        </td>
                    </tr>`
                : ''}
                </table>
            </td>
        </tr>
    </table>
    `;
        const receiver = process.env.RECEIVER_EMAIL ?? ""
        const { data: emailResponse, error } = await resend.emails.send({
            from: `Developer <${process.env.SENDER_EMAIL}>`,
            to: receiver,
            subject: "New Form Submission",
            html: emailBody,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
        }

        return NextResponse.json({ success: true, messageId: emailResponse?.id });
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
