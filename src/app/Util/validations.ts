import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Validator {
  constructor() { }

  emailValidator(email) {
    if (/(\.)\1|(\-)\1|(\_)\1+/g.test(email)) {
      return false;
    } else {
      var re = /^(([a-zA-Z]+)|([0-9]*[a-zA-Z]+))+([a-zA-Z0-9\.\-\_]*)@(([a-zA-Z]+)+(\.+)+[a-zA-Z]{2,})$/;
      return re.test(email.toString());
    }
  }

  emptyFieldValidator(fieldText) {
    if (fieldText === "" || fieldText === undefined) {
      return true;
    } else {
      return false;
    }
  }

  phoneNumberValidator(phoneNumber) {
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return regex.test(phoneNumber);
  }

  onlyNumbersValidator(numbers) {
    var pattern = /^[0-9]+$/;
    return pattern.test(numbers);
  }

  nameValidator(name) {
    var regex = /^([a-zA-Z]+)(\ )([a-zA-Z]+)$/;
    return regex.test(name);
  }

  passwordValidator(password) {
    if (password.length < 8 || password.length > 16) {
      return false;
    }
    else {
      return true;
    }
  }

  urlValidator(url) {
    var regex = /^https:\/\/([\w\d]+[\w\d\/\.\-\@\_]*)\.git$/;
    return regex.test(url);
  }

  panValidator(panNumber) {
    var regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    return regex.test(panNumber);
  }

  zipCodeValidator(zipCode) {
    var regex = /^([0-9]){6}$/
    return regex.test(zipCode);
  }
  gstValidator(gstNumber) {
    var regex = /^([0-9]){2}([A-Z]){5}([0-9]){4}([A-Z]){1}([1-9A-Z]){1}Z([0-9A-Z]){1}$/;
    return regex.test(gstNumber);
  }


}
