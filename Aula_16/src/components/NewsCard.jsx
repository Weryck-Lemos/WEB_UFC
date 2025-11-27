export default function({news}){
    const {favorited, setFavorited} = useState(localStorage.getItem(news.url) != null)

    const toggleFavorite = () => {
        if(favorited){
            localStorage.removeItem(news.url)
        }
        else{
            localStorage.setItem(news.url, JSON.stringify(news))
        }
        setFavorited(!favorited);
    }

    return(

        <div style={{background:"white" , borderRadius:"8px", padding:"1rem", boxShadow:"0 2px 4px rgba(0,0,0, 0.1)"}}>
            {
                news.image &&(
                    <img src={news.image} alt={news.title} style={{width:"100%", borderRadius: "8px"}}/>
                )}
            <h3>{news.title}</h3>
            <p>{news.description}</p>
            <small>{news.source?.name}</small>
            <div style={{marginTop:"0.5rem", display:"flex", justifyContent:"space-between"}}>
                <a href={news.url} target="_blank">Ler Mais...</a>
                <button onClick={toggleFavorite}> {favorited ? "Favorito": "Favoritar"}</button>
            </div>

        </div>

    )
}