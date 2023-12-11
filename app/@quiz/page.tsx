"use client";
import React, { useEffect, useState } from "react";
import useQuiz from "../store";
import { fetchQuestions } from "@/utils";
import { cn } from "@/lib/utils";

const quiz = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const config = useQuiz((state) => state.config);
  const addScore = useQuiz((state) => state.addScore);

  // useEffect(()=>{
  //   const getQuestions = async () => {
  //       setLoading(true)
  //       const {results} = await fetchQuestions({
  //         amount: config.numberOfQuestion,
  //         category: config.category.id,
  //         difficulty: config.level,
  //         type: config.type,
  //       });
  //       let shuffledResults = results?.map((e)=> {
  //         let value = [...e.incorrect_answers, e.correct_answer].map((value)=>({value, sort:Math.random()})).sort((a,b)=> a.sort -b.sort).map(({value}) =>value);
  //         e.answers = [...value];
  //         return e;
  //       })
  //       console.log(shuffledResults);

  //     setQuestions([...shuffledResults]);
  //     setLoading(false)
  //   };
  //   getQuestions()
  // })

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);

      try {
        const { results } = await fetchQuestions({
          amount: config.numberOfQuestion,
          category: config.category.id,
          difficulty: config.level,
          type: config.type,
        });

        if (results) {
          let shuffledResults = results.map((e) => {
            let value = [...e.incorrect_answers, e.correct_answer]
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
            e.answers = [...value];
            return e;
          });

          console.log("Shuffled Results:", shuffledResults);
          setQuestions([...shuffledResults]);
        } else {
          console.error("Results are undefined");
        }
      } catch (error) {
        console.error("Error getting questions:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [config.numberOfQuestion, config.category.id, config.level, config.type]);

  const handleNext = () => {
    let remainingQuestions = [...questions];
     remainingQuestions.shift();
    setQuestions([...remainingQuestions]);
    setAnswer("");
  };

  const checkAnswer = (answer: string) => {
    if (answer === questions[0].correct_answer) {
      addScore(0);
    }
    setAnswer(questions[0].correct_answer);
  };
  return (
    <section className="flex flex-col justify-center items-center mt-10">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Question Number {
          questions?.length ? 
          <span className="text-blue-600 dark:text-blue-500">#{config.numberOfQuestions - questions?.length + 1}</span>:null
          }
      </h1>
      <p className="text-2xl">Score : {config.score}</p>
      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
        <h4 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-5xl text-blue-600 dark:text-blue-500">
          {questions?.[0]?.question || "Loading..."}
        </h4>

        <div className="flex justify-evenly items-center my-10 flex-wrap w-[90%] ">
          {questions?.[0]?.answers?.map((ans, index) => (
            <button
              onClick={() => checkAnswer(ans)}
              key={ans}
              type="button"
              className={cn("w-[33%] py-3.5 px-5 my-4 mb-2 mr-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-0 shadow-blue-200 shadow-2xl hover:bg-blue-600 hover:text-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700", {
                "bg-red-900": ans !== questions[0]?.correct_answer,
                "bg-blue-700": ans === questions[0]?.correct_answer,
                "hover:bg-red-900": ans !== questions[0]?.correct_answer,
                "hover:bg-blue-700": ans === questions[0]?.correct_answer,
                "text-gray-100": questions[0]?.correct_answer,
              })}
            >
              {ans}
            </button>
          ))}
        </div>
        {
          questions.length && 
          <button onClick={() => handleNext()} type="button" className="next-btn">
          Next
        </button>
        }
      </section>
    </section>
  );
};

export default quiz;
