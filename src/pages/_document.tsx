import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en-US" dir="ltr" className="light">
        <Head>
          {/*
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap"
            rel="stylesheet"
          />
    */}
        </Head>

        <body>
          <Main />
          <NextScript />

          <script src="/js/jquery-latest.js"></script>
          <script src="/js/swiper.min.js"></script>
          <script src="/js/aos.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
