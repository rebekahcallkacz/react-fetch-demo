import { useState, useEffect } from "react";
import "./App.css";
import Button from "./Button";
import { loadPeople } from "./utils.js";

const loadPlanet = async (url) => {
  // Get the response
  const response = await fetch(url, {
    // This tells the API that you want your data in JSON format
    headers: { "Content-Type": "application/json" },
  });
  // Pull out your data
  const data = await response.json();
  // If there's data, return it
  if (data) {
    return data;
  }
  // If there's not data, return an empty array
  return {};
};

function App() {
  // Store people and status of fetching people data
  const [peopleData, setPeopleData] = useState({
    people: undefined,
    isLoading: true,
    isErrored: false,
  });
  const [selectedPerson, setSelectedPerson] = useState();
  const [selectedPlanet, setSelectedPlanet] = useState();
  const { people, isLoading, isErrored } = peopleData;

  useEffect(() => {
    // If people is undefined or null, call loadPeople to get them from the API
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
    setSelectedPlanet(undefined);
    const clickedPerson = people.find((person) => person.name === name);
    setSelectedPerson(clickedPerson);
    loadPlanet(clickedPerson.homeworld)
      .then((data) => {
        setSelectedPlanet(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("selected person", selectedPerson);
  console.log("selected planet", selectedPlanet);
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
            <div>{`${selectedPerson.name} lives on the planet`}</div>
            {selectedPlanet && <div>{`${selectedPlanet.name}`}</div>}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
