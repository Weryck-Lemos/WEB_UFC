import {useState} from "react"

export default function FilterBar({setCountry, setCategory, setQuery}){
    const [search, setSearch] = useState("")

    const handlerSubmit = (e) =>{
        e.preventDefault();
        setQuery(search)
    };

    return(
        <div style={{display: "flex", grap:"1rem", margin:"1rem 0", flexWrap: "wrap"}}>
            <select onChange={(e) => setCountry(e.target.value)}>
                <option value="br">Brasil</option>
                <option value="us">EUA</option>
                <option value="gb">Reino Unido</option>
                <option value="pt">Portugal</option>
            </select>
            
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Todas</option>
                <option value="tecnology">Tecnologia</option>
                <option value="sports">Esportes</option>
                <option value="health">Saúde</option>
                <option value="science">Ciência</option>
                <option value="business">Negócios</option>
            </select>

            <form onSubmit={handlerSubmit} style={{display:"flex", gap:"0.5rem"}}>
                <input type="text" placeholder="Buscar Notícia" value={search} onChange={(e)=> setSearch(e.target.value)}/>
                <button type="submit">Buscar</button>
            </form>
        </div>
    )

}