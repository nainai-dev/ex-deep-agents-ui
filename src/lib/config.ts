export interface StandaloneConfig {
  deploymentUrl: string;
  assistantId: string;
  langsmithApiKey?: string;
}

const CONFIG_KEY = "deep-agent-config";

// Build-time defaults injected via NEXT_PUBLIC_* env vars (CF Pages build).
// localStorage still wins if the user edits via the Settings dialog.
const DEFAULT_DEPLOYMENT_URL = process.env.NEXT_PUBLIC_DEPLOYMENT_URL || "";
const DEFAULT_ASSISTANT_ID = process.env.NEXT_PUBLIC_ASSISTANT_ID || "";

export function getConfig(): StandaloneConfig | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CONFIG_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fall through to env defaults
    }
  }

  if (DEFAULT_DEPLOYMENT_URL && DEFAULT_ASSISTANT_ID) {
    return {
      deploymentUrl: DEFAULT_DEPLOYMENT_URL,
      assistantId: DEFAULT_ASSISTANT_ID,
    };
  }

  return null;
}

export function saveConfig(config: StandaloneConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}
