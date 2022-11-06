import styled from "@emotion/styled"
import { Box, Card, CardContent, CardMedia, Skeleton, Stack, Typography } from "@mui/material"
import { FC, ReactElement } from "react"
import { Country } from "../features/country.slice"
import type { Theme } from '@mui/material/styles'
import Lottie from 'lottie-react';
import Error from '../assets/error.json'

const Wrapper = styled(Box)(({theme} : {theme?: Theme}) => ({
    marginTop: 50,
    display: "grid",
    gridTemplateColumns: 'repeat(4, auto)',
    justifyContent: "center", 
    flexWrap: "wrap",
    gap: 80,

    paddingLeft: 80,
    paddingRight: 80,
    paddingBottom: 50,
    backgroundColor: theme!.palette.background.default,

    [theme!.breakpoints.down('sm')]: {
        paddingLeft: 50,
        paddingRight: 50,
    },

    [theme!.breakpoints.down(1366)]: {
        display: "flex",
        flexWrap: "wrap",
    }
}))

const CountryCard = styled(Card)(({ theme }: {theme?: Theme}) => ({
    maxWidth: 374,
    backgroundColor: theme?.palette.primary.main,
    cursor: 'pointer',

    [theme!.breakpoints.down(1366)]: {
        width: 374
    },

    [theme!.breakpoints.up("lg")]: {
        minWidth: 374
    }
})) as typeof Card

const CountryName = styled(Typography)(({ theme }: { theme?: Theme}) => ({
    fontSize: 16,
    fontFamily: theme!.fonts.type,
    fontWeight: theme!.fonts.weights.sb
})) as typeof Typography


const CountryDetail = styled(Typography)(({ theme }: {theme?: Theme}) => ({
    fontSize: 15,
    fontFamily: theme!.fonts.type,
    fontWeight: theme!.fonts.weights.light,
})) as typeof Typography

const ErrorLottie = styled(Lottie)(({theme} : {theme?: Theme}) => ({
    width: 180, 
    transform: 'translate(66%)',

    [theme!.breakpoints.down(1366)]: {
        transform: 'translate(0%)',
    }
})) as typeof Lottie

type CountryCardType = {
    countries: Country[],
    n: number,
    loading: boolean
    handleNavigation: (name: string) => void
}

const CountryCards: FC<CountryCardType> = ({ countries, n, loading, handleNavigation }): ReactElement => (
        <Wrapper>
            {
               countries && !countries?.length ? <ErrorLottie animationData={Error} /> : (loading ? Array.from(new Array(n)) : countries)?.map(
                    (country, index) => (
                        <CountryCard key={index} onClick={() => handleNavigation(country.name)} className={country ? "animate__animated animate__fadeIn animate__delay-0.6s" : ""}>
                            {country ? (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        width="100%"
                                        image={country?.flags.svg}
                                    />
                                ): (
                                    <Skeleton
                                        animation="wave"
                                        width={500}
                                        height={200}
                                        variant="rectangular" />
                                )
                            }
                            {country ? (
                                <CardContent
                                sx={{ padding: '25 25 50 25' }}
                            >
                                <CountryName variant="h6" align="center" component="span">{country?.name}</CountryName>
                                <Stack
                                    sx={{ padding: 0, mt: '11px', pb: 2  }}
                                    direction="column"
                                    spacing={1}
                                >
                                    <CountryDetail variant="subtitle2">Population: {country?.population}</CountryDetail>
                                    <CountryDetail variant="subtitle2">Region: {country?.region}</CountryDetail>
                                    <CountryDetail variant="subtitle2">Capital: {country?.capital}</CountryDetail>
                                </Stack>
                            </CardContent>
                            ) : (
                                <CardContent
                                sx={{ padding: '25 25 50 25' }}
                                >
                                    <Skeleton animation="wave" width="90%" />
                                    <Stack
                                        sx={{ padding: 0, mt: '11px', pb: 2  }}
                                        direction="column"
                                        spacing={1}
                                    >
                                        <Skeleton animation="wave" width="90%" />
                                        <Skeleton animation="wave" width="90%" />
                                        <Skeleton animation="wave" width="90%" />
                                    </Stack>
                                </CardContent>
                            )}
                        </CountryCard>
                    ))
            }
        </Wrapper>
  )

export default CountryCards