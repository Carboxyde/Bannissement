chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });

  var sites = {
    'www.youtube.com':new Date(3000,12,31),
    'play.google.com':new Date(2020,04,06,21,47,0),
  }

  function url_domain(data) {
    console.log(data)
    var    a      = document.createElement('a');
           a.href = data;
    console.log(a.hostname)
    return a.hostname;
  }
/*
  function IsDomainEgal(tab, domain){
    return (url_domain(tab.url) == domain || url_domain(tab.pendingUrl)==domain)
}
function CloseIfDomainEgal(tab, domain){


    if (IsDomainEgal(tab, domain)){
      chrome.tabs.remove(tab.id)
      console.log("Closed page "+tab.pendingUrl)
      console.log("The domain "+domain+" is banned")
    }
}
*/

  chrome.tabs.onCreated.addListener(function(tab) {

    chrome.storage.sync.get(['sites'], function(sites) {
        if ((sites[url_domain(tab.pendingUrl)] && sites[url_domain(tab.pendingUrl)]>new Date()))
        {
            chrome.tabs.remove(tab.id)
            console.log("Closed page "+tab.pendingUrl)
            console.log("The domain "+url_domain(tab.pendingUrl)+" is banned")
            console.log(sites[url_domain(tab.pendingUrl)])
            console.log(new Date())
        }
    });
  })
