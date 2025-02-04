import { Express, Request, Response } from "express";
import { Database } from "sqlite3";

export function registerRoutes(app: Express, database: Database) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Successfully connected to the API");
  });

  /**
   * Categories and films
   */
  app.get("/categories", (req: Request, res: Response) => {
    const query = `SELECT c.category_id, c.name, substr(group_concat(f.title , ", "),0 ,500) as description FROM category c LEFT JOIN film_category fc ON fc.category_id = c.category_id LEFT JOIN film f ON fc.film_id = f.film_id GROUP BY fc.category_id`;
    database.all(query, (err, rows) => {
      res.json(rows);
    });
  });

  /**
   * Returns all films for a category
   */
  app.get("/categories/:id/films", (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      throw new Error("Must supply category id");
    }

    const query =
      "SELECT f.film_id, f.rating, f.title, l.name as language, f.description, f.length as duration, f.release_year FROM film_category fc INNER JOIN film as f ON fc.film_id = f.film_id INNER JOIN language as l ON f.language_id = l.language_id WHERE fc.category_id = ?";
    database.all(query, [id], req, (err, rows) => {
      if (err) {
        throw err;
      }

      res.json(rows);
    });
  });
}
