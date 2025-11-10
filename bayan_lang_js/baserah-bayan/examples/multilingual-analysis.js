/*
 * Multilingual Personality Analysis Example
 * مثال تحليل الشخصية متعدد اللغات
 * 
 * This example demonstrates Bayan language's ability to analyze
 * names in both Arabic and English using letter semantic analysis.
 */

// ═══════════════════════════════════════════════════════════════
// Part 1: Letter Meanings Database (Multilingual)
// ═══════════════════════════════════════════════════════════════

const letterMeaningsDatabase = {
    // Arabic Letter Meanings (Based on 40 years of research)
    "ل": ["لين", "تكرار"],        // softness, rumination
    "ي": ["اتصال", "تطلع"],        // connection, aspiration
    "ى": ["امتداد"],               // extension
    "م": ["جمع", "ضم"],            // gathering
    "ح": ["حياة", "حركة"],         // life, movement
    "د": ["ثبات", "دوام"],         // stability, permanence
    "س": ["سرعة", "سيولة"],        // speed, fluidity
    "ر": ["تكرار", "دوران"],       // repetition, rotation
    "ن": ["استمرار"],              // continuation
    "ع": ["عمق", "علو"],           // depth, height
    "ب": ["بداية", "ظهور"],        // beginning, appearance
    "ت": ["أنوثة"],                // femininity
    "ك": ["تشبيه"],                // similarity
    "ف": ["فصل"],                  // separation
    "ق": ["قوة", "قطع"],           // strength, cutting
    "و": ["جمع"],                  // gathering
    "ه": ["غياب"],                 // absence
    "ش": ["انتشار"],               // spreading
    "ط": ["طمأنينة"],              // tranquility
    "ز": ["زيادة"],                // increase
    "ج": ["جمع"],                  // gathering
    "خ": ["خروج"],                 // exit
    "ذ": ["ذكر"],                  // mention
    "ص": ["صلابة"],                // hardness
    "ض": ["ضغط"],                  // pressure
    "غ": ["غياب"],                 // absence
    "ظ": ["ظهور"],                 // appearance
    "ا": ["بداية", "وحدة"],        // beginning, unity
    "ء": ["همزة", "قطع"],          // hamza, cutting
    
    // English Letter Meanings (Placeholder - to be filled later)
    "a": ["meaning1", "meaning2", "meaning3"],
    "b": ["meaning1", "meaning2", "meaning3"],
    "c": ["meaning1", "meaning2", "meaning3"],
    "d": ["meaning1", "meaning2", "meaning3"],
    "e": ["meaning1", "meaning2", "meaning3"],
    "f": ["meaning1", "meaning2", "meaning3"],
    "g": ["meaning1", "meaning2", "meaning3"],
    "h": ["meaning1", "meaning2", "meaning3"],
    "i": ["meaning1", "meaning2", "meaning3"],
    "j": ["meaning1", "meaning2", "meaning3"],
    "k": ["meaning1", "meaning2", "meaning3"],
    "l": ["meaning1", "meaning2", "meaning3"],
    "m": ["meaning1", "meaning2", "meaning3"],
    "n": ["meaning1", "meaning2", "meaning3"],
    "o": ["meaning1", "meaning2", "meaning3"],
    "p": ["meaning1", "meaning2", "meaning3"],
    "q": ["meaning1", "meaning2", "meaning3"],
    "r": ["meaning1", "meaning2", "meaning3"],
    "s": ["meaning1", "meaning2", "meaning3"],
    "t": ["meaning1", "meaning2", "meaning3"],
    "u": ["meaning1", "meaning2", "meaning3"],
    "v": ["meaning1", "meaning2", "meaning3"],
    "w": ["meaning1", "meaning2", "meaning3"],
    "x": ["meaning1", "meaning2", "meaning3"],
    "y": ["meaning1", "meaning2", "meaning3"],
    "z": ["meaning1", "meaning2", "meaning3"]
};

// ═══════════════════════════════════════════════════════════════
// Part 2: Language Detection
// ═══════════════════════════════════════════════════════════════

function detectLanguage(text) {
    const arabicPattern = /[\u0600-\u06FF]/;
    const englishPattern = /[a-zA-Z]/;
    
    const hasArabic = arabicPattern.test(text);
    const hasEnglish = englishPattern.test(text);
    
    if (hasArabic && hasEnglish) return "mixed";
    if (hasArabic) return "arabic";
    if (hasEnglish) return "english";
    return "unknown";
}

// ═══════════════════════════════════════════════════════════════
// Part 3: Multilingual Person Class
// ═══════════════════════════════════════════════════════════════

class MultilingualPerson {
    constructor(name, language = "auto") {
        this.name = name;
        this.language = language === "auto" ? detectLanguage(name) : language;
        this.traits = [];
        this.state = "stable";
        
        this.analyzeFromName();
    }
    
