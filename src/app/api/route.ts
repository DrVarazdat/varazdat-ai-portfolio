import { NextResponse } from 'next/server';

// 🔴 FIX 1: We create the dummy DOMMatrix immediately so pdf-parse doesn't crash on Vercel
if (typeof global !== 'undefined' && !(global as any).DOMMatrix) {
  (global as any).DOMMatrix = class DOMMatrix {
    constructor() {}
  };
}

export async function POST(request: Request) {
  try {
    // 🔴 FIX 2: We dynamically require pdf-parse inside the function!
    // This stops Next.js 15 Turbopack from crashing during the Vercel build phase.
    const pdfParse = require('pdf-parse');

    // 1. Read the incoming file/text
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    let extractedText = formData.get('text') as string | null;

    // 2. Extract text if it's a file
    if (file) {
      if (file.type === 'application/pdf') {
        // Read PDF
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } else if (file.type === 'text/plain') {
        // Read TXT file
        extractedText = await file.text();
      } else {
        return NextResponse.json({ error: 'Unsupported file type. Please upload a PDF or TXT file.' }, { status: 400 });
      }
    }

    // 3. Ensure we have text
    if (!extractedText || extractedText.trim() === '') {
      return NextResponse.json({ error: 'No readable text found in the document.' }, { status: 400 });
    }

    // 4. Send the extracted text to OpenAI
    const prompt = `
      You are an expert CMS assistant for Dr. Varazdat Avetisyan's AI website. 
      Read the following raw text from a syllabus or document, and extract the course details.
      
      You MUST return ONLY a valid JSON object with the following exact keys:
      - "title": (string) The name of the course.
      - "category": (string) Must be exactly "Beginner", "Intermediate", or "Advanced".
      - "format": (string) Must be exactly "Online", "In-person", or "Hybrid". 
      - "status": (string) Must be exactly "Active", "Upcoming", or "Past". 
      - "description": (string) A concise 2-3 sentence engaging summary of the course.
      - "nextDate": (string) A short date string like "Starts Nov 15, 2024" or "Available Now".
      
      Raw Text:
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
    console.error("OpenAI/PDF Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
