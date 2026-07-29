"use client";

import { useState, useEffect, useCallback } from "react";
import type { PlaybackState } from "./types";

interface ReplayState {
  selectedTradeId: string | null;
  setSelectedTradeId: (id: string | null) => void;
  playback: PlaybackState;
  setPlayback: (partial: Partial<PlaybackState>) => void;
  togglePlay: () => void;
  setSpeed: (speed: 1 | 2 | 5 | 10) => void;
  goToFrame: (index: number) => void;
  goToEntry: () => void;
  goToExit: () => void;
  toggleFullscreen: () => void;
  toggleCompareMode: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterDirection: string | null;
  setFilterDirection: (d: string | null) => void;
  filterResult: string | null;
  setFilterResult: (r: string | null) => void;
}

let state: {
  selectedTradeId: string | null;
  playback: PlaybackState;
  searchQuery: string;
  filterDirection: string | null;
  filterResult: string | null;
} = {
  selectedTradeId: null,
  playback: {
    isPlaying: false,
    speed: 1,
    currentIndex: 0,
    isFullscreen: false,
    compareMode: false,
    compareTradeId: null,
  },
  searchQuery: "",
  filterDirection: null,
  filterResult: null,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function useReplayStore(): ReplayState {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate((n) => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  const setSelectedTradeId = useCallback((id: string | null) => {
    state = { ...state, selectedTradeId: id, playback: { ...state.playback, currentIndex: 0, isPlaying: false } };
    notify();
  }, []);

  const setPlayback = useCallback((partial: Partial<PlaybackState>) => {
    state = { ...state, playback: { ...state.playback, ...partial } };
    notify();
  }, []);

  const togglePlay = useCallback(() => {
    state = { ...state, playback: { ...state.playback, isPlaying: !state.playback.isPlaying } };
    notify();
  }, []);

  const setSpeed = useCallback((speed: 1 | 2 | 5 | 10) => {
    state = { ...state, playback: { ...state.playback, speed } };
    notify();
  }, []);

  const goToFrame = useCallback((index: number) => {
    state = { ...state, playback: { ...state.playback, currentIndex: index } };
    notify();
  }, []);

  const goToEntry = useCallback(() => {
    state = { ...state, playback: { ...state.playback, currentIndex: 0 } };
    notify();
  }, []);

  const goToExit = useCallback(() => {
    state = { ...state, playback: { ...state.playback, currentIndex: 9999 } };
    notify();
  }, []);

  const toggleFullscreen = useCallback(() => {
    state = { ...state, playback: { ...state.playback, isFullscreen: !state.playback.isFullscreen } };
    notify();
  }, []);

  const toggleCompareMode = useCallback(() => {
    state = { ...state, playback: { ...state.playback, compareMode: !state.playback.compareMode } };
    notify();
  }, []);

  const setSearchQuery = useCallback((q: string) => {
    state = { ...state, searchQuery: q };
    notify();
  }, []);

  const setFilterDirection = useCallback((d: string | null) => {
    state = { ...state, filterDirection: d };
    notify();
  }, []);

  const setFilterResult = useCallback((r: string | null) => {
    state = { ...state, filterResult: r };
    notify();
  }, []);

  return {
    selectedTradeId: state.selectedTradeId,
    setSelectedTradeId,
    playback: state.playback,
    setPlayback,
    togglePlay,
    setSpeed,
    goToFrame,
    goToEntry,
    goToExit,
    toggleFullscreen,
    toggleCompareMode,
    searchQuery: state.searchQuery,
    setSearchQuery,
    filterDirection: state.filterDirection,
    setFilterDirection,
    filterResult: state.filterResult,
    setFilterResult,
  };
}
