import { memo } from 'react'
import { Box, Button, Skeleton, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
import { Stack } from '@mui/system'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import { Country, Currency, Language, useFetchCountryQuery } from "./country.slice"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import BorderCapital from '../components/border-capital'

const Container = styled(Box)(({ theme } : {theme?: Theme}) => ({
  width: '100%',
  height: '100vh',
  // overflowX: 'hidden',
  paddingBottom: 100,
  
  backgroundColor: theme!.palette.background.default,
  [theme!.breakpoints.down('md')]: {
    height: 'unset'
  }
}))

const Body = styled(Box)(({ theme }: { theme?: Theme }) => ({
  display: 'flex',
  paddingLeft: 80,
  paddingRight: 80,
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 70,
  flexWrap: "wrap",

  [theme!.breakpoints.down('sm')]: {
    paddingLeft: 50,
    paddingRight: 50,
  },

  [theme!.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}))

const Image = styled(Box)(({ theme } : {theme?: Theme}) => ({
  display: 'flex',
  width: '40%',
  boxShadow: `0px 7px 10px -6px ${theme!.palette.background.bs}`,

  [theme!.breakpoints.down('md')]: {
    width: '90%'
  }
}))

const InfoContainer = styled(Box)(({ theme } : { theme?: Theme }) => ({
  width: '50%',
  [theme!.breakpoints.down('md')]: {
    marginTop: 30,
    width: '90%'
  }
}))

const InfoHeader = styled(Typography)(({theme} : {theme?: Theme}) => ({
  fontWeight: theme!.fonts.weights.eb,
  color: theme!.palette.text.primary,
  marginBottom: 30
})) as typeof Typography

const Infos = styled(Stack)(({ theme } : {theme?: Theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  [theme!.breakpoints.down('md')]: {
    width: '100%',
    marginTop: 30,
    justifyContent: 'flex-start',
    gap: 30
  }
}))

const Text = styled(Typography)(({theme} : {theme?: Theme}) => ({
  color: theme!.palette.text.primary,
  fontWeight: theme!.fonts.weights.sb,
  fontSize: 14,
  '& span': {
    fontWeight: theme!.fonts.weights.light
  }
})) as typeof Typography

const BkBtn = styled(Button)(({ theme } : {theme?: Theme}) => ({
  color: `${theme!.palette.text.primary}`,
  display: 'flex',
  alignItems: 'center',
  marginTop: 80, 
  marginLeft: "80px", 
  gap: 10,

  [theme!.breakpoints.down('sm')]: {
    marginTop: 80, 
    marginLeft: 50
},
}))

const BorderContainer = styled(Stack)(({ theme } : { theme?: Theme }) => ({
  display: 'flex',
  gap: 30,
  marginTop: 50, 
  flexDirection: 'row',
  alignItems: 'center',
  
  [theme!.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },

  [theme!.breakpoints.down('md')]: {
    width: '100%',
  },

}))

const Borders = styled(Stack)(({ theme }: { theme?: Theme }) => ({
  display: 'flex', 
  flexDirection: 'row',
  justifyContent: 'flex-start', 
  // alignItems: 'center', 
  gap: 10, 
  alignSelf: 'self-start', 
  flexWrap: 'wrap',
}))

const Details = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { data = [], isFetching } = useFetchCountryQuery<{ data: Country[], isFetching: boolean }>(`${pathname?.split('/')[2]}`) 
  
  
  return !isFetching && data.length ? (
    <Container>
      <Header />
      <BkBtn onClick={() => navigate(-1)} variant="contained">
        <KeyboardBackspaceIcon />
        Back
      </BkBtn>
      <Body>
        <Image>
          <img width={'100%'} src={data[0]?.flags.svg} alt={data[0].name} />
        </Image>
        <InfoContainer>
          <InfoHeader variant="h5">{data[0]?.name}</InfoHeader>
          <Infos direction="row">
            <Stack direction="column" spacing={1}>
              <Text variant='h6'>Native Name: <Text component="span" variant="subtitle1">{data[0]?.nativeName}</Text></Text>
              <Text variant='h6'>Population: <Text component="span" variant="subtitle1">{data[0]?.population}</Text></Text>
              <Text variant='h6'>Region: <Text component="span" variant="subtitle1">{data[0]?.region}</Text></Text>
              <Text variant='h6'>Sub Region: <Text component="span" variant="subtitle1">{data[0]?.subregion}</Text></Text>
              <Text variant='h6'>Capital: <Text component="span" variant="subtitle1">{data[0]?.capital}</Text></Text>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Text>Top Level Domain: <Text component="span" variant="subtitle1">{data[0]?.topLevelDomain}</Text></Text>
              <Text>Currencies: {data[0]?.currencies.length && data[0]?.currencies?.map((currency: Currency, idx: number, arr: Currency[]) => <Text key={currency?.name} component="span" variant="subtitle1">{idx === (arr.length - 1) ? currency?.name : `${currency?.name}, `}</Text>)}</Text>
              <Text>Languages: {data[0]?.languages.length && data[0]?.languages?.map((language: Language, idx: number, arr: Language[]) => <Text key={language?.name} component="span" variant="subtitle1">{idx === (arr.length - 1) ? language?.name : `${language?.name}, `}</Text>)}</Text>
            </Stack>
          </Infos>
          <BorderContainer>
            <Text sx={{ minWidth: "max-content", color: 'text.primary', flex: '0 0 1'}}>Border Countries: </Text>
            <Borders>
              {data[0]?.borders && data[0].borders.map((border: string) => <BorderCapital key={border} query={border} />)}
            </Borders>
          </BorderContainer>
        </InfoContainer>
      </Body>
    </Container>
  ) : <Container>
        <Header />
        <Body>
          <Image>
            <Skeleton
              animation="wave"
              width={'100%'}
              height={400}
              variant="rectangular" />
          </Image>
          <InfoContainer>
            <InfoHeader variant="h5"><Skeleton animation="wave" width="50%" /></InfoHeader>
            <Infos direction="row">
              <Stack direction="column" spacing={1}>
                <Skeleton animation="wave" width={200} />
                <Skeleton animation="wave" width={200} />
                <Skeleton animation="wave" width={200} />
                <Skeleton animation="wave" width={200} />
                <Skeleton animation="wave" width={200} />
              </Stack>
              <Stack direction="column" spacing={1}>
                <Skeleton animation="wave" width={200} />
                <Skeleton animation="wave" width={200} />
                <Skeleton animation="wave" width={200} />
              </Stack>
            </Infos>
            <BorderContainer>
              <Skeleton animation="wave" width={500} />
            </BorderContainer>
          </InfoContainer>
        </Body>
      </Container>
}

export default memo(Details)