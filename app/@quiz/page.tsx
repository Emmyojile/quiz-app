"use client";
import React, { useEffect, useState } from "react";
import useQuiz from "../store";
import { fetchQuestions } from "@/utils";

const quiz = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const config = useQuiz((state) => state.config);
  const setScore = useQuiz((state) => state.addScore);

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
  
          console.log('Shuffled Results:', shuffledResults);
          setQuestions([...shuffledResults]);
        } else {
          console.error('Results are undefined');
        }
      } catch (error) {
        console.error('Error getting questions:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    getQuestions();
  }, [config.numberOfQuestion, config.category.id, config.level, config.type]);
  

  return (
    <section className="flex flex-col justify-center items-center mt-10">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Question <span className="text-blue-600 dark:text-blue-500">#1</span>
      </h1>
      <p className="text-2xl">Score : 0</p>
      <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
        <h4 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-5xl text-blue-600 dark:text-blue-500">
          
        {questions?.[0]?.question || 'Loading...'}
          
        </h4>

        <div className="flex justify-evenly items-center my-10 flex-wrap w-[90%] ">
        {questions?.[0]?.answers?.map((answer, index) => (
    <button key={index} type="button" className="question-btn">
      {answer}
    </button>
  ))}
        </div>
        <button type="button" className="next-btn">
          Next
        </button>
      </section>
    </section>
  );
};

export default quiz;
