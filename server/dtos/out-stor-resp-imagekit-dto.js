module.exports = class ImageKitDto {
    id;
    title;
    url;
    width;
    height;
    size;
    time;
    delete_url;
    versionInfo;
    filePath;
    fileType;
    AITags;
    image = {
        filename: "",
        url: ""
    };
    thumb = {
        filename: "",
        url: ""
    };

    constructor(model){
        const {fileId=null, name="", size=null, versionInfo=null, filePath="", url="", fileType="", height=0, width=0, thumbnailUrl="", AITags=[]} = model;
        this.id = fileId;
        this.name = name;
        this.url = url;
        this.width = width;
        this.height = height;
        this.size = size;
        this.time = null;
        this.delete_url = null;
        this.image.filename = name;
        this.image.url = url;
        this.thumb.filename = name;
        this.thumb.url = thumbnailUrl;
        this.versionInfo = versionInfo;
        this.filePath = filePath;
        this.fileType = fileType;
        this.AITags = AITags;
    }
}
