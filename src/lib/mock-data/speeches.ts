// Real Speech Transcripts — Based on actual 2024 campaign speeches

export interface SpeechTranscript {
  id: string;
  title: string;
  speaker: string;
  location: string;
  sessionId: string;
  segments: SpeechSegment[];
  persuasionIndex: number;
  persuasionDelta: number;
  optimism: number;
  aggression: number;
  policyShifts: PolicyShift[];
  targetAudiences: TargetAudience[];
}

export interface SpeechSegment {
  timestamp: string;
  text: string;
  isPromise: boolean;
  isNarrative: boolean;
  sentiment: "positive" | "negative" | "neutral" | "urgent";
}

export interface PolicyShift {
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  confidence: number;
}

export interface TargetAudience {
  group: string;
  percentage: number;
  color: string;
}

export const sampleSpeeches: SpeechTranscript[] = [
  {
    id: "speech-modi-varanasi-2024",
    title: "PM Modi's Varanasi Rally — 'Third Term' Pitch",
    speaker: "PM Narendra Modi",
    location: "Varanasi, Uttar Pradesh",
    sessionId: "ECI-VAR-2024",
    segments: [
      {
        timestamp: "16:00:00",
        text: "Bhaiyon aur Behenon, yeh chunav sirf ek sarkar chunne ka chunav nahi hai. Yeh chunav hai ki duniya mein Bharat ka sar uncha rahega ya neeche jayega.",
        isPromise: false,
        isNarrative: true,
        sentiment: "urgent",
      },
      {
        timestamp: "16:02:30",
        text: "Humne pichle 10 saal mein 25 crore logon ko garibi se bahar nikala hai. Ujjwala, Swachh Bharat, Ayushman — yeh sirf yojnayein nahi, yeh krantikari parivartan hai.",
        isPromise: false,
        isNarrative: true,
        sentiment: "positive",
      },
      {
        timestamp: "16:05:00",
        text: "Main vaada karta hoon — teesri baar ki sarkar mein har gaon tak optical fiber pahunchega, aur 2 crore naye ghar banaaye jayenge pradhan mantri awas yojana ke tahat.",
        isPromise: true,
        isNarrative: false,
        sentiment: "positive",
      },
      {
        timestamp: "16:08:00",
        text: "INDI alliance ka matlab hai — I for Irregularity, N for Nepotism, D for Disorder, I for Instability. Kya aap aise logon ko desh saunpenge?",
        isPromise: false,
        isNarrative: true,
        sentiment: "negative",
      },
      {
        timestamp: "16:10:30",
        text: "Aaj Ram Mandir ban chuka hai. 500 saal ka intezaar khatam hua. Aur agle 5 saal mein Kashi Vishwanath corridor ko duniya ka sabse bada dharmic tourism hub banayenge.",
        isPromise: true,
        isNarrative: false,
        sentiment: "positive",
      },
      {
        timestamp: "16:13:00",
        text: "Main Modi hoon — guarantee deta hoon. Jab tak Modi hai, tab tak Bharat ki sanskriti, sabhyata aur swabhiman surakshit hai.",
        isPromise: false,
        isNarrative: true,
        sentiment: "positive",
      },
    ],
    persuasionIndex: 91,
    persuasionDelta: 3.8,
    optimism: 82,
    aggression: 38,
    policyShifts: [
      {
        category: "Digital Infrastructure",
        categoryColor: "#00dce5",
        title: "Accelerated Rural Digitization",
        description: "Stronger emphasis on rural digital connectivity compared to 2019 campaign. Shift from 'Digital India' branding to concrete village-level optical fiber promises.",
        confidence: 92,
      },
      {
        category: "Identity Politics",
        categoryColor: "#bbc3ff",
        title: "Ram Mandir to Cultural Tourism Pivot",
        description: "Moving beyond Ram Mandir achievement to position religious sites as economic/tourism assets. Signals pivot from temple politics to development narrative.",
        confidence: 87,
      },
    ],
    targetAudiences: [
      { group: "Rural Communities", percentage: 88, color: "#00f5ff" },
      { group: "Hindu Voters", percentage: 82, color: "#00dce5" },
      { group: "Youth", percentage: 72, color: "#bbc3ff" },
      { group: "Small Business", percentage: 65, color: "#e3d8ff" },
    ],
  },
  {
    id: "speech-rahul-raebareli-2024",
    title: "Rahul Gandhi's Rae Bareli Rally — 'Constitution in Danger'",
    speaker: "Rahul Gandhi",
    location: "Rae Bareli, Uttar Pradesh",
    sessionId: "ECI-RB-2024",
    segments: [
      {
        timestamp: "11:00:00",
        text: "Yeh chunav desh ka sabse zaroori chunav hai. Ek taraf samvidhan hai, doosri taraf samvidhan ko khatam karne wale log. Aapko tay karna hai ki Bharat ka bhavishya kya hoga.",
        isPromise: false,
        isNarrative: true,
        sentiment: "urgent",
      },
      {
        timestamp: "11:03:00",
        text: "BJP kehti hai 400 paar. Main poochta hoon — 400 paar karke kya karenge? Samvidhan badlenge. Reservation khatam karenge. SC, ST, OBC ka haq cheenenge.",
        isPromise: false,
        isNarrative: true,
        sentiment: "negative",
      },
      {
        timestamp: "11:06:00",
        text: "INDIA alliance ki sarkar banegi toh sabse pehla kaam hoga — jaat-paat jangadna, aur OBC ko unka haq dena. Hum caste census karayenge.",
        isPromise: true,
        isNarrative: false,
        sentiment: "positive",
      },
      {
        timestamp: "11:09:00",
        text: "Do crorepati ke liye GST maaf, lekin gareeb ke chay-patti par 18% GST. Yeh hai Modi ji ka 'Sabka Saath' — sirf Adani-Ambani ka saath.",
        isPromise: false,
        isNarrative: true,
        sentiment: "negative",
      },
      {
        timestamp: "11:12:00",
        text: "Meri maa ne 20 saal Rae Bareli ki seva ki. Aaj main aapse vaada karta hoon — AIIMS jaisa hospital, IIT jaisa institute, aur har naukri mein 50% mahila aarakshan.",
        isPromise: true,
        isNarrative: false,
        sentiment: "positive",
      },
    ],
    persuasionIndex: 79,
    persuasionDelta: 6.4,
    optimism: 55,
    aggression: 62,
    policyShifts: [
      {
        category: "Social Justice",
        categoryColor: "#00dce5",
        title: "Caste Census as Central Promise",
        description: "Major pivot from 2019 campaign. Caste Census was not part of INC's 2019 manifesto but has become the central mobilization tool in 2024, reflecting INDIA alliance strategy.",
        confidence: 96,
      },
      {
        category: "Economic Messaging",
        categoryColor: "#ffb4ab",
        title: "Anti-Crony Capitalism Sharpened",
        description: "Directly naming industrialists (Adani-Ambani) — a significant escalation from 2019's generic 'suit-boot ki sarkar' rhetoric. Higher risk, higher reward strategy.",
        confidence: 91,
      },
    ],
    targetAudiences: [
      { group: "Dalit & OBC", percentage: 92, color: "#00f5ff" },
      { group: "Youth (Unemployed)", percentage: 84, color: "#00dce5" },
      { group: "Women Voters", percentage: 76, color: "#bbc3ff" },
      { group: "Muslim Voters", percentage: 68, color: "#e3d8ff" },
    ],
  },
];

export const defaultSpeechPrompt = `Paste any political speech or rally transcript here to analyze it with AI. The system will extract:

• Key promises and commitments
• Issue focus areas & policy positions
• Emotional tone (optimism vs. aggression)
• Target audience patterns (caste, class, gender)
• Policy shift detection vs. previous speeches

Try pasting any speech from a 2024 Lok Sabha rally, Parliament address, or campaign event.`;
