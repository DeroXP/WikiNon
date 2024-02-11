// content.js

// Example content script logic to manipulate the content of the page
function simulateContentScriptLogic() {
    // Check if the page is the Terraria Wiki
    if (window.location.href.includes("https://terraria.fandom.com/wiki/")) {
      // Example: Highlight the first heading on the page
      let firstHeading = document.querySelector('h1');
      if (firstHeading) {
        firstHeading.style.borderBottom = '2px solid red';
      }
  
      // Example: Add a message to the page
      let messageDiv = document.createElement('div');
      messageDiv.innerText = 'Content script logic executed on Terraria Wiki page.';
      document.body.appendChild(messageDiv);
    }
  }
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'performInitialSearch') {
        searchTerrariaWiki();
    }
});

// Example content script logic to manipulate the content of the page
function searchTerrariaWiki() {
    // Check if the page is the Terraria Wiki
    if (window.location.href.includes("https://terraria.fandom.com/wiki/")) {
        // Find the main infobox item
        let infoboxItem = document.querySelector('div.infobox.item');

        // Check if the infobox item is found
        if (infoboxItem) {
            // Extract the HTML content of the infobox item
            let infoboxHTML = infoboxItem.outerHTML;

            // Send the HTML content to the background script
            chrome.runtime.sendMessage({ action: 'displayInfobox', content: infoboxHTML });
        }
    }
}

// Perform the initial content script logic when the content script is injected
searchTerrariaWiki();