import { FC, ReactElement } from "react";
import { FormControl, MenuItem, styled } from "@mui/material"
import Select from '@mui/material/Select';
import type { Theme } from '@mui/material/styles'
import FilterProps from "./filter.type";

const Control = styled(FormControl)(({theme} : {theme?: Theme}) => ({
    width: '25%',
    '& fieldset': {
        display: 'none'
    },

    '& div': {
        backgroundColor: theme!.palette.primary.main,
        boxShadow: '-4px 12px 8px -14px rgba(0,0,0,1',
        border: 'none',
        outline: 'none',
    },
}))

const SelectInput: FC<FilterProps> = ({ filter, handleFilter }): ReactElement => (
    <Control fullWidth>
        <Select
            displayEmpty
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          onChange={handleFilter}
        >
        <MenuItem disabled value="">Filter by Region</MenuItem>
          {['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((region) => 
        <MenuItem key={region} value={region}>{region}</MenuItem>)}
        </Select>
      </Control>
  )

export default SelectInput