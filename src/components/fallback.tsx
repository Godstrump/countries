import Loader from '../assets/globe.json'
import Lottie from 'lottie-react';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import type { Theme } from '@mui/material/styles'

const Wrapper = styled(Box)(({ theme } : {theme?: Theme }) => ({
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: theme!.palette.background.default
}))


const FallBack = () => (
    <Wrapper component="div">
        <Lottie style={{ width: 180 }} animationData={Loader} />
    </Wrapper>
);

export default FallBack;