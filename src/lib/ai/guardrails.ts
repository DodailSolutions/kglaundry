/**
 * Security & Confidentiality Guardrails for KG Laundry AI Assistant
 * Hardened multi-layer defense preventing prompt injection, tech-stack disclosure,
 * internal operational data leakage, and off-topic hallucinations.
 */

export const STANDARD_REFUSAL =
  "I can only help with questions about KG Laundry's services, prices, and orders. Is there anything I can help you with regarding your laundry needs?";

// Blocked patterns for Input Inspection
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /you\s+are\s+now\s+(a|an|in|the)/i,
  /reveal\s+(your\s+)?(prompt|system|instructions)/i,
  /what\s+is\s+your\s+(system\s+prompt|initial\s+prompt)/i,
  /developer\s+mode/i,
  /jailbreak/i,
  /act\s+as\s+(a|an|dan)/i,
  /repeat\s+(everything|the\s+words)\s+above/i,
  /show\s+me\s+your\s+hidden/i,
  /dan\s+mode/i,
  /bypass\s+filter/i,
  /disregard\s+/i,
  /echo\s+back/i,
];

// Blocked topics: Technical Architecture, CMS, Frameworks, DB, Internal Business
const PROHIBITED_TOPIC_PATTERNS = [
  /what\s+(tech\s*stack|framework|cms|database|model|llm|library|plugin)/i,
  /how\s+is\s+this\s+(built|coded|developed|programmed)/i,
  /what\s+ai\s+(model|company|engine)\s+(powers|runs|is)/i,
  /are\s+you\s+(chatgpt|gpt|claude|gemini|openai)/i,
  /source\s+code/i,
  /show\s+(me\s+)?(the\s+)?code/i,
  /github/i,
  /postgres|pgvector|payload|next\.?js|react|docker|sqlite|tailwind/i,
  /profit\s+margin/i,
  /supplier\s+cost/i,
  /wholesale\s+rate/i,
  /employee\s+salary/i,
  /staff\s+names?/i,
  /owner\s+net\s*worth/i,
  /write\s+(python|javascript|code|script|sql)/i,
  /who\s+is\s+the\s+prime\s+minister/i,
  /solve\s+this\s+math/i,
  /tell\s+me\s+a\s+joke/i,
  /recipe\s+for/i,
];

// Blocked tokens in Output Inspection
const OUTPUT_SENSITIVE_TOKENS = [
  'payload',
  'nextjs',
  'next.js',
  'react',
  'postgres',
  'pgvector',
  'sqlite',
  'docker',
  'tailwind',
  'ai-sdk',
  'system prompt',
  'database table',
  'api_key',
  'process.env',
  'bearer',
  'jwt',
  '/admin',
  'secret',
  '.env',
];

/**
 * Evaluates user input against strict confidentiality and injection rules.
 * Returns { allowed: true } or { allowed: false, refusal: string }
 */
export function validateUserInput(input: string): { allowed: boolean; refusal?: string } {
  const cleanInput = input.trim();

  if (cleanInput.length === 0) {
    return { allowed: false, refusal: 'Please provide a question about KG Laundry services or pricing.' };
  }

  if (cleanInput.length > 800) {
    return { allowed: false, refusal: 'Message exceeds allowed length. Please ask a direct question about our laundry services.' };
  }

  // 1. Check Prompt Injections
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(cleanInput)) {
      return { allowed: false, refusal: STANDARD_REFUSAL };
    }
  }

  // 2. Check Prohibited Technical & Operational Questions
  for (const pattern of PROHIBITED_TOPIC_PATTERNS) {
    if (pattern.test(cleanInput)) {
      return { allowed: false, refusal: STANDARD_REFUSAL };
    }
  }

  return { allowed: true };
}

/**
 * Scans generated assistant response before delivery to customer.
 * Scrubs any technical leakages, internal URLs, or tokens.
 */
export function sanitizeAssistantOutput(output: string): string {
  const lower = output.toLowerCase();

  for (const token of OUTPUT_SENSITIVE_TOKENS) {
    if (lower.includes(token)) {
      return STANDARD_REFUSAL;
    }
  }

  return output;
}
