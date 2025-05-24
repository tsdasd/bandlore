// Main lore generator functionality
function generateSurrealBandLore(bandName) {
    // Helper function to pick random element from array
    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Helper function to pick multiple unique elements
    function pickMultiple(arr, count) {
        const result = [];
        const tempArray = [...arr];
        
        count = Math.min(count, tempArray.length);
        
        for (let i = 0; i < count; i++) {
            const index = Math.floor(Math.random() * tempArray.length);
            result.push(tempArray[index]);
            tempArray.splice(index, 1);
        }
        
        return result;
    }

    // Helper function to capitalize first letter
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // --- EXPANDED Data Arrays for Random Generation ---
    
    // Surreal descriptors
    const surrealAdjectives = [
        "dream-woven", "echo-static", "chrono-synclastic", "void-touched", "whisper-spun", 
        "fractal-edged", "nebula-kissed", "somna-phonic", "psyche-nautic", "ether-drift", 
        "liminal-hued", "absurd-angled", "paradox-stitched", "oneiric", "hypnagogic",
        "quantum-folded", "time-slipped", "reality-adjacent", "memory-dissolved", "thought-braided",
        "dimension-skewed", "consciousness-rippled", "perception-bent", "existence-warped", "infinity-looped",
        "parallel-shifted", "cosmic-dusted", "star-drunk", "gravity-defiant", "entropy-reversed",
        "logic-resistant", "probability-stretched", "causality-unbound", "perspective-shattered", "symmetry-allergic"
    ];
    
    const surrealNouns = [
        "algorithms", "geometries", "silences", "paradoxes", "horizons", "mirages", "symphonies", 
        "rituals", "landscapes", "frequencies", "phantasms", "non-sequiturs", "chimeras", "reveries", "abysses",
        "labyrinths", "echoes", "whispers", "fractals", "dimensions", "thresholds", "spirals", "tessellations",
        "conundrums", "enigmas", "illusions", "apparitions", "phenomena", "abstractions", "manifestations",
        "transmutations", "oscillations", "resonances", "vibrations", "permutations", "reflections", "distortions",
        "anomalies", "synchronicities", "impossibilities", "contradictions", "infinities", "eternities", "ephemera"
    ];
    
    // Genre components
    const genrePrefixes = [
        "Hypno-", "Nocto-", "Chrono-", "Astro-", "Somna-", "Psyche-", "Echo-", "Surrealo-", 
        "Phanto-", "Dream-", "Absurdo-", "Oneiro-", "Limino-", "Quantum-", "Cosmo-", "Neuro-",
        "Retro-", "Spectro-", "Ethero-", "Mytho-", "Crypto-", "Hyper-", "Meta-", "Pseudo-",
        "Trans-", "Neo-", "Post-", "Anti-", "Omni-", "Poly-", "Multi-", "Inter-", "Intra-",
        "Micro-", "Macro-", "Tele-", "Para-", "Proto-", "Quasi-", "Semi-", "Demi-", "Hemi-"
    ];
    
    const genreSuffixes = [
        "gaze", "wave", "drone", "folk", "pop", "rock", "jazz", "ambient", "core", "glitch", 
        "scape", "funk", "punk", "mambo", "tronica", "step", "hop", "synth", "beat", "phony",
        "fusion", "groove", "rhythm", "noise", "tone", "sound", "vibe", "pulse", "loop", "flow",
        "drift", "wash", "haze", "blur", "static", "fuzz", "crunch", "bounce", "swing", "slide",
        "twist", "turn", "bend", "warp", "shift", "morph", "phase", "flux", "dream", "trance"
    ];
    
    // Bio components
    const bioOpenings = [
        "Emerging from the liminal spaces between wakefulness and REM sleep...",
        "Forged in the crucible of a shared, nonsensical lucid dream...",
        "Legend says they manifested from a glitch in the fabric of reality, possibly near a Tuesday...",
        "Once a collective of sentient thought-forms with a penchant for the bizarre, they decided to make music to confuse philosophers...",
        "Born from the echo of a forgotten nursery rhyme sung backwards by a time-traveling parrot...",
        "They are the universe's way of telling a very strange, slightly off-key joke...",
        "Discovered in an abandoned recording studio where all the instruments played themselves...",
        "Formed when a lightning bolt struck a library containing exclusively surrealist literature...",
        "Rumored to be the musical embodiment of that feeling you get when you forget why you walked into a room...",
        "Conceived during a 72-hour meditation session atop a mountain that doesn't exist on any map...",
        "Assembled by a rogue AI that was programmed exclusively with dadaist poetry and whale songs...",
        "Materialized from the collective unconscious during a particularly vivid solar eclipse...",
        "Emerged fully-formed from a mysterious fog that descended upon a karaoke bar at exactly 3:33 AM...",
        "Founded by former members of the dream you had last Tuesday but can't quite remember...",
        "Originated as the house band for a secret society dedicated to the worship of misplaced socks..."
    ];
    
    const bioMiddles = [
        "their music charts the unmappable, often illogical, territories of the collective subconscious and forgotten grocery lists.",
        "they channel the chaotic beauty of collapsing realities and the existential angst of a particularly self-aware garden gnome.",
        "each performance is a ritual to summon forgotten echoes, mildly confused spirits, and occasionally, a really good sandwich.",
        "their sound is a tapestry woven from starlight, paradox, the faint smell of ozone, and the purring of invisible cats.",
        "they explore themes of existential dread with surprisingly upbeat tempos and kazoo solos.",
        "their lyrics are algorithmically generated from fortune cookie messages, existential philosophy texts, and the shipping forecast.",
        "their compositions defy conventional music theory, operating instead on principles derived from quantum mechanics and children's board games.",
        "their melodies seem to exist in multiple dimensions simultaneously, often causing listeners to temporarily forget their middle names.",
        "their rhythms follow patterns based on the migration habits of extinct birds and the ripple patterns of raindrops in puddles.",
        "their harmonies are said to temporarily realign the listener's chakras into shapes that shouldn't be geometrically possible.",
        "their arrangements incorporate sounds that can only be heard by people who have recently eaten cheese before bedtime.",
        "their production techniques involve recording instruments that haven't been invented yet, borrowed from parallel timelines.",
        "their songs contain subliminal messages that cause listeners to develop temporary synesthesia and a craving for obscure fruits.",
        "their musical structure follows the architectural principles of buildings that could never actually stand in our reality.",
        "their audio frequencies are calibrated to resonate with the fundamental vibration of questions that have no answers."
    ];
    
    const bioEndings = [
        "Prepare for an auditory journey that will leave you questioning the nature of Tuesdays and the structural integrity of your socks.",
        "Listeners often report experiencing temporal distortions, a sudden craving for marmalade, and the ability to communicate with squirrels (results may vary).",
        "They are rumored to only exist when you're not looking directly at them, or possibly on alternate Thursdays when the moon is gibbous.",
        "Their instruments are said to be made of solidified moonlight, discarded anxieties, and the hopes and dreams of lost luggage.",
        "Attending a concert is like stepping into a live-action Dadaist painting, if the painting was also a bouncy castle.",
        "They communicate exclusively through interpretive dance during interviews, often involving complex hat maneuvers.",
        "Critics have described their work as 'the musical equivalent of finding an extra step at the bottom of the stairs in the dark.'",
        "Fans claim that playing their albums backwards reveals recipes for impossible desserts and directions to places that only exist on leap years.",
        "The band refuses to confirm or deny that they are actually a collective hallucination shared by thousands of unrelated people.",
        "Their rider specifically requests a room temperature glass of water that has been whispered to by someone named Gerald (or reasonable facsimile thereof).",
        "The band's official biography is 400 pages long, written entirely in iambic pentameter, and changes content every time it's opened.",
        "Their merchandise includes t-shirts that change color based on the wearer's most recent dream and mugs that make any liquid taste slightly confused.",
        "The band's logo appears to be different for each person who looks at it, yet everyone agrees it perfectly represents their sound.",
        "Their music videos are filmed in locations that cartographers insist don't exist, using cameras that haven't been invented yet.",
        "The band's official website can only be accessed during certain phases of the moon and requires visitors to solve riddles posed by a digital sphinx."
    ];
    
    // Album title components
    const albumTitleParts1 = [
        "Chronicles of the", "Whispers from the", "Echoes in the", "Songs of the", "Tales from the", 
        "The Accidental", "Diary of a", "Meditations on a", "Transmissions from the", "Memories of a",
        "Fragments of the", "Reflections on the", "Journeys through the", "Secrets of the", "Visions of the",
        "The Unexpected", "Confessions of a", "Blueprints for a", "Artifacts from the", "Remnants of the"
    ];
    
    const albumTitleParts2 = [
        "Shifting", "Forgotten", "Lucid", "Cosmic", "Silent", "Invisible", "Perpetually Confused", 
        "Slightly Damp", "Existentially Anxious", "Quantum", "Impossible", "Subterranean", "Nocturnal", 
        "Crystalline", "Ephemeral", "Recursive", "Paradoxical", "Hypnagogic", "Surreal", "Ethereal"
    ];
    
    const albumTitleParts3 = [
        "Labyrinth", "Ocean", "Garden", "Void", "City", "Nebula", "Sock Drawer", "Teapot", 
        "Philosopher", "Wombat", "Quasar", "Hyperspace Bypass", "Enigma", "Paradigm", "Chimera", 
        "Algorithm", "Consciousness", "Dimension", "Dreamscape", "Threshold", "Paradox", "Reverie"
    ];
    
    // Track name components
    const trackNameVerbs = [
        "Floating", "Dancing", "Whispering", "Falling", "Searching", "Melting", "Dreaming", 
        "Echoing", "Shifting", "Glitching", "Wandering", "Questioning", "Unraveling", "Somersaulting", 
        "Dissolving", "Vibrating", "Manifesting", "Iterating", "Recursing", "Phasing", "Transcending",
        "Oscillating", "Resonating", "Transmuting", "Percolating", "Undulating", "Shimmering", "Cascading"
    ];
    
    const trackNameNouns = [
        "Moons", "Stars", "Shadows", "Rivers", "Keys", "Doors", "Mirrors", "Clocks", "Clouds", 
        "Crystals", "Hats", "Spoons", "Butterflies", "Ladders", "Zephyrs", "Enigmas", "Spirals", 
        "Codes", "Specters", "Artifacts", "Glyphs", "Memories", "Echoes", "Whispers", "Fractals",
        "Paradoxes", "Algorithms", "Frequencies", "Dimensions", "Thresholds", "Labyrinths", "Nebulae"
    ];
    
    const trackNameAdjectives = [
        "Silent", "Invisible", "Forgotten", "Eternal", "Crimson", "Azure", "Golden", "Obsidian", 
        "Velvet", "Impossible", "Paradoxical", "Sleepwalking", "Ephemeral", "Luminous", "Recursive", 
        "Fractal", "Holographic", "Sentient", "Nomadic", "Whispered", "Crystalline", "Quantum",
        "Hypnagogic", "Ethereal", "Liminal", "Surreal", "Nebulous", "Iridescent", "Prismatic"
    ];
    
    // Tour venue components
    const tourVenuePrefixes = [
        "The ", "Club ", "Palace of ", "Temple of ", "Caverns of ", "Gardens of the ", "The Inverted ", 
        "The Submerged ", "The Floating ", "Nexus of ", "Sanctum of the ", "The Recursive ", "The Ethereal ",
        "The Paradoxical ", "The Quantum ", "The Hypnagogic ", "The Surreal ", "The Liminal ", "The Ephemeral "
    ];
    
    const tourVenueNames = [
        "Shifting Sands", "Impossible Angles", "Forgotten Echoes", "Lucid Dreams",
        "Chromatic Mists", "Whispering Statues", "Infinite Reflections", "Temporal Anomalies",
        "The Clockwork Orange (no, not that one, a friendlier one)", "The Schrödinger's Cat Café (now serving uncertainty)", 
        "The Escherian Stairwell Lounge & Bar", "The Quantum Leap Bar & Grill (next jump: unknown)", 
        "The Seventh House of the Unseen", "The Murmuring Grotto", "Zero-G Ballroom", "Hyperspace Cantina", 
        "The Algorithmic Theatre", "The Oracle's Headset", "The Glitched Spire", "The Recursive Loop",
        "The Paradox Parlor", "The Nebulous Nexus", "The Ethereal Echo Chamber", "The Surreal Symposium"
    ];
    
    const tourCitySuffixes = [
        "-ville", "-burg", "-opolis", "-grad", "-dansk", "-shire", " Prime", " Station", " Junction", 
        " Folly", " (Lower Astral Plane)", " (Pocket Dimension)", " Heights", " Hollow", " Terminus", 
        " Expanse", " Crossing", " Spire", " Nexus", " Vortex", " Paradox", " Anomaly", " Convergence"
    ];
    
    // DALL-E prompt components
    const dalleStylePrefixes = [
        "A surreal album cover for a band called",
        "Dreamlike artwork for the album",
        "Absurdist imagery depicting the essence of the album",
        "An ethereal and bizarre visual representation for",
        "A psychedelic album cover design for",
        "A reality-bending illustration for the band",
        "A dimension-warping visual concept for"
    ];
    
    const dalleArtStyles = [
        "digital painting", "photorealistic with a surreal twist", "3D render with impossible physics",
        "oil painting in the style of Salvador Dalí or René Magritte", "glitch art aesthetic",
        "vintage sci-fi poster art", "impressionistic dreamscape", "surrealist collage with mixed media",
        "symbolist painting", "dark fantasy illustration", "art nouveau with cosmic elements", 
        "a child's crayon drawing of a nightmare", "biopunk illustration", "cyber-noir aesthetic", 
        "steampunk blueprint", "vaporwave aesthetic", "retrofuturistic illustration", 
        "psychedelic poster art from the 1960s", "abstract expressionism with digital elements"
    ];
    
    const dalleColorPalettes = [
        "with a palette of deep blues, purples, and shimmering silvers",
        "in vibrant, clashing neon colors that hum with energy", 
        "using muted, desaturated earth tones with a single pop of bizarre, unnatural color",
        "in monochrome with a single, unsettling accent color (e.g., sickly green, blood orange, electric magenta)",
        "with iridescent and pearlescent hues that shift and change with the light",
        "a duotone scheme of black and an ethereal pastel, like mint or lavender",
        "a chaotic explosion of every color imaginable, yet somehow harmonious", 
        "sepia tones with cracks and faded edges", "thermal imaging color scheme",
        "in colors that shouldn't exist but somehow do", "with colors that appear to vibrate against each other",
        "using a palette derived from deep sea creatures and bioluminescent organisms"
    ];
    
    const dalleImagery = [
        "featuring impossible geometry, Escher-like structures, and gravity-defying objects",
        "with floating islands, celestial bodies, melting landscapes, and eyes where they shouldn't be",
        "depicting a vivid dreamscape with distorted figures, melting clocks, symbolic animals, and doors to nowhere",
        "showcasing abstract forms and biomechanical creatures in a cosmic, otherworldly void filled with nebulae",
        "with bioluminescent flora and fauna in a shadowy, mysterious forest under a double moon",
        "characters with animal heads, objects morphing into other objects, and portals to bizarre, candy-colored dimensions",
        "a landscape made of books, with rivers of ink and mountains of forgotten words", 
        "clockwork organisms in a crystal cave", "a city built on the back of a giant, sleeping beast",
        "musical instruments that have evolved into sentient creatures", 
        "everyday objects distorted and reimagined as cosmic entities",
        "architectural impossibilities that fold in on themselves like a möbius strip"
    ];

    // --- Generate Lore Elements ---

    // Generate Genre (occasionally compound genre)
    let genre;
    if (Math.random() > 0.7) {
        genre = `${pick(genrePrefixes)}${pick(genreSuffixes)}-${pick(genrePrefixes).toLowerCase()}${pick(genreSuffixes)}`;
    } else {
        genre = `${pick(genrePrefixes)}${pick(genreSuffixes)}`;
    }

    // Generate Bio (with more complex structure)
    const bioOpening = pick(bioOpenings);
    const bioMiddle = pick(bioMiddles);
    const bioEnding = pick(bioEndings);
    
    // Occasionally add an extra middle section for more complexity
    const bio = Math.random() > 0.7 
        ? `${bioOpening} ${bandName}, ${bioMiddle} ${pick(bioMiddles)} ${bioEnding}`
        : `${bioOpening} ${bandName}, ${bioMiddle} ${bioEnding}`;

    // Generate Album Title (with occasional subtitle)
    let albumTitle = `${pick(albumTitleParts1)} ${pick(albumTitleParts2)} ${pick(albumTitleParts3)}`;
    if (Math.random() > 0.7) {
        albumTitle += `: ${pick(albumTitleParts2)} ${pick(albumTitleParts3)}`;
    }

    // Generate Track Names (5-8 tracks)
    let tracks = [];
    const numTracks = 5 + Math.floor(Math.random() * 4); // 5-8 tracks

    for (let i = 0; i < numTracks; i++) {
        // Different track name patterns for variety
        let trackName;
        const pattern = Math.floor(Math.random() * 5);
        
        switch (pattern) {
            case 0:
                trackName = `${pick(trackNameAdjectives)} ${pick(trackNameNouns)} ${pick(trackNameVerbs)}`;
                break;
            case 1:
                trackName = `${pick(trackNameVerbs)} ${pick(trackNameAdjectives)} ${pick(trackNameNouns)}`;
                break;
            case 2:
                trackName = `The ${pick(trackNameAdjectives)} ${pick(trackNameNouns)}`;
                break;
            case 3:
                // Two-word title
                trackName = `${pick(trackNameAdjectives)} ${pick(trackNameNouns)}`;
                break;
            case 4:
                // Longer, more complex title
                trackName = `${pick(trackNameVerbs)} ${pick(trackNameAdjectives)} ${pick(trackNameNouns)} in the ${pick(albumTitleParts2)} ${pick(albumTitleParts3)}`;
                break;
        }
        
        // Changed to use <li> elements for proper list formatting
        tracks.push(`<li>${trackName}</li>`);
    }

    // Generate Tour Schedule (3-6 dates)
    let tourSchedule = [];
    const numTourDates = 3 + Math.floor(Math.random() * 4); // 3-6 dates
    
    for (let i = 0; i < numTourDates; i++) {
        // More varied city name generation
        let city;
        const cityPattern = Math.floor(Math.random() * 3);
        
        switch (cityPattern) {
            case 0:
                // Standard pattern
                const cityPart1 = capitalize(pick(surrealAdjectives).split('-')[0]);
                city = `${cityPart1}${pick(tourCitySuffixes)}`;
                break;
            case 1:
                // Compound name
                city = `${capitalize(pick(surrealNouns))} ${capitalize(pick(surrealNouns))}${pick(tourCitySuffixes)}`;
                break;
            case 2:
                // More exotic name
                city = `${capitalize(pick(trackNameAdjectives))} ${capitalize(pick(trackNameNouns))}`;
                break;
        }
        
        // Generate venue with occasional special description
        let venue = `${pick(tourVenuePrefixes)}${pick(tourVenueNames)}`;
        if (Math.random() > 0.7) {
            venue += ` (${pick(["infamous for", "known for", "celebrated for", "notorious for"])} ${pick(["its", "their"])} ${pick(surrealAdjectives)} ${pick(surrealNouns)})`;
        }
        
        // Add random date
        const month = pick(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
        const day = Math.floor(Math.random() * 28) + 1;
        
        tourSchedule.push(`<li>${month} ${day}: ${city} - ${venue}</li>`);
    }

    // Generate DALL-E Prompt with more variety
    const dallePrompt = `${pick(dalleStylePrefixes)} '${bandName}', album titled '${albumTitle}'. Style: ${pick(dalleArtStyles)}, ${pick(dalleColorPalettes)}, ${pick(dalleImagery)}.`;

    // Generate band members (2-5)
    const numMembers = 2 + Math.floor(Math.random() * 4);
    const roles = [
        "vocals", "guitar", "bass", "drums", "keyboards", "synthesizers", "theremin", 
        "found objects", "modified appliances", "quantum oscillator", "temporal disruptor", 
        "reality warper", "dream catcher", "thought projector", "consciousness modulator",
        "dimensional portal", "probability manipulator", "paradox resolver", "enigma machine",
        "mnemonic device", "psychic amplifier", "astral projector", "ethereal resonator"
    ];
    
    const nameFirsts = [
        "Echo", "Nebula", "Quantum", "Void", "Cipher", "Enigma", "Paradox", "Zenith", "Nadir",
        "Liminal", "Ephemeral", "Eternal", "Flux", "Helix", "Spiral", "Vector", "Vertex", "Nexus",
        "Quasar", "Pulsar", "Nova", "Aether", "Ether", "Nether", "Hyper", "Meta", "Para", "Proto",
        "Pseudo", "Quasi", "Semi", "Demi", "Hemi", "Omni", "Poly", "Multi", "Inter", "Intra", "Ultra"
    ];
    
    const nameLasts = [
        "Void", "Null", "Zero", "Infinity", "Eternity", "Moment", "Instant", "Continuum", "Spectrum",
        "Wavelength", "Frequency", "Amplitude", "Resonance", "Dissonance", "Harmony", "Melody", "Rhythm",
        "Pulse", "Beat", "Oscillation", "Vibration", "Fluctuation", "Undulation", "Modulation", "Phase",
        "Shift", "Drift", "Flow", "Flux", "Current", "Stream", "River", "Ocean", "Sea", "Lake", "Pond"
    ];
    
    let bandMembers = [];
    const usedRoles = [];
    const usedNames = [];
    
    for (let i = 0; i < numMembers; i++) {
        // Generate unique role
        let role;
        do {
            role = pick(roles);
        } while (usedRoles.includes(role));
        usedRoles.push(role);
        
        // Generate unique name
        let name;
        do {
            if (Math.random() > 0.3) {
                name = `${pick(nameFirsts)} ${pick(nameLasts)}`;
            } else {
                // Sometimes just a single name
                name = pick([...nameFirsts, ...nameLasts]);
            }
        } while (usedNames.includes(name));
        usedNames.push(name);
        
        // Add occasional quirk
        const quirks = [
            "who only performs while sleepwalking",
            "who claims to channel music from parallel dimensions",
            "who insists they're actually a time traveler from the year 2247",
            "who communicates exclusively through musical notes",
            "who is rumored to be a sentient AI in a human disguise",
            "whose instrument was allegedly crafted from a meteorite",
            "who can only play music during specific lunar phases",
            "who performs with a collection of invisible backup dancers",
            "who insists their contribution to the band is 'chronological stability'",
            "who joined the band after a shared hallucination at a bus stop"
        ];
        
        let memberDescription = `<li>${name} - ${role}`;
        if (Math.random() > 0.7) {
            memberDescription += ` (${pick(quirks)})`;
        }
        memberDescription += `</li>`;
        
        bandMembers.push(memberDescription);
    }

    // Generate band facts
    const factStarters = [
        "The band once performed a concert where",
        "It's rumored that",
        "According to unreliable sources,",
        "Fans claim that",
        "Critics have noted that",
        "In an interview that may or may not have happened,",
        "Their producer insists that",
        "Their manager once admitted that",
        "Their record label doesn't know that",
        "The band's unofficial biography states that"
    ];
    
    const factContent = [
        "they recorded their entire album backwards and then reversed it to achieve their signature sound.",
        "their music causes plants to grow in impossible geometric patterns.",
        "they only write songs while collectively experiencing the same dream.",
        "their instruments are actually sentient and compose most of the music themselves.",
        "they've never actually met in person, despite touring together for years.",
        "their lyrics contain hidden messages that predict minor, inconsequential future events.",
        "they once held a concert where no music was played, yet everyone heard something different.",
        "their album was recorded in a studio that exists in a temporal anomaly where it's always 3:47 PM.",
        "they require exactly 17 unmatched socks to be placed around the stage before they can perform.",
        "they compose music based on the migration patterns of extinct birds.",
        "they can only be photographed using cameras manufactured before 1973 for reasons they refuse to explain.",
        "their music sounds completely different when listened to underwater or while standing on one foot.",
        "they communicate with each other telepathically but only about sandwich preferences.",
        "they've been the same age for the past 15 years and attribute it to 'chronological ambiguity'.",
        "they claim to have invented a new color that can only be perceived while listening to their third album."
    ];
    
    let bandFacts = [];
    const numFacts = 2 + Math.floor(Math.random() * 2); // 2-3 facts
    
    for (let i = 0; i < numFacts; i++) {
        bandFacts.push(`<li>${pick(factStarters)} ${pick(factContent)}</li>`);
    }

    // Format Output for HTML with enhanced content
    return `
        <div id="bandLoreOutput">
            <h2>${bandName}</h2>
            <p><strong>Genre:</strong> ${genre}</p>
            
            <h3>Biography</h3>
            <p>${bio}</p>
            
            <h3>Band Members</h3>
            <ul>
                ${bandMembers.join('')}
            </ul>
            
            <h3>Latest Album: "${albumTitle}"</h3>
            <h4>Tracklist:</h4>
            <ol>
                ${tracks.join('')}
            </ol>
            
            <h3>Upcoming Tour Dates:</h3>
            <ul>
                ${tourSchedule.join('')}
            </ul>
            
            <h3>Strange Band Facts:</h3>
            <ul>
                ${bandFacts.join('')}
            </ul>
            
            <h3>Album Cover Prompt (DALL·E style):</h3>
            <p><code>${dallePrompt}</code></p>
        </div>
    `;
}
