import { disconnect } from "mongoose";
import { connect } from "../config/mongo";
import { IAuth } from "../models/auth.module";
import { AuthModule, ThemeModule, AuthorModule } from "../models";
import { themes, authors } from "./data";

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
  await ThemeModule.remove();
  console.log("Removed themes");
}

async function seed() {
  connect(async (err) => {
    try {
      if (err) throw err;
      await cleanAll();

      await AuthModule.create(user);
      console.log("Created user");

      const themesDoc = await ThemeModule.insertMany(themes);
      console.log("Created themes");

      for (const themeDoc of themesDoc) {
        console.log("finding author");
        const author = await AuthorModule.findOneAndUpdate(
          { name: themeDoc.author },
          {
            $push: { themes: themeDoc },
          },
          {
            new: true,
            upsert: true,
            rawResult: true,
          }
        );
        console.log("Updated or created", author.value?.name);
        console.log("themes", author.value?.themes);

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
