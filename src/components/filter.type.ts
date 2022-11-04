import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";

type FilterProps = {
    filter?: string;
    search?: string;
    handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFilter?: ((event: SelectChangeEvent<string>) => void) | undefined;
};

export default FilterProps;
