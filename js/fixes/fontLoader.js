/**
 * Font Loader Script for UNDERTALE Text Adventure Game
 * This handles proper font loading with fallbacks
 */

// FontLoader handles loading and fallbacks for game fonts
const FontLoader = {
    // Fonts to load
    fonts: [
        {
            name: 'Determination Mono',
            urls: [
                'fonts/DTM-Mono.otf',
                'fonts/DTM-Mono.ttf', 
                'fonts/DeterminationMonoWeb.woff',
                'fonts/DeterminationMonoWeb.woff2'
            ],
            loaded: false
        },
        {
            name: 'Press Start 2P',
            urls: ['https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'],
            loaded: false
        }
    ],
    
    // Initialize font loading
    init: function() {
        console.log("Font loader initializing...");
        
        // Try to use the Font Loading API if available
        if (document.fonts && document.fonts.ready) {
            this.loadWithFontAPI();
        } else {
            // Fallback to our custom loading approach
            this.loadWithFallback();
        }
        
        // Always set a timeout for fallback
        setTimeout(() => {
            if (!document.body.classList.contains('webfont-loaded')) {
                console.warn("Font loading timed out, using fallbacks");
                document.body.classList.add('webfont-failed');
            }
        }, 3000); // 3 second timeout
    },
    
    // Use the Font Loading API when available
    loadWithFontAPI: function() {
        console.log("Using Font Loading API");
        
        // Create Font Face observers for each font
        const observers = this.fonts.map(font => {
            // Try each font format
            return font.urls.map(url => {
                try {
                    return new FontFace(font.name, `url(${url})`);
                } catch (e) {
                    console.error(`Error creating FontFace for ${font.name}:`, e);
                    return null;
                }
            }).filter(Boolean); // Remove any null entries
        }).flat();
        
        // Load each font
        Promise.all(
            observers.map(fontFace => {
                if (!fontFace) return Promise.resolve();
                
                return fontFace.load()
                    .then(loadedFont => {
                        document.fonts.add(loadedFont);
                        return loadedFont;
                    })
                    .catch(err => {
                        console.warn(`Font failed to load: ${err}`);
                        return null;
                    });
            })
        )
        .then(loadedFonts => {
            const successfulLoads = loadedFonts.filter(Boolean).length;
            if (successfulLoads > 0) {
                console.log(`Successfully loaded ${successfulLoads} fonts`);
                document.body.classList.add('webfont-loaded');
            } else {
                console.warn("No fonts loaded successfully, using fallbacks");
                document.body.classList.add('webfont-failed');
            }
        })
        .catch(err => {
            console.error("Font loading error:", err);
            document.body.classList.add('webfont-failed');
        });
    },
    
    // Fallback method for browsers without Font Loading API
    loadWithFallback: function() {
        console.log("Using fallback font loading method");
        
        // Create a sheet of @font-face rules manually
        let styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        
        // Create CSS for each font
        let fontFaces = this.fonts.map(font => {
            let sources = font.urls.map(url => {
                let format;
                if (url.endsWith('.woff2')) format = 'woff2';
                else if (url.endsWith('.woff')) format = 'woff';
                else if (url.endsWith('.ttf')) format = 'truetype';
                else if (url.endsWith('.otf')) format = 'opentype';
                else if (url.includes('.css')) return `@import url('${url}');`;
                
                if (format) {
                    return `url('${url}') format('${format}')`;
                }
                return `url('${url}')`;
            }).join(',\n         ');
            
            return `@font-face {
    font-family: '${font.name}';
    src: ${sources};
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}`;
        }).join('\n\n');
        
        styleSheet.innerHTML = fontFaces;
        document.head.appendChild(styleSheet);
        
        // Create test elements to check if fonts loaded
        const testElements = this.fonts.map(font => {
            const el = document.createElement('span');
            el.style.fontFamily = `'${font.name}', monospace`;
            el.style.position = 'absolute';
            el.style.visibility = 'hidden';
            el.style.fontSize = '40px';
            el.textContent = 'Font Test';
            document.body.appendChild(el);
            return { font: font, element: el, width: el.offsetWidth, height: el.offsetHeight };
        });
        
        // Check after a short delay if the fonts loaded
        setTimeout(() => {
            let anyLoaded = false;
            
            testElements.forEach(test => {
                const newWidth = test.element.offsetWidth;
                const newHeight = test.element.offsetHeight;
                
                // Different dimensions likely mean the font loaded and was applied
                if (newWidth !== test.width || newHeight !== test.height) {
                    test.font.loaded = true;
                    anyLoaded = true;
                }
                
                document.body.removeChild(test.element);
            });
            
            if (anyLoaded) {
                document.body.classList.add('webfont-loaded');
            } else {
                document.body.classList.add('webfont-failed');
            }
        }, 500);
    }
};

// Initialize font loading when the page loads
document.addEventListener('DOMContentLoaded', function() {
    FontLoader.init();
});

// Export for use in other scripts
window.FontLoader = FontLoader;