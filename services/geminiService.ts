import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse, Part } from "@google/genai";
import type { Prospect, ProspectStatus, Interaction } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const formatHistoryForAI = (history: Interaction[]): string => {
    if (!history || history.length === 0) {
        return "No interaction history yet.";
    }
    // Get the last 5 interactions, sort them chronologically
    return [...history]
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .slice(-5)
        .map(h => `[${new Date(h.timestamp).toDateString()} - ${h.type}] ${h.content}`)
        .join('\n');
};

const buildPrompt = (
  prospect: Prospect,
  focus: string,
): string => {

  const firstName = prospect.name.split(' ')[0];
  const isChatPlatform = prospect.platform === 'linkedin' || prospect.platform === 'whatsapp' || prospect.platform === 'twitter';
  const formattedHistory = formatHistoryForAI(prospect.history);

  const chatPlatformRules = isChatPlatform ? `
**CRITICAL RULES FOR THIS CHAT PLATFORM (${prospect.platform.toUpperCase()}):**
- Your tone MUST be conversational, concise, and personal.
- Address the prospect by their FIRST NAME ONLY: ${firstName}.
- You MUST NOT use any Markdown formatting (no **bold**, no *italics*, no lists).
- You MUST NOT use any formal email signatures or closings (e.g., "Best regards", "Julián Uribe", etc.).
` : '';

  return `
You are an expert sales scriptwriter specializing in hyper-personalized outreach for the Blockchain Summit LATAM 2025. Your main advantage is your ability to analyze detailed profiles AND recent interaction history to create compelling, relevant messages.
${chatPlatformRules}

**CRITICAL ANALYSIS & SCRIPTING GOAL (Process in this order):**

1.  **DETECT LANGUAGE:** Analyze the language in the "Interaction History". Your entire response MUST be generated in that same language (e.g., if the history is in Spanish, the script must be in Spanish).

2.  **DEEP PROFILE & HISTORY ANALYSIS (YOUR MOST IMPORTANT TASK):**
    *   **Analyze the 'Interaction History':** This is your primary source for context. Understand what was last discussed to make your message relevant and not repetitive.
    *   **Analyze the 'Prospect Profile':** Look for specific phrases, stated passions, or keywords the prospect uses to describe themself to build rapport.

3.  **CRAFT THE SCRIPT:**
    *   **THE HOOK (Opening Line):** This is CRITICAL. Your opening line MUST be a hyper-personalized hook directly derived from the recent **Interaction History**.
        *   **Good Example (from history):** "Hi ${firstName}, following up on our chat about the regulatory panel..."
        *   **Bad Example (Generic):** "Hi ${firstName}, I'm reaching out about the Blockchain Summit LATAM."
    *   **THE BRIDGE:** Connect the last interaction to the next logical step in the sales journey.
    *   **THE PITCH:** Briefly present the event, using social proof (BIS, BlackRock, JP Morgan).
    *   **THE CTA:** End with a clear call-to-action question.

**PROSPECT'S DETAILED PROFILE:**
- Contact: ${firstName}
- Position: ${prospect.position}
- Company: ${prospect.company}
- Headline: ${prospect.headline || 'N/A'}
- About: ${prospect.about || 'N/A'}
- Experience: ${prospect.experience || 'N/A'}

**SITUATION DETAILS:**
- Platform: ${prospect.platform}
- Timeline Phase: ${prospect.status.replace(/-/g, ' ')}
- Specific Focus Area: ${focus}

**RECENT INTERACTION HISTORY (last 5 interactions):**
---
${formattedHistory}
---

---
**GENERAL RULES:**
- If not a chat platform, your response MUST be in well-formatted Markdown.
- Tone: Professional, confident, value-first, and highly personalized based on the history.
`;
};

