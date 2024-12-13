import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router";
const MovieCarousel = ({ movieList, movetv }) => {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieResponse = await fetch(`${movieList}`);
        if (!movieResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const movieData = await movieResponse.json();

        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/${movetv}/list?api_key=${apiKey}`
        );
        if (!genreResponse.ok) {
          throw new Error("Genre response was not ok");
        }
        const genreData = await genreResponse.json();

        const genreMap = genreData.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        const movieResults = movieData.results.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          avgVotes: item.vote_average,
          mediaType: item.media_type || movetv,
          genreNames: item.genre_ids
            .slice(0, 2)
            .map((genreId) => genreMap[genreId] || "Unknown"),
          releaseDate: item.release_date || item.first_air_date,
          posterPath: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : null,
        }));

        setMovie(movieResults);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      setMovie([]);
      setLoading(true);
      setError(null);
    };
  }, [movieList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full  py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 4,
            breakpoints: {
              "(max-width: 640px)": { slidesToScroll: 1 },
              "(min-width: 640px)": { slidesToScroll: 2 },
              "(min-width: 1024px)": { slidesToScroll: 4 },
            },
          }}
          className="w-full relative"
        >
          <CarouselContent className="flex -ml-4">
            {movie.map((movie, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() =>
                  navigate(`/${movie.mediaType}/${movie.id}`, {
                    state: {
                      number: movie,
                    },
                  })
                }
              >
                <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.posterPath}
                      alt={movie.title}
                      className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="bg-yellow-400/80 rounded-full px-2 py-1 text-black font-bold">
                        {movie.avgVotes.toFixed(1)}
                      </span>
                      <div className="flex gap-1">
                        {movie.genreNames.map((genre, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-pink-600/80 text-white rounded-full"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold mb-1 truncate">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-400">{movie.releaseDate}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Responsive Navigation */}
          <div className="hidden md:block">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-neutral-700/50 hover:bg-neutral-600/50 text-white p-2 rounded-full shadow-lg transition-all duration-300" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-neutral-700/50 hover:bg-neutral-600/50 text-white p-2 rounded-full shadow-lg transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default MovieCarousel;
