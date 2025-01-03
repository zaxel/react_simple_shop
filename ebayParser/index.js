const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const readline = require('readline');


const itemsListFileName = 'itemsList.txt';
const parsedItemsFileName = 'items.txt';
const errorFileName = 'error.txt';
const minDelay = 5;
const maxDelay = 20;

const clearOldParsedData = async (textFilesToDel, isImgDel) => {
    const deleteTextFiles = files => {
        let deleted = 0;
        try {
            for (const file of files) {
                if (fs.existsSync('./generatedData/' + file)) {
                    fs.unlinkSync('./generatedData/' + file);
                    deleted++;
                }
            }
        } catch (err) {
            throw err;
        }
        return deleted;
    }
    const deleteImgFiles = async () => {
        let deleted = 0;
        const directory = "./generatedData/images";
        try {
            const files = await fs.promises.readdir(directory);
            for (const file of files) {
                try {
                    await fs.promises.unlink(path.join(directory, file));
                    deleted++;
                } catch (err) {
                    console.error(`Failed to delete file: ${file}`, err.message);
                }
            }
        } catch (err) {
            throw err;
        }
        return deleted;
    }
    const confirm = async () => {
        return new Promise(resolve => {
            const interface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            interface.question("would you like to permanently delete the files, including goods images from the previous session? (y/n)", function (ans) {
                const confirmDelte = ans.toLowerCase() == "y" || ans.toLowerCase() == "yes";
                interface.close();
                return resolve(confirmDelte);
            });
        })
    }
    const userConfirmed = await confirm();
    if (userConfirmed) {
        const resultTextDel = await deleteTextFiles(textFilesToDel);
        let resultImgDel = 0
        if (isImgDel)
            resultImgDel = await deleteImgFiles();

        console.log(`${resultTextDel} text files and ${resultImgDel} image files deleted.`);
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
        console.error(`Failed to fetch HTML from ${url}:`, e.message);
        throw e;
    }
}

const downloadImg = async (urls) => {

    const newImagesNames = [];
    try {
        if (!urls || !urls.length) {
            console.log("no image URLs provided for download.")
            return;
        }
        const delay = randomDelay(minDelay, maxDelay) * 1000;
        console.log(`Waiting ${Math.round(delay / 1000)} seconds before downloading ${urls.length} images.`);
        await new Promise(resolve => setTimeout(resolve, delay));


        const images = await Promise.allSettled(urls.map(async (url, i) => {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Connection': 'keep-alive'
                },
                responseType: 'arraybuffer'
            });
            const timestamp = Date.now();
            const filePath = path.join('./generatedData/images', `image_${timestamp}_${i}.webp`);
            fs.writeFileSync(filePath, response.data);
            newImagesNames.push(`image_${timestamp}_${i}.webp`);
            console.log(`Image ${i} downloaded successfully to ${filePath}`);
        }));

        images.forEach((result, i) => {
            if (result.status === 'rejected') {
                console.error(`Image ${i} download failed:`, result.reason);
            }
        });
        console.log('images arr size ', newImagesNames.length)
    } catch (e) {
        console.e(`Failed to download images.`, e.message);
        throw e;
    } finally {
        return newImagesNames;
    }
}

