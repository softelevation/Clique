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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Neomorph, Shadow, NeomorphFlex } from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';


export default class RegisterProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isloading: false,
            RegisterData: JSON.parse(props.route.params.data),
            ProfileImgData: null
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

            var dict = {}
            dict = this.state.RegisterData

            if (this.state.ProfileImgData != null) {

                dict['imgBase64'] = this.state.ProfileImgData.base64
            } else {

                dict['imgBase64'] = null

            }

            this.props.navigation.navigate('RegisterBio', { data: JSON.stringify(dict) })
        })
    }


    btnSkipTap = () => {
        requestAnimationFrame(() => {

            var dict = this.state.RegisterData
            dict['imgBase64'] = null

            this.props.navigation.navigate('RegisterBio', { data: JSON.stringify(dict) })
        })
    }


    btnSelectImage = () => {

        this.setState({ isloading: true })

        Alert.alert(
            ValidationMsg.AppName,
            'Choose your Suitable Option',
            [
                {
                    text: 'Camera', onPress: () => {
                        launchCamera(
                            {
                                mediaType: 'photo',
                                includeBase64: true,
                                quality: 0.7
                            },
                            (response) => {



                                console.log(JSON.stringify(response))

                                if (response.didCancel) {
                                    console.log('User cancelled photo picker');

                                    this.setState({ loading: false })
                                }
                                else if (response.errorCode) {
                                    console.log('ImagePicker Error: ', response.errorCode);
                                    this.setState({ loading: false })

                                    if (response.errorCode == 'permission') {
                                        this.setState({ isloading: false })
                                        alert("Please allow Camera permission from Setting")
                                    }
                                }
                                else if (response.customButton) {
                                    console.log('User tapped custom button: ', response.customButton);
                                }
                                else {

                                    ImagePicker.openCropper({
                                        compressImageQuality: 0.7,
                                        path: response.uri,
                                        width: 300,
                                        includeBase64: true,
                                        cropperCircleOverlay: true,
                                        height: 300
                                    }).then(image => {

                                        this.setState({ isloading: false })

                                        console.log(image);

                                        var dict = {}
                                        dict['base64'] = image.data
                                        dict['uri'] = image.path
                                        dict['type'] = image.mime
                                        this.setState({ ProfileImgData: dict, isloading: false })
                                    }).catch(e => {
                                        // alert(e);

                                        this.setState({ isloading: false })

                                        console.log(" Error :=>  " + e)
                                    });

                                    // this.setState({ ProfileImgData: response, isloading : false })
                                }
                            },
                        )
                    }
                },
                {
                    text: 'Gallary',
                    onPress: () => {
                        launchImageLibrary(
                            {
                                mediaType: 'photo',
                                includeBase64: true,
                                quality: 0.7
                            },
                            (response) => {
                                console.log(JSON.stringify(response))

                                // this.setState({ isloading: false })

                                if (response.didCancel) {

                                    this.setState({ isLoading: false })
                                    console.log('User cancelled photo picker');
                                }
                                else if (response.errorCode) {

                                    console.log('ImagePicker Error: ', response.error);
                                    this.setState({ isLoading: false })

                                    if (response.errorCode == 'permission') {
                                        alert("Please allow Camera permission from Setting")
                                    }
                                }
                                else if (response.customButton) {
                                    this.setState({ isLoading: false })
                                    console.log('User tapped custom button: ', response.customButton);
                                }
                                else {

                                    ImagePicker.openCropper({
                                        compressImageQuality: 0.7,
                                        path: response.uri,
                                        width: 300,
                                        includeBase64: true,
                                        cropperCircleOverlay: true,
                                        height: 300
                                    }).then(image => {
                                        console.log(image);

                                        this.setState({ isloading: false })

                                        var dict = {}
                                        dict['base64'] = image.data
                                        dict['uri'] = image.path
                                        dict['type'] = image.mime
                                        this.setState({ ProfileImgData: dict, isloading: false })
                                    }).catch(e => {
                                        // alert(e);
                                        this.setState({ isloading: false })

                                        console.log(" Error :=>  " + e)
                                    });

                                }

                            },
                        )
                    }
                },
                {
                    text: 'Cancel',
                    style: 'destructive'
                },
            ],
            { cancelable: true }
        );
    }




    render() {
        let BackIcon = IMG.OtherFlow.BackIcon
        let Background = IMG.OtherFlow.Background
        let CameraIcon = IMG.OtherFlow.CameraIcon

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

                                <TouchableOpacity style={{
                                    marginLeft: 20, marginTop: 20, height: 40, width: 40, alignItems: 'center',
                                    justifyContent: 'center', borderRadius: 20,
                                }}
                                    onPress={() => this.btnBackTap()}>
                                    <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: CommonColors.whiteColor }}
                                        source={BackIcon} />
                                </TouchableOpacity>

                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Image source={IMG.InitialFlow.Clique}
                                        style={{ width: 130, height: 65, resizeMode: 'contain', marginTop: 40 }}
                                    />
                                </View>


                                <TouchableOpacity style={{
                                    marginRight: 20, marginTop: 20, height: 40, width: 40, alignItems: 'center',
                                    justifyContent: 'center', borderRadius: 20,
                                }}
                                    onPress={() => this.btnSkipTap()}>
                                    <Text style={{ fontSize: SetFontSize.ts12, color: CommonColors.arrowColor, fontFamily: ConstantKeys.Averta_REGULAR }}>
                                        Skip
                                        </Text>
                                </TouchableOpacity>

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
                                            {"Add a Profile Picture"}</Text>



                                        <View style={{
                                            marginTop: 30, height: 250, flexDirection: 'row', width: Dimensions.get('window').width - 40, borderRadius: 15,
                                            alignItems: 'center', backgroundColor: CommonColors.appBarColor,
                                            justifyContent: 'center',
                                            marginLeft: 20,
                                        }}>



                                            {this.state.ProfileImgData != null ?
                                                <Image style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 15, }}
                                                    source={{ uri: this.state.ProfileImgData.uri }}
                                                />
                                                : null}

                                            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>


                                                <View style={{
                                                    width: 90, borderRadius: 45,
                                                    height: 90,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>


                                                    <TouchableOpacity style={{
                                                        height: 90, width: 90, alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
                                                        backgroundColor: CommonColors.whiteColor, borderRadius: 45,
                                                    }}
                                                        onPress={() => this.btnSelectImage()}>
                                                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }}
                                                            source={CameraIcon}
                                                        />
                                                    </TouchableOpacity>

                                                </View>
                                                <Text style={{ marginTop: 15, fontSize: SetFontSize.ts14, color: CommonColors.whiteColor, fontFamily: ConstantKeys.Averta_BOLD }}>
                                                    {this.state.ProfileImgData != null ? "Change photo" : "Add photo"}
                                                </Text>

                                            </View>

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