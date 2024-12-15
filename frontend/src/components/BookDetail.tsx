import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BookUpdate from "./BookUpdate.tsx";
type Book = {
  id: number;
  title: string;
  writer: string;
};

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [onUpdate, setOnUpdate] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/books/${id}`
      );
      console.log(response);
      alert("정상적으로 삭제되었습니다.");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) {
      fetchBook();
    }
  }, [id]);
  if (!book) {
    return <div>데이터를 불러오는 중입니다..</div>;
  }
  return (
    <Detail>
      {!onUpdate ? (
        <DetailWrapper>
          <div>제목 : {book.title}</div>
          <div>저자 : {book.writer}</div>
          <ButtonWrapper>
            <UpdateButton onClick={() => setOnUpdate(true)}>수정</UpdateButton>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </ButtonWrapper>
        </DetailWrapper>
      ) : (
        <BookUpdate
          title={book.title}
          writer={book.writer}
          offUpdate={() => setOnUpdate(false)}
        />
      )}
    </Detail>
  );
};

const Detail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

const UpdateButton = styled.button``;
const DeleteButton = styled.button``;

export default BookDetail;
