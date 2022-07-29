let body = {
    
    

    "variant_ids": ["14457"]  ,  

    "format": "png",
    "option_groups": ["Lifestyle 2"],
    "options": ["Front"],
    "files": [
        {
            "placement": `${placement}`,
            "image_url": `https://seavista.github.io/sandgreetings/greetings/${greeting}.jpg`,
            "position": {
                "area_width": 2500,
                "area_height": 1500,
                "width": 2500,
                "height": 1500,
                "top": 0,
                "left": 0
            }

        }
    ]

};
console.log("body",body);
return body;