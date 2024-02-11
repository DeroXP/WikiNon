function sendToPopup(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { action: 'sendToPopup', message });
        });
    });
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'searchAndReturnResult') {
        let searchURL = request.searchURL;

        try {
            if (searchURL.includes("https://terraria.fandom.com/wiki/")) {
                
                let response = await fetch(searchURL);
                let htmlContent = await response.text();

                let infoboxStartIndex = htmlContent.indexOf('<div class="infobox item"');
                let infoboxEndIndex = htmlContent.indexOf('</div>', infoboxStartIndex);
                let infoboxContent = htmlContent.substring(infoboxStartIndex, infoboxEndIndex + 6);

                sendToPopup({ action: 'displayInfobox', content: infoboxContent });
            } else {
                console.error("Error: Invalid URL");
            }
        } catch (error) {
            console.error("Error fetching or processing the Terraria Wiki page:", error);
        }
    }
});


chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed or updated - Performing initial search.');

    sendToPopup({ action: 'performInitialSearch' });
});
