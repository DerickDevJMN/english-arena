/**
 * Web Audio API Sound Synthesizer & Speech Synthesis Engine
 * Zero external audio files required — 100% offline & instantaneous.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.musicTimer = null;
    this.musicStep = 0;
    this.isPlayingMusic = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopTimerMusic();
    }
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.isMuted) {
      this.stopTimerMusic();
    }
  }

  // --- Sound Effects ---

  playTone(freq, type = 'sine', duration = 0.2, gainValue = 0.2, delay = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(gainValue, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playClick() {
    this.playTone(800, 'triangle', 0.05, 0.15);
  }

  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playCountdownTick(isFinal = false) {
    if (this.isMuted) return;
    this.playTone(isFinal ? 880 : 440, 'triangle', 0.08, isFinal ? 0.25 : 0.12);
  }

  playStartQuiz() {
    // 3, 2, 1, Go chime
    this.playTone(523.25, 'triangle', 0.15, 0.2, 0.0); // C5
    this.playTone(659.25, 'triangle', 0.15, 0.2, 0.15); // E5
    this.playTone(783.99, 'triangle', 0.15, 0.2, 0.30); // G5
    this.playTone(1046.50, 'sine', 0.45, 0.25, 0.45); // C6
  }

  playCorrect() {
    // Upbeat celebratory Kahoot arpeggio (G4 -> B4 -> D5 -> G5)
    this.playTone(392.00, 'sine', 0.15, 0.2, 0.00);
    this.playTone(493.88, 'sine', 0.15, 0.25, 0.08);
    this.playTone(587.33, 'triangle', 0.18, 0.25, 0.16);
    this.playTone(783.99, 'triangle', 0.40, 0.30, 0.24);
  }

  playWrong() {
    // Descending sad buzzer
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playStreak() {
    // Fire / streak powerup sound
    this.playTone(587.33, 'triangle', 0.1, 0.2, 0.0);
    this.playTone(739.99, 'triangle', 0.1, 0.2, 0.08);
    this.playTone(880.00, 'sine', 0.25, 0.25, 0.16);
  }

  playFanfare() {
    // Podium victory brass-style fanfare
    const notes = [
      { f: 523.25, d: 0.18, del: 0.0 }, // C5
      { f: 523.25, d: 0.18, del: 0.18 }, // C5
      { f: 523.25, d: 0.18, del: 0.36 }, // C5
      { f: 659.25, d: 0.35, del: 0.54 }, // E5
      { f: 587.33, d: 0.20, del: 0.90 }, // D5
      { f: 659.25, d: 0.20, del: 1.10 }, // E5
      { f: 783.99, d: 0.60, del: 1.30 }, // G5
      { f: 1046.50, d: 1.0, del: 1.90 }  // C6
    ];
    notes.forEach(n => {
      this.playTone(n.f, 'triangle', n.d, 0.28, n.del);
    });
  }

  // --- Background Thinking Loop during Question Timer ---
  startTimerMusic(speedMultiplier = 1.0) {
    if (this.isMuted || this.isPlayingMusic) return;
    this.init();
    if (!this.ctx) return;
    this.isPlayingMusic = true;
    this.musicStep = 0;

    const bassNotes = [130.81, 146.83, 164.81, 146.83, 174.61, 164.81, 130.81, 196.00]; // C3 groove
    const tempoInterval = Math.max(220 / speedMultiplier, 120);

    this.musicTimer = setInterval(() => {
      if (!this.isPlayingMusic || this.isMuted) return;
      const note = bassNotes[this.musicStep % bassNotes.length];
      this.playTone(note, 'triangle', 0.1, 0.08);
      if (this.musicStep % 2 === 0) {
        this.playTone(523.25, 'sine', 0.04, 0.03); // light syncopated pulse
      }
      this.musicStep++;
    }, tempoInterval);
  }

  stopTimerMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  // --- Native Text-To-Speech for Pronouncing English Words ---
  speakEnglish(text) {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech Synthesis not supported by this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David')));
    if (enVoice) {
      utterance.voice = enVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

// Global Sound Instance
const soundEngine = new SoundEngine();
