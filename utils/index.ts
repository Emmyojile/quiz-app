type categoryType
export  async function fetchCategories(categories:categoryType){
    try {
      const {trivia_categories} = await fetch("https://opentdb.com/api_config.php");
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }