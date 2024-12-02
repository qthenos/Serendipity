Backend Architecture
The backend logic resides within the /api folder under Next.js API routes. These routes handle server-side logic, including:
    1: Database Queries:
    API routes communicate with the database via the Supabase client. This ensures that all interactions with the database are centralized, promoting consistency and simplifying debugging.

    2: HTTP Methods:
    Each API route is designed to handle specific HTTP methods such as GET (to retrieve data), POST (to create or update data), etc. This adheres to RESTful principles and ensures a predictable, scalable API design.

Frontend Architecture
The frontend is built using Next.js, providing a server-rendered, React-based user interface. It interacts with the backend by making HTTP requests to the API routes.

Key features include:
    1: Dynamic Data Fetching:
    The frontend fetches data from API routes to populate user interfaces in real-time.

    2: State Management:
    Leveraging React’s state management features to handle user inputs and interactions efficiently.

    3: Responsive Design:
    Ensures that the application works seamlessly across devices and screen sizes.