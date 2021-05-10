import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';

//Constant Files
import {CommonColors} from '../Constants/ColorConstant';
import {SetFontSize} from '../Constants/FontSize';
import {ConstantKeys} from '../Constants/ConstantKey';
import LoadingView from '../Constants/LoadingView';
import Webservice from '../Constants/API';
import {APIURL} from '../Constants/APIURL';
import Snackbar from 'react-native-snackbar';
import {images} from '../Assets/Images/images';
import {Block, Button, Input, Text} from '../components';
import {hp, wp} from '../components/responsive';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      txtMobileNo: '',
      MobileBorderColor: CommonColors.GhostColor,
      ShowPassword: true,
      isDisable: true,
      countryCode: '91',
    };
  }

  componentDidMount() {}

  showAlert(text) {
    Snackbar.show({
      text: text,
      backgroundColor: CommonColors.errorColor,
      textColor: CommonColors.whiteColor,
      // fontFamily: ConstantKeys.Averta_BOLD,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  API_LOGIN(isload) {
    this.setState({isloading: isload});

    Webservice.post(APIURL.login, {
      mobile: this.state.countryCode + '-' + this.state.txtMobileNo,
    })
      .then((response) => {
        if (response.data == null) {
          this.setState({isloading: false});
          // alert('error');
          alert(response.originalError.message);

          return;
        }
        //   console.log(response);

        console.log('Get Register User Response : ' + JSON.stringify(response));

        if (response.data.status == true) {
          this.setState({isloading: false});

          var OTP = response.data.otp;

          this.props.navigation.navigate('OTPView', {
            mobile_no: this.state.txtMobileNo,
            country_code: this.state.countryCode,
            otp: OTP,
          });
        } else {
          this.setState({isloading: false});
          this.showAlert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({isloading: false});
        Alert.alert(
          error.message,
          '',
          [
            {
              text: 'Try Again',
              onPress: () => {
                this.API_LOGIN(true);
              },
            },
          ],
          {cancelable: false},
        );
      });
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  validatePassword = (password) => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
    );
    return strongRegex.test(password);
  };

  // Action Methods
  btnForgotPasswordTap = () => {
    requestAnimationFrame(() => {
      this.props.navigation.navigate('ForgotPassword', {isFromTutorial: false});
    });
  };

  // Action Methods
  btnSignUpTap = () => {
    requestAnimationFrame(() => {
      this.props.navigation.navigate('RegisterName', {isFromTutorial: false});
    });
  };

  btnLoginTap = () => {
    requestAnimationFrame(() => {
      Keyboard.dismiss();

      // this.props.navigation.navigate('Congratulation')
      // return

      if (this.state.txtMobileNo == '') {
        this.showAlert('Please Enter Mobile Number');
      } else {
        this.API_LOGIN(true);
      }
    });
  };

  _selectedCountry = (index) => {
    this.setState({countryCode: index});
  };

  //Helper Methods For TextInput
  onFocus() {
    this.setState({
      MobileBorderColor: CommonColors.SlateBlueColor,
    });
  }

  onBlur() {
    this.setState({
      MobileBorderColor: CommonColors.GhostColor,
    });
  }

  render() {
    return (
      <ImageBackground
        imageStyle={{
          resizeMode: 'stretch', // works only here!
        }}
        source={images.loginBg}
        style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
          <Block middle padding={[0, wp(3)]}>
            <Text center size={30} semibold white margin={[hp(4), 0]}>
              {'Login Into\nYour Account'}
            </Text>
            <Input placeholder="Enter Email" />
            <Input placeholder="Password" />
            <Block flex={false} margin={[hp(0.5), 0]} />
            <Button
              iconStyle={{marginTop: hp(0.8)}}
              icon="instagram"
              iconWithText
              color="secondary">
              Sign in with Instagram
            </Button>
            <Button
              iconStyle={{marginTop: hp(0.8)}}
              icon="google"
              iconWithText
              color="secondary">
              Sign in with Google
            </Button>
            <Button style={{marginTop: hp(2)}} color="primary">
              Login
            </Button>
            <Text
              margin={[hp(1), 0]}
              size={14}
              white
              regular
              right
              onPress={() => this.btnForgotPasswordTap()}>
              Forgot Password ?
            </Text>
          </Block>
        </ScrollView>

        <Text
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 15,
            textAlign: 'center',
            flexDirection: 'row',
            marginBottom: 30,
            fontFamily: ConstantKeys.Averta_REGULAR,
            fontSize: SetFontSize.ts14,
            color: CommonColors.whiteColor,
          }}>
          Don't have an account yet?{' '}
          <Text
            style={{
              fontFamily: ConstantKeys.Averta_BOLD,
              fontSize: SetFontSize.ts14,
              color: CommonColors.whiteColor,
              textDecorationLine: 'underline',
            }}
            onPress={() => this.btnSignUpTap()}>
            Sign Up{' '}
          </Text>
        </Text>

        {this.state.isloading ? <LoadingView /> : null}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  btnLogin: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtLogin: {
    color: CommonColors.whiteColor,
    fontSize: SetFontSize.ts16,
    fontFamily: ConstantKeys.Averta_BOLD,
  },
  viewCountrystyle: {
    flexDirection: 'row',
    height: 50,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    color: CommonColors.MortarColor,
    fontSize: SetFontSize.ts16,
    fontFamily: ConstantKeys.Averta_REGULAR,
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    fontSize: SetFontSize.ts18,
    color: CommonColors.blackColor,
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: CommonColors.whiteColor,
    fontSize: SetFontSize.ts16,
    fontFamily: ConstantKeys.Averta_REGULAR,
    textAlign: 'center',
  },
  countryNameTextStyle: {
    paddingLeft: 10,
    color: CommonColors.blackColor,
    textAlign: 'right',
  },
  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
});
