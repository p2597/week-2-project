import useSWR from 'swr';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const fetcher = (url) => axios.get(url).then((res) => res.data);

// Styled Components
const FeaturedVideosContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
`;

const VideoItem = styled(motion.div)`
    display: flex;
    gap: 15px;
    align-items: flex-start;
    padding: 10px;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }
`;

const ImageWrapper = styled.div`
    width: 150px;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`;

const Title = styled.h3`
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    color: #333;
`;

const Description = styled.p`
    font-size: 14px;
    color: #666;
`;

export default function VideosSearch({ searchValue }) {
    const { data, error } = useSWR(
        searchValue ? `https://harbour.dev.is/api/search?q=${searchValue}` : null,
        fetcher
    );

    if (!data && !error) {
        return <p>Uno momento...</p>;
    }

    if (error) {
        return <p>Error loading video details. Please try again later.</p>;
    }

    const videos = data?.results || data || []; 

    return (
        <FeaturedVideosContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="featured-v-flex"
        >
            {videos.length > 0 ? (
                videos.map((video, index) => (
                    <VideoItem
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="featured-video-item"
                    >
                        {/* Image Wrapper */}
                        <ImageWrapper className="f-img-wrapper">
                            <Image
                                src={video.snippet.thumbnails.url} 
                                alt={video.title || 'Featured Video'}
                            />
                        </ImageWrapper>

                        {/* Text Wrapper */}
                        <TextWrapper className="f-txt-wrapper">
                            <Title>{video.title || 'No Title Available'}</Title>
                            <Description>{video.description || 'No Description Available'}</Description>
                        </TextWrapper>
                    </VideoItem>
                ))
            ) : (
                <p>No videos found. Try another search query.</p>
            )}
        </FeaturedVideosContainer>
    );
}
