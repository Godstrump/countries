import styled from "@emotion/styled"
import { SelectChangeEvent } from "@mui/material"
import { ChangeEvent  , useCallback, useState } from "react"
import CountryCard from "../components/country-card"
import Filter from "../components/filter"
import Header from "../components/header"
import type { Theme } from '@mui/material/styles'
import { Countries, Query, useFetchCountriesQuery } from "./country.slice"
import { useNavigate } from "react-router-dom"
import PaginationMod from "../components/pagination"

const Container = styled('div')(({theme}: {theme?: Theme}) => ({
  width: '100%',
  height: '100vh',
  // overflowX: 'hidden',

  backgroundColor: theme!.palette.background.default,
  paddingBottom: 100
}))

const Home = () => {
  const navigate = useNavigate()

  const [continent, setContinent] = useState('');
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState<Query>({ skip: 0, limit: 20, query: '' })
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isFetching } = useFetchCountriesQuery<{data: Countries, isFetching: boolean}>(query)

  const handleFilter = (event: SelectChangeEvent) => {
    const filter = event.target.value
    if(search.length) setSearch('')
    setContinent(event.target.value);
    if (!filter?.length && filter?.trim() === '' && !filter) {
      return setQuery((state: Query) => ({ ...state, query: '' }))
    }
    setQuery((state: Query) => ({ ...state, query: `/region/${filter}` }))
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    if(continent.length) setContinent('')
    setSearch(query)
    if (!query?.length && query?.trim() === '' && !query) {
      return setQuery((state: Query) => ({ ...state, query: '' }))
    }
    setQuery((state: Query) => ({ ...state, query: `/name/${query}` }))
  }

  const handleNavigation = (name: string) => {
    navigate(`/country-details/${name}`)
  }  

  const handlePage = useCallback((event: ChangeEvent<unknown>, page: number) => {    
    if (page === 1) {
      setQuery((state) => ({ ...state, skip: 0, limit: 20 }))
    } else {
      setQuery((state) => ({ ...state, skip: (page - 1) * 20 , limit: 20 * page }))
    }
    setCurrentPage(page)
  }, []) 
  
  const handleCount = (size: number): number => isNaN(size) ? 1 : Math.ceil(size/20)

  return (
    <Container>
        <Header />
        <Filter search={search} handleSearch={handleSearch} filter={continent} handleFilter={handleFilter} />
        <CountryCard handleNavigation={handleNavigation} countries={data?.data} n={8} loading={isFetching} />
        <PaginationMod handleChange={handlePage} page={currentPage} count={handleCount(data?.totalSize)} />
    </Container>
  )
}

export default Home