import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPokemonById = createAsyncThunk(
  'pokemons/fetchById',
  async (id: number, { signal }) => {
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      cancelToken: source.token,
    })
    return response.data
  }
)