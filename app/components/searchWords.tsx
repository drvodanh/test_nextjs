"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export default function SearchWords() {
  const searchParams = useSearchParams();
  const words = searchParams.get("words");
  const router = useRouter();

  const createQuery = useCallback(
    (words: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(words, value);

      return params.toString();
    },
    [searchParams]
  );

  const [input, setInput] = useState("");

  useEffect(() => {
    router.push(`/?${createQuery("words", input.toString())}`);
  }, [createQuery, input, router]);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-black p-2"
      />
      <button
        onClick={() => {
          router.push(`/?${createQuery("words", input.toString())}`);
        }}
      >
        search
      </button>
    </div>
  );
}
