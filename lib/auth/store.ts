"use client";

import { create } from "zustand";
import type { AuthState, OnboardingData } from "./types";
import * as authService from "./service";

const defaultOnboarding: OnboardingData = {
  step: 1,
  completed: false,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  onboardingData: defaultOnboarding,
  sessions: [],

  login: async (email, password, rememberMe) => {
    set({ isLoading: true });
    try {
      const { user, session } = await authService.loginUser(email, password, rememberMe);
      set({ user, isAuthenticated: true, isLoading: false, sessions: [session] });
    } catch {
      set({ isLoading: false });
      throw new Error("Invalid email or password");
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const { user } = await authService.registerUser(data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error("Registration failed");
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await authService.logoutAllSessions();
    set({ user: null, isAuthenticated: false, isLoading: false, sessions: [] });
  },

  logoutEverywhere: async () => {
    set({ isLoading: true });
    await authService.logoutAllSessions();
    set({ user: null, isAuthenticated: false, isLoading: false, sessions: [] });
  },

  updateOnboarding: (data) => {
    set((state) => ({ onboardingData: { ...state.onboardingData, ...data } }));
  },

  completeOnboarding: () => {
    set((state) => ({ onboardingData: { ...state.onboardingData, step: 8, completed: true } }));
  },

  setUser: (user) => set({ user, isAuthenticated: true }),

  resetPassword: async (email) => {
    set({ isLoading: true });
    try {
      await authService.sendResetLink(email);
      set({ isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error("Failed to send reset link");
    }
  },

  setNewPassword: async (token, password) => {
    set({ isLoading: true });
    try {
      await authService.resetPassword(token, password);
      set({ isLoading: false });
    } catch {
      set({ isLoading: false });
      throw new Error("Failed to reset password");
    }
  },

  verifyEmail: async (token) => {
    set({ isLoading: true });
    try {
      await authService.verifyEmailToken(token);
      set((state) => ({ user: state.user ? { ...state.user, emailVerified: true } : null, isLoading: false }));
    } catch {
      set({ isLoading: false });
      throw new Error("Verification failed");
    }
  },

  resendVerification: async () => {
    set({ isLoading: true });
    try {
      await authService.resendVerificationEmail();
      set({ isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  trustDevice: (sessionId) => {
    set((state) => ({ sessions: state.sessions.map((s) => s.id === sessionId ? { ...s, isTrusted: true } : s) }));
  },

  removeSession: (sessionId) => {
    set((state) => ({ sessions: state.sessions.filter((s) => s.id !== sessionId) }));
  },

  clearOnboarding: () => set({ onboardingData: defaultOnboarding }),
}));