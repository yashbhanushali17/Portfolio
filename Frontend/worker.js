// =============================================
//  CLOUDFLARE WORKER — paste this into your
//  worker at dash.cloudflare.com
// =============================================

// Update this whenever you meaningfully change your portfolio content
// (new project, new experience, etc). No need to touch it for small tweaks.
const PORTFOLIO_CONTEXT = `
Yash Nanda — ML Engineer & Python Backend Developer, BCA 2026, Ahmedabad, India.

About: Python Backend Developer and Machine Learning Engineer who builds full-stack AI applications end to end — from data pipelines to production-style APIs. Enjoys the entire ML product lifecycle: cleaning/exploring data, feature engineering, training and evaluating models with Scikit-learn, then wrapping them in a FastAPI backend and shipping to the cloud.

Timeline:
- 2023: Started BCA & began learning Python. Foundations in programming, data structures and algorithms.
- 2024-2025: Dived into Machine Learning & backend development. Scikit-learn, FastAPI, REST APIs — shipped DiagnoWeb & InsureIQ.
- May-Jun 2026: ML Developer Intern at Cognetix Global Technology. Real-world predictive modeling, model evaluation & pipeline debugging.

Experience 1: Machine Learning Developer Intern at Cognetix Global Technology LLP (Remote), 10 May 2026 – 10 Jun 2026. Worked on real-world AI/ML tasks spanning data preprocessing, exploratory data analysis, and feature engineering using Python, Pandas, and NumPy. Built and evaluated machine learning models using Scikit-learn, applying regression and classification techniques for predictive modeling. Assisted in testing and debugging model pipelines, documenting workflows and results for reproducibility. Collaborated using Git/GitHub for version control and code review in a distributed development workflow. Cognetix is MCA Registered LLP, ISO 9001:2015 Certified, MSME Registered, Startup India Recognized.

Experience 2: Frontend & Full-Stack Contributor on "Cohort" (Unified Professional Communication Platform), a collaborative team build. Built and maintained reusable React.js UI components and integrated Node.js REST API endpoints into the frontend, gaining full-stack experience across the data flow. Contributed to feature testing, UI bug fixes, peer code reviews, and technical documentation within an Agile SDLC process.

Skills & proficiency (out of 10): Python 8, Pandas 8, Machine Learning 7, Scikit-learn 7, FastAPI 7, SQL 7, REST APIs 7, NumPy 7, Data Visualization 7, Model Deployment 7, Feature Engineering 7, Model Evaluation 7, React.js 6, Git & Version Control 6.

Stats: 4+ projects shipped, 1 internship, 7.8 CGPA / 10.

Projects:
1. Cohort — Unified Communication Platform. Team-built real-time chat and collaboration platform. Built reusable React.js UI components and integrated Node.js REST endpoints into the frontend, contributing to feature testing, bug fixes and peer code review within an Agile workflow. Tech: React, Node.js, MongoDB, Socket.IO. GitHub: github.com/yashbhanushali17/Cohort
2. DiagnoWeb — AI-Powered Diabetes Risk Predictor. Full-stack AI web app with a FastAPI backend serving a trained Scikit-learn classification model through RESTful prediction endpoints. Built an end-to-end pipeline (preprocessing, feature engineering, model training & evaluation) with Chart.js risk visualizations and automated PDF report generation. Deployed on Render. Tech: Python, FastAPI, Scikit-learn, Chart.js. Live: yashbhanushali17.github.io/DiagnoWeb
3. InsureIQ — AI-Based Insurance Cost Estimator. Full-stack ML web app for real-time insurance cost estimation, integrating a FastAPI backend with a trained Scikit-learn regression model via REST API. Implemented BMI calculation and city-tier regional prediction logic, plus prediction history tracking and interactive result charts. Deployed on Render + GitHub Pages. Tech: FastAPI, Scikit-learn, Python, Pandas. Live: yashbhanushali17.github.io/InsureIQ
4. AI-Powered Developer Portfolio — this portfolio itself. A custom-built, fully responsive site with premium animations, glassmorphism UI, and an AI chatbot integrated via Cloudflare Workers for interactive, real-time conversations about his work. Tech: Frontend, AI Chatbot, Cloudflare Workers, API Integration. GitHub: github.com/yashbhanushali17/Portfolio

Currently: Actively looking for ML engineering opportunities, internships, and collaborations.

Contact: GitHub @yashbhanushali17 (github.com/yashbhanushali17), LinkedIn (linkedin.com/in/yash-nanda17), WhatsApp +91 77790 88071 (wa.me/917779088071), Email yashbhanushali1710@gmail.com, or the contact form on this page.
`.trim();

export default {
  async fetch(request, env) {

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

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
      const body = await request.json();
      const userMessage = body.message || '';

      const apiKey = env.GROQ_API_KEY;
      if (!apiKey || apiKey.trim() === '') {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'API key not configured',
          details: 'GROQ_API_KEY is missing or empty in Cloudflare Worker secrets'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const systemPrompt = `You are Yash's personal AI assistant embedded on his portfolio website. You are friendly, helpful, and concise.

Here is Yash's portfolio content:
${PORTFOLIO_CONTEXT}

Your instructions:
- Answer questions about Yash's skills, projects, experience, and background using only the data above.
- For general questions (greetings, small talk, coding help, ML/AI topics, career advice), respond helpfully as a knowledgeable assistant.
- Keep replies short and conversational — 2 to 4 sentences for simple questions, slightly longer only when genuinely needed.
- Be warm and professional. You represent Yash.
- If someone asks how to contact Yash, tell them to use the contact form on this page, or reach out via GitHub, LinkedIn, WhatsApp, or email.
- Never invent facts about Yash beyond what is given above.
- Do not use bullet points or markdown formatting — plain conversational text only.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 300,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        const errText = await response.text();
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

      const aiData = await response.json();
      const aiReply = aiData.choices?.[0]?.message?.content || 'Sorry, I could not generate a response right now.';

      return new Response(JSON.stringify({ success: true, message: aiReply }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: 'Internal server error', details: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};