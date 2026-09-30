const chunkPages = (pages, chunkSize = 1000, overlap = 200) => {
    const chunks = [];

    let chunkIndex = 0;

    for (const page of pages) {
        const text = page.text;

        let start = 0;

        while (start < text.length) {
            const end = start + chunkSize;

            const chunk = text.slice(start, end);

            chunks.push({
                text: chunk,
                pageNumber: page.pageNumber,
                chunkIndex: chunkIndex
            });

            chunkIndex++;

            start = end - overlap;
        }
    }

    return chunks;
};

export { chunkPages };