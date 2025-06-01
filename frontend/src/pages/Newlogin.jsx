import React from 'react';
import loginImage from '../assets/images/login.png'; // Make sure login.png is inside src folder or adjust path accordingly

const LoginComponent = () => {
    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center px-8 py-20">
            <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(128,128,128,0.2)] gap-8">
                {/* Left Side: Image Section */}
                <div className="w-1/2 flex items-center justify-center bg-gray-50 p-8">
                    <img
                        src={loginImage}
                        alt="QR Illustration"
                        className="w-full max-w-[300px] h-auto"
                    />
                </div>

                <SigninComponent />

            </div>
        </div>
    );
};
const SigninComponent = () => {
    return (<div className="w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
                Sign in to your account
            </h2>

            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <a href="#" className="text-sm text-purple-600 hover:underline">
                            forgot password ?
                        </a>
                    </div>
                    <input
                        id="password"
                        type="password"
                        className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition text-base"
                >
                    Login
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Sign-in */}
            <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded hover:bg-gray-100 transition text-sm">
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                />
                Sign in with Google
            </button>

            {/* Signup */}
            <p className="mt-8 text-sm text-center text-gray-600">
                New to Secure Entry?{' '}
                <a href="#" className="text-purple-600 hover:underline">
                    Create Account
                </a>
            </p>
        </div>
    </div>);
};
const SignUpComponent = () => {
    return (
        <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_16px_rgba(128,128,128,0.2)] bg-white p-4 mx-auto">
            <div className="w-full max-w-xs mx-auto">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Sign up</h2>
                <p className="text-sm text-gray-600 mb-6">
                    We’ll send you <span className="font-semibold">OTP</span> on your email
                </p>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2.5 rounded hover:bg-blue-800 transition text-base"
                    >
                        Send OTP
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="#" className="text-purple-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};
const OTP_DIGITS = 6;

const VerifyOTP = () => {
    // const [inputArr, setInputArr] = useState(
    //     new Array(OTP_DIGITS).fill("")
    // );
    //
    // const refArr = useRef([]);
    // useEffect(() => {
    //     refArr.current[0]?.focus();
    // }, []);
    //
    // const handleOnChange = (value, index) => {
    //     if(isNaN(value)){
    //         return;
    //     }
    //
    //     const newValue = value.trim();
    //     const newArr = [...inputArr];
    //     newArr[index] = newValue.slice(-1);
    //     setInputArr(newArr);
    //
    //     newValue && refArr.current[index + 1]?.focus();
    // };
    //
    // const handleKeyDown = (e, index) => {
    //     if(!e.target.value && e.key === "Backspace"){
    //         refArr.current[index - 1]?.focus();
    //     }
    // };



    return (

        <div className="bg-white w-[518px] p-[51px] rounded-[9px] shadow-[0px_0px_43.6px_-2px_rgba(0,0,0,0.14)]">
            <h2 className="text-[22px] font-semibold mb-2 font-sans">Verify OTP</h2>
            <p className="text-sm text-gray-600 mb-8 font-sans">Enter the OTP sent to your email</p>

            <div className="flex justify-between gap-[19px] mb-8">
                {inputArr.map((input, index) => {
                    return (
                        <input
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            key={index}
                            type="text"
                            value={inputArr[index]}
                            ref={(input) => {refArr.current[index] = input}}
                            onChange={(e) => handleOnChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    );
                })}
            </div>


            <button className="w-[398px] h-[43px] bg-[#2C3ED3] hover:bg-blue-700 rounded-[6px] font-medium transition text-[18px] font-bold leading-[100%] font-sans text-white">
                Verify OTP & Proceed
            </button>

            <p className="text-sm text-center text-gray-500 mt-6">
                Already have an account?{" "}
                <a href="#" className="text-blue-500 hover:underline">
                    Login
                </a>
            </p>
        </div>
    );
};
export default LoginComponent;
