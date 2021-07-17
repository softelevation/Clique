import Snackbar from 'react-native-snackbar';
import {images} from '../Assets/Images/images';
import {CommonColors} from '../Constants/ColorConstant';

export const showAlert = (text) => {
  Snackbar.show({
    text: text,
    backgroundColor: CommonColors.errorColor,
    textColor: CommonColors.whiteColor,
    // fontFamily: ConstantKeys.Averta_BOLD,
    duration: Snackbar.LENGTH_LONG,
  });
};
export const getCardType = (number) => {
  // visa
  let re = new RegExp('^4');
  if (number.match(re) != null) {
    return 'Visa';
  }

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number,
    )
  ) {
    return 'mastercard';
  }

  // AMEX
  re = new RegExp('^3[47]');
  if (number.match(re) != null) {
    return 'AMEX';
  }

  // Discover
  re = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
  );
  if (number.match(re) != null) {
    return 'Discover';
  }

  // Diners
  re = new RegExp('^36');
  if (number.match(re) != null) {
    return 'Diners';
  }

  // Diners - Carte Blanche
  re = new RegExp('^30[0-5]');
  if (number.match(re) != null) {
    return 'Diners - Carte Blanche';
  }

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])');
  if (number.match(re) != null) {
    return 'JCB';
  }

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (number.match(re) != null) {
    return 'Visa Electron';
  }

  return '';
};
export const cc_expires_format = (string) => {
  return string
    .replace(
      /[^0-9]/g,
      '', // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      '0$1', // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      '0$1/$2', // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      '0', // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      '$1/$2', // To handle 113 > 11/3
    );
};
export const cc_format = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  }
  return value;
};
export const getCardColor = (card) => {
  switch (card.toString().toLowerCase()) {
    case 'jcb':
      return 'jcb';
    case 'discover':
      return 'discover';
    case 'diners':
      return 'diners';
    case 'amex':
      return 'amex';
    case 'diners - carte blanche':
      return 'diner';
    case 'visa':
      return 'visa';
    case 'mastercard':
      return 'mastercard';
    default:
      return '';
  }
};
export const checkColor = (type) => {
  switch (type) {
    case 0:
      return '#E3674B';
    case 1:
      return '#E3674B';
    case 2:
      return '#E3674B';
    case 3:
      return '#4BB6E3';
    case 4:
      return '#4BB6E3';
    case 5:
      return '#4BB6E3';
    case 6:
      return '#4BB6E3';
    case 7:
      return '#4BE351';
    case 8:
      return '#4BE351';
    case '':
      return '#E3674B';
    default:
      return '#4BE351';
  }
};
