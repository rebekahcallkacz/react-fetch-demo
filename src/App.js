import { useState, useEffect } from "react";
import "./App.css";

const loadPeople = async () => {
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

function App() {
  // Store people
  const [people, setPeople] = useState();

  useEffect(() => {
    // If people is undefined or null, call load people to get them from the API
    if (!people) {
      loadPeople()
        // Once the promise is resolved, set people equal to the data response
        .then((data) => setPeople(data))
        // If there's an error and it isn't successfully resolved, print that error
        .catch((error) => console.log(error.message));
    }
  }, [people]);

  // console.log(people)
  // If people is not null or undefined, iterate through and display the individual's names
  // You might need to scroll down to see these show up :)
  return (
    <div className="App">
      <header className="App-header">
        {people?.map((person) => (
          <div key={person.name}>{person.name}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
