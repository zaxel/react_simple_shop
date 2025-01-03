import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import no_image from '../../assets/no-image.jpg';

const DeviceGallery = ({device}) => {
    const images = device.img.map(dev=>{
        return {
            original: dev.image.url,
            thumbnail: dev.thumb.url,
        }
    })
    return <ImageGallery items={images.length ? images : [{original: no_image}]} thumbnailPosition={"left"} showBullets={true} slideOnThumbnailOver={true} showNav={false} originalHeight={"300"}/>;
}
 export default DeviceGallery;