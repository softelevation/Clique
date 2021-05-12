import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Block, Text, ImageComponent} from '../../components';
import {hp, wp} from '../../components/responsive';
import {useNavigation} from '@react-navigation/core';

const Profile = () => {
  const {goBack} = useNavigation();
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
});
export default Profile;
