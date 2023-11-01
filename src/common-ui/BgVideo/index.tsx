import { VideoContainer } from './style';
import BannerVd from '../../assets/BannerVd.mp4';
const VideoBackground = () => {
  return (
    <VideoContainer>
      <video autoPlay muted loop>
        <source src={BannerVd} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </VideoContainer>
  );
};
export default VideoBackground;
