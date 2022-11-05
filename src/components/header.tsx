import styled from "@emotion/styled"
import Typography from "@mui/material/Typography"
import type { Theme } from '@mui/material/styles'
import { useTheme } from "@mui/system"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ColorModeContext from '../ColorModeContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled('div')(({ theme }: { theme?: Theme }) => ({
    height: theme?.spacing(10),
    boxShadow: `0px 0px 2px .5px ${theme!.palette.background.bs}`,
    backgroundColor: theme!.palette.primary.main,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 80,
    paddingRight: 80,

    [theme!.breakpoints.down('sm')]: {
      paddingLeft: 50,
      paddingRight: 50,
    }
}))

const Text = styled(Typography)(({ theme }: { theme?: Theme }) => ({
  fontFamily: theme!.fonts.type,
  color: theme!.palette.text.primary,
  fontWeight: theme!.fonts.weights.eb,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  [theme!.breakpoints.down('sm')]: {
    fontSize: '3.5vw'
  }
}))

const Icon =  styled(Typography)(({ theme }: { theme?: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,

  [theme!.breakpoints.down('sm')]: {
    fontSize: '2.5vw'
  }
})) as typeof Typography

const Header = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const {toggleColorMode} = useContext(ColorModeContext);
    
  return (
    <Container>
        <Text sx={{ cursor: 'pointer' }} onClick={() => navigate('/')} variant="h5">Where in the world?</Text>
        <Text onClick={toggleColorMode} variant="h6">{theme.palette.mode === 'dark' ? <Icon component="span"><LightModeIcon /> Light mode</Icon> : <Icon component="span"><DarkModeIcon /> Dark mode</Icon>}</Text>
    </Container>
  )
}

export default Header