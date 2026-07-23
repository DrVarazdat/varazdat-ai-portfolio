import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. We just receive raw text from the frontend now! No PDF parsing on the server.
    const { text } = await request.json();

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'No readable text found.' }, { status: 400 });
    }

    // 2. Send the text to OpenAI
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
      "${text}"
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

    return NextResponse.json(JSON.parse(data.choices[0].message.content));

  } catch (error: any) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}