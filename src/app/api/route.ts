import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, prompt } = await request.json();

    const systemPrompt = `
      You are an expert UI/UX developer. Create a single, beautiful HTML <section> for a homepage.
      Section Title: "${title}"
      User Request: "${prompt}"
      
      RULES:
      1. Return ONLY valid JSON: {"html": "<section className='w-full py-24...'>...</section>"}
      2. Use Tailwind CSS classes.
      3. Match the site's theme colors: bg-deepBlue, bg-neutralLight, bg-white, text-deepBlue, text-aiPurple, text-cyan.
      4. DO NOT include <html>, <head>, or <body> tags. Just the <section> block.
      5. DO NOT use markdown formatting like \`\`\`html in your response. Just pure JSON.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: systemPrompt }],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    const resultJson = JSON.parse(data.choices[0].message.content);

    // CLEANUP RULE: Strip out any accidental markdown the AI adds!
    let cleanHtml = resultJson.html;
    if (cleanHtml) {
      cleanHtml = cleanHtml.replace(/```html/gi, '').replace(/```/gi, '').trim();
    }

    return NextResponse.json({ html: cleanHtml });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}