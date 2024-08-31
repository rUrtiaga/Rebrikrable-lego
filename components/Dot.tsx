import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export enum DotPosition {
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
}

const Dot = (props: { position: DotPosition }) => {
  return <View style={{...styles.dot, ...styles[props.position]}} />;
};

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    elevation: 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: Colors.lightPrimary,
    width: 14,
    height: 14,
    borderRadius: 50,
    zIndex: 50,
  },
  topLeft: {
    top: 4,
    left: 4,
  },
  topRight: {
    top: 4,
    right: 4,
  },
  bottomLeft: {
    bottom: 4,
    left: 4,
  },
  bottomRight: {
    bottom: 4,
    right: 4,
  },
});

export default Dot;
