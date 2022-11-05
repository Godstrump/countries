import styled from "@emotion/styled"
import { SelectChangeEvent } from "@mui/material"
import { ChangeEvent  , useEffect, useState } from "react"
import CountryCard from "../components/country-card"
import Filter from "../components/filter"
import Header from "../components/header"
import type { Theme } from '@mui/material/styles'
import { Country, Query, useFetchCountriesQuery } from "./country.slice"
import { useNavigate } from "react-router-dom"
import useScrollPosition from "../utils/usescroll-position"

const Container = styled('div')(({theme}: {theme?: Theme}) => ({
  width: '100%',
  height: '100vh',
  // overflowX: 'hidden',

  backgroundColor: theme!.palette.background.default,
  paddingBottom: 100
}))

const Home = () => {
  const navigate = useNavigate()
  const scrollPosition = useScrollPosition()

  const [continent, setContinent] = useState('');
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState<Query>({ skip: 0, limit: 20, query: '' })

  const { data = [], isFetching } = useFetchCountriesQuery<{data: Country[], isFetching: boolean}>(query)

  const handleFilter = (event: SelectChangeEvent) => {
    if(search.length) setSearch('')
    setContinent(event.target.value);
    setQuery((state: Query) => ({ ...state, query: `/region/${event.target.value}` }))
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    if (!query) return setSearch("") 
    if(continent.length) setContinent('')
    setSearch(query)
    setQuery((state: Query) => ({ ...state, query: `/name/${query}` }))
  }

  const handleNavigation = (name: string) => {
    navigate(`/country-details/${name}`)
  }

  useEffect(() => {
    if (scrollPosition > 1699) {
      console.log('hello');
      
      setQuery((state) => ({ ...state, skip: state.skip + 20, limit: state.limit + 20 }))
    }
    
  }, [scrollPosition])

  return (
    <Container>
        <Header />
        <Filter search={search} handleSearch={handleSearch} filter={continent} handleFilter={handleFilter} />
        <CountryCard handleNavigation={handleNavigation} countries={data} n={8} loading={isFetching} />
    </Container>
  )
}

export default Home