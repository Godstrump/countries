import { FC, ReactElement } from "react"
import { Pagination, Stack, styled, Theme } from "@mui/material"
import { PaginationProps } from "./filter.type"

const Container = styled(Stack)(({ theme } : { theme?: Theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme!.palette.background.default,
    paddingBottom: 30
}))

const PaginationMod: FC<PaginationProps> = ({ page, handleChange, count }): ReactElement => {
    return (
        <Container spacing={2}>
            <Pagination count={count} page={page ?? 0} onChange={handleChange} variant="outlined" shape="rounded" />
        </Container>
    )
}

export default PaginationMod
