import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);

        const pages = [];

    const renderPage = async (pageData) => {
        const textContent = await pageData.getTextContent();

        let lastY;
        let text = "";

        for (const item of textContent.items) {
            if (lastY === item.transform[5] || !lastY) {
                text += item.str;
            } else {
                text += "\n" + item.str;
            }

            lastY = item.transform[5];
        }

        pages.push({
            pageNumber: pages.length + 1,
            text: text.trim()
        });

        return text;
    };

    const data = await pdfParse(dataBuffer, {
        pagerender: renderPage
    });

    return {
        text: data.text,
        pages: pages,
        totalPages: data.numpages
    };
    
    } catch (error) {
        console.error("Error extracting PDF text:", error);
        throw error;
    }
};

export { extractTextFromPDF };