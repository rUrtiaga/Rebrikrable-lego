import { Part } from "@/app/api/apiTypes";
import { stylesList } from "@/constants/StyleList";
import {
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { View } from "react-native";

export default function ItemListPart({ item }: { item: Part }) {
  return (
    <View style={stylesList.item} key={item.part_num}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={4}>
          <View>
            <Text style={stylesList.title}>{item.name}</Text>
          </View>
        </GridItem>
        <GridItem colStart={6} colEnd={6}>
          <Image
            boxSize="80px"
            objectFit="cover"
            src={item.part_img_url}
            alt={item.name + " image"}
          />
        </GridItem>
      </Grid>
    </View>
  );
}
