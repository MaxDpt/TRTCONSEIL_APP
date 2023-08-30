

    export default function Stores_form(props) {
        const departments = props.constants.departments
        var token = sessionStorage.getItem('token')
        var id = sessionStorage.getItem('id')

    const createStore = async () => {
        let form = document.querySelector('form');
        let userRole = props.userClass.u_role 
        await props.requests.StoresRequests.setStore(token, id, form, userRole);
        form.reset();
        props.getStores_ByUser();
    }

        return (
        <form id='Stores_formulary_content'>
                <p>CREATE A NEW STORE</p> 
                <label>Name :</label>               
                <input type='text' id='name' />
                <label>Address :</label>            
                <input type='text' id='address' />              
                <label>City :</label>
                <input type='text' id='city' />              
                <label>Postal code :</label>             
                <select type='text' id='postal_code'>
                    {departments.map(result => 
                      <option key={'option'+result.num_dep} value={result.num_dep} >{result.num_dep+' '+result.dep_name+' '+result.region_name}</option>)}
                </select>
                <label>Phone :</label>
                <input type='text' id='phone' />              
                <label>Hourly :</label>           
                <input type='text' id='hourly' />
                <label>N° Siren :</label>
                <input type='text' id='siren' />
                
                <div id='Stores_form_btn'><div id='button' onClick={createStore}><p>register</p></div></div>
            
        </form>
        );
    };
    