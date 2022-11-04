import styled from "@emotion/styled"
import { SelectChangeEvent } from "@mui/material"
import { ChangeEvent  , useEffect, useState } from "react"
import CountryCard from "../components/country-card"
import Filter from "../components/filter"
import Header from "../components/header"
import type { Theme } from '@mui/material/styles'
import { useFetchCountriesQuery } from "./country.slice"
import { useNavigate } from "react-router-dom"

const Container = styled('div')(({theme}: {theme?: Theme}) => ({
  width: '100%',
  height: '100%',
  // overflow: 'hidden',

  backgroundColor: theme!.palette.background.default,
  paddingBottom: 30
}))

const Home = () => {
  const [continent, setContinent] = useState('');
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  const navigate = useNavigate()
  const { data = [], isFetching } = useFetchCountriesQuery(query)

  const handleFilter = (event: SelectChangeEvent) => {
    if(search.length) setSearch('')
    setContinent(event.target.value);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    if (!query) return setSearch("")
    if(continent.length) setContinent('')
    setSearch(query)
  }

  const handleNavigation = (name: string) => {
    navigate(`/country-details/${name}`)
  }

  useEffect(() => {
    if (search.length) {
      setQuery(`/name/${search}`)
    } else {
      setQuery(`/region/${continent}`)
    }
  }, [continent, search])
  

  return (
    <Container>
        <Header />
        <Filter search={search} handleSearch={handleSearch} filter={continent} handleFilter={handleFilter} />
        <CountryCard handleNavigation={handleNavigation} countries={data} n={8} loading={isFetching} />
    </Container>
  )
}

export default Home