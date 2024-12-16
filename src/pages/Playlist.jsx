export default function Playlist({ playlist, removeFromPlaylist }) {
  return (
    <div className="playlist-container">
      <h1>My Playlist</h1>

      {playlist.length > 0 ? (
        <ul>
          {playlist.map((video, index) => (
            <li key={index} className="playlist-item">
              <div>
                
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
              <button onClick={() => removeFromPlaylist(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your playlist is empty. Start adding videos!</p>
      )}
    </div>
  );
}
