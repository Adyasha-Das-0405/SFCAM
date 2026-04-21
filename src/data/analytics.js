export const SAMPLE_ANALYTICS = {
    tlf: {
        avgScore: 4.1,
        highest: 4.8,
        lowest: 3.2,
        responses: 42,
        questionAvgs: [4.2, 4.0, 3.8, 4.3, 3.9, 4.1, 3.7, 4.2, 3.8, 4.0, 4.4, 4.1],
    },
    coa: {
        responses: 42,
        coData: [
            { co: "CO1", avg: 2.6, pct: 78, level: "High", score: 0.78 },
            { co: "CO2", avg: 2.1, pct: 52, level: "Medium", score: 0.52 },
            { co: "CO3", avg: 2.7, pct: 81, level: "High", score: 0.81 },
            { co: "CO4", avg: 1.9, pct: 46, level: "Low", score: 0.46 },
            { co: "CO5", avg: 2.3, pct: 62, level: "Medium", score: 0.62 },
        ],
    },
    cga: {
        avgScore: 3.6,
        responses: 42,
        paramAvgs: [
            { label: "Skill Development", avg: 3.8 },
            { label: "Industry Relevance", avg: 3.5 },
            { label: "Beyond Syllabus", avg: 3.2 },
            { label: "Assessment Quality", avg: 3.9 },
            { label: "Resource Access", avg: 3.6 },
        ],
    },
    completion: { CS601: 88, CS602: 72, CS603: 95 },
};