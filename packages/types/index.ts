export interface ITheme {
  author: string;
  title: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface IAuthor {
  name: string;
  themes: ITheme[];
}
