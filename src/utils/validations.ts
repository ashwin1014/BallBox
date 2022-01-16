import {
  parsePhoneNumberFromString,
  CountryCode,
} from 'libphonenumber-js/mobile';

/**
 * It takes a phone number and a country code and returns true if the phone number is valid for that
country.
 * @param {string | number} phoneNumber - string | number
 * @param {CountryCode} country - CountryCode
 * @returns A boolean value.
 */
const isPhoneNumberValid = (
  phoneNumber: string | number,
  country: CountryCode = 'IN',
): boolean => {
  const mobilePhoneNumber = parsePhoneNumberFromString(
    `Phone: ${phoneNumber.toString()}`,
    country,
  );
  if (mobilePhoneNumber) {
    if (
      mobilePhoneNumber.country === country &&
      mobilePhoneNumber.getType() === 'MOBILE'
    ) {
      return true;
    }
    return false;
  }
  return false;
};

export {isPhoneNumberValid};
