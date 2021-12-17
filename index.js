// link http://localhost:4000/
//ctrl c to close the server
require('dotenv').config()
const express = require("express");
//imported epress mpdule



const mongoose = require('mongoose');

const BookModel = require("./schema/book");
const AuthorModel = require("./schema/author");
const PublicationModel = require("./schema/publication");





const Database = require("./database");
//imported database


//promise format
const  MONGO_URI = "mongodb+srv://anmolkapr:anmolkapr@cluster0.zld0b.mongodb.net/BookApi?retryWrites=true&w=majority";
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("connection extablished!"))
    .catch((err) => {
        console.log(err);
    });

const ourApp = express();
//stored the express const in a new varaible

ourApp.use(express.json());







//consider the input in the form of the json format

ourApp.get("/",(request,response) =>{
    //json format
    response.json({message : "HELLO DEVS"});
});

// we will call the function via the http route

//SITE :http://localhost:4000/book
//DESC : to get all the books
//METHOD: GET
//BODY: NONE
//PARAMS: NONE

ourApp.get("/book",async (req, res) => {
    //format of a object
    const getAllBooks = await BookModel.find();//wait till this line is executed *dont move ahead!
    return res.json(getAllBooks);
})

//SITE :http://localhost:4000/publication
//DESC : to get all the publications
//METHOD: GET
//BODY: NONE
//PARAMS: NONE
//MONGO : DONE
ourApp.get("/publication",async (req, res) => {
    const getAllPubs = await PublicationModel.find();//wait till this line is executed *dont move ahead!
    return res.json(getAllPubs);
})

//SITE :http://localhost:4000/publication/:pubid
//DESC : to get all the publication
//METHOD: //GETTING A SPECIFI publication WITH ID
//BODY: NONE
//PARAMS: pubid

ourApp.get("/publication/:pubID",(req,res) =>{
    const {pubID} = req.params;
    const getPubl = Database.Publication.filter(
        (author) => author.id == parseInt(pubID)
    );
    return res.json({Pubication : getPubl});
});



//SITE :http://localhost:4000/book/12345Two
//DESC : to get all the books
//METHOD: //GETTING A SPECIFI BOOK WITH ISBN
//BODY: NONE
//PARAMS: bookID


ourApp.get("/book/:bookID",async (req,res) =>{
    const getSpecificBook = await BookModel.findOne({ISBN : req.params.bookID})
    //getSpecificBook is a object only so no need to make curly brcker
    if(!getSpecificBook){
        //if book not found
        return res.json({
             error: `No book found for the ISBN ${req.params.bookID}`
        });
    }
    return res.json({book : getSpecificBook});
});

//SITE :http://localhost:4000/book/c/:category
//DESC : to get all the books
//METHOD: //GETTING A SPECIFI BOOK WITH ISBN
//BODY: NONE
//PARAMS: category
//find is for more than one unlike findone
ourApp.get("/book/c/:category",async (req,res) =>{
    //checked the array of the category to see if the input vategory is present or not
    const getBookWithCat = await BookModel.find(
       { 
           category : req.params.category,
      });
      if(!getBookWithCat){
          return res.json(`Book not present with category ${req.params.category}`);
      }
      return res.json({books : getBookWithCat});
});

//SITE :http://localhost:4000/book/a/:author
//DESC : to get all the books
//METHOD: //GETTING A SPECIFI BOOK WITH ISBN
//BODY: NONE
//PARAMS: author

ourApp.get("/book/a/:author",(req,res) =>{
    const {author} = req.params;
    const getBook = Database.Book.filter(
        (book) => book.authors.includes(parseInt(author))
    );
    return res.json({book : getBook});
});

//SITE :http://localhost:4000/author
//DESC : to get all the books
//METHOD: GET
//BODY: NONE
//PARAMS: NONE

ourApp.get("/author",async (req, res) => {
    const getAllAuthor = await AuthorModel.find();
    return res.json(getAllAuthor);
})


