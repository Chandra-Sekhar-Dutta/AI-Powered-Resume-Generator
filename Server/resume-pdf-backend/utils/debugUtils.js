const fs = require('fs');
const path = require('path');

/**
 * Save HTML content to file for debugging
 * Set DEBUG_SAVE_HTML=true in .env to enable
 */
exports.saveHTMLForDebug = (html, filename = 'debug-resume.html') => {
  if (process.env.DEBUG_SAVE_HTML !== 'true') {
    return;
  }

  try {
    const debugDir = path.join(__dirname, '..', 'debug');
    
    // Create debug directory if it doesn't exist
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir, { recursive: true });
    }

    const filePath = path.join(debugDir, filename);
    fs.writeFileSync(filePath, html, 'utf8');
    
    console.log(`Debug HTML saved to: ${filePath}`);
    console.log(`You can open this file in a browser to verify all content is present`);
  } catch (error) {
    console.error('Failed to save debug HTML:', error);
  }
};

/**
 * Extract text content from HTML for logging
 */
exports.extractTextPreview = (html, maxLength = 200) => {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

/**
 * Count sections in HTML
 */
exports.countSections = (html) => {
  const sections = {
    summary: (html.match(/Summary/gi) || []).length,
    education: (html.match(/Education/gi) || []).length,
    skills: (html.match(/Skills/gi) || []).length,
    experience: (html.match(/Professional Experience/gi) || []).length,
    experienceItems: (html.match(/Full Stack Developer|IOT Developer|C\+\+ Developer|Front End Engineer/gi) || []).length
  };
  
  console.log('HTML Content Analysis:', sections);
  return sections;
};