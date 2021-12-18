import { theme } from '@/config/emotion'
import { formatNumber } from '@/utils/utils'
import { Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import DefaultImage from './DefaultImage'

const SearchItem: React.FC<{
  id?: string,
  name?: string,
  price?: number,
  description?: number,
  merchantName?: string,
  link?: string,
  image?: string,
  onAdd?: {():void}
}> = ({id, name, price, merchantName, image, link, description, onAdd = ()=>{}}) => {
  return (
    <div className="shadow bg-orange-100 flex justify-between items-center rounded-xl px-5 py-2" css={css`
      color: ${theme.darkbrown};
    `}>
      <div className='flex'>
        <div className="relative" style={{maxWidth: "100px"}}>
        {
          image && <DefaultImage src={image}/>
        }
        </div>
        <div>
          <Text fontWeight={700}>{name}</Text>
          <Text fontSize="sm">{merchantName}</Text>
          {
            price ? <Text fontSize="sm" fontWeight={700}>Rp. {formatNumber(price || 0)}</Text>
            :
            <Text fontSize="sm" fontWeight={700}>{description}</Text>
          }
        </div>
      </div>
      <div>
        {
          link ? 
          <i className="fas fa-chevron-right cursor-pointer text-2xl"></i>
          :
          <i className="fas fa-plus cursor-pointer text-2xl" onClick={onAdd}></i>
        }
      </div>
    </div>
  )
}

export default SearchItem
