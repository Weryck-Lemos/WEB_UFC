import axios from "axios"

const API_KEY = "a296b0c8165f986e38c564030e7e36af"
export async function getTopHeadlines(country = "br", category="", query=""){
    const url = `https://gnews.io/api/v4/top-headlines?lang=pt&country=${country}${
    category ? `&topic=${category}` : ""
    }${query ? `&q=${query}` : ""}&apikey=${API_KEY}`;

    const response = await axios.get(url);
    return response.data.articles;
}