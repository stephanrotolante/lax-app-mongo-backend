const fs = require("fs");

const saveImage = (req,res,next) => {
    try {
        const imageID = randomID();
        const image = req.body.image.split(",")[1];
        const buff = new Buffer.from(image, 'base64');
         fs.writeFileSync(`./images/${imageID}.jpg`,buff);
        req.body.image = imageID;
        next();
    } catch {
        console.log("There was an error saving the image.");
        res.end();
    }
    
}
 
const randomID = () => {
    return Math.random().toString(36).substr(2, 9);
}

module.exports = {saveImage};