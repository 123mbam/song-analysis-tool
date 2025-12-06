const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { songs } = JSON.parse(event.body);

    if (!songs || songs.length < 2) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'At least 2 songs required' })
      };
    }

    const prompt = `Analyze the following songs based on these 10 musical qualities:
1. Melody
2. Form/Structure
3. Timbre
4. Texture
5. Key
6. Time Signature
7. Chord Quality
8. Genre/Style
9. Lyrics
10. Spatial Effects

Songs to analyze:
${songs.map((song, i) => `${i + 1}. ${song}`).join('\n')}

For each song, rate each quality on a scale of 0-10 where:
- 0 means the quality is absent or minimal
- 10 means the quality is highly prominent or intense

Return ONLY a valid JSON object in this exact format (no markdown, no explanation):
{
  "songs": [
    {
      "name": "Song 1 name",
      "data": [melody_score, form_score, timbre_score, texture_score, key_score, time_sig_score, chord_score, genre_score, lyrics_score, spatial_score]
    },
    {
      "name": "Song 2 name",
      "data": [...]
    }${songs.length > 2 ? `,
    {
      "name": "Song 3 name",
      "data": [...]
    }` : ''}
  ]
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `API request failed: ${response.statusText}` })
      };
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Parse and return the JSON response
    const analysis = JSON.parse(content);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(analysis)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
