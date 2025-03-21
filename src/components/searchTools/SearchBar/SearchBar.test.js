/* eslint-disable no-undef */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";

const mockOnSearch = jest.fn();
const mockFetchSelectedCity = jest.fn();
const mockSetSelectedCity = jest.fn();

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ name: "Vilnius" }]), 
    })
  );

const setup = () => {
  render(
    <SearchBar
      onSearch={mockOnSearch}
      fetchSelectedCity={mockFetchSelectedCity}
      selectedCity=""
      setSelectedCity={mockSetSelectedCity}
    />
  );
};

describe("SearchBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input field and search button", () => {
    setup();
    expect(screen.getByPlaceholderText("Search for a city...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    setup();
    const input = screen.getByPlaceholderText("Search for a city...");
    fireEvent.change(input, { target: { value: "Vilnius" } });
    expect(input.value).toBe("Vilnius");
  });

  test("calls onSearch and fetchSelectedCity when search button is clicked", () => {
    setup();
    const input = screen.getByPlaceholderText("Search for a city...");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Kaunas" } });
    fireEvent.click(button);

    expect(mockSetSelectedCity).toHaveBeenCalledWith("Kaunas");
    expect(mockOnSearch).toHaveBeenCalledWith("Kaunas");
    expect(mockFetchSelectedCity).toHaveBeenCalledWith("Kaunas");
  });

  test("shows dropdown when typing a city name", async () => {
    setup();
    const input = screen.getByPlaceholderText("Search for a city...");

    fireEvent.change(input, { target: { value: "Vil" } });
    
    await waitFor(() => expect(screen.getByText("No cities found.")).toBeInTheDocument());
  });

  test("closes dropdown when clicking outside", async () => {
    setup();
    const input = screen.getByPlaceholderText("Search for a city...");

    fireEvent.change(input, { target: { value: "Vilnius" } });
    fireEvent.blur(input);

    await waitFor(() => expect(screen.queryByText("No matching cities")).not.toBeInTheDocument());
  });

  test("handles enter key press to select city", async () => {
    setup();
    const input = screen.getByPlaceholderText("Search for a city...");

    fireEvent.change(input, { target: { value: "Kaunas" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(mockSetSelectedCity).toHaveBeenCalledWith("Kaunas");
      expect(mockOnSearch).toHaveBeenCalledWith("Kaunas");
      expect(mockFetchSelectedCity).toHaveBeenCalledWith("Kaunas");
    });
  });
});
