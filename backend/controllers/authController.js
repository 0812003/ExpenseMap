import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Information' })
    }

    try {

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User is Already Existed." })

        }


        const hashPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        const mailOption = {
            from: process.env.SMTP_SENDER,
            to: email,
            subject: "Welcome to ExpenseTracker",
            text: `Hello ${name},

            Welcome to ExpenseTracker! 🎉

            We're excited to have you on board. With ExpenseTracker, you can easily manage your daily expenses, track your spending habits, and stay in control of your finances.

            If you ever need help, feel free to reply to this email — we're here for you!

            Happy tracking!  
            - The ExpenseTracker Team`
        }

        await transporter.sendMail(mailOption);

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email & Password is Required!' })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({ success: true, message: 'Logged Out' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {

        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account is already verified." });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOption = {
            from: process.env.SMTP_SENDER,
            to: user.email,
            subject: "Verify your ExpenseTracker account",
            text: `Hi ${user.name},\n\nYour verification OTP is: ${otp}\n\nIt is valid for 24 hours.\n\nThanks,\nExpenseTracker Team`,
        };

        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: "Verification OTP sent to your email." });

    } catch (error) {
        console.error("Send OTP error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const userId = req.userId;
    const { otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details." });
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not Found!" });
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP!" });
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP is Expired!" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Email verified successfully!" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const isAuthenticated = (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: "Email is required." });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        const mailOption = {
            from: process.env.SMTP_SENDER,
            to: user.email,
            subject: "ExpenseTracker - Password Reset OTP",
            text: `Hi ${user.name},\n\nYour password reset OTP is: ${otp}\n\nIt is valid for 15 minutes.\n\nIf you didn't request a password reset, you can ignore this email.\n\n- ExpenseTracker Team`,
        };

        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: "OTP sent to your email." });

    } catch (error) {
        console.error("Reset OTP error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Detail Missing!" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not Found!" });
        }
        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalis Otp" });
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "Otp is Expired!" });
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Password Reset Successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 🟢 Check if this is the user's first login (e.g. created within last 5 seconds)
    const fiveSecondsAgo = Date.now() - 5000;
    const justCreated = user.createdAt && new Date(user.createdAt).getTime() > fiveSecondsAgo;

    if (justCreated) {
      const mailOption = {
        from: process.env.SMTP_SENDER,
        to: user.email,
        subject: "Welcome to ExpenseTracker",
        text: `Hello ${user.name},

Welcome to ExpenseTracker! 🎉

We're excited to have you on board. With ExpenseTracker, you can easily manage your daily expenses, track your spending habits, and stay in control of your finances.

If you ever need help, feel free to reply to this email — we're here for you!

Happy tracking!  
- The ExpenseTracker Team`
      };

      await transporter.sendMail(mailOption);
    }

    // Redirect
    return res.redirect(process.env.CLIENT_URL || '/');
  } catch (error) {
    console.error("Google Callback Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};