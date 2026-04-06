import figmaTokens from "./figma-tokens.json";

type CssVars = Record<string, string>;

type FigmaTokens = {
  cssVars: CssVars;
};

const tokens = figmaTokens as unknown as FigmaTokens;

export const cssVars = tokens.cssVars;

export function getCssVarStyle() {
  // React allows CSS custom properties via style keys like "--color-bg".
  return cssVars;
}

