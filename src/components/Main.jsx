import VideoContainer from "./VideoContainer";

export default function Main({videos, error}) {

    if (error) {
        return <div>Error fetching videos. Please try again later.</div>;
      }
      
    return (

        <div className="content">
    
            <div className="video-section">
           
            {videos&&videos.length > 0 ? (
                    videos.map((video, index) => (
                        <VideoContainer key={index} video={video} />
                    ))
                ) : (
                    <p>Loading...... Pleaase wait...... Pleaaaase.. PLEASE!!! </p>
                )}

     </div>
     </div>
  
    );
}