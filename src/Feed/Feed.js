import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Feed = () => {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
};

export default Feed;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 20,
    backgroundColor: 'tomato',
    marginBottom: 20,
  },
});
