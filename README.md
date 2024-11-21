# Data Analytics Backend API with TypeScript and PostgreSQL

## Description

This project is a backend API developed with **TypeScript**, **Node.js**, **Express**, and **PostgreSQL**. The application includes database seeding, environment-specific configurations, and robust testing with **Jest**. It demonstrates best practices in backend development, type safety, and database management.

> **Note:** Due to NDA restrictions, the `.env` files, test data, and seed generation files have been excluded from the repository and cannot be shared.

---

## Features

- **Database Integration**: Built with PostgreSQL, ensuring efficient and secure data handling.
- **TypeScript Migration**: Transitioned the project from JavaScript to TypeScript for enhanced type safety and maintainability.
- **Seeding and Automation**: Includes a streamlined database seeding process using `pg-format` and automated workflows with `psql`.
- **Testing**: Comprehensive tests written in **Jest**, ensuring functionality and reliability.
- **Environment-Specific Configuration**: Utilizes `dotenv` for secure and adaptable environment setups.
- **Error Handling**: Detailed and robust error handling for better debugging and production stability.

---

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v18 or later)
- PostgreSQL (v13 or later)
- npm or yarn
- TypeScript (globally installed, optional)

---

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment files**:  
   Create `.env.development`, `.env.test`, and `.env.production` files in the project root, based on your environments. The `.env` files are not included in the repository.

4. **Database Setup**:
   - Ensure PostgreSQL is running.
   - Create a new database:
     ```bash
     createdb <your_database_name>
     ```
   - Update the `.env` file with your database credentials.

5. **Run database migrations**:
   ```bash
   psql -d <your_database_name> -f ./migrations/<migration_file.sql>
   ```

6. **Seed the database**:
   ```bash
   npm run seed
   ```

---

## Running the Application

### Development Server
To start the development server:
```bash
npm run dev
```

### Production Build
To build and run the production server:
```bash
npm run build
npm start
```

---

## Testing

Run tests with:
```bash
npm run test
```

Testing is implemented using **Jest**, with a focus on unit and integration tests.

---

## Folder Structure

```plaintext
src/
├── db/
│   ├── data/           # Data files (excluded in .gitignore)
│   ├── migrations/     # SQL migration files
│   ├── seeds/          # Seed scripts
│   ├── connection.ts   # Database connection setup
├── routes/             # Express routes
├── controllers/        # Request handlers
├── services/           # Business logic
├── tests/              # Jest test files
├── types/              # TypeScript type definitions
├── app.ts              # Express application entry point
```

---

## Notes

- The `.env` files, test data, and seed generation files are excluded for security and confidentiality reasons.
- Follow the documented environment setup steps to configure and use the application locally.

---

## License

This project is licensed under the [MIT License](./LICENSE).