import React, {useRef, useState} from 'react';
import {
  Alert,
  FlatList,
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
import {useNavigation} from '@react-navigation/core';
import {Modalize} from 'react-native-modalize';
import NeoInputField from '../../components/neo-input';
import Webservice from '../../Constants/API';
import {APIURL} from '../../Constants/APIURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showAlert} from '../../utils/mobile-utils';
import LoadingView from '../../Constants/LoadingView';
import {
  strictValidArray,
  strictValidArrayWithLength,
  strictValidArrayWithMinLength,
  strictValidObjectWithKeys,
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
  const [Icons, setIcons] = useState([]);
  const [newState, setNewState] = useState({});
  const [field, setField] = useState('');
  React.useEffect(() => {
    getProfile();
  }, []);

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
          Alert.alert(response.originalError.message);

          return;
        }
        console.log('Get Register User Response : ' + response);

        if (response.data.status === true) {
          setloading(false);
          setprofile(response.data.data.user);
        } else {
          setloading(false);
          showAlert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
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
          Alert.alert(response.originalError.message);

          return;
        }
        console.log('Get Social Icons Response : ' + response);

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
        console.log(error.message);
        setSocialLoading(false);
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
  const renderHeader = () => {
    return (
      <Block center padding={[hp(2), wp(3)]} space="between" flex={false} row>
        <Text white semibold size={18}>
          {'      '}
        </Text>
        <Text white semibold size={18}>
          {'My Profile'}
        </Text>
        <TouchableOpacity>
          <LinearGradient colors={['#AF2DA5', '#BC60CB']} style={styles.linear}>
            <ImageComponent
              resizeMode="contain"
              height={14}
              width={14}
              name={'share_icon'}
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
          <ImageComponent name="demouser" height={100} width={100} />
          <Block margin={[0, 0, 0, wp(3)]} flex={false}>
            <Text capitalize white bold size={24}>
              {strictValidObjectWithKeys(profile) && profile.name}
            </Text>
            {strictValidObjectWithKeys(profile) &&
              strictValidArrayWithLength(profile.company_data) && (
                <Text
                  style={{width: wp(55)}}
                  capitalize
                  margin={[hp(0.5), 0, 0]}
                  size={14}
                  white
                  regular>
                  {strictValidObjectWithKeys(profile) &&
                    strictValidArrayWithLength(profile.company_data) &&
                    profile.company_data[0].job_position}{' '}
                  at{' '}
                  {strictValidObjectWithKeys(profile) &&
                    strictValidArrayWithLength(profile.company_data) &&
                    profile.company_data[0].name}
                </Text>
              )}
            <Text margin={[hp(0.5), 0, 0]} size={16} semibold white>
              0 Connections
            </Text>
          </Block>
        </Block>
        <TouchableOpacity onPress={() => navigate('EditProfile')}>
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
        width={75}
        height={75}
        borderRadius={16}
        style={{marginLeft: wp(3), marginTop: hp(2)}}>
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
        numColumns={5}
        bounces={false}
        data={data}
        renderItem={({item}) => {
          return (
            <>
              <TouchableOpacity
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
    console.log(modalType, field, data.id);
    setField('');
    const user_id = await AsyncStorage.getItem('user_id');
    setSocialLoading(true);
    Webservice.post(APIURL.socialIcons, {
      user_id: user_id,
      id: data.id,
      type: activeOptions,
      username: field,
    })
      .then(async (response) => {
        if (response.data == null) {
          setSocialLoading(false);
          // alert('error');
          Alert.alert(response.originalError.message);

          return;
        }
        console.log('Get Social Icons Response : ' + response);

        if (response.data.status === true) {
          setSocialLoading(false);
          setIcons(response.data.data);
          modalizeRef.current?.close();
          getProfile();
        } else {
          setSocialLoading(false);
          showAlert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setSocialLoading(false);
        Alert.alert(error.message);
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
        handleStyle={{backgroundColor: '#6B37C3', marginTop: hp(1)}}
        handlePosition="inside"
        ref={modalizeRef}>
        {/* <AgentList data={strictValidArray(agentsData) && agentsData} /> */}
        {action === 'add_account' && (
          <>
            <Block margin={[hp(4), 0, 0]} flex={false} center>
              <Text grey size={16}>
                Add New Account
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
                  onPress={() => saveSocialAccount(newState)}
                  linear
                  color="primary">
                  Save
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
  neoContainer: {flexDirection: 'row'},
});
export default Profile;
