# LeetPrompt - Chrome Extension for LLM Feedback

A Chrome extension that generates comprehensive prompts for LLM feedback on your LeetCode solutions.

## Features

- **Automatic Extraction**: Extracts question details, constraints, and your solution from LeetCode
- **Comprehensive Prompts**: Generates detailed prompts covering time/space complexity, code quality, and optimization
- **One-Click Copy**: Copies the generated prompt directly to your clipboard

## Installation

### Method 1: Developer Mode (Recommended for testing)
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the folder containing these files
4. The extension icon should appear in your Chrome toolbar

## Usage

1. Navigate to any LeetCode problem page (e.g., `https://leetcode.com/problems/two-sum/`)
2. Write your solution in the code editor
3. Click the LeetPrompt extension icon in the Chrome toolbar
4. Click "Generate & Copy Prompt"
5. The prompt will be copied to your clipboard and can be pasted into any LLM


## Feedback Request
Please analyze my solution and provide feedback on:
1. Time Complexity
2. Space Complexity
3. Code Quality
4. Algorithm Choice
5. Edge Cases
6. Optimization
7. Alternative Approaches

For any changes in the prompt, can change it in `content.js`.
```

## File Structure

```
leetPrompt/
├── manifest.json     # Extension configuration
├── content.js        # Content script for LeetCode pages
├── popup.html        # Extension popup interface
├── popup.js          # Popup logic
├── icon16.png        # 16x16 icon
├── icon32.png        # 32x32 icon
```

## Permissions

The extension requires these permissions:
- `activeTab`: To interact with the current LeetCode page
- `clipboardWrite`: To copy the generated prompt
- Host permissions for `leetcode.com/*`

## Troubleshooting

- **Extension not working**: Refresh the LeetCode page after installing
- **No code found**: Make sure your solution is visible in the code editor
- **Clipboard error**: Check browser permissions for clipboard access

## Development

To modify the extension:
1. Make changes to the files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension
4. Reload the LeetCode page
