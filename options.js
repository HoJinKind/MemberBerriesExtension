// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Store CSS data in the "local" storage area.
//
// Usually we try to store settings in the "sync" area since a lot of the time
// it will be a better user experience for settings to automatically sync
// between browsers.
//
// However, "sync" is expensive with a strict quota (both in storage space and
// bandwidth) so data that may be as large and updated as frequently as the CSS
// may not be suitable.
var storage = chrome.storage.local;
//here, we store data in local storage
// Get at the DOM controls used in the sample.

// Load any CSS that may have previously been saved.
generateBerries();

//this is the 
function generateBerries(){
  storage.get(null, function(items) {
    console.log(items);
    var resetButtons = {};
    var submitButtons = {};
    var textFields = {};

    if(!  Object.keys(items).length){
            // Create a <button> element
        let empty = document.createTextNode("You have no berries :(");
        document.body.appendChild(empty);   
    }
    for(let key in items){
      textFields[key] = document.createElement("textarea");
      textFields[key].value = items[key]
      submitButtons[key] = document.createElement("button");
      var title = document.createTextNode(key);
      resetButtons[key] = document.createElement("button");        // Create a <button> element
      var save_text = document.createTextNode("save");       // Create a text node
      submitButtons[key].appendChild(save_text);    
      var reset_text = document.createTextNode("remove");       // Create a text node
      resetButtons[key].appendChild(reset_text); 
      createBreak();    
      document.body.appendChild(title);
      createBreak();
      document.body.appendChild(textFields[key]);
      createBreak();
      document.body.appendChild(submitButtons[key]);
      document.body.appendChild(resetButtons[key]);
      submitButtons[key].addEventListener('click', function(){saveChanges(key,textFields[key].value)}, false);
      resetButtons[key].addEventListener('click', function(){reset(key);}, false); 
  }
  })
}

function createBreak(){
  let br = document.createElement("br");   
  document.body.appendChild(br); 
}

function loadChanges() {
  storage.get(null, function(items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.blabla) {
      textarea.value = items.blabla;
      console.log(Object.keys(items).length);
      for(var key in items) {
        var value = items[key];
        // do something with "key" and "value" variables
        console.log(value)
      }
      message('Loaded saved berries');
    }
  });
}

function reset(dict_key) {
  // Remove the saved value from storage. storage.clear would achieve the same
  // thing.
  storage.remove(dict_key, function(items) {
    message('Reset stored CSS');
  });
  location.reload();
}

function saveChanges(dict_key,value) {
  // Get the current CSS snippet from the form.
  // Check that there's some code there.
  if (!value) {
    message('Error: No Berry specified');
    return;
  }

  // Save it using the Chrome extension storage API.
  // so if we were to store, we need to retrieve the list, before appending, no?, unl;ess we do it as a dict, which is better
  console.log(value)

  console.log(dict_key)
  storage.set({[dict_key] : value}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}

function message(msg) {
  var message = document.querySelector('.message');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}
