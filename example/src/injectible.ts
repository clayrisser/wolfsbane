function overrideConfirm() {
  // @ts-ignore
  confirm = function() {
    alert('Ha! confirm() is now overridden!');
  };
  confirm();
}

window.addEventListener('myCmdEvent', function(event) {
  console.log('im here!');
  debugger;
  // @ts-ignore
  if (event.detail === 'overrideConfirm') {
    overrideConfirm();
  }
});
