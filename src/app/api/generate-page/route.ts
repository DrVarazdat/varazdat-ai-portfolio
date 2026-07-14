import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, purpose } = await request.json();

    const prompt = `
      You are an expert UI/UX developer. The user wants to add a new page to their website.
      Page Title: "${title}"
      Page Purpose: "${purpose}"
      
      Generate a beautiful, modern, fully responsive landing page for this purpose.
      
      RULES:
      1. Return ONLY a JSON object like this: {"html": "<div...>...</div>"}
      2. Use valid HTML.
      3. Use Tailwind CSS classes.
      4. Use our specific theme colors: bg-deepBlue, bg-neutralLight, text-deepBlue, text-aiPurple, text-cyan.
      5. Include a beautiful hero section with 'py-24', and 1 or 2 content sections.
      6. Do NOT include <html>, <head>, or <body> tags. Start directly with a <div>.
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
    const resultJson = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(resultJson);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}