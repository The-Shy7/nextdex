export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    description?: string;
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
    description?: string;
    power?: number;
    accuracy?: number;
    pp?: number;
    type?: string;
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface AbilityDetails {
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
}

export interface MoveDetails {
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
    };
  }[];
  power: number | null;
  accuracy: number | null;
  pp: number;
  type: {
    name: string;
  };
}