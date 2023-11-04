import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";
import SearchWords from "./components/searchWords";

export default async function Home({
  searchParams,
}: {
  searchParams: { words: string | undefined };
}) {
  const getData = async () => {
    const res = await fetch(
      `https://ac-dict.naver.com/kovi/ac?st=11&r_lt=11&q=${searchParams.words}`
    );
    return res.json();
  };
  const db = await getData();

  const ss = db.items[0];
  return (
    <div>
      <h1>hi</h1>
      <SearchWords />
      {ss.map(
        (
          i: (
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | PromiseLikeOfReactNode
            | null
            | undefined
          )[],
          s: Key | null | undefined
        ) => (
          <div key={s}>
            <p>{i[0]}</p>
            <p>{i[3]}</p>
          </div>
        )
      )}
    </div>
  );
}
