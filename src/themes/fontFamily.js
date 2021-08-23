import fileSpartanRegular from "../assets/fonts/Spartan/Spartan-Regular.ttf";
import fileSpartanMedium from "../assets/fonts/Spartan/Spartan-Medium.ttf";
import fileSpartanBold from "../assets/fonts/Spartan/Spartan-Bold.ttf";
import fileCenturyGothicRegular from "../assets/fonts/Century-Gothic/Century Gothic.ttf";
import fileOpenSansRegular from "../assets/fonts/Open-Sans/OpenSans-Regular.ttf";

export const SpartanRegular = {
  fontFamily: "Spartan",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  src: `
   local('Spartan'),
   local('Spartan-Regular'),
   url(${fileSpartanRegular}) format('truetype')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

export const SpartanMedium = {
  fontFamily: "Spartan",
  fontStyle: "medium",
  fontDisplay: "swap",
  fontWeight: "600",
  src: `
   local('Spartan'),
   local('Spartan-Medium'),
   url(${fileSpartanMedium}) format('truetype')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

export const SpartanBold = {
  fontFamily: "Spartan",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "800",
  src: `
   local('Spartan'),
   local('Spartan-Bold'),
   url(${fileSpartanBold}) format('truetype')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

export const CenturyGothicRegular = {
  fontFamily: "Century Gothic",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  src: `
   local('Century Gothic'),
   url(${fileCenturyGothicRegular}) format('truetype')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

export const OpenSansRegular = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  src: `
   local('Open Sans'),
   url(${fileOpenSansRegular}) format('truetype')
 `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};
