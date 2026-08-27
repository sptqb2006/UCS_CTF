/**
 * Matrix Rain Simulation - Alphanumeric, Katakana & Symbols
 * Crisp characters with real-time glitch/mutation
 */
(function(global) {
  'use strict';

  // Character sets: Digits, Latin Alphabet, Half-width Katakana (classic Matrix), and Tech Symbols
  const DIGITS = '0123456789';
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const SYMBOLS = ':*+-=_/\|<>[]{}!@#$%&?';
  const KATAKANA = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾙﾚﾛﾜﾝ';

  // Combined pool: balanced mix of letters, numbers, and matrix symbols
  const CHAR_POOL = (
    DIGITS + DIGITS +
    ALPHABET + ALPHABET +
    KATAKANA +
    SYMBOLS
  ).split('');

  function getRandomChar() {
    return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
  }

  class MatrixStream {
    constructor(x, height, fontSize, speedFactor = 1.0) {
      this.x = x;
      this.fontSize = fontSize;
      this.speedFactor = speedFactor;
      this.reset(height, true);
    }

    reset(height, initial = false) {
      this.height = height;
      this.length = 10 + Math.floor(Math.random() * 20);
      // Gentle, smooth matrix stream speed (approx 3x slower)
      this.speed = (0.4 + Math.random() * 0.7) * this.speedFactor;
      this.chars = [];
      for (let i = 0; i < this.length; i++) {
        this.chars.push(getRandomChar());
      }
      if (initial) {
        this.y = Math.floor(Math.random() * height * 1.5) - (this.length * this.fontSize);
      } else {
        this.y = - (this.length * this.fontSize) - Math.floor(Math.random() * 100);
      }
    }

    update() {
      this.y += this.speed;

      // Active matrix character mutation / flickering effect
      if (Math.random() < 0.12) {
        const changeCount = 1 + Math.floor(Math.random() * 2);
        for (let k = 0; k < changeCount; k++) {
          const idx = Math.floor(Math.random() * this.length);
          this.chars[idx] = getRandomChar();
        }
      }

      if (this.y - (this.length * this.fontSize) > this.height) {
        this.reset(this.height, false);
      }
    }

    draw(ctx) {
      ctx.font = 'bold ' + this.fontSize + "px 'Share Tech Mono', 'Courier New', monospace";
      for (let i = 0; i < this.length; i++) {
        const charY = this.y - (i * this.fontSize);
        if (charY < 0 || charY > this.height + this.fontSize) continue;

        if (i === 0) {
          // Sharp white leading head
          ctx.fillStyle = '#ffffff';
        } else if (i < 3) {
          // Bright neon green upper trail
          ctx.fillStyle = '#40ff7c';
        } else if (i < 8) {
          // Vibrant matrix green body
          ctx.fillStyle = '#22c55e';
        } else {
          // Crisp fading green tail
          const alpha = Math.max(0.15, (this.length - i) / this.length * 0.75);
          ctx.fillStyle = 'rgba(34, 197, 94, ' + alpha.toFixed(2) + ')';
        }
        ctx.fillText(this.chars[i], this.x, charY);
      }
    }
  }

  class MatrixEngine {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: false });
      this.fontSize = options.font_size || 15;
      this.speedFactor = typeof options.speed_factor === 'number' ? options.speed_factor : 1.0;
      this.fadeAlpha = typeof options.fade_alpha === 'number' ? options.fade_alpha : 0.15;
      this.streams = [];
      this.running = false;
      this.resize();
    }

    resize() {
      this.width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
      this.height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      const colStep = this.fontSize * 1.35;
      const numCols = Math.floor(this.width / colStep);
      this.streams = [];
      for (let i = 0; i < numCols; i++) {
        const x = i * colStep + 8;
        this.streams.push(new MatrixStream(x, this.height, this.fontSize, this.speedFactor));
        if (Math.random() > 0.45) {
          this.streams.push(new MatrixStream(x, this.height, this.fontSize, this.speedFactor));
        }
      }
    }

    start() {
      if (this.running) return;
      this.running = true;
      const loop = () => {
        if (!this.running) return;
        this.render();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    stop() {
      this.running = false;
    }

    render() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, ' + this.fadeAlpha + ')';
      this.ctx.fillRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.streams.length; i++) {
        this.streams[i].update();
        this.streams[i].draw(this.ctx);
      }
    }
  }

  function matrix(canvas, options = {}) {
    const engine = new MatrixEngine(canvas, options);
    window.addEventListener('resize', () => engine.resize());
    engine.start();
    return engine;
  }

  global.matrix = matrix;
})(typeof window !== 'undefined' ? window : this);
