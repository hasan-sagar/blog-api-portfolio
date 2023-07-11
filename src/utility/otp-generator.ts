const otpGenerator = require('otp-generator')

const GenerateOtp = () => {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    });
    return otp;
}

export default GenerateOtp