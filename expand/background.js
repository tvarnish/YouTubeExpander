// background.js
// Called when the user clicks on the browser action button.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    var tabURL = activeTab.url;

    // Search for YouTube URL / already expanded URL.
    var httpsSearch = tabURL.search("https://www.youtube.com/");
    var alreadyExpandedSearch = tabURL.search("https://www.youtube.com/v/");

    // Check to make sure YouTube tab is currently selected, and not already expanded.
    if ((httpsSearch != -1) && (alreadyExpandedSearch == -1)) {
      // Get Video ID
      var videoIDIndex_Start = tabURL.search("v=") + "v=".length;
      var videoIDIndex_End = tabURL.search("&");

      if (videoIDIndex_End == -1) {
        videoIDIndex_End = tabURL.length;
      }

      var videoID = tabURL.slice(videoIDIndex_Start, videoIDIndex_End);

      // Create expanded URL.
      var newURL = "https://www.youtube.com/v/" + videoID;

      // Go to the expanded URL.
      chrome.tabs.update({url: newURL});
    }

  });
});
