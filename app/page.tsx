'use client';

import { useState, useEffect } from 'react';
import { Pokemon, PokemonList } from './types/pokemon';
import PokemonCard from './components/PokemonCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchPokemon, fetchPokemonList } from './utils/helpers';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
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
      } catch (error) {
        console.error('Error loading Pokemon:', error);
        setError('Failed to load Pokémon data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [currentPage]);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pokédex</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Explore the world of Pokémon!</p>
        
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Pokémon by name..."
            className="pl-10 border-2 focus:border-blue-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="h-96 bg-white/30 backdrop-blur-sm rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {filteredPokemon.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-300">No Pokémon found matching "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPokemon.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            )}

            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-2 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-md">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-2 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}