import React from "react";
import { Part, PartLego } from "@/app/api/apiTypes";
import { stylesList } from "@/constants/StyleList";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ItemListPart({ item, quantity= 1 }: { item: Part | PartLego, quantity?: number }) {
  // Transform item into a unified format for rendering
  const itemShow = "part" in item
    ? {
        key: String(item.id),
        title: item.part.name,
        image: item.part.part_img_url || "../../assets/images/icon.png",
        quantity: item.quantity,
      }
    : {
        key: item.name,
        title: item.name,
        image: item.part_img_url || "../../assets/images/icon.png",
        quantity,
      };

  return (
    <View style={stylesList.item} key={itemShow.key}>
      <View style={stylesList.gridContainer}>
        {/* First Column */}
        <View style={stylesList.gridItem}>
          <Text style={stylesList.title}>{itemShow.title}</Text>
          <Text style={stylesList.subtitle}>Quantity: {itemShow.quantity}</Text>
        </View>
        {/* Second Column (Image) */}
        <View style={stylesList.imageContainer}>
          <Image
            style={stylesList.image}
            source={{ uri: itemShow.image }}
            alt={`${itemShow.title} image`}
          />
        </View>
      </View>
    </View>
  );
}