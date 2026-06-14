export interface WebsiteSettings {
  id?: string;
  _id?: string;
  enableCursorEffects: boolean;
  enableMarqueeBar: boolean;
  enableHomepageAnimations: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SettingsResponse {
  success: boolean;
  data: WebsiteSettings;
}
