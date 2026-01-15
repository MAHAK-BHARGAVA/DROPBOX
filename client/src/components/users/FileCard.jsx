export default function FileCard({ file }) {

  const fileType = file.originalName
    ?.split(".")
    .pop()
    .toUpperCase();

  return (
    <div
     className="
    bg-[#1c2b39] 
    p-4 
    rounded-xl 
    flex 
    justify-between 
    items-center 
    cursor-pointer 
    hover:bg-[#0047ab] 
    transition 
    duration-200
  "
      onClick={() =>
        window.open(`http://localhost:5000/${file.path}`)
      }
    >

      <div className="flex gap-3 items-center">

        <div className="bg-red-500 px-3 py-2 rounded text-sm">
          {fileType}
        </div>

        <div>
          <p  className="font-medium text-white">
            {file.originalName} {/* ONLY THIS */}
          </p>

          <p className="text-xs text-white">
           Uploaded • {
           file.uploadedAt
            ? new Date(file.uploadedAt).toLocaleDateString()
            : "N/A"
  }
</p>

        </div>
      </div>

      <button className="text-gray-400 text-xl">⋮</button>
    </div>
  );
}


