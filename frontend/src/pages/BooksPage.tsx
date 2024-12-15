import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../components/BookList.tsx";
import SearchBox from "../components/SearchBox.tsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Pagination } from "@mui/material";
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
        setSearchResults(res.data); // 초기 검색 결과 설정
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      setSearchResults(books); // 검색어가 없으면 전체 책 목록 표시
      return;
    }

    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        book.writer.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSearchResults(filteredBooks); // 검색 결과 업데이트
    setCurrentPage(1); // 페이지 초기화
  };

  const handleSelectBook = (book: { id: number }) => {
    navigate(`/detail/${book.id}`);
  };

  const handleAdd = async () => {
    if (!title || !writer) {
      return alert("제목과 저자를 입력하세요");
    }

    try {
      const newBook = { title, writer };

      const response = await axios.post(
        "http://localhost:8000/api/books",
        newBook
      );

      const addedBook = response.data;

      // books와 searchResults에 새 책 추가
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      setSearchResults((prevResults) => [...prevResults, addedBook]);

      setTitle("");
      setWriter("");
    } catch (err) {
      console.error(err);
    }
  };

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const booksPerPage = 10; //한 페이지 당 항목 수

  //페이지 당 데이터 계산
  const indexOfLastBook = currentPage * booksPerPage; // 현재페이지(2) * 10 = 20.
  const indexOfFirstBook = indexOfLastBook - booksPerPage; // 20- 10 =10
  const currentBooks = searchResults.slice(indexOfFirstBook, indexOfLastBook); //10,20 => 10~19인덱스 데이터를 화면에보여줌

  //전체페이지 계산 나눈 값 올림
  const totalPages = Math.ceil(searchResults.length / booksPerPage);

  useEffect(() => {}, [currentBooks]);
  return (
    <div>
      <Title onClick={() => navigate("/")}>BookStore</Title>
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
      <BookList books={currentBooks} onSelectBook={handleSelectBook} />
      <PaginationWrapper>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
          size="large"
        />
      </PaginationWrapper>
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
  cursor: pointer;
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default BooksPage;