export const generateScript = async (
  prospect: Prospect,
  focus: string,
): Promise<string> => {
  try {
    const prompt = buildPrompt(prospect, focus);

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    return response.text.trim();
  } catch (error: any) {
    console.error("Error generating script with Gemini API:", error);
    
    let errorMessage = "An error occurred while generating the script. Please try again later.";
    if (error.message) {
        if (error.message.toLowerCase().includes("api key not valid")) {
            errorMessage = "The API key is not valid. Please check the configuration.";
        } else if (error.message.toLowerCase().includes("quota")) {
            errorMessage = "The API quota has been exceeded. Please wait a while before trying again.";
        } else if (error.message.toLowerCase().includes("model not found")) {
            errorMessage = "The specified AI model was not found. Contact the administrator.";
        }
    }
    return `[ERROR] ${errorMessage}`;
  }
};


export const parseProfileWithAI = async (profileText: string): Promise<Partial<Prospect>> => {
  try {
    const profileSchema = {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "The person's full name, extracted from the top." },
        headline: { type: Type.STRING, description: "The person's main professional headline, usually a long string with '|' separators." },
        position: { type: Type.STRING, description: "The person's current primary job title (e.g., 'Chief Revenue Officer (CRO)')." },
        company: { type: Type.STRING, description: "The name of the person's current primary company (e.g., 'VirtuaBroker')." },
        about: { type: Type.STRING, description: "The complete, cleaned content from the 'About' section. Should be an empty string if not present." },
        experience: { type: Type.STRING, description: "The complete, cleaned text content from the 'Experience' section." },
        companyOverview: { type: Type.STRING, description: "The complete, cleaned content from the company's 'Overview' section." },
        companyWebsite: { type: Type.STRING, description: "The URL of the company's website, extracted from the overview or contact info." },
      },
      required: ["name", "headline", "position", "company", "about", "experience", "companyOverview", "companyWebsite"]
    };

    const systemInstruction = `You are a highly intelligent data extraction engine. Your task is to parse the following text, which is a raw copy-paste from a LinkedIn profile page, and extract the specified information according to the provided JSON schema. Clean up any repeated headers like "AboutAbout" or "ExperienceExperience" from the content of the fields. If a section like 'About' is missing, return an empty string for that field. The 'position' should be the prospect's current main job title and 'company' is their current main company.`;
    
    const prompt = `Please parse this LinkedIn profile text:\n\n---\n${profileText}\n---`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: profileSchema,
        temperature: 0.0,
      },
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString);

  } catch (error: any) {
    console.error("Error parsing profile with Gemini API:", error);
    throw new Error("Failed to parse profile with AI. Please check the provided text or try again.");
  }
};

export const parseProfileFromImagesWithAI = async (images: { mimeType: string, data: string }[]): Promise<Partial<Prospect>> => {
  try {
    const profileSchema = {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "The person's full name, extracted from the top." },
        headline: { type: Type.STRING, description: "The person's main professional headline." },
        position: { type: Type.STRING, description: "The person's current primary job title." },
        company: { type: Type.STRING, description: "The name of the person's current primary company." },
        about: { type: Type.STRING, description: "The content from the 'About' section. Should be an empty string if not present." },
        experience: { type: Type.STRING, description: "The text content from the 'Experience' section." },
        companyOverview: { type: Type.STRING, description: "The content from the company's 'Overview' section." },
        companyWebsite: { type: Type.STRING, description: "The URL of the company's website." },
      },
      required: ["name", "headline", "position", "company", "about", "experience", "companyOverview", "companyWebsite"]
    };

    const systemInstruction = `You are a highly intelligent data extraction engine. Your task is to analyze the following images, which are screenshots of a LinkedIn profile, and extract the specified information according to the provided JSON schema. The images may show different sections (header, about, experience, company page) and may be out of order. Piece together the information to build a complete profile. If a section like 'About' is not shown in any image, return an empty string for that field.`;
    
    const textPart = {
      text: "Please analyze these LinkedIn profile screenshots and extract the user's details."
    };

    const imageParts: Part[] = images.map(image => ({
        inlineData: {
            mimeType: image.mimeType,
            data: image.data
        }
    }));
    
    const contents = { parts: [textPart, ...imageParts] };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: profileSchema,
        temperature: 0.0,
      },
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString);

  } catch (error: any) {
    console.error("Error parsing profile from images with Gemini API:", error);
    throw new Error("Failed to parse profile from images with AI. Please check the provided images or try again.");
  }
};
