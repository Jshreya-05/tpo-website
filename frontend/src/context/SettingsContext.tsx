import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { fetchSettings } from '../services/api';
import type { WebsiteSettings } from '../types/settings';

const defaultSettings: WebsiteSettings = {
  enableCursorEffects: true,
  enableMarqueeBar: true,
  enableHomepageAnimations: true,
};

interface SettingsContextValue extends WebsiteSettings {
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue>({
  ...defaultSettings,
  loading: true,
  refreshSettings: async () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refreshSettings = useCallback(async () => {
    try {
      const { data } = await fetchSettings();
      setSettings({
        enableCursorEffects: data.enableCursorEffects ?? true,
        enableMarqueeBar: data.enableMarqueeBar ?? true,
        enableHomepageAnimations: data.enableHomepageAnimations ?? true,
      });
    } catch {
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSettings();

    const handleUpdate = () => {
      refreshSettings();
    };

    window.addEventListener('settingsUpdated', handleUpdate);
    return () => window.removeEventListener('settingsUpdated', handleUpdate);
  }, [refreshSettings]);

  useEffect(() => {
    document.body.classList.toggle('animations-disabled', !settings.enableHomepageAnimations);
  }, [settings.enableHomepageAnimations]);

  return (
    <SettingsContext.Provider value={{ ...settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
