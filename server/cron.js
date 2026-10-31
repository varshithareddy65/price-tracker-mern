
const cron = require('node-cron');

const Product = require('./models/Product');
const scrapeProduct = require('./utils/scraper');
const sendEmail = require('./utils/sendEmail');

// Run every minute
cron.schedule('* * * * *', async () => {

    console.log('Checking product prices...');

    try {

        const products = await Product.find();

        for (const product of products) {

            try {

                // Scrape current product price
                const scraped = await scrapeProduct(product.url);

                if (!scraped || !Number.isFinite(scraped.price)) {
                    console.log(`Skipping ${product.title}: price unavailable`);
                    continue;
                }

                const currentPrice = Number(scraped.price);
                const targetPrice = Number(product.targetPrice);

                // Get previous price
                const history = product.priceHistory || [];

                const lastPrice = history.length
                    ? Number(history[history.length - 1].price)
                    : null;

                // Update history only when price changes
                if (lastPrice === null || lastPrice !== currentPrice) {

                    product.priceHistory.push({
                        price: currentPrice,
                        date: new Date()
                    });

                }

                // Update current price
                product.currentPrice = currentPrice;

                // Check target price
                if (currentPrice <= targetPrice) {

                    // Send alert only once
                    if (!product.alertSent) {

                        await product.save();

                        await sendEmail(
                            product.email,
                            product.title,
                            currentPrice,
                            product.url
                        );

                        product.alertSent = true;

                        await product.save();

                        console.log(`Price alert sent: ${product.title}`);

                    } else {

                        await product.save();

                        console.log(`Already notified: ${product.title}`);

                    }

                } else {

                    // Reset alert when price rises above target
                    product.alertSent = false;

                    await product.save();

                    console.log(`Price above target: ${product.title}`);

                }

            } catch (error) {

                console.error(
                    `Error checking ${product.title}:`,
                    error.message
                );

            }

        }

    } catch (error) {

        console.error('Cron job error:', error.message);

    }

}, {
    noOverlap: true
});

console.log('Price monitoring cron job scheduled');
