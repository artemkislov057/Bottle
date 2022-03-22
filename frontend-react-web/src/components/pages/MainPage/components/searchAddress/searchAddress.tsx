import React, { useEffect, useState } from "react";
import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
// import './searchAddress.css';
import { useQuery } from "react-query";
import { SearchControl } from "./searchControl";
import { Marker } from "react-leaflet";
import L from 'leaflet';



const key = 'pk.eyJ1IjoiZGltYXNpa2J1cmRpbiIsImEiOiJja3VyNm5vNzEwb2N1Mm5xdnVmY2F2NmZkIn0.m48LWgVP-vrcXmP0r-oiBQ';

export const SearchAddressControl:React.FC = React.memo(() => {
  let map = useMap();
  const [address, setAddress] = useState('') 

  function onClickOptionAddres(value : string, x : number, y : number) {
    setAddress(value);
    let latLng = new L.LatLng(y, x);
    map.setView(latLng);
    map.addLayer(L.marker(latLng));      
    setAddress('');
  }

  function onSubmitSearch(e : React.FormEvent<HTMLFormElement>, value : string) {
    e.preventDefault();
    if(value === '') return;
    setAddress('');
    let provider = new OpenStreetMapProvider();
    provider.search({query:value}).then(res => {
      let data = res[0];
      console.log(data);
      let latLng = new L.LatLng(data.y, data.x);
      map.setView(latLng);
      map.addLayer(L.marker(latLng));      
    })    
  }
  //style={{position:"fixed", zIndex:999, left:'10px', top:'50px'}}

  return <div className="interfaceButton-search-container" >
    <form className="interfaceButton-search-container-form" onSubmit={e => onSubmitSearch(e, address)}>
      <input 
        className="interfaceButton-search-container-form-input" 
        type="search" 
        value={address} 
        onChange={x => setAddress(x.target.value)} 
        placeholder='Поиск по адресам и местам'/>
      {/* <button className="interfaceButton-search-container-form-button" type="submit">Search</button> */}
    </form>    
    <SearchControl address={address} onClick={onClickOptionAddres}/>
  </div>;
})