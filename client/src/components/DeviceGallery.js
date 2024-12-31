import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const DeviceGallery = ({device}) => {
    console.log(device)

    const images = device.img.map(dev=>{
        return {
            original: dev.image.url,
            thumbnail: dev.thumb.url,
        }
    })
    
    return <ImageGallery items={images} thumbnailPosition={"left"} showBullets={true} slideOnThumbnailOver={true} showNav={false} originalHeight={"300"}/>;
}
 export default DeviceGallery;