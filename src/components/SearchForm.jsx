import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const FormWrapper = styled(motion.form)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 20px;
    padding: 5px 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease;

    &:focus-within {
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.05);
    }
`;

const SearchBar = styled.input`
    border: none;
    outline: none;
    background: transparent;
    padding: 5px;
    font-size: 16px;
    flex: 1;
`;

const SearchButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    margin-left: 5px;
`;

export function SearchForm({ onSearch }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        onSearch(data.search);
    };

    return (
        <FormWrapper
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <SearchContainer className="search-container">
                <SearchBar {...register('search')} className="searchbar" placeholder="Search videos..." />
                <SearchButton type="submit" className="searchBtn">
                    <img src="/src/assets/search-icon.png" alt="Search" width="23px" height="23px" />
                </SearchButton>
            </SearchContainer>
        </FormWrapper>
    );
}
