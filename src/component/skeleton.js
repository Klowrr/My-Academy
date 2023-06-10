import React from 'react'
import Skeleton from 'react-loading-skeleton'
export const Skeletontable = ({row}) => {
  return (
    Array(row).fill(0).map((_,i)=>(
      <tbody key={i}>
        <tr>
          <td><Skeleton width={'80%'}/></td>
          <td><Skeleton width={'50%'}/></td>
          <td style={{textAlign:"center"}} className="action">
            <Skeleton width={'50%'}/>
          </td>
        </tr>
      </tbody>
    ))
    
    
  )
}
