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
  // Store planet data as we fetch it
  const [planets, setPlanets] = useState({});
  const [selectedPerson, setSelectedPerson] = useState();
  const [selectedPlanet, setSelectedPlanet] = useState();
  const { people, isLoading, isErrored } = peopleData;
  console.log(people);
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
    const selectedPerson = people.find((person) => person.name === name);
    loadPlanet(selectedPerson.homeworld)
      .then((data) => {
        console.log("This is the planet data", data);
        setSelectedPlanet(data);
      })
      .catch((error) => console.log("This failed to fetch a planet"));
    console.log(selectedPerson);
  };
  console.log(selectedPlanet);
  // If people successfully loads, iterate through and display the individual's names
  return (
    <div className="App">
      <div className="App-body">
        <div className="App-column">
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
        </div>
        <div className="App-column">
          {selectedPerson && (
            <>
              <div>{`${selectedPerson.name} lives on the planet`}</div>
              {selectedPlanet && <div>{`${selectedPlanet.name}`}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
