import { createGlobalStyle } from "styled-components";

import color from "../constants/colors.json"

var random = Math.floor(Math.random() * 4)
if (random === 0) { var randomColor = color.default_profilImage01}
if (random === 1) { var randomColor = color.default_profilImage02}
if (random === 2) { var randomColor = color.default_profilImage03}
if (random === 3) { var randomColor = color.default_profilImage04}       

const GlobalStyle = createGlobalStyle`
/* ---- BODY COLORS ------------------------------------ */
body {
    background-color: ${color.BackgroundColor};
}
/* ---- HEADER COLORS ------------------------------------ */
header {
    background-color: ${color.HeaderColor}; }

#header_Link_Title, #header_Link {
    color : ${color.TextColor01}; }

#header_btns #header_Link_logout {
    color: ${color.ErrorMessage};
}

#header_Link_Title:hover, #header_Link:hover {
    color : ${color.TextColor03}; }

/* ---- HOME COLORS ------------------------------------ */
#Home_text h1 { 
    background-color: ${color.BackgroundColor2};
    color : ${color.TextColor02}; }

#Home_text p { 
    color : ${color.TextColor01}; }

/* ---- REGISTRATION COLORS ------------------------------------ */
#Registration_nav button{
    background-color: ${color.BackgroundColor3};
    color : ${color.TextColor02}; }

#registrationHeader {
    background-color: ${color.BackgroundColor2};
    color : ${color.TextColor02}; }

#Registration_form #button { 
    background-color: ${color.BackgroundColor2};
    color : ${color.TextColor02}; }

#Registration_form #button:hover, #Registration_nav button:hover  {
    color : ${color.TextColor01_Hover}; }

#Registration_content .btn_selected {
    background-color: ${color.BackgroundColor2}; }

#Form_comfirmation{
    color: ${color.ValideColor};
 }
/* ---- LOGIN COLORS ------------------------------------ */
#Login_header {
    background-color: ${color.BackgroundColor2};
    color : ${color.TextColor02}; }

#Login_form #button {
    background-color: ${color.BackgroundColor2};
    color : ${color.TextColor02}; }

/* ---- ADVERTISEMENTS COLORS ------------------------------------ */
#search_filter_content, #search_filter_content_down {
    background-color: ${color.BackgroundColor3};
}
#search_filter #search_btn { 
    background-color: ${color.BackgroundColor2};
    color: ${color.TextColor02};
}
.Advertisements_rows {
    background-color: ${color.BackgroundColor};
    color: ${color.TextColor01};
    border-top: solid 2px ${color.TextColor02};
    border-bottom: solid 2px ${color.TextColor02};
}
.Advertisements_rows_select {
    background-color: ${color.BackgroundColor3};
    color: ${color.TextColor01};
    border-top: solid 2px ${color.TextColor02};
    border-bottom: solid 2px ${color.TextColor02};
}
#row_title { 
    border-bottom: solid 1px ${color.TextColor01};
}
#row_detail { 
    color: ${color.TextColor03};
}
.Advertisements_rows:hover, #stores_list_row:hover {
    background-color: ${color.BackgroundColor3};
}

#icon_EmptyStar {
    color: ${color.TextColor01};
}
#icon_FullStar {
    color: ${color.FavoriteColor};
}
#icon_FullStar:hover , #icon_EmptyStar:hover {
    color: ${color.BackgroundColor};
}
#icon_Upload {
    color: ${color.ChangeColor};
}

.Advertisements_details_close { 
    color : ${color.TextColor03};
}
.Advertisements_details_close:hover { 
    color : ${color.TextColor01};
}


#Advertisements_details_content { 
    background-color: ${color.BackgroundColor3};
}
#Advertisements_details_header {
    background-color: ${color.HeaderColor};
    color : ${color.TextColor01};  
}
@media screen and (max-width: 850px) {  
    #Advertisements_details_header {
    border-top: 3px solid ${color.BackgroundColor3} ;
}
}
#Advertisements_details_header button { 
    background-color: ${color.BackgroundColor2};
    color : ${color.TextColor02}; }

#Advertisements_details_header button:hover { 
    background-color: ${color.BackgroundColor3} ;
    color : ${color.TextColor01}; }

#Advertisements_details_info { 
    background-color: ${color.BackgroundColor};
}
#Advertisements_details_right p { 
    color: ${color.TextColor03};
}
.Advertisements_details_details #text { 
    background-color: ${color.BackgroundColor};
}
.Advertisements_details_Empty { 
    background-color: ${color.BackgroundColor3};
}
.Advertisements_details_Empty_small { 
    background-color: ${color.BackgroundColor3};
}


.Advertisement_form_header { 
    background-color: ${color.BackgroundColor} ;
}
.Advertisement_form_header_Empty { 
    background-color: ${color.BackgroundColor3} ;
}
#Advertisement_form_content {
    background-color: ${color.BackgroundColor3} ;
    color : ${color.TextColor01}; 
}
#Advertisement_form_store {
    background-color: ${color.BackgroundColor} ;
}
#Advertisement_form_changeStore { 
    background-color: ${color.BackgroundColor2} ;
    color : ${color.TextColor02};
}
#Advertisement_form_changeStore:hover { 
    color : ${color.TextColor01};
}

#icon_ArrowRight, #icon_ArrowLeft,  #icon_Ben {
    color : ${color.TextColor01};
}
#icon_ArrowDown {
    color : ${color.ChangeColor};
}
#Empty_cv #icon_Pdf {
    color : ${color.TextColor02};
}
#icon_Edit {
    color : ${color.TextColor03};
}
#CV_content_header #icon_Upload, #Profil_info_content_header #icon_Upload, 
#Info_edit_btn #icon_Upload  {
    color : ${color.ChangeColor};
}
#CV_content_header #icon_Edit:hover, #CV_content_header #icon_Upload:hover,  #icon_Ben:hover,
#Profil_info_content_header #icon_Upload:hover {
    color : ${color.TextColor01};
}
#icon_Approve {
    color : ${color.ValideColor};
}
#icon_Reject {
    color : ${color.ErrorMessage};
}

#icon_Upload:hover, #icon_Approve:hover, #icon_Reject:hover, 
#icon_ArrowDown:hover, #icon_ArrowRight:hover, #icon_ArrowLeft:hover {
    color : ${color.TextColor03};
}

#confirmation #confirmation_content { 
    background-color: ${color.BackgroundColor};
    color : ${color.TextColor01};
    border: 2px solid ${color.BackgroundColor};
}
#confirmation_content #title {
    background-color: ${color.HeaderColor};
    color : ${color.TextColor01};
 }
 #confirmation_content_btns button { 
    background-color: ${color.HeaderColor};
    color : ${color.TextColor01};
 }
 #confirmation_content_btns button:hover {
 color : ${color.TextColor01_Hover} }

/* ---- USERS COLORS ------------------------------------ */
#nav_title { 
    background-color: ${color.BackgroundColor};
    color : ${color.TextColor01};
}
#stateNav_btn { 
    background-color: ${color.BackgroundColor};
    color : ${color.TextColor02};
}
 .Navbutton {
    background-color: ${color.BackgroundColor3};
    color : ${color.TextColor01};
 }
 .Navbutton_select {
    background-color: ${color.BackgroundColor2};
    color : ${color.TextColor02};
 }
 .Navbutton:hover {
color : ${color.TextColor02};
}

.users_rows {
    background-color: ${color.BackgroundColor};
    color: ${color.TextColor01};
    border-top: solid 2px ${color.TextColor02};
    border-bottom: solid 2px ${color.TextColor02};
}
.users_rows:hover { 
    background-color: ${color.BackgroundColor3};
}
.users_rows_select {
    background-color: ${color.BackgroundColor3};
    color: ${color.TextColor01};
    border-top: solid 2px ${color.TextColor02};
    border-bottom: solid 2px ${color.TextColor02};
}

#Users_details_content { 
    background-color: ${color.BackgroundColor3};
}
.Users_details_header, .Users_details_header_down {
    background-color: ${color.HeaderColor};
    color : ${color.TextColor01};  
}
@media screen and (max-width: 850px) { 
.Users_details_header, .Users_details_header_down {
    border-top: 3px solid ${color.BackgroundColor3};
}
}
.Users_details_header button { 
    background-color: ${color.HeaderColor};
    color : ${color.TextColor02}; }

.Users_details_header button:hover { 
    background-color: ${color.HeaderColor} ;
    color : ${color.TextColor02}; }

.Users_details_details #text, #Users_details_right, #Users_details_left , #Users_details { 
    background-color: ${color.BackgroundColor};
    color : ${color.TextColor01};
}
#Users_details_left h3, #Users_details_right h3{
    color : ${color.TextColor03};
}

#Users_details_details { 
    background-color: ${color.BackgroundColor};
}

#candidaty_pdf_btn {
    background-color: ${color.BackgroundColor3};
}

.Users_details_Empty { 
    background-color: ${color.BackgroundColor3};
}
.Users_details_Empty_small { 
    background-color: ${color.BackgroundColor3};
}
 /* ---- CONSULTANT COLORS ------------------------------------ */
 #Consultants_form_content { 
    background-color: ${color.BackgroundColor3};
 }
 #Consultants_form_content #form_header { 
    background-color: ${color.BackgroundColor};
 }
 #Result_row:hover {
    background-color: ${color.BackgroundColor3};
 }
 #Result_row #email {
    color: ${color.ChangeColor} ;
 }
 #Result_row #role {
    color: ${color.TextColor03} ;
 }
 #Result_row #delete #icon_Ben {
    color: ${color.ErrorMessage};
 }
 #Result_row #delete #icon_Ben:hover {
    color: ${color.TextColor01};
 }
 #formulary #form-btn{ 
    background-color: ${color.BackgroundColor2};
    color: ${color.TextColor02};
 }
 #Consultants_form_content #messageError {
    color: ${color.ErrorMessage};
 }
 #Consultants_form_content #messageValid {
    color: ${color.ValideColor};
 }
 /* ---- PROFIL COLORS ------------------------------------ */

 #Profil_nav button:hover {
 color : ${color.TextColor01_Hover} }

 #Profil_info_content_header { 
    background-color: ${color.BackgroundColor};
 }
 #Profil_info_content_header p { 
    color : ${color.TextColor01};
 }
#info_content_page #info, #info_content_page_candidate #info {
    color : ${color.TextColor01};
    background-color: ${color.BackgroundColor3};
}
#cvName {
    color : ${color.TextColor03};
}
#fileName {
    color : ${color.ChangeColor};
}
#Empty_cv {
    background-color: ${color.BackgroundColor3};
}
.CV_content_header {
    border-bottom: 3px solid ${color.BackgroundColor3};
}
 #info_content_page .info_stores_details {
    color : ${color.TextColor01};
    background-color: ${color.BackgroundColor3};
}
#info_content_page .edit_stores_details {
    color : ${color.TextColor01};
    background-color: ${color.BackgroundColor3};
}
#p_profilImage_Default { 
    background-color: ${randomColor};
}
#p_profilImage_Default p { 
    color: ${color.TextColor02};
}
@media screen and (min-width: 1100px) { 

#info_stores_details_text { 
    background-color: ${color.BackgroundColor};
    color : ${color.TextColor01}; }
}
@media screen and (max-width: 850px) {

.info_stores_details { 
    background-color: ${color.HeaderColor};
}

.info_list_title, .edit_list_title { 
    background-color: ${color.HeaderColor};
}

.info_list_btns, .edit_list_btns {
    background-color: ${color.HeaderColor}; }

#stores_form_content {
    background-color: ${color.BackgroundColor};
    }
}
 
.info_list_btns button:hover,  .edit_list_btns button:hover {
    color : ${color.TextColor01_Hover} 
 }
 #stores_list_row { 
    background-color: ${color.BackgroundColor};
    color : ${color.TextColor01};
    border-top: 2px solid ${color.BackgroundColor};
    border-bottom: 2px solid ${color.BackgroundColor}; }
 
#stores_list_row button { 
    color : ${color.BackgroundColor2};
    }    
#stores_list_row button:hover { 
    color : ${color.TextColor01} 
}

#stores_background {
    background-color: ${color.BackgroundColor};
}
#stores_form_content {
    color : ${color.TextColor01};
}
#stores_form_content h1 {
    color : ${color.TextColor01};
}
#stores_form_content #button { 
    background-color: ${color.BackgroundColor2};
    color : ${color.TextColor02};
}
#stores_form_content #button:hover { 
    color : ${color.TextColor01_Hover} 
}

#info_stores_details h1 {
    color : ${color.TextColor02};
}


#Info_close_btn, .candidaty_close, .candidaty_close_down  {
    color : ${color.TextColor03};
}
#Info_close_btn:hover, .candidaty_close:hover, .candidaty_close_down:hover {
    color : ${color.TextColor01} 
}
#Info_edit_btn, #Profil_edit_btn  {
    color : ${color.TextColor03};
}
#Info_edit_btn:hover, #Profil_edit_btn:hover {
    color : ${color.TextColor01} 
}

/* ---- ERROR MESSAGES COLORS ------------------------------------ */
#errorMessage {
    border: 2px solid ${color.ErrorMessage};
    color: ${color.ErrorMessage};
 }

`
export default GlobalStyle;