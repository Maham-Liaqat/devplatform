import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FrontendTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What does the 'typeof' operator return for an array?",
      options: ["object", "array", "undefined", "function"],
      correctAnswer: "object",
      explanation: "In JavaScript, arrays are a type of object. This can be confusing, but typeof [] returns 'object'.",
      category: "JavaScript"
    },
    {
      id: 2,
      question: "Which CSS property is used to change the text color?",
      options: ["text-color", "font-color", "color", "text-style"],
      correctAnswer: "color",
      explanation: "The 'color' property sets the color of text. Example: color: blue;",
      category: "CSS"
    },
    {
      id: 3,
      question: "What is the purpose of React's useState hook?",
      options: [
        "To fetch data from APIs",
        "To add state to functional components", 
        "To style components",
        "To create reusable functions"
      ],
      correctAnswer: "To add state to functional components",
      explanation: "useState allows functional components to have state variables. Before hooks, only class components could have state.",
      category: "React"
    },
    {
      id: 4,
      question: "Which HTML5 tag is used for navigation links?",
      options: ["<nav>", "<header>", "<sidebar>", "<menu>"],
      correctAnswer: "<nav>",
      explanation: "<nav> defines a set of navigation links. It's a semantic tag for better accessibility and SEO.",
      category: "HTML"
    },
    {
      id: 5,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style System",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correctAnswer: "Cascading Style Sheets",
      explanation: "CSS stands for Cascading Style Sheets. 'Cascading' refers to how styles cascade from multiple sources.",
      category: "CSS"
    }
  ];

  const handleStartTest = () => {
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setTestCompleted(false);
    setScore(0);
    setCorrectCount(0);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answer) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer
    };
    setAnswers(newAnswers);
    setShowExplanation(true);
    
    // Check if answer is correct
    if (answer === questions[currentQuestion].correctAnswer) {
      // Add subtle visual feedback for correct answer
      const button = document.getElementById(`option-${answer}`);
      if (button) {
        button.classList.add('border-green-500', 'bg-green-50');
        setTimeout(() => {
          button.classList.remove('border-green-500', 'bg-green-50');
        }, 500);
      }
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setTestCompleted(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setCorrectCount(correct);
    setScore((correct / questions.length) * 100);
  };

  const handlePreviousQuestion = () => {
    setShowExplanation(false);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextStage = () => {
    alert("🎉 Congratulations! Moving to the next stage...\n\nThis would typically redirect you to an advanced test or interview round.");
    // In a real app, you would navigate to the next stage/page
    // navigate('/next-stage');
  };

  const getResultMessage = () => {
    if (correctCount >= 4) {
      return "Excellent! You've qualified for the next stage! 🚀";
    } else if (correctCount >= 3) {
      return "Good job! You passed the test. 👍";
    } else {
      return "Keep learning and try again! 📚";
    }
  };

  const getResultColor = () => {
    if (correctCount >= 4) {
      return {
        bg: 'bg-gradient-to-r from-green-100 to-emerald-100',
        text: 'text-green-700',
        border: 'border-green-200'
      };
    } else if (correctCount >= 3) {
      return {
        bg: 'bg-gradient-to-r from-yellow-100 to-amber-100',
        text: 'text-yellow-700',
        border: 'border-yellow-200'
      };
    } else {
      return {
        bg: 'bg-gradient-to-r from-red-100 to-orange-100',
        text: 'text-red-700',
        border: 'border-red-200'
      };
    }
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white">💻</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Frontend Developer Test
          </h1>
          
          <p className="text-gray-600 mb-8">
            Test your knowledge with {questions.length} questions about HTML, CSS, JavaScript, and React.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">HTML & CSS Fundamentals</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">JavaScript Core Concepts</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">React Basics</span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              <span className="font-bold">Passing Score:</span> 4 out of 5 correct answers
            </p>
            <p className="text-sm text-blue-700 mt-1">
              <span className="font-bold">Qualify for:</span> Advanced Technical Interview
            </p>
          </div>
          
          <button
            onClick={handleStartTest}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    const resultColors = getResultColor();
    const qualifiedForNextStage = correctCount >= 4;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          {/* Result Header */}
          <div className={`${resultColors.bg} ${resultColors.border} border rounded-xl p-6 mb-8 text-center`}>
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
              qualifiedForNextStage 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                : correctCount >= 3 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                : 'bg-gradient-to-r from-red-400 to-orange-500'
            }`}>
              <span className="text-3xl text-white font-bold">
                {correctCount}
              </span>
            </div>
            
            <h2 className={`text-2xl font-bold ${resultColors.text} mb-2`}>
              {getResultMessage()}
            </h2>
            
            <p className="text-gray-700">
              You got {correctCount} out of {questions.length} questions correct
            </p>
            
            <div className="mt-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                qualifiedForNextStage 
                  ? 'bg-green-100 text-green-700' 
                  : correctCount >= 3 
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                Score: {Math.round(score)}%
              </span>
            </div>
          </div>

          {/* Stage Qualification Status */}
          <div className={`mb-8 p-4 rounded-lg border ${
            qualifiedForNextStage 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
              : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800">Next Stage Access:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                qualifiedForNextStage 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {qualifiedForNextStage ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {qualifiedForNextStage 
                ? '🎉 Congratulations! You qualify for the advanced technical interview.'
                : `Need ${4 - correctCount} more correct answers to unlock the next stage.`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {qualifiedForNextStage ? (
              <>
                <button
                  onClick={() => navigate("/FrontendTestSecond")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <span className="mr-2" >🚀</span>
                     Proceed to Next Stage
                  <span className="ml-2">→</span>
                </button>
                
                <button
                  onClick={handleStartTest}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  Retake Test
                </button>
              </>
            ) : (
              <button
                onClick={handleStartTest}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Retake Test
              </button>
            )}
          </div>

          {/* Answer Review */}
          <div className="mt-8">
            <h3 className="font-bold text-gray-800 mb-4">Review Your Answers:</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {questions.map((q, index) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <div key={q.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-800">
                        Q{index + 1}: {q.question}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">
                        <span className="font-medium">Your answer:</span> {userAnswer || 'Not answered'}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Correct:</span> <span className="text-green-600 font-medium">{q.correctAnswer}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const userAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Progress */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
            <div>
              <h1 className="text-lg font-bold text-gray-800 mb-1">
                Frontend Developer Test
              </h1>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {currentQ.category}
                </span>
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
            </div>
            
            <div className="mt-2 sm:mt-0">
              <div className="text-right">
                <span className="text-sm text-gray-600">Required to pass:</span>
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-sm font-medium text-gray-800">4/5 correct</span>
                  <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold">
                {currentQuestion + 1}
              </div>
              <span className="text-sm font-medium text-gray-600">Select the correct answer</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                id={`option-${option}`}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  userAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border-2 mr-3 flex items-center justify-center ${
                    userAnswer === option
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation (when answer selected) */}
          {showExplanation && userAnswer && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in">
              <div className="flex items-start">
                <span className="text-blue-600 mr-2">💡</span>
                <div>
                  <p className="text-sm text-blue-800">
                    <span className="font-bold">Explanation:</span> {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
            }`}
          >
            ← Previous
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={!userAnswer}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              !userAnswer
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : currentQuestion === questions.length - 1
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:shadow-lg'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Submit Test' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontendTest;