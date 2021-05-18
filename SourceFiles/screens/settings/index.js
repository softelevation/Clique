import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import HeaderSettings from '../../common/header-setting';
import {hp, wp} from '../../components/responsive';
import NeuView from '../../common/neu-element/lib/NeuView';
import NeuButton from '../../common/neu-element/lib/NeuButton';
import {
  Block,
  Text,
  ImageComponent,
  CustomButton,
  Button,
} from '../../components';
import {useNavigation} from '@react-navigation/core';

const Settings = () => {
  const [activeOptions, setactiveOptions] = React.useState('Social');
  const {navigate} = useNavigation();
  const renderOptions = (value1, value2) => {
    return (
      <Block middle center margin={[hp(2), 0, 0]} flex={false}>
        <NeuView
          color="#F2F0F7"
          height={hp(5)}
          width={wp(90)}
          borderRadius={16}
          containerStyle={styles.neoContainer}
          inset>
          {activeOptions === 'Social' ? (
            <NeuButton
              color="#F2F0F7"
              width={wp(45)}
              height={hp(3.5)}
              style={{marginHorizontal: wp(2)}}
              borderRadius={6}>
              <Text semibold purple size={13}>
                Enabled
              </Text>
            </NeuButton>
          ) : (
            <Text
              style={[styles.inactiveText, {marginRight: wp(1), width: wp(35)}]}
              onPress={() => setactiveOptions('Social')}
              grey
              regular
              center
              size={13}>
              Enabled
            </Text>
          )}
          {activeOptions === 'Business' ? (
            <NeuButton
              color="#F2F0F7"
              width={wp(45)}
              height={hp(3.5)}
              style={{marginRight: wp(2)}}
              borderRadius={6}>
              <Text
                semibold
                onPress={() => setactiveOptions('Business')}
                purple
                center
                size={13}>
                Disabled
              </Text>
            </NeuButton>
          ) : (
            <Text
              center
              style={[styles.inactiveText, {marginLeft: wp(1), width: wp(35)}]}
              onPress={() => setactiveOptions('Business')}
              grey
              regular
              size={13}>
              Disabled
            </Text>
          )}
        </NeuView>
      </Block>
    );
  };

  const renderSelectType = (title, nav) => {
    return (
      <CustomButton
        onPress={() => navigate(nav)}
        center
        margin={[hp(3), 0, 0]}
        flex={false}>
        <NeuView
          color="#F2F0F7"
          height={hp(5)}
          width={wp(90)}
          borderRadius={16}
          containerStyle={styles.navStyle}
          inset>
          <Text regular left grey size={13}>
            {title}
          </Text>
          <ImageComponent name="arrow_back_icon" height={12} width={16} />
        </NeuView>
      </CustomButton>
    );
  };
  return (
    <Block color="#F2EDFA">
      <SafeAreaView />
      <HeaderSettings title="Settings" />
      <ScrollView contentContainerStyle={{paddingBottom: hp(2)}}>
        <Block flex={false} padding={[0, wp(3)]}>
          <Text size={18} grey semibold>
            Card Settings
          </Text>
          {renderOptions('Enabled', 'Disabled')}
          {renderSelectType('Lost My Card')}
          {renderSelectType('Sync Card')}
          <Text size={18} margin={[hp(2), 0, 0]} grey semibold>
            Card Settings
          </Text>
          {renderOptions('Enabled', 'Disabled')}
          {renderSelectType('Lost my NFC Tag')}
          {renderSelectType('Sync NFC Tag')}
          <Text size={18} margin={[hp(2), 0, 0]} grey semibold>
            Other Settings
          </Text>
          {renderSelectType('Change Password', 'ChangePasswordSettings')}
          {renderSelectType('Help and Tutorials')}

          <Text margin={[hp(2), 0, 0]} size={18} red semibold>
            Sign Out
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
  navStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
});
export default Settings;
