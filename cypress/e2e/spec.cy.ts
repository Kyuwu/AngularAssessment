describe('CategoryService API Tests', () => {

  const apiUrl = 'http://localhost:8080';

  beforeEach(() => {
    // Optionally, reset or mock something before each test
  });

  it('should fetch a list of categories', () => {
    cy.intercept('GET', `${apiUrl}/categories`, {
      statusCode: 200,
      body: [{
          category_id: 1,
          name: 'Action',
          description: 'Action-packed films.'
        },
        {
          category_id: 2,
          name: 'Comedy',
          description: 'Fun and laughter.'
        }
      ]
    }).as('getCategories');

    cy.visit('/categories'); // Adjust route as needed

    cy.wait('@getCategories');
  });

  it('should fetch films by category ID', () => {
    const categoryId = 1; // Example category ID
    cy.intercept('GET', `${apiUrl}/categories/${categoryId}/films`, {
      statusCode: 200,
      body: [{
          film_id: 101,
          rating: 'R',
          title: 'Die Hard',
          language: 'English',
          description: 'An action-packed thriller.',
          duration: 132,
          release_year: 1988
        },
        {
          film_id: 102,
          rating: 'PG-13',
          title: 'Mad Max',
          language: 'English',
          description: 'A post-apocalyptic action film.',
          duration: 120,
          release_year: 1979
        }
      ]
    }).as('getFilmsByCategory');
  });
});
