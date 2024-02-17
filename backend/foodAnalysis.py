import json
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)


@app.route('/traderjoes', methods=['GET'])
def get_json():
    # Get JSON data from the request parameters
    item_array = request.args.get('items')

    # Check if JSON data exists
    if not item_array:
        return jsonify({'error': 'No JSON data provided'})

    # Convert the JSON string to a Python dictionary
    try:
        data = eval(item_array)
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON data'})

    # Get Nutrition infomration
    # URL to which you want to send the GET request
    url = "https://trackapi.nutritionix.com/v2/search/instant"

    # Headers to include in the request
    headers = {
        "x-app-id": "5dca93f3",
        "x-app-key": "f7f12e0ac782a22ee53e1503d7e6dd75",
        "x-remote-user-id":"0",
        "Content-Type":"application/x-www-form-urlencoded"
    }

    processed_data = {}
    for item in data:
        # Query parameters to include in the request
        params = {
            "brand_ids": '["51db381b176fe9790a89b587"]',
            "query": str(item), 
            "detailed": "True", 
            "common": "False"
        }
        # Send the GET request
        nutritionix_response = requests.get(url, headers=headers, params=params)

        # Check if the request was successful (status code 200)
        if nutritionix_response.status_code == 200:
            nutritionix = nutritionix_response.json()
            
            # TODO analysis here 
            if len(nutritionix['branded']) == 0:
                continue
            processed_data[item] = nutritionix['branded'][0]

        else:
            # If the request was unsuccessful, print the status code
            print(f"Failed to fetch data: {nutritionix_response.status_code}")



    # Process the data (for demonstration, just echoing back)

    # Return the processed data as JSON
    return jsonify(processed_data)


if __name__ == '__main__':
    app.run(debug=True)

# with open("./backend/fooddb/sample.csv") as f: 
#     for line in f: 
#         array = line.split("\t")
#         for item in array: 
#             print(item)
#         break 

# import pandas as pd
# indices = ["product_name", "generic_name", "stores", "ingredients_text", "ingredients_tags"]
# df = pd.read_csv("./backend/fooddb/sample.csv", sep="\t")