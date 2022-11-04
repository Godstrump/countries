import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { FC, ReactElement } from 'react'
import FilterProps from './filter.type'
import Search from './search'
import SelectInput from './select'
import type { Theme } from '@mui/material/styles'

const Wrapper = styled(Box)(({theme} : {theme?: Theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 50,
    overflowX: 'hidden', 
    alignItems: 'center',

    paddingLeft: 80,
    paddingRight: 80,
    flexWrap: 'wrap',

    '& div:nth-of-type(2)': {
      [theme!.breakpoints.down('sm')]: {
        marginTop: 10,
        width: '60%',
      }
    },

    [theme!.breakpoints.down('sm')]: {
      paddingLeft: 50,
      paddingRight: 50,

      flexDirection: 'column',
      alignItems: 'unset'
    }
}))

const Filter: FC<FilterProps> = ({ filter, handleFilter, search, handleSearch }): ReactElement => {
  return (
    <Wrapper>
        <Search search={search} handleSearch={handleSearch} />
        <SelectInput handleFilter={handleFilter} filter={filter}  />
    </Wrapper>
  )
}

export default Filter