import { ColorModeScript, theme } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
