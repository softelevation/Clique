import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
//Constant Files
import {CommonColors} from '../Constants/ColorConstant';
import {SetFontSize} from '../Constants/FontSize';
import {ConstantKeys} from '../Constants/ConstantKey';
import LoadingView from '../Constants/LoadingView';
import Webservice from '../Constants/API';
import {APIURL} from '../Constants/APIURL';
import Snackbar from 'react-native-snackbar';
import {images} from '../Assets/Images/images';
import {Block, Button, ImageComponent, Input, Text} from '../components';
import {hp, wp} from '../components/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

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

  showAlert(text) {
    Snackbar.show({
      text: text,
      backgroundColor: CommonColors.errorColor,
      textColor: CommonColors.whiteColor,
      // fontFamily: ConstantKeys.Averta_BOLD,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  API_LOGIN(isload) {}

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

  onSubmit = (values) => {
    this.setState({isloading: true});

    Webservice.post(APIURL.userLogin, {
      email: values.email,
      password: values.password,
    })
      .then(async (response) => {
        if (response.data == null) {
          this.setState({isloading: false});
          // alert('error');
          Alert.alert(response.originalError.message);

          return;
        }
        console.log('Get Register User Response : ' + JSON.stringify(response));

        if (response.data.status === true) {
          this.setState({isloading: false});
          this.props.navigation.navigate('Dashboard');
          await AsyncStorage.setItem(
            'user_id',
            JSON.stringify(response.data.data.user.user_id),
          );
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
                this.onSubmit(true);
              },
            },
          ],
          {cancelable: false},
        );
      });
  };

  render() {
    return (
      <LinearGradient colors={['#6961FF', '#E866B6']} style={styles.container}>
        <SafeAreaView />
        <Block flex={false} center>
          <ImageComponent height={64} width={128} name={'nameBg'} />
        </Block>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={this.onSubmit}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            setFieldValue,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
              <Block flex={false} middle padding={[0, wp(3)]}>
                <Text center size={30} semibold white margin={[hp(4), 0]}>
                  {'Login Into\nYour Account'}
                </Text>
                <Input
                  placeholder="Enter Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  error={touched.email && errors.email}
                />
                <Input
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  error={touched.password && errors.password}
                  secureTextEntry={true}
                />
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
                <Button
                  disabled={!isValid || !dirty}
                  onPress={handleSubmit}
                  style={{marginTop: hp(2)}}
                  color="primary">
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
          )}
        </Formik>
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
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
