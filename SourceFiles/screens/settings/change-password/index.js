import React from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import HeaderSettings from '../../../common/header-setting';
import {hp, wp} from '../../../components/responsive';
import NeuView from '../../../common/neu-element/lib/NeuView';
import NeuButton from '../../../common/neu-element/lib/NeuButton';
import {
  Block,
  Text,
  ImageComponent,
  CustomButton,
  Button,
} from '../../../components';
import NeoInputField from '../../../components/neo-input';
const ChangePasswordSettings = () => {
  const [activeOptions, setactiveOptions] = React.useState('Social');
  const renderValidationText = () => {
    return (
      <Block flex={false} margin={[hp(2), wp(5), 0]}>
        <Text margin={[hp(0.5), 0]} grey size={14}>
          {'- Use 6 to 64 characters.'}
        </Text>
        <Text margin={[hp(0.5), 0]} grey size={14}>
          {'- Besides letters, include at least a number.'}
        </Text>
        <Text margin={[hp(0.5), 0]} size={14} grey>
          {'- Password is case sensitive.'}
        </Text>
        <Text margin={[hp(0.5), 0]} size={14} grey>
          {'- Avoid using the same password for different accounts.'}
        </Text>
      </Block>
    );
  };
  return (
    <Block color="#F2EDFA">
      <SafeAreaView />
      <HeaderSettings title="Change Password" />
      <ScrollView contentContainerStyle={{paddingBottom: hp(2)}}>
        <Block padding={[hp(2), wp(3)]} flex={false} center>
          <NeoInputField
            placeholder={'Password'}
            fontColor="#707070"
            icon="eye"
            secure
          />
          <Block flex={false} margin={[hp(1), 0]} />
          <NeoInputField
            placeholder={'Confirm Password'}
            fontColor="#707070"
            icon="eye"
            secure
          />
        </Block>
        <Block row margin={[hp(1.5), wp(5)]} flex={false}>
          <Text grey size={14}>
            You’re almost there!
          </Text>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            horizontal
            contentContainerStyle={styles.flatlist}
            scrollEnabled={false}
            renderItem={({item}) => {
              return (
                <Block
                  flex={false}
                  borderRadius={10}
                  margin={[0, wp(0.7)]}
                  style={styles.dot}
                />
              );
            }}
          />
        </Block>

        {renderValidationText()}
        <Block flex={false} padding={[hp(7), wp(5)]}>
          <Button linear color="primary">
            Change Password
          </Button>
        </Block>
      </ScrollView>
    </Block>
  );
};
const styles = StyleSheet.create({
  input: {
    shadowColor: '#BBC3CE',
    backgroundColor: 'white',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  flatlist: {
    alignSelf: 'flex-end',
    flexGrow: 1,
    flexDirection: 'row-reverse',
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#4BE351',
  },
  container: {flexGrow: 1},
  shadow: {
    shadowOpacity: 0.1, // <- and this or yours opacity
    shadowRadius: 15,
    borderRadius: 50,
  },
  linear: {
    marginLeft: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  customButton: {
    height: 40,
    width: 40,
  },
});
export default ChangePasswordSettings;
