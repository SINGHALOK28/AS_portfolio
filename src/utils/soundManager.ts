"use client";

// Web Audio API Synthesizer for retro 8-bit Minecraft sound effects
// This eliminates the need for binary audio file hosting

let isSoundEnabled = false;

export function toggleSound(state?: boolean): boolean {
  if (state !== undefined) {
    isSoundEnabled = state;
  } else {
    isSoundEnabled = !isSoundEnabled;
  }
  return isSoundEnabled;
}

export function getSoundStatus(): boolean {
  return isSoundEnabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  return AudioCtx ? new AudioCtx() : null;
}

// Synthesize Minecraft Button Click (short wooden tap)
export function playClickSound() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Wooden click: low pitch, fast decay
  osc.type = "triangle";
  osc.frequency.setValueAtTime(140, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.35, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  osc.start();
  osc.stop(ctx.currentTime + 0.09);
}

// Synthesize XP Level Up Chime (series of ascending notes)
export function playXpSound() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const playNote = (freq: number, startDelay: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Chiptune sine beep
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);

    gain.gain.setValueAtTime(0.0, ctx.currentTime + startDelay);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + startDelay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startDelay + duration);

    osc.start(ctx.currentTime + startDelay);
    osc.stop(ctx.currentTime + startDelay + duration);
  };

  // Play ascending pentatonic sequence
  const tempo = 0.08;
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
  
  notes.forEach((freq, index) => {
    playNote(freq, index * tempo, 0.2);
  });
}

// Synthesize Redstone Activation Spark
export function playSparkSound() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

  // Bandpass filter to make it sound crackly/electric
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1000;
  osc.connect(filter);
  filter.connect(gain);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}
