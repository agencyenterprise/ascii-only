var addressForm = {
  firstName: {
    query: '#checkout_shipping_address_first_name',
    valid: true
  },
  lastName: {
    query: '#checkout_shipping_address_last_name',
    valid: true
  },
  address1: {
    query: '#checkout_shipping_address_address1',
    valid: true
  },
  address2: {
    query: '#checkout_shipping_address_address2',
    valid: true
  },
  city: {
    query: '#checkout_shipping_address_city',
    valid: true
  },
  zip: {
    query: '#checkout_shipping_address_zip',
    valid: true
  },
  phone: {
    query: '#checkout_shipping_address_phone',
    valid: true
  }
};
var addressFormKeys = Object.keys(addressForm);
var addressSubmitBtn = 'button.step__footer__continue-btn';
var addressSubmitBtnEl = document.querySelector(addressSubmitBtn);

function isFormValid() {
  for (var i = 0; i < addressFormKeys.length; i++) {
    var addressInputKey = addressFormKeys[i];
    var addressInput = addressForm[addressInputKey];

    if (!addressInput.valid) {
      return false;
    }
  }

  return true;
}
function disableAddressSubmit(addressInput) {
  if (!addressInput.valid) {
    return;
  }

  addressInput.valid = false;
  addressSubmitBtnEl.disabled = true;
  addressSubmitBtnEl.style.opacity = 0.8;
}
function enableAddressSubmit(addressInput) {
  if (addressInput.valid) {
    return;
  }

  addressInput.valid = true;

  if (isFormValid()) {
    addressSubmitBtnEl.disabled = false;
    addressSubmitBtnEl.style.opacity = 1;
  }
}
function setInputError(addressInput, addressInputEl) {
  if (!addressInput.valid) {
    return;
  }

  addressInputEl.style.border = 'red 1px solid';

  var errorMessageEl = document.createElement("div");
  errorMessageEl.innerHTML = 'You should provide valid latin characters.';
  errorMessageEl.className = 'error-message';
  errorMessageEl.style.marginTop = '6px';
  errorMessageEl.style.color = 'red';

  addressInputEl.parentNode.appendChild(errorMessageEl);
}
function removeInputError(addressInput, addressInputEl) {
  if (addressInput.valid) {
    return;
  }

  addressInputEl.style.border = 'none';
  var errorMessageEl = addressInputEl.parentNode.querySelector('.error-message');

  if (errorMessageEl) {
    errorMessageEl.remove();
  }
}

function validateNonLatin(addressInput) {
  return function(e) {
    var rforeign = /[^\u0000-\u007f]/;

    if (rforeign.test(e.target.value)) {
      e.preventDefault();

      setInputError(addressInput, this);

      return disableAddressSubmit(addressInput);
    } else {
      removeInputError(addressInput, this);

      return enableAddressSubmit(addressInput);
    }
  };
}

for (var i = 0; i < addressFormKeys.length; i++) {
  var addressInputKey = addressFormKeys[i];
  var addressInput = addressForm[addressInputKey];
  var addressInputEl = document.querySelector(addressInput.query);

  if (addressInputEl) {
    addressInputEl.addEventListener('input', validateNonLatin(addressInput));
  }
}
