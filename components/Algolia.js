"use client";
import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, useInstantSearch } from "react-instantsearch";
import CustomSearchBox from "./AlgoliaCustomeSearchBox";
import Link from "next/link";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
const AlgoliasearchClient = algoliasearch(appId, apiKey);

function Hit({ hit, setSearchListVisible }) {
  return (
    <Link
      href={"/productoverview/" + hit.objectID}
      className="flex border-b border-gray-200 py-3"
      onClick={() => setSearchListVisible(false)}
    >
      <img
        className="w-14 h-14 rounded-lg mr-6"
        src={hit.image}
        alt={hit.name}
      />
      <div>
        <h1 className="text-sm font-medium font-serif text-gray-800">
          {hit.name}
        </h1>
        <p className="text-sm font-semibold text-blue-700">₹{hit.price}</p>
      </div>
    </Link>
  );
}

export default function AlgoliaSearch() {
  const [searchListVisible, setSearchListVisible] = useState(true);
  return (
    <div className="lg:w-4/6 mx-auto ">
      <InstantSearch searchClient={AlgoliasearchClient} indexName="mern store">
        {searchListVisible && <CustomSearchBox hit={Hit} />}
      </InstantSearch>
    </div>
  );
}

function EmptyQueryBoundary({ children, fallback }) {
  const { indexUiState } = useInstantSearch();
  if (!indexUiState.query) {
    return fallback;
  }

  return children;
}
