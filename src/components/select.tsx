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
        boxShadow: `0px 0px 2px .1px ${theme?.palette.background.bs}`,
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
          {['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((region: string, idx: number) => 
        <MenuItem key={region} value={idx === 0 ? '' : region}>{region}</MenuItem>)}
        </Select>
      </Control>
  )

export default SelectInput