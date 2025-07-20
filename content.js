// Content script for LeetCode page interaction
class LeetCodeExtractor {
  constructor() {
    this.questionData = null;
    this.solutionCode = null;
  }

  // Extract question details
  extractQuestion() {
    const titleElement = document.querySelector('.text-title-large');
    const descriptionElement = document.querySelector('[data-track-load="description_content"]') ;
    const difficultyElement = document.querySelector('.text-difficulty-easy, .text-difficulty-medium, .text-difficulty-hard');

    const title = titleElement?.textContent?.trim() || 'Unknown Title';
    const description = descriptionElement?.textContent?.trim() || 'No description available';
    const difficulty = difficultyElement?.textContent?.trim() || 'Unknown';

    return {
      title,
      description,
      difficulty
    };
  }

  // Extract user's solution code
  extractSolution() {
    // Try multiple selectors for different LeetCode layouts
    const codeSelectors = [
      '.view-lines',
      '.monaco-editor .view-line',
      '[data-cy="code-area"]',
      '.CodeMirror-code',
      '.ace_content'
    ];

    let code = '';
    for (const selector of codeSelectors) {
      const codeElement = document.querySelector(selector);
      if (codeElement) {
        const lines = document.querySelectorAll(`${selector} span`);
        code = Array.from(lines).map(line => line.textContent).join('\n');
        break;
      }
    }

    // Fallback: try to get from textarea
    if (!code) {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        code = textarea.value;
      }
    }

    return code || '// No code found';
  }

  // Generate comprehensive prompt for LLM
  generatePrompt() {
    const question = this.extractQuestion();
    const solution = this.extractSolution();

    const prompt = `Please provide detailed feedback on this LeetCode solution.

      ## Question Details
      **Title:** ${question.title}
      **Difficulty:** ${question.difficulty}

      **Problem Description:**
      ${question.description}

      ## My Solution
      \`\`\`
      ${solution}
      \`\`\`

      ## Feedback Request
      Please analyze my solution and provide feedback on:
      1. **Time Complexity**: What is the time complexity and is there room for improvement?
      2. **Space Complexity**: What is the space complexity and can it be optimized?
      3. **Code Quality**: Is the code clean, readable, and following best practices? Don't focus on spacing as it could be due to copying from source.
      4. **Algorithm Choice**: Is this the most efficient algorithm for the problem?
      5. **Edge Cases**: Are there any edge cases I might have missed?
      6. **Optimization**: How can this solution be further optimized?
      7. **Alternative Approaches**: What are some alternative approaches to solve this problem?

      Please be specific with your suggestions and provide code examples where applicable.`;

    return prompt;
  }

  // Listen for messages from popup
  init() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'generatePrompt') {
        const prompt = this.generatePrompt();
        sendResponse({ success: true, prompt });
        return true; // Keep message channel open for async response
      }
    });
  }
}

// Initialize the extractor
const extractor = new LeetCodeExtractor();
extractor.init();
