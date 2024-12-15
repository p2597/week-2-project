import { useParams, useSearchParams } from 'react-router';
import useSWR from 'swr';
import axios from 'axios';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import VideosSearch from './VideosSearch';

const fetcher = (url) => axios.get(url).then((res) => res.data);

// Styled Components
const VideoDetailWrapper = styled(motion.div)`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 40px 20px;
    max-width: 1400px;
    margin: 0 auto;
`;

const VideoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const VideoWrapper = styled.div`
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f9f9f9;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FeaturedSection = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export default function VideoDetail() {
    const { videoId } = useParams();
    const [searchParams] = useSearchParams();

    const { data, error } = useSWR(
        videoId ? `https://harbour.dev.is/api/videos/${videoId}` : null,
        fetcher
    );

    const searchValue = searchParams.get('q');

    if (!data && !error) {
        return <p>Uno momento...</p>;
    }

    if (error) {
        return <p>Error loading video details. Please try again later.</p>;
    }

    return (
        <VideoDetailWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="video-detail"
        >
            {/* Video Section */}
            <VideoSection className="video-v-flex">
                <VideoWrapper>
                    <ReactPlayer
                        url={data.url}
                        width="100%"
                        height="550px"
                        controls
                    />
                </VideoWrapper>
                <TextWrapper className="searched-video-text-wrapper">
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                    <p>Channel: {data.channelName}</p>
                    <p>Views: {data.views}</p>
                </TextWrapper>
            </VideoSection>

            {/* Featured Videos Section */}
            <FeaturedSection
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="featured-v-flex"
            >
                {searchValue ? <VideosSearch searchValue={searchValue} /> : null}
            </FeaturedSection>
        </VideoDetailWrapper>
    );
}
