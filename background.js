chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });


  function url_domain(data) {
    var    a      = document.createElement('a');
           a.href = data;
    return a.hostname;
  }

  chrome.tabs.onCreated.addListener(function(tab) {

    var sites = {}
    chrome.storage.sync.get('sites', function(result) {
        sites=result['sites']
        if (sites[url_domain(tab.pendingUrl)] && sites[url_domain(tab.pendingUrl)]>Date.now())
        {
            chrome.tabs.remove(tab.id)
        }
    });
  })
