# Song Analysis Tool

A web application that analyzes and compares songs based on 10 musical qualities using Claude AI.

## Features

- Compare 2-3 songs simultaneously
- Analyze 10 musical qualities:
  - Melody
  - Form/Structure
  - Timbre
  - Texture
  - Key
  - Time Signature
  - Chord Quality
  - Genre/Style
  - Lyrics
  - Spatial Effects
- Visual radar chart showing quality comparisons
- Animated loading indicator

## Setup

1. Clone this repository
2. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```
3. Add your Anthropic API key to `config.js`:
   ```javascript
   const CONFIG = {
       ANTHROPIC_API_KEY: 'your-actual-api-key-here'
   };
   ```
4. Open `index.html` in your browser

## Getting an API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy it to your `config.js` file

## Security Note

**Never commit `config.js` to Git!** It's already listed in `.gitignore` to prevent accidental commits of your API key.

## How It Works

1. Enter 2-3 songs (format: "Song Name - Artist")
2. Click "analyze"
3. The app sends your songs to Claude AI
4. Claude analyzes each song and rates the 10 musical qualities (0-10 scale)
5. Results are displayed as an overlaid radar chart

## Technologies

- HTML5 Canvas for radar chart visualization
- Anthropic Claude API for music analysis
- Vanilla JavaScript (no frameworks)
