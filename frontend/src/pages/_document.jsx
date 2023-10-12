import { Html, Head, Main, NextScript } from 'next/document';
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Script strategy="beforeInteractive">
					{`
						const themeLocalStorage   = localStorage.getItem('theme')
						const themeSystem         = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
						if (themeLocalStorage) document.querySelector(':root').dataset.theme = themeLocalStorage;
						else {
							document.querySelector(':root').dataset.theme = themeSystem;
							localStorage.setItem("theme", themeSystem);
						}
                	`}
				</Script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}