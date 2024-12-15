import { SearchForm } from './SearchForm';
import { useSearchParams } from 'react-router'; 
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const HeaderWrapper = styled(motion.header)`

    padding: 10px 20px;

`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.img`
    width: 130px;
    height: 30px;
`;

export default function Header() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (query) => {
        setSearchParams({ q: query }); 
    };

    return (
        <HeaderWrapper>
            <Nav>
                <Logo src="/src/assets/ytube.png" alt="YouTube Logo" />
                <SearchForm onSearch={handleSearch} /> 
            </Nav>
        </HeaderWrapper>
    );
}
