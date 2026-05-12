import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPTS } from "@/lib/ai/prompts";
import { buildCivicPrompt } from "@/lib/ai/civic-prompt";

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "Analysis indicates shifting voter sentiment driven by economic concerns. Urban-rural divergence remains the most significant structural factor influencing outcomes in this electoral cycle.",
  constituency:
    "This constituency experienced increased urban youth participation driven by employment-focused campaigning. The incumbent's margin has eroded primarily in working-class wards, where cost-of-living concerns outweigh traditional party loyalty.",
  graph:
    "This graph indicates declining rural support despite stable urban turnout. The divergence suggests issue-specific mobilization rather than broad sentiment shift. Key inflection point occurred post-monsoon season.",
  seatflip:
    "The flip was driven by a structural realignment in working-class demographics. Blue-collar voters, who historically supported the incumbent, shifted allegiance due to perceived inaction on employment policy. This mirrors a national trend in industrial constituencies.",
  mood:
    "National sentiment is trending toward economic pragmatism in rural sectors. Analyzing 4.2M social inputs and 800 recent field interviews indicates a sharp divergence from urban cultural focus. Healthcare anxiety is peaking in the Rust Belt.",
  copilot:
    "Based on real-time election intelligence, this trend is driven by strategic voting among key demographics. We are seeing a notable consolidation of votes against incumbents in volatile zones, largely influenced by local economic factors and unemployment narratives.",
  factcheck:
    '{"verdict":"UNVERIFIABLE","confidence":50,"evidence":["Unable to verify against live data at this time","Please check the Election Commission of India official portal"],"context":"This claim requires verification against official ECI records. The AI fact-checker is currently unavailable.","corrected_claim":""}',
  scenario:
    '{"nda_seats":293,"india_seats":234,"others_seats":16,"nda_change":0,"india_change":0,"key_swings":["No change from baseline"],"narrative":"With no adjustments made, the result remains the same as the actual 2024 outcome.","confidence":"HIGH"}',
};

export async function POST(req: NextRequest) {
  try {
    const { prompt, context, type, citizenMode, language } = await req.json();

    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        let basePrompt = prompt;

        if (type === "copilot" && PROMPTS.copilotResponse) {
          basePrompt = PROMPTS.copilotResponse(prompt, context || "Current dashboard data and trends.");
        } else if (type === "constituency" && PROMPTS.constituencySummary) {
          basePrompt = PROMPTS.constituencySummary("Selected Constituency", "India", context || prompt);
        } else if (type === "graph" && PROMPTS.graphExplanation) {
          basePrompt = PROMPTS.graphExplanation("Data Trend", context || prompt);
        } else if (type === "seatflip" && PROMPTS.seatFlipExplanation) {
          basePrompt = PROMPTS.seatFlipExplanation("Flipped Seat", context || prompt);
        } else if (type === "mood" && PROMPTS.moodOfNation) {
          basePrompt = PROMPTS.moodOfNation(context || prompt);
        } else if (type === "factcheck") {
          basePrompt = prompt; // Already fully constructed on the client
        } else if (type === "scenario") {
          basePrompt = prompt; // Already fully constructed on the client
        } else {
          basePrompt = context ? `${prompt}\n\nContext: ${context}` : prompt;
        }

        // Apply citizen mode + language augmentation
        const fullPrompt = buildCivicPrompt(
          basePrompt,
          citizenMode || false,
          language || "en"
        );

        const result = await model.generateContent(fullPrompt);
        const response = result.response.text();

        return NextResponse.json({ response, source: "gemini" });
      } catch (aiError) {
        console.error("Gemini API error, falling back to mock:", aiError);
      }
    }

    // Fallback to mock responses
    const mockType = type || "default";
    const response = MOCK_RESPONSES[mockType] || MOCK_RESPONSES.default;

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ response, source: "mock" });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json(
      { response: MOCK_RESPONSES.default, source: "mock" },
      { status: 200 }
    );
  }
}
