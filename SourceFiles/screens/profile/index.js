import React, {useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Block,
  Text,
  ImageComponent,
  CustomButton,
  Button,
} from '../../components';
import {hp, wp} from '../../components/responsive';
import NeuView from '../../common/neu-element/lib/NeuView';
import NeuButton from '../../common/neu-element/lib/NeuButton';
import {useNavigation} from '@react-navigation/core';
import {Modalize} from 'react-native-modalize';
import NeoInputField from '../../components/neo-input';

const Profile = () => {
  const {navigate} = useNavigation();
  const [activeOptions, setactiveOptions] = useState('Social');
  const [toggle, setToggle] = useState(true);
  const [action, setAction] = useState(null);
  const modalizeRef = useRef();
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
  const onOpen = () => {
    modalizeRef.current?.open();
    setAction('add_account');
  };
  const _renderFooter = () => {
    return (
      <NeuButton
        onPress={() => onOpen()}
        active
        color="#eef2f9"
        width={70}
        height={70}
        borderRadius={16}
        style={{marginLeft: wp(3), marginTop: hp(1)}}>
        <ImageComponent name="add_icon" height={30} width={30} />
      </NeuButton>
    );
  };
  const renderSocialIcons = () => {
    return (
      <FlatList
        ListFooterComponent={_renderFooter}
        contentContainerStyle={styles.containerStyle}
        data={[
          'phone_link_icon',
          'email_link_icon',
          'behance_link_icon',
          'link_icon',
        ]}
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <ImageComponent name={item} height={90} width={90} />
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const AddSocialIcons = () => {
    return (
      <FlatList
        contentContainerStyle={[
          styles.containerStyle,
          {paddingVertical: hp(3)},
        ]}
        data={[
          'phone_link_icon',
          'email_link_icon',
          'behance_link_icon',
          'link_icon',
          'link_icon',
          'phone_link_icon',
          'email_link_icon',
          'behance_link_icon',
          'behance_link_icon',
          'link_icon',
          'phone_link_icon',
          'email_link_icon',
          'email_link_icon',
          'behance_link_icon',
          'link_icon',
          'phone_link_icon',
        ]}
        renderItem={({item}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => setAction('select_account')}
                style={{paddingLeft: wp(1.5)}}>
                <ImageComponent name={item} height={95} width={95} />
              </TouchableOpacity>
            </>
          );
        }}
      />
    );
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
          padding={[hp(2), wp(3)]}
          color="#F2EDFA">
          <Text grey regular size={16} center>
            Swipe to choose a type of account{' '}
          </Text>
          {renderOptions()}
          {renderSocialIcons()}
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
              <ImageComponent name={'link_icon'} height={95} width={95} />
              <Text purple semibold margin={[hp(1), 0]}>
                Link
              </Text>
              <Block flex={false} margin={[hp(2), 0, 0]}>
                <NeoInputField
                  placeholder={'Instagram account'}
                  fontColor="#707070"
                  icon=""
                  width={70}
                />
                <Block flex={false} margin={[hp(2), 0, 0]}>
                  {renderOptions()}
                </Block>
                <Button linear color="primary">
                  Save
                </Button>
              </Block>
            </Block>
          </>
        )}
      </Modalize>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  neoContainer: {flexDirection: 'row'},
});
export default Profile;
