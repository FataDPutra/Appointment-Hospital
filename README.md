# Appointment Hospital - Installation Guide

Follow the steps below to set up and run the Appointment Hospital application locally.

---

## Prerequisites

Make sure you have the following installed on your system:

1. **PHP** (>= 8.2)
2. **Composer** (latest version)
3. **Node.js** (>= 20.x) and **npm** or **yarn**
4. **PostgreSQL** or any supported database
5. **Git**
6. **Laravel CLI**

---

## Installation Steps

### 1. Clone the Repository

Clone the repository from your version control platform (e.g., GitHub):

```bash
git clone https://github.com/FataDPutra/Appointment-Hospital.git
```

Navigate into the project directory:

```bash
cd sistem_jadwal_rumahsakit
```

---

### 2. Set Up Environment Variables

Copy the `.env.example` file to create your `.env` file:

```bash
cp .env.example .env
```

Edit the `.env` file to match your local setup. Update the following fields:

-   **Database configuration:**
    ```env
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=rumahsakit
    DB_USERNAME=root
    DB_PASSWORD=your_password
    ```

---

### 3. Install Dependencies

Install PHP dependencies:

```bash
composer install
```

Install JavaScript dependencies:

```bash
npm install
```

Or, if you prefer yarn:

```bash
yarn install
```

---

### 4. Generate Application Key

Generate the application key for the Laravel application:

```bash
php artisan key:generate
```

---

### 5. Run Database Migrations and Seeders

Run the migrations to set up your database tables:

```bash
php artisan migrate
```

Seed the database with initial data:

```bash
php artisan db:seed --class=UserSeeder
```

---

After running the seeders, an admin account will be created with the following credentials:

Email: admin@email.com
Password: password
This account can be used to log in to the application as an administrator.

Email: dokter@email.com
Password: password
This account can be used to log in to the application as an dokter.

### 6. Compile Frontend Assets

Compile the frontend assets using one of the following commands:

```bash
npm run dev
```

Or for production:

```bash
npm run build
```

---

### 7. Serve the Application

Run the application using the built-in Laravel development server:

```bash
php artisan serve
```

By default, the application will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

### You're all set!

Your Appointment Hospital application should now be up and running. If you encounter any issues, feel free to contact the development team or refer to the documentation.
