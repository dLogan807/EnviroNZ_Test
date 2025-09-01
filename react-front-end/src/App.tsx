import { useState } from "react";
import "./App.css";

const BACKEND = "http://localhost:5203";

type Location = {
  latitude: number;
  longitude: number;
};

type Suburb = {
  id: number;
  suburbName: string;
  latitude: number;
  longitude: number;
};

function App() {
  const [closestSuburb, setClosestSuburb] = useState<Suburb | null>(null);

  return (
    <div>
      <h1>Closest Suburb Finder</h1>
      <h3>Enviro NZ Coding Challenge</h3>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <label id="latitude">Latitude</label>
        <input name="latitude" placeholder="Latitude" />
        <label id="longitude">Longitude</label>
        <input name="longitude" placeholder="Longitude" />
        <button type="submit">Submit</button>
      </form>
      <h3>Closest Suburb</h3>

      {closestSuburb === null ? (
        "No data"
      ) : (
        <ul>
          <li>id: {closestSuburb?.id}</li>
          <li>suburbName: {closestSuburb?.suburbName}</li>
          <li>latitude: {closestSuburb?.latitude}</li>
          <li>longitude: {closestSuburb?.longitude}</li>
        </ul>
      )}
    </div>
  );

  //Submit the form to query the api
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    const location: Location = {
      latitude: Number(formData.get("latitude")),
      longitude: Number(formData.get("longitude")),
    };

    setClosestSuburb(await getClosestSuburb(location));
  }

  //API call. Get closest suburb from backend
  async function getClosestSuburb(location: Location): Promise<Suburb | null> {
    const headers: Headers = new Headers();
    headers.set("Accept", "application/json");

    const request: RequestInfo = new Request(
      `${BACKEND}/closestSuburb?latitude=${location.latitude}&longitude=${location.longitude}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    const suburb: Suburb | null = await fetch(request)
      .then((res) => res.json())
      .then((data) => ({
        id: data.id,
        suburbName: data.suburbName,
        latitude: data.latitude,
        longitude: data.longitude,
      }))
      .catch(() => null);

    console.log(suburb);

    return suburb;
  }
}

export default App;
