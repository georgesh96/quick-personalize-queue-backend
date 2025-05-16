const express = require('express');
const { body, validationResult } = require('express-validator');
// const morgan = require('morgan');
const cors = require('cors');
// const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));

// const rateLimiter = rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 5,
//     message: {
//         status: 429,
//         error: 'TOO_MANY_REQUESTS',
//         message: 'Too many personalization requests from this IP, please try again later.'
//     },
//     keyGenerator: (req, res) => req.ip,
// })

app.post(
    '/api/queue-personalization',
    [
        body('url')
            .exists({ checkNull: true }).withMessage('URL is required')
            .isString().withMessage('URL must be a string')
            .notEmpty().withMessage('URL cannot be empty'),

        body('templateId')
            .exists({ checkNull: true }).withMessage('Template ID is required')
            .isString().withMessage('Template ID must be a string')
            .notEmpty().withMessage('Template ID cannot be empty'),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                error: 'INVALID_DATA',
                message: errors.array()[0].msg,
            });

        }

        const { url, templateId } = req.body;

        console.log(`INFO: Queued personalization for URL: ${url} with template: ${templateId}`);

        res.status(200).json({
            message: `Personalization queued successfully for URL: ${url}`,
        });
    }
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
