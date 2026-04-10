--[[
    ФАЙЛЫ ДЛЯ GITHUB
    
    Скопируйте каждый файл в ваш GitHub репозиторий
]]

return {
    
    -- ============================================
    server_js = [[
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/chat', async (req, res) => {
    try {
        const { question } = req.body;
        
        console.log('Received question:', question);
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant for Roblox game development. Answer questions about Luau scripting, GUI, game mechanics, and Roblox platform features. Be concise but helpful. Always respond in the same language as the question (Russian for Russian questions, English for English).'
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            console.error('OpenAI Error:', data.error);
            return res.status(500).json({ error: data.error.message });
        }
        
        const answer = data.choices[0].message.content;
        console.log('AI Response:', answer);
        
        res.json({ answer: answer });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.get('/', (req, res) => {
    res.json({ status: 'AI Proxy Server is running!', version: '1.0.0' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`AI Proxy Server running on port ${PORT}`);
    console.log('OpenAI API Key configured:', OPENAI_API_KEY ? 'Yes' : 'No');
});
    ]],
    
    -- ============================================
    package_json = [[
{
  "name": "roblox-ai-proxy",
  "version": "1.0.0",
  "description": "Proxy server for connecting Roblox games to OpenAI API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "keywords": ["roblox", "ai", "openai", "proxy"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "node-fetch": "^2.6.7"
  }
}
    ]],
    
    -- ============================================
    gitignore = [[
.env
node_modules/
.DS_Store
*.log
    ]],
    
    -- ============================================
    readme_md = [[
# Roblox AI Proxy Server

Proxy server for connecting Roblox games to OpenAI API.

## Setup

1. Clone this repository
2. Set environment variable: `OPENAI_API_KEY=your-key-here`
3. Run: `npm install`
4. Run: `npm start`
5. Server will run on port 3000

## Deploy to Render.com

1. Push to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repo
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy!

## Usage

POST to `/api/chat` with JSON body:
```json
{
  "question": "How to create a part in Roblox?"
}
```

Response:
```json
{
  "answer": "To create a part in Roblox..."
}
```

## License

MIT
    ]]
}
