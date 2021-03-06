import { createTheme } from "@material-ui/core/styles";
import {
  CenturyGothicRegular,
  OpenSansRegular,
  SpartanBold,
  SpartanMedium,
  SpartanRegular,
} from "./fontFamily";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { alpha } from "@material-ui/core";

const PRIMARY_COLOR = "#0075C9";
const SECONDARY_COLOR = "#FFFFFF";
const ACTION_HOVER_OPACITY = 0.17;
const breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1500,
    xl: 1920,
  },
});

const mainTheme = createTheme({
  breakpoints,
  typography: {
    fontFamily: ['"Spartan"', '"Century Gothic"', '"Open Sans"', "Roboto"].join(
      ","
    ),
    h1: {
      fontSize: 57,
      fontWeight: 800,
      color: "#666666",
    },
    h2: {
      fontSize: 40,
      fontWeight: 800,
    },
    h3: {
      fontSize: 23,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: 27,
      fontWeight: 300,
    },
    h5: {
      fontSize: 22,
      fontWeight: 300,
    },
    h6: {
      fontSize: 20,
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: "bold",
      lineHeight: "normal",
      color: "#333238",
      paddingBottom: "1rem",
    },
    subtitle2: {
      color: "#4D4D4D",
      fontWeight: 600,
      paddingBottom: ".5rem",
      opacity: 0.5,
      fontSize: 17,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 14.5,
      fontWeight: 300,
    },
    caption: {
      fontSize: 12.8,
      fontWeight: "normal",
    },
  },
  palette: {
    general: {
      main: "#ffffff",
      light: "#E7EDF0",
      dark: "rgb(20, 41, 78)",
      contrastText: "#4D4D4D",
      contrastTextLess: "rgba(94, 94, 94, 0.5)",
    },
    primary: {
      main: PRIMARY_COLOR,
      light: "#D9DCE1",
      dark: "#333238",
      contrastText: "#4D4D4D",
      contrastTextLess: "#666666",
    },
    secondary: {
      main: SECONDARY_COLOR,
      light: "#DDF4FA",
      dark: "#202D36",
      contrastText: "#fefeff",
    },
    icon: {
      logo: "#2F7BC4",
      menu: "#BCD1D8",
      menuFill: "#303333",
    },
    card: {
      basic: "#57C9E8",
      middle: "#008996",
      premium: "#0075C9",
      green: "#5AA996",
      gray: "#8F9595",
    },
    button: {
      primary: "#0075C9",
      secondary: "#CCCCCC",
      tertiary: "#BDD1D8",
    },
    sider: {
      primary: "#CCCCCC",
      secondary: "#395062",
      tertiary: "#2675CA",
      quaternary: "#5D6673",
      light: "#F2F9FF",
      dark: "#263947",
    },
    action: {
      hoverOpacity: ACTION_HOVER_OPACITY,
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        [breakpoints.down("md")]: {
          fontSize: 50,
        },
      },
      colorPrimary: {
        color: SECONDARY_COLOR,
      },
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          SpartanRegular,
          SpartanMedium,
          SpartanBold,
          CenturyGothicRegular,
          OpenSansRegular,
        ],
      },
    },

    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: "rgb(250, 250, 250)",
        color: "rgb(0, 117, 201)",
      },
      data: {
        color: "rgb(0, 117, 201)",
        fontWeight: "normal",
      },
    },
    MuiSvgIcon: {
      colorPrimary: {
        color: SECONDARY_COLOR,
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#0075c9",
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: "rgba(255, 255, 255, 0.54)",
      },
      toolbarBtnSelected: {
        color: "#ffffff",
      },
    },

    MuiPickersYear: {
      root: {
        "&:focus": {
          color: "#0075C9",
          opacity: 0.5,
        },
      },
      yearSelected: {
        color: "#0075C9",
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#0075C9",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#0075C9",
          opacity: 0.5,
        },
      },
      current: {
        color: "#0075C9",
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        textAlign: "center",
        fontSize: 15,
        fontWeight: 600,
        //"&:hover": {
        //  backgroundColor: "#0075C9",
        //  webkitBoxShadow: "0 0 0 30px blue inset !important",
        //  opacity: 0.5,
        //},
      },
      textPrimary: {
        //"&:hover": {
        //  backgroundColor: "#0075C9",
        //  webkitBoxShadow: "0 0 0 30px blue inset !important",
        //  opacity: 0.5,
        //},
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 0,
      },
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#98C0C6",
        },
        lineHeight: "inherit",
      },
    },
    MuiFormControlLabel: {
      root: {
        alignItems: "flex-start",
      },
    },
    MuiFormControl: {
      root: {
        minWidth: "100%",
        width: "100%",
        overflow: "hidden",
      },
    },
    MuiFilledInput: {
      root: {
        border: "1px solid #e2e2e1",
        overflow: "hidden",
        borderRadius: "0px !important",
        backgroundColor: "#fcfcfb",
        "&:hover": {
          backgroundColor: "#fff",
        },
        "&$focused": {
          backgroundColor: "#fff",
          borderColor: "#DDF4FA",
          borderWidth: 1,
        },
      },
      input: {
        borderRadius: 0,
        background: "transparent",
        fontSize: 15,
      },
      underline: {
        "&&&:before": {
          borderBottom: "none",
        },
        "&&:after": {
          borderBottom: "none",
        },
      },
    },
    MuiCheckbox: {
      root: {
        color: `${PRIMARY_COLOR} !important`,
        checked: {
          color: PRIMARY_COLOR,
        },
      },
    },
    MuiInputBase: {
      root: {
        height: "auto",
        borderRadius: 0,
      },
      input: {
        borderRadius: 0,
        "&:hover": {
          borderColor: "#DDF4FA",
        },
        "&$focused": {
          borderColor: "#DDF4FA",
        },
      },
    },
    MuiInput: {
      underline: {
        "&&&:before": {
          borderBottom: "none",
        },
        "&&:after": {
          borderBottom: "none",
        },
      },
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#98C0C6",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderColor: "#98C0C6",
          },
        },
        "&$focused $notchedOutline": {
          borderColor: "#98C0C6",
          webkitBoxShadow: "0 0 0 30px blue inset !important",
          borderWidth: 2,
        },
      },
    },
    //MuiSelect: {
    //  iconFilled: {
    //    color: PRIMARY_COLOR,
    //  },
    //},
    MuiListItemIcon: {
      root: {
        [breakpoints.down("sm")]: {
          minWidth: "35px",
        },
      },
    },
    MuiSwitch: {
      colorSecondary: {
        "&.Mui-checked": {
          color: PRIMARY_COLOR,
          "&:hover": {
            backgroundColor: alpha(PRIMARY_COLOR, ACTION_HOVER_OPACITY),
          },
        },
        "&.Mui-checked + .MuiSwitch-track": {
          backgroundColor: PRIMARY_COLOR,
          "&:hover": {
            backgroundColor: alpha(PRIMARY_COLOR, ACTION_HOVER_OPACITY),
          },
        },
      },
    },
    MUIDataTableFilter: {
      resetLink: {
        backgroundColor: "rgb(0, 117, 201)",
        color: "white",
        "&:hover": {
          webkitBoxShadow: "0 0 0 30px blue inset !important",
          backgroundColor: "rgb(0, 117, 201)",
          opacity: 0.5,
        },
      },
    },
  },
});

export default mainTheme;
