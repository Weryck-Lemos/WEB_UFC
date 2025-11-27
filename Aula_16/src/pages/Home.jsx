import { useEffect, useState } from "react"
import { getTopHeadlines } from "../services/NewsaAPI"
import FilterBar from "../components/FilterBar"
import NewsCards from "../components/NewsCard"

export default function Home(){
    const [articles, setArticles] = useState([]);
    const [country, setCountry] = useState("br");
    const [category, setCategory] = useState("");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    {
        async function fetchData() {
            try{
                setLoading(true);
                const data = await getTopHeadlines(country, category, query);
                setArticles(data)
                console.log(data)
                setError("")
            }
            catch(err){
                console.log("Erro ao buscar notícias", err)
                setError("Erro ao carregar notícias, tente novamente mais tarde.")
            }
            finally{
                setLoading(false);
            }
        }
    }   
    useEffect(()=>{
        fetchData()
    },[country, category, query])
    

    return(
        <div className="container">
            <FilterBar setCountry={setCountry} setCategory={setCategory} setQuery={setQuery}/>
            {loading && <p>Carregando notícias...</p>}
            {error && <p style={{color:"red"}}>{error}</p>}

            
            {!loading && !error &&(
                <>
                    <div className="grid">
                        {articles.length > 0 ? (
                        articles.map((news, i)=> <NewsCard key={i} news={news}/>))
                        :(<p>Nenhuma notícia encontrada</p>)
                        }
                    </div>
                </>
            )}
        </div>
    )
}