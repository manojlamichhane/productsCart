"use client";
import { Combobox } from "@headlessui/react";
import React, { useState } from "react";
import { category } from "@/constants";

const FilterCategory = ({ selectedCategory }: { selectedCategory: string }) => {
  const [query, setQuery] = useState("");

  const filteredCategory =
    query === ""
      ? category
      : category.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <Combobox value={selectedCategory} onChange={() => null}>
      <Combobox.Input
        className={"search-manufacturer__input"}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Combobox.Options className={"search - manufacturer__options"}>
        {filteredCategory.map((item) => (
          <Combobox.Option
            key={item}
            value={item}
            className={"search-manufacturer__option"}
          >
            {item}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default FilterCategory;
