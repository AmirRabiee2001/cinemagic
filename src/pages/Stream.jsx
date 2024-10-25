import { useEffect, useRef, useState } from "react";
import { IoPlay, IoStop, IoVolumeHigh, IoChevronBack, IoVolumeMedium, IoVolumeMute } from "react-icons/io5";
import styled from "styled-components";
import { Loader } from "../UI/Loading";
import CenteredContent from "../styles/CenteredContent";
import { LuSubtitles } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { BsFullscreenExit, BsFullscreen } from "react-icons/bs";

const StreamPage = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: black;
  direction: ltr;
`;

const CustomLoader = styled(Loader)`
  color: white;
`;

const CustomCenteredContent = styled(CenteredContent)`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
`;

// Styled components
const CustomVideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  z-index: -10;
`;

const ControlsOverLay = styled.div`
  position: fixed;
  width: 100vw;
  transition: opacity 0.2s ease;
  opacity: ${(props) => (props.hidden ? "0" : "1")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  z-index: 20;
  bottom: 0;
  .header {
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    color: white;
    padding: 1.5rem;
    gap: 2rem;
    svg {
      font-size: 4rem;
      cursor: pointer;
    }
  }
  .controls {
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .control-buttons {
    display: flex;
    width: 90%;
    margin: 1rem auto;
    align-items: center;
    gap: 2rem;
  }
`;

const ProgressBar = styled.input.attrs({ type: "range" })`
  appearance: none; /* Removes default styling */
  width: 90%;
  border-radius: 1rem;
  margin: 1rem auto;
  height: 8px;
  background: ${({ value, max }) =>
    `linear-gradient(to right, var(--color-primary) ${((value / max) * 100).toFixed(2)}%, rgba(255, 255, 255, 0.2) ${(
      (value / max) *
      100
    ).toFixed(2)}%)`}; /* Track color */
  outline: none;
  cursor: pointer;
  bottom: 10%;
  z-index: 20;

  &:hover {
    height: 10px;
    &::-webkit-slider-thumb {
      transform: scale(1.5);
    }
  }

  /* Track */
  &::-webkit-slider-runnable-track {
    height: 8px;
  }

  /* Thumb */
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: var(--color-primary);
    border-radius: 50%;
    cursor: pointer;
    margin-top: -4px; /* Centers the thumb vertically */
  }

  /* Active color when dragging */
  &:active::-webkit-slider-thumb {
    filter: brightness(2);
  }
`;

const PlayButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 4rem;
  cursor: pointer;
  p {
    margin: 0 1rem;
    font-size: 2rem;
  }
`;

const VolumeButton = styled.div`
  color: white;
  position: relative;
  display: flex;
  cursor: pointer;
  font-size: 4rem;
  &:hover {
    input {
      display: inline-block;
    }
  }
  input {
    appearance: none;
    display: none;
    background-color: rgba(120, 120, 120, 0.5);
    padding: 1rem;
    outline: none;
    border-radius: 1rem;
    position: absolute;
    top: -310%;
    right: -120%;
    transform: rotate(90deg);
    direction: rtl;

    /* Track */
    &::-webkit-slider-runnable-track {
      height: 8px;
      background: linear-gradient(to left, green, yellow, red);
    }

    /* Thumb */
    &::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      background-color: var(--color-primary);
      border-radius: 50%;
      cursor: pointer;
      margin-top: -4px; /* Centers the thumb vertically */
    }
  }
`;

const SubtitleMenu = styled.div`
  color: white;
  font-size: 4rem;
  display: flex;
`;

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isOverlayHidden, setOverlayHidden] = useState(false);
  const [volume, setVolume] = useState(1);

  const navigate = useNavigate();

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = () => {
    const element = document.documentElement; // Get the document element (the whole page)

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen();
    }
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      handleExitFullscreen();
    } else {
      handleFullscreen();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayHidden(true);
    }, 6000);

    // Cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [isOverlayHidden]);

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    const newTime = e.target.value;
    video.currentTime = newTime;
    setProgress(newTime);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const newVolume = e.target.value;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const updateProgress = () => {
    const video = videoRef.current;
    setProgress(video.currentTime);
  };

  const formatTime = (totalSeconds) => {
    // Round the total seconds to the nearest whole number
    totalSeconds = Math.round(totalSeconds);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
  };

  // In your component
  <PlayButton onClick={togglePlayPause}>
    {isPlaying ? <IoStop /> : <IoPlay />}
    <p>{formatTime(progress)}</p>
  </PlayButton>;

  return (
    <StreamPage>
      {isLoading && (
        <CustomCenteredContent>
          <CustomLoader />
        </CustomCenteredContent>
      )}
      <CustomVideoPlayer
        ref={videoRef}
        controls={false}
        onTimeUpdate={updateProgress}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onSeeking={() => setIsLoading(true)} // Trigger loading on seek start
        onSeeked={() => setIsLoading(false)} // Stop loading when seek completes
      >
        <source
          src="http://dls2.dc-filmbaaz.click/DonyayeSerial/series2/tt0108778/SoftSub/S02/480p.BluRay/Friends.S02E01.480p.BluRay.SoftSub.Unknown.DonyayeSerial.mkv"
          type="video/mp4"
        />
        <source
          src="http://dls2.dc-filmbaaz.click/DonyayeSerial/series2/tt0108778/SoftSub/S02/480p.BluRay/Friends.S02E01.480p.BluRay.SoftSub.Unknown.DonyayeSerial.mkv"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </CustomVideoPlayer>

      <ControlsOverLay hidden={isOverlayHidden} onMouseMove={() => setOverlayHidden(false)}>
        <div className="header">
          <IoChevronBack onClick={() => navigate(-1)} />
          <h2>Friends.S02E01</h2>
        </div>

        <div className="controls">
          <ProgressBar
            type="range"
            min="0"
            max={videoRef.current?.duration || 0}
            value={progress}
            onChange={handleProgressChange}
          />
          <div className="control-buttons">
            <PlayButton onClick={togglePlayPause}>
              {isPlaying ? <IoStop /> : <IoPlay />}
              <p>{formatTime(progress)}</p>
            </PlayButton>
            <VolumeButton>
              {volume >= 0.8 && <IoVolumeHigh />}
              {volume < 0.8 && volume >= 0.02 && <IoVolumeMedium />}
              {volume < 0.02 && <IoVolumeMute />}
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
            </VolumeButton>
            <SubtitleMenu>
              <LuSubtitles />
            </SubtitleMenu>
            <SubtitleMenu onClick={toggleFullscreen}>
              <BsFullscreen />
            </SubtitleMenu>
          </div>
        </div>
      </ControlsOverLay>
    </StreamPage>
  );
};

export default VideoPlayer;
