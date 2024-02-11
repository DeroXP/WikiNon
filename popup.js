document.addEventListener('DOMContentLoaded', function () {
    let port;

    function searchWebsite() {
        if (!port) {
            console.error("Error: Connection port is not available. Try reloading the extension.");
            return;
        }

        let searchInput = document.getElementById('searchInput').value;

        console.log('Searching for:', searchInput);

        let searchURL = 'https://terraria.fandom.com/wiki/' + encodeURIComponent(searchInput);

        chrome.runtime.sendMessage({ action: 'searchAndReturnResult', searchTerm: searchInput, searchURL: searchURL });
    }

    function displayInfobox(content) {
        let resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = content;
    }

    function connectToBackground() {
        port = chrome.runtime.connect({ name: "popup" });

        port.onDisconnect.addListener(function () {
            console.error("Disconnected from the background script. Try reloading the extension.");

        });

        port.onMessage.addListener(function (msg) {
            if (msg.action === 'connected') {
                console.log('Connected to the background script');
                document.getElementById('searchButton').addEventListener('click', function () {
                    searchWebsite();
                });
                searchWebsite();
            } else if (msg.action === 'displayInfobox') {
                console.log('Received displayInfobox message:', msg);
                displayInfobox(msg.content);
            }
        });
    }


    connectToBackground();

    window.searchWebsite = searchWebsite;
});
