// Updated imports and setup
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';

// Setup for ES module to work with __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prompt user for input using inquirer
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'location',
      message: 'Where are you located?'
    },
    {
      type: 'input',
      name: 'bio',
      message: 'Tell us a little about yourself:'
    },
    {
      type: 'checkbox',
      name: 'socialMedia',
      message: 'Select the social media links you want to include:',
      choices: [
        { name: 'LinkedIn', value: 'linkedin' },
        { name: 'GitHub', value: 'github' },
        { name: 'Instagram', value: 'instagram' },
        { name: 'Dribbble', value: 'dribbble' },
        { name: 'Patreon', value: 'patreon' },
        { name: 'Pinterest', value: 'pinterest' },
        { name: 'YouTube', value: 'youtube' },
        { name: 'Behance', value: 'behance' },
      ],
    },
    {
      type: 'input',
      name: 'linkedin',
      message: 'Enter your LinkedIn URL (just the handle, like "in/username"):',
      when: (answers) => answers.socialMedia.includes('linkedin'),
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub URL:',
      when: (answers) => answers.socialMedia.includes('github'),
    },
    {
      type: 'input',
      name: 'instagram',
      message: 'Enter your Instagram URL:',
      when: (answers) => answers.socialMedia.includes('instagram'),
    },
    {
      type: 'input',
      name: 'dribbble',
      message: 'Enter your Dribbble URL:',
      when: (answers) => answers.socialMedia.includes('dribbble'),
    },
    {
      type: 'input',
      name: 'patreon',
      message: 'Enter your Patreon URL:',
      when: (answers) => answers.socialMedia.includes('patreon'),
    },
    {
      type: 'input',
      name: 'pinterest',
      message: 'Enter your Pinterest URL:',
      when: (answers) => answers.socialMedia.includes('pinterest'),
    },
    {
      type: 'input',
      name: 'youtube',
      message: 'Enter your YouTube URL:',
      when: (answers) => answers.socialMedia.includes('youtube'),
    },
    {
      type: 'input',
      name: 'behance',
      message: 'Enter your Behance URL:',
      when: (answers) => answers.socialMedia.includes('behance'),
    },
    {
      type: 'confirm',
      name: 'includeContactForm',
      message: 'Would you like to include a contact form in your portfolio?',
    },
    {
      type: 'confirm',
      name: 'addProfilePicture',
      message: 'Would you like to add a profile picture? You can upload your own.',
    },
    {
      type: 'input',
      name: 'profilePictureURL',
      message: 'Provide the URL link to your profile picture:',
      when: (answers) => answers.addProfilePicture,
    },
  ]);
};

// Read the HTML template and replace placeholders
const generateHTML = (data) => {
  const templatePath = path.join(__dirname, 'assets', 'template.html');
  let html = fs.readFileSync(templatePath, 'utf-8');
  let linksHTML = '';

  // Handle social media links
  if (data.socialMedia.includes('linkedin')) {
    linksHTML += `<a href="https://linkedin.com/${data.linkedin}" target="_blank" class="social-button linkedin-btn">LinkedIn</a>`;
  }
  if (data.socialMedia.includes('github')) {
    linksHTML += `<a href="https://github.com/${data.github}" target="_blank" class="social-button github-btn">GitHub</a>`;
  }
  if (data.socialMedia.includes('instagram')) {
    linksHTML += `<a href="https://instagram.com/${data.instagram}" target="_blank" class="social-button instagram-btn">Instagram</a>`;
  }
  if (data.socialMedia.includes('dribbble')) {
    linksHTML += `<a href="https://dribbble.com/${data.dribbble}" target="_blank" class="social-button dribbble-btn">Dribbble</a>`;
  }
  if (data.socialMedia.includes('patreon')) {
    linksHTML += `<a href="https://patreon.com/${data.patreon}" target="_blank" class="social-button patreon-btn">Patreon</a>`;
  }
  if (data.socialMedia.includes('pinterest')) {
    linksHTML += `<a href="https://pinterest.com/${data.pinterest}" target="_blank" class="social-button pinterest-btn">Pinterest</a>`;
  }
  if (data.socialMedia.includes('youtube')) {
    linksHTML += `<a href="https://youtube.com/${data.youtube}" target="_blank" class="social-button youtube-btn">YouTube</a>`;
  }
  if (data.socialMedia.includes('behance')) {
    linksHTML += `<a href="https://behance.com/${data.behance}" target="_blank" class="social-button behance-btn">Behance</a>`;
  }

  // Replace placeholders with the actual data
  html = html.replace(/{{name}}/g, data.name)
    .replace(/{{location}}/g, data.location)
    .replace(/{{bio}}/g, data.bio)
    .replace(/{{profilePicture}}/g, data.profilePictureURL) // Insert profile picture
    .replace(/{{links}}/g, linksHTML);

  // Optionally include a contact form if the user requested it
  if (data.includeContactForm) {
    html += `
        <div class="contact-form">
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
                
                <button type="submit">Submit</button>
            </form>
        </div>`;
  }

  return html;
};

// Function to write the generated HTML to a file
const writeToFile = (htmlContent) => {
  const outputPath = path.join(__dirname, 'assets', 'portfolio.html');
  fs.writeFileSync(outputPath, htmlContent);
  console.log('Portfolio successfully generated in assets/portfolio.html');
};

// Main function to run the app
const init = async () => {
  try {
    const answers = await promptUser();
    const htmlContent = generateHTML(answers);
    writeToFile(htmlContent);
  } catch (error) {
    console.error('Error generating portfolio:', error);
  }
};

// Run the application
init();