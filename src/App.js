import * as React from "react";
import { useInfiniteQuery } from "react-query";

const fetchRepositories = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${pageParam}`
  );
  return response.json();
};
function App() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    "repositories",
    fetchRepositories,
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total_count / 30;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );

  React.useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);
  console.log({ data });

  return (
    <div className="App">
      <main>
        <h1>Infinite Scroll</h1>
        <ul>
          {data.pages.map((page) =>
            page.items.map((item) => (
              <li key={item.id}>
                <p>
                  <b>{item.name}</b>
                </p>
                <p>{item.description}</p>
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
