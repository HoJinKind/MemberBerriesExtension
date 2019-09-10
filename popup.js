var storage = chrome.storage.local;
var message = document.querySelector('#message');

var submitButton = document.getElementById('submit_button');
var textarea = document.getElementById('save_text');
var textareaTitle = document.getElementById('save_text_title');
var optionsUrl = chrome.extension.getURL('options.html');
message.innerHTML = 'Access your saved text in <a target="_blank" href="' +
optionsUrl + '">here</a> or options menu.';
// Check if there is CSS specified.

submitButton.addEventListener('click', saveText);

function saveText() {
  // Get the current CSS snippet from the form.
  var toSaveText = textarea.value;
  var textTitle = textareaTitle.value;
  // Check that there's some code there.
  if (!toSaveText) {
    return;
  }
  storage.set({[textTitle]: toSaveText});
  textarea.value = ""
  textareaTitle.value = ""
}