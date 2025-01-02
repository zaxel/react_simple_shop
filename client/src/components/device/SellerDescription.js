const SellerDescription = ({ device }) => {
  return (
    <>
      {device.seller_dscr && (
        <div className="device__seller-descr">
          <h2>About this item:</h2>
          <iframe
            src={device.seller_dscr}
            title="seller description"
          />
        </div>
      )}
    </>
  );
};

export default SellerDescription;
