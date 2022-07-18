export function cleanInput(input) {
  input = input.trim();
  input = input.replaceAll(' ', '-');
  input = input.replaceAll('/', '');
  input = input.toLowerCase();
  return input;
}

export async function checkImageURL(URL) {

    URL = cleanInput(URL);

  
    if (URL === "") {
      URL = 'your-message';
    }
  
    URL = process.env.PUBLIC_URL + `/greetings/${URL}.jpg`;
    // URL = `/greetings/${URL}.jpg`;
  
    fetch(URL)
      .then((res) => {
        console.log(res);
        if (res.status === 404) {
  
          console.log("Image not found at " + URL);
          return false;
        } else {
  
          console.log(URL);
          //{require('./../../assets/images/YourMessage.jpg')}
  
          //document.getElementById("video-image").src = URL;
          
          return true;

        }
      })
      .catch((err) => {
  
        console.log("Image not found at " + URL);
        return false;
      });
  
  }