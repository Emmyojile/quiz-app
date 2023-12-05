import React from 'react'

const quiz = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Question <span className="text-blue-600 dark:text-blue-500">#1</span></h1>
        <p className="text-2xl">Score : 0</p>
        <section className='shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200'>
        <h4 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-5xl text-blue-600 dark:text-blue-500">What is the Channel </h4>

        <div className="flex justify-evenly items-center my-10 flex-wrap w-[90%] ">
        <button type="button" className="question-btn">Alternative</button>
        <button type="button" className="question-btn">Alternative</button>
        <button type="button" className="question-btn">Alternative</button>
        <button type="button" className="question-btn">Alternative</button>

        </div>
        <button type="button" className="next-btn">Next</button>
        </section>
    </section>
  )
}

export default quiz