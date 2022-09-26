export interface IBook {
  author: string;
  country: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

export interface IAuthor {
  name: string;
  books: IBook[];
}
