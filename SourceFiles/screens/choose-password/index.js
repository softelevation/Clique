import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

//Constant Files
import {Block, Button, ImageComponent, Input, Text} from '../../components';
import {hp, wp} from '../../components/responsive';
import LinearGradient from 'react-native-linear-gradient';
import HeaderPreLogin from '../../common/header';
import {useNavigation} from '@react-navigation/core';
import NeoInputField from '../../components/neo-input';
import {useRoute} from '@react-navigation/native';
import * as yup from 'yup';
import {Formik} from 'formik';

const ChoosePassword = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  console.log(params, 'params');
  const [state, setState] = useState({
    password: null,
    confirm_pass: null,
  });

  const renderValidationText = () => {
    return (
      <Block flex={false} margin={[hp(2), wp(2), 0]}>
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

  const onSubmit = (values) => {
    navigation.navigate('RegisterProfilePic', {
      name: params.name,
      email: params.email,
      password: values.password,
    });
  };

  return (
    <Block linear>
      <SafeAreaView />
      <Formik
        initialValues={{
          password: '',
          confirm_password: '',
        }}
        onSubmit={onSubmit}
        validationSchema={yup.object().shape({
          password: yup.string().min(8).required(),
          confirm_password: yup
            .string()
            .when('password', {
              is: (val) => (val && val.length > 0 ? true : false),
              then: yup
                .string()
                .oneOf(
                  [yup.ref('password')],
                  'Both password need to be the same',
                ),
            })
            .required(),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          setFieldValue,
          handleSubmit,
          dirty,
          isValid,
        }) => (
          <ScrollView contentContainerStyle={styles.container} bounces={false}>
            <Block padding={[hp(2), 0, 0]} space="between" flex={false} row>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LinearGradient
                  colors={['#5542B6', '#7653DB']}
                  style={styles.linear}>
                  <ImageComponent
                    resizeMode="contain"
                    height={14}
                    width={14}
                    name={'BackIcon'}
                  />
                </LinearGradient>
              </TouchableOpacity>

              <ImageComponent
                resizeMode="contain"
                height={140}
                width={140}
                name={'nameBg'}
              />
              <TouchableOpacity activeOpacity={1} style={styles.customButton} />
            </Block>
            <Block
              flex={1}
              color={'#F2EDFA'}
              borderTopRightRadius={30}
              borderTopLeftRadius={30}
              padding={[0, wp(3), hp(2), wp(3)]}>
              <ScrollView>
                <HeaderPreLogin
                  title="Create Account"
                  subtitle="Choose your Password"
                />
                <Block flex={false} center>
                  <NeoInputField
                    placeholder={'Password'}
                    fontColor="#707070"
                    icon="eye"
                    onChangeText={handleChange('password')}
                    value={values.password}
                    secure
                  />
                  <Block flex={false} margin={[hp(1), 0]} />
                  <NeoInputField
                    placeholder={'Confirm Password'}
                    fontColor="#707070"
                    icon="eye"
                    secure
                    onChangeText={handleChange('confirm_password')}
                    value={values.confirm_password}
                  />
                </Block>
                <Block row margin={[hp(1.5), wp(2)]} flex={false}>
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
              </ScrollView>
              <Block flex={false} padding={[0, wp(3)]}>
                <Button
                  disabled={!isValid || !dirty}
                  onPress={handleSubmit}
                  linear
                  color="primary">
                  Next
                </Button>
              </Block>
            </Block>
          </ScrollView>
        )}
      </Formik>
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
export default ChoosePassword;
