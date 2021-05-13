import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Text, ImageComponent, CustomButton} from '../../components';
import {hp, wp} from '../../components/responsive';
import {useNavigation} from '@react-navigation/core';
import Neomorph from '../../common/shadow-src/Neomorph';
import NeuSwitch from '../../common/neu-element/lib/NeuSwitch';
import NeuView from '../../common/neu-element/lib/NeuView';
import NeuButton from '../../common/neu-element/lib/NeuButton';

const Profile = () => {
  const {goBack} = useNavigation();
  const [activeOptions, setactiveOptions] = useState('Social');
  const [active, setActive] = useState(true);
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
      <Block center padding={[hp(2), wp(3)]} space="between" flex={false} row>
        <Block flex={false} row>
          <ImageComponent name="demouser" height={100} width={100} />
          <Block margin={[0, 0, 0, wp(3)]} flex={false}>
            <Text white bold size={24}>
              Elisa Jones
            </Text>
            <Text margin={[hp(0.5), 0, 0]} size={14} white regular>
              UX/UI Designer at Atom 6
            </Text>
            <Text margin={[hp(0.5), 0, 0]} size={16} semibold white>
              320 Connections
            </Text>
          </Block>
        </Block>
        <TouchableOpacity>
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
          containerStyle={{flexDirection: 'row'}}
          inset>
          {activeOptions === 'Social' ? (
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
              onPress={() => setactiveOptions('Social')}
              grey
              regular
              center
              size={13}>
              Social
            </Text>
          )}
          {activeOptions === 'Business' ? (
            <NeuButton
              color="#F2F0F7"
              width={wp(20)}
              height={hp(3.5)}
              style={{marginRight: wp(2)}}
              borderRadius={6}>
              <Text
                semibold
                onPress={() => setactiveOptions('Business')}
                purple
                center
                size={13}>
                Business
              </Text>
            </NeuButton>
          ) : (
            <Text
              style={[styles.inactiveText, {marginLeft: wp(1)}]}
              onPress={() => setactiveOptions('Business')}
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
  const renderSocialIcons = () => {
    return (
      <NeuView
        width={100}
        height={100}
        color={'#eef2f9'}
        customGradient={['#fc6859', '#e945d0']}>
        <Text
          style={[styles.inactiveText, {marginLeft: wp(1)}]}
          onPress={() => setactiveOptions('Business')}
          grey
          regular
          size={13}>
          Business
        </Text>
      </NeuView>
    );
  };
  return (
    <Block linear>
      <SafeAreaView />
      {renderHeader()}
      {renderProfile()}
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <Block
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          padding={[hp(2), wp(3)]}
          color="#F2EDFA">
          <Text grey regular size={16} center>
            Swipe to choose a type of account{' '}
          </Text>
          {renderOptions()}
          {renderSocialIcons()}
        </Block>
      </ScrollView>
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
    // width: 70,
    // height: 30,
  },
  inactiveText: {
    width: wp(20),
  },
});
export default Profile;
