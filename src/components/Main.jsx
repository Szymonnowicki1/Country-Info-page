import "./Main.css"
import BasicSelect from "./BasicSelect";
import Input from "./Input"
import Country from "./Country";
import { useState } from "react";

const Main = () => {
    const [searchTerm,setSerchTerm] = useState("");
    const [selectedRegion,setSelectedRegion] = useState("All")
    return(
        <div className="content">
            <div className="select-contener">
                <Input onSearch={setSerchTerm}/>
                <BasicSelect selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion}/>
            </div>
                <Country searchTerm={searchTerm} selectedRegion={selectedRegion}/>
        </div>
    )
}

export default Main;