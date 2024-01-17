const express = require('express');
const { config } = require('dotenv');
const { OpenAI } = require('openai');
const cors = require('cors');
const path = require('path');

config();

const app = express();
const port = 3002;

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// app.use(cors({ origin: "http://localhost:3001" }));
app.use(cors());
app.use(express.static('public1'));
app.use(express.json());

app.post('/send-message', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    const aiResponse = response.choices[0].message.content;
    res.json({ message: aiResponse });
  } catch (error) {
    console.error('Error processing the message:', error);
    res.status(500).json({ error: 'Error processing the message' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
