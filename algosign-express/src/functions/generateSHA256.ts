import crypto from "crypto";

const generateSHA256 = (data: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    return hash.digest("hex");
};

export default generateSHA256;
