import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Book = {
  id: number;
  title: string;
  writer: string;
};

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

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
    <div>
      <div>제목 : {book.title}</div>
      <div>저자 : {book.writer}</div>
    </div>
  );
};

export default BookDetail;
