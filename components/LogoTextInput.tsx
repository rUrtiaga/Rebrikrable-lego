import { StyleSheet, Text, TextInputProps, View } from "react-native";
import React from "react";
import { NativeViewGestureHandlerProps, TextInput } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

export default function LogoTextInput(props: React.JSX.IntrinsicAttributes & TextInputProps & NativeViewGestureHandlerProps & React.RefAttributes<React.ComponentType<any>>) {
  return (
    <TextInput
    style={{...styles.input, ...props.style as Object}}
    placeholder={props.placeholder}
    value={props.value}
    onChangeText={props.onChangeText}
    secureTextEntry={props.secureTextEntry}
    placeholderTextColor={"grey"}
    {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'SpaceMono',
    borderColor: Colors.primary,
    color: Colors.primary,
    fontSize: 16,
    borderStyle: "solid",
    borderWidth: 5,
    borderRadius: 5,
    borderCurve: "circular",
    minWidth: 250,
    minHeight: 40,
    padding: 8,
    margin: 6
  },
});
