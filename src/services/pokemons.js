import axios from "axios";

class PokemonService {
  constructor(limit) {
    this.baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit || 0}`;
  }

  async getAllPokemons() {
    let percent = 0;
    let pokemons = await axios.get(this.baseUrl);
    return pokemons.data;
  }

  async getPokemonDetails(url) {
    let pokemonDetail = await axios.get(url);
    return pokemonDetail;
  }
}

export default PokemonService;

// const [pageState, setPageState] = useState({
//   currentPage: 1,
//   hasPrevious: false,
//   hasNext: true,
//   associatedPages: [1, 2, 3, "...", pageNo],
// });

// const renderPages = (currPage) => {
//   let associatedPages = [];
//   if (currPage === 1) {
//     associatedPages = [1, 2, 3, "...", pageNo];
//   } else if (currPage === pageNo) {
//     associatedPages = [1, "...", pageNo - 2, pageNo - 1, pageNo];
//   } else {
//     let prevPage = currPage - 1;
//     let nextPage = currPage + 1;
//     let prevDots = false;
//     let nextDots = false;
//     if (prevPage - 1 >= 3) prevDots = true;
//     if (pageNo - nextPage >= 3) nextDots = true;
//     associatedPages = [1, prevPage, currPage, nextPage, pageNo];
//     if (currPage === 2) associatedPages.shift();
//     if (currPage === 4) associatedPages.splice(1, 0, 2);
//     if (currPage === pageNo - 3)
//       associatedPages.splice(associatedPages.length - 1, 0, pageNo - 1);
//     if (currPage === pageNo - 1) associatedPages.pop();
//     // ->[1,1,2,3,]
//     if (prevDots) associatedPages.splice(1, 0, "...");
//     // else if (currPage === 3) associatedPages.splice(0, 0, 1);

//     if (nextDots)
//       associatedPages.splice(associatedPages.length - 1, 0, "...");
//   }

//   console.log(associatedPages);

//   return associatedPages;
// };

// const setCurrentPage = (page) => {
//   let options = {};
//   if (page === 1) {
//     options = {
//       currentPage: 1,
//       hasPrevious: false,
//       hasNext: true,
//       associatedPages: renderPages(page),
//     };
//   } else if (page === pageNo) {
//     options = {
//       currentPage: page,
//       hasPrevious: true,
//       hasNext: false,
//       // associatedPages: [page - 1, page - 2],
//       associatedPages: renderPages(page),
//     };
//   } else {
//     options = {
//       currentPage: page,
//       hasPrevious: true,
//       hasNext: true,
//       // associatedPages: [page - 1, page + 1],
//       associatedPages: renderPages(page),
//     };
//   }

//   setPageState(options);
// };
