import { FC, ReactElement, ChangeEventHandler, CSSProperties, HTMLAttributes } from 'react'
import TextField from "@mui/material/TextField"
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type InputProps = {
    handleChange?: ChangeEventHandler<HTMLInputElement>,
    focus?: boolean,
    label?: string,
    name?: string,
    value?: string | number,
    type?: string,
    errors?: boolean,
    i?: number,
    placeholder?: string,
    props?: CSSProperties | HTMLAttributes<typeof TextField>
}

const Input: FC<InputProps> = ({ handleChange, focus, label, name, value, type, errors, i, ...props }): ReactElement => (
        <TextField
            autoFocus={focus}
            margin="dense"
            id={name}
            name={name}
            label={label ?? ""}
            type={type}
            value={value}
            fullWidth
            variant="outlined"
            onChange={handleChange}
            error={errors}
            helperText={errors ? 'This field can not be blank' : ''}
            inputProps={{ style: { fontSize: 18 }, maxLength: i && i === 2 ? 11 : 255 }}
            InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
            InputLabelProps={{ style: { fontSize: 18 } }}
            FormHelperTextProps={{
                style: {
                    fontSize: '1.2rem'
                }
            }}
            required
            {...props}
        />
)

Input.defaultProps = {
    focus: false,
    name: "",
    label: "",
    value: "",
    type: "text"
}

export default Input