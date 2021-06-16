import React, {useState} from 'react';
import {
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
import {Easing} from 'react-native-reanimated';
import {
  strictValidArray,
  strictValidObjectWithKeys,
} from '../../../utils/commonUtils';
import {APIURL} from '../../../Constants/APIURL';

const EditProfile = () => {
  const {params} = useRoute();
  const {profile} = params;
  const [activeOptions, setactiveOptions] = useState('social');
  const {goBack} = useNavigation();
  const [name, setName] = useState(profile.name || '');
  const [company, setcompany] = useState('');

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
  const renderProfile = () => {
    return (
      <Block alignSelf="center" padding={[0, wp(3)]} flex={false}>
        <ImageComponent name="demouser" height={100} width={100} />
        <TouchableOpacity
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
              <Block flex={false} row>
                <ImageComponent
                  isURL
                  name={`${APIURL.iconUrl}${item.url}`}
                  height={70}
                  width={70}
                />
                <TouchableOpacity
                  style={styles.deleteAccountButton}
                  onPress={() => goBack()}>
                  <ImageComponent
                    resizeMode="contain"
                    height={30}
                    width={30}
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
          <Block margin={[hp(2), 0]} alignSelf="center" flex={false}>
            <Text grey semibold center margin={[0, 0, hp(2)]}>
              Name
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
          {renderOptions()}
          <Block margin={[hp(1), 0]} alignSelf="center" flex={false}>
            <NeuInput
              width={wp(75)}
              height={hp(5)}
              borderRadius={16}
              containerStyle={{paddingVetical: hp(1)}}
              color="#eef2f9"
              onChangeText={(a) => setcompany(a)}
              value={company}
              placeholder="ex. UX/UI Designer at Atom 6"
              placeholderTextColor="grey"
            />
          </Block>
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
            renderSocialIcons(profile.business, 'business')}
        </Block>
      </ScrollView>
      <Block color="#F2EDFA" padding={[0, wp(3)]}>
        <Button color="primary" linear>
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
