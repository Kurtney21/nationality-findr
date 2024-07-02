import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import countryList from "country-list";
import { FaSearch } from "react-icons/fa";


// URL to fetch the country by a users name
const BASE_URL = "https://api.nationalize.io/?name=";

/**
 * Component for fetching and displaying nationality based on user input.
 * @param {object} inputRef - Ref to the input element for focusing.
 * @param {string} name - Name input by the user.
 * @param {function} setName - Function to update the name state.
 */
function NationalityFetcher({inputRef, name, setName}) {
  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current.focus();
  }, [inputRef]);

  const fetchNationality = async (name) => {
    try {
      // Make a GET request to the nationalize.io API endpoint
      let response = await fetch(`${BASE_URL}${name}`);

      // Check if the request was successful and convert it into a JSON object
      let data = await response.json();

      // Log the response to console
      console.log(data.country[0]);

      // Get the country ID from the response data
      let countryId = data.country[0].country_id;

      let countryProbility = data.country[0].probability;

      // Get the country name from the country ID using the country-list library
      const countryName = countryList.getName(countryId);

      // Display the nationality of the entered name to the user
      alert(`${name} is from ${countryName}!`);
      alert(
        `Details:\nCountry Id: ${countryId} \nProbability: ${Math.round(
          countryProbility * 100
        )}%`
      );
    } catch (e) {
      console.error("Error fetching nationality:", e);
      alert("Failed to fetch nationality. Please try again.");
    }
  };

  /**
   * Handles form submission to fetch nationality data.
   * @param {object} e - Form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim the entered name and check if it's not empty
    const enteredName = name.trim();
    console.log(enteredName);
    if (enteredName !== undefined && enteredName !== null) {
      // Call the fetchNationality function with the entered name
      console.log("Fetching nationality for:", enteredName);
      fetchNationality(enteredName);
    } else {
      alert("Please enter a name.");
      return;
    }

    // Reset the form after submission to clear the input field
    e.target.reset();
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="card p-4 shadow-lg text-center">
        <h1>Predict your Nationality</h1>
        <h3>by entering your name:</h3>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3"></InputGroup>
          <Form.Control
            placeholder="Enter your name"
            name="name"
            type="text"
            id="nameInput"
            ref={inputRef}
            className="form-control mb-3"
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>

          <Button type="submit" variant="outline-danger">
          <FaSearch />

          </Button>
        </Form>
      </div>
    </div>
  );
}

export default NationalityFetcher;
