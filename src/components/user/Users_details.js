
    export default function Users_details(props) {
      if (props.data.user) {
        var users = props.data.user[0];
      }
      if (props.data.candidaty) { 
          var candidaty = props.data.candidaty[0]
      }

        return (
        <div className={`users_details ${props.params.profilPage === true ? 'users_details_small' : 'users_details'}`}>

{/* ---- USER INFO ----------------------------------------- */}       
        {users && !candidaty ? 
        <div id="Users_details_content">
        {/* ----  INFO ----------------------------------------- */}
        <div className={`'Users_details_info' ${props.params.page === 'back-office' ? 'Users_details_info_down' : 'Users_details_info'}`}> 
            {/* ----  HEADER ----------------------------------------- */}
            <div className={`'Users_details_header' ${props.params.page === 'back-office' ? 'Users_details_header_down' : 'Users_details_header'}`}>
            {users.u_role === 'candidate' ? <p>CANDIDAT</p> : null}
            {users.u_role === 'recruiter' ? <p>RECRUITER</p> : null} 
            </div>
            <div id="Users_details_center"> 
              <div id="Users_details"> 
                {users.u_role === 'candidate' ? <>
                  <p>{users.u_name.toUpperCase() + ' ' + users.u_last_name.toUpperCase() }</p>
                </> : users.u_role === 'recruiter' ? <>
                  <p>{users.u_name.toUpperCase() + ' ' + 'ENTREPRISE' }</p> </> : null}
                
                  <p>{users.u_address}<br/>{users.u_city+' '+users.u_postal_code+' '+users.u_department} <br/> {users.u_region} </p>
                  
              
                  <p>email: {' '+users.u_email}</p><p>phone: {' '+'+33'+users.u_phone}</p>
                  {users.u_role === 'candidate' ? <p>Holder of : {' '+users.u_vehicle}</p> : null}
                  {users.u_role === 'recruiter' ? <>
                  <p>Activity area : {' '+users.u_activity}</p> <p>N° Siret : {' '+users.u_siret}</p>  </> : null}
              </div>
              </div>
            </div>
        </div>
        : null } 
        
        </div>
        );
    };
    