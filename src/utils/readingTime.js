function estimateRead ( content ) {
  // Function to calculate reading time based on word count
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(' ').length; // Count the number of words in the article
    const readingTime = Math.ceil(wordCount / wordsPerMinute); // Calculate reading time
    return readingTime;
  }
    const estimatedReadingTime = calculateReadingTime(content);

    return estimatedReadingTime;
};

export default estimateRead;