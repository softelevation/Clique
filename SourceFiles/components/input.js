import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import {hp, wp} from './responsive';
import Block from './Block';
import Button from './Button';
import Text from './Text';
import {AvertaRegular, t1} from './theme/fontsize';

const componentStyles = () => {
  return StyleSheet.create({
    label: {
      // marginBottom: hp(0.8),
    },
    input: {
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(2),
      fontSize: 16,
      color: '#F2EDFA',
      fontFamily: AvertaRegular,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#F2EDFA',
      borderRadius: 16,
    },
    toggle: {
      position: 'absolute',
      alignItems: 'flex-end',
      width: 16 * 2,
      height: 16 * 2,
      top: 16,
      right: 8,
    },
  });
};

const Input = ({
  email,
  rightLabel,
  label,
  phone,
  number,
  secure,
  error,
  style,
  rightStyle,
  onRightPress,
  placeholder,
  errorText,
  editable = true,
  center,
  placeholderTextColor,
  transparent,
  ...rest
}) => {
  const styles = componentStyles();
  const [toggleSecure, setToggleSecure] = useState(false);
  const renderLabel = () => (
    <Block flex={false}>
      {label ? (
        <Text
          errorColor={error}
          caption
          regular
          center={center ? true : false}
          style={styles.label}
          black={!error}
          accent={error}
          color="#8A8E99">
          {label}
        </Text>
      ) : null}
    </Block>
  );

  const renderToggle = () => {
    if (!secure) {
      return null;
    }
    return (
      <Button
        style={styles.toggle}
        onPress={() => setToggleSecure({toggleSecure: !toggleSecure})}>
        {/* {rightLabel || (
          <Icon
            color={'#000'}
            size={14}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )} */}
      </Button>
    );
  };

  const renderRight = () => {
    if (!rightLabel) {
      return null;
    }

    return (
      <ResponsiveImage
        source={rightLabel}
        initHeight="20"
        initWidth="20"
        style={[styles.toggle, rightStyle]}
      />
    );
  };

  const isSecure = toggleSecure ? false : secure;

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  const inputStyles = [
    styles.input,
    !editable && {
      backgroundColor: '#000',
      color: '#fff',
      borderColor: '#000',
    },
    style,
  ];
  return (
    <Block
      flex={false}
      borderColor={error ? 'red' : 'transparent'}
      borderWidth={error ? 1 : 0}
      margin={[hp(1), 0]}>
      {renderLabel()}
      <TextInput
        placeholder={placeholder}
        style={inputStyles}
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        editable={editable}
        autoCorrect={false}
        keyboardType={inputType}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : '#F2EDFA'
        }
        {...rest}
      />
      {errorText && error && (
        <Text size={12} errorColor>
          {errorText}
        </Text>
      )}
      {renderToggle()}
      {renderRight()}
    </Block>
  );
};

export default Input;
