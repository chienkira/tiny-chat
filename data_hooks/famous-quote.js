import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useFamousQuote(id) {
  const { data, error } = useSWR(
    `https://api.quotable.io/random?maxLength=50`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    quote: data,
    isLoading: !error && !data,
    isError: error,
  };
}
