import Cropper from "react-easy-crop";
import { useState } from "react";

export default function ImageCropper({ image, onCropDone }) {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (_, area) => {
    setCroppedArea(area);
  };

  return (
    <>
      <div className="relative w-full h-64 bg-black">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <button
        onClick={() => onCropDone(croppedArea)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Crop & Save
      </button>
    </>
  );
}
