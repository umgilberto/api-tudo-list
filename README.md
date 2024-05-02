# Tudo-List API
The Tudo-List API is an application for project, sprint, and task management, allowing users to organize and track the progress of their activities efficiently.

## Installation
### Clone this repository:
```bash
git clone https://github.com/umgilberto/api-tudo-list
```
### Install dependencies:
```bash
cd tudo-list-api
npm install
```

### Settings
Rename the .env.example file to .env and configure the necessary environment variables, such as database credentials and the secret key for JWT. Make sure you have a configured and accessible database.

### Installing docker

<a href="https://docs.docker.com/get-started/">This project uses Docker. Please access the documentation for installation instructions</a>

### Preparing the database:
Run docker:
```bash
docker compose up -d tudolist_db
```

Run migrations:
```bash
npm run migration:run
```

### Execution
To start the server, run the following command:
```bash
npm run start:dev
```
The server will start and be ready to receive requests

### API Routes
All routes are documented in the API's Swagger, accessed through the route /api.

### Technologies Used
<div style="display: flex; gap: 5px; height: 36px;">
<img src="./doc/images/node_icon.svg">

<img src="./doc/images/nest_icon.svg">

<img src="./doc/images/typescript_icon.svg">

<img src="./doc/images/docker_icon.svg">

<img src="./doc/images/typeorm_icon.svg">
</div>


### Contributing

Contributions are welcome! Feel free to open issues to report problems or propose improvements. If you wish to contribute directly, please open a pull request with your changes..

### License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/)