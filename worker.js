// =============================================
//  CLOUDFLARE WORKER — paste this into your
//  worker at dash.cloudflare.com
// =============================================

export default {
  async fetch(request, env) {

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      const body        = await request.json();
      const userMessage = body.message   || '';
      const portfolio   = body.portfolioData || {};

      // CRITICAL: Check if API key exists
      const apiKey = env.GROK_API_KEY;
      if (!apiKey || apiKey.trim() === '') {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'API key not configured',
          details: 'GROK_API_KEY is missing or empty in Cloudflare Worker secrets'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // System prompt built from portfolio data
      const systemPrompt = `You are Yash's personal AI assistant embedded on his portfolio website. You are friendly, helpful, and concise.

Here is everything about Yash:
${JSON.stringify(portfolio, null, 2)}

Your instructions:
- Answer questions about Yash's skills, projects, experience, and background using only the data above.
- For general questions (greetings, small talk, coding help, ML/AI topics, career advice), respond helpfully as a knowledgeable assistant.
- Keep replies short and conversational — 2 to 4 sentences for simple questions, slightly longer only when genuinely needed.
- Be warm and professional. You represent Yash.
- If someone asks how to contact Yash, tell them to use the contact form on this page, or find him on GitHub/LinkedIn.
- Never invent facts about Yash beyond what is given above.
- Do not use bullet points or markdown formatting — plain conversational text only.`;

      // Call Grok API — fast and capable
      // GROK_API_KEY must be set in Cloudflare Worker Settings → Variables → Secrets
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'grok-2',
          max_tokens: 400,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Grok API error status:', response.status);
        console.error('Grok API error body:', errText);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'AI service unavailable',
          details: errText,
          status: response.status
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const aiData  = await response.json();
      const aiReply = aiData.choices?.[0]?.message?.content || 'Sorry, I could not generate a response right now.';

      return new Response(JSON.stringify({ success: true, message: aiReply }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      console.error('Worker error:', err.message);
      console.error('Full error:', err);
      return new Response(JSON.stringify({ success: false, error: 'Internal server error', details: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