//SITE :http://localhost:4000/author/:authorID
//DESC : to get all the info about author
//METHOD: //GETTING A SPECIFI BOOK WITH ISBN
//BODY: NONE
//PARAMS: author name


ourApp.get("/author/:authorID",(req,res) =>{
    const {authorID} = req.params;
    const getAuthor = Database.Author.filter(
        (author) => author.id == parseInt(authorID)
    );
    return res.json({author : getAuthor});
});


//***********************POST*****************************//

//SITE :http://localhost:4000/book/new
//DESC : post a new book
//METHOD:  post
//BODY: json
//PARAMS:NONE

ourApp.post("/book/new",async (req, res) => {

    try{
        const { newBook } = req.body;
        await BookModel.create(newBook);
        return res.json({message: "Book added successfully to the database"});

    
    }catch(error){
       return res.json({error: error.message});
    }
});

//SITE :http://localhost:4000/author/new
//DESC : post a new author
//METHOD:  post
//BODY: json
//PARAMS:NONE

ourApp.post("/author/new",async (req, res) => {

    try{
        const { newAuthor } = req.body;
        await AuthorModel.create(newAuthor);
        return res.json({message: "Author added successfully to the database"});

    
    }catch(error){
       return res.json({error: error.message});
    }
});

//SITE :http://localhost:4000/publication/new
//DESC : post a new publication
//METHOD:  post
//BODY: json
//PARAMS:NONE

ourApp.post("/publication/new",(req, res) => {

    const {newPublication} = req.body;

    Database.Publication.push(newPublication);

    return res.json(Database.Publication);
});

//**************************UPDATE OF THE BOOK*****************/

//SITE :http://localhost:4000/book/updateTitle/:isbn
//DESC : uodate the book
//METHOD:  put
//BODY: json
//PARAMS:ISBN
//

//CHECK MONGO
ourApp.put("/book/updateTitle/:isbn", async (req,res) => {
    const {title} = req.body;
    const {isbn} = req.params;

    const UpdatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN :isbn,
        },
        {
            title: title,
        },
        {
            new: true,
        }
    );
    return res.json({
        book: UpdatedBook,
         message: "Title is updated"});

});


//SITE :http://localhost:4000/book/update/:bookid
//DESC : uodate the book
//METHOD:  put
//BODY: json
//PARAMS:ISBN

ourApp.put("/book/update/:isbn", (req,res) =>{
    const {updatedBook} = req.body;
    const {isbn} = req.params;
 
    const book = Database.Book.map((book) => {
       if(book.ISBN == isbn){
          console.log({...book,...updatedBook});
          return { ...book, ...updatedBook};
       }
       return book;
    });
    return res.json(book);
 })

 //SITE :http://localhost:4000/bookAuthor/update/:isbn
//DESC : post a new publication
//METHOD:  put
//BODY: json
//PARAMS:isbn


ourApp.put("/bookAuthor/update/:isbn",async (req,res) =>{
    const { newAuthor } = req.body;
    const { isbn } = req.params;
 
    const UpdatedBook = await BookModel.findOneAndUpdate(
        {
           ISBN: isbn,
        },
        {
            $addToSet:{
                authors: newAuthor,
            },
        },
        {
            new:true,
        }
        );
    
        const Updatedauthor = await AuthorModel.findOneAndUpdate(
            {
                id: newAuthor,
            },
            {
                $addToSet:{
                    books: isbn,
                }
            },
            {
                new: true,
            }
        );

    return res.json(
        {
            books: UpdatedBook,
            authors: Updatedauthor,
            message: "new author was added"
    }
    );
 });

//SITE :http://localhost:4000/author/update/:id
//DESC : uodate the author
//METHOD:  put
//BODY: json
//PARAMS:id

