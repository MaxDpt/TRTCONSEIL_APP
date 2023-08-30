import { useState } from "react";
import Icon_Pdf from "../icons/Icon_Pdf";

export default function Users_details(props) {
    const config = props.constants.config
    const [pdfView, setPdfView] = useState(false);
    if (props.data.candidaty) { 
        var candidaty = props.data.candidaty[0]
        var file = candidaty.u_curiculum_vitea
    }

return (
<div className={`Users_details ${props.params.profilPage === true ? 'Users_details_small' : 'Users_details'}`}>

{/* ---- CANDIDATY INFO ----------------------------------------- */}
      {candidaty ? 
      <div id="Users_details_content">
      {/* ---- INFO ----------------------------------------- */}
          <div className={`'Users_details_info' ${props.params.page === 'back-office' ? 'Users_details_info_down' : 'Users_details_info'}`}> 
            {/* ----  HEADER ----------------------------------------- */}
            <div className={`'Users_details_header' ${props.params.page === 'back-office' ? 'Users_details_header_down' : 'Users_details_header'}`}>
            {candidaty.u_role === 'candidate' ? <p>CANDIDAT</p> : null}
            {candidaty.u_role === 'recruiter' ? <p>RECRUITER</p> : null} 

            <button id="candidaty_pdf_btn" 
              onClick={() =>`${!pdfView ? setPdfView(true) : setPdfView(false)}`}> 
              <Icon_Pdf/> 
            </button>

            </div>
            {!pdfView ? <>
            <div id="Users_details_info_up">

            <div id="Users_details_left"> 
                <h3>Candiate :</h3>
                <p>{candidaty.u_name.toUpperCase() + ' ' + candidaty.u_last_name.toUpperCase() }</p>
                <p>{candidaty.u_address}<br/>{candidaty.u_city+' '+candidaty.u_postal_code} </p>
                <p>{candidaty.u_department + ' ' + candidaty.u_region}</p>
                <p>email: {' '+candidaty.u_email}</p><p>phone: {' '+'+33'+candidaty.u_phone}</p> 
                <p>Holder of : {' '+candidaty.u_vehicle}</p>
            </div>

            <div id="Users_details_right"> 
              <h3>Store :</h3>
              <p>{candidaty.s_name.toUpperCase()}</p>
              <p>{candidaty.s_address}<br/>{candidaty.s_city+' '+candidaty.s_postal_code} </p>
              <p>{candidaty.s_department + ' ' + candidaty.s_region}</p>
              
              <h3>Job :</h3>
              <p>{candidaty.p_activity.toUpperCase()}</p>
              <p>{candidaty.p_contract+ ' / ' + candidaty.p_hourly+ 'H'}</p>
              <p>{candidaty.p_salary+ ' € euros / HT'}</p>

            </div>
            </div>
            <div id="Users_details_details">
              <p>{candidaty.p_details}</p>
            </div> 
            </> : 
            <div id="candidaty_pdf">
              {file ? 
              <embed 
              src= {`${config.HOST}/api/get/file/${candidaty.u_id}/${file}`}
              width="100%" height="100%" 
              type="application/pdf"
              /> : null }
            </div> }
          </div>

      </div>
      : null } 


      </div>
      );
  };
  