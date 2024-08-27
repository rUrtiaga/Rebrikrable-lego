// Set
export interface SetLego {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
}

// Part
export interface PartLego {
  id: number;
  inv_part_id: number;
  part: Part;
  color: Color;
  set_num: string;
  quantity: number;
  is_spare: boolean;
  element_id: any;
  num_sets: number;
}

export interface Color {
  id:number;
}

export interface Part {
  part_num: string;
  name: string;
  part_cat_id: number;
  part_url: string;
  part_img_url: string;
  external_ids: ExternalIds;
  print_of: any;
}

export interface PartPost {
  part_num: string;
  color_id: number;
  quantity: number;
}

export interface ExternalIds {
  BrickLink: string[];
  BrickOwl: string[];
  LDraw: string[];
}


export interface PartList {
  id: number
  is_buildable: boolean
  name: string
  num_parts: number
}
