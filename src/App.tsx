import { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Trophy, Music as MusicIcon, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full" />

      <header className="relative z-10 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Gamepad2 className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">Neon Snake</h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-[0.2em] uppercase opacity-70">Arcade Edition v1.0</p>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Current Score</p>
            <p className="text-2xl font-mono text-cyan-400 leading-none">{score.toString().padStart(4, '0')}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex items-center justify-end gap-1">
              <Trophy size={10} className="text-fuchsia-500" /> High Score
            </p>
            <p className="text-2xl font-mono text-fuchsia-500 leading-none">{highScore.toString().padStart(4, '0')}</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-center justify-center min-h-[calc(100vh-100px)]">
        
        {/* Left Side - Info/Stats */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden lg:flex flex-col gap-6"
        >
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" /> How to Play
            </h2>
            <ul className="space-y-3 text-sm text-white/60 font-medium">
              <li className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 text-[10px] font-mono">ARROWS</kbd>
                <span>Change Direction</span>
              </li>
              <li className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 text-[10px] font-mono">SPACE</kbd>
                <span>Pause / Resume</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_8px_#d946ef]" />
                <span>Eat to Grow</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest mb-4">Global Leaderboard</h2>
            <div className="space-y-2">
              {[
                { name: 'CYBER_PUNK', score: 2450 },
                { name: 'NEON_RIDER', score: 1890 },
                { name: 'SNAKE_MASTER', score: 1520 }
              ].map((entry, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white/40">0{i+1} {entry.name}</span>
                  <span className="text-white/80">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center - Game */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <SnakeGame onScoreChange={handleScoreChange} />
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50" />
        </motion.div>

        {/* Right Side - Music Player */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-400 uppercase tracking-[0.3em] mb-2">
            <MusicIcon size={14} />
            <span>Now Playing</span>
          </div>
          <MusicPlayer />
          
          <div className="mt-4 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl max-w-xs text-center">
            <p className="text-[10px] text-cyan-400/60 leading-relaxed font-medium">
              "The rhythm of the grid is the rhythm of your survival. Keep the beat, keep the lead."
            </p>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full p-4 flex justify-center items-center gap-8 text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold z-20">
        <span>© 2026 NEON_ARCADE</span>
        <div className="w-1 h-1 bg-white/10 rounded-full" />
        <span>SYSTEM_READY</span>
        <div className="w-1 h-1 bg-white/10 rounded-full" />
        <span>ENCRYPTED_CONNECTION</span>
      </footer>
    </div>
  );
}
