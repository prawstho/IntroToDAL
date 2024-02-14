 SELECT actor.first_name,
    actor.last_name,
    film.film_id,
    film.title,
    film.release_year,
    film.rating
   FROM film
     JOIN film_actor USING (film_id)
     JOIN actor USING (actor_id);