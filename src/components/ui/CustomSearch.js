import React, { useEffect, useState } from "react";
import { Flex, Button } from "@radix-ui/themes";

const CustomSearchInput = (props) => {
  const { value, onChange, onBlur, onFocus, ref } = props.getInputProps();
  const {
    autocompleteSuggestions = [],
    onSubmit,
    setAutocompleteSuggestions,
  } = props;

  useEffect(() => {
    // Fetch autocomplete suggestions based on the current query
    if (value.trim().length > 2) {
      // Make an API call to fetch suggestions
      // This logic assumes you have a function that fetches suggestions from your backend or ElasticSearch
      fetchAutocompleteSuggestions(value);
    } else {
      setAutocompleteSuggestions([]);
    }
  }, [value]);

  const fetchAutocompleteSuggestions = async (query) => {
    // Replace this URL with your actual API call for autocomplete suggestions
    const response = await fetch(`/api/autocomplete?query=${query}`);
    const data = await response.json();
    setAutocompleteSuggestions(data.suggestions); // Set the fetched suggestions
  };

  return (
    <Flex direction="column" width={"100%"} position="relative">
      {/* Input and Button */}
      <Flex gapX={"4"} width={"100%"}>
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={ref}
          placeholder="Search Topic Here"
          className="w-full px-2 py-2 outline-none border border-gray-300 rounded-lg"
        />
        <Button
          onClick={() => onSubmit(value)} // Trigger search with input value
          variant={"solid"}
          size={"4"}
        >
          Search
        </Button>
      </Flex>

      {/* Autocomplete Suggestions */}
      {autocompleteSuggestions.length > 0 && (
        <div className="autocomplete-suggestions bg-white shadow rounded-lg mt-2">
          {autocompleteSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                onSubmit(suggestion.suggestion); // Submit suggestion
                setAutocompleteSuggestions([]); // Clear suggestions
              }}
            >
              {suggestion.suggestion}
            </div>
          ))}
        </div>
      )}
    </Flex>
  );
};

export default CustomSearchInput;
