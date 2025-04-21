export const uploadFileToStorage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_preset"); // Thay bằng preset thật của bạn

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    // Phân loại resource_type chính xác
    let resourceType = "raw"; // mặc định cho file như pdf, docx

    if (file.type.startsWith("image/")) {
        resourceType = "image";
    } else if (file.type.startsWith("video/")) {
        resourceType = "video";
    } else if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        resourceType = "raw";
    } else if (
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".ppt") ||
        file.name.endsWith(".pptx")
    ) {
        resourceType = "raw";
    }

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Lỗi upload:", errorData);
        throw new Error(`Lỗi khi upload file: ${errorData.error?.message || "Không xác định"}`);
    }

    const data = await response.json();
    console.log("Upload thành công:", data);
    return data.secure_url; // link có thể mở trực tiếp
};
