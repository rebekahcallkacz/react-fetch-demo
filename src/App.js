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
  // Store people and status of fetching people data
  const [peopleData, setPeopleData] = useState({
    people: undefined,
    isLoading: true,
    isErrored: false,
  });
  const [selectedPerson, setSelectedPerson] = useState();
  const { people, isLoading, isErrored } = peopleData;

  useEffect(() => {
    // If people is undefined or null, call load people to get them from the API
    if (!people) {
      loadPeople()
        // Once the promise is resolved, set people equal to the data response
        .then((data) =>
          setPeopleData({ people: data, isLoading: false, isErrored: false })
        )
        // If there's an error and it isn't successfully resolved, store that
        .catch((error) =>
          setPeopleData({ people: null, isLoading: false, isErrored: true })
        );
    }
  }, [people]);

  const handleClick = (name) => {
    const clickedPerson = people.find((person) => person.name === name);
    setSelectedPerson(clickedPerson);
  };
  // console.log("selected person", selectedPerson);
  // console.log("people", people);
  // If people is not loading or errored, iterate through and display the individual's names
  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <div>Loading...</div>
        ) : isErrored ? (
          <div>ERROR!</div>
        ) : (
          people.map((person) => (
            <button
              key={person.name}
              onClick={(event) => handleClick(event.target.value)}
              value={person.name}
            >
              {person.name}
            </button>
          ))
        )}
        {selectedPerson && (
          <div>{`${selectedPerson.name}'s Mass: ${selectedPerson.mass}`}</div>
        )}
      </header>
    </div>
  );
}

export default App;
