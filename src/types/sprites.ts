export type SpriteOption = {
  value: string;
  label: string;
  src: string | null;
};

export type SpriteGroups = {
  [key: string]: SpriteOption[];
};
