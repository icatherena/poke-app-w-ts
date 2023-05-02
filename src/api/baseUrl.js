import axios from "axios";

const BASEURL = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-Type": "aplication/json",
  },
});

export default BASEURL;
