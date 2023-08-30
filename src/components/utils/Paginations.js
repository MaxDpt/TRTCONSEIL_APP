import Icon_ArrowLeft from '../icons/Icon_arrowLeft';
import Icon_ArrowRight from '../icons/Icon_arrowRight';

export default function Paginations(props) {
    

    const updateOffset = (Offset) => {
      var postal_code = props.data.postal_codeStat
      var search = props.data.SearchStat
      props.functions.setOffsetState(Offset)
      if (props.params.page === 'advertisements' || props.params.page === 'back-office' && props.params.profilNav === 'Advertisements') {
        var activity = props.data.activityStat
        props.functions.getAllPublications(Offset, postal_code, activity, search) }
    
      if (props.params.page === 'back-office' && props.params.profilNav === 'Candidatures') { 
        props.functions.getAllCandidatys(Offset, postal_code, search)
      }

      if (props.params.page === 'back-office' && props.params.profilNav === 'Inscriptions') { 
        props.functions.getAllUsers(Offset, postal_code, search)
      }
    }

    return (
    <div id="paginations">
        {props.data.currentPage === 1 ? <button disabled> <Icon_ArrowLeft/> </button> :
        <button 
          onClick={()=> {updateOffset(props.data.offsetStat - 10), props.functions.setCurrentPage(props.data.currentPage - 1)}}> <Icon_ArrowLeft/> </button> }

        <p id='page_number'>page : {props.data.currentPage} / {props.data.totalPage}</p>

        {props.data.currentPage === props.data.totalPage ? <button disabled> <Icon_ArrowRight/> </button> :
        <button 
          onClick={()=> {updateOffset(props.data.offsetStat + 10), props.functions.setCurrentPage(props.data.currentPage + 1)}}> <Icon_ArrowRight/></button> }
    </div>
    );
};
    


