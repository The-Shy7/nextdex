/**
 * Helper Functions for Pokémon Application
 * 
 * This file contains utility functions for fetching and processing Pokémon data
 * from the PokeAPI, as well as general helper functions used throughout the application.
 */

/**
 * Capitalizes the first letter of a string
 * 
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Creates a delay using a Promise
 * Used to prevent rate limiting when making multiple API calls
 * 
 * @param {number} ms - The delay time in milliseconds
 * @returns {Promise<void>} A promise that resolves after the specified delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches detailed data for a specific Pokémon by ID
 * Includes additional API calls to get ability and move descriptions
 * 
 * @param {number} id - The Pokémon ID to fetch
 * @returns {Promise<any>} Promise resolving to the Pokémon data with enhanced details
 */
export async function fetchPokemon(id: number): Promise<any> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const pokemon = await response.json();

    // Fetch ability descriptions with rate limiting
    const abilitiesWithDescriptions = await Promise.all(
      pokemon.abilities.slice(0, 4).map(async (abilityData: any, index: number) => {
        await delay(index * 100);
        try {
          const abilityResponse = await fetch(abilityData.ability.url);
          if (!abilityResponse.ok) {
            return {
              ...abilityData,
              description: 'Description unavailable.'
            };
          }
          const abilityDetails = await abilityResponse.json();
          const englishEffect = abilityDetails.effect_entries.find(
            (entry: any) => entry.language.name === 'en'
          );
          return {
            ...abilityData,
            description: englishEffect?.effect || 'No description available.'
          };
        } catch (error) {
          console.error(`Error fetching ability ${abilityData.ability.name}:`, error);
          return {
            ...abilityData,
            description: 'Description unavailable.'
          };
        }
      })
    );

    // Fetch move details with better error handling
    const movesWithDetails = await Promise.all(
      pokemon.moves.slice(0, 20).map(async (moveData: any, index: number) => {
        await delay(index * 50); // Reduced delay to speed up initial load
        try {
          // Add timeout to fetch to prevent hanging requests
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          const moveResponse = await fetch(moveData.move.url, { 
            signal: controller.signal 
          }).catch(err => {
            clearTimeout(timeoutId);
            throw err;
          });
          
          clearTimeout(timeoutId);
          
          if (!moveResponse.ok) {
            return {
              ...moveData,
              description: 'Description unavailable.',
              type: 'normal' // Default type if unavailable
            };
          }
          
          const moveDetails = await moveResponse.json();
          const englishEffect = moveDetails.effect_entries?.find(
            (entry: any) => entry.language.name === 'en'
          );
          
          return {
            ...moveData,
            description: englishEffect?.short_effect || englishEffect?.effect || 'No description available.',
            power: moveDetails.power,
            accuracy: moveDetails.accuracy,
            pp: moveDetails.pp,
            type: moveDetails.type?.name || 'normal' // Default to normal type if unavailable
          };
        } catch (error) {
          // Don't log the full error object to console to avoid cluttering
          console.error(`Error fetching move ${moveData.move.name}`);
          return {
            ...moveData,
            description: 'Description unavailable.',
            type: 'normal' // Default type if unavailable
          };
        }
      })
    );

    return {
      ...pokemon,
      abilities: abilitiesWithDescriptions,
      moves: movesWithDetails
    };
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
}

/**
 * Fetches a paginated list of Pokémon
 * 
 * @param {number} limit - Number of Pokémon to fetch per page
 * @param {number} offset - Starting index for pagination
 * @returns {Promise<any>} Promise resolving to the paginated Pokémon list
 */
export async function fetchPokemonList(limit: number = 20, offset: number = 0): Promise<any> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
}

/**
 * Fetches all Pokémon names and IDs for global search functionality
 * 
 * @returns {Promise<Array<{name: string, id: number}>>} Promise resolving to an array of Pokémon names and IDs
 */
export async function fetchAllPokemonNames(): Promise<Array<{name: string, id: number}>> {
  try {
    // Fetch with a large limit to get all Pokémon in one request
    // The current Pokémon count is around 1000, so 2000 should be future-proof
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract name and ID from each result
    return data.results.map((pokemon: any) => {
      const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
      return {
        name: pokemon.name,
        id
      };
    });
  } catch (error) {
    console.error('Error fetching all Pokemon names:', error);
    return []; // Return empty array on error to prevent app from crashing
  }
}

/**
 * Fetches detailed information about a specific move
 * 
 * @param {string} url - The URL of the move to fetch details for
 * @returns {Promise<string>} Promise resolving to the move description
 */
export async function fetchMoveDetails(url: string): Promise<string> {
  try {
    // Add timeout to fetch to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, { 
      signal: controller.signal 
    }).catch(err => {
      clearTimeout(timeoutId);
      throw err;
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const moveDetails = await response.json();
    const englishEffect = moveDetails.effect_entries?.find(
      (entry: any) => entry.language.name === 'en'
    );
    
    let description = englishEffect?.short_effect || englishEffect?.effect || 'No description available.';
    
    // Add power and accuracy information
    const stats = [];
    if (moveDetails.power !== null) stats.push(`Power: ${moveDetails.power}`);
    if (moveDetails.accuracy !== null) stats.push(`Accuracy: ${moveDetails.accuracy}%`);
    if (moveDetails.pp) stats.push(`PP: ${moveDetails.pp}`);
    
    if (stats.length > 0) {
      description += `\n\n${stats.join(' | ')}`;
    }
    
    return description;
  } catch (error) {
    console.error('Error fetching move details');
    return 'Description unavailable.';
  }
}