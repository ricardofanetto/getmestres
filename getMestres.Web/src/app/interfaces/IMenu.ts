export interface IMenu {
  group: string;
  items: Array<IMenuItem>;
}

export interface IMenuItem {
  label: string;
  url: string;
  icon: string;
}