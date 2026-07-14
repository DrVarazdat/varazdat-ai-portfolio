import { NextResponse } from 'next/server';

// This forces Next.js to run this as a standard Node server (fixes pdf-parse issues)
export const dynamic = 'force-dynamic'; 

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
    }

    let extractedText = "";

    // Safely extract text based on file type
    if (file.type === 'application/pdf') {
      const pdfParse = require('pdf-parse'); // Required dynamically to prevent build errors
      const buffer = Buffer.from(await file.arrayBuffer());
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } else {
      extractedText = await file.text(); // Handles .txt files
    }

    if (!extractedText || extractedText.trim() === "") {
      return NextResponse.json({ error: "Could not read any text from this file." }, { status: 400 });
    }

    // Send the text to OpenAI
    const prompt = `
      Read this course syllabus and extract the details.
      Return ONLY a JSON object with EXACTLY these keys:
      {
        "title": "Course name",
        "short_description": "1 sentence catalog summary",
        "full_description": "Detailed 2-3 paragraph summary",
        "category": "Beginner", 
        "format": "Online",
        "start_date": "Extracted date or 'Available Now'"
      }
      Syllabus Text: "${extractedText}"
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` 
      },
      body: JSON.stringify({ 
        model: 'gpt-4o-mini', 
        messages: [{ role: 'user', content: prompt }], 
        response_format: { type: "json_object" } 
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const aiResult = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(aiResult);

  } catch (error: any) {
    console.error("Course Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}