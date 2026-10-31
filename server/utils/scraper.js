
const axios = require('axios');
const cheerio = require('cheerio');

const ALLOWED_HOSTS = [
    'amazon.in',
    'www.amazon.in',
    'amazon.com',
    'www.amazon.com'
];

const scrapeProduct = async (url) => {
    try {
        // Validate URL
        const parsedUrl = new URL(url);

        if (
            !['https:', 'http:'].includes(parsedUrl.protocol) ||
            !ALLOWED_HOSTS.includes(parsedUrl.hostname.toLowerCase())
        ) {
            throw new Error('Unsupported product website');
        }

        // Fetch webpage
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            timeout: 15000,
            maxRedirects: 5,
            maxContentLength: 5 * 1024 * 1024
        });

        const $ = cheerio.load(data);

        // Extract price
        let priceText =
            $('#corePrice_feature_div .a-offscreen').first().text().trim() ||
            $('#apex_desktop .a-offscreen').first().text().trim() ||
            $('#priceblock_ourprice').first().text().trim() ||
            $('#priceblock_dealprice').first().text().trim() ||
            $('#priceblock_saleprice').first().text().trim() ||
            $('.a-price .a-offscreen').first().text().trim();

        // Fallback: combine whole and fractional price
        if (!priceText) {
            const whole = $('.a-price-whole').first().text().trim();
            const fraction = $('.a-price-fraction').first().text().trim();

            if (whole) {
                priceText = `${whole}${fraction ? '.' + fraction : ''}`;
            }
        }

        // Extract numeric price
        const match = priceText.match(
            /([0-9]+(?:,[0-9]{3})*(?:\.[0-9]{1,2})?)/
        );

        if (!match) {
            throw new Error('Product price not found');
        }

        const price = Number(match[1].replace(/,/g, ''));

        if (!Number.isFinite(price) || price <= 0) {
            throw new Error('Invalid product price');
        }

        // Extract product image
        const image =
            $('#landingImage').attr('src') ||
            $('#imgBlkFront').attr('src') ||
            $('#main-image-container img').first().attr('src') ||
            null;

        return {
            price,
            image
        };

    } catch (error) {
        console.error('Scraping error:', error.message);
        return null;
    }
};

module.exports = scrapeProduct;
