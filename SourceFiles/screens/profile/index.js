import React, {useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Text, ImageComponent, Button} from '../../components';
import {hp, wp} from '../../components/responsive';
import NeuView from '../../common/neu-element/lib/NeuView';
import NeuButton from '../../common/neu-element/lib/NeuButton';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import {Modalize} from 'react-native-modalize';
import NeoInputField from '../../components/neo-input';
import Webservice from '../../Constants/API';
import {APIURL} from '../../Constants/APIURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showAlert} from '../../utils/mobile-utils';
import LoadingView from '../../Constants/LoadingView';
import {
  strictValidArray,
  strictValidObjectWithKeys,
  strictValidString,
} from '../../utils/commonUtils';

const Profile = () => {
  const {navigate} = useNavigation();
  const [activeOptions, setactiveOptions] = useState('social');
  const [modalType, setModalType] = useState('social');
  const [toggle, setToggle] = useState(true);
  const [action, setAction] = useState(null);
  const modalizeRef = useRef();
  const [profile, setprofile] = useState({});
  const [loading, setloading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [deleteSocialLoading, setDeleteSocialLoading] = useState(false);
  const [Icons, setIcons] = useState([]);
  const [newState, setNewState] = useState({});
  const [field, setField] = useState('');
  // React.useEffect(() => {
  //   getProfile();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, []),
  );

  const openPhoneNumber = async (phone) => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };

  const openUrl = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  const openMessages = async (phone) => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${phone}${separator}body=${'Hi'}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Unsupported url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const openLink = async (url, name) => {
    // Checking if the link is supported for links with custom URL scheme.

    switch (name) {
      case 'Phone':
        return openPhoneNumber(url);
      case 'Messages':
        return openMessages(url);
      default:
        return openUrl(url);
    }
  };

  const getProfile = async (values) => {
    const user_id = await AsyncStorage.getItem('user_id');
    setloading(true);
    Webservice.post(APIURL.getTempProfile, {
      user_id: user_id,
    })
      .then(async (response) => {
        if (response.data == null) {
          setloading(false);
          // alert('error');
          showAlert(response.originalError.message);

          return;
        }

        if (response.data.status === true) {
          setloading(false);
          setprofile(response.data.data.user);
        } else {
          setloading(false);
          showAlert(response.data.message);
        }
      })
      .catch((error) => {
        setloading(false);
        Alert.alert(
          error.message,
          '',
          [
            {
              text: 'Try Again',
              onPress: () => {
                getProfile();
              },
            },
          ],
          {cancelable: false},
        );
      });
  };

  const getSocialAndBusinessIcon = async (values) => {
    const user_id = await AsyncStorage.getItem('user_id');
    setSocialLoading(true);
    Webservice.post(APIURL.socialIcons, {
      user_id: user_id,
      type: activeOptions,
    })
      .then(async (response) => {
        if (response.data == null) {
          setSocialLoading(false);
          // alert('error');
          showAlert(response.originalError.message);

          return;
        }

        if (response.data.status === true) {
          setSocialLoading(false);
          setIcons(response.data.data);

          modalizeRef.current?.open();
          setAction('add_account');
        } else {
          setSocialLoading(false);
          showAlert(response.data.message);
        }
      })
      .catch((error) => {
        setSocialLoading(false);
        Alert.alert(
          error.message,
          '',
          [
            {
              text: 'Try Again',
              onPress: () => {
                getSocialAndBusinessIcon();
              },
            },
          ],
          {cancelable: false},
        );
      });
  };
  const renderHeader = () => {
    return (
      <Block center padding={[hp(2), wp(3)]} space="between" flex={false} row>
        <Text white semibold size={18}>
          {'      '}
        </Text>
        <Text white semibold size={18}>
          {'My Profile'}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigate('ScanCard', {
              card: true,
              nfc: false,
            })
          }>
          <LinearGradient colors={['#AF2DA5', '#BC60CB']} style={styles.linear}>
            <ImageComponent
              resizeMode="contain"
              height={20}
              width={20}
              name={'nfc_icon'}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Block>
    );
  };
  const renderProfile = () => {
    return (
      <Block padding={[hp(2), wp(3)]} space="between" flex={false} row>
        <Block center flex={false} row>
          {strictValidObjectWithKeys(profile) &&
          strictValidString(profile.avatar) ? (
            <ImageComponent
              isURL
              name={`${APIURL.ImageUrl}${profile.avatar}`}
              height={80}
              width={80}
              radius={80}
            />
          ) : (
            <ImageComponent name="demouser" height={100} width={100} />
          )}
          <Block margin={[0, 0, 0, wp(3)]} flex={false}>
            <Text capitalize white bold size={24}>
              {strictValidObjectWithKeys(profile) && profile.name}
            </Text>
            {strictValidObjectWithKeys(profile) &&
              strictValidString(profile.bio) && (
                <Text
                  style={{width: wp(55)}}
                  capitalize
                  margin={[hp(0.5), 0, 0]}
                  size={14}
                  white
                  regular>
                  {profile.bio}
                </Text>
              )}
            <Text margin={[hp(0.5), 0, 0]} size={16} semibold white>
              0 Connections
            </Text>
          </Block>
        </Block>
        <TouchableOpacity
          onPress={() =>
            navigate('EditProfile', {
              profile: profile,
            })
          }>
          <LinearGradient colors={['#AF2DA5', '#BC60CB']} style={styles.linear}>
            <ImageComponent
              resizeMode="contain"
              height={18}
              width={18}
              name={'edit_icon'}
            />
          </LinearGradient>
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
              style={[styles.inactiveText]}
              onPress={() => setactiveOptions('business')}
              grey
              regular
              center
              size={13}>
              Business
            </Text>
          )}
        </NeuView>
      </Block>
    );
  };
  const renderModalOptions = () => {
    return (
      <Block middle center margin={[hp(2), 0]} flex={false}>
        <NeuView
          color="#F2F0F7"
          height={hp(5)}
          width={wp(45)}
          borderRadius={16}
          containerStyle={styles.neoContainer}
          inset>
          {modalType === 'social' ? (
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
              onPress={() => setModalType('social')}
              grey
              regular
              center
              size={13}>
              Social
            </Text>
          )}
          {modalType === 'business' ? (
            <NeuButton
              color="#F2F0F7"
              width={wp(20)}
              height={hp(3.5)}
              style={{marginRight: wp(2)}}
              borderRadius={6}>
              <Text
                semibold
                onPress={() => setModalType('business')}
                purple
                center
                size={13}>
                Business
              </Text>
            </NeuButton>
          ) : (
            <Text
              style={[styles.inactiveText, {marginLeft: wp(1)}]}
              onPress={() => setModalType('business')}
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
  const onOpen = (type) => {
    getSocialAndBusinessIcon(type);
  };
  const _renderFooter = (type) => {
    return (
      <NeuButton
        onPress={() => onOpen(type)}
        active
        color="#eef2f9"
        width={85}
        height={85}
        borderRadius={16}
        style={{marginHorizontal: wp(1), marginTop: hp(2.5)}}>
        <ImageComponent name="add_icon" height={30} width={30} />
      </NeuButton>
    );
  };
  const renderSocialIcons = (data, type) => {
    return (
      <FlatList
        ListFooterComponent={_renderFooter(type)}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: wp(1),
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        numColumns={4}
        bounces={false}
        data={data}
        renderItem={({item}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  modalizeRef.current?.open();
                  setAction('open_link');
                  setNewState(item);
                  setField(item.link);
                }}
                style={{paddingHorizontal: wp(1), marginTop: hp(2)}}>
                {strictValidObjectWithKeys(item.icone) && (
                  <ImageComponent
                    isURL
                    name={`${APIURL.iconUrl}${item.icone.url}`}
                    height={90}
                    width={90}
                  />
                )}
              </TouchableOpacity>
            </>
          );
        }}
      />
    );
  };
  const AddSocialIcons = () => {
    return (
      <FlatList
        contentContainerStyle={{
          paddingVertical: hp(3),
          paddingHorizontal: wp(2),
        }}
        numColumns={5}
        data={Icons}
        renderItem={({item}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  setAction('select_account');
                  setNewState(item);
                }}
                style={{paddingHorizontal: wp(1), marginTop: hp(2)}}>
                <ImageComponent
                  isURL
                  name={`${APIURL.iconUrl}${item.url}`}
                  height={70}
                  width={70}
                />
              </TouchableOpacity>
            </>
          );
        }}
      />
    );
  };
  const saveSocialAccount = async (data) => {
    const user_id = await AsyncStorage.getItem('user_id');
    setSocialLoading(true);
    Webservice.post(APIURL.socialIcons, {
      user_id: user_id,
      id: data.id,
      type: activeOptions,
      link: field,
    })
      .then(async (response) => {
        if (response.data == null) {
          setSocialLoading(false);
          // alert('error');
          showAlert(response.originalError.message);

          return;
        }

        if (response.data.status === true) {
          setSocialLoading(false);
          setIcons(response.data.data);
          setField('');
          setAction('');
          modalizeRef.current?.close();
          getProfile();
        } else {
          setSocialLoading(false);
          showAlert(response.data.message);
        }
      })
      .catch((error) => {
        setSocialLoading(false);
        showAlert(error.message);
      });
  };
  const updateSocialAccount = async (data) => {
    const user_id = await AsyncStorage.getItem('user_id');
    setSocialLoading(true);
    Webservice.post(APIURL.socialIcons, {
      user_id: user_id,
      id: data.icone_id,
      type: activeOptions,
      link: field,
    })
      .then(async (response) => {
        if (response.data == null) {
          setSocialLoading(false);
          // alert('error');
          showAlert(response.originalError.message);

          return;
        }

        if (response.data.status === true) {
          setSocialLoading(false);
          setIcons(response.data.data);
          setAction('');
          setField('');
          modalizeRef.current?.close();
          getProfile();
        } else {
          setSocialLoading(false);
          showAlert(response.data.message);
        }
      })
      .catch((error) => {
        setSocialLoading(false);
        showAlert(error.message);
      });
  };
  const deleteSocialAccount = async (data) => {
    const user_id = await AsyncStorage.getItem('user_id');
    setDeleteSocialLoading(true);
    Webservice.post(APIURL.socialIcons, {
      user_id: user_id,
      id: data.id,
      action: 'delete',
    })
      .then(async (response) => {
        if (response.data == null) {
          setDeleteSocialLoading(false);
          // alert('error');
          showAlert(response.originalError.message);

          return;
        }

        if (response.data.status === true) {
          setDeleteSocialLoading(false);
          setIcons(response.data.data);
          setAction('');
          setField('');
          modalizeRef.current?.close();
          getProfile();
        } else {
          setDeleteSocialLoading(false);
          showAlert(response.data.message);
        }
      })
      .catch((error) => {
        setDeleteSocialLoading(false);
        showAlert(error.message);
      });
  };

  return (
    <Block linear>
      <SafeAreaView />
      {renderHeader()}
      {renderProfile()}
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Block
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          padding={[hp(2), wp(2)]}
          color="#F2EDFA">
          <Text grey regular size={16} center>
            Swipe to choose a type of account{' '}
          </Text>
          {renderOptions()}
          <Block flex={false}>
            {strictValidObjectWithKeys(profile) &&
              strictValidArray(profile.social) &&
              activeOptions === 'social' &&
              renderSocialIcons(profile.social, 'social')}
            {strictValidObjectWithKeys(profile) &&
              strictValidArray(profile.business) &&
              activeOptions === 'business' &&
              renderSocialIcons(profile.business, 'business')}
          </Block>
        </Block>
      </ScrollView>
      <Modalize
        // overlayStyle={modalizeStyle}
        adjustToContentHeight={toggle}
        tapGestureEnabled={false}
        modalStyle={{backgroundColor: '#F2F0F7'}}
        scrollViewProps={{
          scrollEnabled: false,
        }}
        onClose={() => {
          setNewState({});
          setField('');
        }}
        handleStyle={{backgroundColor: '#6B37C3', marginTop: hp(1)}}
        handlePosition="inside"
        ref={modalizeRef}>
        {/* <AgentList data={strictValidArray(agentsData) && agentsData} /> */}
        {action === 'add_account' && (
          <>
            <Block margin={[hp(4), 0, 0]} flex={false} center>
              <Text capitalize grey size={16}>
                Add New {activeOptions} Account
              </Text>
            </Block>
            {AddSocialIcons()}
          </>
        )}
        {action === 'select_account' && (
          <>
            <Block margin={[hp(4), 0]} flex={false} center>
              <ImageComponent
                isURL
                name={`${APIURL.iconUrl}${newState.url}`}
                height={95}
                width={95}
              />
              <Text capitalize purple semibold margin={[hp(1), 0]}>
                {newState.name}
              </Text>
              <Block flex={false} margin={[hp(2), 0, 0]}>
                <NeoInputField
                  placeholder={`${newState.name} account`}
                  fontColor="#707070"
                  icon=""
                  width={70}
                  onChangeText={(a) => setField(a)}
                  value={field}
                />
                <Block flex={false} margin={[hp(2), 0, 0]}>
                  {/* {renderModalOptions()} */}
                </Block>
                <Button
                  disabled={!field}
                  isLoading={socialLoading}
                  onPress={() => saveSocialAccount(newState)}
                  linear
                  color="primary">
                  Save
                </Button>
              </Block>
            </Block>
          </>
        )}
        {action === 'open_link' && (
          <>
            <TouchableOpacity
              onPress={() => {
                modalizeRef.current?.close();
                setNewState({});
                setField('');
              }}>
              <Block flex={false} right margin={[hp(2), wp(3), 0, 0]}>
                <ImageComponent
                  color="#ED5E69"
                  name={'cancel_icon'}
                  height={20}
                  width={20}
                />
              </Block>
            </TouchableOpacity>
            <Block margin={[hp(2), 0]} flex={false} center>
              {strictValidObjectWithKeys(newState.icone) && (
                <ImageComponent
                  isURL
                  name={`${APIURL.iconUrl}${newState.icone.url}`}
                  height={95}
                  width={95}
                />
              )}
              {strictValidObjectWithKeys(newState.icone) && (
                <Text capitalize purple semibold margin={[hp(1), 0]}>
                  {newState.icone.name}
                </Text>
              )}
              <Block flex={false} margin={[hp(2), 0, 0]}>
                {strictValidObjectWithKeys(newState.icone) && (
                  <NeoInputField
                    placeholder={`${newState.icone.name} account`}
                    fontColor="#707070"
                    icon=""
                    width={70}
                    onChangeText={(a) => setField(a)}
                    value={field}
                  />
                )}
                <Block space="between" row flex={false} margin={[hp(2), 0, 0]}>
                  {/* {renderModalOptions()} */}
                  <Button
                    style={{width: wp(32)}}
                    linear
                    onPress={() => openLink(newState.link, newState.icone.name)}
                    color="primary">
                    Open Link
                  </Button>
                  <Button
                    style={{width: wp(32)}}
                    onPress={() => deleteSocialAccount(newState)}
                    isLoading={deleteSocialLoading}
                    color="accent">
                    Delete
                  </Button>
                </Block>
                <Button
                  disabled={!field}
                  isLoading={socialLoading}
                  onPress={() => updateSocialAccount(newState)}
                  linear
                  color="primary">
                  Update Account
                </Button>
              </Block>
            </Block>
          </>
        )}
      </Modalize>
      {loading || socialLoading ? <LoadingView /> : null}
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    alignItems: 'center',
  },
  neoContainer: {
    flexDirection: 'row',
  },
});
export default Profile;
