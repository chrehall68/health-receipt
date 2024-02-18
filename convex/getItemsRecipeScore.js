const vision = require('@google-cloud/vision');
const fetch = require('node-fetch');
const apiKey = 'af8024d0e47c9a16f2997f5d2767f0ca69473679e4e31ceb6553a8c56a185907';
const baseUrl = 'https://api.together.xyz';
const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "treehacks-ocr",
    "private_key_id": "1ec57baa8b5c40718ba38d54617e4c94cac3ce1d",
    "private_key": "-----BEGIN PRIVATE 
KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDocbVqTmYjlAQc\nAm4lAQQLK9rVxHewMV77BXJc76mTnHTBVmLCcqDoxMKYIRQC0YuUBktiqnjyCyCL\nGiGvCsdoAtujRWa9R8yZWVm4ZGK9m/1ypK9DEZpj+mKryuLBUAHyaj4KK8bUQi5V\nIjXXU2Ar0WoVV8W8bNuGsucBP/cryj1WAyu8I7543s6JHUVjzuE2Q4a2G3v1ljvL\nEzPFtxGJWbZu9LSmJLS9U8Kz64XDB9j/PFfC2a4zPB6ATcqs8/It3cxuvVjSwZDW\nOmwwK92M73u1WKnT4b3zrDf/bkds/YD19AucuMKlfoIkR342rCTJcj0qKjLregNg\nTIaLSTzNAgMBAAECggEAG+S9UPb8gct63MOb5RvkmNSX66wqcr3R+IyURzvJXTna\ntvK/YjcwQQ6PjYL2rEnqFobU2A+9+MnGC3tEzIUeHciuA79Jz3AEyOg0gJCnWrqT\n5QSHNaSwosvCuHvdzzXjLex66myLbSBOABBdZqwOL+Pu94WzaGOlylnAp+E9r4bY\nXSCXR+svCdgFABNlk0ILY6p6QcQZh2PZfilbSlH1jm0cS2fLLY+O0Y+2NeePJPGq\nuPeCxbSi4liLlI0z//kFhnYyJpPiGRzisHQiqj9k8niCeuydW+bZUgx2PvWI0gfS\nEgOgz+QK3VgUCqZRA8r56uYXcHMma3FzjinfLCXevwKBgQD3Uq7v0eISA32kZjnx\ngn5eW8nT+mbqDEa+Fow3pAIEInhNMX7CRorCzyIJONnZXaKZYBRqtfyWzOnWfHXP\nwcJG4NdTsJ8IKNto3pyZXqpJTIRlqUyF2zs3uvTIdvqoFHWsh7E1X830/SYmyJRQ\nAu8dJWsngfcRDRAywfDWujzhhwKBgQDwmWRmFcM2joHeE7TGOlrTO2rn9ofA4h7h\nIgTDy7skuogybFDFOr7cuCh0b4EpAKOUM7ZxuPMDBexEj7lMgMAdJlSwWQNKsMzr\nQ6VWyQp3qOCAGfnvYlJW3Nj0Nv/DXJx2zVp1YX5NKjXnrfphlLFenznetYKkqDQK\nR4/4NcsUCwKBgQDsTLuHtuhgfaVVpbZG4X8LeHdlaSFbDU+p3rEpmDG08ZovZtLN\nm8iISI8kcIT0AVqRYBMhwa8MBcyFeXS2g1Gzlq8k7uODUEYR9F96yc+5KLp2x0Kt\nwcDahm3J+qOSY7nqldriPB7zq8r/0zShHayIFHBE1w/P4sNPO613+4ifkQKBgQDk\nNmsf1Zaj4gpW7lQzDljmMV7XBWWA1Dq8CvuACHfLf87+HPWEDpPJYjilMLrPfJas\nVVzBg8+lV3HjGnyFjz4qqBf+aYAQ0aCdqz1iEzGFjL7dY0ZKBPXbBIIZKy3wTaDv\noxshacdWRCp7Re/PrS2MdfV7RKnVquIpufVaVxP4PwKBgHxBn6WbnDfcD6LbM9Bx\nRb8MFxfFnVSDRoGDQFxFwM28NOMwAl++q8XXPs/YMk94JgWQkZiIsW4cuVst65Nd\nwzIYywqDWTjzSehxpV8SvfvJNidyC49ggVs/xshwUHfujlV4/wqA1dEKYKIQtBqx\nURLGTMDIeRftGaWKKKR35tOp\n-----END 
PRIVATE KEY-----\n",
    "client_email": "804582834972-compute@developer.gserviceaccount.com",
    "client_id": "109238440853850962902",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/804582834972-compute%40developer.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}))

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};

