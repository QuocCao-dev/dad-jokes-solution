import { useEffect, useState } from "react";
import axios from "axios";
import Jokes from "./components/Jokes";
import { useImmer } from "use-immer";
import ReactLoading from "react-loading";
import "./App.css";
import { TJoke } from "./types/joke";

// type

const URL = "https://icanhazdadjoke.com";
const OPTIONS = { headers: { Accept: "application/json" } };

function App() {
  const [jokes, setJokes] = useImmer<TJoke[]>([]);
  const [loading, setLoading] = useState(false);
  // 1 : refactor fetchJokes
  // 2 : create reuse components
  // 3 : add vote system

  // @ts-ignore
  const fetchJokes = async (quantity?: number = 10) => {
    setLoading(true);

    const jokesPromise = Array.from({ length: quantity }).map(() =>
      axios.get(URL, OPTIONS)
    );

    const responses = (await Promise.all(jokesPromise)).map(
      (response) => response.data
    );
    const responsesWithVotes = responses.map((response) => ({
      ...response,
      votes: 0,
    }));

    setJokes(responsesWithVotes);
    setLoading(false);
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const handleVoteUp = (joke: TJoke) => {
    setJokes((drafJokes) => {
      const jokeIndex = drafJokes.findIndex(
        (jokeItem) => jokeItem.id === joke.id
      );
      drafJokes[jokeIndex].votes += 1;
    });
  };

  const handleVoteDown = (joke: TJoke) => {
    setJokes((drafJokes) => {
      const jokeIndex = drafJokes.findIndex(
        (jokeItem) => jokeItem.id === joke.id
      );
      drafJokes[jokeIndex].votes -= 1;
    });
  };

  return (
    <div className="App">
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
          <button onClick={() => fetchJokes()} className="JokeList-getmore">
            Fetch Jokes
          </button>
        </div>
        {loading ? (
          <ReactLoading
            type={"cylon"}
            color={"#ffffff"}
            height={667}
            width={375}
          />
        ) : (
          <Jokes
            jokes={jokes}
            onVoteUp={handleVoteUp}
            onVoteDown={handleVoteDown}
          />
        )}
      </div>
    </div>
  );
}

export default App;
