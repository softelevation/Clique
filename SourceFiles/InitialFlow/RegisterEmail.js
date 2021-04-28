import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, TextInput, Keyboard, Platform, Alert,
    FlatList, Dimensions, BackHandler
} from 'react-native';

//Constant Files
import { CommonColors } from '../Constants/ColorConstant'
import { IMG } from '../Constants/ImageConstant'
import { SetFontSize } from '../Constants/FontSize'
import { ConstantKeys } from '../Constants/ConstantKey'
import ValidationMsg from '../Constants/ValidationMsg';
import LoadingView from '../Constants/LoadingView'
import { APIURL } from '../Constants/APIURL'
import Webservice from '../Constants/API'


//Third Party
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { EventRegister } from 'react-native-event-listeners'
import { Neomorph, Shadow, NeomorphFlex } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';


export default class RegisterEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isloading: false,
            txtEmail: '',
            isDisable: true,
            NameBorderColor: CommonColors.GhostColor,
            isFromAutoLogin: props.route.params.is_from_autoLogin
        };
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }


    onBackPress = () => {

        if (this.state.isFromAutoLogin == false) {
            this.props.navigation.pop(1)
            return false
        }
        else {
            return true
        }

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


    // API Email Check Call
    API_EMAIL_CHECK(isload) {

        this.setState({ isloading: isload })

        Webservice.post(APIURL.emailCheck, {
            email: this.state.txtEmail
        })
            .then(response => {
                if (response.data == null) {
                    this.setState({ isloading: false });
                    // alert('error');
                    alert(response.originalError.message);
                    return
                }
                //   console.log(response);
                this.setState({ isloading: false });
                console.log('Get Email Check Response : ' + JSON.stringify(response))

                if (response.data.status == true) {

                    var dict = {}
                    dict['email'] = this.state.txtEmail

                    this.props.navigation.navigate('RegisterProfilePic', { data: JSON.stringify(dict) })

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
                            this.API_EMAIL_CHECK(true)
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


    //Action Methods
    btnBackTap = () => {
        requestAnimationFrame(() => {
            this.props.navigation.goBack()
        })
    }


    btnNextTap = () => {
        requestAnimationFrame(() => {

            // var dict = {}
            //         dict['email'] = this.state.txtEmail

            //         this.props.navigation.navigate('RegisterProfilePic', { data: JSON.stringify(dict) })

            if (!this.validateEmail(this.state.txtEmail)) {
                this.showAlert(ValidationMsg.ValidEmail)
            } else {

                this.API_EMAIL_CHECK(true)
            }
        })
    }


    render() {

        let BackIcon = IMG.OtherFlow.BackIcon
        let MinEmailIcon = IMG.InitialFlow.MinEmailIcon
        let RedPlay = IMG.InitialFlow.RedPlay
        let LinkdId = IMG.InitialFlow.LinkdId
        let Insta = IMG.InitialFlow.Insta
        let Background = IMG.OtherFlow.Background

        return (
            <>
                <SafeAreaView style={{ flex: 0, backgroundColor: CommonColors.primaryColor }} />

                <StatusBar barStyle={'light-content'}
                    backgroundColor={CommonColors.primaryColor}
                />
                <SafeAreaView style={styles.container}>

                    <View style={{ flex: 1, backgroundColor: CommonColors.primaryColor }}>

                        <FastImage source={Background}
                            resizeMode={FastImage.resizeMode.cover}
                            style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                        />


                        <View style={{ width: '100%', height: '100%', position: 'absolute' }}>

                            <View style={styles.viewClique}>
                                {this.state.isFromAutoLogin == false ?

                                    <TouchableOpacity style={{
                                        marginLeft: 20, marginTop: 20, height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
                                        borderRadius: 20,
                                    }}
                                        onPress={() => this.btnBackTap()}>
                                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: CommonColors.whiteColor }}
                                            source={BackIcon} />
                                    </TouchableOpacity>

                                    : null}

                                <View style={this.state.isFromAutoLogin == false ? { marginRight: 60, flex: 1, alignItems: 'center' } : { flex: 1, alignItems: 'center' }}>
                                    <Image source={IMG.InitialFlow.Clique}
                                        style={{ width: 130, height: 65, resizeMode: 'contain', marginTop: 40, }}
                                    />
                                </View>

                            </View>

                            <View style={{ flex: 1, }}>

                                <ScrollView style={{ height: '100%', width: '100%', }} bounces={false}>
                                    <View style={{ marginTop: 10 }}>

                                        <Text style={{
                                            marginTop: 20, marginLeft: 20, marginRight: 20, textAlign: 'center', fontSize: SetFontSize.ts16,
                                            fontFamily: ConstantKeys.Averta_REGULAR, color: CommonColors.whiteColor
                                        }}>
                                            Create Profile

                                        </Text>

                                        <Text style={{
                                            marginTop: 15, marginLeft: 20, marginRight: 20, textAlign: 'center', fontSize: SetFontSize.ts30,
                                            fontFamily: ConstantKeys.Averta_BOLD, color: CommonColors.whiteColor
                                        }}>
                                            {"Your Email"}</Text>


                                        <View style={{
                                            marginLeft: 20, marginTop: 30, marginRight: 20, backgroundColor: CommonColors.appBarColor,
                                            flexDirection: 'row', borderRadius: 10, alignItems: 'center'
                                        }}>

                                            <TextInput
                                                style={{
                                                    flex: 1, height: 50, color: CommonColors.whiteColor, fontSize: SetFontSize.ts14, fontFamily: ConstantKeys.Averta_REGULAR, marginLeft: 20,

                                                }}
                                                maxLength={50}
                                                autoCapitalize={false}
                                                placeholderTextColor={CommonColors.whiteColor}
                                                value={this.state.txtEmail}
                                                placeholder={'Enter Email ID'}
                                                keyboardType={'email-address'}
                                                returnKeyType={'done'}
                                                onChangeText={async (txtEmail) => {
                                                    await this.setState({ txtEmail: txtEmail })

                                                    if (this.state.txtEmail.length < 2) {
                                                        this.setState({ isDisable: true })
                                                    } else {
                                                        this.setState({ isDisable: false })
                                                    }
                                                }}
                                            />

                                            <Image source={MinEmailIcon}
                                                style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 20 }} />
                                        </View>

                                    </View>
                                </ScrollView>


                                <LinearGradient colors={[CommonColors.gradientStart, CommonColors.gradientEnd]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    style={{ height: 50, marginLeft: 20, marginRight: 20, borderRadius: 10, marginBottom: 30, }}>
                                    <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                                        // disabled={this.state.isDisable}
                                        onPress={() => this.btnNextTap()}>
                                        <Text style={{ color: CommonColors.whiteColor, fontSize: SetFontSize.ts16, fontFamily: ConstantKeys.Averta_BOLD }}>
                                            Next
                                            </Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                            </View>

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
        flexDirection: 'row'
    },
    btnNextDisable: {
        marginBottom: 30, marginTop: 30, marginLeft: 20, marginRight: 20, height: 50, backgroundColor: CommonColors.SlateBlueColor,
        shadowColor: CommonColors.btnShadowColor,
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1, shadowRadius: 5, elevation: 5,
        borderBottomLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center'
    },
    btnNextEnable: {
        marginBottom: 30, marginTop: 30, marginLeft: 20, marginRight: 20, height: 50, backgroundColor: CommonColors.PurpleColor,
        shadowColor: CommonColors.btnShadowColor,
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1, shadowRadius: 5, elevation: 5,
        borderBottomLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center'
    },
    txtNext: {
        color: CommonColors.whiteColor, fontSize: SetFontSize.ts16, fontFamily: 'Averta-Regular'
    },
})