const visionClient = new vision.ImageAnnotatorClient(CONFIG);


async function getScore(foodItems) {
    const url = `${baseUrl}/v1/chat/completions`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const foodItemsStr = foodItems.join(', ');
    const data = {
        model: "Qwen/Qwen1.5-72B-Chat",
        max_tokens: 1024,
        messages: [{
            role: "user",
            content: `I want you to rate purchases based on how healthy or uhealthy they are. Return a score out of 100 (with 100 
being very healthy and 0 being very unhealthy). For reference consider a purchase of (Mixed greens, almond butter, quinoa, wild 
salmon, cauliflower rice, sweet potatoes, avocados, olive oil, chia seeds, blueberries, sprouted bread, kefir, hummus, almonds, 
lentils, Brussels sprouts, steel-cut oats, bell peppers, organic eggs, Greek yogurt) will be considered very healthy with a score of 
100. And an order of (Candy, processed snacks, sugary cereals, frozen desserts, pre-packaged sweets, flavored yogurts, processed 
meats, high-fat dressings, soda, refined pastries, high-sodium frozen meals, artificially flavored snacks, sweetened beverages) will 
be considered very unhealthy with a score of 0.
            Keeping this in mind rate the following order: ${foodItemsStr}
            Give me a single score out of 100 that would wholistically reflect on the order. Return me a single number, nothing 
else.`
        }]
    };

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const score = result.choices[0].message.content;

    const match = score.match(/\d+/);

    if(!match) {
        return "Sorry, we could not calculate the score"
    }

    const finalScore = match[0];
    return finalScore;
}


async function getRecipe(foodItems) {
    const url = `${baseUrl}/v1/chat/completions`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const foodItemsStr = foodItems.join(', ');
    const data = {
        model: "meta-llama/Llama-2-70b-chat-hf",
        max_tokens: 1024,
        messages: [{
            role: "user",
            content: `From the following food items: ${foodItemsStr}, return a healthy recipe.`
        }]
    };

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const recipe = result.choices[0].message.content;
    return recipe;
}


async function getItems(receiptStr) {
    const url = `${baseUrl}/v1/chat/completions`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const data = {
        model: "garage-bAInd/Platypus2-70B-instruct",
        max_tokens: 1024,
        messages: [{
            role: "user",
            content: `Return the names of all food items from the following text extracted from a Grocery Bill: '${receiptStr}' 
Return these items in the form of a python list. Make sure to only include food items. Also strictly only return the python list with 
food items. Do not return anything else. Just the python list. Your response must only contain the python list and no other words.`
        }]
    };

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const items = result.choices[0].message.content;

    const pattern = /\['.*?'\]/;
    const match = items.match(pattern);
    let itemsList = [];

    if (match) {
        itemsList = JSON.parse(match[0].replace(/'/g, '"')); // Replace single quotes with double quotes for valid JSON
        console.log("food Items List :");
        console.log(itemsList);
    } else {
        console.log("No list found in the string.");
    }

    return itemsList;
}


function removeUnnecessaryLines(receiptString) {
    const lines = receiptString.split('\n');
    const items = lines.filter(line => 
        !(line.match(/\$/) || line.match(/@/) || line.match(/ AM /) || line.match(/ PM /)) &&
        line.match(/^T\s/) ? line.substring(2) : line
    );

    return items;
}


async function getTextFromImage(inputFilePath) {
    const [result] = await visionClient.textDetection({ image: { source: { filename: inputFilePath } } });
    const text = result.fullTextAnnotation ? result.fullTextAnnotation.text : '';
    console.log('Grocceries :');
    console.log(text);
    return text;
}


async function processReceipt(file_path) {
    const text = await getTextFromImage(file_path);
    const items = removeUnnecessaryLines(text);
    if(items.length == 0){
        console.log("Please click a more clear picture of the bill");
        return;
    }
    const foodItems = await getItems(items);
    return foodItems;
    // const recipe = await getRecipe(foodItems);
    // console.log(recipe);
    // const score = await getScore(foodItems);
    // console.log("Grocery score:" + score);
}


