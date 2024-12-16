import { Link } from 'react-router';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const VideoContainerWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const SectionVideo = styled.div`
  display: grid;
  grid-direction: row;
  padding: 5%;
    grid-template-columns: repeat(3, 1fr);
  gap: 20px;`;

const VideoWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default function VideoContainer({ video }) {
  return (
    <SectionVideo> 
    <VideoContainerWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
    >
      <Link to={`/video/${video.id.videoId}`}>
        <VideoWrapper>
          <img
            src={video.snippet.thumbnails.url}
            width="371px"
            height="207px"
            alt={video.title || 'Video Thumbnail'}
          />
        </VideoWrapper>
      </Link>
      <ContentWrapper>
        <h3>{video.title || 'Video Title'}</h3>
        <p>{video.description || 'No description available'}</p>
        <strong>{video.snippet.duration || 'Additional Info'}</strong>
      </ContentWrapper>
    </VideoContainerWrapper>
    </SectionVideo>
  );
}
