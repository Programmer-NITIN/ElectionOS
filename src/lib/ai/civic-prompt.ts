import { SUPPORTED_LANGUAGES } from "@/store";

const CITIZEN_SUFFIX = `\n\nIMPORTANT: Explain this in simple, friendly language for a first-time voter. Avoid jargon. Use short sentences. Use relatable analogies. If numbers are involved, explain what they mean in plain English. End with one actionable takeaway.`;

export function buildCivicPrompt(
  basePrompt: string,
  citizenMode: boolean,
  language: string
): string {
  let prompt = basePrompt;

  if (citizenMode) {
    prompt += CITIZEN_SUFFIX;
  }

  if (language !== "en") {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    if (lang) {
      prompt += `\n\nRespond entirely in ${lang.name}. Use natural, conversational ${lang.name} that an average citizen would understand. Do not mix in English except for proper nouns like party names (BJP, INC, AAP) and constituency names.`;
    }
  }

  return prompt;
}
