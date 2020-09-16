import NextApp from "next/app";
import Router, { withRouter } from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import Error from "next/error";
import { OAuthProvider, useOAuth } from "../context/auth";
import Loading from "../components/Loading";
import Head from "next/head";
import nookies from "nookies";

if (process.env.NODE_ENV !== "production") {
  Router.events.on("routeChangeComplete", () => {
    const path = "/_next/static/css/styles.chunk.css";
    const chunksSelector = `link[href*="${path}"]`;
    const chunksNodes = document.querySelectorAll(chunksSelector);
    const timestamp = new Date().valueOf();
    chunksNodes[0].href = `${path}?${timestamp}`;
  });
}

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ children }) => {
  const { loading, isAuthenticated } = useOAuth();

  if (isAuthenticated) {
    console.log("Auth");
  }

  if (loading) return <Loading />;

  return <>{children}</>;
};

class AppWrapper extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    let collapsed = false;

    if (!ctx.req) {
      collapsed = JSON.parse(sessionStorage.getItem("collapsed")) || false;
    } else {
      const { collapsed: collapsedCookie } = nookies.get(ctx);

      if (collapsedCookie) {
        collapsed = JSON.parse(collapsedCookie);
      }
    }

    return { pageProps, collapsed };
  }

  render() {
    const { Component, pageProps, collapsed, router } = this.props;

    return (
      <>
        <Head>
          <title>UOW Sculptures</title>
        </Head>
        {router.pathname !== "/_error" ? (
          <OAuthProvider>
            <App>
              <Layout collapsed={collapsed}>
                <Component {...pageProps} />
              </Layout>
            </App>
          </OAuthProvider>
        ) : (
          <Error statusCode="404" />
        )}
      </>
    );
  }
}

export default withRouter(AppWrapper);
