import { Button } from "@mui/material";
import { styled, Theme } from "@mui/system";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchAlphaQuery, Country } from "../features/country.slice";

const Btn = styled(Button)(({ theme } : {theme?: Theme}) => ({
    color: `${theme!.palette.text.primary}`,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textTransform: 'unset'
  }))

const BorderCapital: FC<{ query: string}> = ({ query }): ReactElement => {
    const { data, isFetching } = useFetchAlphaQuery<{ data: Country, isFetching: boolean }>(query)
    const navigate = useNavigate()
    
    const handleNavigation = (name: string) => {
        navigate(`/country-details/${name}`)
      }
    
    return data && !isFetching ? (
        <Btn onClick={() => handleNavigation(data.name)} variant="contained">{data.name}</Btn>
    ) : <></>
};

export default BorderCapital;
