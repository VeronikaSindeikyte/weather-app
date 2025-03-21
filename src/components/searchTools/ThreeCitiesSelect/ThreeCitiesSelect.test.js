/* eslint-disable no-undef */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThreeCitiesSelect from "./ThreeCitiesSelect";

const mockOnSearch = jest.fn();
const mockSetSelectedCity = jest.fn();

describe("ThreeCitiesSelect Component", () => {
  test("renders all three city buttons", () => {
    render(
      <ThreeCitiesSelect
        onSearch={mockOnSearch}
        selectedCity=""
        setSelectedCity={mockSetSelectedCity}
      />
    );

    expect(screen.getByLabelText("Vilnius")).toBeInTheDocument();
    expect(screen.getByLabelText("Kaunas")).toBeInTheDocument();
    expect(screen.getByLabelText("Klaipėda")).toBeInTheDocument();
  });

  test("selecting a city updates selected City state and calls handlers", () => {
    render(
      <ThreeCitiesSelect
        onSearch={mockOnSearch}
        selectedCity=""
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const vilniusRadio = screen.getByLabelText("Vilnius");
    fireEvent.click(vilniusRadio);

    expect(mockSetSelectedCity).toHaveBeenCalledWith("Vilnius");
    expect(mockOnSearch).toHaveBeenCalledWith("Vilnius");
  });

  test("updates selected city when prop changes", () => {
    const { rerender } = render(
      <ThreeCitiesSelect
        onSearch={mockOnSearch}
        selectedCity="Vilnius"
        setSelectedCity={mockSetSelectedCity}
      />
    );

    expect(screen.getByLabelText("Vilnius")).toBeChecked();

    rerender(
      <ThreeCitiesSelect
        onSearch={mockOnSearch}
        selectedCity="Kaunas"
        setSelectedCity={mockSetSelectedCity}
      />
    );

    expect(screen.getByLabelText("Kaunas")).toBeChecked();
  });

  test("resets city state if an invalid city is selected", () => {
    render(
      <ThreeCitiesSelect
        onSearch={mockOnSearch}
        selectedCity="InvalidCity"
        setSelectedCity={mockSetSelectedCity}
      />
    );

    expect(screen.getByLabelText("Vilnius")).not.toBeChecked();
    expect(screen.getByLabelText("Kaunas")).not.toBeChecked();
    expect(screen.getByLabelText("Klaipėda")).not.toBeChecked();
  });
});