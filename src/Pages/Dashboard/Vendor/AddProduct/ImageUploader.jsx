import { useEffect, useState } from "react";

const IMGBB_API = import.meta.env.VITE_IMGBB_KEY;

const ImageUploader = ({ setValue, getValues, resetImages, setUploading }) => {
  const [mainPreview, setMainPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState(Array(5).fill(null));
  const [uploadingIndex, setUploadingIndex] = useState(null); 

  useEffect(() => {
    if (resetImages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMainPreview(null);
      setGalleryPreview(Array(5).fill(null));
      setValue("mainImage", "");
      setValue("galleryImages", []);
    }
  }, [resetImages, setValue]);

  // upload to imgbb
  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);
    return data.data.url;
  };

  // main image handler
  const handleMainImage = async (file) => {
    if (!file) return;

    setUploadingIndex("main");
    setMainPreview(URL.createObjectURL(file));

    const url = await uploadImage(file);
    setValue("mainImage", url);

    setUploadingIndex(null);
  };

  // gallery image handler
  const handleGalleryImage = async (file, index) => {
    if (!file) return;

    setUploadingIndex(index);

    const newPreview = [...galleryPreview];
    newPreview[index] = URL.createObjectURL(file);
    setGalleryPreview(newPreview);

    const url = await uploadImage(file);

    const prevImages = getValues("galleryImages") || [];
    const newImages = [...prevImages];
    newImages[index] = url;

    setValue("galleryImages", newImages);

    setUploadingIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div>
        <p className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
          Main Image
        </p>
        <label
          className={`w-full md:w-1/2 mx-auto h-80 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer bg-gray-100 dark:bg-darkbody dark:border-slate-700
          ${uploadingIndex !== null ? "opacity-50 pointer-events-none" : ""}`}
        >
          {mainPreview ? (
            <img
              src={mainPreview}
              className="w-full h-full object-contain rounded-xl"
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
            disabled={uploadingIndex !== null}
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
              className={`h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 dark:bg-darkbody dark:border-slate-700
              ${uploadingIndex !== null ? "opacity-50 pointer-events-none" : ""}`}
            >
              {img ? (
                <img
                  src={img}
                  className="w-full h-full object-contain rounded-lg"
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
                disabled={uploadingIndex !== null}
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
