import { PrintfulClient, request } from 'printful-request';
import { Buffer } from "buffer";
import { useState } from "react";




Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;


const printful = new PrintfulClient(process.env.REACT_APP_PRINTFUL_KEY, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Host": "https://api.printful.com/",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "X-PF-Store-Id": "8524515",
        "Authorization": `Bearer ${process.env.REACT_APP_PRINTFUL_TOKEN}`
    }

});

const printfulPOST = new PrintfulClient(process.env.REACT_APP_PRINTFUL_KEY, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Host": "https://api.printful.com/",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "X-PF-Store-Id": "8524515",
        "Authorization": `Bearer ${process.env.REACT_APP_PRINTFUL_TOKEN}`
    }

});

 async function getCardBody(greeting,variant_ids,placement) 
 {
   
    let theBody = {
  
        "variant_ids": [14457,14460,14458] ,  

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
    console.log("theBody",theBody);
    return theBody;

}; //end card body

async function getMetalPrintsBody(greeting,variant_ids,placement) 
 {
   
    let theBody = {
  
        "variant_ids": [15136, 15134] ,  

        "format": "png",
        "option_groups": ["Lifestyle"],
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
    console.log("theBody",theBody);
    return theBody;

}; //end metal prints

async function getPostCardsBody(greeting,variant_ids,placement) 
 {
   
    let theBody = {
  
        "variant_ids": [11513] ,  

        "format": "png",
        "option_groups": ["Lifestyle"],
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
    console.log("theBody",theBody);
    return theBody;

}; //end metal prints

//get the variants via print files for the product,
//NOTE THIS IS WHERE PROMISES IS RESOLVED
const getProductVariants = async (productId, greeting, placement) => {

      printful.get(`mockup-generator/printfiles/${productId}`)
        .then((res) => {
  
            let variants =[];
            let stringVariants = "";
            for (let i = 0; i < res.result.variant_printfiles.length; i++) {
                
                variants.push(res.result.variant_printfiles[i].variant_id);
                stringVariants += "'" +  res.result.variant_printfiles[i].variant_id + "',";
                 
            }
            //convert into an array of strings
            //let stringVariants = variants.map(String) //=> ['1','2','3','4','5']
            
            //clean trailing comma
            stringVariants = stringVariants.slice(0, -1);
            //console.log("stringVariants",stringVariants);

            console.log("variants",stringVariants);
            return stringVariants;
          

        
        });



};



// create a mockup task 
const createMockUpTask = async (productId, greeting , id, placement) => {
    
    //note this assign = theBody
    //let theVariants = await getProductVariants(productId, greeting, placement);
    let theVariants =[];

    let theBody = "";
    console.log("id",id);
    switch (id) {
        case "cardImage":
            theBody = await getCardBody(greeting,theVariants,placement);
            break;
        case "printsImage":
            theBody = await getMetalPrintsBody(greeting,theVariants,placement);
            break;
        case "postCardsImage":
            theBody = await getPostCardsBody(greeting,theVariants,placement);
            break;
        default:
            theBody = await getCardBody(greeting,theVariants,placement);
            break;
    };


    
     
   
    let taskID = await printfulPOST.post(`mockup-generator/create-task/${productId}`, theBody)
    .then((task) => {
        return task.result.task_key;
    });

    //delay for 7 seconds
    await new Promise(resolve => setTimeout(resolve, 7000));

    let mockups = await printful.get(`mockup-generator/task?task_key=${taskID}`)
        .then((res) => {         
            return res.result.mockups;
        });

    document.getElementById(id).src = mockups[0].mockup_url;

    //store to local storage
    // Create new Date instance
    let date = new Date();
    
    // Add a day or seconds
    date.setDate(date.getDate() + 1);
    //date.setSeconds(date.getSeconds() + 30);

    localStorage.setItem(greeting + "-" + id, JSON.stringify({
        expiration: date,
        url: mockups[0].mockup_url,
        elementId: id
      }));


    console.log("mockups",mockups);

};


  



//EXPORTED FUNCTIONS


export const BuildMockUps = async (productId, greeting, id, placement) => {
     
    //check if the greeting is in local storage
    const greetingItem = JSON.parse(localStorage.getItem(greeting + "-" + id));

    if(greetingItem){
       
        //check if expired
        if(Date.now() > new Date(greetingItem.expiration)){
            localStorage.removeItem(greeting);
            console.log("greeting","removed");
        }
        else
        {
            document.getElementById(id).src = greetingItem.url;
            return; //exit the function
        }
       
    };

    // unique do the Prinful request
    createMockUpTask(productId, greeting, id, placement);
};


