import Snackbar from 'react-native-snackbar';
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
