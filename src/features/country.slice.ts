import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://restcountries.com/v2";

export type Currency = {
    code: string;
    name: string;
    symbol: string;
};

export type Language = {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
};

export interface Country {
    name: string;
    alpha3code: string;
    population: number;
    region: string;
    capital: string;
    flags: {
        svg: string;
        png: string;
    };
    nativeName: string;
    languages: Language[];
    currencies: Currency[];
    borders: Array<string>;
    topLevelDomain: Array<string>;
    subregion: string;
}

export const countryApiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`,
    }),
    endpoints: (builder) => ({
        fetchCountries: builder.query<Country[], unknown>({
            query: (region) =>
                typeof region === "string" ? `${region}` : "/all",
            transformResponse: (
                response: Country[],
                meta: unknown,
                arg: string | number
            ) => {
                console.log(arg);

                if (typeof arg === "string") {
                    return response;
                }

                return response?.slice(0, arg);
            },
        }),
        fetchCountry: builder.query<Country, string | void>({
            query: (region) => `/name/${region}`,
        }),
        fetchAlpha: builder.query<Country, string | void>({
            query: (code) => `/alpha/${code}`,
            transformResponse: (response: Country) => response,
        }),
    }),
});

export const {
    useFetchCountriesQuery,
    useFetchCountryQuery,
    useFetchAlphaQuery,
} = countryApiSlice;
