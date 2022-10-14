const { config } = require('dotenv');
config();
const { search } = require('vinted-api');
const fs = require('fs');
const ids = require('./ids.json');

const str = 'Your search';
const searchX = async() => {
    return new Promise((resolve, reject) => {
        search(`https://www.vinted.fr/api/v2/catalog/items?search_text=${str}`, undefined, undefined, { order: 'newest_first' }).then((res) => resolve(res)).catch((err) => reject(err));
    });
};

setInterval(async() => {
    const results = (await searchX()).items.filter(x => !ids.includes(x.id)).splice(0, 10 /* Number of posts you want to display */).filter(x => x != (undefined || null));

    ids.concat(results.map(x => x.id));
    fs.writeFileSync('./ids.json', JSON.stringify(ids));
    // Do someting with results
    // For example :

    results.forEach((r) => {
        console.log(`Post: ${x.title}`);
    });
}, 15000);