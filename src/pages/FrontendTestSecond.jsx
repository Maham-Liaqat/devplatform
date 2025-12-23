import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FrontendTestSecond = () => {
  const [githubUrl, setGithubUrl] = useState("");
  const [stage, setStage] = useState("input"); // input -> waiting -> result
  const [timeLeft, setTimeLeft] = useState(15);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const navigate = useNavigate();

  // Timer effect for waiting stage
  useEffect(() => {
    let timer;
    if (stage === "waiting" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setStage("result");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [stage, timeLeft]);

  const validateGitHubUrl = (url) => {
    // Basic GitHub URL validation
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/?)$/;
    return githubRegex.test(url.trim());
  };

  const handleSubmit = () => {
    if (!githubUrl.trim()) {
      setIsValidUrl(false);
      return;
    }

    if (!validateGitHubUrl(githubUrl)) {
      setIsValidUrl(false);
      return;
    }

    setIsValidUrl(true);
    setStage("waiting");
    setTimeLeft(15);
  };

  const handleCancel = () => {
    setGithubUrl("");
    setStage("input");
    setIsValidUrl(true);
  };

  const handleFinalOk = () => {
    alert("Test invitation sent! Check your GitHub notifications.");
    // Reset for next user
    setGithubUrl("");
    setStage("input");
    setTimeLeft(15);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Render input stage
  if (stage === "input") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Please enter your GitHub URL
            </h1>
            <p className="text-gray-600">
              We'll use this to invite you to our coding test repository
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => {
                  setGithubUrl(e.target.value);
                  setIsValidUrl(true);
                }}
                onKeyPress={handleKeyPress}
                placeholder="https://github.com/yourusername"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  !isValidUrl ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            
            {!isValidUrl && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Please enter a valid GitHub URL (e.g., https://github.com/username)
              </div>
            )}
            
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-bold">Note:</span> Make sure your GitHub profile is public to receive the invitation.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg font-bold hover:from-gray-900 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render waiting stage
  if (stage === "waiting") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          {/* Animated Spinner */}
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              {/* Spinning ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-gray-800 rounded-full animate-spin"></div>
              {/* Inner content */}
              <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white font-bold">{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please wait for a while
          </h2>
          
          <p className="text-gray-600 mb-8">
            We're processing your GitHub URL and preparing the test invitation...
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Processing...</span>
              <span className="text-sm font-medium text-gray-800">
                {Math.round(((15 - timeLeft) / 15) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-full transition-all duration-1000"
                style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Status indicators */}
          <div className="space-y-3">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <div className={`w-3 h-3 rounded-full mr-2 ${timeLeft <= 12 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>Validating GitHub URL...</span>
              {timeLeft <= 12 && <span className="ml-2 text-green-600">✓</span>}
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <div className={`w-3 h-3 rounded-full mr-2 ${timeLeft <= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>Creating test repository...</span>
              {timeLeft <= 8 && <span className="ml-2 text-green-600">✓</span>}
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <div className={`w-3 h-3 rounded-full mr-2 ${timeLeft <= 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>Sending invitation...</span>
              {timeLeft <= 4 && <span className="ml-2 text-green-600">✓</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render result stage
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="relative">
            {/* Animated circles */}
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-2 bg-green-200 rounded-full animate-ping opacity-50"></div>
            
            {/* Main checkmark */}
            <div className="relative w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          I invited you to my test!
        </h2>
        
        <p className="text-gray-600 mb-8">
          Check your GitHub notifications for the invitation to our coding test repository.
          You have 7 days to complete the test.
        </p>

        {/* GitHub URL Display */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-800 font-medium truncate">{githubUrl}</span>
          </div>
        </div>

        {/* Test Details */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Test duration: 60 minutes</span>
          </div>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Languages: JavaScript, HTML, CSS</span>
          </div>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Difficulty: Intermediate</span>
          </div>
        </div>

        {/* Action Button */}
        <button
           onClick={() => navigate("/dashboard")}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          OK
        </button>

        {/* Additional Info */}
        <p className="mt-6 text-sm text-gray-500">
          Need help? Contact support@example.com
        </p>
      </div>
    </div>
  );
};

export default FrontendTestSecond;