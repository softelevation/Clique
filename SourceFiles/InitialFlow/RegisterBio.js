import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView, TextInput, Keyboard, Platform, Alert,
    FlatList, Dimensions
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

export default class RegisterBio extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isloading: false,
            NameBorderColor: CommonColors.GhostColor,

            RegisterData: JSON.parse(props.route.params.data),
            txtBio: ''
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

    //Action Methods
    btnBackTap = () => {
        requestAnimationFrame(() => {
            this.props.navigation.goBack()
        })
    }


    btnNextTap = () => {
        requestAnimationFrame(() => {

            var dict = this.state.RegisterData
            if (this.state.txtBio != '') {

                dict['bio'] = this.state.txtBio
                this.props.navigation.navigate('RegisterSocialMedia', { data: JSON.stringify(dict) })
            } else {

               this.showAlert("Please Enter Bio")
            }

           
        })
    }


    btnSkipTap = () => {
        requestAnimationFrame(() => {

            var dict = this.state.RegisterData
            dict['bio'] = ''

            this.props.navigation.navigate('RegisterSocialMedia', { data: JSON.stringify(dict) })
        })
    }


    render() {
        let BackIcon = IMG.OtherFlow.BackIcon
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
                            
                                <TouchableOpacity style={{ marginLeft: 20, marginTop: 20, height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
                                      borderRadius: 20, }}
                                    onPress={() => this.btnBackTap()}>
                                    <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: CommonColors.whiteColor }}
                                        source={BackIcon} />
                                </TouchableOpacity>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image source={IMG.InitialFlow.Clique}
                                    style={{ width: 130, height: 65, resizeMode: 'contain', marginTop: 40,}}
                                />
                            </View>

                            
                                <TouchableOpacity style={{  marginRight: 20, marginTop: 20,height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
                                     borderRadius: 20, }}
                                    onPress={() => this.btnSkipTap()}>
                                    <Text style={{ fontSize: SetFontSize.ts12, color: CommonColors.arrowColor, fontFamily: ConstantKeys.Averta_REGULAR }}>
                                        Skip
                                        </Text>
                                </TouchableOpacity>

                        </View>


                        <View style={{ flex: 1 }}>

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
                                        {"Your Bio"}</Text>


                                  

                                        <TextInput
                                            placeholder={'Tell us about yourself!'}
                                            keyboardType={'default'}
                                            placeholderTextColor={CommonColors.whiteColor}
                                            multiline={true}
                                            maxLength={280}
                                            style={{
                                                marginLeft: 20, marginRight: 20, flex: 1, color: CommonColors.whiteColor, fontSize: SetFontSize.ts14, fontFamily: ConstantKeys.Averta_REGULAR,
                                                minHeight: 50, textAlignVertical: "top", padding: 10, marginTop: 30, backgroundColor : CommonColors.appBarColor, borderRadius : 10
                                            }}
                                            value={this.state.txtBio}
                                            onChangeText={(txtBio) => {
                                                this.setState({ txtBio: txtBio })

                                            }}
                                        />

                                    <Text style={{
                                        marginLeft: 20, marginRight: 20, color: CommonColors.whiteColor, fontSize: SetFontSize.ts14,
                                        fontFamily: ConstantKeys.Averta_REGULAR, marginTop: 5, textAlign: 'right'
                                    }}>
                                        {this.state.txtBio.length}/280
                            </Text>

                                    <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 10, fontSize: ConstantKeys.ts14, color: CommonColors.whiteColor, fontFamily: ConstantKeys.Averta_BOLD }}>
                                        Tell your contacts something about yourself...
                            </Text>

                                    <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 10, fontSize: ConstantKeys.ts14, color: CommonColors.whiteColor, fontFamily: ConstantKeys.Averta_REGULAR }}>
                                        {'- Share your accomplishments.\n- Your hobbies and interests\n- Say something personal.\n- Be funny'}
                                    </Text>

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
        marginLeft: 20, marginRight: 20, height: 50, backgroundColor: CommonColors.SlateBlueColor,
        shadowColor: CommonColors.btnShadowColor,
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1, shadowRadius: 5, elevation: 5,
        borderBottomLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center'
    },
    btnNextEnable: {
        marginLeft: 20, marginRight: 20, height: 50, backgroundColor: CommonColors.PurpleColor,
        shadowColor: CommonColors.btnShadowColor,
        shadowOffset: { width: 7, height: 5 },
        shadowOpacity: 1, shadowRadius: 5, elevation: 5,
        borderBottomLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center'
    },
    txtNext: {
        color: CommonColors.whiteColor, fontSize: SetFontSize.ts16, fontFamily: 'Averta-Regular'
    },
})