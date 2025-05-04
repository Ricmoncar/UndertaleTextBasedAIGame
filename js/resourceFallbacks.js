/**
 * UNDERTALE Text Adventure Game - Resource Fallbacks
 * This file adds fallbacks for missing resources and error handling
 */

// Add this to a new file: js/resourceFallbacks.js

// Resource fallback handling
const ResourceFallbacks = {
    // Font fallback
    setupFontFallback: function() {
        // Create a style element
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Determination Mono Fallback';
                src: local('Courier New'), local('Courier'), local('monospace');
                font-weight: normal;
                font-style: normal;
            }
            
            body.font-fallback {
                font-family: 'Determination Mono Fallback', 'Courier New', monospace !important;
            }
        `;
        document.head.appendChild(style);
        
        // Check if font fails to load
        document.fonts.ready.then(() => {
            const fontFaceSet = document.fonts;
            const fontCheck = new FontFace('Determination Mono', 'url("fonts/DeterminationMonoWeb.woff2")');
            
            fontCheck.load().catch(error => {
                console.warn('Determination Mono font failed to load. Using fallback font.');
                document.body.classList.add('font-fallback');
            });
        }).catch(error => {
            console.warn('Font loading check failed. Using fallback font.');
            document.body.classList.add('font-fallback');
        });
    },
    
    // Sound fallback
    createDummySound: function() {
        // Create a basic oscillator to generate a "bloop" sound if the sound file is missing
        return {
            play: function() {
                try {
                    // Try to create audio context
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    if (!AudioContext) return Promise.resolve();
                    
                    const audioCtx = new AudioContext();
                    const oscillator = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    
                    // Set up sound
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
                    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
                    
                    // Connect nodes
                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    
                    // Play sound
                    oscillator.start();
                    oscillator.stop(audioCtx.currentTime + 0.1);
                    
                    return Promise.resolve();
                } catch (error) {
                    console.warn('Error creating fallback sound:', error);
                    return Promise.resolve();
                }
            },
            cloneNode: function() {
                return this;
            }
        };
    },
    
    // Image fallback
    createImageFallback: function() {
        // Add a default placeholder for missing images
        const style = document.createElement('style');
        style.textContent = `
            .image-fallback {
                background-color: #333 !important;
                position: relative;
                overflow: hidden;
            }
            
            .image-fallback::after {
                content: "Image Not Found";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #aaa;
                font-size: 16px;
                text-align: center;
                width: 100%;
            }
        `;
        document.head.appendChild(style);
        
        // Add error handling to all images
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            const images = node.querySelectorAll('img');
                            images.forEach(img => this.setupImageErrorHandler(img));
                            
                            // Also check elements with background images
                            const elementsWithBg = node.querySelectorAll('[style*="background-image"]');
                            elementsWithBg.forEach(el => this.setupBackgroundImageFallback(el));
                        }
                    });
                }
            });
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },
    
    // Set up error handler for an image
    setupImageErrorHandler: function(img) {
        img.addEventListener('error', () => {
            img.classList.add('image-fallback');
            console.warn(`Image failed to load: ${img.src}`);
        });
    },
    
    // Set up fallback for background images
    setupBackgroundImageFallback: function(element) {
        const url = getComputedStyle(element).backgroundImage;
        if (url && url !== 'none') {
            // Extract the URL
            const match = url.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (match && match[1]) {
                const imgUrl = match[1];
                
                // Create an image to test loading
                const testImg = new Image();
                testImg.onerror = () => {
                    element.classList.add('image-fallback');
                    console.warn(`Background image failed to load: ${imgUrl}`);
                };
                testImg.src = imgUrl;
            }
        }
    },
    

    
    // Initialize all fallbacks
    init: function() {
        this.setupFontFallback();
        this.createImageFallback();
        
        // Add a global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error caught:', event.error);
            
            // Only show a message for script errors, not for resource loading
            if (event.error && !event.filename.includes('.css') && !event.filename.includes('.png') && 
                !event.filename.includes('.jpg') && !event.filename.includes('.mp3') && 
                !event.filename.includes('.mp4') && !event.filename.includes('.woff')) {
                
                // Show error in game text if available
                const gameText = document.getElementById('game-text');
                if (gameText) {
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    errorElement.innerHTML = 'An error occurred. Check the console for details.';
                    errorElement.style.color = '#ff0000';
                    gameText.appendChild(errorElement);
                    gameText.scrollTop = gameText.scrollHeight;
                }
            }
        });
    }
};



// Initialize fallbacks when the page is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    ResourceFallbacks.init();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        ResourceFallbacks.init();
    });
}

// Make ResourceFallbacks available globally
window.ResourceFallbacks = ResourceFallbacks;