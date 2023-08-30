import React, {useState, useEffect} from 'react';
import Advertisements_map from '../publications/Adertisement_map';

export default function Favorites_candidate(props) {
    var token = sessionStorage.getItem('token')
    var id = sessionStorage.getItem('id')
    const [publications, setPublications] = useState(false);
    const [publication, setPublication] = useState(false);
    const [publicationID, setPublicationID] = useState(false);
    // ---> PROPS ---------------------------------------
    const params = {
        page :'favorite',
        advertisement_Details: props.params.advertisement_Details,
        profil_page: props.params.profil_page,
        stateFilter: 'approve',
        screenSize: props.params.screenSize
    }
    // ---> useEffect :
    useEffect(() => { getAllPublications() }, []);

    // --- > Get Publications :
    const getAllPublications = async () => {
    if (token) { 
        const getFavorites_request = await props.requests.FavoritesRequests.getFavoritesByUser(token, id);
        if (getFavorites_request) { setPublications(getFavorites_request) }
    }
    }
    // --- > Get Publication :
    const getOnePublication = async (favoriteid) => {
    if (favoriteid) { 
        const getFavorite_request = await props.requests.FavoritesRequests.getFavorite(token, id, favoriteid);
        if (getFavorite_request) { setPublication(getFavorite_request) }
    }
    }
    const functions = {
        getAllPublications: getAllPublications,
        getOnePublication: getOnePublication,
        setPublication: setPublication,
        setPublicationID: setPublicationID,
        setStateFilter: props.functions.setStateFilter
    }
    const data = {
        publications: publications,
        publication: publication,
        publicationID: publicationID
    }
    return (
    <div>
        <div id='nav_title'><p>Favorites</p></div>
        <Advertisements_map user={props.user} data={data} params={params} functions={functions} requests={props.requests} constants={props.constants}/>
 
    </div>
    );
};