import Icon_Search from "../icons/Icon_Search";

export default function Search_Filter(props) {
    const departments = props.constants.departments
    const jobs = props.constants.jobs
    const Search_Filter = () => {
        let form = document.querySelector('form');
        if (props.params.page === 'advertisements' || props.params.page === 'back-office' && props.params.profilNav === 'Advertisements') {
            var postal_code = (form.elements[2].value)
            props.functions.setpostal_codeState(postal_code)
            var search = (form.elements[0].value+'%').toString().toLowerCase()
            props.functions.setSearchState(search)
            var Offset = props.data.offsetStat
            var activity = (form.elements[1].value)
            props.functions.setactivityState(activity)
            props.functions.getAllPublications(Offset, postal_code, activity, search) }

        if (props.params.page === 'back-office' && props.params.profilNav === 'Candidatures') { 
            var postal_code = (form.elements[1].value)
            props.functions.setpostal_codeState(postal_code)
            var search = (form.elements[0].value+'%').toString().toLowerCase()
            props.functions.setSearchState(search)
            var Offset = props.data.offsetStat
            props.functions.getAllCandidatys(Offset, postal_code, search) 
        }

        if (props.params.page === 'back-office' && props.params.profilNav === 'Inscriptions') { 
            var postal_code = (form.elements[1].value)
            props.functions.setpostal_codeState(postal_code)
            var search = (form.elements[0].value+'%').toString().toLowerCase()
            props.functions.setSearchState(search)
            var Offset = props.data.offsetStat
            props.functions.getAllUsers(Offset, postal_code, search) 
        }
    }

    return ( 
    <div id="search_filter">
        <form>
            <div id="search">
                    <input id="search_bar" placeholder="store search"/>
                    <div id="search_btn" onClick={() => {Search_Filter()}}><p><Icon_Search/></p></div>
            </div>
            <div id="filter">
                {props.params.page === 'advertisements' || props.params.page === 'back-office' && props.params.profilNav === 'Advertisements' ? 
                <select id="filter_activity" onChange={() => {Search_Filter()}}>
                <option key={'option'+'null'} value={false} >--- Activity ---</option>
                {jobs.map(result =>  
                <option key={'option'+result.job} value={result.job} >{result.job}</option>
                )}
                </select> : null }

                <select id="filter_department" onChange={() => {Search_Filter()}}>
                <option key={'option'+'null'} value={false} >--- Department ---</option>
                {departments.map(result =>  
                <option key={'option'+result.num_dep} value={result.num_dep} >{result.num_dep + ' - '+ result.dep_name}</option>
                )}
                </select>
            </div>
        </form> 
    </div>
    );
};

