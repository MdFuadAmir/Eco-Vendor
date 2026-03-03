import { useState } from "react";

const IMGBB_API = import.meta.env.VITE_IMGBB_KEY;

const NIDImageUploader = ({ setValue, setUploading }) => {
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);

  const [frontUploaded, setFrontUploaded] = useState(false);
  const [uploadingNow, setUploadingNow] = useState(false);

  const uploadImage = async (file) => {
    setUploading(true);
    setUploadingNow(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    setUploading(false);
    setUploadingNow(false);

    return data.data.url;
  };

  const handleFrontImage = async (file) => {
    if (!file) return;
    setFrontPreview(URL.createObjectURL(file));
    const url = await uploadImage(file);
    setValue("nidFront", url);
    setFrontUploaded(true); 
  };

  const handleBackImage = async (file) => {
    if (!file) return;
    setBackPreview(URL.createObjectURL(file));
    const url = await uploadImage(file);
    setValue("nidBack", url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* NID Front */}
      <label
        className={`h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer
        bg-gray-100 dark:bg-darkbody dark:border-slate-700
        ${uploadingNow ? "opacity-50 pointer-events-none" : ""}`}
      >
        {frontPreview ? (
          <img
            src={frontPreview}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-500 dark:text-gray-400 text-center">
            NID Front <br /> Click to select
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          hidden
          disabled={uploadingNow}
          onChange={(e) => handleFrontImage(e.target.files[0])}
        />
      </label>

      {/* NID Back */}
      <label
        className={`h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer
        bg-gray-100 dark:bg-darkbody dark:border-slate-700
        ${!frontUploaded || uploadingNow ? "opacity-50 pointer-events-none" : ""}`}
      >
        {backPreview ? (
          <img
            src={backPreview}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-500 dark:text-gray-400 text-center">
            NID Back <br /> Click to select
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          hidden
          disabled={!frontUploaded || uploadingNow}
          onChange={(e) => handleBackImage(e.target.files[0])}
        />
      </label>
    </div>
  );
};

export default NIDImageUploader;