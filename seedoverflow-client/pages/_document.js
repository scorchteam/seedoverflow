import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <script src='/headscript.js' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}