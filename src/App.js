import { useState, useEffect } from "react";
import "./App.css";
import Button from "./Button";
import { loadPeople } from "./utils.js";

// Requirements
// When you click on a person's name - display what planet they live on

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

  // If people successfully loads, iterate through and display the individual's names
  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <div>Loading...</div>
        ) : isErrored ? (
          <div>ERROR!</div>
        ) : (
          people.map((person) => (
            <Button
              onClick={handleClick}
              value={person.name}
              children={person.name}
              key={person.name}
            />
          ))
        )}
        <hr></hr>
        {selectedPerson && (
          <>
            <div>{`${selectedPerson.name}'s Mass:`}</div>
            <div>{selectedPerson.mass}</div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
