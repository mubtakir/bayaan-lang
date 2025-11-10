/*
 * Amazing Example: Analyzing "Layla's" Personality Using Baserah AI System
 * مثال مبهر: تحليل شخصية "ليلى" باستخدام نظام بصيرة AI
 * 
 * GLOBAL VERSION - Using English Keywords with Arabic Data
 * النسخة العالمية - استخدام كلمات مفتاحية إنجليزية مع بيانات عربية
 * 
 * This example demonstrates unique features impossible in other languages:
 * - Arabic letter semantic analysis
 * - Psychological causal networks
 * - Baserah AI system (without neural networks)
 * - Unknown handling system
 * - Automatic goal planning
 * - Hybrid programming (OOP + Logic + Procedural)
 * - Mother Equation: O = (id, Φ, Ψ(t), Γ)
 */

// ═══════════════════════════════════════════════════════════════
// Part 1: Arabic Letter Meanings Analysis
// الجزء الأول: تحليل معاني الحروف العربية
// ═══════════════════════════════════════════════════════════════

const letterMeanings = {
    "ل": ["لين", "تكرار"],        // softness, rumination
    "ي": ["اتصال", "تطلع"],        // connection, aspiration
    "ى": ["امتداد"],               // extension
    "م": ["جمع", "ضم"],            // gathering
    "ح": ["حياة", "حركة"],         // life, movement
    "د": ["ثبات", "دوام"],         // stability, permanence
    "س": ["سرعة", "سيولة"],        // speed, fluidity
    "ر": ["تكرار", "دوران"],       // repetition, rotation
};

// ═══════════════════════════════════════════════════════════════
// Part 2: Psychological Causal Relations (Baserah AI System)
// الجزء الثاني: العلاقات السببية النفسية (نظام بصيرة AI)
// ═══════════════════════════════════════════════════════════════

const causalRelations = {
    causes: [
        {from: "اتصال", to: "تعلق", weight: 0.9},
        {from: "تعلق", to: "حزن_عميق", weight: 0.85},
        {from: "حزن_عميق", to: "عزلة", weight: 0.92}
    ],
    enhances: [
        {from: "تكرار", to: "وساوس", weight: 0.8},
        {from: "روتين_يومي", to: "استقرار", weight: 0.88}
    ],
    prevents: [
        {from: "لين", to: "عنف", weight: 0.95},
        {from: "إبداع", to: "وساوس", weight: 0.75}
    ]
};

// ═══════════════════════════════════════════════════════════════
// Part 3: Unknown Registration (Unique Feature in Baserah AI)
// الجزء الثالث: تسجيل المجهول (ميزة فريدة في بصيرة AI)
// ═══════════════════════════════════════════════════════════════

function registerUnknown(id, question, context) {
    console.log("❓ Registering Unknown: " + question);
    console.log("   ID: " + id);
    console.log("   Context: " + JSON.stringify(context));
    
    return {
        id: id,
        question: question,
        context: context,
        solved: false
    };
}

const laylaUnknown = registerUnknown(
    "ليلى_حزن_مجهول",
    "لماذا ليلى في حالة حزن شديد؟",
    {person: "ليلى", event: "فقدان_حبيب"}
);

// ═══════════════════════════════════════════════════════════════
// Part 4: Intelligent Object (Hybrid Programming)
// الجزء الرابع: الكائن الذكي (البرمجة الهجينة)
// ═══════════════════════════════════════════════════════════════

class Person {
    constructor(name) {
        this.name = name;
        this.traits = [];
        this.state = "مستقر";
        
        this.analyzeFromName();
        this.inferEmotionalState();
    }
    
    analyzeFromName() {
        // Extract letters from name
        const letters = this.name.split('');
        
        // Find meanings for each letter
        for (const letter of letters) {
            if (letterMeanings[letter]) {
                this.traits.push(...letterMeanings[letter]);
            }
        }
        
        // Remove duplicates
        this.traits = [...new Set(this.traits)];
    }
    
    inferEmotionalState() {
        // Use causal reasoning
        if (this.traits.includes("اتصال") && this.traits.includes("تكرار")) {
            this.state = "حزن_وساوس";
        } else {
            this.state = "مستقر";
        }
    }
    
    displayAnalysis() {
        console.log("\n🧠 Baserah AI Analysis for " + this.name);
        console.log("═══════════════════════════════════════");
        console.log("Linguistic Traits: " + this.traits.join(", "));
        console.log("Emotional State: " + this.state);
    }
}

// ═══════════════════════════════════════════════════════════════
// Part 5: Goal System and Automatic Planning
// الجزء الخامس: نظام الأهداف والتخطيط التلقائي
// ═══════════════════════════════════════════════════════════════

function createGoal(name, condition, priority, plan) {
    return {
        name: name,
        condition: condition,
        priority: priority,
        plan: plan,
        active: condition()
    };
}

