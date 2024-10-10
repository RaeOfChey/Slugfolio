import fs from 'fs';
import inquirer from 'inquirer';

// Function to prompt user for input
const getUserInput = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
    {
      type: 'input',
      name: 'location',
      message: 'Where are you located?',
    },
    {
      type: 'input',
      name: 'bio',
      message: 'Tell us about yourself:',
    },
    {
      type: 'input',
      name: 'linkedin',
      message: 'What is your LinkedIn URL?',
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your GitHub URL?',
    },
    // Add any additional prompts here if needed
  ]);
};

// Function to generate HTML content from user input
const generateHTML = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name}'s Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #4CAF50; }
        .bio { margin-bottom: 20px; }
        .links a { display: block; margin: 5px 0; color: #0066CC; text-decoration: none; }
        .links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>${data.name}</h1>
    <h2>Location: ${data.location}</h2>
    <p class="bio">${data.bio}</p>
    <div class="links">
        <h3>Connect with me:</h3>
        <a href="${data.linkedin}" target="_blank">LinkedIn</a>
        <a href="${data.github}" target="_blank">GitHub</a>
    </div>
</body>
</html>
`;
};

// Main function to run the app
const main = async () => {
  const userData = await getUserInput();
  const htmlContent = generateHTML(userData);

  fs.writeFile('portfolio.html', htmlContent, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Portfolio generated successfully! Check portfolio.html');
    }
  });
};

// Run the application
main();