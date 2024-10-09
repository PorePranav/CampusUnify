const bcrypt = require('bcrypt');
const saltRounds = 10; // Define the number of salt rounds

// Registration Endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        res.status(200).send('Login successful!');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});
