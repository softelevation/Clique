import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Keyboard,
  Alert,
  ImageBackground,
  SafeAreaView,
  Platform,
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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

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
      googleLoader: false,
      fbLoader: false,
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
      social_type: 'N',
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

  async componentDidMount() {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '917108325882-necf07egskm154tngl8a0o2qg6n81ae7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }

  signIn = async () => {
    this.setState({
      googleLoader: true,
    });
    try {
      GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'user');
      const {email, name, id, photo} = userInfo.user;
      const data = {
        social_type: 'G',
        social_token: id,
        name: name || '',
        email: email,
        avatar: photo || null,
        password: '12345678',
      };
      console.log(data, 'data');
      Webservice.post(APIURL.userLogin, data)
        .then(async (response) => {
          if (response.data == null) {
            this.setState({googleLoader: false});
            // alert('error');
            Alert.alert(response.originalError.message);

            return;
          }
          console.log(
            'Get Register User Response : ' + JSON.stringify(response),
          );

          if (response.data.status === true) {
            this.setState({googleLoader: false});
            this.props.navigation.navigate('Dashboard');
            await AsyncStorage.setItem(
              'user_id',
              JSON.stringify(response.data.data.user.user_id),
            );
          } else {
            this.setState({googleLoader: false});
            this.showAlert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.message);
          this.setState({googleLoader: false});
          Alert.alert(
            error.message,
            '',
            [
              {
                text: 'Try Again',
                onPress: () => {
                  this.signIn();
                },
              },
            ],
            {cancelable: false},
          );
        });
      // dispatch(registerRequest(data));
    } catch (error) {
      console.log(error, 'error');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        this.setState({
          googleLoader: false,
        });

        //Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        this.setState({
          googleLoader: false,
        });

        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.setState({
          googleLoader: false,
        });

        Alert.alert('play services not available or outdated');
      } else {
        this.setState({
          googleLoader: false,
        });

        Alert.alert('Something went wrong', error.toString());
      }
    }
  };

  fbLogin = async () => {
    var self = this;
    self.setState({
      fbLoader: true,
    });
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logOut();
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          const _responseInfoCallback = (error, result) => {
            if (error) {
              console.log('Error fetching data: ' + error.toString());
              self.setState({
                fbLoader: false,
              });
            } else {
              console.log(result, 'user');

              const data = {
                social_type: 'F',
                social_token: result.id,
                name: result.name || '',
                email: result.email || `${result.id}@facebook.com`,
                password: '12345678',
                avatar: result.picture.data.url || null,
              };
              console.log('Success fetching data: ', data);
              Webservice.post(APIURL.userLogin, data)
                .then(async (response) => {
                  if (response.data == null) {
                    // alert('error');
                    Alert.alert(response.originalError.message);
                    self.setState({
                      fbLoader: false,
                    });
                    return;
                  }
                  console.log('Get Register User Response : ' + response);

                  if (response.data.status === true) {
                    self.props.navigation.navigate('Dashboard');
                    await AsyncStorage.setItem(
                      'user_id',
                      JSON.stringify(response.data.data.user.user_id),
                    );
                  } else {
                    //
                    self.showAlert(response.data.message);
                  }
                })
                .catch((err) => {
                  self.setState({fbLoader: false});
                  console.log(err.message);
                  Alert.alert(
                    err.message,
                    '',
                    [
                      {
                        text: 'Try Again',
                        onPress: () => {
                          self.fbLogin(true);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                });
            }
          };
          // Create a graph request asking for user information with a callback to handle the response.
          const infoRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string:
                    'email,name,first_name,middle_name,last_name,picture.type(large)',
                },
              },
            },
            _responseInfoCallback,
          );
          console.log(infoRequest, 'infoRequest');
          // Start the graph request.
          const res = new GraphRequestManager().addRequest(infoRequest).start();
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          console.log(result, 'result', res);
          self.setState({fbLoader: false});
        }
      },
      function (error) {
        self.setState({fbLoader: false});
        console.log('Login fail with error: ' + error);
      },
    );
  };

  render() {
    return (
      <LinearGradient colors={['#6961FF', '#E866B6']} style={styles.container}>
        <SafeAreaView />
        <Block padding={[hp(2), 0, 0]} flex={false} center>
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
                  isLoading={this.state.fbLoader}
                  onPress={() => this.fbLogin()}
                  iconStyle={{marginTop: hp(0.8)}}
                  icon="facebook_icon"
                  iconWithText
                  color="secondary">
                  Sign in with Facebook
                </Button>
                <Button
                  onPress={() => this.signIn()}
                  isLoading={this.state.googleLoader}
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
