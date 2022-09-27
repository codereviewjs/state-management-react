export interface ITheme {
  author: String;
  title: String;
  primaryColor: String;
  secondaryColor: String;
  textColor: String;
  backgroundColor: String;
}

export interface IAuthor {
  name: string;
  themes: ITheme[];
}
