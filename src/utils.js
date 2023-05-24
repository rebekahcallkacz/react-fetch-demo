export const loadPeople = async () => {
  console.log("This is fetching the data");
  // Get the response
  const response = await fetch(`https://swapi.dev/api/people`, {
    // This tells the API that you want your data in JSON format
    headers: { "Content-Type": "application/json" },
  });
  // Pull out your data
  const data = await response.json();
  // If there's data, return the results (where the people are)
  if (data) {
    return data.results;
  }
  // If there's not data, return an empty array
  return [];
};