    analyzeFromName() {
        const letters = this.name.split('');
        
        console.log(`\n🔍 Analyzing name: ${this.name}`);
        console.log(`   Language detected: ${this.language}`);
        console.log(`   Letters: ${letters.join(', ')}`);
        
        for (const letter of letters) {
            const meanings = this.getLetterMeanings(letter);
            
            if (meanings.length > 0) {
                console.log(`   Letter '${letter}' → ${meanings.join(', ')}`);
                this.traits.push(...meanings);
            }
        }
        
        // Remove duplicates
        this.traits = [...new Set(this.traits)];
        
        console.log(`\n✅ Extracted traits: ${this.traits.join(', ')}`);
    }
    
    getLetterMeanings(letter) {
        return letterMeaningsDatabase[letter] || [];
    }
    
    displayProfile() {
        console.log("\n" + "═".repeat(60));
        console.log(`👤 Profile for: ${this.name}`);
        console.log("═".repeat(60));
        console.log(`Language: ${this.language}`);
        console.log(`Traits: ${this.traits.join(", ")}`);
        console.log(`State: ${this.state}`);
        console.log("═".repeat(60));
    }
}

// ═══════════════════════════════════════════════════════════════
// Part 4: Comparison Function
// ═══════════════════════════════════════════════════════════════

function comparePersonalities(person1, person2) {
    console.log("\n" + "═".repeat(60));
    console.log("🔄 Comparing Personalities");
    console.log("═".repeat(60));
    
    console.log(`\n${person1.name} (${person1.language}):`);
    console.log(`  Traits: ${person1.traits.join(", ")}`);
    
    console.log(`\n${person2.name} (${person2.language}):`);
    console.log(`  Traits: ${person2.traits.join(", ")}`);
    
    // Find common traits
    const common = person1.traits.filter(t => person2.traits.includes(t));
    
    console.log(`\n🤝 Common traits: ${common.length > 0 ? common.join(", ") : "None"}`);
    
    // Find unique traits
    const unique1 = person1.traits.filter(t => !person2.traits.includes(t));
    const unique2 = person2.traits.filter(t => !person1.traits.includes(t));
    
    console.log(`\n🌟 Unique to ${person1.name}: ${unique1.join(", ")}`);
    console.log(`🌟 Unique to ${person2.name}: ${unique2.join(", ")}`);
    
    console.log("\n" + "═".repeat(60));
}

// ═══════════════════════════════════════════════════════════════
// Part 5: Main Execution
// ═══════════════════════════════════════════════════════════════

function main() {
    console.log("═".repeat(70));
    console.log("🌍 Baserah AI - Multilingual Personality Analysis");
    console.log("نظام بصيرة AI - تحليل الشخصية متعدد اللغات");
    console.log("═".repeat(70));
    
    // Example 1: Arabic name
    console.log("\n\n📋 Example 1: Arabic Name Analysis");
    console.log("مثال 1: تحليل اسم عربي");
    const layla = new MultilingualPerson("ليلى");
    layla.displayProfile();
    
    // Example 2: English name
    console.log("\n\n📋 Example 2: English Name Analysis");
    console.log("مثال 2: تحليل اسم إنجليزي");
    const alex = new MultilingualPerson("Alex");
    alex.displayProfile();
    
    // Example 3: Another Arabic name
    console.log("\n\n📋 Example 3: Another Arabic Name");
    console.log("مثال 3: اسم عربي آخر");
    const mohammed = new MultilingualPerson("محمد");
    mohammed.displayProfile();
    
    // Example 4: Compare personalities
    console.log("\n\n📋 Example 4: Personality Comparison");
    console.log("مثال 4: مقارنة الشخصيات");
    comparePersonalities(layla, mohammed);
    
    // Summary
    console.log("\n\n" + "═".repeat(70));
    console.log("✅ Analysis Complete!");
    console.log("═".repeat(70));
    console.log("\n💡 Key Features Demonstrated:");
    console.log("   ✅ Automatic language detection");
    console.log("   ✅ Arabic letter semantic analysis");
    console.log("   ✅ English letter semantic analysis (placeholder)");
    console.log("   ✅ Multilingual support in one system");
    console.log("   ✅ Personality comparison across languages");
    console.log("\n🚀 This multilingual capability is unique to Bayan language!");
    console.log("هذه القدرة متعددة اللغات فريدة للغة البيان!");
    console.log("═".repeat(70));
    
    console.log("\n\n📝 Note:");
    console.log("English letter meanings are currently placeholders (meaning1, meaning2, meaning3).");
    console.log("These will be filled with proper research-based meanings later.");
    console.log("\nملاحظة:");
    console.log("معاني الحروف الإنجليزية حالياً مؤقتة وسيتم ملؤها لاحقاً بمعاني مبنية على البحث.");
}

// Run the program
main();

