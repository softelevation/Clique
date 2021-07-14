import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Text, ImageComponent, Button} from '../../../components';
import {hp, wp} from '../../../components/responsive';
import NeuView from '../../../common/neu-element/lib/NeuView';
import NeuButton from '../../../common/neu-element/lib/NeuButton';
import NeuInput from '../../../common/neu-element/lib/NeuInput';
import {useNavigation, useRoute} from '@react-navigation/core';
import {
  strictValidArray,
  strictValidObjectWithKeys,
  strictValidString,
} from '../../../utils/commonUtils';
import {APIURL} from '../../../Constants/APIURL';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ValidationMsg from '../../../Constants/ValidationMsg';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Webservice from '../../../Constants/API';
import {showAlert} from '../../../utils/mobile-utils';

const EditProfile = () => {
  const {params} = useRoute();
  const {profile} = params;
  const [activeOptions, setactiveOptions] = useState('social');
  const {goBack} = useNavigation();
  const [name, setName] = useState(profile.name || '');
  const [company, setcompany] = useState(profile.bio || '');
  const [email, setEmail] = useState(profile.email || '');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setloading] = useState(false);
  console.log(profileImage, 'profileImage', 'userprofileupdate');

  const submitadata = async (values) => {
    const user_id = await AsyncStorage.getItem('user_id');
    setloading(true);
    Webservice.post(APIURL.userprofileupdate, {
      user_id: user_id,
      name: name,
      bio: company,
      avatar: profileImage.base64,
      // type: activeOptions,
    })
      .then(async (response) => {
        if (response.data == null) {
          setloading(false);
          // alert('error');
          Alert.alert(response.originalError.message);

          return;
        }
        console.log('Get Social Icons Response : ' + response);

        if (response.data.status === true) {
          setloading(false);
          goBack();
        } else {
          setloading(false);
          showAlert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setloading(false);
        Alert.alert(error.message, '', {cancelable: false});
      });
  };
  const btnSelectImage = () => {
    // this.setState({isloading: true});

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
                } else if (response.errorCode) {
                  console.log('ImagePicker Error: ', response.errorCode);

                  if (response.errorCode == 'permission') {
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
                      console.log(image);

                      var dict = {};
                      dict.base64 = image.data;
                      dict.uri = image.path;
                      dict.type = image.mime;
                      setProfileImage(dict);
                    })
                    .catch((e) => {
                      // alert(e);

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
                  console.log('User cancelled photo picker');
                } else if (response.errorCode) {
                  console.log('ImagePicker Error: ', response.error);

                  if (response.errorCode == 'permission') {
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
                      console.log(image);

                      var dict = {};
                      dict.base64 = image.data;
                      dict.uri = image.path;
                      dict.type = image.mime;
                      // this.setState({ProfileImgData: dict, isloading: false});
                      setProfileImage(dict);
                    })
                    .catch((e) => {
                      // alert(e);

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
  const renderHeader = () => {
    return (
      <Block center padding={[hp(2), wp(3)]} space="between" flex={false} row>
        <Text white semibold size={18}>
          {'      '}
        </Text>
        <Text white semibold size={18}>
          {'Edit your profile'}
        </Text>
        <TouchableOpacity onPress={() => goBack()}>
          <LinearGradient colors={['#AF2DA5', '#BC60CB']} style={styles.linear}>
            <ImageComponent
              resizeMode="contain"
              height={14}
              width={14}
              name={'close_icon'}
              color="#F2EDFA"
            />
          </LinearGradient>
        </TouchableOpacity>
      </Block>
    );
  };

  const renderProfileImagePath = () => {
    if (profileImage.uri) {
      return profileImage.uri;
    }
    if (
      strictValidObjectWithKeys(profile) &&
      strictValidString(profile.avatar)
    ) {
      return `${APIURL.ImageUrl}${profile.avatar}`;
    }

    return 'demouser';
  };
  const renderProfile = () => {
    return (
      <Block alignSelf="center" padding={[0, wp(3)]} flex={false}>
        <ImageComponent
          isURL
          name={renderProfileImagePath()}
          height={80}
          width={80}
          radius={80}
        />
        <TouchableOpacity
          onPress={() => btnSelectImage()}
          style={{
            position: 'absolute',
            top: 0,
          }}>
          <NeuView color="#F2F0F7" height={30} width={30} borderRadius={30}>
            <ImageComponent
              resizeMode="contain"
              height={18}
              width={18}
              name={'edit_icon'}
              color="#6F3AC8"
            />
          </NeuView>
        </TouchableOpacity>
      </Block>
    );
  };
  const renderOptions = () => {
    return (
      <Block middle center margin={[hp(2), 0]} flex={false}>
        <NeuView
          color="#F2F0F7"
          height={hp(5)}
          width={wp(45)}
          borderRadius={16}
          containerStyle={styles.neoContainer}
          inset>
          {activeOptions === 'social' ? (
            <NeuButton
              color="#F2F0F7"
              width={wp(20)}
              height={hp(3.5)}
              style={{marginHorizontal: wp(2)}}
              borderRadius={6}>
              <Text semibold purple size={13}>
                Social
              </Text>
            </NeuButton>
          ) : (
            <Text
              style={[styles.inactiveText, {marginRight: wp(1)}]}
              onPress={() => setactiveOptions('social')}
              grey
              regular
              center
              size={13}>
              Social
            </Text>
          )}
          {activeOptions === 'business' ? (
            <NeuButton
              color="#F2F0F7"
              width={wp(20)}
              height={hp(3.5)}
              style={{marginRight: wp(2)}}
              borderRadius={6}>
              <Text
                semibold
                onPress={() => setactiveOptions('business')}
                purple
                center
                size={13}>
                Business
              </Text>
            </NeuButton>
          ) : (
            <Text
              style={[styles.inactiveText, {marginLeft: wp(1)}]}
              onPress={() => setactiveOptions('business')}
              grey
              regular
              size={13}>
              Business
            </Text>
          )}
        </NeuView>
      </Block>
    );
  };

  const renderSocialIcons = (data, type) => {
    return (
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: wp(1),
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        numColumns={5}
        bounces={false}
        data={data}
        renderItem={({item}) => {
          return (
            <>
              <Block
                style={{paddingHorizontal: wp(1), marginTop: hp(2)}}
                flex={false}
                row>
                <ImageComponent
                  isURL
                  name={`${APIURL.iconUrl}${item.url}`}
                  height={90}
                  width={90}
                />
                <TouchableOpacity
                  style={styles.deleteAccountButton}
                  onPress={() => goBack()}>
                  <ImageComponent
                    resizeMode="contain"
                    height={40}
                    width={40}
                    name={'delete_icon'}
                  />
                </TouchableOpacity>
              </Block>
            </>
          );
        }}
      />
    );
  };
  return (
    <Block linear>
      <StatusBar barStyle="light-content" />
      <SafeAreaView />
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Block
          style={{flexGrow: 1}}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          padding={[hp(2), wp(3)]}
          color="#F2EDFA">
          {renderProfile()}
          <Block margin={[hp(1), 0]} alignSelf="center" flex={false}>
            <Text uppercase grey semibold center margin={[0, 0, hp(2)]}>
              {name}
            </Text>
            <NeuInput
              width={wp(75)}
              height={hp(5)}
              borderRadius={16}
              containerStyle={{paddingVetical: hp(1)}}
              color="#eef2f9"
              onChangeText={(a) => setName(a)}
              value={name}
              placeholder="Enter Name"
              placeholderTextColor="grey"
            />
          </Block>
          <Block margin={[hp(1), 0]} alignSelf="center" flex={false}>
            <NeuInput
              width={wp(75)}
              height={hp(5)}
              borderRadius={16}
              containerStyle={{paddingVetical: hp(1)}}
              color="#eef2f9"
              onChangeText={(a) => setEmail(a)}
              value={email}
              placeholder="Email"
              placeholderTextColor="grey"
              editable={false}
            />
          </Block>
          <Block margin={[hp(1), 0]} alignSelf="center" flex={false}>
            <NeuInput
              width={wp(75)}
              height={hp(15)}
              borderRadius={16}
              containerStyle={{paddingVetical: hp(1), height: hp(15)}}
              color="#eef2f9"
              onChangeText={(a) => setcompany(a)}
              value={company}
              placeholder="ex. UX/UI Designer at Atom 6"
              placeholderTextColor="grey"
              maxLength={280}
              multiline={true}
              style={{height: hp(15)}}
              textAlignVertical={'top'}
              textStyle={{height: hp(15)}}
            />
            <Text margin={[hp(1.5), 0, 0]} right regular size={14} purple>
              {company.length}/280
            </Text>
          </Block>

          {/* {renderOptions()}
          <Text grey semibold center margin={[hp(2), 0]}>
            Accounts
          </Text>
          {strictValidObjectWithKeys(profile) &&
            strictValidArray(profile.social) &&
            activeOptions === 'social' &&
            renderSocialIcons(profile.social, 'social')}
          {strictValidObjectWithKeys(profile) &&
            strictValidArray(profile.business) &&
            activeOptions === 'business' &&
            renderSocialIcons(profile.business, 'business')} */}
        </Block>
      </ScrollView>
      <Block flex={false} color="#F2EDFA" padding={[0, wp(3), hp(4)]}>
        <Button
          isLoading={loading}
          onPress={() => submitadata()}
          color="primary"
          linear>
          Save
        </Button>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2EDFA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  linear: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  neomorphStyle: {
    width: 150,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activeNeomorph: {
    borderRadius: 10,
    shadowRadius: 6,
    backgroundColor: '#F2F0F7',
    padding: hp(1),
  },
  inactiveText: {
    width: wp(20),
  },
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  neoContainer: {flexDirection: 'row'},
  deleteAccountButton: {position: 'absolute', top: 0, right: 0},
});
export default EditProfile;
