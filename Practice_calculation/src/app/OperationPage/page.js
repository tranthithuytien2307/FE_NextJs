'use client';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { OperationContext } from '../OperationContext';
import { useRouter } from 'next/navigation';

function OperationPage() {
  const router = useRouter();
  const {
    numberOfOperation, setNumberOfOperation,
    participations,
    startRange,
    endRange,
    minResult,
    maxResult
  } = useContext(OperationContext);
  const [display, setDisplay] = useState(false);
  const totalQuestions = 10;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState('00:00');
  const [seconds, setSeconds] = useState(0);
  const [trueAnswer, setTrueAnswer] = useState(0);
  

  const generateOperand = () => {
    return Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
  };

  const getOperatorSymbol = (id) => {
    switch (id) {
      case 1: return '+';
      case 2: return '-';
      case 3: return '*';
      case 4: return '/';
      default: return '?';
    }
  };

  const calculateResult = (operands, operators) => {
    return operands.reduce((acc, curr, idx) => {
      if (idx === 0) return curr;
      switch (operators[idx - 1]) {
        case '+': return acc + curr;
        case '-': return acc - curr;
        case '*': return acc * curr;
        case '/': return Math.floor(acc / curr);
        default: return acc;
      }
    }, 0);
  };

  const generateQuestion = () => {
    if (numberOfOperation == 1){
      setNumberOfOperation(numberOfOperation + 1);
    }
    const operands = [];
    const operators = [];

    for (let i = 0; i < numberOfOperation; i++) {
      operands.push(generateOperand());
      if (i < numberOfOperation - 1) {
        const opItem = participations.filter(p => p.isChecked);
        if (opItem.length === 0) return;
        const opId = opItem[Math.floor(Math.random() * opItem.length)];
        operators.push(getOperatorSymbol(opId.id));
      }
    }

    let expression = '';
    for (let i = 0; i < operands.length; i++) {
      expression += operands[i];
      if (i < operators.length) {
        expression += ` ${operators[i]} `;
      }
    }

    const answer = calculateResult(operands, operators);

    if (answer < minResult || answer > maxResult || answer < 0) {
      generateQuestion();
      return;
    }

    setCurrentQuestion(expression);
    setCurrentAnswer(answer);

    const choices = new Set();
    choices.add(answer);
    while (choices.size < 4) {
      choices.add(answer + Math.floor(Math.random() * 10) - 5);
    }

    setOptions(Array.from(choices).sort(() => Math.random() - 0.5));
    setFeedback('');
    setShowResult(false);
    setAnswered(false);
    setUserAnswer(null);
  };

  const selectAnswer = (ans) => {
    setUserAnswer(ans);
    setDisplay(true);
  };

  const submitAnswer = () => {
    if (userAnswer === null || showResult) return;

    setShowResult(true);
    setAnswered(true);

    if (userAnswer === currentAnswer) {
      setFeedback('Đúng rồi! Làm câu tiếp theo thôi');
      setTrueAnswer(trueAnswer => trueAnswer + 1);
    } else {
      setFeedback(`Sai rồi! Đáp án đúng là ${currentAnswer}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      generateQuestion();
    } else {
      setFeedback('Hoàn thành bài luyện tập!');
      setShowResult(true);
      setOptions([]);
    }
  };

  useEffect(() => {
    setStartTime(Date.now());
    generateQuestion();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formatStartTime = (s) => {
    const m = String(Math.floor(s/60)).padStart(2,'0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  }
  const formatTime = () => {
    if (startTime) {
      const now = Date.now();
      const diffMs = now - startTime;
      const diffSeconds = Math.floor(diffMs / 1000);
      const minutes = String(Math.floor(diffSeconds / 60)).padStart(2, '0');
      const seconds = String(diffSeconds % 60).padStart(2, '0');
      return `${minutes}:${seconds}`;
    }
    return '00:00';
  };

  const handleSubmit = () => {
    const time = formatTime();
    router.push(`/ResultPage?trueAnswer=${trueAnswer}&duration=${encodeURIComponent(time)}`);
  };

  return (
    <div className='mt-16 flex flex-col justify-between h-142 w-94 font-medium'>
      <div className='flex flex-col items-center'>
        <p> Thời gian làm bài:</p>
        <p className='text-orange-500 font-medium'> {formatStartTime(seconds)} s </p>
      </div>

      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <p>Câu số {currentQuestionIndex + 1}:</p>
          <div className="bg-gray-100 text-black flex justify-center items-center p-2 rounded">
            <p className="text-xl font-semibold">{currentQuestion}</p>
            <span className="ml-2">= ?</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p>Chọn kết quả :</p>
          <div className="flex justify-center gap-6 flex-wrap">
            {options.map((opt) => {
              const isCorrect = showResult && opt === currentAnswer;
              const isWrong = showResult && opt === userAnswer && opt !== currentAnswer;
              const isSelected = !showResult && opt === userAnswer;

              return (
                <button
                  key={opt}
                  className={`px-6 py-2 rounded border text-gray-700 font-bold
                    ${isCorrect ? 'bg-green-100 border-green-400' : ''}
                    ${isWrong ? 'bg-red-100 border-red-400' : ''}
                    ${isSelected ? 'bg-green-100 border-green-400' : 'bg-gray-50'}
                  `}
                  onClick={() => selectAnswer(opt)}
                  disabled={showResult}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {showResult && <p className="text-center mt-2">{feedback}</p>}
        </div>
      </div>
          {showResult && currentQuestionIndex < totalQuestions - 1 && (
            <button className="btn btn-info btn-block rounded-3xl mt-6" onClick={nextQuestion}>
              Tiếp Theo
            </button>
          )}
          {!showResult && (
            <button className="btn btn-info btn-block rounded-3xl mt-6" onClick={submitAnswer}>
              Trả lời
            </button>
          )}
          {showResult && currentQuestionIndex == totalQuestions - 1 && (
            <button className="btn btn-info btn-block rounded-3xl mt-6" onClick={handleSubmit} >
              Nộp bài
            </button>
          )}
    </div>
  );
}
export default OperationPage;
