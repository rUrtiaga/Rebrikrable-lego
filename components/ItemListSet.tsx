import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { PartList, SetLego } from "@/app/api/apiTypes";
import { Href, Link } from "expo-router";
import { stylesList } from "@/constants/StyleList";

const ItemListSet = ({ item }: { item: SetLego | PartList }) => {
  const itemShow: {
    id: string;
    name: string;
    screen: Href<string>;
    num_parts: number;
    set_img_url: string;
  } = {
    id: "",
    screen: "/",
    name: "",
    num_parts: 0,
    set_img_url: "",
  };

  if ("year" in item) {
    itemShow.id = item.set_num;
    itemShow.screen = `./SetScreen/${itemShow.id}` as const;
    itemShow.name = item.name;
    itemShow.num_parts = item.num_parts;
    itemShow.set_img_url = item.set_img_url;
  } else {
    itemShow.id = String(item.id);
    itemShow.screen = `./PartListScreenDetail/${itemShow.id}`;
    itemShow.name = item.name;
    itemShow.num_parts = item.num_parts;
  }

  return (
    <View key={itemShow.id} style={stylesList.item}>
      <Link href={itemShow.screen} asChild>
        <Pressable>
          <View style={stylesList.gridContainer}>
            <View style={stylesList.gridItem}>
              <Text style={stylesList.title}>{itemShow.name}</Text>
              <Text style={stylesList.subtitle}>
                Num parts: {itemShow.num_parts}
              </Text>
            </View>
            <Image
              style={stylesList.image}
              source={{
                uri: itemShow.set_img_url || "../../assets/images/icon.png",
              }}
              resizeMode="contain"
            />
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

export default ItemListSet;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    flex: 4,
  },
  image: {
    width: 80,
    height: 80,
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
