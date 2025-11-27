import { useState } from "react"

export default function Favorites(){
    const [favorites, setFavorites] = useState([])

    useEffect( ()=> {
        const keys = object.keys(localStorage)
        const favs = keys.map( k => JSON.parse(localStorage.getItem(k)));
        setFavorites(favs)
    }, []);

    return(
        <div className="container">
            <h2>Meus favoritos</h2>
            <div className="grid">
                {
                    favorites.map((news,i) => (
                        <div key={i} style={{background:"#fff", padding:"1rem"}}>
                            <h3>{news.title}</h3>
                            <a href="news.url" target="_blank">Ler Mais</a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}