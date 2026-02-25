import { useState } from "react";

const IMGBB_API = import.meta.env.VITE_IMGBB_KEY;

const ImageUploader = ({ setValue }) => {
  const [mainPreview, setMainPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState(Array(5).fill(null));

  // upload to imgbb
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data.url; // hosted image url
  };

  // main image handler
  const handleMainImage = async (file) => {
    setMainPreview(URL.createObjectURL(file));
    const url = await uploadImage(file);
    setValue("mainImage", url);
  };

  // gallery image handler
  const handleGalleryImage = async (file, index) => {
    const newPreview = [...galleryPreview];
    newPreview[index] = URL.createObjectURL(file);
    setGalleryPreview(newPreview);

    const url = await uploadImage(file);

    setValue("galleryImages", (prev = []) => {
      const arr = Array.isArray(prev) ? [...prev] : [];
      arr[index] = url;
      return arr;
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div>
        <p className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
          Main Image
        </p>
        <label className="w-full h-80 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer bg-gray-100 dark:bg-slate-800 dark:border-slate-700">
          {mainPreview ? (
            <img
              src={mainPreview}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              Click to upload main image
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleMainImage(e.target.files[0])}
          />
        </label>
      </div>

      {/* Gallery Images */}
      <div>
        <p className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
          Gallery Images (max 5)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {galleryPreview.map((img, i) => (
            <label
              key={i}
              className="h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 dark:bg-slate-800 dark:border-slate-700"
            >
              {img ? (
                <img
                  src={img}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleGalleryImage(e.target.files[0], i)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
