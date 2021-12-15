import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

const DefaultImage: React.FC<{
  src: string,
  alt?: string,
  className?: string,
  style?: any,
  width?: string | number,
  height?: string | number,
  objectFit?: "contain" | "cover"
}> = ({alt, src, className, width, height, style, objectFit="cover"}) => {
  const props = {width, height}

  return (
    <div className={clsx(className, "relative")} style={style}>
      <Image src={src} alt={alt} unoptimized={true} layout="fill" objectFit={objectFit} {...props}/>
    </div>
  )
}

export default DefaultImage
