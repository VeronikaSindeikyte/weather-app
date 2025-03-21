/* eslint-disable no-undef */

import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import DropdownMenu from "./DropdownMenu";

const mockOnSearch = jest.fn();
const mockFetchSelectedCity = jest.fn();
const mockSetSelectedCity = jest.fn();

const mockCities = ['Trakai', 'Kaunas', 'Jurbarkas'];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockCities),
  })
);

describe('DropdownMenu component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', async () => {
    render(
      <DropdownMenu
        onSearch={mockOnSearch}
        fetchSelectedCity={mockFetchSelectedCity}
        selectedCity=""
        setSelectedCity={mockSetSelectedCity}
      />
    );

    expect(screen.getByText('Select City')).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  test('opens dropdown on button click', async () => {
    render(
      <DropdownMenu
        onSearch={mockOnSearch}
        fetchSelectedCity={mockFetchSelectedCity}
        selectedCity=""
        setSelectedCity={mockSetSelectedCity}
      />
    );
  
    const button = screen.getByText('Select City');
  
    await act(async () => {
      fireEvent.click(button);
    });
  
    await waitFor(() => {
      expect(screen.getByText('Trakai')).toBeInTheDocument();
      expect(screen.getByText('Kaunas')).toBeInTheDocument();
      expect(screen.getByText('Jurbarkas')).toBeInTheDocument();
    });
  });

  test('selects a city and updates state', async () => {
    render(
      <DropdownMenu
        onSearch={mockOnSearch}
        fetchSelectedCity={mockFetchSelectedCity}
        selectedCity=""
        setSelectedCity={mockSetSelectedCity}
      />
    );

    fireEvent.click(screen.getByText('Select City'));
    await waitFor(() => expect(screen.getByText('Trakai')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Kaunas'));

    expect(mockSetSelectedCity).toHaveBeenCalledWith('Kaunas');
    expect(mockOnSearch).toHaveBeenCalledWith('Kaunas');
    expect(mockFetchSelectedCity).toHaveBeenCalledWith('Kaunas');
  });
});