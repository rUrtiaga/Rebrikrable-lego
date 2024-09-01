import { Colors } from "@/constants/Colors";
import {
  ActivityIndicator,
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
  loading,
}: {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
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
    borderTopWidth: pressAnimation.value,
    borderBottomWidth: 5 - pressAnimation.value,
    borderColor: Colors.secondary,
    borderRadius: 8,
    borderBottomStartRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    backgroundColor: Colors.primary,
    height: 50,
    maxWidth: 250,
    minWidth: 160,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    shadowOffset: { width: 2, height: 5 },
  }));

  return (
    <Pressable
      onPress={(p) => {
        onPress(p);
      }}
      onPressIn={onPressAnimationIn}
      onPressOut={onPressAnimationOut}
      disabled={loading}
    >
      <Animated.View style={animatedStyle}>
        <Dot position={DotPosition.topLeft} />
        <Dot position={DotPosition.bottomLeft} />
        <Text style={styles.text}>
          {loading ? (
            <ActivityIndicator style={{ marginTop: 12 }} color="red" />
          ) : (
            title
          )}
        </Text>
        <Dot position={DotPosition.topRight} />
        <Dot position={DotPosition.bottomRight} />
      </Animated.View>
    </Pressable>
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
