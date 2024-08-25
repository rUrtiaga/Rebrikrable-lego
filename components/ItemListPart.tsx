import React from "react";
import { Part } from "@/app/api/apiTypes";
import { stylesList } from "@/constants/StyleList";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ItemListPart({ item }: { item: Part }) {
  return (
    <View style={stylesList.item} key={item.part_num}>
      <View style={styles.gridContainer}>
        {/* First Column */}
        <View style={styles.gridItem}>
          <Text style={stylesList.title}>{item.name}</Text>
        </View>
        {/* Second Column (Image) */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.part_img_url }}
            alt={`${item.name} image`}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridItem: {
    flex: 4, // Occupies the first 4/5ths of the grid
  },
  imageContainer: {
    flex: 1, // Occupies the last 1/5th of the grid
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
});
