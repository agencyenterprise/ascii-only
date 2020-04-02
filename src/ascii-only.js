// Shopify checkout address input fields
const addressForm = {
  firstName: {
    query: '#checkout_shipping_address_first_name',
    valid: true,
  },
  lastName: {
    query: '#checkout_shipping_address_last_name',
    valid: true,
  },
  address1: {
    query: '#checkout_shipping_address_address1',
    valid: true,
  },
  address2: {
    query: '#checkout_shipping_address_address2',
    valid: true,
  },
  city: {
    query: '#checkout_shipping_address_city',
    valid: true,
  },
  zip: {
    query: '#checkout_shipping_address_zip',
    valid: true,
  },
  phone: {
    query: '#checkout_shipping_address_phone',
    valid: true,
  },
};

const addressSubmitBtn = 'button.step__footer__continue-btn';
let addressSubmitBtnEl = document.querySelector(addressSubmitBtn);

const isFormValid = () => {
  const isInvalid = (addressInput) => !addressInput.valid;

  return !Object.values(addressForm).some(isInvalid);
};

const disableAddressSubmit = (addressInput) => {
  if (!addressInput.valid) {
    return;
  }

  addressInput.valid = false;
  addressSubmitBtnEl.disabled = true;
  addressSubmitBtnEl.style.opacity = 0.6;
};

const enableAddressSubmit = (addressInput) => {
  if (addressInput.valid) {
    return;
  }

  addressInput.valid = true;

  if (isFormValid()) {
    addressSubmitBtnEl.disabled = false;
    addressSubmitBtnEl.style.opacity = 1;
  }
};

const setInputError = (addressInput, addressInputEl) => {
  if (!addressInput.valid) {
    return;
  }

  addressInputEl.style.borderColor = 'red';

  const errorMessageEl = document.createElement('div');
  errorMessageEl.innerHTML = 'Please provide only valid english characters.';
  errorMessageEl.className = 'error-message';
  errorMessageEl.style.marginTop = '6px';
  errorMessageEl.style.color = 'red';

  addressInputEl.parentNode.appendChild(errorMessageEl);
};

const removeInputError = (addressInput, addressInputEl) => {
  if (addressInput.valid) {
    return;
  }

  addressInputEl.style.borderColor = '#d9d9d9';
  const errorMessageEl = addressInputEl.parentNode.querySelector('.error-message');

  if (errorMessageEl) {
    errorMessageEl.remove();
  }
};

const validateNonLatin = (addressInput, addressInputEl) => (
  ({target}) => {
    const rforeign = /[^\u0000-\u007f]/;

    if (rforeign.test(target.value)) {
      event.preventDefault();

      setInputError(addressInput, addressInputEl);

      return disableAddressSubmit(addressInput);
    }

    removeInputError(addressInput, addressInputEl);

    return enableAddressSubmit(addressInput);
  }
);

const asciiOnly = () => {
  Object.values(addressForm).forEach((addressInput) => {
    const addressInputEl = document.querySelector(addressInput.query);

    if (addressInputEl) {
       // Remove the old binding (if any)
       addressInputEl.removeEventListener('input', addressInput.bind);
       addressInputEl.removeEventListener('change', addressInput.bind);

       // bind again
       addressInput.bind = validateNonLatin(addressInput, addressInputEl);
       addressInputEl.addEventListener('input', addressInput.bind);
       addressInputEl.addEventListener('change', addressInput.bind);

       // Trigger
      addressInput.bind({target:addressInputEl});
    }
  });
};

const onChange = () =>{
  // bind again
  addressSubmitBtnEl = document.querySelector(addressSubmitBtn);
  asciiOnly();
}

document.addEventListener('DOMContentLoaded', asciiOnly);
document.addEventListener('page:change', onChange);
