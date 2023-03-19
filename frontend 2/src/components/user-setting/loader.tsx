import React from 'react'
import { ClockLoader } from 'react-spinners'

export default function Loader() {
    const override =`
    display: block;
    margin: 0 auto;
    margin-top: 45vh;
    color: #009688;
    `;
    return(
        <ClockLoader 
        css={override}
        />
    )
}