const parseItemsCatalog = async (items, baseEbayURL, brands, types, { brandNew, delPostCode, byeItNow, pageN }, minDelay, maxDelay) => {
    const serializedParams = brandNew + "&" + pageN + "&" + byeItNow;
    const itemsList = [];

    const addItemObjectTemplate = (itemLink, brandId, typeId) => {
        const shortItemLink = itemLink.split('?')[0];
        itemsList.push({
            "ebay_url": shortItemLink,
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

            const url = baseEbayURL + type.url + "?" + brand.title + "&" + serializedParams + "&rt=nc" + "&Brand=" + brand.title;

            try {
                console.log(`start parsing ${url}`)

                const html = await getHTML(url);
                if (!html) continue;
                const $ = cheerio.load(html);

                let children = $('body>div>section.brw-river>.brwrvr__item-results').children();

                if (children && children.length) {
                    console.log(`parsing the 1st eBay HTML list type of type ${type.title} and brand ${brand.title}, with a length of ${(children && children.length) || 0}.`);
                    $(children).each((i, child) => {
                        if (i > items) return false;
                        const itemLink = $(child).find('.brwrvr__item-card__image-wrapper>a').attr('href');
                        if (itemLink) {
                            addItemObjectTemplate(itemLink, brand.id, type.id);
                        }
                    })
                } else {
                    children = $('body>.pagecontainer>.pagecontainer__center>.container>section.b-module>ul').children();
                    console.log(`parsing the 1st eBay HTML list type of type ${type.title} and brand ${brand.title}, with a length of ${(children && children.length) || 0}.`);
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
                fs.appendFileSync(`./generatedData/${errorFileName}`, new Date().toLocaleString() + ' => ' + e.message + '\n');
                continue;
            }
        }
    }
    return itemsList;
}
const readItemsFromFile = async () => {
    try {
        const filePath = path.join('./generatedData/', itemsListFileName);
        const data = await fs.promises.readFile(filePath, 'utf8');

        const fileData = JSON.parse(data || "[]");

        if (!Array.isArray(fileData) || fileData.length === 0) {
            throw new Error("No valid item format detected in the file.");
        }
        return fileData;
    } catch (e) {
        console.error(`Error reading items from file: ${e.message}`);
        fs.appendFileSync(`./generatedData/${errorFileName}`, `${new Date().toLocaleString()} => ${e.message}\n`);

        if (e.code === "ENOENT") {
            console.error(
                "File not found. \nThe 'itemsList.txt' file must exist in the '/generatedData/' directory, " +
                "generated during the first step of the parsing process (parsing the list of item URLs), " +
                "to proceed with the individual item parsing process."
            );
        }
        return null;
    }
};


const replaceMultipleSpaces = str => {
    return str.replaceAll(/\s\s+/g, ' ');
}
const getCommonFields = (() => {
    const getTitle = ($, container) => {
        const title = $(container).find('h1.x-item-title__mainTitle .ux-textspans').text();
        return replaceMultipleSpaces(title);
    }
    const getPrice = ($, container) => {
        const price = $(container).find('.x-bin-price__content .x-price-primary .ux-textspans').text().slice(1);
        return price;
    }
    const getRate = () => {
        //simulate rating. as very few items on eBay have a rating. 
        const rate = Math.ceil(Math.random() * (50 - 28) + 28) / 10;
        return rate;
    }
    return { getTitle, getPrice, getRate };
})()
const parseProductPage = async ($, body, readyFileObj) => {
    const mainItemContainer = $(body).find('#prp-container-wrapper #mainContent .x-hero');
    const infoItemContainer = $(body).find('#prp-container-wrapper #ProductDetails .product-spectification');
    const getImages = async (container) => {
        const newImages = [];
        const images = $(container).find('.col-left .ux-image-carousel-container .ux-image-carousel.img-transition-medium').children();
        $(images).each((i, image) => {
            //there are two copies of the same images, so we are working with the second half as they suit better for parsing...
            if (i >= images.length / 2) {
                const image1 = $(image).find('img').attr('data-src');
                const image2 = $(image).find('img').attr('data-zoom-src');
                if (image1)
                    newImages.push(image1);
                if (image2)
                    newImages.push(image2);
            }
        })
        return await downloadImg(newImages);
    }
    const getInfo = (container) => {
        const newInfo = [];
        const infoRows = $(container).children();
        $(infoRows).each((i, row) => {
            const h3 = $(row).find('h3');
            newInfo.push({ title: "<h3>" + $(h3).text() + ":</h3>", description: "" });
            const list = $(row).find('ul').children();
            $(list).each((i, dl) => {
                const dt = $(dl).find('li .s-name').text();
                const dd = $(dl).find('li .s-value').text();
                newInfo.push({ title: replaceMultipleSpaces(dt), description: replaceMultipleSpaces(dd) });
            })
        });
        return newInfo;
    }

    readyFileObj.images = await getImages(mainItemContainer);
    readyFileObj.name = getCommonFields.getTitle($, mainItemContainer);
    readyFileObj.price = getCommonFields.getPrice($, mainItemContainer);
    readyFileObj.rate = getCommonFields.getRate();
    readyFileObj.info = getInfo(infoItemContainer);
    //product page has no seller description
}
const parseItemPage = async ($, body, readyFileObj) => {
    const mainItemContainer = $(body).find('main .center-panel-container');
    const footerItemContainer = $(body).find('main .x-vi-evo-main-container__bottom-panel');

    const getImages = async (container) => {
        const newImages = [];
        const getNewImageUrl = oldImageUrl => {
            const serializedAddress = oldImageUrl.split('/');
            const [nameOld, extension] = serializedAddress.at(-1).split('.');
            let imageAddress = serializedAddress.slice();
            imageAddress.splice(imageAddress.length - 1, 1, "s-l960." + extension);
            imageAddress = imageAddress.join('/');
            return imageAddress;

            // const [nameOld, extension] = serializedAddress.at(-1).split('.');
            // const imageAddress = serializedAddress.toSpliced(serializedAddress.length - 1, 1, "s-l960." + extension).join('/');
            // return imageAddress;
        }
        const images = $(container).find('.picture-panel-container .ux-image-grid-container .ux-image-grid.no-scrollbar').children();
        $(images).each((i, image) => {

            const smallImageUrl1 = $(image).find('img').attr('data-src');
            const smallImageUrl2 = $(image).find('img').attr('src');
            if (smallImageUrl1) {
                const newImgUrl = getNewImageUrl(smallImageUrl1)
                newImages.push(newImgUrl);
            }
            if (smallImageUrl2) {
                const newImgUrl = getNewImageUrl(smallImageUrl2)
                newImages.push(newImgUrl);
            }
        })
        return await downloadImg(newImages);
    }
    const getInfo = (container) => {
        const newInfo = [];
        const infoRows = $(container).find('.d-tabs .ux-layout-section-module-evo .ux-layout-section-evo__item').children();
        $(infoRows).each((i, row) => {
            $(row).find('.ux-labels-values').each((j, halfRow) => {
                let title = $(halfRow).find('dt .ux-textspans').text();
                let description = $(halfRow).find('dd .ux-textspans').text();
                title = replaceMultipleSpaces(title);
                description = replaceMultipleSpaces(description);
                newInfo.push({ title, description });
            })
        });
        return newInfo;
    }
    const getSellerDescription = (container) => {
        const sellerDescr = $(container).find('.d-item-description iframe').attr('src');
        return sellerDescr;
    }
    readyFileObj.images = await getImages(mainItemContainer);
    readyFileObj.name = getCommonFields.getTitle($, mainItemContainer);
    readyFileObj.price = getCommonFields.getPrice($, mainItemContainer);
    readyFileObj.rate = getCommonFields.getRate();
    readyFileObj.info = getInfo(footerItemContainer);
    readyFileObj.seller_description = getSellerDescription(footerItemContainer);
}

const parseItem = async (html, item) => {
    const readyFileObj = {
        name: "",
        price: 0,
        rate: 0,
        images: [],
        brandId: item.brandId,
        typeId: item.typeId,
        info: [],
        seller_description: "",
        ebay_url: item.ebay_url,
    };

    const $ = cheerio.load(html);
    const body = $('body');

    if ($(body).attr('class').includes('vi-body')) {
        await parseItemPage($, body, readyFileObj);
    } else {
        await parseProductPage($, body, readyFileObj);
    }

    return readyFileObj;
};

const parseItems = async (batchSize, minDelay, maxDelay) => {
    const items = await readItemsFromFile();
    if (!items) {
        console.error("No items found. Ensure the items file is generated in the first parsing step.");
        return;
    }
    let itemsWithHTML = [];
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize).map(async item => {
            try {
                const html = await getHTML(item.ebay_url);
                return { item, html };
            } catch (error) {
                console.error(`Failed to fetch HTML for URL: ${item.ebay_url}`, error.message);
                return null;
            }
        });

        const batchResults = await Promise.all(batch);
        itemsWithHTML.push(...batchResults.filter(result => result !== null));

        const delay = randomDelay(minDelay, maxDelay) * 1000;
        console.log(`Waiting ${Math.round(delay / 1000)} seconds before processing the next batch.`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    const parsedItems = [];
    for (const { item, html } of itemsWithHTML) {
        try {
            const parsedData = await parseItem(html, item);
            parsedItems.push(parsedData);
        } catch (error) {
            console.error(`Error parsing item: ${item.ebay_url}`, error.message);
        }
    }

    return parsedItems;

}
(async () => {
    const textFilesToDel = [itemsListFileName, parsedItemsFileName, errorFileName];
    const itemsOfOneInstance = 15;
    const baseEbayURL = "https://www.ebay.co.uk/b/";
    const itemsBatchSize = 5;
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
        {
            id: 1,
            title: "Beko"
        },
        {
            id: 2,
            title: "JVC"
        },
        {
            id: 3,
            title: "LG"
        },
        {
            id: 4,
            title: "Miele"
        },
        {
            id: 5,
            title: "Samsung"
        },
        {
            id: 6,
            title: "Sharp"
        },
        {
            id: 7,
            title: "Siemens"
        },
        {
            id: 8,
            title: "Sony"
        },
        {
            id: 9,
            title: "Toshiba"
        },
    ]

    const confirmParsingStep = async () => {
        return new Promise((resolve, reject) => {
            const interface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            interface.question("choose a parsing step:\n1 - parse and prepare the general info list of eBay items\n2 - parse item details from the prepared list\n(type '1' or 'step1' for the first step / '2' or 'step2' for the second step): " , function (ans) {
                if (ans.toLowerCase() === "1" || ans === 1 || ans.toLowerCase() === "step1") {
                    interface.close();
                    return resolve(1);
                } else if (ans.toLowerCase() === "2" || ans === 2 || ans.toLowerCase() === "step2") {
                    interface.close();
                    return resolve(2);
                } else {
                    interface.close();
                    return reject('invalid choice. please type "step1", "step2", "1", or "2" to proceed.');
                }
            });
        })
    }
    const appendToFile = (filePath, data) => {
        try {
            fs.appendFileSync(filePath, `${JSON.stringify(data)}\n`);
        } catch (err) {
            console.error(`Failed to write to file ${filePath}:`, err);
        }
    };

    try {
        console.log('Before starting the parsing process, ensure that the appropriate goods\' brands and types are present in the related variables: types and brands.\n')
        const userConfirmed = await confirmParsingStep();
        console.log(userConfirmed);
        if (userConfirmed === 1) {
            await clearOldParsedData(textFilesToDel, false);
            // step 1. run items list parsing.
            const itemsList = await parseItemsCatalog(itemsOfOneInstance, baseEbayURL, brands, types, params, minDelay, maxDelay);
            appendToFile(`./generatedData/${itemsListFileName}`, itemsList);
            console.log(itemsList);
            console.log(`created ${itemsList.length} items skeletons.`);
        } else if (userConfirmed === 2) {
            await clearOldParsedData([parsedItemsFileName, errorFileName], true);
            // step 2. run full items data parsing (an items list must be parsed at this step).
            const items = await parseItems(itemsBatchSize, minDelay, maxDelay);
            appendToFile('./generatedData/items.txt', items);
            console.log(items);
            console.log(`created ${items.length} items.`);
        }

    } catch (error) {
        console.error(error);
    }
})();


