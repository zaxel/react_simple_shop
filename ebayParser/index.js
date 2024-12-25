const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const readline = require('readline');


const categories = [
    {
        title: "lap-tops",
        ebayUrl: "https://www.ebay.co.uk/sch/i.html?_dcat=177&_fsrp=1&_stpos=sl38ut&_sacat=177&LH_BIN=1&_trkparms=parentrq%3Af7e02d991930a8d2a112de9effffbc2c%7Cpageci%3Ab88535b1-c1d4-11ef-946b-ee9f99fdbae6%7Ciid%3A1%7Cvlpname%3Avlp_homepage&LH_PrefLoc=1&LH_ItemCondition=1000&_fcid=3&Brand=JVC%7CLG%7CSamsung%7CSony%7CToshiba",
        decodedURI: "https://www.ebay.co.uk/sch/i.html?_dcat=177&_fsrp=1&_stpos=sl38ut&_sacat=177&LH_BIN=1&_trkparms=parentrq%3Af7e02d991930a8d2a112de9effffbc2c|pageci%3Ab88535b1-c1d4-11ef-946b-ee9f99fdbae6|iid%3A1|vlpname%3Avlp_homepage&LH_PrefLoc=1&LH_ItemCondition=1000&_fcid=3&Brand=JVC",
        decodedURIexperimental: "https://www.ebay.co.uk/sch/i.html?_dcat=177&_fsrp=1&_stpos=sl38ut&_sacat=177&LH_BIN=1&LH_ItemCondition=1000&Brand=Samsung",
    }
]

const itemsListFileName = 'itemsList.txt';
const parsedItemsFileName = 'items.txt';
const errorFileName = 'error.txt';
const minDelay = 5;
const maxDelay = 15;

const clearOldParsedData = async () => {
    const files = [itemsListFileName, parsedItemsFileName, errorFileName];
    const deleteFiles = files => {
        let deleted = 0;
        for (let i = 0; i < files.length; i++) {
            if (fs.existsSync('./generatedData/' + files[i])) {
                fs.unlinkSync('./generatedData/' + files[i]);
                deleted++;
            }
        }
        return deleted;
    }
    const confirm = async () => {
        return new Promise(resolve => {
            const interface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            interface.question("aAre you sure you want to permanently delete files from the previous session? (y/n) ", function (ans) {
                const confirmDelte = ans.toLowerCase() == "y" || ans.toLowerCase() == "yes";
                interface.close();
                return resolve(confirmDelte);
            });
        })
    }
    const userConfirmed = await confirm();
    if (userConfirmed) {
        const result = await deleteFiles(files);
        console.log(`${result} files deleted.`);
        return true;
    } else {
        console.log("file deletion canceled. new data will be added to the existing data.");
        return false;
    }
}

const randomDelay = (min, max) => {
    return Math.random() * (max - min) + min;
}

const getHTML = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive'
            }
        });
        return data;
    } catch (e) {
        console.e(`Failed to fetch HTML from ${url}:`, e.message);
        throw e;
    }
}

