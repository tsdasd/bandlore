// Audio generator functionality
function generateAudioSample(bandName, genre) {
    const audioContainer = document.getElementById('audioSampleContainer');
    audioContainer.style.display = 'block';
    audioContainer.innerHTML = `
        <h3>Audio Sample</h3>
        <div class="audio-player">
            <p>Generated sample for "${bandName}"</p>
            <div class="audio-visualizer" id="audioVisualizer"></div>
            <div class="audio-controls">
                <button id="playButton">▶</button>
                <button id="pauseButton">⏸</button>
                <button id="regenerateAudioButton">🔄</button>
            </div>
        </div>
    `;

    // Create visualizer bars
    const visualizer = document.getElementById('audioVisualizer');
    for (let i = 0; i < 30; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.height = '5px';
        visualizer.appendChild(bar);
    }

    // Set up audio context
    let audioContext;
    let isPlaying = false;
    let oscillators = [];
    let gainNodes = [];
    let intervalId;

    // Generate audio parameters based on band name and genre
    const generateAudioParams = () => {
        // Use band name to seed some randomness
        const seed = bandName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const random = (min, max) => min + ((seed % 100) / 100) * (max - min);
        
        // Base parameters on genre
        let baseFreq, waveform, modFreq, modDepth, tempo;
        
        if (genre.toLowerCase().includes('ambient')) {
            baseFreq = random(220, 440);
            waveform = 'sine';
            modFreq = random(0.1, 0.5);
            modDepth = random(10, 30);
            tempo = random(40, 60);
        } else if (genre.toLowerCase().includes('glitch') || genre.toLowerCase().includes('noise')) {
            baseFreq = random(440, 880);
            waveform = 'sawtooth';
            modFreq = random(1, 8);
            modDepth = random(50, 200);
            tempo = random(80, 160);
        } else if (genre.toLowerCase().includes('drone')) {
            baseFreq = random(110, 220);
            waveform = 'triangle';
            modFreq = random(0.05, 0.2);
            modDepth = random(5, 15);
            tempo = random(30, 50);
        } else {
            // Default/other genres
            baseFreq = random(330, 660);
            waveform = ['sine', 'square', 'triangle', 'sawtooth'][Math.floor(random(0, 4))];
            modFreq = random(0.5, 2);
            modDepth = random(20, 60);
            tempo = random(60, 120);
        }
        
        return { baseFreq, waveform, modFreq, modDepth, tempo };
    };

    // Function to start audio
    const startAudio = () => {
        if (isPlaying) return;
        
        // Initialize audio context if needed
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const params = generateAudioParams();
        
        // Create oscillators for a chord
        const frequencies = [
            params.baseFreq,
            params.baseFreq * 1.25, // Major third
            params.baseFreq * 1.5,  // Perfect fifth
            params.baseFreq * 0.5   // Octave below
        ];
        
        oscillators = [];
        gainNodes = [];
        
        frequencies.forEach(freq => {
            // Create oscillator
            const oscillator = audioContext.createOscillator();
            oscillator.type = params.waveform;
            oscillator.frequency.value = freq;
            
            // Create gain node for volume control
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0.1; // Low volume
            
            // Connect oscillator to gain and gain to output
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Start oscillator
            oscillator.start();
            
            oscillators.push(oscillator);
            gainNodes.push(gainNode);
        });
        
        // Animate visualizer
        const bars = document.querySelectorAll('.visualizer-bar');
        intervalId = setInterval(() => {
            bars.forEach(bar => {
                const height = 5 + Math.random() * 55;
                bar.style.height = `${height}px`;
            });
        }, 100);
        
        isPlaying = true;
    };

    // Function to stop audio
    const stopAudio = () => {
        if (!isPlaying) return;
        
        // Stop oscillators
        oscillators.forEach(osc => {
            osc.stop();
        });
        
        // Clear arrays
        oscillators = [];
        gainNodes = [];
        
        // Stop visualizer animation
        clearInterval(intervalId);
        
        // Reset visualizer bars
        const bars = document.querySelectorAll('.visualizer-bar');
        bars.forEach(bar => {
            bar.style.height = '5px';
        });
        
        isPlaying = false;
    };

    // Add event listeners
    document.getElementById('playButton').addEventListener('click', startAudio);
    document.getElementById('pauseButton').addEventListener('click', stopAudio);
    document.getElementById('regenerateAudioButton').addEventListener('click', () => {
        stopAudio();
        setTimeout(startAudio, 300);
    });
}
