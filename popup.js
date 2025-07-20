// Popup script for LeetPrompt extension
document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.getElementById('generateBtn');
  const status = document.getElementById('status');
  const preview = document.getElementById('preview');
  const previewText = document.getElementById('previewText');

  // Check if we're on a LeetCode problem page
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    if (!currentTab.url.includes('leetcode.com/problems/')) {
      generateBtn.disabled = true;
      status.textContent = 'Please navigate to a LeetCode problem page';
      status.className = 'status error';
    }
  });

  // Generate prompt button click handler
  generateBtn.addEventListener('click', async function() {
    generateBtn.disabled = true;
    status.textContent = 'Generating prompt...';
    status.className = 'status loading';
    preview.style.display = 'none';

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Send message to content script
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'generatePrompt' });
      
      if (response.success) {
        // Copy to clipboard
        await navigator.clipboard.writeText(response.prompt);
        status.textContent = '✅ Prompt copied to clipboard!';
        status.className = 'status success';
        
        // Show preview
        const previewContent = response.prompt.substring(0, 200) + '...';
        previewText.textContent = previewContent;
        preview.style.display = 'block';
        
        // Auto-close popup after 3 seconds
        // setTimeout(() => {
        //   window.close();
        // }, 3000);
      } else {
        throw new Error('Failed to copy to clipboard');
      }
    } catch (error) {
      console.error('Error:', error);
      status.textContent = '❌ Error generating prompt. Please refresh the page and try again.';
      status.className = 'status error';
      generateBtn.disabled = false;
    }
  });

  // Handle keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !generateBtn.disabled) {
      generateBtn.click();
    }
  });
});
