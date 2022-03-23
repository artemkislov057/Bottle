import React, { useContext, useState } from "react";
import { SearchControl } from "./searchControl";
import L from 'leaflet';
import { ContextForSearch } from "components/pages/MainPage/contextForSearch";
import { OpenStreetMapProvider } from "leaflet-geosearch";


export const HelpSearchContainer:React.FC = React.memo((props) => {
    const [address, setAddress] = useState('');

    const [, setLatLng] = useContext(ContextForSearch);    

    function onClickOptionAddres(value : string, x : number, y : number) {
        setAddress(value);
        let latLng = new L.LatLng(y, x);
        setLatLng(latLng);
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
        setLatLng(latLng);
        })    
    }

    return <>
        <div className="interfaceButton-search-container" >
            <form id="interfaceButton-search-container-form" className="interfaceButton-search-container-form" onSubmit={e => onSubmitSearch(e, address)}>
                <input 
                className="interfaceButton-search-container-form-input" 
                type="search" 
                value={address} 
                onChange={x => setAddress(x.target.value)} 
                placeholder='Поиск по адресам и местам'/>
            </form>
            <SearchControl address={address} onClick={onClickOptionAddres}/>
        </div>
    </>
})