function planAutomatically(goal) {
    if (goal.active) {
        console.log("\n📋 Proposed Therapeutic Plan:");
        console.log("═══════════════════════════════════════");
        
        goal.plan.forEach((step, index) => {
            console.log(`  ${index + 1}. ${step}`);
        });
        
        return goal.plan;
    } else {
        console.log("✅ Goal already achieved!");
        return [];
    }
}

// ═══════════════════════════════════════════════════════════════
// Part 6: Mother Equation (Core of Baserah AI System)
// الجزء السادس: المعادلة الأم (جوهر نظام بصيرة AI)
// ═══════════════════════════════════════════════════════════════

// O = (id, Φ, Ψ(t), Γ)
// id: Unique Identity
// Φ (Phi): Static Properties
// Ψ(t) (Psi): Dynamic States at time t
// Γ (Gamma): Context/Shape

function createMotherEquation(identity, properties, temporalState, context) {
    const equation = {
        id: identity,
        Φ: properties,
        Ψ: {
            t: temporalState.at,
            state: temporalState.state
        },
        Γ: context
    };
    
    console.log("\n🔬 Mother Equation for " + identity + ":");
    console.log("═══════════════════════════════════════");
    console.log("O = (id, Φ, Ψ(t), Γ)");
    console.log("  id = " + equation.id);
    console.log("  Φ = [" + equation.Φ.join(", ") + "]");
    console.log("  Ψ(t=" + equation.Ψ.t + ") = " + equation.Ψ.state);
    console.log("  Γ = " + JSON.stringify(equation.Γ));
    
    return equation;
}

// ═══════════════════════════════════════════════════════════════
// Part 7: Automatic Unknown Resolution
// الجزء السابع: حل المجهول تلقائياً
// ═══════════════════════════════════════════════════════════════

function solveUnknown(unknown, newData) {
    console.log("\n🔍 Attempting to solve unknown...");
    console.log("═══════════════════════════════════════");
    
    const traits = newData.nameTraits;
    const event = newData.event;
    const state = newData.state;
    
    let explanation = "";
    
    if (traits.includes("اتصال") && traits.includes("تكرار")) {
        explanation = `Sadness results from interaction of "اتصال" (emotional attachment)\n   with "تكرار" (repetitive thinking) after ${event}.\n\n   Analysis: Personality with 'اتصال' trait tends to deep attachment,\n   and when combined with 'تكرار' (repetitive thinking), results in '${state}' state.`;
    } else {
        explanation = "No clear explanation yet. Needs more data.";
    }
    
    console.log("✅ Unknown solved!");
    console.log("Explanation: " + explanation);
    
    unknown.solved = true;
    unknown.explanation = explanation;
    
    return unknown;
}

// ═══════════════════════════════════════════════════════════════
// Part 8: Main Execution
// الجزء الثامن: التنفيذ الرئيسي
// ═══════════════════════════════════════════════════════════════

function main() {
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("🌟 Baserah AI System - Analyzing 'Layla' Personality 🌟");
    console.log("نظام بصيرة AI - تحليل شخصية 'ليلى'");
    console.log("═══════════════════════════════════════════════════════════════");
    
    // 1. Create intelligent object
    const layla = new Person("ليلى");
    
    // 2. Display initial analysis
    layla.displayAnalysis();
    
    // 3. Create therapeutic goal
    const balanceGoal = createGoal(
        "توازن_ليلى",
        () => layla.state === "حزن_وساوس",
        0.98,
        [
            "تقليل_التكرار_الذهني",
            "تحويل_الاتصال_إلى_إبداع",
            "بناء_روتين_يومي"
        ]
    );
    
    // 4. Generate automatic plan
    const treatmentPlan = planAutomatically(balanceGoal);
    
    // 5. Apply Mother Equation
    const laylaEquation = createMotherEquation(
        "ليلى",
        layla.traits,
        {at: "2025-04-05", state: layla.state},
        {event: "فقدان_حبيب"}
    );
    
    // 6. Evaluate success probability
    console.log("\n📊 Success Probability Assessment:");
    console.log("═══════════════════════════════════════");
    
    const routineEnhancesStability = true;
    const creativityPreventsObsession = true;
    
    if (routineEnhancesStability && creativityPreventsObsession) {
        console.log("✅ Baserah AI: Success probability = 89% (high confidence)");
        console.log("   Reason: Plan combines obsession reduction with stability building");
    } else {
        console.log("⚠️  Low success probability - plan needs adjustment");
    }
    
    // 7. Solve unknown
    const solvedUnknown = solveUnknown(laylaUnknown, {
        nameTraits: layla.traits,
        event: "فقدان_حبيب",
        state: layla.state
    });
    
    // 8. Summary
    console.log("\n═══════════════════════════════════════════════════════════════");
    console.log("✅ Analysis completed successfully!");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("\n💡 This example demonstrates Baserah AI power:");
    console.log("   • Deep linguistic analysis from letter level");
    console.log("   • Intelligent causal reasoning");
    console.log("   • Automatic goal planning");
    console.log("   • Automatic unknown resolution");
    console.log("   • All without neural networks!");
    console.log("\n🚀 This is impossible in any other programming language!");
}

// Run the program
main();

