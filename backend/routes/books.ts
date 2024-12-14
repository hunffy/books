import express, { Request, Response } from "express";
import books from "../data/books.json";

const router = express.Router();

// TypeScript 타입 지정
type Book = {
  id: number;
  title: string;
  writer: string;
};

// books 데이터에 타입 지정
const booksTyped: Book[] = books;

// GET: All Books
router.get("/", (req: Request, res: Response) => {
  res.json(booksTyped);
});

// GET: Book by ID
router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const book = booksTyped.find((b: Book) => b.id === parseInt(id, 10));

  if (!book) {
    return res.status(400).json({ message: "Book not Found" });
  }

  res.json(book);
});

// POST: Add Book
router.post("/", (req: Request, res: Response) => {
  const { title, writer } = req.body;
  const newBook: Book = { id: booksTyped.length + 1, title, writer };
  booksTyped.push(newBook);

  res.status(201).json({ message: "Book added successfully", book: newBook });
});

// PUT: Update Book
router.put("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const index = booksTyped.findIndex((b: Book) => b.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(400).json({ message: "Book not Found" });
  }

  const { title, writer } = req.body;
  booksTyped[index] = { ...booksTyped[index], title, writer };

  res.json({ message: "Book Updated successfully", book: booksTyped[index] });
});

// DELETE: Delete Book
router.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const index = booksTyped.findIndex((b: Book) => b.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(400).json({ message: "Book not Found" });
  }

  booksTyped.splice(index, 1);

  res.json({ message: "Book Deleted successfully" });
});

export default router;
