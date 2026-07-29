"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type SectionId = "main" | "header" | "cards" | "charts" | "tables" | "secondary" | "ai";

interface LoadingContextValue {
  isLoading: boolean;
  loadedSections: Set<SectionId>;
  markLoaded: (section: SectionId) => void;
  isSectionLoaded: (section: SectionId) => boolean;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function useLoading(): LoadingContextValue {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within a LoadingProvider");
  return ctx;
}

export function useProgressiveLoading(section: SectionId) {
  const { isSectionLoaded, markLoaded } = useLoading();
  const loaded = isSectionLoaded(section);

  return {
    loaded,
    reveal: () => markLoaded(section),
  };
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoadingState] = useState(false);
  const [loadedSections, setLoaded] = useState<Set<SectionId>>(new Set());

  const markLoaded = useCallback((section: SectionId) => {
    setLoaded((prev) => {
      const next = new Set(prev);
      next.add(section);
      return next;
    });
  }, []);

  const isSectionLoaded = useCallback(
    (section: SectionId) => loadedSections.has(section),
    [loadedSections]
  );

  const setLoading = useCallback((loading: boolean) => {
    setLoadingState(loading);
    if (!loading) {
      setTimeout(() => {
        const all: SectionId[] = ["main", "header", "cards", "charts", "tables", "secondary", "ai"];
        all.forEach((s) => markLoaded(s));
      }, 300);
    }
  }, [markLoaded]);

  const reset = useCallback(() => {
    setLoaded(new Set());
    setLoadingState(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, loadedSections, markLoaded, isSectionLoaded, setLoading, reset }}>
      {children}
    </LoadingContext.Provider>
  );
}
