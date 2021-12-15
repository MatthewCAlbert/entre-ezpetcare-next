export function isProduction(){
  if( process.env.NEXT_PUBLIC_NODE_ENV_OVERRIDE )
    return process.env.NEXT_PUBLIC_NODE_ENV_OVERRIDE === 'production';
  else
    return process.env.NODE_ENV === 'production';
}

export function getOverrideEnv(){
  return process.env.NEXT_PUBLIC_NODE_ENV_OVERRIDE;
}

export function getApiBaseUrl(){
  return isProduction() ? `${process.env.REACT_APP_API_PROD}/` : `${process.env.REACT_APP_API_DEV}/`
}