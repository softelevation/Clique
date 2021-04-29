import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Keyboard,
    Dimensions,
    Alert,
    ImageBackground,
    SafeAreaView,
    Image
} from 'react-native';

//Constant Files
import { CommonColors } from '../Constants/ColorConstant';
import { IMG } from '../Constants/ImageConstant';
import { SetFontSize } from '../Constants/FontSize';
import { ConstantKeys } from '../Constants/ConstantKey';
import LoadingView from '../Constants/LoadingView';
import Webservice from '../Constants/API';
import { APIURL } from '../Constants/APIURL';
import Snackbar from 'react-native-snackbar';
import CountryPicker from 'rn-country-picker';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { images } from '../Assets/Images/images';
import { Block, Button, Input, Text } from '../components';
import { hp, wp } from '../components/responsive';
import { CONNECTION_ERROR } from 'apisauce';

export default class ForgotPasswordThree extends Component {
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

    componentDidMount() {
       // alert('ss')
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


    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };



    // Action Methods
    btnSignUpTap = () => {
        requestAnimationFrame(() => {
            this.props.navigation.navigate('RegisterName', { isFromTutorial: false });
        });
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

    setNewPwdClick = () => {
        requestAnimationFrame(() => {
            this.props.navigation.navigate('ForgotPasswordTwo', { isFromTutorial: false });
        });
    };


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground source={images.forgotBg} style={styles.container}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                        <Image style={{ alignSelf: 'center', marginTop: 10, height: 140, width: 140, resizeMode: 'contain' }}
                            source={images.nameBg}
                        />
                        <Block backgroundColor={'#FDFFFF'} borderTopRightRadius={30} borderTopLeftRadius={30} middle padding={[0, wp(1)]}>

                            <Text style={{ color: CommonColors.PurpleColor, fontSize: SetFontSize.ts25, }} center size={30} color={CommonColors.PurpleColor} semibold white margin={[hp(4), 0]}>
                                {'Recover Password'}
                            </Text>

                            <Input style={{
                                marginTop: hp(0), marginLeft: wp(4),
                                marginRight: wp(4),
                                shadowColor: CommonColors.btnShadowColor,
                                backgroundColor: 'white',
                                shadowOpacity: 0.1,
                                shadowRadius: 1,
                                shadowOffset: {
                                    height: 0,
                                    width: 0,
                                },
                                elevation: 1,
                            }} color="#F2F0F7" placeholder="Password" placeholderTextColor={'#707070'} />
                            <Input style={{
                                marginTop: hp(0), marginLeft: wp(4),
                                marginRight: wp(4),
                                shadowColor: CommonColors.btnShadowColor,
                                backgroundColor: 'white',
                                shadowOpacity: 0.1,
                                shadowRadius: 1,
                                shadowOffset: {
                                    height: 0,
                                    width: 0,
                                },
                                elevation: 1,
                            }} color="#F2F0F7" placeholder=" Confirm Password" placeholderTextColor={'#707070'} />

                            {/* <Block middle padding={[0, wp(3)]}>

                                <Image style={{ alignSelf: 'flex-end', marginTop: 10, marginRight: 20, height: hp(15), width: wp(18), resizeMode: 'contain' }}
                                    source={images.spotify}
                                />

                                <Image style={{ marginLeft: 20, height: hp(15), width: wp(20), resizeMode: 'contain' }}
                                    source={images.applePay}
                                />

                            </Block> */}

                            <TouchableOpacity style={{ marginTop: hp(15), }} onPress={() => this.btnResetTap()}>
                                <LinearGradient
                                    colors={[CommonColors.gradientStart, CommonColors.gradientEnd]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.btnSignUp}>
                                    <Text style={[styles.txtSignUp,{color:'white'}]}>Reset Password</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                           

                        </Block>
                    </ScrollView>


                    {this.state.isloading ? <LoadingView /> : null}
                </ImageBackground>
            </SafeAreaView>
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

    btnSignUp: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        backgroundColor: CommonColors.PurpleColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtSignUp: {
        color: '#707070',
        fontSize: SetFontSize.ts16,
        fontFamily: ConstantKeys.Averta_REGULAR,
        textAlign: 'center',
        marginTop: 10
    },

    txtAlreadyAccount: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        textAlign: 'center',
        flexDirection: 'row',
        marginBottom: 25,
        fontFamily: ConstantKeys.Averta_REGULAR,
        fontSize: SetFontSize.ts14,
        color: CommonColors.PurpleColor,
        textDecorationLine: 'underline',
    },
});
