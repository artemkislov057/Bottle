import React, { useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { MapBoxProvider } from "leaflet-geosearch";
import { useQuery, useQueryClient } from "react-query";
import './searchControl.css'


type TProps = {
    address: string,
    onClick: Function
}

const accessToken='pk.eyJ1IjoiZGltYXNpa2J1cmRpbiIsImEiOiJja3VyNm5vNzEwb2N1Mm5xdnVmY2F2NmZkIn0.m48LWgVP-vrcXmP0r-oiBQ';

export const SearchControl:React.FC<TProps> = React.memo((props) => {
    const {data, isLoading, isError, error} = useQuery(['searchAddress', props.address], async () => {        
        let provider = new OpenStreetMapProvider();
        // let provider = new MapBoxProvider({
        //     params: {
        //         access_token: accessToken
        //     }
        // });
        if(props.address === '') return undefined
        let result = provider.search({query:props.address});
        // provider.search({query:props.address}).then(res => console.log(res));
        return await result;
    })

    if(isLoading) {
        console.log('loading')
        return <ul className="result-address">
            <li>Loading...</li>
        </ul>;
    }
    if(isError) {
        console.log(error);
    }
    if(data === undefined || data === null || data.length === 0) {
        return <></>
    }    
    
    return <ul className="result-address">{data.map(x => 
        <li key={x.bounds.toString()} onClick={a => props.onClick(x.label, x.x, x.y)}>{x.label}</li>
    )}</ul>
})