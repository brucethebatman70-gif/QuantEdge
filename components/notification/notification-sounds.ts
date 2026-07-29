"use client";

import type { NotificationType } from "./notification-types";
import { NOTIFICATION_SOUNDS } from "./notification-types";

const audioCache = new Map<string, HTMLAudioElement>();

function getAudio(src: string): HTMLAudioElement | null {
  if (audioCache.has(src)) return audioCache.get(src)!;
  try {
    const audio = new Audio(src);
    audio.volume = 0.3;
    audioCache.set(src, audio);
    return audio;
  } catch {
    return null;
  }
}

export function playNotificationSound(
  type: NotificationType,
  enabled: boolean
) {
  if (!enabled) return;

  const soundMap: Partial<Record<NotificationType, string>> = {
    success: NOTIFICATION_SOUNDS.success,
    warning: NOTIFICATION_SOUNDS.warning,
    critical: NOTIFICATION_SOUNDS.critical,
    risk_alert: NOTIFICATION_SOUNDS.critical,
    ai_insight: NOTIFICATION_SOUNDS.ai_insight,
    psychology_alert: NOTIFICATION_SOUNDS.warning,
    goal_achievement: NOTIFICATION_SOUNDS.success,
    trade_alert: NOTIFICATION_SOUNDS.success,
  };

  const src = soundMap[type];
  if (!src) return;

  const audio = getAudio(src);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}
