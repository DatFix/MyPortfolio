export const hanldeGoToWebsite = (href: string) => {
    window.open(href, '_blank');
}


export const base64ToFile = (base64: string, filename = 'image.png'): File => {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (!mimeMatch) {
        throw new Error('Không thể xác định kiểu MIME từ base64.');
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]); // Giải mã base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};
