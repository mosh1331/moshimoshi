import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {useState} from 'react';
export default function Loader() {
  return (
    <LottieView
      source={require('./loader.json')}
      style={styles.animation}
      autoPlay
    />
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
});
