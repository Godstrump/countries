import {
    Theme as MUITheme,
    ThemeOptions as MUIThemeOptions,
    PaletteOptions as MUIPaletteOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Theme extends MUITheme {
        palette: {
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
        };
        input: string;
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
    // allow configuration using `createTheme`
    interface ThemeOptions extends MUIThemeOptions {
        palette: {
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
            input?: string;
        };
        fonts?: {
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

    interface PaletteOptions extends MUIPaletteOptions {
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
    export function createTheme(options?: CustomThemeOptions): Theme;
}
