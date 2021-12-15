export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

const mobileBreakpoint = breakpoints.sm;

export const mqChain = (...args: string[])=>{
  let res = args[0];
  for (let i = 1; i < args.length; i++) {
    res += " and " + args[i].replace(/^@media/gi, "");
  }
  return res;
}

export const mq = {
  mobile: `@media (min-width: ${mobileBreakpoint}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  xxl: `@media (min-width: ${breakpoints.xxl}px)`,
  custom: (x: number)=>`@media (min-width: ${x}px)`,
  customMaxH: (x: number)=>`@media (max-height: ${x}px)`,
  customMinH: (x: number)=>`@media (min-height: ${x}px)`
}

export const mqCustom = (w: number)=>{
  return `@media (min-width: ${w}px)`;
}

export const theme = {
  primary: "",
  secondary: "",
  blue: "#4a8cc9",
  darkblue: "#0b4d89",
  lightblue: "#b4dbff",
  primaryorange: "#FFB443",
  darkbrown: "#523A28"
}

export const cssVariables = {
  maxWidth: "480px",
  headerHeight: "75px",
  navHeight: "85px",
}