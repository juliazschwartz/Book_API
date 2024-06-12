const express = require('express');
const bodyParser = require('body-parser');
const books = require('../books');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a single book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

// Add a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update an existing book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');

  books.splice(bookIndex, 1);
  res.status(204).send();
});

app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});