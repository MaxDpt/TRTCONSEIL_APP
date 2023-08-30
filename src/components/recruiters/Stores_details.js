
export default function Stores_details(props) {
    var store = props.store[0]
return (
<div>
    <div id='Profil_info_content_header'>
      <p id='info_stores_details_title'>STORE INFORAMTIONS</p> 
    </div>

    <div className={`'info_stores_details' ${ props.editStore == true && props.screenSize == 'Mobile' ? 'edit_stores_details' : 'info_stores_details'}`}>
      <div id='info_text_stores_details'>
        {store ? 
          <div id='info_stores_details_content'>  
          <div id='info_stores_details_text'> 
            <p>{store.s_name.toUpperCase()}</p>
            <p>{'Opening hours : '+store.s_hourly}</p>
            <p>{'phone : +33 '+store.s_phone}</p>
            <p>{store.s_address} <br/> 
               {store.s_city+' '+store.s_postal_code+' '+store.s_department} <br/> 
               {store.s_region}  </p>

            <p>{'N° Siren : '+store.s_siren}</p>
          </div>
          </div>
        : null }
      </div>
    </div>
</div>
);
};
    