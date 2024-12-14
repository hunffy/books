import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../components/BookList.tsx";
import SearchBox from "../components/SearchBox.tsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
type Book = {
  id: number;
  title: string;
  writer: string;
};
const BooksPage: React.FC = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books");
        setBooks(res.data);
        setSearchResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      setSearchResults(books);
      return;
    }

    const filteredBooks = books.filter(
      (book: Book) =>
        book.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        book.writer.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSearchResults(filteredBooks);
  };

  const handleSelectBook = (book: { id: number }) => {
    navigate(`/detail/${book.id}`);
  };

  return (
    <div>
      <Title>BookStore</Title>
      <HeadWrapper>
        <SearchBox
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearch={handleSearch}
        />
        <AddBox>추가</AddBox>
      </HeadWrapper>
      <BookList books={searchResults} onSelectBook={handleSelectBook} />
    </div>
  );
};
const HeadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

const AddBox = styled.button`
  cursor: pointer;
  height: 30px;
  width: 100px;
  margin-left: 10px;
`;

export default BooksPage;
