import { Spinner } from "@chakra-ui/spinner";
import { css } from "@emotion/react";
import clsx from "clsx";
import { useRef } from "react";

const LoadingScreen = ({show = false, enableBackground = false}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
    <div className={ clsx(`loading-bg`, enableBackground && "loading-bg-custom" , show ? "flex" : "invisible") }
    >
      <div className="flex items-center flex-col justify-center vh-full w-100 px-3 px-sm-5" ref={ref}>
        <div className="flex items-center flex-col justify-center">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='orange.200'
            color='orange.500'
            size='xl'
          />
          <h1 className="text-2xl text-center text-white font-bold">Memuat...</h1>
          <p className="text-center text-white px-5" css={css`font-size: .9rem;`}>Harap menunggu, ini mungkin akan memakan waktu beberapa saat.</p>
        </div>
      </div>
    </div>
    </>
    )
}

export default LoadingScreen