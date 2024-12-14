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
  const [title, setTitle] = useState<string>("");
  const [writer, setWriter] = useState<string>("");

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
  }, [books]);

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

  const handleAdd = async () => {
    if (!title || !writer) {
      return alert("제목과 저자를 입력하세요");
    }

    try {
      const newBook = {
        title,
        writer,
      };
      const response = await axios.post(
        "http://localhost:8000/api/books",
        newBook
      );
      console.log("post response", response);
    } catch (err) {
      console.error(err);
    }
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
        <AddWrapper>
          <InputWrapper>
            <TitleInput
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <WriterInput
              placeholder="저자를 입력하세요"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </InputWrapper>
          <AddButton onClick={handleAdd}>추가</AddButton>
        </AddWrapper>
      </HeadWrapper>
      <BookList books={searchResults} onSelectBook={handleSelectBook} />
    </div>
  );
};
const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

const AddWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  height: 30px;
  width: 250px;
  font-size: 20px;
`;

const WriterInput = styled.input`
  height: 30px;
  width: 250px;
  font-size: 20px;
`;

const AddButton = styled.button`
  cursor: pointer;
  height: 30px;
  width: 100px;
  margin-left: 10px;
`;

export default BooksPage;
