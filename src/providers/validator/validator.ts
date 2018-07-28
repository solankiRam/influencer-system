import { Validators, ValidatorFn } from '@angular/forms';

export namespace Validator {

  export const emailValidator = ['', [
    Validators.minLength(5),
    Validators.required,
    // Validators.pattern('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$')]
    Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]

  ];

  export const emailNotReqValidator = ['', [
    Validators.minLength(5),
    // Validators.pattern('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$')]
    Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]
  ];

  export const passwordValidator = ['', [
    Validators.minLength(6),
    Validators.maxLength(16),
    Validators.required,]
  ];
  export const phoneNumberValidator = ['', [
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.required,
    Validators.pattern('^[0-9]{8}$')]
    // Validators.pattern('^[7-9][0-9]{9}$')]
  ];
  
  export const requiredValidator = ['', [
    Validators.required]
  ];

  export const profileNameValidator = {
    minLength: 5,
    lengthError: { title: 'Name Too Short!', subTitle: 'Sorry, but name must be more than 4 characters.' },
    pattern: /^[a-zA-Z0-9\s]*$/g,
    patternError: { title: 'Invalid Name!', subTitle: 'Sorry, but the name you entered contains special characters.' }
  };
  export const profileEmailValidator = {
    pattern: /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/g,
    patternError: { title: 'Invalid Email Address!', subTitle: 'Sorry, but the email you have entered is invalid.' }
  };
  export const profilePasswordValidator = {
    minLength: 5,
    lengthError: { title: 'Password Too Short!', subTitle: 'Sorry, but password must be more than 4 characters.' },
    pattern: /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/g,
    patternError: { title: 'Invalid Password!', subTitle: 'Sorry, but the password you have entered contains special characters.' }
  };


}