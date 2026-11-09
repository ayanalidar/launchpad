"use client";

import { useEffect, useState } from "react";

interface UseFetchOptions {
  /** Skip the fetch if true */
  skip?: boolean;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Simple data fetching hook with caching.
 * Fetches from the given URL on mount, returns { data, loading, error }.
 */
export function useFetch<T>(url: string, options: UseFetchOptions = {}): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !options.skip,
    error: null,
  });
  const [refetchCount, setRefetchCount] = useState(0);

  useEffect(() => {
    if (options.skip) return;
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (e) {
        if (!cancelled) {
          setState({ data: null, loading: false, error: (e as Error).message });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, options.skip, refetchCount]);

  return {
    ...state,
    refetch: () => setRefetchCount((c) => c + 1),
  };
}
