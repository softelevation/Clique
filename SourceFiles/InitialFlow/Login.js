import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, TextInput, Keyboard, Dimensions, Alert } from 'react-native';

//Constant Files
import { CommonColors } from '../Constants/ColorConstant'
import { IMG } from '../Constants/ImageConstant'
import { SetFontSize } from '../Constants/FontSize'
import { ConstantKeys } from '../Constants/ConstantKey'
import ValidationMsg from '../Constants/ValidationMsg';
import LoadingView from '../Constants/LoadingView'
import Webservice from '../Constants/API'
import { APIURL } from '../Constants/APIURL'

//Third Party
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import CountryPicker from 'rn-country-picker';
import { Neomorph, Shadow, NeomorphFlex } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      txtMobileNo: '',
      MobileBorderColor: CommonColors.GhostColor,
      ShowPassword: true,
      isDisable: true,
      countryCode: '91'
    };
  }

  componentDidMount() {

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


  API_LOGIN(isload) {
    this.setState({ isloading: isload })

    Webservice.post(APIURL.login, {
      mobile: this.state.countryCode + "-" + this.state.txtMobileNo,
    })
      .then(response => {

        if (response.data == null) {
          this.setState({ isloading: false });
          // alert('error');
          alert(response.originalError.message);

          return
        }
        //   console.log(response);

        console.log('Get Register User Response : ' + JSON.stringify(response))

        if (response.data.status == true) {
          this.setState({ isloading: false })

          var OTP = response.data.otp

          this.props.navigation.navigate('OTPView', { mobile_no: this.state.txtMobileNo, country_code: this.state.countryCode, otp: OTP })


        } else {
          this.setState({ isloading: false })
          this.showAlert(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error.message)
        this.setState({ isloading: false, });
        Alert.alert(error.message, "", [
          {
            text: 'Try Again',
            onPress: () => {
              this.API_LOGIN(true)
            }
          },
        ],
          { cancelable: false })
      })
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };


  validatePassword = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
    return strongRegex.test(password);
  }


  // Action Methods
  btnSignUpTap = () => {
    requestAnimationFrame(() => {

      this.props.navigation.navigate('RegisterName', { isFromTutorial : false})
    })
  }


  btnLoginTap = () => {
    requestAnimationFrame(() => {

      Keyboard.dismiss()

      // this.props.navigation.navigate('Congratulation')
      // return

      if (this.state.txtMobileNo == '') {
        this.showAlert('Please Enter Mobile Number')
      }
      else {
        this.API_LOGIN(true)
      }

    })
  }


  _selectedCountry = (index) => {
    this.setState({ countryCode: index });
  };


  //Helper Methods For TextInput
  onFocus() {
    this.setState({
      MobileBorderColor: CommonColors.SlateBlueColor
    })
  }

  
  onBlur() {
    this.setState({
      MobileBorderColor: CommonColors.GhostColor
    })
  }


  render() {

    let Insta = IMG.InitialFlow.Insta
    let RedPlay = IMG.InitialFlow.RedPlay
    let LinkdId = IMG.InitialFlow.LinkdId
    let Background = IMG.OtherFlow.Background

    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: CommonColors.primaryColor }} />

        <StatusBar barStyle={'light-content'}
          backgroundColor={CommonColors.primaryColor}
        />
        <SafeAreaView style={styles.container}>

          <View style={{ flex: 1, }}>


            <FastImage source={Background}
                resizeMode={FastImage.resizeMode.cover}
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            />

            <View style={{ width: '100%', height: '100%', position:'absolute' }}>

            <View style={{ alignItems: 'center', justifyContent: 'center',}}>
          <Image source={IMG.InitialFlow.Clique}
            style={{ resizeMode: 'contain',  marginTop: 40, width: 130, height: 65, }}
          />
        </View>

              <View style={{ flex: 1,}}>

                <ScrollView style={{ width: '100%', position: 'absolute', }} bounces={false}>
                  <View style={{ marginTop: 30 }}>

                    <View style={{}}>
                      <Text style={{
                        marginLeft: 20, marginRight: 20, textAlign: 'center', fontSize: SetFontSize.ts30,
                        fontFamily: ConstantKeys.Averta_BOLD, color: CommonColors.whiteColor,
                      }}>
                        {"Login Into\nYour Account"}</Text>
                    </View>


                    <View style={{ flex: 1 }}>


                      <View style={{ flex: 1, width: '100%', }}>
                       

                          <View style={{ height: 50, backgroundColor: CommonColors.fildBgColor, borderRadius: 10, flexDirection: 'row', marginTop:50, marginRight:20,marginLeft:20 }}>

                            <CountryPicker
                              disable={false}
                              animationType={'slide'}
                              containerStyle={styles.viewCountrystyle}
                              pickerTitleStyle={styles.pickerTitleStyle}
                              selectedCountryTextStyle={styles.selectedCountryTextStyle}
                              countryNameTextStyle={styles.countryNameTextStyle}
                              searchBarPlaceHolder={'Search...'}
                              hideCountryFlag={true}
                              hideCountryCode={false}
                              searchBarStyle={styles.searchBarStyle}
                              countryCode={this.state.countryCode}
                              selectedValue={this._selectedCountry}
                            />

                            <TextInput
                              placeholder={'Mobile number'}
                              keyboardType={'number-pad'}
                              maxLength={15}
                              placeholderTextColor={CommonColors.whiteColor}
                              onBlur={() => this.onBlur()}
                              onFocus={() => this.onFocus()}
                              style={{
                                flex: 1, height: 50, color: CommonColors.whiteColor, fontSize: SetFontSize.ts16, fontFamily: ConstantKeys.Averta_REGULAR, marginLeft: 5
                              }}
                              value={this.state.txtMobileNo}
                              returnKeyType={'done'}
                              onChangeText={async (txtMobileNo) => {
                                await this.setState({ txtMobileNo: txtMobileNo.replace(/[^0-9]/g, '') })

                                if (this.state.txtMobileNo == '') {
                                  this.setState({ isDisable: true })
                                } else {
                                  this.setState({ isDisable: false })
                                }
                              }}
                            />

                          </View>


                        <LinearGradient colors={[CommonColors.gradientStart, CommonColors.gradientEnd]}
                          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                          style={styles.btnLogin}>

                          <TouchableOpacity style={{ width:'100%', height :'100%',alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.btnLoginTap()}>
                            <Text style={styles.txtLogin}>
                              Send OTP
</Text>
                          </TouchableOpacity>
                        </LinearGradient>

                        {/* <View style={this.state.isDisable ? styles.btnLoginDisable : styles.btnLoginEnable}>
                        <LinearGradient colors={['#945FEC', '#7137D1']} style={{width : '100%', height : '100%', borderRadius:15,}}>
                          <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                            disabled={this.state.isDisable}
                            onPress={() => this.btnLoginTap()}>
                            <Text style={styles.txtLogin}>
                              Send OTP
                        </Text>
                          </TouchableOpacity>
                        </LinearGradient>
                        </View> */}


                      </View>

                    </View>

                  </View>

                </ScrollView>

                

              </View>



              <Text style={{
                marginLeft: 20, marginRight: 20, marginTop: 15, textAlign: 'center', flexDirection: 'row',
                marginBottom: 30, fontFamily: ConstantKeys.Averta_REGULAR, fontSize: SetFontSize.ts14, color: CommonColors.whiteColor
              }}>
                Don't have an account yet? {" "}

                <Text style={{ fontFamily: ConstantKeys.Averta_BOLD, fontSize: SetFontSize.ts14, color: CommonColors.whiteColor, textDecorationLine:'underline' }}
                  onPress={() => this.btnSignUpTap()}>Sign Up </Text>

                </Text>

            </View>

          </View>

          

          {this.state.isloading ?
            <LoadingView />
            : null
          }

        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.primaryColor
  },
  viewClique: {
    backgroundColor: CommonColors.PurpleColor, width: 135, height: 150, alignSelf: 'center',
    borderBottomRightRadius: 67.5, borderBottomLeftRadius: 67.5, justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnLogin: {
    marginLeft: 20, marginRight: 20, marginTop:50, height: 50, 
    borderRadius : 10, alignItems: 'center', justifyContent: 'center'
  },
 
  txtLogin: {
    color: CommonColors.whiteColor, fontSize: SetFontSize.ts16, fontFamily: ConstantKeys.Averta_BOLD,
  },
  viewCountrystyle: {
    flexDirection: 'row',
    height: 50,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    color: CommonColors.MortarColor, fontSize: SetFontSize.ts16,
    fontFamily: ConstantKeys.Averta_REGULAR
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
    color: CommonColors.whiteColor, fontSize: SetFontSize.ts16, fontFamily: ConstantKeys.Averta_REGULAR,
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

})