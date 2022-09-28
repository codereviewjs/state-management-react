export interface ITheme {
  _id?: string;
  author: string;
  title: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface IAuthor {
  _id?: string;
  name: string;
  themes: ITheme[];
}
