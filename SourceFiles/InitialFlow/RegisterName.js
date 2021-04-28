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


export default class RegisterName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            txtFullName: '',
            isDisable: true,
            NameBorderColor: CommonColors.GhostColor,

            isFromTutorial: props.route.params.isFromTutorial
            // txtMobileNo : props.route.params.mobile_no,
        };
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }


    onBackPress = () => {

        // if(this.state.isFromTutorial == false){

        //     return false
        // }   
        // else{
        //     return true
        // }

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


    //Action Methods
    btnBackTap = () => {
        requestAnimationFrame(() => {
            this.props.navigation.goBack()
        })
    }


    btnNextTap = () => {
        requestAnimationFrame(() => {

            if (this.state.txtFullName == '') {
                this.showAlert(ValidationMsg.EmptyFullName)
            } else {

                var dict = {}
                dict['name'] = this.state.txtFullName
                this.props.navigation.navigate('RegisterMobile', { dict: JSON.stringify(dict) })
            }
        })
    }


    //Helper Methods For TextInput
    onFocus() {
        this.setState({
            NameBorderColor: CommonColors.SlateBlueColor
        })
    }

    onBlur() {
        this.setState({
            NameBorderColor: CommonColors.GhostColor
        })
    }

    render() {
        let BackIcon = IMG.OtherFlow.BackIcon
        let RedPlay = IMG.InitialFlow.RedPlay
        let LinkdId = IMG.InitialFlow.LinkdId
        let Insta = IMG.InitialFlow.Insta
        let MinUserIcon = IMG.InitialFlow.MinUserIcon
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
                                {this.state.isFromTutorial == false ?

                                    <TouchableOpacity style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 20, borderRadius: 20, }}
                                        onPress={() => this.btnBackTap()}>
                                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: CommonColors.whiteColor }}
                                            source={BackIcon} />
                                    </TouchableOpacity>
                                    : null}

                                <View style={this.state.isFromTutorial == false ? { marginRight: 60, flex: 1, alignItems: 'center' } : { flex: 1, alignItems: 'center' }}>
                                    <Image source={IMG.InitialFlow.Clique}
                                        style={{ width: 130, height: 65, resizeMode: 'contain', marginTop: 40, }}
                                    />
                                </View>

                            </View>


                            <View style={{ flex: 1, }}>

                                <ScrollView style={{ flex: 1 }} bounces={false}>
                                    <View style={{ marginTop: 10 }}>

                                        <Text style={{
                                            marginTop: 20, marginLeft: 20, marginRight: 20, textAlign: 'center', fontSize: SetFontSize.ts16,
                                            fontFamily: ConstantKeys.Averta_REGULAR, color: CommonColors.whiteColor
                                        }}>
                                            Create Account

                                        </Text>

                                        <Text style={{
                                            marginTop: 15, marginLeft: 20, marginRight: 20, textAlign: 'center', fontSize: SetFontSize.ts30,
                                            fontFamily: ConstantKeys.Averta_BOLD, color: CommonColors.whiteColor
                                        }}>
                                            {"What's your name?"}
                                        </Text>


                                        <View style={{
                                            marginLeft: 20, marginRight: 20, marginTop: 50, borderRadius: 10, backgroundColor: CommonColors.appBarColor,
                                            flexDirection: 'row', alignItems: 'center'
                                        }}>

                                            <TextInput
                                                onBlur={() => this.onBlur()}
                                                onFocus={() => this.onFocus()}
                                                placeholderTextColor={CommonColors.whiteColor}
                                                style={{
                                                    flex: 1, height: 50, color: CommonColors.whiteColor, fontSize: SetFontSize.ts14,
                                                    fontFamily: ConstantKeys.Averta_REGULAR, marginLeft: 20
                                                }}
                                                maxLength={50}
                                                value={this.state.txtFullName}
                                                placeholder={'Name'}
                                                keyboardType={Platform.OS === 'android' ? 'visible-password' : 'ascii-capable'}
                                                returnKeyType={'done'}
                                                onChangeText={async (txtFullName) => {
                                                    await this.setState({ txtFullName: txtFullName.replace(/[^a-z,^A-Z,^\s]/g, '') })

                                                    if (this.state.txtFullName.length < 2) {
                                                        this.setState({ isDisable: true })
                                                    } else {
                                                        this.setState({ isDisable: false })
                                                    }
                                                }}
                                            />

                                            <Image source={MinUserIcon}
                                                style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 20 }} />
                                        </View>

                                    </View>
                                </ScrollView>


                                <LinearGradient colors={[CommonColors.gradientStart, CommonColors.gradientEnd]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    style={{ height: 50, marginBottom: 30, marginLeft: 20, marginRight: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}>

                                    <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => this.btnNextTap()}>
                                        <Text style={{ color: CommonColors.whiteColor, fontSize: SetFontSize.ts16, fontFamily: ConstantKeys.Averta_BOLD }}>
                                            Next
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>


                            </View>

                        </View>
                    </View>
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
        flexDirection: 'row',
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