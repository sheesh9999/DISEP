import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if dist directory exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('Building the application first...');
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error building the application: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Build stderr: ${stderr}`);
    }
    console.log(`Build output: ${stdout}`);
    deployToNetlify();
  });
} else {
  deployToNetlify();
}

function deployToNetlify() {
  console.log('Deploying to Netlify...');
  
  // Check if netlify-cli is installed
  exec('npx netlify --version', (error) => {
    if (error) {
      console.log('Installing netlify-cli...');
      exec('npm install -g netlify-cli', (installError, stdout, stderr) => {
        if (installError) {
          console.error(`Error installing netlify-cli: ${installError.message}`);
          return;
        }
        console.log(`Netlify CLI installed: ${stdout}`);
        runNetlifyDeploy();
      });
    } else {
      runNetlifyDeploy();
    }
  });
}

function runNetlifyDeploy() {
  console.log('Running netlify deploy...');
  
  // Deploy to Netlify (will prompt for authentication if needed)
  exec('npx netlify deploy --prod', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error deploying to Netlify: ${error.message}`);
      return;
    }
    console.log(`Netlify deploy output: ${stdout}`);
    
    if (stderr) {
      console.error(`Netlify deploy stderr: ${stderr}`);
    }
    
    console.log('\nDeployment complete! Your MediPredict app is now accessible online.');
    console.log('Check the Netlify output above for your unique URL.');
  });
} 