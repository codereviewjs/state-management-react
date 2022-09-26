import { disconnect } from "mongoose";
import { connect } from "../config/mongo";
import AuthModule, { IAuth } from "../models/auth.module";
import AuthorModule from "../models/author.module";
import BookModule from "../models/book.module";
import { books } from "./books";

const user: IAuth = {
  email: "admin@gmail.com",
  password: "password",
  isLoggedIn: false,
};

async function cleanAll() {
  await AuthModule.remove();
  console.log("Removed auth");
  await AuthorModule.remove();
  console.log("Removed authors");
  await BookModule.remove();
  console.log("Removed books");
}

async function seed() {
  connect(async (err) => {
    try {
      if (err) throw err;
      await cleanAll();

      await AuthModule.create(user);
      console.log("Created user");

      const booksDoc = await BookModule.insertMany(books);
      console.log("Created books");

      for (const bookDoc of booksDoc) {
        console.log("finding author");
        const author = await AuthorModule.findOneAndUpdate(
          { name: bookDoc.author },
          {
            $push: { books: bookDoc },
          },
          {
            new: true,
            upsert: true,
            rawResult: true,
          }
        );
        console.log("Updated or created", author.value?.name);
        console.log("books", author.value?.books);

        // const author = await AuthorModule.findOne({ name: bookDoc.author });
        // if (author) {
        //   console.log("found author ", author.name);
        //   author.books.push(bookDoc);
        //   await author.save();
        //   console.log("Added new book to ", author.name);
        // } else {
        //   console.log("did not found author");
        //   const createdAuthor = await AuthorModule.create({
        //     name: bookDoc.author,
        //     books: [bookDoc],
        //   });
        //   console.log("created new author", createdAuthor.name);
        // }
      }
    } catch (e: any) {
      console.log(e.message);
    } finally {
      await disconnect();
    }
  });
}

seed();
