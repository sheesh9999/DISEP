import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to check if gh-pages is installed
function isGhPagesInstalled() {
  try {
    execSync('npm list gh-pages', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Main function
function deployToGitHubPages() {
  try {
    console.log('Starting GitHub Pages deployment...');
    
    // Check if gh-pages package is installed
    if (!isGhPagesInstalled()) {
      console.log('Installing gh-pages package...');
      execSync('npm install --save-dev gh-pages');
    }
    
    // Check if dist directory exists; if not, build the project
    const distPath = path.join(__dirname, 'dist');
    if (!fs.existsSync(distPath)) {
      console.log('Dist directory not found. Building the project...');
      execSync('npm run build', { stdio: 'inherit' });
    }
    
    // Deploy to GitHub Pages
    console.log('Deploying to GitHub Pages...');
    execSync('npx gh-pages -d dist', { stdio: 'inherit' });
    
    console.log('Deployment to GitHub Pages completed successfully!');
  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  }
}

// Execute the deployment
deployToGitHubPages(); 