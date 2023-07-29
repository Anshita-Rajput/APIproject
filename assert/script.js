const API_KEY= "3df831db2b8e4fb8937fa10448b2138f";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
  window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    blindData(data.articles);
}

function blindData(articles){
    const cardsContainer = document.getElementById('cards-container');
      const newsCardTemplate = document.getElementById('template-news-card');


    cardsContainer.innerHTML="";
      articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone= newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
      });
}

 function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector(`#news-img`);
    const newsTitle = cardClone.querySelector(`#news-title`);
    const newsSource = cardClone.querySelector(`#news-source`);
    const newsDesc = cardClone.querySelector(`#news-desc`);

    newsImg.src=article.urlToImage;
     newsTitle.innerHTML=article.title;
     newsDesc.innerHTML=article.description;
     const date= new Date(article.publishedAt).toLocaleDateString("en-US",{
         timeZone:"Asia/Jakarta"
     });
     newsSource.innerHTML= `${article.source.name} - ${date}`;
         cardClone.firstElementChild.addEventListener("click", () => {
          window.open(article.url,"blank");
         });
 }

    let curSelectesNav= null;
 function onNavItemClick(id){
   fetchNews(id);
   const navItem = document.getElementById(id);
   curSelectesNav?.classList.remove('active');
   curSelectesNav= navItem;
   curSelectesNav.classList.add('active');
 }
 const searchButton= document.getElementById('search-button');
 const searchText =document.getElementById('search-text');

 searchButton.addEventListener('click', () => {
    const query=searchText.value;
      if(!query) return;
      fetchNews(query)
      curSelectesNav?.classList.remove('active');
      curSelectesNav=null;
 })