const parseItemsCatalog = async (items, baseURL, brands, types, { brandNew, delPostCode, byeItNow, pageN }, minDelay, maxDelay) => {
    const serializedParams = brandNew + "&" + pageN + "&" + byeItNow;
    const itemsList = [];

    const addItemObjectTemplate = (itemLink, brandId, typeId) => {
        const shortItemLink = itemLink.split('?')[0];
        itemsList.push({
            "ebay_urk": shortItemLink,
            "name": "",
            "price": 0,
            "rate": 0,
            "brandId": brandId,
            "typeId": typeId,
            "images": [],
            "info": [],
            "seller_description": ""
        });
    }
    for (const brand of brands) {
        for (const type of types) {

            const url = baseURL + type.url + "?" + brand.title + "&" + serializedParams + "&rt=nc" + "&Brand=" + brand.title;

            try {
                console.log(`start parsing ${url}`)

                const html = await getHTML(url);
                if (!html) continue;
                const $ = cheerio.load(html);

                let children = $('body>div>section.brw-river>.brwrvr__item-results').children();

                if (children && children.length) {
                    console.log(`parsing 1st items list type with the length of ${(children && children.length || 0)}`);
                    $(children).each((i, child) => {
                        if (i > items) return false;
                        const itemLink = $(child).find('.brwrvr__item-card__image-wrapper>a').attr('href');
                        if (itemLink) {
                            addItemObjectTemplate(itemLink, brand.id, type.id);
                        }
                    })
                } else {
                    children = $('body>.pagecontainer>.pagecontainer__center>.container>section.b-module>ul').children();
                    console.log(`parsing 2nd items list type with the length of ${(children && children.length || 0)}`);
                    $(children).each((i, child) => {
                        if (i > items) return false;
                        const itemLink = $(child).find('.s-item__wrapper .s-item__image-section .s-item__image a').attr('href');
                        if (itemLink) {
                            addItemObjectTemplate(itemLink, brand.id, type.id);
                        }
                    })

                }
                const delay = randomDelay(minDelay, maxDelay) * 1000;
                console.log(`waiting ${Math.round(delay / 1000)} sec before continue.`);
                await new Promise(resolve => setTimeout(resolve, delay));

            } catch (e) {
                console.error(`Failed to parse HTML from ${url}:`, e.message);
                fs.appendFileSync(`./generatedData/${errorFileName}`, new Date().toLocaleString() + ' => '  + e.message + '\n');
                continue;
            }
        }
    }
    return itemsList;
}
(async () => {
    const itemsOfOneInstance = 15;
    const baseURL = "https://www.ebay.co.uk/b/";
    const params =
    {
        brandNew: "LH_ItemCondition=1000",
        delPostCode: "_stpos=tw31ux",
        byeItNow: "LH_BIN=1",
        pageN: "_pgn=1"
    }

    const types = [
        {
            id: 1,
            title: "TV's",
            url: "bn_1839641"
        },
        {
            id: 2,
            title: "lap-tops",
            url: "bn_450756"
        },
        // {
        //     id: 3,
        //     title: "fridges",
        //     url: "bn_3202165"
        // },
        // {
        //     id: 4,
        //     title: "ovens",
        //     url: "bn_3244128"
        // },
        // {
        //     id: 5,
        //     title: "microwaves",
        //     url: "bn_3352771"
        // },
        // {
        //     id: 6,
        //     title: "washing machines",
        //     url: "bn_3268990"
        // },
        // {
        //     id: 7,
        //     title: "hoovers",
        //     url: "bn_3252714"
        // },
        // {
        //     id: 8,
        //     title: "projectors",
        //     url: "bn_780395"
        // },
        // {
        //     id: 9,
        //     title: "air conditioners",
        //     url: "bn_7117213203"
        // },
    ]
    const brands = [
        // {
        //     id: 1,
        //     title: "Beko"
        // },
        // {
        //     id: 2,
        //     title: "JVC"
        // },
        // {
        //     id: 3,
        //     title: "LG"
        // },
        // {
        //     id: 4,
        //     title: "Miele"
        // },
        {
            id: 5,
            title: "Samsung"
        },
        // {
        //     id: 6,
        //     title: "Sharp"
        // },
        // {
        //     id: 7,
        //     title: "Siemens"
        // },
        // {
        //     id: 8,
        //     title: "Sony"
        // },
        // {
        //     id: 9,
        //     title: "Toshiba"
        // },
    ]

    //step 1. run items list parsing
    const res = await clearOldParsedData();
    const itemsList = await parseItemsCatalog(itemsOfOneInstance, baseURL, brands, types, params, minDelay, maxDelay);
    fs.appendFileSync(`./generatedData/${itemsListFileName}`, `${JSON.stringify(itemsList)} \n`);
    console.log(itemsList);
    console.log(`created ${itemsList.length} items skeletons.`);

    //step 2. run full items data parsing (must have items list parsed on this step)
    // to be implemented..
    // const items = await parseItems(...); 
    // fs.appendFileSync('./generatedData/items.txt', `${items}`);
    // console.log(items);
    // console.log(items.length);
})();


