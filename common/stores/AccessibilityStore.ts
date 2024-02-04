import { webpack } from "replugged";
import type { flux as Flux } from "replugged/common";

interface AccessibilityState {
  alwaysShowLinkDecorations: boolean;
  colorblindMode: boolean;
  contrast: number;
  desaturateUserColors: boolean;
  fontSize: number;
  forcedColorsModalSeen: boolean;
  keyboardModeEnabled: boolean;
  keyboardNavigationExplainerModalSeen: boolean;
  lowContrastMode: boolean;
  messageGroupSpacing: number | null;
  prefersReducedMotion: "auto" | "no-preference" | "reduce";
  roleStyle: "username" | "dot" | "hidden";
  saturation: number;
  submitButtonEnabled: boolean;
  syncForcedColors: boolean;
  syncProfileThemeWithUserTheme: boolean;
  systemForcedColors: "active" | "none";
  systemPrefersContrast: "no-preference" | "more" | "less";
  systemPrefersCrossfades: boolean;
  systemPrefersReducedMotion: "no-preference" | "reduce";
  zoom: number;
}

export declare class AccessibilityStore extends Flux.PersistedStore {
  public getUserAgnosticState: () => AccessibilityState;

  public get alwaysShowLinkDecorations(): boolean;
  public get colorblindMode(): boolean;
  public get contrast(): number;
  public get desaturateUserColors(): boolean;
  public get fontScale(): number;
  public get fontScaleClass(): string;
  public get fontSize(): number;
  public get forcedColorsModalSeen(): boolean;
  public get isFontScaledDown(): boolean;
  public get isFontScaledUp(): boolean;
  public get isMessageGroupSpacingDecreased(): boolean;
  public get isMessageGroupSpacingIncreased(): boolean;
  public get isSubmitButtonEnabled(): boolean;
  public get isZoomedIn(): boolean;
  public get isZoomedOut(): boolean;
  public get keyboardModeEnabled(): boolean;
  public get keyboardNavigationExplainerModalSeen(): boolean;
  public get lowContrastMode(): boolean;
  public get messageGroupSpacing(): number;
  public get rawPrefersReducedMotion(): "auto" | "no-preference" | "reduce";
  public get roleStyle(): "username" | "dot" | "hidden";
  public get saturation(): number;
  public get syncForcedColors(): boolean;
  public get syncProfileThemeWithUserTheme(): boolean;
  public get systemForcedColors(): "active" | "none";
  public get systemPrefersContrast(): "no-preference" | "more" | "less";
  public get systemPrefersCrossfades(): boolean;
  public get systemPrefersReducedMotion(): "no-preference" | "reduce";
  public get useForcedColors(): boolean;
  public get useReducedMotion(): boolean;
  public get zoom(): number;
}

export default webpack.getByStoreName<AccessibilityStore>("AccessibilityStore")!;
