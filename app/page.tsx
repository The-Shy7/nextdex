/**
 * Pokédex Main Page Component
 * 
 * This component serves as the main page of the Pokédex application, displaying a list of Pokémon
 * with search and pagination functionality.
 * 
 * Features:
 * - Fetches and displays Pokémon data from the PokeAPI
 * - Implements client-side search across all available Pokémon
 * - Provides pagination with direct page navigation
 * - Responsive grid layout for different screen sizes
 * - Loading states and error handling
 * 
 * @component
 */

'use client';

import { useState, useEffect } from 'react';
import { Pokemon, PokemonList } from './types/pokemon';
import PokemonCard from './components/PokemonCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { fetchPokemon, fetchPokemonList, fetchAllPokemonNames } from './utils/helpers';
import Pagination from './components/Pagination';

export default function Home() {
  // State for storing the currently displayed Pokémon
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  
  // State for storing all Pokémon names for global search
  const [allPokemonNames, setAllPokemonNames] = useState<{name: string, id: number}[]>([]);
  
  // Loading state for API requests
  const [loading, setLoading] = useState(true);
  
  // Search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  
  // Current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Total number of pages available
  const [totalPages, setTotalPages] = useState(0);
  
  // Error state for API request failures
  const [error, setError] = useState<string | null>(null);
  
  // Number of Pokémon to display per page
  const ITEMS_PER_PAGE = 12;

  /**
   * Fetches the list of all Pokémon names on component mount
   * This enables global search across all Pokémon, not just the current page
   */
  useEffect(() => {
    const loadAllPokemonNames = async () => {
      try {
        const names = await fetchAllPokemonNames();
        setAllPokemonNames(names);
      } catch (error) {
        console.error('Error loading all Pokémon names:', error);
      }
    };

    loadAllPokemonNames();
  }, []);

  /**
   * Fetches Pokémon data for the current page or search results
   * Triggered when the current page changes or when search results need to be loaded
   */
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // If there's a search term and we have all Pokémon names, filter and fetch those Pokémon
        if (searchTerm && allPokemonNames.length > 0) {
          // Improved search filtering - match exact words or beginning of names
          const normalizedSearchTerm = searchTerm.toLowerCase().trim();
          
          // Filter Pokémon names that match the search term more precisely
          const filteredNames = allPokemonNames
            .filter(pokemon => {
              const pokemonName = pokemon.name.toLowerCase();
              
              // Exact match
              if (pokemonName === normalizedSearchTerm) {
                return true;
              }
              
              // Starts with search term
              if (pokemonName.startsWith(normalizedSearchTerm)) {
                return true;
              }
              
              // Contains the search term as a whole word
              const nameWords = pokemonName.split('-');
              return nameWords.some(word => word === normalizedSearchTerm);
            })
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
          
          // Calculate total pages for the search results
          const totalFilteredItems = allPokemonNames.filter(pokemon => {
            const pokemonName = pokemon.name.toLowerCase();
            
            // Exact match
            if (pokemonName === normalizedSearchTerm) {
              return true;
            }
            
            // Starts with search term
            if (pokemonName.startsWith(normalizedSearchTerm)) {
              return true;
            }
            
            // Contains the search term as a whole word
            const nameWords = pokemonName.split('-');
            return nameWords.some(word => word === normalizedSearchTerm);
          }).length;
          
          setTotalPages(Math.ceil(totalFilteredItems / ITEMS_PER_PAGE));
          
          // Fetch detailed data for each filtered Pokémon
          const pokemonDetails = await Promise.all(
            filteredNames.map(pokemon => fetchPokemon(pokemon.id))
          );
          
          setPokemonList(pokemonDetails);
        } else {
          // If no search term, fetch Pokémon for the current page
          const offset = (currentPage - 1) * ITEMS_PER_PAGE;
          const list: PokemonList = await fetchPokemonList(ITEMS_PER_PAGE, offset);
          setTotalPages(Math.ceil(list.count / ITEMS_PER_PAGE));

          const pokemonDetails = await Promise.all(
            list.results.map(async (pokemon) => {
              const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
              return fetchPokemon(id);
            })
          );

          setPokemonList(pokemonDetails);
        }
      } catch (error) {
        console.error('Error loading Pokemon:', error);
        setError('Failed to load Pokémon data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [currentPage, searchTerm, allPokemonNames]);

  /**
   * Handles search input changes
   * Resets to page 1 when search term changes
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">NextDex</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Explore the world of Pokémon!</p>
        
        {/* Search input with icon */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Pokémon by name..."
            className="pl-10 border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Error message display */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Loading state with skeleton cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="h-96 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* No results message */}
            {pokemonList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-300">No Pokémon found matching "{searchTerm}"</p>
              </div>
            ) : (
              /* Pokémon grid display */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pokemonList.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            )}

            {/* Pagination component */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}