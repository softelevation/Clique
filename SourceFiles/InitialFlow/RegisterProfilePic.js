import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

//Constant Files
import {CommonColors} from '../Constants/ColorConstant';
import {SetFontSize} from '../Constants/FontSize';
import {ConstantKeys} from '../Constants/ConstantKey';
import LoadingView from '../Constants/LoadingView';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';

import {Block, Button, ImageComponent, Text} from '../components';
import {hp, wp} from '../components/responsive';
import ValidationMsg from '../Constants/ValidationMsg';

//Third Party
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderPreLogin from '../common/header';
import Neomorph from '../common/shadow-src/Neomorph';
import NeuView from '../common/neu-element/lib/NeuView';

export default class RegisterProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      RegisterData: props.route.params.data,
      ProfileImgData: null,
    };
  }

  componentDidMount() {
    console.log(this.props.route.params);
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
      this.props.navigation.goBack();
    });
  };

  btnNextTap = () => {
    requestAnimationFrame(() => {
      this.props.navigation.navigate('RegisterBio', {
        name: this.props.route.params.name,
        email: this.props.route.params.email,
        password: this.props.route.params.password,
        profile: this.state.ProfileImgData.base64,
      });
    });
  };

  btnSkipTap = () => {
    this.props.navigation.navigate('RegisterBio', {
      name: this.props.route.params.name,
      email: this.props.route.params.email,
      password: this.props.route.params.password,
      profile: '',
    });
  };

  btnSelectImage = () => {
    this.setState({isloading: true});

    Alert.alert(
      ValidationMsg.AppName,
      'Choose your Suitable Option',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(
              {
                mediaType: 'photo',
                includeBase64: true,
                quality: 0.7,
              },
              (response) => {
                console.log(JSON.stringify(response));

                if (response.didCancel) {
                  console.log('User cancelled photo picker');

                  this.setState({loading: false});
                } else if (response.errorCode) {
                  console.log('ImagePicker Error: ', response.errorCode);
                  this.setState({loading: false});

                  if (response.errorCode == 'permission') {
                    this.setState({isloading: false});
                    alert('Please allow Camera permission from Setting');
                  }
                } else if (response.customButton) {
                  console.log(
                    'User tapped custom button: ',
                    response.customButton,
                  );
                } else {
                  ImagePicker.openCropper({
                    compressImageQuality: 0.7,
                    path: response.uri,
                    width: 300,
                    includeBase64: true,
                    cropperCircleOverlay: true,
                    height: 300,
                  })
                    .then((image) => {
                      this.setState({isloading: false});

                      console.log(image);

                      var dict = {};
                      dict.base64 = image.data;
                      dict.uri = image.path;
                      dict.type = image.mime;
                      this.setState({ProfileImgData: dict, isloading: false});
                    })
                    .catch((e) => {
                      // alert(e);

                      this.setState({isloading: false});

                      console.log(' Error :=>  ' + e);
                    });

                  // this.setState({ ProfileImgData: response, isloading : false })
                }
              },
            );
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: true,
                quality: 0.7,
              },
              (response) => {
                console.log(JSON.stringify(response));

                // this.setState({ isloading: false })

                if (response.didCancel) {
                  this.setState({isLoading: false});
                  console.log('User cancelled photo picker');
                } else if (response.errorCode) {
                  console.log('ImagePicker Error: ', response.error);
                  this.setState({isLoading: false});

                  if (response.errorCode == 'permission') {
                    alert('Please allow Camera permission from Setting');
                  }
                } else if (response.customButton) {
                  this.setState({isLoading: false});
                  console.log(
                    'User tapped custom button: ',
                    response.customButton,
                  );
                } else {
                  ImagePicker.openCropper({
                    compressImageQuality: 0.7,
                    path: response.uri,
                    width: 300,
                    includeBase64: true,
                    cropperCircleOverlay: true,
                    height: 300,
                  })
                    .then((image) => {
                      console.log(image);

                      this.setState({isloading: false});

                      var dict = {};
                      dict.base64 = image.data;
                      dict.uri = image.path;
                      dict.type = image.mime;
                      this.setState({ProfileImgData: dict, isloading: false});
                    })
                    .catch((e) => {
                      // alert(e);
                      this.setState({isloading: false});

                      console.log(' Error :=>  ' + e);
                    });
                }
              },
            );
          },
        },
        {
          text: 'Cancel',
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  render() {
    console.log(this.state.ProfileImgData);
    const {ProfileImgData} = this.state;
    return (
      <Block linear>
        <SafeAreaView />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          bounces={false}>
          <Block padding={[hp(2), wp(3)]} space="between" flex={false} row>
            <TouchableOpacity onPress={() => this.btnBackTap()}>
              <LinearGradient
                colors={['#5542B6', '#7653DB']}
                style={styles.linear}>
                <ImageComponent
                  resizeMode="contain"
                  height={14}
                  width={14}
                  name={'BackIcon'}
                />
              </LinearGradient>
            </TouchableOpacity>

            <ImageComponent
              resizeMode="contain"
              height={140}
              width={140}
              name={'nameBg'}
            />
            <TouchableOpacity onPress={() => this.btnSkipTap()}>
              <LinearGradient
                colors={['#AF2DA5', '#BC60CB']}
                style={styles.linear}>
                <Text
                  style={{
                    fontSize: SetFontSize.ts12,
                    color: CommonColors.whiteColor,
                    fontFamily: ConstantKeys.Averta_REGULAR,
                  }}>
                  Skip
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Block>
          <Block
            color={'#F2EDFA'}
            borderTopRightRadius={30}
            borderTopLeftRadius={30}>
            <HeaderPreLogin
              title="Create Profile"
              subtitle="Add a Profile Picture"
            />
            <Block margin={[hp(2), 0, 0]} center middle flex={false}>
              <NeuView
                color="#F2F0F7"
                height={hp(24)}
                width={wp(85)}
                borderRadius={16}>
                <TouchableOpacity onPress={() => this.btnSelectImage()}>
                  {ProfileImgData && ProfileImgData.uri ? (
                    <ImageComponent
                      isURL={ProfileImgData && ProfileImgData.uri}
                      height={160}
                      width={160}
                      radius={160}
                      resizeMode="contain"
                      name={ProfileImgData ? ProfileImgData.uri : 'CameraIcon'}
                    />
                  ) : (
                    <NeuView
                      color="#F2F0F7"
                      height={120}
                      width={120}
                      borderRadius={120}>
                      <ImageComponent
                        height={50}
                        width={50}
                        resizeMode="contain"
                        name={'CameraIcon'}
                      />
                    </NeuView>
                  )}
                </TouchableOpacity>
              </NeuView>
            </Block>
            <Block bottom flex={1} margin={[0, wp(3), hp(4)]}>
              {ProfileImgData && ProfileImgData.uri && (
                <Button
                  onPress={() => this.btnNextTap()}
                  linear
                  color="primary">
                  Next
                </Button>
              )}
            </Block>
          </Block>
        </ScrollView>

        {this.state.isloading ? <LoadingView /> : null}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  neoFirstContainer: {
    borderRadius: -20,
    shadowRadius: 8,
    backgroundColor: '#F2F0F7',
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(5),
    borderWidth: 3,
    borderColor: '#fff',
  },
  neoSubContainer: {
    borderRadius: 100,
    shadowRadius: 8,
    backgroundColor: '#F2F0F7',
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linear: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
