
// utils/fetchCategories.ts
export const fetchCategories = async () => {
  const response = await fetch(`https://opentdb.com/api_category.php`);
  const data = await response.json();
  return data;
};

export interface QuestionOptions {
  amount: number;
  category: number;
  difficulty: string;
  type: string;
}
export const fetchQuestions = async (options: QuestionOptions) => {
  const { amount, category, difficulty, type } = options;
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  );
  const data = await response.json();
  return data;
};


        