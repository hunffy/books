import React from "react";
import styled from "styled-components";
type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSearch: () => void;
};
const SearchBox: React.FC<Props> = ({
  inputValue,
  setInputValue,
  onSearch,
}) => {
  return (
    <SearchWrapper>
      <SearchInput
        placeholder="검색어를 입력해 주세요."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <SearchButton onClick={onSearch}>검색</SearchButton>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 30px;
  font-size: 20px;
`;

const SearchButton = styled.button`
  width: 100px;
  height: 30px;
  margin-left: 10px;
`;

export default SearchBox;
