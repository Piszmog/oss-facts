import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from "../lib/theme";

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp
