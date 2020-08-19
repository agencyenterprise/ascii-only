(() => {
  const asciiOnlyOnAccountForms = () => {
    const forms = document.getElementsByTagName('form');

    if (!forms || forms.length < 1) {
      return;
    }

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];

      // Shopify account address input fields
      const addressForm = {
        firstName: {
          query: '[name="address[first_name]"]',
          valid: true,
        },
        lastName: {
          query: '[name="address[last_name]"]',
          valid: true,
        },
        company: {
          query: '[name="address[company]"]',
          valid: true,
        },
        address1: {
          query: '[name="address[address1]"]',
          valid: true,
        },
        address2: {
          query: '[name="address[address2]"]',
          valid: true,
        },
        city: {
          query: '[name="address[city]"]',
          valid: true,
        },
        zip: {
          query: '[name="address[zip]"]',
          valid: true,
        },
        phone: {
          query: '[name="address[phone]"]',
          valid: true,
        },
      };

      const addressSubmitBtnEl = form.querySelector('[type="submit"]');

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
        errorMessageEl.style.position = 'absolute'; // this is not okay, but float would break the layout
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
        (event) => {
          const rforeign = /[^\u0000-\u007f]/;

          if (rforeign.test(event.target.value)) {
            event.preventDefault();

            setInputError(addressInput, addressInputEl);

            return disableAddressSubmit(addressInput);
          }

          removeInputError(addressInput, addressInputEl);

          return enableAddressSubmit(addressInput);
        }
      );

      const asciiOnlyInForm = () => {
        Object.values(addressForm).forEach((addressInput) => {
          const addressInputEl = form.querySelector(addressInput.query);

          if (addressInputEl) {
            const onInputUpdate = validateNonLatin(addressInput, addressInputEl);

            addressInputEl.addEventListener('input', onInputUpdate);
            // For address autocomplete automatically filling up city field
            addressInputEl.addEventListener('change', onInputUpdate);
          }
        });
      };

      asciiOnlyInForm();
    }
  };

  document.addEventListener('DOMContentLoaded', asciiOnlyOnAccountForms);
})();
