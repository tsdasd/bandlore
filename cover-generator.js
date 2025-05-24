// Album cover generator functionality
function generateAlbumCover(bandName, albumTitle) {
    // Create a canvas for the album cover
    const coverContainer = document.getElementById('albumCoverContainer');
    coverContainer.style.display = 'block';
    coverContainer.innerHTML = `
        <h3>Album Cover</h3>
        <div class="album-cover" id="albumCoverCanvas">
            <div class="album-cover-band">${bandName}</div>
            <div class="album-cover-title">${albumTitle}</div>
        </div>
        <p>Right-click or long-press on the image to save it.</p>
        <button id="regenerateCoverButton">Regenerate Cover</button>
    `;

    // Get the canvas element
    const canvas = document.getElementById('albumCoverCanvas');
    
    // Generate a random color palette
    const colorPalettes = [
        ['#ff6b6b', '#4ecdc4', '#1a535c', '#ffe66d'], // Vibrant
        ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c'], // Cool
        ['#540d6e', '#ee4266', '#ffd23f', '#3bceac'], // Psychedelic
        ['#0b132b', '#1c2541', '#3a506b', '#5bc0be'], // Deep blue
        ['#2d3142', '#4f5d75', '#bfc0c0', '#ffffff'], // Monochrome
        ['#2d00f7', '#6a00f4', '#8900f2', '#a100f2'], // Purple
        ['#233d4d', '#fe7f2d', '#fcca46', '#a1c181'], // Earthy
        ['#390099', '#9e0059', '#ff0054', '#ff5400'], // Neon
        ['#0d3b66', '#faf0ca', '#f4d35e', '#ee964b'], // Vintage
        ['#22577a', '#38a3a5', '#57cc99', '#80ed99'], // Teal
    ];
    
    const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    
    // Generate a random background pattern
    const patterns = [
        generateRadialPattern,
        generateStripePattern,
        generateGridPattern,
        generateSwirlPattern,
        generateNoisePattern,
        generateCirclePattern,
        generateTrianglePattern
    ];
    
    const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    // Apply the pattern
    selectedPattern(canvas, palette);
    
    // Add regenerate button functionality
    document.getElementById('regenerateCoverButton').addEventListener('click', function() {
        const newPattern = patterns[Math.floor(Math.random() * patterns.length)];
        const newPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        newPattern(canvas, newPalette);
    });
}

// Pattern generation functions
function generateRadialPattern(element, palette) {
    element.style.background = `radial-gradient(circle, ${palette[0]} 0%, ${palette[1]} 50%, ${palette[2]} 100%)`;
    addRandomShapes(element, palette, 20);
}

function generateStripePattern(element, palette) {
    const angle = Math.floor(Math.random() * 180);
    element.style.background = `linear-gradient(${angle}deg, ${palette[0]} 0%, ${palette[1]} 25%, ${palette[2]} 50%, ${palette[3]} 75%, ${palette[0]} 100%)`;
    addRandomShapes(element, palette, 15);
}

function generateGridPattern(element, palette) {
    const size = 20 + Math.floor(Math.random() * 30);
    element.style.background = `${palette[0]}`;
    element.style.backgroundImage = `
        linear-gradient(${palette[1]} 1px, transparent 1px),
        linear-gradient(90deg, ${palette[1]} 1px, transparent 1px)
    `;
    element.style.backgroundSize = `${size}px ${size}px`;
    addRandomShapes(element, palette, 10);
}

function generateSwirlPattern(element, palette) {
    const baseColor = palette[0];
    element.style.background = baseColor;
    
    // Create a series of concentric circles with conic gradients
    for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%) rotate(' + (i * 30) + 'deg)';
        div.style.width = (80 - i * 15) + '%';
        div.style.height = (80 - i * 15) + '%';
        div.style.borderRadius = '50%';
        div.style.background = `conic-gradient(${palette[i % palette.length]}, ${palette[(i+1) % palette.length]}, ${palette[i % palette.length]})`;
        div.style.opacity = 0.7;
        element.appendChild(div);
    }
    
    addRandomShapes(element, palette, 5);
}

function generateNoisePattern(element, palette) {
    // Base color
    element.style.background = palette[0];
    
    // Add noise effect with small divs
    for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.width = '2px';
        div.style.height = '2px';
        div.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];
        div.style.top = Math.random() * 100 + '%';
        div.style.left = Math.random() * 100 + '%';
        div.style.opacity = 0.5 + Math.random() * 0.5;
        element.appendChild(div);
    }
    
    addRandomShapes(element, palette, 8);
}

function generateCirclePattern(element, palette) {
    element.style.background = palette[0];
    
    // Add random circles
    for (let i = 0; i < 20; i++) {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        const size = 10 + Math.random() * 40;
        div.style.width = size + '%';
        div.style.height = size + '%';
        div.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];
        div.style.borderRadius = '50%';
        div.style.top = Math.random() * 100 + '%';
        div.style.left = Math.random() * 100 + '%';
        div.style.opacity = 0.3 + Math.random() * 0.4;
        div.style.mixBlendMode = ['multiply', 'screen', 'overlay'][Math.floor(Math.random() * 3)];
        element.appendChild(div);
    }
}

function generateTrianglePattern(element, palette) {
    element.style.background = palette[0];
    
    // Add random triangles using clip-path
    for (let i = 0; i < 15; i++) {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.width = '30%';
        div.style.height = '30%';
        div.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];
        
        // Generate random triangle points
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = Math.random() * 100;
        const y2 = Math.random() * 100;
        const x3 = Math.random() * 100;
        const y3 = Math.random() * 100;
        
        div.style.clipPath = `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%)`;
        div.style.top = Math.random() * 70 + '%';
        div.style.left = Math.random() * 70 + '%';
        div.style.opacity = 0.4 + Math.random() * 0.6;
        div.style.mixBlendMode = ['multiply', 'screen', 'overlay'][Math.floor(Math.random() * 3)];
        div.style.transform = `rotate(${Math.random() * 360}deg)`;
        element.appendChild(div);
    }
}

// Helper function to add random shapes to any pattern
function addRandomShapes(element, palette, count) {
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        const size = 5 + Math.random() * 20;
        div.style.width = size + '%';
        div.style.height = size + '%';
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (shape === 'circle') {
            div.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            div.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        }
        
        div.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];
        div.style.top = Math.random() * 80 + 10 + '%';
        div.style.left = Math.random() * 80 + 10 + '%';
        div.style.opacity = 0.2 + Math.random() * 0.6;
        div.style.mixBlendMode = ['normal', 'multiply', 'screen', 'overlay'][Math.floor(Math.random() * 4)];
        div.style.transform = `rotate(${Math.random() * 360}deg)`;
        div.style.zIndex = '1';
        element.appendChild(div);
    }
}
