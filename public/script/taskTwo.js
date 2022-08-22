const formElement = document.forms['formElement'];

const focus = function(evt) {
  const activeElement = formElement.querySelector('.focused');

  if (activeElement) {
    activeElement.classList.remove('focused');
  }
  evt.target.classList.add('focused');
}

const blur = function() {
  const activeElement = formElement.querySelector('.focused');

  if (activeElement) {
     activeElement.classList.remove('focused');  
  }
}

formElement.addEventListener('focus', event => focus(event), true);

formElement.addEventListener('blur', blur, true);
