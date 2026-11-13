# Simple PHP/MySQL setup

1. Create a database and user from cPanel's **MySQL Databases** page. Use the exact generated name, normally similar to `cpaneluser_spicejet`—not a domain such as `example.in`.
2. Open phpMyAdmin and select that database from the left sidebar.
3. Import `database.sql` into the selected database.
4. Open `config.php` and set the exact cPanel database name, username and password.
5. Run the project through your PHP hosting and open `/admin/`.

Default admin credentials:

- Username: `admin`
- Password: `admin123`

Change the default password hash in the `admins` table after the first setup.

Public form endpoints:

- Apply Now: `api/apply.php`
- Contact Us: `api/contact.php`
- Public settings: `api/get-settings.php`

The admin panel can view submitted applications and contact enquiries. Its settings form only updates the public phone number, email address and registered address.
