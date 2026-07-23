import { NextResponse } from 'next/server';

// 🔴 THE FIX: Vercel's server environment is missing 'DOMMatrix'. 
// We create a "dummy" DOMMatrix object here to stop pdf-parse from crashing!
if (typeof globalThis !== 'undefined' && !(globalThis as any).DOMMatrix) {
  (globalThis as any).DOMMatrix = class DOMMatrix { constructor() {} };
}

export async function POST(request: Request) {
  try {
    // 🔴 THE FIX 2: We use 'require' instead of 'import' to bypass Vercel build errors!
    const pdfParse = require('pdf-parse');

    // 1. Read the incoming file
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    let extractedText = "";

    // 2. Extract text from the PDF safely on the server
    if (file) {
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } else if (file.type === 'text/plain') {
        extractedText = await file.text();
      } else {
        return NextResponse.json({ error: 'Please upload a PDF or TXT file.' }, { status: 400 });
      }
    }

    if (!extractedText || extractedText.trim() === '') {
      return NextResponse.json({ error: 'No readable text found.' }, { status: 400 });
    }

    // 3. Send text to OpenAI
    const prompt = `
      You are an expert CMS assistant. Read this syllabus text and extract course details.
      
      Return ONLY a JSON object with these exact keys:
      - "title": (string) Course name.
      - "category": (string) "Beginner", "Intermediate", or "Advanced".
      - "format": (string) "Online", "In-person", or "Hybrid". 
      - "status": (string) "Active", "Upcoming", or "Past". 
      - "description": (string) A concise 2-3 sentence engaging summary.
      - "nextDate": (string) Example: "Starts Nov 15, 2024" or "Available Now".
      
      Text to analyze:
      "${extractedText}"
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
    if (data.error) throw new Error(data.error.message);

    const resultJson = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(resultJson);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}