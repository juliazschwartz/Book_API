const express = require('express');
const router = express.Router();
const Book = require('../models/books.js');

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, author: req.body.author },
      { new: true }
    );
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
