// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const bandNameInput = document.getElementById('bandNameInput');
    const outputContainer = document.getElementById('outputContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const controls = document.getElementById('controls');
    const themeToggle = document.getElementById('themeToggle');
    const albumCoverContainer = document.getElementById('albumCoverContainer');
    const audioSampleContainer = document.getElementById('audioSampleContainer');
    const shareOptionsContainer = document.getElementById('shareOptionsContainer');
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    
    // Generate lore functionality
    generateButton.addEventListener('click', generateLore);
    
    // Enter key functionality
    bandNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateButton.click();
        }
    });
    
    function generateLore() {
        const bandName = bandNameInput.value.trim();
        if (!bandName) {
            showToast('Please enter a band name');
            return;
        }
        
        // Reset containers
        outputContainer.innerHTML = '';
        albumCoverContainer.style.display = 'none';
        audioSampleContainer.style.display = 'none';
        shareOptionsContainer.style.display = 'none';
        controls.style.display = 'none';
        
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        
        // Simulate loading time (for effect)
        setTimeout(() => {
            // Generate and display lore
            const lore = generateSurrealBandLore(bandName);
            outputContainer.innerHTML = lore;
            
            // Extract album title for later use
            const albumTitleElement = outputContainer.querySelector('h3:nth-of-type(2)');
            const albumTitle = albumTitleElement ? albumTitleElement.textContent.replace('Latest Album: "', '').replace('"', '') : 'Unknown Album';
            
            // Extract genre for later use
            const genreElement = outputContainer.querySelector('p strong');
            const genre = genreElement ? genreElement.nextSibling.textContent.trim() : 'Unknown Genre';
            
            // Hide loading indicator and show controls
            loadingIndicator.style.display = 'none';
            controls.style.display = 'flex';
            
            // Add event listeners for control buttons
            document.getElementById('saveButton').addEventListener('click', () => saveLoreAsImage(bandName));
            document.getElementById('shareButton').addEventListener('click', () => showShareOptions(bandName));
            document.getElementById('coverButton').addEventListener('click', () => generateAlbumCover(bandName, albumTitle));
            document.getElementById('audioButton').addEventListener('click', () => generateAudioSample(bandName, genre));
            
            // Scroll to results
            outputContainer.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    }
    
    // Save as image functionality
    function saveLoreAsImage(bandName) {
        const element = document.getElementById('bandLoreOutput');
        if (!element) {
            showToast('No lore to save');
            return;
        }
        
        showToast('Preparing image...');
        
        html2canvas(element).then(canvas => {
            const link = document.createElement('a');
            link.download = `${bandName.replace(/\s+/g, '-').toLowerCase()}-lore.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('Image saved!');
        }).catch(err => {
            console.error('Error saving image:', err);
            showToast('Error saving image');
        });
    }
    
    // Share options functionality
    function showShareOptions(bandName) {
        shareOptionsContainer.style.display = 'block';
        shareOptionsContainer.innerHTML = `
            <h3>Share Options</h3>
            <div class="share-buttons">
                <button id="copyButton">Copy to Clipboard</button>
                <button id="twitterButton">Share on Twitter</button>
                <button id="facebookButton">Share on Facebook</button>
            </div>
        `;
        
        // Add event listeners
        document.getElementById('copyButton').addEventListener('click', copyToClipboard);
        document.getElementById('twitterButton').addEventListener('click', () => shareOnTwitter(bandName));
        document.getElementById('facebookButton').addEventListener('click', () => shareOnFacebook(bandName));
        
        // Scroll to share options
        shareOptionsContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    function copyToClipboard() {
        const loreText = document.getElementById('bandLoreOutput').innerText;
        navigator.clipboard.writeText(loreText)
            .then(() => showToast('Lore copied to clipboard!'))
            .catch(err => {
                console.error('Error copying text:', err);
                showToast('Error copying to clipboard');
            });
    }
    
    function shareOnTwitter(bandName) {
        const text = `Check out this surreal lore I generated for my fictional band "${bandName}"!`;
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
    }
    
    function shareOnFacebook(bandName) {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
    
    // Toast notification function
    function showToast(message) {
        // Create toast if it doesn't exist
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        
        // Set message and show
        toast.textContent = message;
        toast.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
