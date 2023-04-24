const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');


// async function getQuotes(n = getRandomNum()) {
//     const quotes = 'assets/qotesdata.json';
//     const res = await fetch(quotes);
//     const data = await res.json();
//     quote.textContent = `"${data[n].text}"`;
//     author.textContent = `${data[n].author}`;

//     console.log(data);
// }
// getQuotes();
function getQuotes(n = getRandomNum()) {
    const quotes = 'assets/qotesdata.json';
    fetch(quotes)
        .then(res => res.json())
        .then(data => {
            quote.textContent = `"${data[n].text}"`;
            author.textContent = `${data[n].author}`;
            // console.log(data);
        });

}
getQuotes();

function getRandomNum(min = 0, max = 70) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
}

changeQuote.addEventListener('click', () => getQuotes());