ourApp.put("/author/update/:ID", (req,res) =>{
    const {updatedAuthor} = req.body;
    const {ID} = req.params;
 
    const author = Database.Author.map((author) => {
       if(author.id == parseInt(ID)){
          console.log({...author,...updatedAuthor});
          return { ...author, ...updatedAuthor};
       }
       return author;
    });
    return res.json(author);
 })

 
//SITE :http://localhost:4000/publ/update/:id
//DESC : uodate the publication
//METHOD:  put
//BODY: json
//PARAMS:id
 
ourApp.put("/publ/update/:ID", (req,res) =>{
    const {updatedPubs} = req.body;
    const {ID} = req.params;
 
    const pubs = Database.Publication.map((pubs) => {
       if(pubs.id == parseInt(ID)){
          console.log({...pubs,...updatedPubs});
          return { ...pubs, ...updatedPubs};
       }
       return pubs;
    });
    return res.json(pubs);
 })

////////////**********************************DELETE ROUTE */
//SITE :http://localhost:4000/book/delete/:isbn
//DESC : delete the book
//METHOD:  delete
//BODY: NONE
//PARAMS:isbn

// NOT FILTER,MAP ,FOR EACH are like the loops only


 ourApp.delete("/book/delete/:isbn", async (req,res) => {
     const {isbn} = req.params;

     const booksAfterDel = await BookModel.findOneAndDelete(
         {
             ISBN: isbn,
         }
     )
     return res.json({
         books: booksAfterDel,
         message: `book ${isbn} deleted`
    });
 })

 //SITE :http://localhost:4000/book/delete/author/:isbn/:id
//DESC : delete the author form the book
//METHOD:  delete
//BODY: NONE
//PARAMS:isbn

ourApp.delete("/book/delete/author/:isbn/:id",async (req,res) =>{
    
    const { isbn, id } = req.params;
    
    const UpdatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn,
        },
        {
            $pull:{
                authors: parseInt(id),
            }
        },
        {
            new: true,
        }
      

    )

    const Updatedauthor = await AuthorModel.findOneAndUpdate(
        {
           id: parseInt(id),
        },
        {
            $pull:{
                books: isbn,
            }
        },
        {
            new: true,
        }
    )

    
    return res.json({book: UpdatedBook , author: Updatedauthor,
    message: "author deleted "});
});


//SITE :http://localhost:4000/author/delete/:id
//DESC : delete the author
//METHOD:  delete
//BODY: NONE
//PARAMS:id


ourApp.delete("/author/delete/:id", async (req,res) => {
    const {id} = req.params;

     const authorsAfterDel = await AuthorModel.findOneAndDelete(
         {
             id: parseInt(id),
         }
     )
     return res.json({
         author: authorsAfterDel,
         message: `author ${id} deleted`
    });
})


//SITE :http://localhost:4000/publication/delete/:id
//DESC : delete the publication
//METHOD:  delete
//BODY: NONE
//PARAMS:id


ourApp.delete("/publication/delete/:id",async  (req,res) => {
    const {id} = req.params;

    const pubsAfterDel = await PublicationModel.findOneAndDelete(
        {
            id: parseInt(id),
        }
    )
    return res.json({
        pubs: pubsAfterDel,
        message: `publication ${id} deleted`
   });
})

//SITE :http://localhost:4000/publication/delete/book/:isbn/:id
//DESC : delete the publication
//METHOD:  delete
//BODY: NONE
//PARAMS:id,isbn


ourApp.delete("/publication/delete/book/:isbn/:id", (req,res) => {
    const { isbn, id } = req.params;
    
    Database.Book.forEach((book) => {
        if (book.ISBN === isbn) {
            book.publication = 0;//statets that no publicatio is there
            return book;
        }
        return book;
    })

    Database.Publication.forEach((pub) => {
        if(pub.id === parseInt(id)){
            
       const updbooks = pub.books.filter((book) => book !== isbn);
       pub.books = updbooks;

       return pub;

    }
    return pub;
});
    return res.json(Database.Publication );
});


    
    
    







ourApp.listen(4000,() => console.log("server is running"));//in terminal


