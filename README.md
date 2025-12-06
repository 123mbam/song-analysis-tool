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
- Secure serverless backend (API key never exposed)

## Deployment

This project uses **Netlify** with serverless functions to keep the API key secure.

### Deploy to Netlify

1. **Fork or push this repo to GitHub**

2. **Connect to Netlify:**
   - Go to https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Click "Deploy site"

3. **Add your API key as an environment variable:**
   - In your Netlify site dashboard, go to **Site settings** → **Environment variables**
   - Click "Add a variable"
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key (from https://console.anthropic.com/)
   - Click "Save"

4. **Redeploy:**
   - Go to **Deploys** tab
   - Click "Trigger deploy" → "Deploy site"

Your site will be live at: `https://your-site-name.netlify.app`

## Getting an API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to **Settings** → **API Keys**
4. Create a new API key
5. Copy it to use as the `ANTHROPIC_API_KEY` environment variable in Netlify

## How It Works

1. Enter 2-3 songs (format: "Song Name - Artist")
2. Click "analyze"
3. Frontend calls the Netlify serverless function
4. Function securely calls Claude API with your key
5. Claude analyzes each song and rates the 10 musical qualities (0-10 scale)
6. Results are displayed as an overlaid radar chart

## Security

- API key is stored as an environment variable in Netlify (never in code)
- Serverless function acts as a secure proxy
- API key is never exposed to the browser

## Technologies

- HTML5 Canvas for radar chart visualization
- Anthropic Claude API for music analysis
- Netlify Functions (serverless backend)
- Vanilla JavaScript (no frameworks)
