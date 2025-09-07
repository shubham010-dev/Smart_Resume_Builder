const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { resumeText, userName } = req.body;
    const prompt = `The following resume belongs to ${userName}. Please suggest improvements:\n${resumeText}`;
    const response = await axios.post(
      'https://api.a4f.co/v1/chat/completions',
      {
        model: 'provider-3/gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that suggests improvements for resumes.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.A4F_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const suggestion = response.data.choices[0].message.content;
    res.json({ suggestion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;