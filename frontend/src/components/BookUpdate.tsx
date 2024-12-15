import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  offUpdate: () => void;
  title: string;
  writer: string;
};

const BookUpdate: React.FC<Props> = ({ offUpdate, title, writer }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateTit, setUpdateTit] = useState<string>("");
  const [updateWri, setUpdateWri] = useState<string>("");

  useEffect(() => {
    setUpdateTit(title);
    setUpdateWri(writer);
  }, [title, writer]);

  const handleUpdate = async () => {
    const updateBook = {
      title: updateTit,
      writer: updateWri,
    };
    try {
      const response = await axios.put(
        `http://localhost:8000/api/books/${id}`,
        updateBook
      );
      alert("수정이 완료되었습니다.");
      console.log("수정완료", response);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <UpdateInputWrapper>
        <TitInput
          placeholder="제목을 입력하세요."
          value={updateTit}
          onChange={(e) => setUpdateTit(e.target.value)}
        />
        <WriInput
          placeholder="저자를 입력하세요."
          value={updateWri}
          onChange={(e) => setUpdateWri(e.target.value)}
        />
      </UpdateInputWrapper>
      <UpdateBtn onClick={handleUpdate}>수정</UpdateBtn>
      <CancleBtn onClick={() => offUpdate()}>취소</CancleBtn>
    </div>
  );
};

const UpdateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitInput = styled.input`
  height: 30px;
  width: 250px;
  font-size: 20px;
`;

const WriInput = styled.input`
  height: 30px;
  width: 250px;
  font-size: 20px;
`;

const UpdateBtn = styled.button``;

const CancleBtn = styled.button``;
export default BookUpdate;
