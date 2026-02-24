import * as shortCodeService from "../services/shortCodeService.js";

const urlDatabase = {};

const createShortUrl = async (req, res) => {
    try {
        const { longUrl } = req.body;

        if (!longUrl) {
            return res.status(400).json({
                error: "URL is required",
            });
        }

        const shortCode = shortCodeService.generateShortCode();

        urlDatabase[shortCode] = longUrl;

        const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

        res.json({
            shortUrl,
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

const redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const longUrl = urlDatabase[shortCode];

        if (!longUrl) {
            return res.status(404).json({
                error: "URL not found",
            });
        }

        res.redirect(longUrl);
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

export {
    createShortUrl,
    redirectUrl,
};
