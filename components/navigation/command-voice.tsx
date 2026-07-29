"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/lib/icons";

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

interface CommandVoiceProps {
  open: boolean;
  onResult: (text: string) => void;
  onClose: () => void;
}

export function CommandVoice({ open, onResult, onClose }: CommandVoiceProps) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        }
      }
      if (final) {
        setTranscript(final);
        onResult(final);
        onClose();
      }
    };

    recognition.onerror = () => {
      setListening(false);
      onClose();
    };

    recognitionRef.current = recognition;
  }, [onResult, onClose]);

  useEffect(() => {
    if (open && recognitionRef.current) {
      setListening(true);
      setTranscript("");
      try { recognitionRef.current.start(); } catch {}
    }
    if (!open && recognitionRef.current) {
      setListening(false);
      try { recognitionRef.current.stop(); } catch {}
    }
  }, [open]);

  const isSupported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
          <motion.div
            className="relative flex flex-col items-center gap-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Icons.Mic className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              </motion.div>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/20"
                  animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>

            <p className="text-sm text-muted-foreground/80">
              {transcript || "Listening..."}
            </p>

            <button
              onClick={onClose}
              className="text-[11px] text-muted-foreground/40 hover:text-muted-foreground/80 transition-colors"
            >
              {isSupported ? "Click to stop" : "Voice search not supported"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
