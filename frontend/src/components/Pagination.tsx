import { useSearchContext } from '../lib/utils';

export type Props = {
  page: number;
  pages: number;
};

const Pagination = ({ page, pages }: Props) => {
  const context = useSearchContext();
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300 divide-x-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 ${page === number ? 'bg-blue-200' : ''}`}
          >
            <button onClick={() => context.setPage(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
