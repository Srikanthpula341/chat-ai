import express from 'express';
import bodyParser from 'body-parser';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const clientId = process.env.CLIENT_ID;

const app = express();
const client = new OAuth2Client(clientId); // Replace with your client ID

app.use(bodyParser.json());

app.post('/api/verify-token', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId // Replace with your client ID
        });
        const payload = ticket.getPayload();
        res.json({ success: true, payload });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
