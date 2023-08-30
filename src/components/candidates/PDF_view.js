import { useState } from "react";
import Icon_ArrowDown from "../icons/Icon_arrowDown";
import Icon_ArrowRight from "../icons/Icon_arrowRight";
import Icon_Pdf from "../icons/Icon_Pdf";
import Icon_Edit from "../icons/Icon_Edit";
import Icon_Upload from "../icons/Icon_Upload";
import Icon_ben from "../icons/Icon_Ben";

export default function PDF_View(props) {
    const config = props.constants.config
    var id = sessionStorage.getItem('id')
    var token = sessionStorage.getItem('token')
    var openCv = props.data.openCv
    const [filename, setFilename] = useState(false)
    var user = props.userClass;
    if (user.u_curiculum_vitea) {
    var cvName = ((user.u_curiculum_vitea).split("file").toString()) }
    let form = document.querySelector('form');
    if (document.getElementById('pdf_file')) {
    var pdf_file = document.getElementById('pdf_file'); }
    
    const onChangeFile = () => {
        if (pdf_file.files) {
            setFilename(pdf_file.files[0].name)
        }
    }
    const update_cv = async () => {
        if (pdf_file.files) {
        const data = new FormData();
        data.append("data", pdf_file.files[0]) 
        await props.requests.FilesRequests.updateUserPdf(token, id, data);
        setFilename(false)
        form.reset()
        props.functions.getUserId() 
    }
    }
    
return (
<div id="pdf_view">

<div id='CV_content_header' className={`CV_content_header ${openCv && props.params.screenSize === 'Mobile' ? "CV_content_header_up" : "CV_content_header"}`}> 
    {!filename ? <form><input id="pdf_file" type="file" onChange={() => {onChangeFile()}}/></form> : null }
    {!filename ? <div id="fileIcon"><Icon_Edit/></div> : null }
    {filename ? <div id="fileIcon" onClick={() => {update_cv()}} ><Icon_Upload/></div> : null }
    {filename ? <button onClick={() => {setFilename(false)}}><Icon_ben/></button> : null }

    {!openCv && !filename && user.u_curiculum_vitea ? <button onClick={() => {props.functions.setOpenCv(true)}}><Icon_ArrowRight/></button> : null }
    {openCv && !filename ? <button onClick={() => {props.functions.setOpenCv(false)}}><Icon_ArrowDown/></button> : null }

    {cvName && !filename ? <p id="cvName">{cvName.substring(0, 40)+ ' ...'}</p> : null }
    {filename ? <p id="fileName">{', /'+filename.substring(0, 40)+ ' ...'}</p> : null }
</div>


{!openCv && props.params.screenSize === 'PC' || filename && props.params.screenSize === 'PC' ? 
<div id="Empty_cv"> 
    <Icon_Pdf />
</div> : null }
{openCv && !filename ? 
<embed 
    src= {`${config.HOST}/api/get/file/${user.u_id}/${user.u_curiculum_vitea}`}
    width="100%" height="100%" 
    type="application/pdf"
/> : null }


</div>
);
};
    
