function simulateContentScriptLogic() {
    if (window.location.href.includes("https://terraria.fandom.com/wiki/")) {
      let firstHeading = document.querySelector('h1');
      if (firstHeading) {
        firstHeading.style.borderBottom = '2px solid red';
      }
  
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

function searchTerrariaWiki() {
    if (window.location.href.includes("https://terraria.fandom.com/wiki/")) {
        let infoboxItem = document.querySelector('div.infobox.item');

        if (infoboxItem) {
            let infoboxHTML = infoboxItem.outerHTML;

            chrome.runtime.sendMessage({ action: 'displayInfobox', content: infoboxHTML });
        }
    }
}

searchTerrariaWiki();
