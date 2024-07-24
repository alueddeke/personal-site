import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import WaveSurfer from "wavesurfer.js";
import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
const fullConfig = resolveConfig(tailwindConfig);

function HowlerPlayer({ src, title, startTime = 0, endTime = null }) {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(startTime);
  const [isLoaded, setIsLoaded] = useState(false);
  const [howl, setHowl] = useState(null);
  const waveformRef = useRef(null);
  const containerRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(startTime);

  useEffect(() => {
    waveformRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: fullConfig.theme.colors["light-gray"],
      progressColor: fullConfig.theme.colors["sky-blue"]["300"],
      cursorColor: fullConfig.theme.colors["deep-teal"],
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 80,
      barGap: 3,
    });

    const loadAudio = async () => {
      try {
        await waveformRef.current.load(src);
        setIsLoaded(true);
        setDuration(waveformRef.current.getDuration());
        waveformRef.current.seekTo(
          startTime / waveformRef.current.getDuration()
        );
        setCurrentPosition(startTime);
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    loadAudio();

    return () => {
      if (waveformRef.current) {
        waveformRef.current.destroy();
      }
    };
  }, [src, startTime]);

  useEffect(() => {
    if (isLoaded) {
      const newHowl = new Howl({
        src: [src],
        html5: true,
        onload: () => {
          setDuration(newHowl.duration());
          newHowl.seek(startTime);
        },
        onend: () => {
          setPlaying(false);
          setSeek(startTime);
          setCurrentPosition(startTime);
          if (waveformRef.current) {
            waveformRef.current.seekTo(startTime / newHowl.duration());
          }
        },
      });
      setHowl(newHowl);

      return () => {
        newHowl.unload();
      };
    }
  }, [isLoaded, src, startTime]);

  useEffect(() => {
    let interval;
    if (playing && howl) {
      interval = setInterval(() => {
        const currentSeek = howl.seek();
        setSeek(currentSeek);
        setCurrentPosition(currentSeek);
        if (waveformRef.current && duration > 0) {
          waveformRef.current.seekTo(currentSeek / duration);
        }
        if (endTime && currentSeek >= endTime) {
          howl.pause();
          setPlaying(false);
          setSeek(startTime);
          setCurrentPosition(startTime);
          waveformRef.current.seekTo(startTime / duration);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [playing, howl, duration, startTime, endTime]);

  const togglePlayPause = () => {
    if (!howl) return;

    if (playing) {
      howl.pause();
    } else {
      howl.seek(currentPosition);
      howl.play();
    }
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    if (!isLoaded || !howl) return;

    const container = containerRef.current;
    const clickPosition =
      (e.clientX - container.getBoundingClientRect().left) /
      container.clientWidth;
    let seekTime = clickPosition * duration;

    if (endTime) {
      seekTime = Math.min(seekTime, endTime);
    }

    howl.seek(seekTime);
    setSeek(seekTime);
    setCurrentPosition(seekTime);
    waveformRef.current.seekTo(seekTime / duration);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-light-gray bg-opacity-10 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
      <div className="text-lg text-off-white font-semibold mb-2">{title}</div>
      <div
        ref={containerRef}
        className="cursor-pointer"
        onClick={handleSeek}
      ></div>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={togglePlayPause}
          className="bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-700"
        >
          {playing ? "Pause" : "Play"}
        </button>
        <div className="text-sm text-off-white">
          {formatTime(seek)} / {formatTime(endTime || duration)}
        </div>
      </div>
    </div>
  );
}

export default HowlerPlayer;
