import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import HeaderPostLogin from '../../../common/header-post-login';
import Neomorph from '../../../common/shadow-src/Neomorph';
import {Block, ImageComponent, Text} from '../../../components';
import {hp, wp} from '../../../components/responsive';

const Contacts = () => {
  const _renderItem = () => {
    return (
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <Neomorph style={styles.neoSubContainer}>
          <Block padding={[0, wp(3)]} row center flex={false}>
            <ImageComponent
              name="demouser"
              height={60}
              width={60}
              radius={60}
            />
            <Text semibold margin={[0, 0, 0, wp(3)]} grey size={16}>
              Tejus V Reddy
            </Text>
          </Block>
        </Neomorph>
      </TouchableOpacity>
    );
  };
  return (
    <Block linear>
      <SafeAreaView />
      <HeaderPostLogin title="My Connections" />
      <Block
        color={'#F2EDFA'}
        padding={[hp(2), 0]}
        margin={[hp(2), 0, 0]}
        borderTopRightRadius={30}
        borderTopLeftRadius={30}>
        <FlatList
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          data={[1]}
          renderItem={_renderItem}
        />
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  neoSubContainer: {
    shadowRadius: 3,
    backgroundColor: '#F2F0F7',
    width: wp(90),
    height: hp(8),
    justifyContent: 'center',
    marginTop: hp(1),
  },
});

export default Contacts;
