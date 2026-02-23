const Wishlist = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">❤️ Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">Product {i}</h3>
            <p className="text-sm text-gray-500">৳ 700</p>
            <div className="mt-2 flex justify-between">
              <button className="btn btn-sm btn-primary">Add to Cart</button>
              <button className="btn btn-sm btn-error">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Wishlist;