import React from "react";
import styled from "styled-components";
type Book = {
  id: number;
  title: string;
  writer: string;
};

type Props = {
  books: Book[];
  onSelectBook: (book: Book) => void;
};

const BookList: React.FC<Props> = ({ books, onSelectBook }) => {
  return (
    <BookListWrapper>
      {books.map((book: Book) => (
        <BookWrapper key={book.id} onClick={() => onSelectBook(book)}>
          <div>제목 : {book.title}</div>
          <div>저자 : {book.writer}</div>
        </BookWrapper>
      ))}
    </BookListWrapper>
  );
};

const BookListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 100px;
  gap: 16px;
  padding: 16px;
`;

const BookWrapper = styled.div`
  cursor: pointer;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default BookList;
