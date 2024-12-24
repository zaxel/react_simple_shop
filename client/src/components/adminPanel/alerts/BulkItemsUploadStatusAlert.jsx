function BulkItemsUploadStatusAlert(isProcessAborted, itemsSaved, itemsFailed, imagesSaved, imagesFailed) {
    return (
        alert(
        (isProcessAborted
        ? 'Uploading process aborted! \n' : 'Uploading process completed! \n') + 
        itemsSaved + ' items successfully added. ' + itemsFailed + ' items failed. \n'
        + imagesSaved + ' images saved. ' + imagesFailed + ' images failed.'
        )
    );
}

export default BulkItemsUploadStatusAlert;