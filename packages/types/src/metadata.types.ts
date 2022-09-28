export interface ITheme {
  _id?: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface IMetadata {
  theme: ITheme;
}
