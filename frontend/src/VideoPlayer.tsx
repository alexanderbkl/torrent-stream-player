// src/components/VideoPlayer.tsx


const VideoPlayer = () => {

  const videoSrc = "http://localhost:3001/stream"; // URL to your streaming endpoint

  return (
    <video controls width="100%">

      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;