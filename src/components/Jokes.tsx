import { TJoke } from "../types/joke";
import {
  getColorByVotes,
  getEmojiByVotes,
  sortJokesByVotes,
} from "../utils/jokes";

type Props = {
  jokes: TJoke[];
  onVoteUp: (joke: TJoke) => void;
  onVoteDown: (joke: TJoke) => void;
};

const Jokes = ({ jokes, onVoteUp, onVoteDown }: Props) => {
  const handleVoteUp = (joke: TJoke) => {
    onVoteUp(joke);
  };
  const handleVoteDown = (joke: TJoke) => {
    onVoteDown(joke);
  };

  const sortedJokes = sortJokesByVotes(jokes);

  return (
    <div className="JokeList-jokes">
      {sortedJokes.map((joke) => (
        <div className="Joke" key={joke.id}>
          <div className="Joke-buttons">
            <i className="fas fa-arrow-up" onClick={() => handleVoteUp(joke)} />
            <span
              className="Joke-votes"
              style={{ borderColor: getColorByVotes(joke.votes) }}
            >
              {joke.votes}
            </span>
            <i
              className="fas fa-arrow-down"
              onClick={() => handleVoteDown(joke)}
            />
          </div>
          <div className="Joke-text">{joke.joke}</div>
          <div className="Joke-smiley">
            <i className={getEmojiByVotes(joke.votes)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jokes;
