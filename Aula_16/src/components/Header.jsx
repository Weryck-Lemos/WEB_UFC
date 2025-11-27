import { useEffect } from "react"

export default function Header(){
    const [dark, setDark] = useState(()=> localStorage.getItem("theme") === "dark")
    
    useEffect(() => {
        document.body.classList.toggle("dark", dark)
        localStorage.setItem("theme", dark? "dark" : "light")
    }, [dark])
    
    return(
        <header>
            <h1>Portal de Notícias</h1>
            <button onClick={() => setDark(!dark)}>
                {dark ? "Claro" : "Escuro"}
                
            </button>
        </header>
    )
}