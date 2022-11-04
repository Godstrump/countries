import { PaletteMode, PaletteOptions, ThemeOptions } from "@mui/material";

interface PaletteInterface extends PaletteOptions {
    mode: PaletteMode;
    primary: {
        main: string;
    };
    background: {
        default: string;
        bs: string;
    };
    text: {
        primary: string;
    };
}

export interface ThemeInterface extends ThemeOptions {
    palette: PaletteInterface;
    fonts: {
        home: number;
        details: number;
        type: string;
        weights: {
            light: number;
            sb: number;
            eb: number;
        };
    };
}

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: {
                      main: "#ffffff",
                  },
                  background: {
                      default: "#fafafa",
                      bs: "rgba(173,173,173,1)",
                  },
                  text: {
                      primary: "#111517",
                  },
                  // input: "#858585",
              }
            : {
                  // palette values for dark mode
                  primary: {
                      main: "#2b3945",
                  },
                  background: {
                      default: "#202c37",
                      bs: "rgba(0,0,0,0.95)",
                  },
                  text: {
                      primary: "#fff",
                  },
              }),
    },
    fonts: {
        home: 14,
        details: 16,
        type: "Nunito Sans",
        weights: {
            light: 300,
            sb: 600,
            eb: 800,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 1100,
            lg: 1600,
        },
    },
});

export default getDesignTokens;
