import React from "react";

interface FilePreviewProps {
  files: File[];
  onDelete: (index: number) => void;
  onAdd: (files: FileList | null) => void;
  disabled?: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({ files, onDelete, onAdd, disabled }) => {
  // Helper: get icon for file based on extension
  const getFileIcon = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return "📄"; // or use an SVG/icon
      case "xls":
      case "xlsx":
        return "📊";
      case "doc":
      case "docx":
        return "📃";
      default:
        return "📁";
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {files.map((file, idx) => {
          const url = URL.createObjectURL(file);
          const isImage = file.type.startsWith("image/");
          return (
            <div key={idx} className="relative w-24 h-24 border rounded-md overflow-hidden flex flex-col items-center justify-center group bg-gray-50">
              {isImage ? (
                <img
                  src={url}
                  alt={file.name}
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => window.open(url, "_blank")}
                />
              ) : (
                <div
                  onClick={() => window.open(url, "_blank")}
                  className="text-5xl cursor-pointer select-none"
                  title={file.name}
                >
                  {getFileIcon(file)}
                </div>
              )}

              {/* Delete button */}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(url);
                    onDelete(idx);
                  }}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  title="Remove file"
                >
                  ×
                </button>
              )}

              {/* File name (truncate) */}
              <p className="absolute bottom-0 bg-black bg-opacity-50 text-white text-xs w-full text-center truncate px-1">
                {file.name}
              </p>
            </div>
          );
        })}

        {/* Add new files input */}
        {!disabled && (
          <label
            htmlFor="file-upload"
            className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:border-blue-600 text-4xl text-gray-400"
            title="Add more files"
          >
            +
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                onAdd(e.target.files);
                e.target.value = ""; // reset input so same file can be re-selected
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
