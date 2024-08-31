import { Colors } from "@/constants/Colors";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Dot, { DotPosition } from "./Dot";

export function LegoButton({
  title,
  onPress,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}) {
  const pressAnimation = useSharedValue(0);

  // Animation In function to show that user is pressing button
  const onPressAnimationIn = () => {
    pressAnimation.value = withTiming(6, {
      duration: 130,
      easing: Easing.elastic(0.7),
    });
  };

  // Animation Out function to show that user is unpressing button
  const onPressAnimationOut = () => {
    pressAnimation.value = withTiming(0, {
      duration: 70,
      easing: Easing.linear,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: 8,
    borderTopWidth: pressAnimation.value,
    borderBottomWidth: 5 - pressAnimation.value,
    borderColor: Colors.secondary,
    borderBottomStartRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.1,
    backgroundColor: Colors.primary,
    height: 50,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Dot position={DotPosition.topLeft} />
      <Dot position={DotPosition.bottomLeft} />
      <Pressable
        onPress={(p) => {
          onPress(p);
        }}
        onPressIn={onPressAnimationIn}
        onPressOut={onPressAnimationOut}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
      <Dot position={DotPosition.topRight} />
      <Dot position={DotPosition.bottomRight} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontFamily: "SpaceMono",
    lineHeight: 32,
    color: Colors.text,
  },
});
