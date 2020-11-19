import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './styles';

interface props {
  onValue(text: string): void;
  onPress?: () => void;
}

const Search = (props: props) => {
  return (
    <View style={styles.container}>
      <TextInput
        underlineColorAndroid={'transparent'}
        style={styles.input}
        onChangeText={props.onValue}
        placeholder={'search...'}
      />
    </View>
  );
};

export default Search;
