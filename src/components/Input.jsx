import "./Input.css"
import { Search } from 'lucide-react';

const Input = ({onSearch}) => {
    return(
        <div className="input-contener">
            <Search className="search-icon" size={16}/>
            <input className="input" placeholder="Search for a country..." onChange={(e) => onSearch(e.target.value)}>
            
            </input>
        </div>

    )
}

export default Input;