import VideoContainer from "./VideoContainer";

import "/Users/p1997/React_hsu/week-2-project/src/index.css"

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