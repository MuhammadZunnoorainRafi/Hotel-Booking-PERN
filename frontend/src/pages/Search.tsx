import { useSearchContext } from '../lib/utils';

function Search() {
  const context = useSearchContext();
  console.log({ context });
  return <div>Search</div>;
}

export default Search;
