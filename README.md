# MediPredict

MediPredict is a web application that helps users check drug interactions and predict side effects of medications. The application provides a user-friendly interface for analyzing potential interactions between medications and predicting possible side effects based on a user's personal profile.

## Features

- **Drug Interaction Checker**: Analyze potential interactions between medications
- **Side Effect Predictor**: Predict potential side effects based on medication regimen and personal profile
- **Personalized Profile**: Create and manage a health profile for more accurate predictions
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark mode

## Live Demo

You can access the live version of MediPredict at:

- [MediPredict on Netlify](https://medipredict-app.netlify.app)
- [MediPredict on GitHub Pages](https://medipredict.github.io)

## Deployment Options

### Deploy to Netlify

The easiest way to deploy MediPredict is through Netlify:

1. Fork this repository to your GitHub account
2. Go to [Netlify](https://app.netlify.com/) and sign in with GitHub
3. Click "New site from Git"
4. Select your forked repository
5. Use the following settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/medipredict)

### Deploy to GitHub Pages

You can also deploy MediPredict to GitHub Pages:

1. Fork this repository to your GitHub account
2. Clone your forked repository
3. Open `package.json` and update the `homepage` field to `https://yourusername.github.io/medipredict`
4. Install the required dependencies:
   ```
   npm install
   ```
5. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Local Development

To run MediPredict locally:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (icons)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
