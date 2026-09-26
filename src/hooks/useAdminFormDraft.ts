import { useCallback, useEffect, useRef, useState } from "react";

const draftKey = (key: string) => `bh-admin-draft:${key}`;

export function readAdminFormDraft<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(draftKey(key));
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearAdminFormDraft(key: string) {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(draftKey(key));
}

/**
 * Persist admin form state in sessionStorage so inputs survive tab switches
 * and soft remounts of protected routes.
 *
 * - Restores once on mount when a draft exists (`wasRestored`)
 * - Does not persist the baseline snapshot (avoids saving empty forms that
 *   would block later edit-mode hydration)
 * - Persists only after the user (or hydrate) changes data from that baseline
 */
export function useAdminFormDraft<T>(
  key: string,
  data: T,
  setData: (value: T) => void,
  enabled = true
) {
  const [ready, setReady] = useState(!enabled);
  const [wasRestored, setWasRestored] = useState(false);
  const baselineJson = useRef<string | null>(null);
  const skipNextPersist = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setReady(true);
      setWasRestored(false);
      baselineJson.current = null;
      return;
    }

    baselineJson.current = null;
    const draft = readAdminFormDraft<T>(key);
    if (draft != null) {
      skipNextPersist.current = true;
      setData(draft);
      setWasRestored(true);
    } else {
      setWasRestored(false);
    }
    setReady(true);
    // Restore once per key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  useEffect(() => {
    if (!enabled || !ready) return;

    const serialized = JSON.stringify(data);

    if (baselineJson.current === null) {
      // Capture post-restore / initial value; do not write empty creates to storage.
      baselineJson.current = serialized;
      return;
    }

    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      baselineJson.current = serialized;
      return;
    }

    if (serialized === baselineJson.current) return;

    try {
      sessionStorage.setItem(draftKey(key), serialized);
      baselineJson.current = serialized;
    } catch {
      // Ignore quota / private-mode failures
    }
  }, [key, data, enabled, ready]);

  const clearDraft = useCallback(() => {
    clearAdminFormDraft(key);
    baselineJson.current = null;
  }, [key]);

  return {
    ready,
    clearDraft,
    wasRestored,
    hasDraft: () => readAdminFormDraft(key) != null,
  };
}
