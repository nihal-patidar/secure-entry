function setupLogger() {
    let count = 0;
    const interval = setInterval(() => {
        console.log(`Server is running... ${++count}`);
    }, 1000 * 60 * 3); // Every 3 mins

    setTimeout(() => {
        clearInterval(interval);
        console.log("Logging stopped!");
    }, 1000 * 60 * 60 * 24 * 10); // 10 days
}

module.exports = setupLogger;
