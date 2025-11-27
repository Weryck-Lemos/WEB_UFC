import NewsCard from "../components/NewsCard"
import { useEffect, useState } from "react"

export default function FavoritePage(){
    const [favorites, SetFavorites] = useState([])
    useEffect( ()=>{ 
        const favs = Object.keys(localStorage).map((key)=> {
            try {
                const item = JSON.parse(localStorage.getItem(key))
                if(item && item.title && item.url){
                    return item;
                }

                else{
                    return null;
                }
            }
            catch{
                return null;
            }
        })
        .filter((item) => item != null);
    SetFavorites(favs);
        
    }, [])
    return(
        <div className="container">
            <h2>Meus Favoritos</h2>
            <div className="grid">
                {
                    favorites.length > 0 ?(favorites.map((news, i) => <NewsCard key={i} news={news}/>)) : 
                    (<><p>Você ainda nao favoritou nenhuma noticia</p></>)
                }
            </div>
        </div>
    )
}