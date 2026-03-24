import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "SynthAI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/neon/300/300"
  },
  {
    id: 2,
    title: "Cyber City",
    artist: "Neural Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/cyber/300/300"
  },
  {
    id: 3,
    title: "Digital Horizon",
    artist: "AlgoRhythm",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/digital/300/300"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  return (
    <div className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
      
      <div className="flex items-center gap-6">
        <motion.div 
          key={currentTrack.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-24 h-24 flex-shrink-0"
        >
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className={`w-full h-full object-cover rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.3)] ${isPlaying ? 'animate-pulse' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              <h3 className="text-lg font-bold text-white truncate tracking-tight">{currentTrack.title}</h3>
              <p className="text-sm text-cyan-400 font-medium truncate">{currentTrack.artist}</p>
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-4 flex items-center gap-4">
            <button onClick={handlePrev} className="text-white/70 hover:text-cyan-400 transition-colors">
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={handleNext} className="text-white/70 hover:text-cyan-400 transition-colors">
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/40 font-mono uppercase tracking-widest">
          <span>{audioRef.current ? Math.floor(audioRef.current.currentTime / 60) + ':' + String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, '0') : '0:00'}</span>
          <div className="flex items-center gap-1">
            <Volume2 size={10} />
            <span>Live Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
};
