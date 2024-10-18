const ProductCard = ({ product }) => {
  const { photoUrl, model, brand, price } = product;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={photoUrl} alt="Shoes" className="w-full h-auto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">{model}</div>
        </h2>
        <p className="text-lg font-semibold text-blue-500 mt-2">
          ${price?.toFixed(2)}
        </p>
        <div className="card-actions justify-center">
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
