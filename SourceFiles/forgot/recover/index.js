import React from 'react';
import {ScrollView, SafeAreaView, FlatList, StyleSheet} from 'react-native';

//Constant Files
import {CommonColors} from '../../Constants/ColorConstant';
import {Block, Button, ImageComponent, Input, Text} from '../../components';
import {hp, wp} from '../../components/responsive';
import {Neomorph, Shadow} from 'react-native-neomorph-shadows';

const RecoverPassword = () => {
  const renderValidationText = () => {
    return (
      <Block flex={false} margin={[hp(2), 0, 0]}>
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
  const renderIcons = () => {
    return (
      <Block row space={'between'} flex={false} margin={[hp(4), wp(2), 0]}>
        <Block flex={false} margin={[hp(4), 0, 0]}>
          <ImageComponent name="orangeCloud" height={100} width={100} />
        </Block>
        <ImageComponent name="behance" height={60} width={60} />
      </Block>
    );
  };
  return (
    <Block linear>
      <SafeAreaView />
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Block flex={false} center>
          <ImageComponent
            resizeMode="contain"
            height={140}
            width={140}
            name={'nameBg'}
          />
        </Block>
        <Block
          flex={1}
          color={'#F2EDFA'}
          borderTopRightRadius={30}
          borderTopLeftRadius={30}
          padding={[0, wp(5), hp(2), wp(5)]}>
          <ScrollView>
            <Text
              purple
              center
              size={25}
              color={CommonColors.PurpleColor}
              semibold
              margin={[hp(4), 0]}>
              Recover Password
            </Text>
            <Neomorph
              darkShadowColor="#fff" // <- set this
              lightShadowColor="#fff" // <- this
              style={styles.shadow}>
              <Input
                primary
                style={styles.input}
                rightLabel
                secure
                color="#707070"
                placeholder="Password"
                placeholderTextColor={'#707070'}
              />
            </Neomorph>
            <Neomorph
              darkShadowColor="#fff" // <- set this
              lightShadowColor="#fff" // <- this
              style={styles.shadow}>
              <Input
                primary
                rightLabel
                secure={true}
                style={styles.input}
                color="#707070"
                placeholder="Confirm Password"
                placeholderTextColor={'#707070'}
              />
            </Neomorph>

            <Block row margin={[hp(1), 0]} flex={false}>
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
            {renderIcons()}
          </ScrollView>
          <Block flex={false} padding={[0, wp(3)]}>
            <Button linear color="primary">
              Reset Password
            </Button>
          </Block>
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
});
export default RecoverPassword;
