import { Button } from "@mui/material";
import { styled, Theme } from "@mui/system";
import { FC, ReactElement } from "react";
import { useFetchAlphaQuery, Country } from "../features/country.slice";

const Btn = styled(Button)(({ theme } : {theme?: Theme}) => ({
    color: `${theme!.palette.text.primary}`,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  }))

const BorderCapital: FC<{ query: string}> = ({ query }): ReactElement => {
    const { data, isFetching } = useFetchAlphaQuery<{ data: Country, isFetching: boolean }>(query)   

    return data && !isFetching ? (
        <Btn variant="contained">{data.name}</Btn>
    ) : <></>
};

export default BorderCapital;
