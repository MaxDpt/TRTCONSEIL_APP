import { useState, useEffect } from "react"
import Advertisements_details from '../publications/Advertisements_details';
import Icon_close from '../icons/Icone_close';
import Icon_EmptyStar from '../icons/Icon_EmptyStar';
import Icon_FullStar from '../icons/Icon_FullStar';
import Icon_Approve from '../icons/Icon_Approve';
import Icon_Reject from '../icons/Icon_Reject';

export default function Advertisements_map(props) {
/* ----- DATA ---------------------------------------  */
const config = props.constants.config
var text = props.constants.text
var id = sessionStorage.getItem('id')
var token = sessionStorage.getItem('token')
var [confirmation, setConfirmation] = useState(false);
var [messageConfirm, setMessageConfirm] = useState(false);
var [isFavorite, setIsFavorite] = useState(false);
var ArrayDate = {}
var ArrayFavorite = {}
if (props.user[0]) {
var profilImage = config.HOST+'/api/get/file/'+id+'/'}

/* ----- DATE FORMAT ----------------------------------*/
if (props.data.publications) {
for (var i = 0; i < props.data.publications.length; i ++ ) {
    /* ----- DATA -----*/
    var date = new Date((props.data.publications[i].p_created_at));
    const day = date.getUTCDate()+1;
    const mount = date.getUTCMonth();
    const year = date.getUTCFullYear();
    var format = new Date(year, mount, day)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const created_at = format.toLocaleDateString('en', options)
    /* ----- CONSTRUCTION -----*/
    ArrayDate[props.data.publications[i].p_id] = created_at 
} }

// ---> useEffect :
useEffect(() => { getFavorites() }, []);
/* ----- GET IF ADVERTISEMENT INTO FAVORITE ------------------------------------*/
const getFavorites = async () => {
if (token) { 
  const getFavorites_request = await props.requests.FavoritesRequests.getFavoritesByUser(token, id);
  if (getFavorites_request) { setIsFavorite(getFavorites_request) } }
}
if (isFavorite) { 
  for (var i = 0; i < isFavorite.length; i ++) {
      ArrayFavorite[isFavorite[i].f_publications] = true; }
} 
/* ----- ADD INTO FAVORITE ------------------------------------*/
const delete_Favorite = async (publicationid) => {
  await props.requests.FavoritesRequests.deleteFavorite(token, id, publicationid )
  getFavorites()  
  props.functions.getAllPublications()

}
/* ----- ADD INTO FAVORITE ------------------------------------*/
const addFavorite = async (advertisementId, storeId) => {
    /* ----- DATA -----*/
    var publication = parseInt(advertisementId)
    var secure = props.user[0].u_role
    var stores = parseInt(storeId)
    await props.requests.FavoritesRequests.setFavorite(token, id, publication, stores, secure, )
    getFavorites()     
}
/* ----- DELETE ADVERTISEMENT WITH ID --------------------------  */
const delete_PublicationState = async (publicationid) => {
  if (publicationid) {
    const token = props.user[0].u_token;
    const id = props.user[0].u_id;
    const delete_request = await props.requests.PublicationsRequests.deletePublicationState(token, id, publicationid )
    props.functions.getAllPublications() 
} 
}
/* ----- UPDATE ADVERTISEMENT STATUS --------------------------  */
const update_PublicationState = async (publicationid) => {
  if (publicationid) {
    const token = props.user[0].u_token;
    const id = props.user[0].u_id;
    const status = 'approve';
    const   updateState_request = await props.requests.PublicationsRequests.updatePublicationState(token, id, publicationid, status )
    props.functions.getAllPublications() 
}  }
    
return (
  <div className={`Advertisements_map_content ${props.params.page === 'advertisements' ? 'Advertisements_map_content_up' : 
                                                props.params.page === 'favorite' ? 'Advertisements_map_content_middle' :
                                                props.params.profil_page === true ? 'Advertisements_map_content_profil' : 
                                                'Advertisements_map_content'}`}>

  {/* --PC VERSION ------------------------------------ */}
  {props.params.screenSize === 'PC' || props.params.screenSize === 'PC' ? <>
  {props.data.publications ? <div id="Advertisements_map"> {props.data.publications.map(result=> 
  <div key={'div'+result.p_id}> 

  {/* -- ADVERTISEMENTS MAP ------------------------------------ */}
  {result.p_status === props.params.stateFilter && props.params.page == 'advertisements' ||
   result.p_status === props.params.stateFilter && props.params.page == 'recruiters' ||
   result.p_status === props.params.stateFilter && props.params.page == 'back-office' ||
   result.c_status === props.params.stateFilter && props.params.page == 'candidaty' ||
   props.params.page == 'favorite' ? 
  <div className={`'Advertisements_rows' ${
      props.data.publication[0] && props.data.publication[0].p_id === result.p_id && props.params.page === 'advertisements' ||
      props.data.publication[0] && props.data.publication[0].p_id === result.p_id && props.params.page === 'recruiters' ||
      props.data.publication[0] && props.data.publication[0].p_id === result.p_id && props.params.page === 'back-office' ||
      props.data.publication[0] && props.data.publication[0].f_id === result.f_id && props.params.page === 'favorite' ||
      props.data.publication[0] && props.data.publication[0].c_id === result.c_id && props.params.page === 'candidaty' ?
       'Advertisements_rows_select' : 'Advertisements_rows'}`}>
        
  <div id='row_clic' key={'result'+result.p_id+'button2'} onClick={() => {
      props.params.page === 'advertisements' ?
       props.functions.getOnePublication(result.p_id) :
      props.params.page === 'recruiters' ?
       props.functions.getOnePublication(result.p_id) :
      props.params.page === 'back-office' ?
       props.functions.getOnePublication(result.p_id) :
      props.params.page === 'candidaty' ? 
       props.functions.getOnePublication(result.c_id) :
      props.params.page === 'favorite' ? 
      props.functions.getOnePublication(result.f_id) : null }}>
  {/* -- TITLE ROW ------------------------------------ */}
  <div id='row_title'>
  <div id='Advertisements_row_title'>
  { result.u_profil_image && props.params.page !== 'back-office'  ? <img id='p_profilImage' src={profilImage+result.u_profil_image} /> : 
    !result.u_profil_image && props.params.page !== 'back-office' ? <div id='p_profilImage_Default'><p>{result.u_name[0].toUpperCase()}</p></div> : null}
  <p key={'result'+result.p_id+'name'}>{result.s_name.toUpperCase()}</p>
  <p key={'result'+result.p_id+'activity'}>{result.p_activity.toUpperCase()+' / '+result.p_contract+' / '+result.p_hourly+'h' }</p>
  </div>
  {/* -- BUTTON ROW ------------------------------------ */}
  <div id='Advertisements_btns'>
  {props.user && props.user[0].u_role === 'candidate' && ArrayFavorite[result.p_id] !== true ? 
    <button key={'result'+result.a_id+'button3'} onClick={() => { addFavorite(result.p_id, result.p_stores )  }}><Icon_EmptyStar /></button> : null}
  {props.user && props.user[0].u_role === 'candidate' && ArrayFavorite[result.p_id] === true ?
    <button key={'result'+result.a_id+'button4'} onClick={() => { delete_Favorite( result.p_id )  }}><Icon_FullStar/></button> : null } 
  {props.user && props.user[0].u_role === 'consultant' && result.p_status !== 'approve'  || props.user && props.user[0].u_role === 'administrator' && result.p_status !== 'approve' ?
    <button key={'result'+result.p_id+'button5'} onClick={() => { setConfirmation(true), setMessageConfirm(text.Text_Approve_Advertisement), props.functions.setPublicationID(result.p_id)   }}><Icon_Approve/></button> : null}
  {props.user && props.user[0].u_role === 'consultant' && result.p_status !== 'approve' || props.user && props.user[0].u_role === 'administrator' && result.p_status !== 'approve' ? 
    <button key={'result'+result.p_id+'button6'} onClick={() => { setConfirmation(true), setMessageConfirm(text.Text_Reject_Advertisement), props.functions.setPublicationID(result.p_id)  }}><Icon_Reject/></button> : null} 
  </div>
  </div>
  {/* -- DETAIL ROW ------------------------------------ */}
  <div id='row_detail'>
  <p> {result.p_details.substring(0, 220)+' ...'}</p>
  </div>
  {/* -- DATE ROW ------------------------------------ */}
  <div id='row_date'>
  <p key={'result'+result.p_id+result.p_created_at}>{'Posted on: '+ArrayDate[result.p_id]}</p> 
  </div>
  </div> 
  </div> : null } 
  </div>  )} </div> : null }

  {/* -- ADVERTISEMENTS CLOSE BUTTON ------------------------------------ */}
  {props.data.publication[0] ? <button className={`Advertisements_details_close ${props.params.page === 'advertisements' ? 'Advertisements_details_close_up' : 'Advertisements_details_close' }`} onClick={() => props.functions.setPublication(false) }> <Icon_close id='icon_close'/> </button> : null }

  {/* -- ADVERTISEMENTS RESULT DETAILS ------------------------------------ */}
  {props.params.advertisement_Details && props.params.advertisement_Details === true ?
    <Advertisements_details user={props.user} data={props.data} params={props.params} functions={props.functions} requests={props.requests} constants={props.constants} />
  : null}
  {/* -- ADVERTISEMENTS RESULT EMPTY ------------------------------------ */}
  <div className={`Advertisements_details_Empty ${props.profilPage === true ? 
                  'Advertisements_details_Empty_small' : 
                  'Advertisements_details_Empty'}`}></div>
  </> : null}

  {/* -- CONFIRMATION ------------------------------------ */}
  {confirmation == true ?
  <div id="confirmation"> 
  <div id="confirmation_content"> 
  <div id="title"><h1>CONFIRMATION</h1></div>
  <p>{messageConfirm}</p>
  <div id="confirmation_content_btns">
  <button  onClick={() => {setConfirmation(false) }} >Cancel</button>               
  {messageConfirm == text.Text_Approve_Advertisement ? <button  onClick={() => {  setConfirmation(false),update_PublicationState(props.data.publicationID) }} >confirm</button> : null }
  {messageConfirm == text.Text_Reject_Advertisement ? <button  onClick={() => {  setConfirmation(false),delete_PublicationState(props.data.publicationID)  }} >confirm</button> : null }
  </div>
  </div></div> : null } 
  {/* ------------------------------------------------------ */}
  
  {/* -- MOBILE VERSION ------------------------------------ */}
  {props.params.screenSize === 'Mobile' ? <>
  {props.data.publications && !props.data.publication ? <div id="Advertisements_map"> {props.data.publications.map(result=> 
  <div key={'div'+result.p_id}> 

  {/* -- ADVERTISEMENTS MAP ------------------------------------ */}
  {result.p_status === props.params.stateFilter && props.params.page == 'advertisements' ||
   result.p_status === props.params.stateFilter && props.params.page == 'recruiters' ||
   result.p_status === props.params.stateFilter && props.params.page == 'back-office' ||
   result.c_status === props.params.stateFilter && props.params.page == 'candidaty' ||
   props.params.page == 'favorite' ? 
  <div className={`'Advertisements_rows' ${
      props.data.publication[0] && props.data.publication[0].p_id === result.p_id && props.params.page === 'advertisements' ||
      props.data.publication[0] && props.data.publication[0].p_id === result.p_id && props.params.page === 'recruiters' ||
      props.data.publication[0] && props.data.publication[0].p_id === result.p_id && props.params.page === 'back-office' ||
      props.data.publication[0] && props.data.publication[0].f_id === result.f_id && props.params.page === 'favorite' ||
      props.data.publication[0] && props.data.publication[0].c_id === result.c_id && props.params.page === 'candidaty' ?
       'Advertisements_rows_select' : 'Advertisements_rows'}`}>
        
  <div id='row_clic' key={'result'+result.p_id+'button2'} onClick={() => {
      props.params.page === 'advertisements' ?
       props.functions.getOnePublication(result.p_id) :
      props.params.page === 'recruiters' ?
       props.functions.getOnePublication(result.p_id) :
      props.params.page === 'back-office' ?
       props.functions.getOnePublication(result.p_id) :
      props.params.page === 'candidaty' ? 
       props.functions.getOnePublication(result.c_id) :
      props.params.page === 'favorite' ? 
      props.functions.getOnePublication(result.f_id) : null }}>
  {/* -- TITLE ROW ------------------------------------ */}
  <div id='row_title'>
  <div id='Advertisements_row_title'>
  { result.u_profil_image !== null ? <img id='p_profilImage' src={profilImage+result.u_profil_image} /> : 
    <div id='p_profilImage_Default'><p>{result.u_name[0].toUpperCase()}</p></div>}
  <p key={'result'+result.p_id+'name'}>{(result.s_name.toUpperCase()+' / '+result.p_activity.toUpperCase()+' / '+result.p_contract+' / '+result.p_hourly+'h').substring(0, 60) }</p>
  </div>
  {/* -- BUTTON ROW ------------------------------------ */}
  <div id='Advertisements_btns'>
  {props.user && props.user[0].u_role === 'candidate' && ArrayFavorite[result.p_id] !== true ? 
    <button key={'result'+result.a_id+'button3'} onClick={() => { addFavorite(result.p_id, result.p_stores )  }}><Icon_EmptyStar /></button> : null}
  {props.user && props.user[0].u_role === 'candidate' && ArrayFavorite[result.p_id] === true ?
    <button key={'result'+result.a_id+'button4'} onClick={() => { delete_Favorite( result.p_id )  }}><Icon_FullStar/></button> : null } 
  {props.user && props.user[0].u_role === 'consultant' && result.p_status !== 'approve'  || props.user && props.user[0].u_role === 'administrator' && result.p_status !== 'approve' ?
    <button key={'result'+result.p_id+'button5'} onClick={() => { setConfirmation(true), setMessageConfirm(text.Text_Approve_Advertisement), props.functions.setPublicationID(result.p_id)   }}><Icon_Approve/></button> : null}
  {props.user && props.user[0].u_role === 'consultant' && result.p_status !== 'approve' || props.user && props.user[0].u_role === 'administrator' && result.p_status !== 'approve' ? 
    <button key={'result'+result.p_id+'button6'} onClick={() => { setConfirmation(true), setMessageConfirm(text.Text_Reject_Advertisement), props.functions.setPublicationID(result.p_id)  }}><Icon_Reject/></button> : null} 
  </div>
  </div>
  {/* -- DETAIL ROW ------------------------------------ */}
  <div id='row_detail'>
  <p> {result.p_details.substring(0, 220)+' ...'}</p>
  </div>
  {/* -- DATE ROW ------------------------------------ */}
  <div id='row_date'>
  <p key={'result'+result.p_id+result.p_created_at}>{'Posted on: '+ArrayDate[result.p_id]}</p> 
  </div>
  </div> 
  </div> : null } 
  </div>  )} </div> : null }

  {/* -- ADVERTISEMENTS CLOSE BUTTON ------------------------------------ */}
  {props.data.publication[0] ? <button className={`Advertisements_details_close ${props.params.page === 'advertisements' ? 
                                              'Advertisements_details_close_up' : props.params.page === 'favorite' ? 
                                              'Advertisements_details_close_middle' : 'Advertisements_details_close' }`} 
                                              onClick={() => props.functions.setPublication(false) }> 
                                              <Icon_close id='icon_close'/> </button> : null }

  {/* -- ADVERTISEMENTS RESULT DETAILS ------------------------------------ */}
  {props.params.advertisement_Details && props.params.advertisement_Details === true && props.data.publication ?
    <Advertisements_details user={props.user} data={props.data} params={props.params} functions={props.functions} requests={props.requests} constants={props.constants} />
  : null}

  </> : null}
</div>
);
};
    