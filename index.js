const { uploadByUrl } = require('telegraph-uploader');


function uploadImageToTelegraph(imageURL) {
  return uploadByUrl(imageURL)
    .then((result) => {
      console.log(result);
      /* Örnek sonuç:
       * {
       *    link: 'https://telegra.ph/file/...',
       *    path: '/file/...',
       * }
       */
      return result.link;
    })
    .catch((error) => {
      console.error('Error uploading image:', error);
      return null;
    });
}

const imageURL = 'https://ultraluksyasam.com/wp-content/uploads/2023/02/Hadise.jpg';

uploadImageToTelegraph(imageURL)
  .then((telegraphURL) => {
    if (telegraphURL) {
      console.log('Telegraph URL:', telegraphURL);
    } else {
      console.log('Image upload failed.');
    }
  });
