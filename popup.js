  function url_domain(data) {
    console.log(data)
    var    a      = document.createElement('a');
           a.href = data;
    console.log(a.hostname)
    return a.hostname;
  }

  function bannir(time){
    chrome.tabs.query(
        {
              currentWindow: true,
              active: true
        },
          function (tabs){
            currentTab=tabs[0]

            var sites = {}
            chrome.storage.sync.get('sites', function(result) {
                if (result) {
                    sites = result
                }
            })
            sites[url_domain(currentTab.url)]=time.getTime()
            chrome.storage.sync.set({'sites': sites}, function() {
                console.log('Site ' + url_domain(currentTab.url) + ' banni jusqu\'à '+time);
            });
          chrome.tabs.remove(currentTab.id)
        })
  }



  let ban = document.getElementById('ban');
  let banHour = document.getElementById('banHour');
  let banDay = document.getElementById('banDay');
  
  ban.onclick = function(element) {
    bannir(new Date(3000,11,31))
  }
  banHour.onclick = function(element) {
    var time = new Date()
    time.setHours(time.getHours()+1)
    bannir(time)
  }
  banDay.onclick = function(element) {
    var time = new Date()
    time.setDate(time.getDate()+1)
    bannir(time)
  }