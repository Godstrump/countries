import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { FC, ReactElement } from "react"
import FilterProps from "./filter.type"
import Input from "./input"
import type { Theme } from '@mui/material/styles'

const Wrapper = styled(Box)(({theme} : {theme?: Theme}) => ({
    width: '35%',
    '& fieldset': {
        display: 'none'
    },
    '& div': {
        backgroundColor: theme?.palette.primary.main,
        boxShadow: `0px 0px 2px .1px ${theme?.palette.background.bs}`,
        border: 'none',
        outline: 'none',
    },

    [theme!.breakpoints.down('sm')]: {
        width: '100%'
    }
}))

const Search: FC<FilterProps> = ({ search, handleSearch }): ReactElement=> (
    <Wrapper>
        <Input name="search" placeholder="Search for a country" type="search" value={search} handleChange={handleSearch} />
    </Wrapper>
  )

export default Search