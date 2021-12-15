import { ReactComponentElement, useContext, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import AuthContext, { AuthContextInterface } from "../context/AuthContext";
import SEO from "@/components/layout/SEO";
import { isProduction } from "@/config/config";
import { route } from "@/config/route";
import LoadingScreen from "@/components/LoadingScreen";
import { NextComponentType, NextPageContext } from "next";
import { setUnecryptedCookie } from "@/utils/cookie";

interface withAuthOptions{
  title?: string,
  redirectRoute?: string,
  requiredRole?: string,
  isComingSoon?: boolean
}

export interface ReactProtectedPageInterface<P = any> {
  router?: NextRouter,
  auth?: AuthContextInterface,
  props?: P
}

const withAuth = (Component: NextComponentType<NextPageContext, any, ReactProtectedPageInterface>, options: withAuthOptions = {
  isComingSoon: false
}) => {
  const enableComingSoonOnDev = false;
  
  const ProtectedRoute = ({...props}): ReactComponentElement<any>=>{
    const router = useRouter();
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if( authContext.loaded ){
        if( authContext.isAuthenticated()) setLoading(false);
        else{
          setUnecryptedCookie("auth-redirect", router.pathname, {expires: 5*60});
          if( authContext.isExpired() ){
            authContext.logout();
            router.replace(options.redirectRoute ? options.redirectRoute : route.login)
          }
          else if(  authContext.token === null ){
            authContext.logout();
            router.replace(options.redirectRoute ? options.redirectRoute : route.login)
          }
        }
      }
    }, [authContext]);

    if (loading) {
      return <>
      <SEO title={options.title} useSuffix={ options.title ? true : false } />
      <LoadingScreen show={loading}/>
      </>;
    }else{
      return <Component auth={authContext} router={router} {...props} />;
    }

  }

  if (Component.getInitialProps) {
    ProtectedRoute.getInitialProps = async (ctx: any)=>{
      let componentProps = {}
      if (Component.getInitialProps) {
        componentProps = await Component.getInitialProps(ctx);
      }

      return {
        ...componentProps
      };
    }
  }

  if( (options.isComingSoon && isProduction()) || (options.isComingSoon && enableComingSoonOnDev) ){
    const ComingSoonWrapped = ()=>{
      return <>
        <h1>Coming Soon</h1>
      </>
    }
    return ComingSoonWrapped;
  }

  return ProtectedRoute;
};

export default withAuth;