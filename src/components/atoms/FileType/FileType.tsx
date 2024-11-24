import "./styles.css";

export enum fileTypes_e {
  "image/jpeg" = "Image",
  "application/pdf" = "Pdf",
  "video/mp4" = "Video",
}

export default function FileType({ fileType }: { fileType: fileTypes_e }) {
  const renderFileType = () => {
    switch (fileType) {
      case fileTypes_e["image/jpeg"]:
        return <div className="bg-blue-500 text-white fileTypeBlock">Img</div>;
      case fileTypes_e["application/pdf"]:
        return <div className="bg-red-500 text-white fileTypeBlock">PDF</div>;
      case fileTypes_e["video/mp4"]:
        return (
          <div className="bg-green-500 text-white fileTypeBlock">Video</div>
        );
      default:
        return <div>unknown type</div>;
    }
  };
  return <>{renderFileType()}</>;
}
